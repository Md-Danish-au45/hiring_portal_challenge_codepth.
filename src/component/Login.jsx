import React, { useState } from 'react';
import { auth } from './firebase';
import { Typography, TextField, Button, Paper } from '@mui/material';

const Login = () => {
    const styles = {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        },
        formContainer: {
          padding: '2rem',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        },
        inputField: {
          margin: '0.5rem',
          width: '100%',
        },
        submitButton: {
          margin: '1rem 0',
        },
        errorText: {
          color: 'red',
        },
      };
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Set loggedIn to true upon successful login
      setLoggedIn(true);
    } catch (err) {
      setError(err.message);
    }
  };
  console.log(handleLogin,"login success")

  if (loggedIn) {
    // Redirect to /dashboard or desired page after successful login
    window.location.href = '/home';
    // You can replace '/dashboard' with the desired URL
    // This will simulate redirection by changing the window's location
  }

  return (
    <div style={styles.root}>
    <Paper elevation={3} style={styles.formContainer}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          style={styles.inputField}
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          style={styles.inputField}
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          style={styles.submitButton}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </form>
      {error && (
        <Typography style={styles.errorText} variant="body2" gutterBottom>
          {error}
        </Typography>
      )}
    </Paper>
  </div>
  );
};

export default Login;
