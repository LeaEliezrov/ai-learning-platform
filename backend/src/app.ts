import express from 'express';

import userRoutes from './modules/users/user.route';
import categoryRoutes from './modules/categories/category.route';
import subcategoryRoutes from './modules/subcategories/subcategory.route';
import promptRoutes from './modules/prompts/prompt.route';

const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/prompts', promptRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
