import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// קבלת כל הקטגוריות עם תת-קטגוריות
export const findAllCategories = () => {
  return prisma.category.findMany({
    include: {
      subCategories: true,
      _count: {
        select: {
          subCategories: true,
          prompts: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });
};

// קבלת קטגוריה לפי ID עם תת-קטגוריות
export const findCategoryById = (id: number) => {
  return prisma.category.findUnique({
    where: { id },
    include: {
      subCategories: true,
      _count: {
        select: {
          subCategories: true,
          prompts: true
        }
      }
    }
  });
};

// יצירת קטגוריה חדשה
export const createCategory = (data: { name: string }) => {
  return prisma.category.create({ 
    data,
    include: {
      subCategories: true,
      _count: {
        select: {
          subCategories: true,
          prompts: true
        }
      }
    }
  });
};

// עדכון קטגוריה
export const updateCategory = (id: number, data: { name: string }) => {
  return prisma.category.update({
    where: { id },
    data,
    include: {
      subCategories: true,
      _count: {
        select: {
          subCategories: true,
          prompts: true
        }
      }
    }
  });
};

// מחיקת קטגוריה
export const deleteCategory = (id: number) => {
  return prisma.category.delete({ where: { id } });
};

// קבלת תת-קטגוריות של קטגוריה
export const findCategorySubcategories = (categoryId: number) => {
  return prisma.subCategory.findMany({
    where: { categoryId },
    include: {
      _count: {
        select: {
          prompts: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });
};
