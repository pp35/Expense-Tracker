// src/pages/BudgetsPage.tsx
import React from 'react';
import BudgetList from '../components/BudgetList';
import Navbar from '../components/Navbar';

const BudgetsPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <BudgetList />
    </div>
  );
};

export default BudgetsPage;
