import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { 
  SelfImprovement,
  Star,
  Favorite,
  Psychology,
} from '@mui/icons-material';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

export default function AboutPage() {

  const values = [
    {
      title: 'Wellness First',
      description: 'We believe that wellness should be accessible to everyone, everywhere.',
      icon: <Favorite sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Professional Excellence',
      description: 'Certified therapists and instructors committed to the highest standards.',
      icon: <Star sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Mindful Practice',
      description: 'Combining ancient wisdom with modern wellness techniques.',
      icon: <Psychology sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavigationHeader />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(46, 125, 50, 0.6), rgba(124, 179, 66, 0.6)), url(/relaxtogo/images/about-founder.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Over Relax to go
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              maxWidth: 600, 
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Uw vertrouwde partner voor wellness en ontspanning, waar u ook bent.
          </Typography>
        </Container>
      </Box>

      {/* Story Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Relax to go was founded with a simple mission: to make wellness accessible to everyone, 
              no matter where they are. We believe that in today's fast-paced world, taking time for 
              self-care shouldn't be a luxury—it should be a necessity.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Our journey began when we recognized the growing need for convenient, professional 
              wellness services that could fit into busy schedules. Whether it's a chair massage 
              at your office or guided yoga videos at home, we bring the spa experience directly to you.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Today, we're proud to serve companies and individuals across the Netherlands, 
              helping them find moments of peace and rejuvenation in their daily lives.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <SelfImprovement sx={{ fontSize: 120, color: 'primary.main' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
            Our Values
          </Typography>
          
          <Grid container spacing={4}>
            {values.map((value, index) => (
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
                      {value.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {value.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Ontmoet Onze Oprichtster
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card elevation={2} sx={{ p: 4 }}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: 'auto',
                      bgcolor: 'primary.main',
                      fontSize: '2rem',
                    }}
                  >
                    KS
                  </Avatar>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Kamini Stam
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Oprichtster & Gecertificeerd Welzijnspraktijk
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    Kamini heeft jarenlange ervaring in wellness en massagetherapie. 
                    Zij is gepassioneerd over het brengen van ontspanning en gezondheidsvoordelen 
                    direct naar werkplekken en woningen. Haar benadering combineert 
                    traditionele technieken met moderne gemak, waarbij elke 
                    klant een gepersonaliseerde en effectieve behandeling ontvangt.
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>

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
            Klaar om te Ontspannen?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Ontdek hoe wij u kunnen helpen bij uw welzijnsreis
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
            Voor meer informatie over onze diensten, neem contact met ons op via de contactpagina.
          </Typography>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}