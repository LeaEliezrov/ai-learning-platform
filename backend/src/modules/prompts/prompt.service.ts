import { PrismaClient } from '@prisma/client';
import { generateLesson } from '../../utils/openai';

const prisma = new PrismaClient();

export class PromptService {
  async createPrompt(
    userId: string, 
    categoryId: number, 
    subcategoryId: number, 
    prompt: string
  ) {
    try {
      // קבלת פרטי הקטגוריה והתת-קטגוריה לשליחה ל-AI
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      });

      const subcategory = await prisma.subCategory.findUnique({
        where: { id: subcategoryId }
      });

      if (!category || !subcategory) {
        throw new Error('Category or subcategory not found');
      }

      // יצירת שיעור באמצעות AI
      const aiResponse = await generateLesson(
        category.name,
        subcategory.name,
        prompt
      );

      // שמירת ה-prompt והתשובה במסד הנתונים
      const savedPrompt = await prisma.prompt.create({
        data: {
          userId: parseInt(userId),
          categoryId,
          subCategoryId: subcategoryId,
          prompt,
          response: aiResponse,
        },
        include: {
          category: true,
          SubCategory: true,
        }
      });

      return savedPrompt;
    } catch (error) {
      console.error('Error in createPrompt:', error);
      throw error;
    }
  }

  async getUserPrompts(userId: string) {
    try {
      const prompts = await prisma.prompt.findMany({
        where: { userId: parseInt(userId) },
        include: {
          category: true,
          SubCategory: true,
        },
        orderBy: { createdAt: 'desc' }
      });

      return prompts;
    } catch (error) {
      console.error('Error in getUserPrompts:', error);
      throw error;
    }
  }

  async getAllPrompts() {
    try {
      const prompts = await prisma.prompt.findMany({
        include: {
          category: true,
          SubCategory: true,
          user: {
            select: {
              id: true,
              name: true,
              phone: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return prompts;
    } catch (error) {
      console.error('Error in getAllPrompts:', error);
      throw error;
    }
  }

  async getPromptById(id: number) {
    try {
      const prompt = await prisma.prompt.findUnique({
        where: { id },
        include: {
          category: true,
          SubCategory: true,
          user: {
            select: {
              id: true,
              name: true,
              phone: true
            }
          }
        }
      });

      return prompt;
    } catch (error) {
      console.error('Error in getPromptById:', error);
      throw error;
    }
  }
}
