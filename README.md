# Make-A-Wish NZ

A React + TypeScript website for Make-A-Wish New Zealand, built with Builder.io CMS integration.

## Stack

- **Frontend**: React + TypeScript, Vite, Tailwind CSS, shadcn/ui
- **CMS**: Builder.io (visual page builder)
- **API**: Vercel Serverless Functions (for newsletter subscription)
- **Deployment**: Vercel

## Local Development

### Prerequisites

- Node.js 18+
- Yarn (or npm)

### 1. Install Dependencies

```bash
cd frontend
yarn install
```

### 2. Start Development Server

```bash
yarn dev
```

Visit http://localhost:5173 to view the application.

> **Note**: The newsletter subscription won't work locally without setting up the Vercel CLI with environment variables. It will work in production.

## Deployment to Vercel

### 1. Push to Git

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite (auto-detected)

4. Add environment variables:
   - `CAMPAIGN_MONITOR_API_KEY` - Your Campaign Monitor API key
   - `CAMPAIGN_MONITOR_LIST_ID` - Your Campaign Monitor list ID

5. Deploy!

## Project Structure

```
makeawish/
└── frontend/
    ├── api/
    │   └── subscribe.ts      # Vercel serverless function for newsletter
    ├── src/
    │   ├── components/       # React components (registered with Builder.io)
    │   ├── pages/            # Page components
    │   └── utils/            # Utilities including Builder.io registry
    ├── vite.config.ts        # Vite configuration
    └── vercel.json           # Vercel deployment config
```

## Builder.io Integration

The frontend uses Builder.io for content management. Components are registered in `frontend/src/utils/builderRegistry.ts`.

To edit content:
1. Log in to [Builder.io](https://builder.io)
2. Edit your pages visually
3. Changes publish automatically

## API Endpoints

- `POST /api/subscribe` - Subscribe to newsletter (Vercel serverless function)
  - Body: `{ "email": "string", "name": "string" }`
  - Returns: `{ "message": "string" }`
