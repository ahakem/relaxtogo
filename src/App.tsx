import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { theme } from './theme';
import SimpleLanding from './components/SimpleLanding';
import YogaApp from './components/YogaApp';
import AdminPanel from './components/AdminPanel';
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
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
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
