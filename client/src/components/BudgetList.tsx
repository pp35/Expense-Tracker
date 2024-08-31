import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { apiClient } from '../services/apiClient'; // Adjust path based on your folder structure

// Define types for the Budget object and the form state
interface Budget {
  id: number;
  userId: number;
  category: string;
  limit: number;
}

interface FormState {
  id: number | null;
  category: string;
  limit: string;
}

const BudgetsList: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [form, setForm] = useState<FormState>({ id: null, category: '', limit: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const userId = 1; // Example: Replace with dynamic user ID if available from context/auth

  // Fetch budgets when the component mounts
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await apiClient.get<Budget[]>(`/budgets/${userId}`);
      setBudgets(response.data);
      clearMessages();
    } catch (err) {
      handleError(err, 'Failed to load budgets');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const budgetData = { ...form, limit: parseFloat(form.limit), userId };

    try {
      if (isEditMode && form.id) {
        await apiClient.put(`/budgets/${form.id}`, budgetData);
        showSuccess('Budget successfully updated');
      } else {
        await apiClient.post('/budgets', budgetData);
        showSuccess('Budget successfully created');
      }
      fetchBudgets();
      resetForm();
    } catch (err) {
      handleError(err, isEditMode ? 'Failed to update budget' : 'Failed to create budget');
    }
  };

  const handleEdit = (budget: Budget) => {
    setForm({ id: budget.id, category: budget.category, limit: budget.limit.toString() });
    setIsEditMode(true);
    clearMessages();
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/budgets/${id}`);
      showSuccess('Budget successfully deleted');
      fetchBudgets();
    } catch (err) {
      handleError(err, 'Failed to delete budget');
    }
  };

  const resetForm = () => {
    setForm({ id: null, category: '', limit: '' });
    setIsEditMode(false);
    clearMessages();
  };

  const handleError = (err: unknown, message: string) => {
    setError(err instanceof Error ? err.message : message);
    clearMessages(true);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setError(null);
  };

  const clearMessages = (onlyError: boolean = false) => {
    setError(onlyError ? error : null);
    setSuccessMessage(onlyError ? successMessage : null);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Manage Budgets</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="border p-3 rounded-md focus:outline-none focus:border-blue-400"
          />
          <input
            type="number"
            name="limit"
            placeholder="Limit"
            value={form.limit}
            onChange={handleChange}
            required
            className="border p-3 rounded-md focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex mt-4">
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300"
          >
            {isEditMode ? 'Update Budget' : 'Create Budget'}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <ul className="list-inside list-disc">
        {budgets.map((budget) => (
          <li key={budget.id} className="mb-2 flex justify-between items-center">
            <span>{budget.category} - ${budget.limit.toFixed(2)}</span>
            <div>
              <button
                onClick={() => handleEdit(budget)}
                className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition duration-300 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(budget.id)}
                className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetsList;
