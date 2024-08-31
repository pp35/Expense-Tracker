// ExpenseTracker.tsx
import React, { useEffect, useState } from 'react';
import {
  fetchExpensesFromApi,
  addNewExpense,
  modifyExpense,
  removeExpense,
} from '../services/apiClient';

interface Expense {
  id: string;
  userId: string;
  category: string;
  amount: number;
  description?: string;
  date: string;
}

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expenseData, setExpenseData] = useState<Omit<Expense, 'id'>>({
    userId: '1', // Replace with actual user ID
    category: '',
    amount: 0,
    description: '',
    date: '',
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const response = await fetchExpensesFromApi(expenseData.userId);
      setExpenses(response.data);
    } catch (error) {
      console.error('Failed to load expenses:', error);
      setErrorMessage('Unable to load expenses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addNewExpense(expenseData);
      loadExpenses(); // Reload the list after adding an expense
      setExpenseData({ userId: '1', category: '', amount: 0, description: '', date: '' });
    } catch (error) {
      console.error('Failed to add expense:', error);
      setErrorMessage('Unable to add expense');
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setIsEditMode(true);
    setCurrentEditId(expense.id);
    setExpenseData({
      userId: expense.userId,
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
      date: expense.date,
    });
  };

  const handleUpdateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEditId) return;

    try {
      await modifyExpense(currentEditId, expenseData);
      loadExpenses(); // Reload the list after updating an expense
      setIsEditMode(false);
      setCurrentEditId(null);
      setExpenseData({ userId: '1', category: '', amount: 0, description: '', date: '' });
    } catch (error) {
      console.error('Failed to update expense:', error);
      setErrorMessage('Unable to update expense');
    }
  };

  const handleRemoveExpense = async (id: string) => {
    try {
      await removeExpense(id);
      loadExpenses(); // Reload the list after deleting an expense
    } catch (error) {
      console.error('Failed to delete expense:', error);
      setErrorMessage('Unable to delete expense');
    }
  };

  if (isLoading) return <div className="text-center text-gray-700">Loading...</div>;
  if (errorMessage) return <div className="text-center text-red-500">{errorMessage}</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white shadow rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Expense Tracker</h1>

      <form
        onSubmit={isEditMode ? handleUpdateExpense : handleAddExpense}
        className="mb-8 bg-indigo-50 p-8 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="category"
            placeholder="Expense Category"
            value={expenseData.category}
            onChange={handleInputChange}
            required
            className="border border-indigo-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            name="amount"
            placeholder="Expense Amount"
            value={expenseData.amount}
            onChange={handleInputChange}
            required
            className="border border-indigo-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Expense Description"
            value={expenseData.description}
            onChange={handleInputChange}
            className="border border-indigo-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="date"
            name="date"
            value={expenseData.date}
            onChange={handleInputChange}
            required
            className="border border-indigo-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
        >
          {isEditMode ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      <table className="w-full text-left bg-indigo-50 rounded-lg shadow overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-4 px-6">Category</th>
            <th className="py-4 px-6">Amount</th>
            <th className="py-4 px-6">Description</th>
            <th className="py-4 px-6">Date</th>
            <th className="py-4 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-indigo-100 transition">
              <td className="py-4 px-6">{expense.category}</td>
              <td className="py-4 px-6">{expense.amount.toFixed(2)}</td>
              <td className="py-4 px-6">{expense.description || 'N/A'}</td>
              <td className="py-4 px-6">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="py-4 px-6 flex gap-2">
                <button
                  onClick={() => handleEditExpense(expense)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveExpense(expense.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTracker;
