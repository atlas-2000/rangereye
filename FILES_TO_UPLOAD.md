# RangerEye - Files to Upload to GitHub

## Essential Files for Deployment ✅

### Configuration Files
- `package.json` - Dependencies and scripts
- `netlify.toml` - Netlify deployment settings  
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript settings
- `tailwind.config.ts` - Styling configuration
- `postcss.config.js` - CSS processing
- `components.json` - UI components config
- `drizzle.config.ts` - Database configuration
- `.gitignore` - Git ignore rules

### Application Folders
- `client/` - React frontend application
- `server/` - Express backend server
- `shared/` - Shared types and schemas
- `attached_assets/` - Images, videos, documents

### Documentation
- `DEPLOYMENT.md` - Deployment instructions
- `vite.static.config.ts` - Static build config

## Files to SKIP (don't upload)
- `node_modules/` - Will be rebuilt
- `.cache/`, `.upm/`, `.local/` - System folders
- `.replit` - Replit-specific
- `package-lock.json` - Will be regenerated
- `hostinger-v2/` - Not needed for Netlify

## Total: ~15 files and 4 folders
Your clean RangerEye project is ready for GitHub upload!