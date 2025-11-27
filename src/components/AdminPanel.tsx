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
  MenuItem,
} from '@mui/material';
import { Delete, Edit, Add, VideoLibrary, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { YogaVideo } from '../data/videos';

interface Category {
  id: string;
  name: string;
}

const AdminPanel: React.FC = () => {
  const [videos, setVideos] = useState<(YogaVideo & { firestoreId?: string })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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

  // Load categories from Firestore
  const loadCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const loadedCategories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCategories(loadedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  // Load videos from Firestore
  const loadVideos = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'videos'));
      const loadedVideos = querySnapshot.docs.map(doc => ({
        ...doc.data() as YogaVideo,
        firestoreId: doc.id,
      }));
      
      // Sort by order field
      loadedVideos.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      
      setVideos(loadedVideos);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load videos' });
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
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
        // Add new video with order at the end
        const maxOrder = videos.length > 0 ? Math.max(...videos.map((v: any) => v.order || 0)) : -1;
        await addDoc(collection(db, 'videos'), { ...formData, order: maxOrder + 1 });
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

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    
    try {
      const batch = writeBatch(db);
      const current = videos[index];
      const previous = videos[index - 1];
      
      if (!current.firestoreId || !previous.firestoreId) return;
      
      const currentOrder = (current as any).order ?? index;
      const previousOrder = (previous as any).order ?? (index - 1);
      
      batch.update(doc(db, 'videos', current.firestoreId), { order: previousOrder });
      batch.update(doc(db, 'videos', previous.firestoreId), { order: currentOrder });
      
      await batch.commit();
      loadVideos();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to reorder videos' });
      console.error('Error reordering:', error);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === videos.length - 1) return;
    
    try {
      const batch = writeBatch(db);
      const current = videos[index];
      const next = videos[index + 1];
      
      if (!current.firestoreId || !next.firestoreId) return;
      
      const currentOrder = (current as any).order ?? index;
      const nextOrder = (next as any).order ?? (index + 1);
      
      batch.update(doc(db, 'videos', current.firestoreId), { order: nextOrder });
      batch.update(doc(db, 'videos', next.firestoreId), { order: currentOrder });
      
      await batch.commit();
      loadVideos();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to reorder videos' });
      console.error('Error reordering:', error);
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
            videos.map((video, index) => (
              <ListItem
                key={video.firestoreId}
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      size="small"
                    >
                      <ArrowUpward />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleMoveDown(index)}
                      disabled={index === videos.length - 1}
                      size="small"
                    >
                      <ArrowDownward />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleOpenDialog(video)}>
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
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
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
