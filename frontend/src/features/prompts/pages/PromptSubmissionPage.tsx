import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Chip,
  Paper,
  Divider,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Send as SendIcon,
  AutoAwesome as AIIcon,
  History as HistoryIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchCategories } from '../../categories/categoriesSlice';
import { submitPrompt, resetSubmitStatus, clearError } from '../promptsSlice';
import { SelectChangeEvent } from '@mui/material/Select';

export default function PromptSubmissionPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { categories, status: categoriesStatus } = useAppSelector(state => state.categories);
  const { submitStatus, error, lastResponse } = useAppSelector(state => state.prompts);
  const { currentUser } = useAppSelector(state => state.user);

  console.log('🔍 PromptSubmissionPage - Current User:', currentUser);
  console.log('🔍 PromptSubmissionPage - Categories:', categories);
  console.log('🔍 PromptSubmissionPage - Submit Status:', submitStatus);
  console.log('🔍 PromptSubmissionPage - Error:', error);

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
  const [prompt, setPrompt] = useState('');
  const [availableSubcategories, setAvailableSubcategories] = useState<any[]>([]);

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStatus]);
  useEffect(() => {
    if (selectedCategoryId) {
      const category = categories.find(cat => cat.id === parseInt(selectedCategoryId));
      setAvailableSubcategories(category?.subCategories || []);
      setSelectedSubcategoryId(''); // Reset subcategory when category changes
    }
  }, [selectedCategoryId, categories]);

  useEffect(() => {
    if (lastResponse) {
      // Clear form after successful submission
      setPrompt('');
      setSelectedCategoryId('');
      setSelectedSubcategoryId('');
    }
  }, [lastResponse]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleSubcategoryChange = (event: SelectChangeEvent) => {
    setSelectedSubcategoryId(event.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔍 Current user:', currentUser);
    console.log('🔍 Token in localStorage:', localStorage.getItem('token'));
    console.log('🔍 Submit data:', {
      categoryId: parseInt(selectedCategoryId),
      subcategoryId: parseInt(selectedSubcategoryId),
      prompt: prompt.trim(),
    });
    
    if (!selectedCategoryId || !selectedSubcategoryId || !prompt.trim()) {
      console.log('❌ Form validation failed');
      return;
    }

    dispatch(submitPrompt({
      categoryId: parseInt(selectedCategoryId),
      subcategoryId: parseInt(selectedSubcategoryId),
      prompt: prompt.trim(),
    }));
  };

  const handleNewPrompt = () => {
    dispatch(resetSubmitStatus());
  };

  const isFormValid = selectedCategoryId && selectedSubcategoryId && prompt.trim().length > 0;
  const isLoading = submitStatus === 'loading';

  // If we have a successful response, show it
  if (lastResponse) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate('/dashboard')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            AI Generated Lesson
          </Typography>
        </Box>

        {/* Success Response */}
        <Card sx={{ mb: 3, border: '2px solid', borderColor: 'success.main' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AIIcon sx={{ mr: 1, color: 'success.main' }} />
              <Typography variant="h6" color="success.main">
                Lesson Generated Successfully!
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Chip 
                label={`${lastResponse.prompt.category.name} → ${lastResponse.prompt.SubCategory.name}`}
                color="primary" 
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip 
                label={`${lastResponse.tokensUsed} tokens used`}
                color="secondary" 
                size="small"
              />
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Your Question:
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              {lastResponse.prompt.prompt}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              AI Response:
            </Typography>
            <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.8,
                }}
              >
                {lastResponse.prompt.response}
              </Typography>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleNewPrompt}
                startIcon={<SendIcon />}
              >
                Ask Another Question
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/learning-history')}
                startIcon={<HistoryIcon />}
              >
                View Learning History
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <AIIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Ask AI
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Ask AI a Question
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Hello {currentUser?.name}! Choose a topic and ask your question
        </Typography>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}

      {/* Main Form */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {/* Category Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Category</InputLabel>
              <Select
                value={selectedCategoryId}
                onChange={handleCategoryChange}
                label="Select Category"
                disabled={categoriesStatus === 'loading'}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CategoryIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                      {category.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Subcategory Selection */}
            <FormControl fullWidth margin="normal" disabled={!selectedCategoryId}>
              <InputLabel>Select Subcategory</InputLabel>
              <Select
                value={selectedSubcategoryId}
                onChange={handleSubcategoryChange}
                label="Select Subcategory"
              >
                {availableSubcategories.map((subcategory) => (
                  <MenuItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider sx={{ my: 3 }} />

            {/* Prompt Input */}
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Question"
              placeholder="Ask anything you want to learn about..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              margin="normal"
              helperText={`${prompt.length}/500 characters`}
              inputProps={{ maxLength: 500 }}
            />

            {/* Submit Button */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!isFormValid || isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{
                  minWidth: 200,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                {isLoading ? 'Generating...' : 'Ask AI'}
              </Button>
            </Box>

            {isLoading && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  AI is thinking... This may take a few seconds
                </Typography>
              </Box>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/learning-history')}
          startIcon={<HistoryIcon />}
          sx={{ mr: 2 }}
        >
          View Learning History
        </Button>
        <Button
          variant="text"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
}
