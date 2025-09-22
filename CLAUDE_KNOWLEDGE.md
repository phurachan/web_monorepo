# Claude Knowledge - Web Monorepo Project

## Project Overview

This is a **Static Build Monorepo** for showcasing multiple independent Nuxt.js projects under one domain. The main purpose is to demonstrate different projects to clients while using only one cloud deployment.

### Key Concept
- **Development**: Each project is developed independently in separate repositories
- **Production**: All projects are compiled to static files and served through one main Nuxt app
- **Deployment**: Single deployment with multiple projects accessible via different paths

## Architecture

### Directory Structure
```
web-monorepo/
├── static/                    # Static builds from individual projects
│   ├── digital-agency/        # Build files from digital-agency project
│   └── project2/              # Build files from project2 project
├── server/middleware/         # Static file serving middleware
│   └── static-proxy.ts        # Handles routing for static files
├── pages/                     # Main app pages
│   └── index.vue              # Landing page with project selection
├── deploy-*.sh                # Deployment scripts
├── nuxt.config.ts             # Main routing configuration
├── DEPLOYMENT.md              # Detailed deployment instructions
└── package.json               # Standard Nuxt app dependencies
```

### URL Routing
- `/` → Landing page with project selection
- `/digital-agency` → Serves static files from `static/digital-agency/`
- `/project2` → Serves static files from `static/project2/`

## Technical Implementation

### 1. Static File Serving
The main app uses Nuxt's `nitro.publicAssets` configuration to serve static files:

```typescript
// nuxt.config.ts
nitro: {
  publicAssets: [
    {
      baseURL: '/digital-agency',
      dir: 'static/digital-agency',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    },
    {
      baseURL: '/project2', 
      dir: 'static/project2',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    }
  ]
}
```

### 2. Server Middleware
`server/middleware/static-proxy.ts` handles file serving with proper content types for:
- HTML files
- CSS/JS assets
- Images (PNG, JPG, SVG)
- JSON files

### 3. Route Rules
Cache headers and security headers are configured for each project path:

```typescript
routeRules: {
  '/digital-agency/**': { 
    headers: { 
      'Cache-Control': 'public, max-age=604800',
      'X-Frame-Options': 'SAMEORIGIN'
    }
  }
}
```

## Deployment Workflow

### Development Phase
1. Each project is developed in its own repository
2. Individual projects can be run independently using `pnpm dev`
3. No shared dependencies or components between projects

### Production Deployment
1. Build each project individually: `pnpm build` in each project
2. Copy `.output/public/*` to corresponding `static/project-name/` folder
3. Build main monorepo app: `pnpm build`
4. Deploy `.output` folder to cloud provider

### Automated Scripts

Three deployment scripts are provided:

1. **`deploy-digital-agency.sh`**
   - Builds digital-agency project
   - Copies build files to `static/digital-agency/`
   - Handles Prisma client generation if needed

2. **`deploy-project2.sh`**
   - Same process for project2
   - Copies build files to `static/project2/`

3. **`deploy-all.sh`**
   - Runs both individual deployment scripts
   - Builds main monorepo application
   - Provides complete deployment ready output

### Script Usage
```bash
# Deploy individual projects
./deploy-digital-agency.sh [path-to-digital-agency]
./deploy-project2.sh [path-to-project2]

# Deploy everything
./deploy-all.sh [digital-agency-path] [project2-path]
```

## Key Features

### Independence
- Each project maintains its own database and API endpoints
- No shared components or dependencies
- Projects can use different Nuxt versions or configurations
- Easy to extract projects for separate deployment later

### Development Flexibility
- Develop projects individually without running entire monorepo
- Hot reload and development tools work normally for each project
- Can work with different teams on different projects

### Production Efficiency
- Single cloud deployment saves costs
- All projects accessible under one domain
- Unified SSL certificate and CDN benefits
- Easy client demonstration with multiple projects

## Important Notes

### Project Requirements
- All sub-projects must be Nuxt.js applications
- Each project should be capable of static generation or SSR
- Database connections are handled per project (not shared)

### File Structure After Build
When projects are built, their static files should be placed in:
```
static/project-name/
├── index.html         # Main entry point
├── _nuxt/            # Nuxt-generated assets
├── assets/           # Static assets
└── ...               # Other build outputs
```

### Limitations
- Projects must not conflict in their static asset paths
- All projects share the same base domain
- No server-side API sharing between projects
- Each project's SSR capabilities are converted to static serving

## Future Considerations

### Scaling
- Easy to add more projects by:
  1. Adding new entry in `nuxt.config.ts`
  2. Creating deployment script
  3. Adding entry to landing page

### Migration
- Individual projects can be extracted easily
- Change deployment scripts to point to separate domains
- Minimal refactoring needed for independent deployment

### Monitoring
- Each project's performance can be monitored separately
- Static file serving provides good caching opportunities
- CloudFlare or similar CDN integration works well

## Troubleshooting

### Common Issues
1. **Build files not found**: Ensure `.output/public/` exists after building individual projects
2. **Routing conflicts**: Check that project paths don't overlap
3. **Asset loading issues**: Verify static file paths are correctly mapped
4. **Prisma errors**: Ensure `npx prisma generate` runs before build

### Debug Steps
1. Check individual project builds work: `cd project && pnpm build`
2. Verify static files are copied: `ls -la static/project-name/`
3. Test main app build: `pnpm build` in root
4. Check server middleware logs for routing issues

This architecture provides a flexible, cost-effective solution for showcasing multiple independent projects under a single deployment while maintaining development independence.