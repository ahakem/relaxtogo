# GitHub Pages Setup Instructions

## Automatic Setup (Recommended)

Your repository is now ready for GitHub Pages! Follow these steps to enable it:

### 1. Enable GitHub Pages
1. Go to your repository: https://github.com/ahakem/relaxtogo
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select "GitHub Actions"
5. The workflow will automatically deploy your app

### 2. Access Your Live App
Once deployment is complete (2-3 minutes), your app will be available at:
**https://ahakem.github.io/relaxtogo/**

### 3. Verify Deployment
- Check the **Actions** tab to see the deployment progress
- Look for the green checkmark indicating successful deployment
- Click on any workflow run to see detailed logs

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. Build the project locally:
```bash
npm run build
```

2. Use the `gh-pages` package:
```bash
npm install -g gh-pages
gh-pages -d dist
```

## Troubleshooting

### Common Issues:
- **404 Error**: Make sure GitHub Pages is enabled in repository settings
- **Blank Page**: Check that the base path in `vite.config.ts` matches your repository name
- **Build Failures**: Check the Actions tab for error details

### Workflow Status:
- ✅ Repository created and code pushed
- ✅ GitHub Actions workflow configured
- ⏳ Waiting for GitHub Pages to be enabled
- ⏳ First deployment will start automatically

## Features Included:
- ✅ Automatic deployment on push to main branch
- ✅ Node.js 18 environment
- ✅ Optimized build process
- ✅ Static asset handling
- ✅ Custom domain support (if needed)

## Next Steps:
1. Enable GitHub Pages in repository settings
2. Wait for first deployment to complete
3. Share your live app URL: https://ahakem.github.io/relaxtogo/