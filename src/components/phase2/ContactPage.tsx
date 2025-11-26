import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  CardContent,
} from '@mui/material';
import { 
  Email,
  LocationOn,
  Schedule,
  Phone,
} from '@mui/icons-material';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

export default function ContactPage() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:kaminichance@gmail.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:0628449747';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavigationHeader />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(124, 179, 66, 0.1) 100%)',
          py: { xs: 6, md: 8 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Contact
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Neem contact met ons op voor vragen of om een afspraak te maken
          </Typography>
        </Container>
      </Box>

      {/* Contact Information */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ p: 4, height: '100%' }}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Contactgegevens
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Phone sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Telefoon
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        06-28449747
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Email sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Email
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        kaminichance@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Schedule sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Beschikbaarheid
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Ma-Vr: 9:00 - 17:00
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Weekend op afspraak
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <LocationOn sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        Locatie
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Wij komen naar u toe!
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Heel Nederland
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Phone />}
                    onClick={handlePhoneClick}
                    sx={{ flex: 1 }}
                  >
                    Bellen
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Email />}
                    onClick={handleEmailClick}
                    sx={{ flex: 1 }}
                  >
                    Email
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ p: 4, height: '100%' }}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Stuur een bericht
                </Typography>
                
                <Box component="form" sx={{ mt: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Naam"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Bedrijf"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Telefoon"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bericht"
                        multiline
                        rows={4}
                        variant="outlined"
                        required
                        placeholder="Vertel ons over uw wensen..."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ py: 2 }}
                      >
                        Verstuur Bericht
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Information */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Waarom Relax to go?
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Flexibel & Gemakkelijk
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Wij komen naar uw locatie, geen gedoe met reizen of parkeren.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Professioneel
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Ervaren en gecertificeerde therapeuten voor de beste service.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Betrouwbaar
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Jarenlange ervaring en tevreden klanten door heel Nederland.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Klaar om te ontspannen?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Neem vandaag nog contact op voor een vrijblijvende offerte
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handlePhoneClick}
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
              Bel nu: 06-28449747
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}