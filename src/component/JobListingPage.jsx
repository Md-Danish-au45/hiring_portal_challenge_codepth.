import React, { useState, useEffect } from 'react';
import { firestore,auth } from './firebase';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { NavLink } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  MozUserFocus:"select-menu",
  cursor:"pointer",
  margin: '20px', // Adjust margin as needed
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiCardContent-root': {
      height: 150,
    },
  },
}));

const JobListingsPage = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        window.location.href = '/';


      }
    });
  };
  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const jobListingsCollection = await firestore.collection('jobListings').get();
        const fetchedListings = jobListingsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobListings(fetchedListings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setError('Error fetching job listings');
        setLoading(false);
      }
    };

    fetchJobListings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!loggedIn) {
    // Redirect to the login page if the user is not logged in
    return <NavLink to="/" />;
  }

  return (
    <div>
        <div style={{display:"flex",justifyContent:"space-around",flexDirection:"row"}}>
        <h2>All Job Listings</h2>
        <NotificationsActiveIcon style={{color:"red",fontSize:30,float:"right",marginTop:"25px"}}/>
        </div>
     
      <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:"space-around" }}>
        {jobListings.map((listing) => (
          <StyledCard key={listing.id} href={`/job/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CardMedia
              component="img"
              image={"https://media.istockphoto.com/id/506351726/photo/recruiter-advertising-for-job-vacancies-searching-candidates-to-hire.jpg?s=612x612&w=0&k=20&c=JNtjXENGX7igzXRDCaifzEcRox2FCUPzF0hptTK3dRw="} // Replace with the URL for the job image
              title={listing.jobTitle}
            />
            <CardContent style={{ flexDirection: "column", display: "flex", alignItems: "flex-start" }}>
  <Typography style={{ color: "black", marginBottom: 8 }} variant="h5" component="div">
    {listing.jobTitle}
  </Typography>
  <Typography style={{ marginBottom: 4 }} variant="body2" color="text.secondary">
    {listing.jobDescription}
  </Typography>
  <Typography style={{ marginBottom: 4 }} variant="body2" color="text.secondary">
    Contact Email: {listing.contactEmail}
  </Typography>
  <Typography style={{ marginBottom: 4 }} variant="body2" color="text.secondary">
    Application Due Date: {listing.applicationDueDate}
  </Typography>
  <Typography style={{ marginBottom: 4 }} variant="body2" color="text.secondary">
    Location: {listing.location}
  </Typography>
</CardContent>

          </StyledCard>
        ))}

      </div>
      
    </div>
  );
};

export default JobListingsPage;
