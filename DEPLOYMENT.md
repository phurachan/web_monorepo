# 🚀 Vercel Deployment Guide

This guide will walk you through deploying the web-monorepo to Vercel with Git Submodules.

## 📋 Prerequisites

- GitHub repository with the web-monorepo code
- Vercel account connected to your GitHub
- Git submodules properly configured

## 🔧 Project Structure

```
web-monorepo/
├── digital-agency/           # Git submodule
├── pages/digital-agency/     # Auto-generated wrapper pages
├── scripts/                  # Layer generation scripts
├── vercel.json              # Vercel configuration
└── .vercelignore           # Deployment ignore file
```

## 🚀 Deployment Steps

### 1. Push to GitHub

Make sure your repository is pushed to GitHub with the submodule:

```bash
git push origin main
```

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your `web-monorepo` repository
4. Select "Framework Preset": **Nuxt.js**

### 3. Configure Build Settings

Vercel will automatically detect the settings from `vercel.json`:

- **Build Command**: `git submodule update --init --recursive && pnpm generate-layers && pnpm build`
- **Output Directory**: `.output/public`
- **Framework**: Nuxt.js

### 4. Environment Variables (Optional)

Add these environment variables in Vercel dashboard:

```bash
NUXT_PUBLIC_SITE_NAME=Web Monorepo
NUXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
JWT_SECRET=your-jwt-secret
MONGO_URI=your-mongodb-connection-string
```

## 🔗 Routes After Deployment

Your deployed site will have these routes:

- **Main showcase**: `https://your-domain.vercel.app/`
- **Digital Agency**: `https://your-domain.vercel.app/digital-agency/**`
- **Admin Panel**: `https://your-domain.vercel.app/digital-agency/manage/**`

## 🛠 Updating the Deployment

### Updating Main Repository

```bash
git add .
git commit -m "Update main app"
git push origin main
```

### Updating Digital Agency Layer

```bash
# Go to digital-agency submodule
cd digital-agency
git pull origin main

# Go back to main repo
cd ..
git add digital-agency
git commit -m "Update digital-agency submodule"
git push origin main
```

## 🏗 Build Process

The build process follows these steps:

1. **Initialize Submodules**: `git submodule update --init --recursive`
2. **Generate Wrapper Pages**: `pnpm generate-layers`
3. **Build Application**: `pnpm build`

## 🐛 Troubleshooting

### Build Fails - Submodule Not Found

**Problem**: `fatal: No url found for submodule path 'digital-agency'`

**Solution**: Make sure the submodule is properly committed

### Routes Not Working

**Problem**: 404 errors on `/digital-agency/**` routes

**Solution**: Check if wrapper pages are generated and regenerate if needed

---

## 🎉 Success!

Your web-monorepo is now ready for Vercel deployment with:

- ✅ Git submodule integration
- ✅ Automated layer page generation  
- ✅ Route prefixing (`/digital-agency/**`)
- ✅ Full CMS functionality
- ✅ Scalable architecture