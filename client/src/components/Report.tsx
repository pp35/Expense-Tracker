import React from 'react';
import axios from 'axios';

const ReportGenerator: React.FC = () => {
  const downloadReport = async (reportType: 'monthly' | 'yearly') => {
    try {
      const result = await axios.get(`/api/reports/${reportType}`, {
        responseType: 'blob',
      });

      const blobUrl = window.URL.createObjectURL(new Blob([result.data]));
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.setAttribute('download', `${reportType}-report.xlsx`);

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } catch (err) {
      console.error('Failed to generate report:', err);
    }
  };

  return (
    <section className="container mx-auto p-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Download Reports</h1>
      <div className="space-x-4">
        <button
          onClick={() => downloadReport('monthly')}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all"
        >
          Download Monthly Report
        </button>
        <button
          onClick={() => downloadReport('yearly')}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all"
        >
          Download Yearly Report
        </button>
      </div>
    </section>
  );
};

export default ReportGenerator;
