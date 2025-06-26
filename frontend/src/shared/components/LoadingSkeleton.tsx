import React from 'react';
import { Skeleton, Card, CardContent, Box, Grid } from '@mui/material';

interface LoadingSkeletonProps {
  type: 'card' | 'list' | 'table' | 'form';
  count?: number;
}

export default function LoadingSkeleton({ type, count = 3 }: LoadingSkeletonProps) {
  const renderCardSkeleton = () => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="80%" height={20} />
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Skeleton variant="rectangular" width={80} height={32} />
          <Skeleton variant="rectangular" width={80} height={32} />
        </Box>
      </CardContent>
    </Card>
  );

  const renderListSkeleton = () => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="text" width="70%" height={20} />
        </Box>
      </Box>
    </Box>
  );

  const renderTableSkeleton = () => (
    <Box sx={{ mb: 1 }}>
      {[...Array(4)].map((_, index) => (
        <Box key={index} sx={{ display: 'flex', py: 1, borderBottom: '1px solid #eee' }}>
          <Skeleton variant="text" width="25%" height={24} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="30%" height={24} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="20%" height={24} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="25%" height={24} />
        </Box>
      ))}
    </Box>
  );

  const renderFormSkeleton = () => (
    <Box>
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width={120} height={40} />
    </Box>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'table':
        return renderTableSkeleton();
      case 'form':
        return renderFormSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  if (type === 'table' || type === 'form') {
    return renderSkeleton();
  }

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
}
