import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

// Import our modular components
import AdminHeader from '../components/AdminHeader';
import StatsCards from '../components/StatsCards';
import AdminTabs from '../components/AdminTabs';
import TabPanel from '../components/TabPanel';
import UsersTable from '../components/UsersTable';
import PromptsTable from '../components/PromptsTable';
import DeleteUserDialog from '../components/DeleteUserDialog';

// Import our custom hook
import { useAdminData } from '../hooks/useAdminData';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(0);

  // Use our custom hook to manage all admin data
  const {
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
  } = useAdminData();

  // Check admin authorization
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'ADMIN') {
      navigate('/dashboard');
      return;
    }
  }, [currentUser, navigate]);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 0) {
      fetchUsers();
    } else if (activeTab === 1) {
      fetchPrompts();
    }
  }, [activeTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'user/logout' });
    navigate('/login');
  };

  // Don't render if user is not authorized
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Component */}
      <AdminHeader currentUser={currentUser} onLogout={handleLogout} />

      {/* Stats Cards Component */}
      <StatsCards 
        totalUsers={userPagination.total}
        totalPrompts={promptPagination.total}
        users={users}
      />

      {/* Tabs Component */}
      <AdminTabs activeTab={activeTab} onChange={handleTabChange} />

      {/* Users Tab */}
      <TabPanel value={activeTab} index={0}>
        <UsersTable
          users={users}
          loading={usersLoading}
          error={usersError}
          search={userSearch}
          onSearchChange={setUserSearch}
          page={userPage}
          onPageChange={setUserPage}
          pagination={userPagination}
          onRefresh={fetchUsers}
          onDeleteUser={(user) => setDeleteDialog({ open: true, user })}
          formatDate={formatDate}
        />
      </TabPanel>

      {/* Prompts Tab */}
      <TabPanel value={activeTab} index={1}>
        <PromptsTable
          prompts={prompts}
          loading={promptsLoading}
          error={promptsError}
          page={promptPage}
          onPageChange={setPromptPage}
          pagination={promptPagination}
          onRefresh={fetchPrompts}
          expandedPrompt={expandedPrompt}
          onToggleExpanded={togglePromptExpanded}
          formatDate={formatDate}
        />
      </TabPanel>

      {/* Delete User Dialog Component */}
      <DeleteUserDialog
        open={deleteDialog.open}
        user={deleteDialog.user}
        onClose={() => setDeleteDialog({ open: false, user: null })}
        onConfirm={handleDeleteUser}
      />
    </Container>
  );
}
