import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { PlayArrow, Schedule } from '@mui/icons-material';
import type { YogaVideo } from '../data/videos';

interface VideoCardProps {
  video: YogaVideo;
  onPlay: (video: YogaVideo) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => onPlay(video)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={video.thumbnailUrl || 'https://via.placeholder.com/400x225/4CAF50/FFFFFF?text=Yoga+Video'}
          alt={video.title}
          sx={{
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <IconButton
            sx={{ 
              color: 'white',
              padding: 2,
            }}
          >
            <PlayArrow sx={{ fontSize: '3rem' }} />
          </IconButton>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {video.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2, lineHeight: 1.5 }}
        >
          {video.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {video.duration}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;