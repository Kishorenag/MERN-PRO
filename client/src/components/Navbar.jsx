import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userName'); // Clear local storage
    navigate('/'); // Redirect to login page
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#2196F3' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate("/admin")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/all-employees")}>
            Employee List
          </Button>
          <Button color="inherit" onClick={() => navigate("/create-employee")}>
            Create Employee
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" style={{ marginRight: '10px', color: 'white' }}>
            {localStorage.getItem('userName') || 'UserName'}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
