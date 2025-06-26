import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { User } from '../../../shared/types';

interface DeleteUserDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: (user: User) => void;
}

export default function DeleteUserDialog({
  open,
  user,
  onClose,
  onConfirm,
}: DeleteUserDialogProps) {
  const handleConfirm = () => {
    if (user) {
      onConfirm(user);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete user "{user?.name}"?
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
