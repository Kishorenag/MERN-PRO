import React from 'react';
import { Typography } from '@mui/material';

const AdminPage = () => {
  return (
    <div>
      <Typography variant="h4" style={{ margin: '20px' }}>
        Welcome, {localStorage.getItem('userName') || 'Admin'}
      </Typography>
      {/* Add additional content for Admin Panel here */}
      <Typography variant="h6" style={{ margin: '20px' }}>
        This is the Admin Dashboard. You can manage employees and view details here.
      </Typography>
    </div>
  );
};

export default AdminPage;
