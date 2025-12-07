import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
  InputAdornment,
  Divider,
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import BusinessIcon from '@mui/icons-material/Business';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    // Pre-fill message if coming from catalog
    if (location.state?.prefillMessage) {
      setFormData(prev => ({
        ...prev,
        message: location.state.prefillMessage
      }));
    }
  }, [location.state]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save to Firestore
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || '',
        message: formData.message,
        status: 'new',
        notes: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'contacts'), contactData);

      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #e0e7ff 0%, #f7f9fb 100%)',
        py: { xs: 4, md: 8 },
        display: 'flex',
        alignItems: 'center',
      
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="stretch" sx={{ display: 'flex', justifyContent: 'center' }}>
          {/* Contact Information */}
          <Grid item xs={12} md={5} lg={4.8} >
            <Paper
              elevation={6}
              sx={{
                bgcolor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: 5,
                p: { xs: 3, md: 5 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center', flexDirection: 'column' }}>
                <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: 1 }}
                >
                  Contact Us
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ mb: 3, color: 'text.secondary', fontWeight: 500, display: 'flex', justifyContent: 'center' }}
              >
                Get in touch and send us a message. We are here to help you!
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mt: 1 , display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ fontSize: 30, mr: 2, color: 'secondary.main' }} />
                  <Typography sx={{ fontWeight: 500 }}>
                    5 / 166, Shakti Nagar, Gular Road,<br />Aligarh-202001 (U.P.)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ fontSize: 28, mr: 2, color: 'success.main' }} />
                  <Typography sx={{ fontWeight: 500 }}>9058909777, 8077567066, 7906437574</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ fontSize: 28, mr: 2, color: 'info.main' }} />
                  <Typography sx={{ fontWeight: 500 }}>jatinenterprises1008@gmail.com</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  Business Hours
                </Typography>
                <Typography>Monday - Friday: 9:00 AM - 6:00 PM</Typography>
                <Typography>Saturday: 10:00 AM - 4:00 PM</Typography>
                <Typography>Sunday: Closed</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton href="https://facebook.com" target="_blank" color="primary">
                  <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton href="https://linkedin.com" target="_blank" color="primary">
                  <LinkedInIcon fontSize="large" />
                </IconButton>
                <IconButton href="https://twitter.com" target="_blank" color="primary">
                  <TwitterIcon fontSize="large" />
                </IconButton>
              </Box>
              <Box sx={{ mt: 4, borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.858282365654!2d78.0880123150446!3d27.89739498270039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397477f1e2e2b6e7%3A0x6e2e2e2e2e2e2e2e!2sAligarh%2C%20Uttar%20Pradesh%20202001!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7} lg={7.2}>
            <Paper
              elevation={8}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 5,
                bgcolor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                minHeight: 480,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 700, mb: 2, color: 'primary.main', textAlign: { xs: 'center', md: 'left' } }}
              >
                Send us a Message
              </Typography>
              <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                      required
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ maxWidth: 400 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ maxWidth: 400 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="info" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                      required
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ maxWidth: 400 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="success" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ maxWidth: 400 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SubjectIcon color="secondary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ maxWidth: 400 }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ px: 5, py: 1.5, borderRadius: 3, fontWeight: 700, boxShadow: 3 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact; 