# Deployment Guide

This project uses Vercel for hosting with a staging/production workflow.

## Branch Structure

```
main (production)     → Production site
  ↑ PR required
staging               → Staging/testing environment
  ↑ PR required
feature/*             → Preview deployments (auto-generated URLs)
```

## Environments

| Branch | Environment | URL |
|--------|-------------|-----|
| `main` | Production | Your production domain |
| `staging` | Staging | Auto-generated Vercel preview URL |
| Other branches | Preview | Auto-generated per-branch URLs |

## Development Workflow

### 1. Local Development

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Test your changes locally at `http://localhost:5173`

### 2. Create a Feature Branch

```bash
git checkout staging
git pull origin staging
git checkout -b feature/your-feature-name
```

### 3. Push and Create PR to Staging

```bash
git push -u origin feature/your-feature-name
```

Then create a Pull Request targeting the `staging` branch.

- GitHub Actions will automatically run build and lint checks
- Get your PR reviewed and approved
- Merge to `staging`

### 4. Test on Staging

Once merged to `staging`, Vercel will automatically deploy to the staging environment. Test thoroughly at the staging URL.

### 5. Promote to Production

When staging is verified:

1. Create a Pull Request from `staging` → `main`
2. Get approval
3. Merge to deploy to production

## Setting Up Branch Protection (GitHub)

To enforce reviews before merging, set up branch protection rules:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Click **Add branch protection rule**
4. For `main` branch:
   - Branch name pattern: `main`
   - Check: **Require a pull request before merging**
   - Check: **Require approvals** (set to 1 or more)
   - Check: **Require status checks to pass before merging**
   - Select required status checks: `Build & Lint`
   - Check: **Require branches to be up to date before merging**
5. Repeat for `staging` branch with the same settings

## Creating the Staging Branch (First Time Setup)

If the staging branch doesn't exist yet:

```bash
git checkout main
git pull origin main
git checkout -b staging
git push -u origin staging
```

## Vercel Configuration

The project is configured in `frontend/vercel.json`. Vercel automatically:

- Deploys `main` branch to production
- Creates preview deployments for all other branches
- Runs the build command: `npm run build`
- Serves from the `dist` directory

### Custom Domains (Optional)

In the Vercel dashboard, you can:

1. Assign your production domain to the `main` branch
2. Optionally assign a staging subdomain (e.g., `staging.yourdomain.com`) to the `staging` branch

## CI/CD Pipeline

GitHub Actions runs on every PR to `staging` or `main`:

1. **Install** - Installs dependencies
2. **Lint** - Runs ESLint to check code quality
3. **Build** - Ensures the project builds successfully

PRs cannot be merged until these checks pass.

## Quick Reference

| Action | Command |
|--------|---------|
| Start local dev | `cd frontend && npm run dev` |
| Run linter | `cd frontend && npm run lint` |
| Build locally | `cd frontend && npm run build` |
| Preview build | `cd frontend && npm run preview` |
