import React from 'react';
import ReportTable from '@/components/ReportTable';
import ReportForm from '@/components/ReportForm';

const Reportes: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <ReportTable />
      <ReportForm />
    </div>
  );
};

export default Reportes;