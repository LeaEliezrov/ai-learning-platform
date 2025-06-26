import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Learning Platform API',
      version: '1.0.0',
      description: 'A comprehensive API for an AI-driven learning platform with user management, categories, and OpenAI integration',
      contact: {
        name: 'API Support',
        email: 'support@ailearningplatform.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.ailearningplatform.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            phone: { type: 'string', example: '0501234567' },
            role: { type: 'string', enum: ['USER', 'ADMIN'], example: 'USER' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Science' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        SubCategory: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Physics' },
            categoryId: { type: 'integer', example: 1 },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Prompt: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 1 },
            categoryId: { type: 'integer', example: 1 },
            subCategoryId: { type: 'integer', example: 1 },
            prompt: { type: 'string', example: 'Explain quantum physics' },
            response: { type: 'string', example: 'Quantum physics is...' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Error message' },
            details: { type: 'string', example: 'Additional error details' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['phone'],
          properties: {
            phone: { type: 'string', example: '0501234567' }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['name', 'phone'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            phone: { type: 'string', example: '0501234567' }
          }
        },
        PromptRequest: {
          type: 'object',
          required: ['categoryId', 'subCategoryId', 'prompt'],
          properties: {
            categoryId: { type: 'integer', example: 1 },
            subCategoryId: { type: 'integer', example: 1 },
            prompt: { type: 'string', example: 'Explain quantum physics' }
          }
        }
      }    },
    security: [
      {
        bearerAuth: []
      }
    ],
    paths: {
      '/api/users/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Users'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RegisterRequest' }
              }
            }
          },
          responses: {
            201: { description: 'User created successfully' },
            400: { description: 'Validation error' }
          }
        }
      },
      '/api/users/login': {
        post: {
          summary: 'Login user',
          tags: ['Users'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginRequest' }
              }
            }
          },
          responses: {
            200: { description: 'Login successful' },
            401: { description: 'Invalid credentials' }
          }
        }
      },
      '/api/prompts': {
        post: {
          summary: 'Create AI prompt',
          tags: ['Prompts'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PromptRequest' }
              }
            }
          },
          responses: {
            201: { description: 'Prompt created and AI response received' },
            401: { description: 'Unauthorized' }
          }
        }
      }
    }
  },
  apis: ['./src/modules/**/*.route.ts', './src/modules/**/*.controller.ts']
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'AI Learning Platform API'
  }));
  
  // Serve the swagger spec as JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};

export default specs;
