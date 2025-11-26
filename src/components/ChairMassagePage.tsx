import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import { 
  Spa, 
  AccessTime, 
  CheckCircle,
  BusinessCenter,
  Event,
} from '@mui/icons-material';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

export default function ChairMassagePage() {

  const benefits = [
    'Reduces muscle tension and stress',
    'Improves blood circulation',
    'Increases alertness and focus',
    'Boosts employee morale',
    'No need to undress or use oils',
    'Quick and convenient'
  ];

  const serviceOptions = [
    {
      title: 'Corporate Events',
      description: 'Perfect for team building days, wellness weeks, or company celebrations',
      icon: <BusinessCenter sx={{ fontSize: 40 }} />,
      duration: '2-8 hours',
    },
    {
      title: 'Regular Office Visits',
      description: 'Weekly or monthly visits to maintain employee wellness',
      icon: <Spa sx={{ fontSize: 40 }} />,
      duration: '4-6 hours',
    },
    {
      title: 'Special Events',
      description: 'Conferences, trade shows, or private gatherings',
      icon: <Event sx={{ fontSize: 40 }} />,
      duration: 'Custom',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavigationHeader />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(46, 125, 50, 0.6), rgba(124, 179, 66, 0.6)), url(/relaxtogo/images/chair-massage.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Stoelmassage
              </Typography>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                op locatie
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                Voel je meer ontspannen, gefocust en fit in 20 minuten!
              </Typography>
              <Button
                variant="contained"
                size="large"
                href="mailto:kaminichance@gmail.com"
                sx={{ 
                  px: 4, 
                  py: 2, 
                  borderRadius: 3,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                }}
              >
                Contact voor Boekingen
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Spa sx={{ fontSize: 120, color: 'primary.main' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Why Chair Massage?
        </Typography>
        
        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ color: 'primary.main', mr: 2 }} />
                <Typography variant="body1">{benefit}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Service Options */}
      <Box sx={{ backgroundColor: 'grey.50', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
            Service Options
          </Typography>
          
          <Grid container spacing={4}>
            {serviceOptions.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={2} 
                  sx={{ 
                    height: '100%', 
                    textAlign: 'center', 
                    p: 3,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {service.description}
                    </Typography>
                    <Chip
                      icon={<AccessTime />}
                      label={service.duration}
                      variant="outlined"
                      color="primary"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Book?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Contact us for an effective chair massage at your company or event
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="mailto:contact@relaxtogo.nl"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              px: 4,
              py: 2,
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            Contact Us
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}