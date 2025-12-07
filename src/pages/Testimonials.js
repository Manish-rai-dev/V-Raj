import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Carousel from 'react-material-ui-carousel';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

const pastelColors = [
  '#e0f7fa', // cyan
  '#ffe0b2', // orange
  '#f8bbd0', // pink
  '#dcedc8', // green
  '#fff9c4', // yellow
  '#b3e5fc', // blue
  '#f0f4c3', // lime
  '#ffecb3', // amber
];

const getPastelColor = (index) => pastelColors[index % pastelColors.length];

const dummyTestimonials = [
  {
    name: 'Amit Sharma',
    company: 'Homeowner',
    testimonial: 'The Premium Door Lock is sturdy and stylish. Installation was a breeze!',
    product: 'Premium Door Lock',
    rating: 4.5,
  },
  {
    name: 'Priya Verma',
    company: 'Tech Solutions',
    testimonial: 'Digital Padlock is a game changer for our office lockers. Highly recommend!',
    product: 'Digital Padlock',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    company: 'Apartment Resident',
    testimonial: 'Full Zinc Mortise handle feels premium and secure. Great value for money.',
    product: 'Full Zinc Mortise Handle',
    rating: 4,
  },
  {
    name: 'Sneha Kapoor',
    company: 'Interior Designer',
    testimonial: 'SS Pull handles add elegance to my client projects. Love the finish!',
    product: 'SS Pull Handles',
    rating: 4.8,
  },
  {
    name: 'Vikram Singh',
    company: 'Business Owner',
    testimonial: 'Iron Mortise handle is robust and reliable. Perfect for our warehouse doors.',
    product: 'Iron Mortise Handle',
    rating: 4.2,
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    rating: 5,
    testimonial: '',
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(dummyTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(dummyTestimonials);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: '',
      company: '',
      rating: 5,
      testimonial: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchTestimonials();
        handleCloseDialog();
      } else {
        throw new Error('Failed to submit testimonial');
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h3">Customer Testimonials</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
        >
          Share Your Experience
        </Button>
      </Box>

      {testimonials.length > 0 && (
        <Carousel
          autoPlay={false}
          navButtonsAlwaysVisible
          indicators={testimonials.length > 1}
          sx={{ mb: 6 }}
        >
          {testimonials.map((testimonial, idx) => (
            <Box
              key={testimonial._id || idx}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 320,
                px: 2,
              }}
            >
              <Card
                sx={{
                  width: { xs: '100%', sm: 500, md: 600 },
                  bgcolor: '#fff',
                  borderRadius: 3,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  border: '1px solid #eee',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minHeight: 280,
                  mx: 'auto',
                }}
              >
                <CardContent sx={{ flexGrow: 1, pb: 1, width: '100%' }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontSize: '1.15rem',
                      color: '#333',
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}
                  >
                    {testimonial.testimonial}
                  </Typography>
                  {testimonial.product && (
                    <Typography variant="subtitle2" sx={{ color: 'primary.main', textAlign: 'center', mb: 1 }}>
                      Product: {testimonial.product}
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                    <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: '#f5f5f5' }}>
                      {testimonial.name ? testimonial.name[0] : <PersonIcon fontSize="large" />}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#222' }}>
                      {testimonial.customerName || testimonial.name}
                    </Typography>
                    {testimonial.company && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {testimonial.company}
                      </Typography>
                    )}
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      precision={0.5}
                      icon={<StarIcon fontSize="inherit" />}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Carousel>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Share Your Experience</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Company (Optional)"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              margin="normal"
            />
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                precision={0.5}
                icon={<StarIcon fontSize="inherit" />}
              />
            </Box>
            <TextField
              fullWidth
              label="Your Testimonial"
              name="testimonial"
              multiline
              rows={4}
              value={formData.testimonial}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Testimonials; 