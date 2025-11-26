import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Business,
  AccessTime,
  Euro,
  Phone,
  Email,
} from '@mui/icons-material';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

const PricingPage: React.FC = () => {
  const benefits = [
    'Vermindert stress en spanning',
    'Verbetert concentratie en productiviteit',
    'Verhoogt werkplezier en werktevredenheid',
    'Voorkomt burn-out klachten',
    'Vermindert fysieke klachten zoals hoofdpijn en nekpijn',
    'Verbetert de werksfeer',
  ];

  const handleContactClick = () => {
    window.location.href = 'tel:0628449747';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:kaminichance@gmail.com';
  };

  return (
    <>
      <NavigationHeader />
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundImage: 'linear-gradient(rgba(46, 125, 50, 0.05), rgba(124, 179, 66, 0.05)), url(/relaxtogo/images/pricing-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Header */}
          <Box textAlign="center" mb={8}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Stoelmassage Tarieven
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
              Ontspanning en welzijn op de werkplek voor uw medewerkers
            </Typography>
          </Box>

          {/* Main Pricing Card */}
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
              <Card 
                elevation={4} 
                sx={{ 
                  position: 'relative',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: 4,
                  overflow: 'visible',
                }}
              >
                <Chip
                  label="Populair"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    px: 2,
                  }}
                />
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Stoelmassage op locatie
                  </Typography>
                  
                  <Box sx={{ my: 4 }}>
                    <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Euro sx={{ fontSize: '2rem' }} />
                      27,50
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      per 20 minuten sessie
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
                    <AccessTime color="primary" />
                    <Typography variant="h6">
                      20 minuten per persoon
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary" paragraph>
                    Professionele stoelmassage op uw werklocatie. Perfect voor bedrijfsevents, 
                    welzijnsdagen of regelmatige ontspanning voor uw team.
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Phone />}
                      onClick={handleContactClick}
                      sx={{ borderRadius: 3 }}
                    >
                      Bel: 06-28449747
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Email />}
                      onClick={handleEmailClick}
                      sx={{ borderRadius: 3 }}
                    >
                      Email Contact
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Benefits Section */}
          <Paper elevation={2} sx={{ mt: 8, p: 4, borderRadius: 4 }}>
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
              Voordelen voor uw bedrijf
            </Typography>
            
            <Grid container spacing={2}>
              {benefits.map((benefit, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={benefit}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                    </ListItem>
                  </List>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Tax Information */}
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Paper elevation={1} sx={{ p: 3, backgroundColor: 'success.light', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                <Business color="success" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Fiscaal aftrekbaar
                </Typography>
              </Box>
              <Typography variant="body1">
                Stoelmassage op de werkplek is fiscaal aftrekbaar als bedrijfskosten 
                en valt onder de vrijstelling voor kleine bedrijfsgeschenken.
              </Typography>
            </Paper>
          </Box>

          {/* Contact Information */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact & Boeken
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Voor vragen en boekingen kunt u contact opnemen via:
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', mt: 4 }}>
              <Card elevation={2} sx={{ p: 3, minWidth: '250px' }}>
                <Phone color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Telefoon</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  06-28449747
                </Typography>
              </Card>
              
              <Card elevation={2} sx={{ p: 3, minWidth: '250px' }}>
                <Email color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Email</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  kaminichance@gmail.com
                </Typography>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default PricingPage;