// Type definitions for video data
export interface YogaVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  videoUrl: string;
  thumbnailUrl?: string;
  tags: string[];
}

// Note: Categories and videos are now managed through Firebase
// This file only contains type definitions