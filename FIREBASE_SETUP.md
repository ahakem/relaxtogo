# Firebase Setup Guide for Relax to Go

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `relaxtogo` (or any name you prefer)
4. Continue through the setup (you can disable Google Analytics if you don't need it)

## Step 2: Set up Firestore Database

1. In your Firebase project, go to **Build > Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (we'll add security rules later)
4. Select your region (choose closest to your users)
5. Click "Enable"

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web icon** (`</>`) to add a web app
4. Register app with nickname: "Relax to Go Web"
5. Copy the `firebaseConfig` object

## Step 4: Update Firebase Config File

Open `src/config/firebase.ts` and replace the configuration:

```typescript
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_YOUR_ID",
  appId: "PASTE_YOUR_APP_ID"
};
```

## Step 5: Set up Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable **Email/Password** authentication
5. Click "Save"

## Step 6: Create Admin User

You can create users through:
- Firebase Console: Authentication > Users > Add user
- Or programmatically through the app

## Step 7: Set up Firestore Security Rules

In Firestore Database > Rules, add these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Videos collection - read for authenticated users, write for admins only
    match /videos/{videoId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 8: Access Admin Panel

Add the admin route to your app:
- Navigate to `/admin` to manage videos

## What You Can Do:

### Manage Videos:
- ✅ Add new videos with Vimeo URLs
- ✅ Edit video details (title, description, duration, category)
- ✅ Delete videos
- ✅ Videos automatically sync across all users

### Manage Users (via Firebase Console):
- ✅ Add new users with email/password
- ✅ Delete users
- ✅ Reset passwords
- ✅ Set custom claims (admin privileges)

## Daily Usage:

1. **Add a video**: Go to `/admin`, click "Add Video", paste Vimeo URL
2. **Manage users**: Use Firebase Console > Authentication > Users
3. **No code changes needed** - everything updates in real-time!

## Free Tier Limits:

- ✅ Unlimited users
- ✅ 50K reads/day (plenty for your needs)
- ✅ 20K writes/day
- ✅ 1GB storage

Perfect for your yoga video library! 🧘‍♀️
