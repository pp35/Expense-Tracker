import React, { useEffect, useState } from 'react';
import { apiClient } from '../services/apiClient';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'; // Import Recharts components

interface Budget {
  id: number;
  userId: number;
  category: string;
  limit: number;
}

interface Expense {
  id: string;
  userId: string;
  category: string;
  amount: number;
  description?: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const userId = 1; // Replace with dynamic user ID if available from context/auth
      const [budgetResponse, expenseResponse] = await Promise.all([
        apiClient.get<Budget[]>(`/budgets/${userId}`),
        apiClient.get<Expense[]>(`/expenses/${userId}`),
      ]);

      setBudgets(budgetResponse.data);
      setExpenses(expenseResponse.data);
      computeTotals(budgetResponse.data, expenseResponse.data);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  };

  const computeTotals = (budgets: Budget[], expenses: Expense[]) => {
    const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const totalBudget = budgets.reduce((acc, budget) => acc + budget.limit, 0);
    const remaining = totalBudget - totalSpent;

    setTotalExpenses(totalSpent);
    setRemainingBudget(remaining);
  };

  // Prepare data for the pie chart
  const pieData = budgets.map((budget) => {
    const spentInCategory = expenses
      .filter((expense) => expense.category === budget.category)
      .reduce((acc, expense) => acc + expense.amount, 0);
    return { name: budget.category, value: spentInCategory };
  });

  const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f']; // Different color scheme for pie chart

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-semibold mb-8 text-gray-800">Budget Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 shadow rounded-md hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-lg font-semibold mb-3">Total Expenses</h2>
          <p className="text-3xl text-gray-700">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-8 shadow rounded-md hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-lg font-semibold mb-3">Remaining Budget</h2>
          <p className="text-3xl text-gray-700">${remainingBudget.toFixed(2)}</p>
        </div>
        <div className="bg-white p-8 shadow rounded-md hover:shadow-lg transition-shadow duration-200 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#82ca9d">
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6">
            {budgets.map((budget) => {
              const spentInCategory = expenses
                .filter((expense) => expense.category === budget.category)
                .reduce((acc, expense) => acc + expense.amount, 0);
              const remainingInCategory = budget.limit - spentInCategory;

              return (
                <div key={budget.id} className="mb-4">
                  <h3 className="text-lg font-medium">{budget.category}</h3>
                  <p className="text-sm text-gray-600">Spent: ${spentInCategory.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Remaining: ${remainingInCategory.toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
