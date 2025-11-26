import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { theme } from './theme';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import YogaApp from './components/YogaApp';
import ProtectedRoute from './components/ProtectedRoute';
import ChairMassagePage from './components/ChairMassagePage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import InfoPage from './components/InfoPage';
import ContactPage from './components/ContactPage';
import { isAuthenticated } from './config/passwords';

function LoginRoute() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/align', { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    navigate('/align', { replace: true });
  };

  if (isAuthenticated()) {
    return <Navigate to="/align" replace />;
  }

  return <LoginPage onLogin={handleLogin} />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/chair-massage" element={<ChairMassagePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
            path="/align" 
            element={
              <ProtectedRoute>
                <YogaApp />
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
