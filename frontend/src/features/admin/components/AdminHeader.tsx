import React from 'react';
import { PageHeader, UserProfileDisplay } from '../../../shared/components';
import { AdminPanelSettings as AdminIcon } from '@mui/icons-material';

interface AdminHeaderProps {
  currentUser: {
    name: string;
  } | null;
  onLogout: () => void;
}

export default function AdminHeader({ currentUser, onLogout }: AdminHeaderProps) {
  return (
    <PageHeader
      title="Admin Dashboard"
      subtitle="Manage users, prompts, and platform analytics"
      backPath="/dashboard"
      icon={<AdminIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
      actions={
        currentUser && (
          <UserProfileDisplay
            user={{ name: currentUser.name, role: 'ADMIN' }}
            onLogout={onLogout}
            variant="compact"
          />
        )
      }
    />
  );
}
