// Category types
export interface Category {
  id: number;
  name: string;
  subCategories: Subcategory[];
  _count: {
    subCategories: number;
    prompts: number;
  };
}

// Subcategory types  
export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  category?: Category;
  _count?: {
    prompts: number;
  };
}

// API Response types
export interface CategoriesResponse {
  categories: Category[];
  total: number;
}

export interface CategoryResponse {
  category: Category;
}

// Form types
export interface CreateCategoryData {
  name: string;
}

export interface UpdateCategoryData {
  name: string;
}

export interface CreateSubcategoryData {
  name: string;
  categoryId: number;
}

export interface UpdateSubcategoryData {
  name: string;
  categoryId?: number;
}
