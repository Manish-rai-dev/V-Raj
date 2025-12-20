import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportIcon from '@mui/icons-material/Support';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Carousel from 'react-material-ui-carousel';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Premium Security',
      description: 'State-of-the-art locking solutions for maximum protection',
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />,
      title: 'Quality Assured',
      description: 'All products meet international security standards',
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service and technical support',
    },
  ];

  // About Us section images from Catalog
  const aboutUsImages = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895758/DSC_4651_copy_lekegz.jpg',
      alt: 'JE-501 - V-Raj Locks Product',
      code: 'JE-501',
      description: 'Material: SS Plate Zinc Handle\nFinish: SS, Ant., S/RG, B/RG, B/CP, Ant./Gold, Full Gold etc.\nSize: 200mm, 250mm\nProfile: KY, CY & BR',
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895738/DSC_4652_copy_rxnqtj.jpg',
      alt: 'JE-502 - V-Raj Locks Product',
      code: 'JE-502',
      description: 'Material: SS Plate Zinc Handle\nFinish: SS, Ant., S/RG, B/RG, B/CP, Ant./Gold, Full Gold etc.\nSize: 200mm, 250mm\nProfile: KY, CY & BR',
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895722/DSC_4655_copy_jw6s2h.jpg',
      alt: 'JE-503 - V-Raj Locks Product',
      code: 'JE-503',
      description: 'Material: SS Plate Zinc Handle\nFinish: SS, Ant., S/RG, B/RG, B/CP, Ant./Gold, Full Gold etc.\nSize: 200mm, 250mm\nProfile: KY, CY & BR',
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/ds0mdzvkd/image/upload/v1763895721/DSC_4653_copy_mem7jt.jpg',
      alt: 'JE-504 - V-Raj Locks Product',
      code: 'JE-504',
      description: 'Material: SS Plate Zinc Handle\nFinish: SS, Ant., S/RG, B/RG, B/CP, Ant./Gold, Full Gold etc.\nSize: 200mm, 250mm\nProfile: KY, CY & BR',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?locks)',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
          >
            Secure Your World with V-Raj Locks
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Premium security solutions for homes and businesses
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/catalog"
            size="large"
          >
            Explore Our Products
          </Button>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" sx={{ width: '100%' }} style={{width: '100%'  , display: 'flex', justifyContent: 'center'}}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1" paragraph>
                At Vraj, we take pride in being a trusted manufacturer of high-quality mortise locksets, delivering superior security and style for residential and commercial spaces. With a commitment to craftsmanship, innovation, and durability, we design and produce locksets that meet the highest standards of performance and aesthetics.
              </Typography>
              <Typography variant="body1" paragraph>
                Founded with a vision to bring excellence to the hardware industry, Vraj has built a reputation for precision engineering, reliable products, and exceptional customer service. Every lockset we create reflects our dedication to quality, safety, and long-lasting value.
              </Typography>
              <Typography variant="body1" paragraph>
                Backed by years of experience and supported by Jatin Enterprises, our parent company, we continue to evolve with modern trends while upholding the integrity of traditional workmanship. Whether you're building a new home or upgrading your existing setup, Vraj offers locking solutions that are both secure and stylish.
              </Typography>
              <Typography variant="body1" paragraph>
                Join the growing number of customers who trust Vraj for peace of mind and performance — where security meets style.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/contact"
              >
                Contact Us
              </Button>
            </Grid>
            <Grid item xs={12} md={6} style={{width: '100%'}}>
              {isMobile ? (
                // Mobile: Slider/Carousel view
                <Carousel
                  autoPlay={true}
                  interval={4000}
                  animation="slide"
                  indicators={true}
                  navButtonsAlwaysVisible={true}
                  sx={{
                    '& .CarouselItem': {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  }}
                >
                  {aboutUsImages.map((image) => (
                    <Box key={image.id} sx={{ px: 1, py: 2, display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: 3,
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: 8,
                          },
                          position: 'relative',
                          overflow: 'hidden',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          maxWidth: '90%',
                          mx: 'auto',
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: 280,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: '#f5f5f5',
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={image.url}
                            alt={image.alt}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center',
                            }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
                            }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                            {image.code}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                            {image.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Carousel>
              ) : (
                // Desktop: Grid view with 4 images
                <Grid container spacing={2}  style={{width: '100%',display: 'flex', justifyContent: 'center'}}>
                  {aboutUsImages.map((image) => (
                    <Grid item xs={12} sm={6} md={3} key={image.id}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: 3,
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: 8,
                          },
                          position: 'relative',
                          overflow: 'hidden',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: 250,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: '#f5f5f5',
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={image.url}
                            alt={image.alt}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center',
                            }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
                            }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                            {image.code}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                            {image.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* What We Believe In Section */}
      <Box sx={{ bgcolor: '#fdfde7', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 4, letterSpacing: 1, color: 'text.primary' }}
          >
            WHAT WE BELIEVE IN
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={6} sx={{ p: 4, textAlign: 'center', borderRadius: 6, boxShadow: '0 8px 24px rgba(184,134,11,0.08)', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <SecurityIcon sx={{ fontSize: 90, color: '#5a3b18', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#5a3b18', mb: 1 }}>
                  TRUST
                </Typography>
                <Typography variant="body1" sx={{ color: '#5a3b18', fontSize: 20 }}>
                  We build with precision so you can feel secure.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={6} sx={{ p: 4, textAlign: 'center', borderRadius: 6, boxShadow: '0 8px 24px rgba(184,134,11,0.08)', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowCircleUpIcon sx={{ fontSize: 90, color: '#5a3b18', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#5a3b18', mb: 1 }}>
                  PROGRESSION
                </Typography>
                <Typography variant="body1" sx={{ color: '#5a3b18', fontSize: 20 }}>
                  We’re always innovating to bring you the latest and greatest.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={6} sx={{ p: 4, textAlign: 'center', borderRadius: 6, boxShadow: '0 8px 24px rgba(184,134,11,0.08)', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <FactCheckIcon sx={{ fontSize: 90, color: '#5a3b18', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#5a3b18', mb: 1 }}>
                  QUALITY
                </Typography>
                <Typography variant="body1" sx={{ color: '#5a3b18', fontSize: 20 }}>
                  Durability and style are at the heart of everything we create.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Know More About Us and Our Products Section */}
      <Box sx={{ bgcolor: '#fdfde7', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}
              >
                KNOW MORE<br />ABOUT US AND OUR<br />PRODUCTS!
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 20, color: '#222', mb: 2 }}>
                Fill out your contact details by tapping the 'Contact Us' button to dive deeper into the world of Plus Point!
              </Typography>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: 'center' }}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{
                  borderRadius: '50px',
                  px: 8,
                  py: 3,
                  fontSize: 28,
                  fontWeight: 600,
                  borderWidth: 2,
                  borderColor: '#222',
                  color: '#222',
                  background: '#fcfbe2',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  '&:hover': {
                    background: '#f7f5c8',
                    borderColor: '#B8860B',
                  },
                }}
              >
                CONTACT US
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 