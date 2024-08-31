import { Request, Response } from 'express';
import Budget from '../models/Budget';

// Create a new budget
export const createBudget = async (req: Request, res: Response) => {
  const { userId, category, limit } = req.body;

  try {
    const budget = await Budget.create({
      userId,
      category,
      limit,
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget', error });
  }
};

// Get all budgets for a user
export const getBudgets = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const budgets = await Budget.findAll({ where: { userId } });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budgets', error });
  }
};

// Update a budget
export const updateBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category, limit } = req.body;

  try {
    const budget = await Budget.findByPk(id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    await budget.update({ category, limit });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget', error });
  }
};

// Delete a budget
export const deleteBudget = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findByPk(id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    await budget.destroy();
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget', error });
  }
};
