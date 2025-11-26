import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAlignRoute = location.pathname === '/align';

  const handleNavigation = (path: string) => {
    if (isAlignRoute) {
      // If on protected route, open in new tab to avoid logout
      window.open(`${window.location.origin}${window.location.pathname}#${path}`, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.100',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Relax to go
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Professional wellness solutions for mind and body.
              Bringing relaxation and yoga to your daily life.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => handleNavigation('/chair-massage')}
                sx={{ textAlign: 'left', textDecoration: 'none' }}
              >
                Chair Massage
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => handleNavigation('/align')}
                sx={{ textAlign: 'left', textDecoration: 'none' }}
              >
                Yoga Videos
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => handleNavigation('/pricing')}
                sx={{ textAlign: 'left', textDecoration: 'none' }}
              >
                Pricing
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => handleNavigation('/about')}
                sx={{ textAlign: 'left', textDecoration: 'none' }}
              >
                About
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => handleNavigation('/info')}
                sx={{ textAlign: 'left', textDecoration: 'none' }}
              >
                Info
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => handleNavigation('/contact')}
                sx={{ textAlign: 'left', textDecoration: 'none' }}
              >
                Contact
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Relax to go - All rights reserved
          </Typography>
          <Typography variant="body2" color="text.secondary">
            KVK: 34331597
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}