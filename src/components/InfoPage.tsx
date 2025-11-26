import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { 
  Email,
  LocationOn,
  ExpandMore,
  Schedule,
} from '@mui/icons-material';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

export default function InfoPage() {

  const faqs = [
    {
      question: 'How long does a chair massage session last?',
      answer: 'Each individual massage session typically lasts 15-20 minutes. This duration is optimal for relaxation without disrupting the workday significantly.',
    },
    {
      question: 'Do I need to undress for a chair massage?',
      answer: 'No! Chair massage is performed fully clothed. We recommend wearing comfortable, loose-fitting clothing for the best experience.',
    },
    {
      question: 'What areas do you serve?',
      answer: 'We primarily serve the Netherlands. Travel within 25km is included in our standard pricing, with additional charges for longer distances.',
    },
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 1-2 weeks in advance, especially for larger groups or specific dates. However, we often accommodate last-minute requests.',
    },
  ];

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
            Informatie & FAQ
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Alles wat u moet weten over onze diensten en hoe u aan de slag kunt.
          </Typography>
        </Container>
      </Box>

      {/* Contact Information */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Contact Information
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Email sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Email
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                For bookings and inquiries
              </Typography>
              <Button
                variant="outlined"
                href="mailto:contact@relaxtogo.nl"
                fullWidth
              >
                contact@relaxtogo.nl
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Schedule sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Business Hours
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                Monday - Friday: 9:00 - 18:00
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                Saturday: 10:00 - 16:00
              </Typography>
              <Typography color="text.secondary">
                Sunday: By appointment
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <LocationOn sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Service Area
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Netherlands-wide service
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Travel within 25km included
                <br />
                Extended travel available
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
            Frequently Asked Questions
          </Typography>
          
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Quick Contact Form */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Quick Contact
        </Typography>
        
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card elevation={2} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Have a Question?
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Send us a message and we'll get back to you as soon as possible.
              </Typography>
              
              <Box component="form" action="mailto:contact@relaxtogo.nl" method="post" encType="text/plain">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}