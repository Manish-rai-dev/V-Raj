import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link as RouterLink } from 'react-router-dom';

const Pricing = () => {
  const packages = [
    {
      title: 'Basic Security',
      price: '₹1,999',
      description: 'Perfect for residential properties',
      features: [
        'Standard Door Locks',
        'Basic Security Assessment',
        'Installation Service',
        '1 Year Warranty',
        'Email Support',
      ],
      recommended: false,
    },
    {
      title: 'Professional Security',
      price: '₹4,999',
      description: 'Ideal for small businesses',
      features: [
        'High-Security Locks',
        'Comprehensive Security Assessment',
        'Professional Installation',
        '2 Years Warranty',
        '24/7 Support',
        'Quarterly Maintenance',
        'Security Consultation',
      ],
      recommended: true,
    },
    {
      title: 'Enterprise Security',
      price: '₹9,999',
      description: 'For large organizations',
      features: [
        'Advanced Security Systems',
        'Custom Security Solutions',
        'Priority Installation',
        '3 Years Warranty',
        '24/7 Premium Support',
        'Monthly Maintenance',
        'Security Training',
        'Emergency Response',
      ],
      recommended: false,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Security Solutions Pricing
      </Typography>

      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Choose the perfect security package for your needs
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {packages.map((pkg) => (
          <Grid item xs={12} md={4} key={pkg.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...(pkg.recommended && {
                  border: '2px solid',
                  borderColor: 'primary.main',
                }),
              }}
            >
              {pkg.recommended && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  <Typography variant="subtitle2">Recommended</Typography>
                </Box>
              )}

              <CardHeader
                title={pkg.title}
                subheader={pkg.description}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {pkg.price}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Starting Price
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List>
                  {pkg.features.map((feature) => (
                    <ListItem key={feature}>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant={pkg.recommended ? 'contained' : 'outlined'}
                  color="primary"
                  component={RouterLink}
                  to="/contact"
                >
                  Get Started
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Custom Solutions Section */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Need a Custom Solution?
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We understand that every security need is unique. Contact us for a
          customized security solution tailored to your specific requirements.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/contact"
        >
          Request Custom Quote
        </Button>
      </Box>

      {/* Additional Information */}
      <Box sx={{ mt: 6, bgcolor: 'grey.100', p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          What's Included in All Packages
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Quality Assurance"
                  secondary="All products meet international security standards"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Expert Installation"
                  secondary="Professional installation by certified technicians"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Warranty Coverage"
                  secondary="Comprehensive warranty on all products and services"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Customer Support"
                  secondary="Dedicated support team for all your queries"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Pricing; 