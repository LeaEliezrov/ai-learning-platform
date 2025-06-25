import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// קבלת כל התת-קטגוריות עם הקטגוריה הראשית
export const findAllSubcategories = () => {
  return prisma.subCategory.findMany({
    include: {
      category: true,
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

// קבלת תת-קטגוריה לפי ID עם הקטגוריה הראשית
export const findSubcategoryById = (id: number) => {
  return prisma.subCategory.findUnique({
    where: { id },
    include: {
      category: true,
      _count: {
        select: {
          prompts: true
        }
      }
    }
  });
};

// יצירת תת-קטגוריה חדשה
export const createSubcategory = (data: { name: string; categoryId: number }) => {
  return prisma.subCategory.create({
    data,
    include: {
      category: true,
      _count: {
        select: {
          prompts: true
        }
      }
    }
  });
};

// עדכון תת-קטגוריה
export const updateSubcategory = (id: number, data: { name: string; categoryId?: number }) => {
  return prisma.subCategory.update({
    where: { id },
    data,
    include: {
      category: true,
      _count: {
        select: {
          prompts: true
        }
      }
    }
  });
};

// מחיקת תת-קטגוריה
export const deleteSubcategory = (id: number) => {
  return prisma.subCategory.delete({ where: { id } });
};
