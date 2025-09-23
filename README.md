# Web Monorepo - Vercel Deployment

## Overview
This monorepo combines two Nuxt layers:
- **digital-agency**: Corporate website layer
- **local-spot**: Admin dashboard layer

## Environment Variables Required

### Digital Agency Layer
```
AGENCY_MONGO_URI=mongodb+srv://...
AGENCY_JWT_SECRET=your-secret-key
```

### Local Spot Layer
```
LOCAL_SPOT_MONGO_URI=mongodb+srv://...
LOCAL_SPOT_JWT_SECRET=your-secret-key
LOCAL_SPOT_JWT_EXPIRES_IN=7d
```

## API Routes

### Digital Agency CMS
- `/api/agency-cms/auth/login`
- `/api/agency-cms/auth/logout`
- `/api/agency-cms/auth/me`
- `/api/agency-cms/cms/*`

### Local Spot Admin
- `/api/local-spot/auth/login`
- `/api/local-spot/auth/register`
- `/api/local-spot/users/*`
- `/api/local-spot/roles/*`
- `/api/local-spot/permissions/*`

## Deployment

### Vercel
1. Set environment variables in Vercel dashboard
2. Deploy will automatically run `npm run build`
3. Build process includes copying server files from both layers

### Build Process
```bash
npm run build  # Copies server files and builds
npm run generate  # For static generation
```

## Local Development
```bash
# Use Node.js 20 or higher
nvm use 20
npm install --legacy-peer-deps
npm run copy-server  # Copy server files manually
npm run dev
```

## Features
- ✅ Dual layer architecture
- ✅ Environment variable isolation
- ✅ API route separation
- ✅ CSS merging from both layers
- ✅ MongoDB integration for both layers
- ✅ JWT authentication for both systems