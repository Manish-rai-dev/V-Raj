import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Carousel from 'react-material-ui-carousel';

const Customers = () => {
  // Sample customer data - replace with actual data from API
  const businessCustomers = [
    {
      id: 1,
      name: 'Rohit Enterprises',
      icon: <StorefrontIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      description: 'Local hardware store, Jaipur',
      testimonial: 'V-Raj Locks products are a hit with my customers. Reliable and affordable!'
    },
    {
      id: 2,
      name: 'Mehta Constructions',
      icon: <BuildIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      description: 'Small builder, Surat',
      testimonial: 'We use V-Raj Locks for all our residential projects. Great quality and service.'
    },
    {
      id: 3,
      name: 'SecureStay PG',
      icon: <ApartmentIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      description: 'Paying guest accommodation, Pune',
      testimonial: 'Our tenants feel safe thanks to V-Raj Locks. Highly recommended for hostels and PGs.'
    },
    {
      id: 4,
      name: 'Kapoor Interiors',
      icon: <BusinessIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      description: 'Interior designer, Delhi',
      testimonial: 'Stylish locks that match our modern designs. Clients love the finish!'
    },
  ];

  const homeowners = [
    {
      id: 1,
      name: 'Amit Sharma',
      icon: <HomeIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      description: 'Homeowner, Mumbai',
      testimonial: 'The Premium Door Lock is sturdy and stylish. Installation was a breeze!'
    },
    {
      id: 2,
      name: 'Priya Verma',
      icon: <PersonIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      description: 'Small Builder, Pune',
      testimonial: 'V-Raj Locks products are reliable and my clients are always satisfied.'
    },
    {
      id: 3,
      name: 'Rahul Mehta',
      icon: <BuildIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      description: 'Apartment Resident, Delhi',
      testimonial: 'Great value for money and excellent after-sales support.'
    },
    {
      id: 4,
      name: 'Sneha Kapoor',
      icon: <HomeIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      description: 'Homeowner, Bangalore',
      testimonial: 'The locks add elegance and security to my new home.'
    },
  ];

  const industries = [
    {
      title: 'Corporate',
      count: '500+',
      icon: <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />,
      description: 'Serving major corporations across India',
    },
    {
      title: 'Residential',
      count: '10,000+',
      icon: <HomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />,
      description: 'Securing homes and apartments',
    },
    {
      title: 'Government',
      count: '100+',
      icon: <ApartmentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />,
      description: 'Trusted by government institutions',
    },
    {
      title: 'Educational',
      count: '200+',
      icon: <BuildIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />,
      description: 'Protecting educational institutions',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>
        Our Valued Customers
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Trusted by leading organizations, homeowners, and builders across India
      </Typography>

      {/* Industry Statistics */}
      <Box sx={{ my: 6, display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>
          {industries.map((industry) => (
            <Grid item xs={12} sm={6} md={3} key={industry.title}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(184,134,11,0.08)',
                  bgcolor: '#fffbe7',
                }}
              >
                {industry.icon}
                <Typography variant="h3" color="primary" gutterBottom>
                  {industry.count}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {industry.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {industry.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6, borderColor: 'primary.main', borderBottomWidth: 3 }} />

      {/* Business Clients */}
      <Typography variant="h4" gutterBottom sx={{ mt: 6, color: 'primary.main', fontWeight: 600 }}>
        Featured Business Clients
      </Typography>
      <Carousel
        navButtonsAlwaysVisible
        autoPlay={false}
        indicators={businessCustomers.length > 1}
        sx={{ mb: 4 }}
        animation="slide"
        interval={8000}
      >
        {businessCustomers.map((customer) => (
          <Box key={customer.id} sx={{ px: { xs: 0, sm: 8 }, py: 2, display: 'flex', justifyContent: 'center' }}>
            <Card elevation={4} sx={{
              width: { xs: '100%', sm: 500, md: 600 },
              borderRadius: 4,
              bgcolor: '#fff',
              boxShadow: '0 4px 24px rgba(184,134,11,0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {customer.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {customer.description}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    pl: 2,
                    py: 1,
                    color: 'text.secondary',
                  }}
                >
                  "{customer.testimonial}"
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>

      <Divider sx={{ my: 6, borderColor: 'secondary.main', borderBottomWidth: 3 }} />

      {/* Homeowners & Small Builders */}
      <Typography variant="h4" gutterBottom sx={{ mt: 6, color: 'secondary.main', fontWeight: 600 }}>
        Homeowners & Small Builders
      </Typography>
      <Carousel
        navButtonsAlwaysVisible
        autoPlay={false}
        indicators={homeowners.length > 1}
        sx={{ mb: 4 }}
        animation="slide"
        interval={8000}
      >
        {homeowners.map((customer) => (
          <Box key={customer.id} sx={{ px: { xs: 0, sm: 8 }, py: 2, display: 'flex', justifyContent: 'center' }}>
            <Card elevation={4} sx={{
              width: { xs: '100%', sm: 500, md: 600 },
              borderRadius: 4,
              bgcolor: '#fff',
              boxShadow: '0 4px 24px rgba(184,134,11,0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {customer.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
                      {customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {customer.description}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    pl: 2,
                    py: 1,
                    color: 'text.secondary',
                  }}
                >
                  "{customer.testimonial}"
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>

      {/* Call to Action */}
      <Box
        sx={{
          mt: 8,
          p: 4,
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 3,
          textAlign: 'center',
          boxShadow: '0 4px 24px rgba(184,134,11,0.12)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Join Our Growing List of Satisfied Customers
        </Typography>
        <Typography variant="body1" paragraph>
          Experience the same level of security and service that our existing customers enjoy. Contact us today to discuss your security needs.
        </Typography>
      </Box>
    </Container>
  );
};

export default Customers; 