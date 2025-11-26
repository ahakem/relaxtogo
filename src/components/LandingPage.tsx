import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import {
  SelfImprovement,
  Spa,
  AccessibilityNew,
  Schedule,
  Email,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

export default function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const services = [
    {
      title: 'Chair Massage',
      description: 'Professional chair massage sessions at your location',
      icon: <Spa sx={{ fontSize: 40 }} />,
      duration: '15-30 min',
    },
    {
      title: 'Yoga Videos',
      description: 'Curated collection of yoga sessions for all levels',
      icon: <SelfImprovement sx={{ fontSize: 40 }} />,
      duration: '10-60 min',
    },
    {
      title: 'Wellness Programs',
      description: 'Complete wellness solutions for companies',
      icon: <AccessibilityNew sx={{ fontSize: 40 }} />,
      duration: 'Custom',
    },
  ];

  return (
    <Box>
      <NavigationHeader />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(46, 125, 50, 0.7), rgba(124, 179, 66, 0.7)), url(/relaxtogo/images/wellness-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: { xs: '70vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Relax to go
          </Typography>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{ 
              mb: 2, 
              fontWeight: 500,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Voel je meer ontspannen, gefocust en fit
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              mb: 4, 
              maxWidth: 600, 
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            Professionele wellness diensten en stoelmassage op uw locatie
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ 
                px: 4, 
                py: 2, 
                borderRadius: 3,
                backgroundColor: 'white',
                color: 'primary.main',
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'grey.100',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              }}
              onClick={() => navigate('/chair-massage')}
            >
              Stoelmassage Boeken
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                px: 4, 
                py: 2, 
                borderRadius: 3,
                borderColor: 'white',
                color: 'white',
                fontSize: '1.1rem',
                borderWidth: 2,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
              onClick={() => navigate('/align')}
            >
              Yoga Video's
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Our Services
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {service.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {service.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {service.description}
                </Typography>
                <Chip
                  icon={<Schedule />}
                  label={service.duration}
                  variant="outlined"
                  color="primary"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Chair Massage CTA */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Chair Massage on Location
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Bring wellness directly to your company or event
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              px: 4,
              py: 2,
              borderRadius: 3,
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
            href="#contact"
          >
            Contact for Chair Massage
          </Button>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }} id="contact">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Get in Touch
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              <Email sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Contact Us
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Ready to bring wellness to your workplace?
              </Typography>
              <Button
                variant="contained"
                size="large"
                href="mailto:contact@relaxtogo.nl"
                sx={{ borderRadius: 2 }}
              >
                Send Email
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}