import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { setupSwagger } from './config/swagger';
import { devLogger, prodLogger, errorLogger } from './config/logger';
import { generalLimiter } from './config/rateLimiting';

import userRoutes from './modules/users/user.route';
import categoryRoutes from './modules/categories/category.route';
import subcategoryRoutes from './modules/subcategories/subcategory.route';
import promptRoutes from './modules/prompts/prompt.route';
import healthRoutes from './modules/health/health.route';

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Performance middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'production') {
  app.use(prodLogger);
  app.use(errorLogger);
} else {
  app.use(devLogger);
}

// Rate limiting
app.use(generalLimiter);

// Setup Swagger documentation
setupSwagger(app);

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/', healthRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
