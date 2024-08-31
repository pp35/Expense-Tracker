// src/pages/ExpensesPage.tsx
import React from 'react';
import ExpenseList from '../components/ExpenseList';
import Navbar from '../components/Navbar';

const ExpensesPage: React.FC = () => {
  // Temporary hardcoded user ID
  const userId = '123'; // Replace this with your actual user ID retrieval logic

  return (
    <div>
      <Navbar />
      <ExpenseList userId={userId} />
    </div>
  );
};

export default ExpensesPage;
