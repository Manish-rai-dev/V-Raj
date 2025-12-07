import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              V-Raj Locks
            </Typography>
            <Typography variant="body2">
              At Vraj, we take pride in being a trusted manufacturer of high-quality mortise locksets, delivering superior security and style for residential and commercial spaces. Backed by years of experience and supported by Janton Enterprises, we are committed to craftsmanship, innovation, and exceptional customer service.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Address: 5 / 166, Shakti Nagar, Gular Road,<br />
              Aligarh-202001 (U.P.)<br />
              Phone: 9058909777, 8077567066, 7906437574<br />
              Email: jatinenterprises1008@gmail.com
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="https://www.facebook.com/share/1B7XxewkaJ/?mibextid=wwXIfr" color="inherit" target="_blank" rel="noopener">
                <FacebookIcon />
              </Link>
              <Link href="https://www.instagram.com/vraj_products?igsh=MWVpZTd5Z3hxbW5mNw==" color="inherit" target="_blank" rel="noopener">
                <InstagramIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} V-Raj Locks. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 