import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPage = () => {
  const [f_userName, setUserName] = useState('');
  const [f_Pwd, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

   // Check if user is already logged in
   useEffect(() => {
    if (localStorage.getItem('userName')) {
      navigate('/admin'); // Redirect to AdminPage if logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('http://localhost:8000/login', {
        f_userName,
        f_Pwd,
      });
      
      localStorage.setItem('userName', f_userName);
      // If login is successful, navigate to the admin page
      navigate('/admin', { replace: true }); // Replace '/admin' with your actual admin page route
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        setErrorMessage(error.response.data.msg);
      } else {
        // Something happened in setting up the request
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 3,
          border: '1px solid lightgray',
          borderRadius: '5px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login Page
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label="User Name"
            variant="outlined"
            value={f_userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            value={f_Pwd}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Typography color="error" variant="body2" align="center">
              {errorMessage}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
