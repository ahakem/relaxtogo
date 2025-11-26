# Relax to Go - Phase 2 Features

## New Features Added

### 🔐 Password Protection
- The yoga video collection is now protected by password authentication
- Videos are accessible at `/align` route only after authentication
- Session-based authentication (24-hour session duration)
- Multiple valid passwords stored in configuration

### 🌐 Enhanced Routing
- **Landing Page** (`/`): Beautiful homepage inspired by relaxtogo.nl
- **Login Page** (`/login`): Secure password entry
- **Yoga App** (`/align`): Protected yoga video collection
- Uses HashRouter for GitHub Pages compatibility

### 📱 Landing Page
- Clean, modern design based on relaxtogo.nl
- Services showcase (Chair Massage, Yoga Videos, Wellness Programs)
- Call-to-action buttons
- Contact information
- Mobile-first responsive design

## Valid Demo Passwords
- `relaxtogo2024`
- `yoga123`
- `wellness456`
- `mindful789`

## URL Structure
- **Home**: `https://yourdomain.com/#/`
- **Login**: `https://yourdomain.com/#/login`
- **Yoga Videos**: `https://yourdomain.com/#/align` (protected)

## Security Features
- Session timeout (24 hours)
- Protected route component
- Automatic redirect to login for unauthorized access
- Copy protection maintained on video player
- Right-click disabled on videos
- Keyboard shortcuts blocked (F12, Ctrl+C, etc.)

## How to Use

1. **Landing Page**: Visit the homepage to learn about services
2. **Access Videos**: Click "Yoga Videos" or "Explore Yoga Videos"
3. **Login**: Enter one of the valid passwords
4. **Browse Videos**: Navigate through categories and watch videos
5. **Logout**: Use the logout button to end session

## Configuration

### Adding/Removing Passwords
Edit `/src/config/passwords.ts`:
```typescript
export const VALID_PASSWORDS = [
  'newpassword123',
  'anotherpassword',
  // Add more passwords here
];
```

### Session Timeout
Modify the timeout in `/src/config/passwords.ts`:
```typescript
const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
```

## Development
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

The app will be available at `http://localhost:5174/relaxtogo/`