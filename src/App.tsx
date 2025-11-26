import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from '@mui/material';
import { theme } from './theme';
import SimpleLanding from './components/SimpleLanding';
import YogaApp from './components/YogaApp';
import UserManagement from './components/UserManagement';
import UserSettings from './components/UserSettings';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated, onAuthChange } from './config/passwords';

function LoginRoute() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/videos', { replace: true });
  };

  if (isAuthenticated()) {
    return <Navigate to="/videos" replace />;
  }

  return <SimpleLanding onLogin={handleLogin} />;
}

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(() => {
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginRoute />} />
          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <YogaApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
