// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import BudgetsPage from './pages/BudgetsPage';
import ReportsPage from './pages/ReportsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
       <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
