import React from 'react';
import { Paper, Tabs, Tab } from '@mui/material';
import { People as PeopleIcon, QuestionAnswer as PromptsIcon } from '@mui/icons-material';

interface AdminTabsProps {
  activeTab: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function AdminTabs({ activeTab, onChange }: AdminTabsProps) {
  return (
    <Paper sx={{ mb: 3 }}>
      <Tabs
        value={activeTab}
        onChange={onChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="User Management" icon={<PeopleIcon />} />
        <Tab label="Prompt Analytics" icon={<PromptsIcon />} />
      </Tabs>
    </Paper>
  );
}
