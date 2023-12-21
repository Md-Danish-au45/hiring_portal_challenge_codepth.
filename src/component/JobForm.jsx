
import React, { useState, useEffect } from 'react';
import { firestore, auth } from './firebase'; // Assuming 'auth' is the Firebase authentication reference
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'; // Import NotificationsActiveIcon

const JobForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [applicationDueDate, setApplicationDueDate] = useState('');
  const [location, setLocation] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(0);
  

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  };

  const sendNotification = () => {
    // Implement your notification logic here
    // Example: Trigger a browser notification or Firebase Cloud Messaging (FCM) notification
    // For browser notification:
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Job Posted', {
        body: `A new job titled "${jobTitle}" has been posted.`,
      });
    }
    // For Firebase Cloud Messaging (FCM):
    // Implement FCM logic to send a notification to relevant devices/users
    // Refer to Firebase FCM documentation for implementation details
  };
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (!jobTitle || !jobDescription || !contactEmail || !applicationDueDate || !location) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const currentUser = auth.currentUser;

      if (currentUser && currentUser.uid) {
        await firestore.collection('jobListings').add({
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          contactEmail: contactEmail,
          applicationDueDate: applicationDueDate,
          location: location,
          userId: currentUser.uid,
        });
        sendNotification();

        alert(`A new job titled "${jobTitle}" has been posted.`);

        window.location.href = '/';

      } else {
        alert('Please log in first.');
      }
    } catch (err) {
      console.error('Error adding job:', err);
    }
  };
  

  return (
    <Container style={{display:"flex",justifyContent:"center",alignContent:"center",flexDirection:"column"}}>
      <Typography variant="h2" gutterBottom style={{borderBottom:"Highlight"}}>
        Create Jobs
      </Typography>
      {loggedIn ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleJobSubmit}>
              <TextField
                fullWidth
                label="Job Title"
                variant="outlined"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Job Description"
                variant="outlined"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                fullWidth
                type="email"
                label="Contact Email"
                variant="outlined"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                margin="normal"
              />
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleJobSubmit}>
              <TextField
                fullWidth
                type="date"
                label="Application Due Date"
                variant="outlined"
                value={applicationDueDate}
                onChange={(e) => setApplicationDueDate(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Create Job
              </Button>
              <NotificationsActiveIcon style={{color:"red",fontSize:30,float:"right",marginTop:"25px"}} />

            </form>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">
          Please log in to create a job listing.
          {/* You can add a button or link to redirect to the login page */}
          {/* Example: <Link to="/login">Login</Link> */}
        </Typography>
      )}
    </Container>
  );
};

export default JobForm;
