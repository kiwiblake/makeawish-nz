# Make-A-Wish New Zealand Website

## CRITICAL: Deployment Rules

**ALWAYS run Vercel commands from the `frontend` directory:**
```bash
cd /Users/blake.ramage/Desktop/makeawish/frontend && vercel --prod
```

Git commands can run from root, but Vercel MUST be from `frontend/`.

---

## Project Overview

This is the Make-A-Wish New Zealand website, a React frontend built with Builder.io as the CMS. The site allows the organization to manage content visually through Builder.io's visual editor while maintaining a custom React codebase.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **CMS**: Builder.io
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Forms**: react-hook-form + zod validation
- **State**: zustand (minimal usage for modals)
- **Routing**: react-router-dom
- **Hosting**: Vercel

## Project Structure

```
makeawish/
├── frontend/                 # Main application (THIS IS THE DEPLOYABLE APP)
│   ├── api/                  # Vercel Edge Functions
│   │   └── subscribe.ts      # Campaign Monitor newsletter signup
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── extensions/
│   │   │   └── shadcn/       # shadcn/ui components
│   │   ├── pages/            # Page components
│   │   ├── utils/
│   │   │   └── builderRegistry.ts  # Builder.io component registration
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vercel.json           # Vercel deployment config
│   └── vite.config.ts
└── CLAUDE.md                 # This file
```

## Development

```bash
cd frontend
npm install --ignore-scripts   # ignore-scripts avoids native compilation issues
npm run dev                    # Start dev server at localhost:5173
npm run build                  # Production build to dist/
```

## Deployment

### IMPORTANT: Always deploy from the `frontend` directory

The Vercel project is `frontend`. Always `cd frontend` before running Vercel commands.

### Git Workflow

| Branch | Environment | URL |
|--------|-------------|-----|
| `main` | Production | https://frontend-eight-rho-93.vercel.app |
| `staging` | Staging/Preview | https://staging-makeawish-nz.vercel.app |

**Deploy to Production:**
```bash
git checkout main
git add -A
git commit -m "Your commit message"
git push origin main
```

**Deploy to Staging:**
```bash
git checkout staging
git add -A
git commit -m "Your commit message"
git push origin staging
```

Vercel automatically builds and deploys when you push to these branches.

### Manual Vercel Deployment

```bash
cd frontend                   # IMPORTANT: Must be in frontend directory
vercel --prod                 # Deploy to production
vercel                        # Deploy preview
```

### Vercel Configuration

The `vercel.json` is configured for:
- Vite framework with `dist/` output
- SPA routing (all routes -> index.html)
- `--legacy-peer-deps --ignore-scripts` for npm install (required for Builder.io)

## Environment Variables

Set these in Vercel Dashboard > Project Settings > Environment Variables:

| Variable | Description | Environments |
|----------|-------------|--------------|
| `CAMPAIGN_MONITOR_API_KEY` | API key for newsletter subscriptions | Production, Preview |
| `CAMPAIGN_MONITOR_LIST_ID` | List ID for newsletter subscriptions | Production, Preview |
| `NODE_VERSION` | Set to `20` for stable builds | Production, Preview |

To add via CLI (from frontend directory):
```bash
cd frontend
vercel env add CAMPAIGN_MONITOR_API_KEY production
vercel env add CAMPAIGN_MONITOR_LIST_ID production
```

## Builder.io Integration

- Builder API key is configured in `src/utils/builderRegistry.ts`
- Custom components are registered in the same file
- Content is fetched and rendered via `BuilderComponent` from `@builder.io/react`

## Key Files

- `frontend/src/utils/builderRegistry.ts` - Builder.io setup and component registration
- `frontend/src/components/` - Custom React components
- `frontend/api/subscribe.ts` - Vercel Edge Function for Campaign Monitor
- `frontend/vercel.json` - Deployment configuration

## Common Issues

### Build fails on Vercel
- Ensure `--ignore-scripts` is in the install command (Builder.io has native deps)
- Check Node version is 20.x (set via `NODE_VERSION` env var)

### Wrong project deployed
- Always run `cd frontend` before `vercel` commands
- Check you're in the right directory with `pwd`
- Verify project with `cat .vercel/project.json`

### Dependencies
- Keep dependencies minimal (~50 packages)
- The project was cleaned from 394 to ~50 dependencies
- Only add packages that are actually used

## Useful Commands

```bash
# ALWAYS cd to frontend first
cd frontend

# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs <deployment-url>

# Check which project you're linked to
cat .vercel/project.json

# List all projects
vercel project ls

# Check environment variables
vercel env ls
```
