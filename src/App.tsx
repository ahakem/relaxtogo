import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { theme } from './theme';
import SimpleLanding from './components/SimpleLanding';
import YogaApp from './components/YogaApp';
import UserManagement from './components/UserManagement';
import UserSettings from './components/UserSettings';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './config/passwords';

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
              <ProtectedRoute>
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
