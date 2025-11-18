import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { 
  WbSunny, 
  Nightlight, 
  FitnessCenter, 
  SelfImprovement, 
  Spa, 
  School,
  DirectionsRun,
  Psychology,
  Healing
} from '@mui/icons-material';
import { categories } from '../data/videos';
import type { VideoCategory } from '../data/videos';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  WbSunny,
  Nightlight,
  FitnessCenter,
  SelfImprovement,
  Spa,
  School,
  DirectionsRun,
  Psychology,
  Healing,
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h2" 
        component="h2" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          mb: 3,
          color: 'text.primary',
          fontWeight: 600,
        }}
      >
        Choose Your Practice
      </Typography>
      
      <Grid container spacing={3}>
        {categories.map((category: VideoCategory) => {
          const IconComponent = iconMap[category.icon] || SelfImprovement;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`,
                  border: `2px solid ${category.color}30`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 8px 32px ${category.color}40`,
                    border: `2px solid ${category.color}`,
                  },
                }}
                onClick={() => onCategorySelect(category.id)}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: category.color,
                        color: 'white',
                        mb: 2,
                      }}
                    >
                      <IconComponent sx={{ fontSize: '2rem' }} />
                    </Box>
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600, color: 'text.primary' }}
                  >
                    {category.name}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.5 }}
                  >
                    {category.description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: category.color,
                      '&:hover': {
                        backgroundColor: category.color,
                        filter: 'brightness(0.9)',
                      },
                    }}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CategoryGrid;