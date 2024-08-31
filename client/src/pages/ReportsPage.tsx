// src/pages/ReportsPage.tsx
import React from 'react';
import Report from '../components/Report';
import Navbar from '../components/Navbar';

const ReportsPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Report />
    </div>
  );
};

export default ReportsPage;
