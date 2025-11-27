import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { Lock } from '@mui/icons-material';
import { loginWithEmailPassword } from '../config/passwords';

interface SimpleLandingProps {
  onLogin: () => void;
}

const SimpleLanding: React.FC<SimpleLandingProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await loginWithEmailPassword(email, password);
    
    if (result.success) {
      onLogin();
    } else {
      setError(result.error || 'Login failed. Please check your credentials.');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          {/* Left side - Introduction and video */}
          <Box>
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Welcome to Relax to Go
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 4,
                fontWeight: 300,
              }}
            >
              Your personalised online yoga experience
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              With our collection of carefully curated yoga instructions, we provide everything you need to keep your body moving. Through our videos, you will learn core- and back-strengthening exercises, as well as full-body flows. All easily accessible at your own pace.
            </Typography>

            {/* Vimeo Video Embed */}
            <Box
              sx={{
                position: 'relative',
                paddingTop: '56.25%',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
            >
              <Box
                component="iframe"
                src="https://player.vimeo.com/video/1140736577?h=f6a0c2e531&title=0&byline=0&portrait=0"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
                title="Yoga Preview"
              />
            </Box>
          </Box>

          {/* Right side - Login box */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper
              elevation={12}
              sx={{
                p: 4,
                borderRadius: 3,
                maxWidth: 400,
                width: '100%',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    mb: 2,
                  }}
                >
                  <Lock sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                  Login
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                  Enter your email and password to access
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  autoComplete="email"
                />
                
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  autoComplete="current-password"
                />

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a4093 100%)',
                    },
                  }}
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
              </form>

              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 3,
                  color: '#999',
                }}
              >
                © 2025 Relax to Go - All rights reserved
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SimpleLanding;
