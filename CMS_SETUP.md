# DigitalFlow CMS Setup Guide

## Overview
The DigitalFlow website now includes a complete Content Management System (CMS) that allows administrators to manage all website content, images, and settings through a user-friendly interface.

## Features
- ✅ **Authentication System** - Secure admin login/logout
- ✅ **Content Management** - Edit homepage, services, about, and contact pages
- ✅ **Service Management** - Add, edit, delete, and organize services
- ✅ **Team Management** - Manage team member profiles
- ✅ **Image Uploads** - Drag-and-drop image uploads with URL fallback
- ✅ **Site Settings** - Configure site name, colors, and social links
- ✅ **Database Integration** - SQLite database with Prisma ORM
- ✅ **Route Protection** - Admin-only access to CMS areas

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Database
```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push
```

### 3. Create Admin Account
1. Start the development server: `npm run dev`
2. Visit: `http://localhost:3000/login`
3. Click "Need to setup admin account?"
4. Create your admin credentials

### 4. Access CMS Dashboard
- Login at: `/login`
- CMS Dashboard: `/manage`

## CMS Structure

### Admin Routes
- `/login` - Admin login page
- `/manage` - Main CMS dashboard
- `/manage/home` - Edit homepage content
- `/manage/services` - Manage services
- `/manage/about` - Edit about page
- `/manage/contact` - Edit contact information
- `/manage/team` - Manage team members
- `/manage/settings` - Site settings

### Database Tables
- `User` - Admin users
- `HomeContent` - Homepage content
- `Service` - Service offerings
- `AboutContent` - About page content
- `TeamMember` - Team member profiles
- `ContactContent` - Contact information
- `FAQ` - Frequently asked questions
- `SiteSettings` - Global site settings

### API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/setup` - Create first admin
- `GET|POST /api/cms/home-content` - Home page content
- `GET|POST|PUT|DELETE /api/cms/services` - Service management
- `POST /api/upload/image` - Image upload

## Image Management
- **Upload Location**: `/public/uploads/`
- **Supported Formats**: JPEG, PNG, GIF, WebP
- **Max File Size**: 5MB
- **Features**: 
  - Drag & drop upload
  - URL input fallback
  - Image preview
  - Error handling

## Content Integration
The website dynamically loads content from the CMS database:
- Homepage hero section, services, and about preview
- Services page with dynamic service cards
- About page content and team members
- Contact page information
- Site-wide settings (name, tagline, colors)

## Security Features
- JWT token authentication
- HTTP-only secure cookies
- Route middleware protection
- Admin-only API access
- File type validation
- File size limits

## Default Content
The system automatically creates default content when the first admin account is created, including:
- Sample home page content
- Default services (SEO, Social Media, Web Development)
- About page content
- Contact information
- Site settings

## Development
- **Framework**: Nuxt 3
- **Database**: SQLite with Prisma
- **Styling**: Tailwind CSS
- **Authentication**: JWT tokens
- **File Upload**: Built-in multipart handling

## Production Deployment
1. Set environment variables:
   ```
   JWT_SECRET=your-secure-secret-key
   ```
2. Build the application:
   ```bash
   npm run build
   ```
3. Deploy with PM2 or similar process manager
4. Ensure `/public/uploads/` directory is writable
5. Set up regular database backups

## Support
The CMS is fully integrated with the existing DigitalFlow website and maintains all the original design and functionality while adding powerful content management capabilities.