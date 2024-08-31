import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ExpenseForm from './components/expenses/ExpenseForm';
import BudgetForm from './components/budgets/BudgetForm';
import ReportGenerator from './components/reports/Reports';

const RoutesComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses/add" element={<ExpenseForm onSuccess={() => { /* Refresh or navigate */ }} />} />
        <Route path="/budgets/add" element={<BudgetForm onSuccess={() => { /* Refresh or navigate */ }} />} />
        <Route path="/reports" element={<ReportGenerator />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
