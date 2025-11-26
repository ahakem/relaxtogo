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

export interface VideoCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

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

// Sample video data with real YouTube links - easily expandable
export const yogaVideos: YogaVideo[] = [
  // Core & Abs Videos
  {
    id: '1',
    title: '10 Min Yoga for Core Strength',
    description: 'Build core strength with these targeted poses designed to strengthen and tone your abdominal muscles. Perfect for all levels.',
    duration: '10 min',
    level: 'Beginner',
    category: 'core',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['core', 'abs', 'strength', 'beginner']
  },
  {
    id: '2',
    title: 'Deep Core Yoga Flow',
    description: 'Challenge your deep core muscles with this intermediate sequence focusing on stability and strength.',
    duration: '15 min',
    level: 'Intermediate',
    category: 'core',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['deep core', 'stability', 'intermediate', 'strength']
  },
  
  // Back & Spine Videos
  {
    id: '3',
    title: 'Yoga for Back Pain Relief',
    description: 'Gentle movements to relieve back pain and improve spinal mobility. Great for beginners and those with back issues.',
    duration: '20 min',
    level: 'Beginner',
    category: 'back',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['back pain', 'relief', 'gentle', 'mobility']
  },
  {
    id: '4',
    title: 'Strong Back Yoga Flow',
    description: 'Build strength in your back muscles with this flowing sequence designed to improve posture and stability.',
    duration: '25 min',
    level: 'Intermediate',
    category: 'back',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['back strength', 'posture', 'intermediate', 'flow']
  },
  
  // Legs & Hips Videos
  {
    id: '5',
    title: 'Hip Opening Yoga',
    description: 'Release tight hips and improve flexibility with these targeted hip opening poses and stretches.',
    duration: '18 min',
    level: 'Beginner',
    category: 'legs',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['hip opening', 'flexibility', 'stretching', 'beginner']
  },
  {
    id: '6',
    title: 'Strong Legs Yoga',
    description: 'Build powerful leg muscles with this strengthening sequence focusing on quads, hamstrings, and glutes.',
    duration: '22 min',
    level: 'Intermediate',
    category: 'legs',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['leg strength', 'quads', 'glutes', 'power']
  },
  
  // Arms & Shoulders Videos
  {
    id: '7',
    title: 'Arm Balance Prep',
    description: 'Build the strength needed for arm balances with this preparatory sequence focusing on arms and core.',
    duration: '16 min',
    level: 'Intermediate',
    category: 'arms',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['arm balance', 'strength', 'preparation', 'advanced']
  },
  {
    id: '8',
    title: 'Shoulder Release Yoga',
    description: 'Gentle movements to release tension in shoulders and improve mobility after long days at the computer.',
    duration: '12 min',
    level: 'Beginner',
    category: 'arms',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['shoulder release', 'desk work', 'gentle', 'mobility']
  },
  
  // Neck & Head Videos
  {
    id: '9',
    title: 'Neck and Shoulder Relief',
    description: 'Quick relief for neck and shoulder tension with simple stretches you can do anywhere.',
    duration: '8 min',
    level: 'Beginner',
    category: 'neck',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['neck relief', 'tension', 'quick', 'workplace']
  },
  {
    id: '10',
    title: 'Head and Neck Mobility',
    description: 'Improve range of motion in your neck and relieve headaches with these gentle movements.',
    duration: '14 min',
    level: 'Beginner',
    category: 'neck',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['headache relief', 'mobility', 'gentle', 'neck']
  },
  
  // Full Body Flow Videos
  {
    id: '11',
    title: 'Morning Full Body Flow',
    description: 'Complete morning sequence to energize your entire body and prepare for the day ahead.',
    duration: '30 min',
    level: 'Intermediate',
    category: 'fullbody',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['morning', 'full body', 'energizing', 'complete']
  },
  {
    id: '12',
    title: 'Total Body Yoga Flow',
    description: 'Dynamic full-body sequence combining strength, flexibility, and mindfulness in one complete practice.',
    duration: '45 min',
    level: 'Advanced',
    category: 'fullbody',
    videoUrl: 'https://vimeo.com/1140736577/f6a0c2e531',
    thumbnailUrl: 'https://i.vimeocdn.com/video/1962825000-6c7e7e9e1e9f2f9f9f9f9f9f9f9f9f9f9f9f9f9f_640',
    tags: ['dynamic', 'full body', 'complete', 'advanced']
  }
];

// Helper function to get videos by category
export const getVideosByCategory = (categoryId: string): YogaVideo[] => {
  return yogaVideos.filter(video => video.category === categoryId);
};

// Helper function to get category by id
export const getCategoryById = (categoryId: string): VideoCategory | undefined => {
  return categories.find(category => category.id === categoryId);
};