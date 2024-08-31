import { Request, Response } from 'express';
import Expense from '../models/Expense';

// Create a new expense
export const createExpense = async (req: Request, res: Response) => {
  const { userId, category, amount, description, date } = req.body;

  try {
    const expense = await Expense.create({
      userId,
      category,
      amount,
      description,
      date,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense', error });
  }
};

// Get all expenses for a user
export const getExpenses = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const expenses = await Expense.findAll({ where: { userId } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
};

// Update an expense
export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category, amount, description, date } = req.body;

  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await expense.update({ category, amount, description, date });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error });
  }
};

// Delete an expense
export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await expense.destroy();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
};
