import express from 'express';

import userRoutes from './modules/users/user.route';
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
