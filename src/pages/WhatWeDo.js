import React from 'react';
import { Container, Typography, Grid, CardContent, CardMedia, Box, Paper, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import SecurityIcon from '@mui/icons-material/Security';
import { Link as RouterLink } from 'react-router-dom';

const whatWeDoSections = [
  {
    title: 'Locks',
    description: 'Vraj Enterprises offers a wide range of high-quality locks designed for maximum security and durability. Our locks are engineered to provide peace of mind for homes and businesses alike.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    icon: <LockIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />,
  },
  {
    title: 'Doors',
    description: 'Our door solutions combine strength, style, and innovation. Vraj Enterprises doors are crafted to complement modern and traditional spaces, ensuring both security and elegance.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    icon: <DoorFrontIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />,
  },
  {
    title: 'Mortises',
    description: 'Discover precision-engineered mortise locks from Vraj Enterprises, designed for smooth operation and long-lasting performance in all types of doors.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    icon: <SecurityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />,
  },
];

const WhatWeDo = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ fontWeight: 700, color: 'primary.main', mb: 4, letterSpacing: 1 }}>
          What We Do
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          At Vraj Enterprises, we are dedicated to providing innovative, reliable, and stylish security solutions for every need. Our expertise covers a wide spectrum of products, from advanced locks to elegant doors and precision mortises.
        </Typography>
        <Grid container spacing={6}>
          {whatWeDoSections.map((section, idx) => (
            <Grid item xs={12} md={4} key={section.title}>
              <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, boxShadow: '0 8px 24px rgba(184,134,11,0.08)' }}>
                {section.icon}
                <CardMedia
                  component="img"
                  height="180"
                  image={section.image}
                  alt={section.title}
                  sx={{ borderRadius: 2, mb: 2, width: '100%', objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {section.description}
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'text.primary', fontWeight: 600 }}>
            Why Choose Vraj Enterprises?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            With decades of experience and a passion for excellence, Vraj Enterprises stands out for its commitment to quality, customer satisfaction, and continuous innovation. We believe in building trust through every product and service we offer.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/contact"
            sx={{ borderRadius: 3, px: 6, py: 2, fontWeight: 600 }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default WhatWeDo; 