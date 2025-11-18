# Relax to go - Yoga Video App 🧘‍♀️

A beautiful, mobile-first React web application for yoga video content, built with Material UI. This app provides an elegant way to browse and organize yoga videos by categories, with an easy-to-manage content system that doesn't require a database.

## ✨ Features

- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Beautiful UI**: Modern design using Material UI components with custom theming
- **Video Categories**: Organized content by body parts with multiple videos:
  - 🏋️ Core & Abs
  - 🧘 Back & Spine
  - 🦵 Legs & Hips
  - 💪 Arms & Shoulders
  - 🎯 Neck & Head
  - 🌟 Full Body Flow
- **Embedded Video Player**: Videos play directly in the app with a beautiful overlay
- **Completely Isolated Experience**: No YouTube branding, sharing, or external navigation
- **Privacy-Enhanced**: Uses YouTube-nocookie.com for better privacy protection
- **Clean Integration**: Auto-play with minimal UI - pure content focus
- **Easy Content Management**: Simple JSON-based data structure for adding videos
- **No Database Required**: All content managed through local files
- **Type Safety**: Built with TypeScript for better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd relaxtogo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📱 How to Add New Content

### Adding New Videos

Edit the `src/data/videos.ts` file to add new yoga videos:

```typescript
export const yogaVideos: YogaVideo[] = [
  // ... existing videos
  {
    id: 'unique-id',
    title: 'Your Video Title',
    description: 'Detailed description of the video content',
    duration: '30 min',
    level: 'Beginner', // 'Beginner' | 'Intermediate' | 'Advanced'
    category: 'morning', // Use existing category IDs
    instructor: 'Instructor Name',
    videoUrl: 'https://your-video-url.com',
    thumbnailUrl: 'https://your-thumbnail-url.com', // Optional
    tags: ['tag1', 'tag2', 'tag3']
  }
];
```

### Adding New Categories

To add a new category, edit the `categories` array in `src/data/videos.ts`:

```typescript
export const categories: VideoCategory[] = [
  // ... existing categories
  {
    id: 'new-category-id',
    name: 'New Category Name',
    description: 'Description of what this category contains',
    color: '#your-hex-color',
    icon: 'MaterialUIIconName' // Must match available icons
  }
];
```

### Video URL Integration

Currently, the app uses placeholder URLs. To integrate with actual video content:

1. **YouTube**: Replace `videoUrl` with YouTube video URLs
2. **Vimeo**: Use Vimeo video URLs
3. **Self-hosted**: Use your own video hosting URLs
4. **Video Platforms**: Integrate with platforms like JW Player, Wistia, etc.

## 🎨 Customization

### Theme Customization

Edit `src/theme/index.ts` to customize colors, typography, and component styles:

```typescript
export const theme = createTheme({
  palette: {
    primary: {
      main: '#your-primary-color',
    },
    secondary: {
      main: '#your-secondary-color',
    },
  },
  // ... other theme options
});
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
  components/          # React components
    Header.tsx         # App header with navigation
    CategoryGrid.tsx   # Category selection grid
    VideoList.tsx      # Video list for selected category
    VideoCard.tsx      # Individual video card
  data/               # Data management
    videos.ts         # Video and category data
  theme/              # Theme configuration
    index.ts          # Material UI theme setup
  App.tsx             # Main app component
  main.tsx           # App entry point
```

## 📱 Mobile-First Approach

The app is designed with mobile users in mind:

- Touch-friendly interface
- Responsive grid layouts
- Optimized typography for mobile reading
- Smooth animations and transitions
- Fast loading and navigation

## 🎯 Production Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Any static hosting provider

---

**Made with ❤️ for the yoga community**
