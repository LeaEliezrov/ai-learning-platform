import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { OpenAIService } from '../../utils/openai.service';

const prisma = new PrismaClient();

export class PromptsController {
  // יצירת prompt חדש וקבלת תשובה מ-AI
  static async createPrompt(req: Request, res: Response) {
    try {
      const { categoryId, subcategoryId, prompt } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      if (!categoryId || !subcategoryId || !prompt) {
        return res.status(400).json({ 
          error: 'Missing required fields: categoryId, subcategoryId, prompt' 
        });
      }      // קבלת פרטי הקטגוריה והתת-קטגוריה לצורך ה-AI
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId) }
      });      const subcategory = await prisma.subCategory.findUnique({
        where: { id: parseInt(subcategoryId) }
      });

      if (!category || !subcategory) {
        return res.status(404).json({ error: 'Category or subcategory not found' });
      }

      // שליחה ל-OpenAI
      const aiResponse = await OpenAIService.generateLesson({
        category: category.name,
        subcategory: subcategory.name,
        prompt
      });

      // שמירה במסד הנתונים
      const newPrompt = await prisma.prompt.create({        data: {
          userId: parseInt(userId),
          categoryId: parseInt(categoryId),
          subCategoryId: parseInt(subcategoryId),
          prompt,
          response: aiResponse.content,        },
        include: {
          category: true,
         SubCategory: true,
        }
      });

      res.status(201).json({
        success: true,
        prompt: newPrompt,
        tokensUsed: aiResponse.tokensUsed
      });

    } catch (error) {
      console.error('Error creating prompt:', error);
      res.status(500).json({ 
        error: 'Failed to create prompt',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // קבלת כל ה-prompts של משתמש מסוים
  static async getUserPrompts(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;      const prompts = await prisma.prompt.findMany({
        where: { userId: parseInt(userId) },
        include: {
          category: true,
          SubCategory: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      });

      const total = await prisma.prompt.count({
        where: { userId: parseInt(userId) }
      });

      res.json({
        prompts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });

    } catch (error) {
      console.error('Error fetching user prompts:', error);
      res.status(500).json({ error: 'Failed to fetch prompts' });
    }
  }

  // קבלת prompt מסוים לפי ID
  static async getPromptById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const prompt = await prisma.prompt.findUnique({
        where: { 
          id: parseInt(id),
          userId: parseInt(userId) // ודא שהמשתמש רואה רק את ה-prompts שלו
        },        include: {
          category: true,
          SubCategory: true,
        }
      });

      if (!prompt) {
        return res.status(404).json({ error: 'Prompt not found' });
      }

      res.json({ prompt });

    } catch (error) {
      console.error('Error fetching prompt:', error);
      res.status(500).json({ error: 'Failed to fetch prompt' });
    }
  }

  // מחיקת prompt (אם נרצה לאפשר זאת)
  static async deletePrompt(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const prompt = await prisma.prompt.findUnique({
        where: { 
          id: parseInt(id),
          userId: parseInt(userId)
        }
      });

      if (!prompt) {
        return res.status(404).json({ error: 'Prompt not found' });
      }

      await prisma.prompt.delete({
        where: { id: parseInt(id) }
      });

      res.json({ message: 'Prompt deleted successfully' });

    } catch (error) {
      console.error('Error deleting prompt:', error);
      res.status(500).json({ error: 'Failed to delete prompt' });
    }
  }

  // Admin: קבלת כל ה-prompts של כל המשתמשים
  static async getAllPrompts(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      const prompts = await prisma.prompt.findMany({        include: {
          user: {
            select: { id: true, name: true, phone: true }
          },
          category: true,
          SubCategory: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      });

      const total = await prisma.prompt.count();

      res.json({
        prompts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });

    } catch (error) {
      console.error('Error fetching all prompts:', error);
      res.status(500).json({ error: 'Failed to fetch prompts' });
    }
  }
}
