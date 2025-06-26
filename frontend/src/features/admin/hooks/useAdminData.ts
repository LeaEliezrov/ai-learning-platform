import { useState, useEffect } from 'react';
import { config } from '../../../config';
import { User } from '../../../shared/types';
import { formatDate } from '../../../shared/utils';

interface Prompt {
  id: number;
  prompt: string;
  response: string;
  categoryId: number;
  subcategoryId: number;
  createdAt: string;
  user: {
    name: string;
    phone: string;
  };
  category: {
    name: string;
  };
  subcategory: {
    name: string;
  };
}

interface Pagination {
  total: number;
  pages: number;
}

export const useAdminData = () => {
  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [userPagination, setUserPagination] = useState<Pagination>({ total: 0, pages: 0 });

  // Prompts state
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [promptsLoading, setPromptsLoading] = useState(false);
  const [promptsError, setPromptsError] = useState<string | null>(null);
  const [promptPage, setPromptPage] = useState(1);
  const [promptPagination, setPromptPagination] = useState<Pagination>({ total: 0, pages: 0 });
  const [expandedPrompt, setExpandedPrompt] = useState<number | null>(null);

  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null as User | null });

  const fetchUsers = async () => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${config.api.baseUrl}/api/users?page=${userPage}&limit=10&search=${userSearch}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
      setUserPagination(data.pagination);
    } catch (error) {
      setUsersError(error instanceof Error ? error.message : 'Failed to fetch users');
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchPrompts = async () => {
    setPromptsLoading(true);
    setPromptsError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${config.api.baseUrl}/api/prompts/admin/all?page=${promptPage}&limit=10`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch prompts');
      }

      const data = await response.json();
      setPrompts(data.prompts);
      setPromptPagination(data.pagination);
    } catch (error) {
      setPromptsError(error instanceof Error ? error.message : 'Failed to fetch prompts');
    } finally {
      setPromptsLoading(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.api.baseUrl}/api/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Refresh users list
      fetchUsers();
      setDeleteDialog({ open: false, user: null });
    } catch (error) {
      setUsersError(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  const togglePromptExpanded = (promptId: number) => {
    setExpandedPrompt(expandedPrompt === promptId ? null : promptId);  };

  // Effect to fetch data when dependencies change
  useEffect(() => {
    fetchUsers();
  }, [userPage, userSearch]);

  useEffect(() => {
    fetchPrompts();
  }, [promptPage]);

  return {
    // Users data
    users,
    usersLoading,
    usersError,
    userSearch,
    setUserSearch,
    userPage,
    setUserPage,
    userPagination,
    fetchUsers,

    // Prompts data
    prompts,
    promptsLoading,
    promptsError,
    promptPage,
    setPromptPage,
    promptPagination,
    expandedPrompt,
    togglePromptExpanded,
    fetchPrompts,

    // Delete dialog
    deleteDialog,
    setDeleteDialog,
    handleDeleteUser,

    // Utilities
    formatDate,
  };
};
