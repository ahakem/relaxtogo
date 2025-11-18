import { useState, useEffect } from 'react';
import './components/VideoPlayer.css';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Backdrop,
} from '@mui/material';
import { 
  Home, 
  Category, 
  Info,
  Close,
} from '@mui/icons-material';
import { theme } from './theme';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import VideoList from './components/VideoList';
import type { YogaVideo } from './data/videos';

type ViewMode = 'home' | 'category';

interface AppState {
  view: ViewMode;
  selectedCategory?: string;
  drawerOpen: boolean;
  selectedVideo?: YogaVideo;
  videoDialogOpen: boolean;
}

function App() {
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
    }));
  };

  const handleBackToHome = () => {
    setState(prev => ({
      ...prev,
      view: 'home',
      selectedCategory: undefined,
    }));
  };

  const handleVideoPlay = (video: YogaVideo) => {
    setState(prev => ({
      ...prev,
      selectedVideo: video,
      videoDialogOpen: true,
    }));
  };

  const handleVideoClose = () => {
    setState(prev => ({
      ...prev,
      selectedVideo: undefined,
      videoDialogOpen: false,
    }));
  };

  // Handle keyboard controls for video player
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (state.videoDialogOpen && event.key === 'Escape') {
        handleVideoClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.videoDialogOpen]);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const renderContent = () => {
    switch (state.view) {
      case 'category':
        return (
          <VideoList
            categoryId={state.selectedCategory!}
            onBack={handleBackToHome}
            onVideoPlay={handleVideoPlay}
          />
        );
      default:
        return <CategoryGrid onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onMenuClick={handleMenuClick} />
        
        <Container 
          maxWidth="lg" 
          sx={{ 
            flexGrow: 1, 
            py: 3,
            px: { xs: 2, sm: 3 },
          }}
        >
          {renderContent()}
        </Container>

        {/* Navigation Drawer */}
        <Drawer
          anchor="left"
          open={state.drawerOpen}
          onClose={handleDrawerClose}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              backgroundColor: 'background.paper',
            },
          }}
        >
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Relax to go
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your yoga journey starts here
            </Typography>
          </Box>
          
          <List>
            <ListItem button onClick={() => {
              handleBackToHome();
              handleDrawerClose();
            }}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            
            <ListItem button>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary="All Categories" />
            </ListItem>
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <List>
            <ListItem button>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Drawer>

        {/* Embedded Video Player Dialog */}
        <Dialog
          open={state.videoDialogOpen}
          onClose={handleVideoClose}
          maxWidth={false}
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              overflow: 'hidden',
            }
          }}
          BackdropComponent={Backdrop}
          BackdropProps={{
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            }
          }}
        >
          <DialogContent
            sx={{
              p: 0,
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={handleVideoClose}
              sx={{
                position: 'absolute',
                top: { xs: 8, sm: 16 },
                right: { xs: 8, sm: 16 },
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <Close />
            </IconButton>

            {/* Video Container */}
            {state.selectedVideo && (
              <Box
                className="video-container video-player-overlay"
                sx={{
                  width: { xs: '95vw', sm: '90vw' },
                  maxWidth: '1200px',
                  aspectRatio: '16/9',
                  borderRadius: { xs: 1, sm: 2 },
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube-nocookie.com/embed/${getYouTubeVideoId(state.selectedVideo.videoUrl)}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&widget_referrer=${window.location.origin}&start=0&end=0`}
                  title={state.selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  style={{
                    border: 'none',
                    borderRadius: 'inherit',
                    background: '#000',
                  }}
                  sandbox="allow-scripts allow-same-origin"
                />
                
                {/* Overlay to block YouTube logo clicks */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '80px',
                    height: '60px',
                    backgroundColor: 'transparent',
                    zIndex: 10,
                    pointerEvents: 'all',
                    cursor: 'default',
                  }}
                  onClick={(e) => e.preventDefault()}
                />
                
                {/* Block bottom area with sharing/watch later buttons */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '120px',
                    height: '50px',
                    backgroundColor: 'transparent',
                    zIndex: 10,
                    pointerEvents: 'all',
                    cursor: 'default',
                  }}
                  onClick={(e) => e.preventDefault()}
                />
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;
