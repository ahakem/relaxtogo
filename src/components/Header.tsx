import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Menu as MenuIcon, SelfImprovement } from '@mui/icons-material';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
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
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FFFFFF, #E8F5E8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Relax to go
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;