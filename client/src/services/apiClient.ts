import axios from 'axios';

// Define constants for API endpoints
const BASE_URL = 'http://localhost:3000/api';
const AUTH_TOKEN_KEY = 'authToken'; // Key for storing the token in localStorage

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to include authorization token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API
export const authService = {
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const token = response.data?.token;
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
};

// Expense API
export const expenseService = {
  create: (expense: { userId: string; description: string; amount: number; date: string; category: string }) =>
    api.post('/expenses', expense),

  getAll: (userId: string) => api.get(`/expenses/${userId}`),

  update: (id: string, updatedExpense: Partial<{ description: string; amount: number; date: string; category: string }>) =>
    api.put(`/expenses/${id}`, updatedExpense),

  delete: (id: string) => api.delete(`/expenses/${id}`),
};

// Budget API
export const budgetService = {
  create: (budget: { userId: string; category: string; limit: number }) =>
    api.post('/budgets', budget),

  getAll: (userId: string) => api.get(`/budgets/${userId}`),

  update: (id: string, updatedBudget: Partial<{ category: string; limit: number }>) =>
    api.put(`/budgets/${id}`, updatedBudget),

  delete: (id: string) => api.delete(`/budgets/${id}`),
};
