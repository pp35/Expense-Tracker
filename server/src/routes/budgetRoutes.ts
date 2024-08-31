import express from 'express';
import { createBudget, getBudgets, updateBudget, deleteBudget } from '../controllers/budgetController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createBudget);
router.get('/:userId', authMiddleware, getBudgets);
router.put('/:id', authMiddleware, updateBudget);
router.delete('/:id', authMiddleware, deleteBudget);

export default router;
