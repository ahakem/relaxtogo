import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Settings, Save } from '@mui/icons-material';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface SiteSettingsData {
  siteName: string;
  tagline: string;
  homeDescription: string;
  homeVideoUrl: string;
}

const SiteSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState<SiteSettingsData>({
    siteName: 'Relax to Go',
    tagline: 'Your personalised online yoga experience',
    homeDescription: 'With our collection of carefully curated yoga instructions, we provide everything you need to keep your body moving. Through our videos, you will learn core- and back-strengthening exercises, as well as full-body flows. All easily accessible at your own pace.',
    homeVideoUrl: 'https://player.vimeo.com/video/1140736577?h=f6a0c2e531',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'siteSettings'));
      if (!querySnapshot.empty) {
        const settingsDoc = querySnapshot.docs[0];
        setFormData(settingsDoc.data() as SiteSettingsData);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    try {
      // Use a fixed document ID so we always update the same document
      await setDoc(doc(db, 'siteSettings', 'main'), formData);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof SiteSettingsData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Settings sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h4" fontWeight={600}>
          Site Settings
        </Typography>
      </Box>

      {message && (
        <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Site Name"
            value={formData.siteName}
            onChange={handleChange('siteName')}
            fullWidth
            helperText="This will appear in the browser tab and homepage"
          />

          <TextField
            label="Tagline"
            value={formData.tagline}
            onChange={handleChange('tagline')}
            fullWidth
            helperText="Subtitle displayed on the homepage"
          />

          <TextField
            label="Home Description"
            value={formData.homeDescription}
            onChange={handleChange('homeDescription')}
            fullWidth
            multiline
            rows={4}
            helperText="Main description text on the homepage"
          />

          <TextField
            label="Home Video URL"
            value={formData.homeVideoUrl}
            onChange={handleChange('homeVideoUrl')}
            fullWidth
            helperText="Vimeo player URL (e.g., https://player.vimeo.com/video/123456789?h=abcdef1234)"
            placeholder="https://player.vimeo.com/video/1140736577?h=f6a0c2e531"
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
              onClick={handleSave}
              disabled={saving}
              size="large"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SiteSettings;
