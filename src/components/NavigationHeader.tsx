import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  KeyboardArrowDown,
  SelfImprovement,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavigationHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuAnchor, setServicesMenuAnchor] = useState<null | HTMLElement>(null);

  const isAlignRoute = location.pathname === '/align';
  const isHomePage = location.pathname === '/';

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Chair Massage', path: '/chair-massage' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
    { label: 'Info', path: '/info' },
    { label: 'Contact', path: '/contact' },
  ];

  const serviceItems = [
    { label: 'Chair Massage', path: '/chair-massage' },
    { label: 'Yoga Videos', path: '/align' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    handleServicesMenuClose();
  };

  const handleServicesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setServicesMenuAnchor(event.currentTarget);
  };

  const handleServicesMenuClose = () => {
    setServicesMenuAnchor(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Desktop Navigation
  const DesktopNavigation = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button
        color="inherit"
        onClick={() => handleNavigation('/')}
        sx={{ 
          fontWeight: isHomePage ? 'bold' : 'normal',
          borderBottom: isHomePage ? 2 : 0,
          borderColor: 'currentColor',
          borderRadius: 0,
        }}
      >
        Home
      </Button>
      
      <Button
        color="inherit"
        onClick={handleServicesMenuOpen}
        endIcon={<KeyboardArrowDown />}
        sx={{ fontWeight: 'normal' }}
      >
        Services
      </Button>
      
      <Menu
        anchorEl={servicesMenuAnchor}
        open={Boolean(servicesMenuAnchor)}
        onClose={handleServicesMenuClose}
        MenuListProps={{
          'aria-labelledby': 'services-button',
        }}
      >
        {serviceItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      <Button
        color="inherit"
        onClick={() => handleNavigation('/pricing')}
        sx={{ 
          fontWeight: location.pathname === '/pricing' ? 'bold' : 'normal',
          borderBottom: location.pathname === '/pricing' ? 2 : 0,
          borderColor: 'currentColor',
          borderRadius: 0,
        }}
      >
        Pricing
      </Button>
      
      <Button
        color="inherit"
        onClick={() => handleNavigation('/about')}
        sx={{ 
          fontWeight: location.pathname === '/about' ? 'bold' : 'normal',
          borderBottom: location.pathname === '/about' ? 2 : 0,
          borderColor: 'currentColor',
          borderRadius: 0,
        }}
      >
        About
      </Button>
      
      <Button
        color="inherit"
        onClick={() => handleNavigation('/info')}
        sx={{ 
          fontWeight: location.pathname === '/info' ? 'bold' : 'normal',
          borderBottom: location.pathname === '/info' ? 2 : 0,
          borderColor: 'currentColor',
          borderRadius: 0,
        }}
      >
        Info
      </Button>
      
      <Button
        color="inherit"
        onClick={() => handleNavigation('/contact')}
        sx={{ 
          fontWeight: location.pathname === '/contact' ? 'bold' : 'normal',
          borderBottom: location.pathname === '/contact' ? 2 : 0,
          borderColor: 'currentColor',
          borderRadius: 0,
        }}
      >
        Contact
      </Button>
      
      {!isAlignRoute && (
        <Button
          variant="contained"
          onClick={() => handleNavigation('/align')}
          sx={{ 
            ml: 2,
            backgroundColor: 'secondary.main',
            '&:hover': {
              backgroundColor: 'secondary.dark',
            },
          }}
        >
          Yoga Videos
        </Button>
      )}
    </Box>
  );

  // Mobile Navigation
  const MobileNavigation = () => (
    <>
      <IconButton
        color="inherit"
        onClick={handleMobileMenuToggle}
        sx={{ ml: 'auto' }}
      >
        <MenuIcon />
      </IconButton>
      
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Menu
          </Typography>
          <IconButton onClick={handleMobileMenuToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{ 
                cursor: 'pointer',
                backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                }}
              />
            </ListItem>
          ))}
          
          <ListItem
            onClick={() => handleNavigation('/align')}
            sx={{ 
              cursor: 'pointer',
              backgroundColor: isAlignRoute ? 'primary.main' : 'secondary.main',
              color: 'white',
              mt: 2,
              mx: 2,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: isAlignRoute ? 'primary.dark' : 'secondary.dark',
              },
            }}
          >
            <ListItemText 
              primary="Yoga Videos"
              primaryTypographyProps={{
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );

  return (
    <AppBar 
      position="static" 
      elevation={1} 
      sx={{ 
        backgroundColor: 'white', 
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            mr: { xs: 2, md: 4 },
          }}
          onClick={() => handleNavigation('/')}
        >
          <SelfImprovement 
            sx={{ 
              fontSize: 32, 
              color: 'primary.main', 
              mr: 1 
            }} 
          />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Relax to go
          </Typography>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              display: { xs: 'block', sm: 'none' },
            }}
          >
            Relax
          </Typography>
        </Box>
        
        {/* Navigation */}
        {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
      </Toolbar>
    </AppBar>
  );
}