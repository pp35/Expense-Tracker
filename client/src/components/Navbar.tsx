// src/components/Header.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-700 py-5 text-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/dashboard" className="text-xl font-bold hover:text-white transition">
          My Expense App
        </NavLink>
        <nav className="space-x-6">
          <NavLink
            to="/expenses"
            className="hover:text-indigo-300 transition"
            activeClassName="text-white font-semibold"
          >
            Expenses
          </NavLink>
          <NavLink
            to="/budgets"
            className="hover:text-indigo-300 transition"
            activeClassName="text-white font-semibold"
          >
            Budgets
          </NavLink>
          <NavLink
            to="/reports"
            className="hover:text-indigo-300 transition"
            activeClassName="text-white font-semibold"
          >
            Reports
          </NavLink>
          <NavLink
            to="/"
            className="hover:text-red-300 transition"
            activeClassName="text-white font-semibold"
          >
            Logout
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
