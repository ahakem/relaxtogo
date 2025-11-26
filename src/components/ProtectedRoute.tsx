import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { isAuthenticated, isAdmin } from '../config/passwords';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (requireAdmin) {
        const adminStatus = await isAdmin();
        setIsAdminUser(adminStatus);
      }
      setLoading(false);
    };
    checkAdmin();
  }, [requireAdmin]);

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin) {
    if (loading) {
      return null;
    }
    
    if (!isAdminUser) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: 3,
                p: 6,
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
            >
              <Lock sx={{ fontSize: 80, color: '#f44336', mb: 2 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
                Access Denied
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
                You don't have permission to access this page. Admin privileges are required.
              </Typography>
              <Button
                variant="contained"
                href="#/videos"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  px: 4,
                  py: 1.5,
                }}
              >
                Go to Home
              </Button>
            </Box>
          </Container>
        </Box>
      );
    }
  }
  
  return <>{children}</>;
}