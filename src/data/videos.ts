export interface YogaVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export interface VideoCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

const VIMEO_VIDEO_URL = 'https://vimeo.com/1140736577/f6a0c2e531';
const VIMEO_THUMBNAIL = 'https://vumbnail.com/1140736577.jpg';

export const categories: VideoCategory[] = [
  {
    id: 'core',
    name: 'Core & Abs',
    description: 'Strengthen your core with targeted abdominal exercises',
    color: '#FF5722',
    icon: 'FitnessCenter'
  },
  {
    id: 'back',
    name: 'Back & Spine',
    description: 'Relieve tension and strengthen your back muscles',
    color: '#2196F3',
    icon: 'SelfImprovement'
  },
  {
    id: 'legs',
    name: 'Legs & Hips',
    description: 'Build strength and flexibility in your lower body',
    color: '#4CAF50',
    icon: 'DirectionsRun'
  },
  {
    id: 'arms',
    name: 'Arms & Shoulders',
    description: 'Tone and strengthen your upper body',
    color: '#9C27B0',
    icon: 'Psychology'
  },
  {
    id: 'neck',
    name: 'Neck & Head',
    description: 'Release tension from neck, shoulders, and head',
    color: '#FF9800',
    icon: 'Healing'
  },
  {
    id: 'fullbody',
    name: 'Full Body Flow',
    description: 'Complete sequences targeting multiple muscle groups',
    color: '#673AB7',
    icon: 'Spa'
  }
];

// Sample video data with Vimeo links - easily expandable
export const yogaVideos: YogaVideo[] = [
  // Core & Abs Videos
  {
    id: '1',
    title: '10 Min Yoga for Core Strength',
    description: 'Build core strength with these targeted poses designed to strengthen and tone your abdominal muscles. Perfect for all levels.',
    duration: '10 min',
    category: 'core',
    videoUrl: VIMEO_VIDEO_URL,
    thumbnailUrl: VIMEO_THUMBNAIL,
  },
  
];

// Helper function to get videos by category
export const getVideosByCategory = (categoryId: string): YogaVideo[] => {
  return yogaVideos.filter(video => video.category === categoryId);
};

// Helper function to get category by id
export const getCategoryById = (categoryId: string): VideoCategory | undefined => {
  return categories.find(category => category.id === categoryId);
};