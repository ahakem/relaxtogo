import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import { Menu as MenuIcon, SelfImprovement, AdminPanelSettings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  showAdminButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showAdminButton = false }) => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="sticky" 
      elevation={2}
      sx={{ 
        background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
        left: 0,
        right: 0,
        width: '100%',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box display="flex" alignItems="center" flexGrow={1}>
          <SelfImprovement sx={{ mr: 1, fontSize: '2rem' }} />
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.75rem' },
              fontWeight: 600,
              color: 'white',
              letterSpacing: '0.5px',
            }}
          >
            Relax to Go
          </Typography>
        </Box>

        {showAdminButton && (
          <Button
            color="inherit"
            startIcon={<AdminPanelSettings />}
            onClick={() => navigate('/admin')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            Admin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;