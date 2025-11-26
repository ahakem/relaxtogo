import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import VideoCard from './VideoCard';
import { getCategoryById } from '../data/videos';
import type { YogaVideo } from '../data/videos';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

interface VideoListProps {
  categoryId: string;
  onBack: () => void;
  onVideoPlay: (video: YogaVideo) => void;
}

const VideoList: React.FC<VideoListProps> = ({ categoryId, onBack, onVideoPlay }) => {
  const [videos, setVideos] = useState<YogaVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const category = getCategoryById(categoryId);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'videos'), where('category', '==', categoryId));
        const querySnapshot = await getDocs(q);
        const loadedVideos = querySnapshot.docs.map(doc => ({
          ...doc.data()
        } as YogaVideo));
        setVideos(loadedVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [categoryId]);

  if (!category) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Category not found</Typography>
        <Button onClick={onBack} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          gap: 2,
        }}
      >
        <IconButton 
          onClick={onBack}
          sx={{ 
            backgroundColor: 'background.paper',
            boxShadow: 1,
          }}
        >
          <ArrowBack />
        </IconButton>
        
        <Box>
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              color: category.color,
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            {category.name}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
          >
            {category.description}
          </Typography>
        </Box>
      </Box>

      {videos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No videos available in this category yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Check back soon for new content!
          </Typography>
          <Button 
            variant="contained" 
            onClick={onBack}
            sx={{ backgroundColor: category.color }}
          >
            Browse Other Categories
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} lg={4} key={video.id}>
              <VideoCard 
                video={video} 
                onPlay={onVideoPlay}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default VideoList;