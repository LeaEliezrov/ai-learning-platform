import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Pagination,
  Collapse,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

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

interface PromptsTableProps {
  prompts: Prompt[];
  loading: boolean;
  error: string | null;
  page: number;
  onPageChange: (page: number) => void;
  pagination: { total: number; pages: number };
  onRefresh: () => void;
  expandedPrompt: number | null;
  onToggleExpanded: (promptId: number) => void;
  formatDate: (dateString: string) => string;
}

export default function PromptsTable({
  prompts,
  loading,
  error,
  page,
  onPageChange,
  pagination,
  onRefresh,
  expandedPrompt,
  onToggleExpanded,
  formatDate,
}: PromptsTableProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Prompt Analytics</Typography>
          <Button
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="50px"></TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Prompt</TableCell>
                    <TableCell>Response</TableCell>
                    <TableCell>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prompts.map((prompt) => (
                    <React.Fragment key={prompt.id}>
                      <TableRow 
                        hover 
                        sx={{ 
                          '& > *': { borderBottom: expandedPrompt === prompt.id ? 'none' : 'auto' },
                          cursor: 'pointer' 
                        }}
                        onClick={() => onToggleExpanded(prompt.id)}
                      >
                        <TableCell>
                          <IconButton size="small">
                            {expandedPrompt === prompt.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{prompt.user?.name || 'Unknown User'}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Phone: {prompt.user?.phone || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={prompt.category?.name || 'Unknown'} size="small" />
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              maxWidth: 300,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {prompt.prompt}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              maxWidth: 300,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {prompt.response || 'No response'}
                          </Typography>
                        </TableCell>
                        <TableCell>{formatDate(prompt.createdAt)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={expandedPrompt === prompt.id} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 600, mb: 2 }}>
                                Full Details
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                                  <Box sx={{ flex: 1 }}>
                                    <Card variant="outlined" sx={{ mb: 2 }}>
                                      <CardContent>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                                          Prompt
                                        </Typography>
                                        <Typography 
                                          variant="body2" 
                                          sx={{ 
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            backgroundColor: 'grey.50',
                                            p: 2,
                                            borderRadius: 1,
                                            border: '1px solid',
                                            borderColor: 'grey.200'
                                          }}
                                        >
                                          {prompt.prompt}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </Box>
                                  <Box sx={{ flex: 1 }}>
                                    <Card variant="outlined" sx={{ mb: 2 }}>
                                      <CardContent>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'success.main' }}>
                                          Response
                                        </Typography>
                                        <Typography 
                                          variant="body2" 
                                          sx={{ 
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            backgroundColor: 'grey.50',
                                            p: 2,
                                            borderRadius: 1,
                                            border: '1px solid',
                                            borderColor: 'grey.200'
                                          }}
                                        >
                                          {prompt.response || 'No response available'}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </Box>
                                </Box>
                                <Box>
                                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                                    <Chip 
                                      label={`Category: ${prompt.category?.name || 'Unknown'}`} 
                                      color="primary" 
                                      variant="outlined" 
                                    />
                                    <Chip 
                                      label={`Subcategory: ${prompt.subcategory?.name || 'N/A'}`} 
                                      color="secondary" 
                                      variant="outlined" 
                                    />
                                    <Chip 
                                      label={`Created: ${formatDate(prompt.createdAt)}`} 
                                      variant="outlined" 
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {pagination.pages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={pagination.pages}
                  page={page}
                  onChange={(e, newPage) => onPageChange(newPage)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
