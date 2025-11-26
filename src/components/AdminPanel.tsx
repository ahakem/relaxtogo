import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Delete, Edit, Add, VideoLibrary } from '@mui/icons-material';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { YogaVideo } from '../data/videos';

const AdminPanel: React.FC = () => {
  const [videos, setVideos] = useState<(YogaVideo & { firestoreId?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<(YogaVideo & { firestoreId?: string }) | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    duration: '',
    category: 'core',
    videoUrl: '',
    thumbnailUrl: '',
  });

  // Load videos from Firestore
  const loadVideos = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'videos'));
      const loadedVideos = querySnapshot.docs.map(doc => ({
        ...doc.data() as YogaVideo,
        firestoreId: doc.id,
      }));
      setVideos(loadedVideos);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load videos' });
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleOpenDialog = (video?: YogaVideo & { firestoreId?: string }) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        id: video.id,
        title: video.title,
        description: video.description,
        duration: video.duration,
        category: video.category,
        videoUrl: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl || '',
      });
    } else {
      setEditingVideo(null);
      setFormData({
        id: Date.now().toString(),
        title: '',
        description: '',
        duration: '',
        category: 'core',
        videoUrl: '',
        thumbnailUrl: 'https://vumbnail.com/1140736577.jpg',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingVideo(null);
  };

  const handleSave = async () => {
    try {
      if (editingVideo?.firestoreId) {
        // Update existing video
        await updateDoc(doc(db, 'videos', editingVideo.firestoreId), formData);
        setMessage({ type: 'success', text: 'Video updated successfully!' });
      } else {
        // Add new video
        await addDoc(collection(db, 'videos'), formData);
        setMessage({ type: 'success', text: 'Video added successfully!' });
      }
      handleCloseDialog();
      loadVideos();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save video' });
      console.error('Error saving video:', error);
    }
  };

  const handleDelete = async (firestoreId?: string) => {
    if (!firestoreId) return;
    
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteDoc(doc(db, 'videos', firestoreId));
        setMessage({ type: 'success', text: 'Video deleted successfully!' });
        loadVideos();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete video' });
        console.error('Error deleting video:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <VideoLibrary sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight={600}>
            Video Management
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          size="large"
        >
          Add Video
        </Button>
      </Box>

      {message && (
        <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <Paper elevation={2}>
        <List>
          {videos.length === 0 ? (
            <ListItem>
              <ListItemText 
                primary="No videos yet" 
                secondary="Click 'Add Video' to create your first video"
              />
            </ListItem>
          ) : (
            videos.map((video) => (
              <ListItem
                key={video.firestoreId}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" onClick={() => handleOpenDialog(video)} sx={{ mr: 1 }}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(video.firestoreId)}>
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={video.title}
                  secondary={`${video.category} • ${video.duration}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingVideo ? 'Edit Video' : 'Add New Video'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              label="Duration (e.g., 10 min)"
              fullWidth
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <TextField
              label="Category"
              fullWidth
              select
              SelectProps={{ native: true }}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="core">Core & Abs</option>
              <option value="back">Back & Spine</option>
              <option value="legs">Legs & Hips</option>
              <option value="arms">Arms & Shoulders</option>
              <option value="neck">Neck & Head</option>
              <option value="fullbody">Full Body Flow</option>
            </TextField>
            <TextField
              label="Vimeo Video URL"
              fullWidth
              placeholder="https://vimeo.com/1140736577/f6a0c2e531"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            />
            <TextField
              label="Thumbnail URL"
              fullWidth
              placeholder="https://vumbnail.com/1140736577.jpg"
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPanel;
