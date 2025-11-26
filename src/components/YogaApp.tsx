import { useState, useEffect } from 'react';
import './VideoPlayer.css';
import {
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
  Backdrop,
  Button,
} from '@mui/material';
import { 
  Home, 
  Category, 
  Info,
  Close,
  Logout,
} from '@mui/icons-material';
import Header from './Header';
import CategoryGrid from './CategoryGrid';
import VideoList from './VideoList';
import type { YogaVideo } from '../data/videos';
import { clearAuthentication } from '../config/passwords';
import { useNavigate } from 'react-router-dom';

type ViewMode = 'home' | 'category';

interface AppState {
  view: ViewMode;
  selectedCategory?: string;
  drawerOpen: boolean;
  selectedVideo?: YogaVideo;
  videoDialogOpen: boolean;
}

export default function YogaApp() {
  const navigate = useNavigate();
  const [state, setState] = useState<AppState>({
    view: 'home',
    drawerOpen: false,
    videoDialogOpen: false,
  });

  const handleMenuClick = () => {
    setState(prev => ({ ...prev, drawerOpen: true }));
  };

  const handleDrawerClose = () => {
    setState(prev => ({ ...prev, drawerOpen: false }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setState(prev => ({
      ...prev,
      view: 'category',
      selectedCategory: categoryId,
      drawerOpen: false,
    }));
  };

  const handleBackToHome = () => {
    setState(prev => ({
      ...prev,
      view: 'home',
      selectedCategory: undefined,
    }));
  };

  const handleVideoSelect = (video: YogaVideo) => {
    setState(prev => ({
      ...prev,
      selectedVideo: video,
      videoDialogOpen: true,
    }));
  };

  const handleVideoDialogClose = () => {
    setState(prev => ({
      ...prev,
      selectedVideo: undefined,
      videoDialogOpen: false,
    }));
  };

  const handleLogout = () => {
    clearAuthentication();
    navigate('/');
  };

  // Disable context menu, text selection, and drag
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Prevent common copy/dev shortcuts
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 's')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'C')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('selectstart', preventDefault);
    document.addEventListener('dragstart', preventDefault);
    document.addEventListener('keydown', preventKeyboardShortcuts);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('selectstart', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
    };
  }, []);

  const menuItems = [
    { icon: <Home />, text: 'Home', action: handleBackToHome },
    { icon: <Category />, text: 'Categories', action: () => handleCategorySelect('') },
    { icon: <Info />, text: 'About', action: () => {} },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Header onMenuClick={handleMenuClick} />
      
      {/* Logout Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {state.view === 'home' && (
        <CategoryGrid onCategorySelect={handleCategorySelect} />
      )}

      {state.view === 'category' && state.selectedCategory && (
        <VideoList 
          categoryId={state.selectedCategory}
          onBack={handleBackToHome}
          onVideoPlay={handleVideoSelect}
        />
      )}

      <Drawer
        anchor="left"
        open={state.drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem 
                key={index}
                onClick={item.action}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <Divider />
            <ListItem 
              onClick={handleLogout}
              sx={{ cursor: 'pointer', color: 'error.main' }}
            >
              <ListItemIcon><Logout sx={{ color: 'error.main' }} /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Dialog
        open={state.videoDialogOpen}
        onClose={handleVideoDialogClose}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'black',
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleVideoDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9999,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              }
            }}
          >
            <Close />
          </IconButton>
          {state.selectedVideo && (
            <Box className="video-container" sx={{ position: 'relative', paddingTop: '56.25%' }}>
              <Box
                component="iframe"
                src={`https://www.youtube-nocookie.com/embed/${state.selectedVideo.videoUrl.split('v=')[1]?.split('&')[0]}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=1&fs=0&iv_load_policy=3`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allowFullScreen
                title={state.selectedVideo.title}
              />
              <Box className="video-player-overlay" />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={false}
      >
      </Backdrop>
    </Container>
  );
}