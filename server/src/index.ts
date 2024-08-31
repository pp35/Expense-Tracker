import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import authRoutes from './routes/authRoutes';
import expenseRoutes from './routes/expenseRoutes';
import budgetRoutes from './routes/budgetRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.error('Unable to connect to the database:', err));
