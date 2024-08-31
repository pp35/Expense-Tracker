import express from 'express';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createExpense);
router.get('/:userId', authMiddleware, getExpenses);
router.put('/:id', authMiddleware, updateExpense);
router.delete('/:id', authMiddleware, deleteExpense);

export default router;
