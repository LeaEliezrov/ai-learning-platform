export interface Prompt {
  id: number;
  userId: number;
  categoryId: number;
  subCategoryId: number;
  prompt: string;
  response: string;
  createdAt: string;
  category: {
    id: number;
    name: string;
  };
  SubCategory: {
    id: number;
    name: string;
    categoryId: number;
  };
}

export interface CreatePromptData {
  categoryId: number;
  subcategoryId: number;
  prompt: string;
}

export interface CreatePromptResponse {
  success: boolean;
  prompt: Prompt;
  tokensUsed: number;
}

export interface PromptsResponse {
  prompts: Prompt[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
