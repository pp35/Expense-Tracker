// src/pages/DashboardPage.tsx
import React from 'react';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
