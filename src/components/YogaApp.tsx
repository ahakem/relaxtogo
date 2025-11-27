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
  Typography,
  Avatar,
} from '@mui/material';
import { 
  Home,
  Close,
  Logout,
  Settings,
  AdminPanelSettings,
} from '@mui/icons-material';
import Header from './Header';
import CategoryGrid from './CategoryGrid';
import VideoList from './VideoList';
import type { YogaVideo } from '../data/videos';
import { logout, isAdmin } from '../config/passwords';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

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
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await isAdmin();
      setIsUserAdmin(adminStatus);
    };
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (userData) {
          setUserName(userData.name || 'User');
        }
      }
    };
    checkAdminStatus();
    fetchUserData();
  }, []);

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

  const handleLogout = async () => {
    await logout();
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
    { icon: <Settings />, text: 'Settings', action: () => { navigate('/settings'); handleDrawerClose(); } },
    ...(isUserAdmin ? [{ 
      icon: <AdminPanelSettings />, 
      text: 'Admin', 
      action: () => { navigate('/admin'); handleDrawerClose(); } 
    }] : []),
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header onMenuClick={handleMenuClick} showAdminButton={isUserAdmin} />
      <Container maxWidth="lg" sx={{ py: 2 }}>
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
          <Box sx={{ p: 2, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#4CAF50' }}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {userName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isUserAdmin ? 'Admin' : 'User'}
              </Typography>
            </Box>
          </Box>
          <Divider />
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
              onClick={() => { handleLogout(); handleDrawerClose(); }}
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
        maxWidth={false}
        fullWidth
        fullScreen
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'black',
            margin: 0,
            maxHeight: '100%',
            maxWidth: '100%',
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton
            onClick={handleVideoDialogClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 9999,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.9)',
              }
            }}
          >
            <Close />
          </IconButton>
          {state.selectedVideo && (
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box
                component="iframe"
                src={`https://player.vimeo.com/video/${state.selectedVideo.videoUrl.split('/')[3]}?h=${state.selectedVideo.videoUrl.split('/')[4]}&autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
                sx={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
                title={state.selectedVideo.title}
              />
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
    </Box>
  );
}