import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  uptime: number;
  services: {
    database: 'healthy' | 'unhealthy';
    openai: 'healthy' | 'unhealthy' | 'unknown';
  };
  metrics: {
    totalUsers: number;
    totalPrompts: number;
    memoryUsage: NodeJS.MemoryUsage;
  };
}

/**
 * Health check endpoint
 * Provides comprehensive system health information
 */
export const healthCheck = async (req: Request, res: Response): Promise<void> => {
  const startTime = Date.now();
  
  try {
    // Check database connectivity
    let dbStatus: 'healthy' | 'unhealthy' = 'healthy';
    let totalUsers = 0;
    let totalPrompts = 0;
    
    try {
      totalUsers = await prisma.user.count();
      totalPrompts = await prisma.prompt.count();
    } catch (error) {
      dbStatus = 'unhealthy';
      console.error('Database health check failed:', error);
    }

    // Check OpenAI API (basic check)
    let openaiStatus: 'healthy' | 'unhealthy' | 'unknown' = 'unknown';
    if (process.env.OPENAI_API_KEY) {
      openaiStatus = 'healthy'; // Assume healthy if key exists
    } else {
      openaiStatus = 'unhealthy';
    }

    const healthStatus: HealthStatus = {
      status: dbStatus === 'healthy' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      services: {
        database: dbStatus,
        openai: openaiStatus
      },
      metrics: {
        totalUsers,
        totalPrompts,
        memoryUsage: process.memoryUsage()
      }
    };

    const responseTime = Date.now() - startTime;
    
    res.status(healthStatus.status === 'healthy' ? 200 : 503).json({
      ...healthStatus,
      responseTime: `${responseTime}ms`
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
};

/**
 * Simple liveness probe
 */
export const liveness = (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString()
  });
};

/**
 * Readiness probe - checks if app is ready to serve traffic
 */
export const readiness = async (req: Request, res: Response): Promise<void> => {
  try {
    // Quick database connectivity check
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'ready',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      timestamp: new Date().toISOString(),
      error: 'Database not accessible'
    });
  }
};
