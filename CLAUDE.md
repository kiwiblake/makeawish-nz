# Make-A-Wish New Zealand Website

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
├── frontend/                 # Main application
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

### Git + Vercel (Automatic)

The project is connected to GitHub and Vercel. Pushing to `main` triggers automatic deployment:

```bash
git add -A
git commit -m "Your commit message"
git push
```

Vercel will automatically build and deploy.

### Manual Vercel Deployment

```bash
cd frontend
vercel --prod    # Deploy to production
vercel           # Deploy preview
```

### Vercel Configuration

The `vercel.json` is configured for:
- Vite framework with `dist/` output
- SPA routing (all routes -> index.html)
- `--legacy-peer-deps --ignore-scripts` for npm install (required for Builder.io)

## Environment Variables

Set these in Vercel Dashboard > Project Settings > Environment Variables:

| Variable | Description |
|----------|-------------|
| `CAMPAIGN_MONITOR_API_KEY` | API key for newsletter subscriptions |
| `CAMPAIGN_MONITOR_LIST_ID` | List ID for newsletter subscriptions |
| `NODE_VERSION` | Set to `20` for stable builds |

To add via CLI:
```bash
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

### Dependencies
- Keep dependencies minimal (~50 packages)
- The project was cleaned from 394 to ~50 dependencies
- Only add packages that are actually used

## Useful Commands

```bash
# Check Vercel deployment status
vercel ls frontend

# View deployment logs
vercel logs <deployment-url>

# Check linked project
vercel project ls
```
