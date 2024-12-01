import React from 'react';
import ReportTable from '@/components/Reports/ReportTable';
import ReportForm from '@/components/Reports/ReportForm';

const Reportes: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <ReportTable />
      <ReportForm />
    </div>
  );
};

export default Reportes;