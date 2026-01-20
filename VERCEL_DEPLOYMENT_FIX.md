# Suplock Frontend - Vercel Deployment Guide

## Overview
This guide provides instructions for deploying the Suplock DApp frontend to Vercel, with fixes for common deployment issues.

## Pre-Deployment Checklist

### 1. Configuration Files Updated ✓
- [x] `next.config.js` - Removed deprecated `swcMinify` flag
- [x] `vercel.json` - Added buildCommand with legacy-peer-deps support
- [x] `.eslintrc.json` - Configured for Next.js TypeScript
- [x] `package.json` - Updated dependencies and ESLint config

### 2. Environment Variables
Create environment variables in Vercel project settings:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_SUPPORTED_CHAINS=1,5,137
```

## Deployment Steps

### Step 1: Connect to Vercel
```bash
# Option A: Via GitHub (Recommended)
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Import from GitHub
# 4. Select newton411/AI-solutions
# 5. Configure project settings

# Option B: Via CLI
npm install -g vercel
cd frontend/suplock-dapp
vercel
```

### Step 2: Configure Build Settings in Vercel Dashboard
1. **Project Settings** → **Build & Development Settings**
2. **Build Command**: `npm install --legacy-peer-deps && npm run build`
3. **Output Directory**: `.next`
4. **Install Command**: `npm install --legacy-peer-deps`

### Step 3: Set Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add all variables from `.env.example`
3. Make sure `NEXT_PUBLIC_*` variables are marked as Production

### Step 4: Deploy
```bash
# Automatic: Push to main branch (if GitHub connected)
# Manual: 
vercel --prod
```

## Troubleshooting

### Issue: "swcMinify is not a valid Next.js option"
**Solution**: Already fixed in updated `next.config.js`

### Issue: Build fails with peer dependency warnings
**Solution**: The `buildCommand` in `vercel.json` includes `--legacy-peer-deps` flag

### Issue: TypeScript errors during build
**Solution**: 
- Ensure `strict` mode is enabled in `tsconfig.json`
- Check for unused imports and variables
- Run `npm run lint` locally before pushing

### Issue: ESLint circular structure warning
**Solution**: This is a known issue with certain ESLint plugin configurations. The build completes successfully despite the warning.

### Issue: Build timeout on Vercel
**Solution**:
1. Check for large dependencies
2. Consider using [Vercel Builders](https://vercel.com/docs/concepts/git/vercel-for-github)
3. Increase build timeout in project settings

## Performance Optimization

### Image Optimization
The project uses `unoptimized: true` for images. To enable Vercel Image Optimization:

1. Remove `unoptimized: true` from `next.config.js`
2. Ensure images are in `/public` directory
3. Use `next/image` component properly

### Bundle Analysis
To analyze build bundle size:
```bash
npm install --save-dev @next/bundle-analyzer
```

## Deployment Verification

After deployment, verify:
1. ✓ Site loads without errors
2. ✓ All pages render correctly
3. ✓ API calls connect properly
4. ✓ No console errors in browser DevTools
5. ✓ Page load performance is acceptable

## Monitoring & Debugging

### View Deployment Logs
```bash
vercel logs --prod
```

### Check Real-Time Metrics
1. Go to Vercel Dashboard
2. Select project
3. Navigate to **Analytics** tab

### Enable Debug Mode
Set `NEXT_DEBUG=1` in environment variables temporarily

## Rollback

To rollback to previous deployment:
1. Go to Vercel Dashboard
2. Click on **Deployments**
3. Find desired deployment
4. Click **Promote to Production**

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment/vercel)
- [Vercel Configuration Reference](https://vercel.com/docs/concepts/projects/project-settings)
- [Next.js Best Practices](https://nextjs.org/docs/going-to-production)
- [Troubleshooting Common Issues](https://vercel.com/support)

## Support

For deployment issues:
1. Check Vercel logs in dashboard
2. Review this guide's troubleshooting section
3. Compare against `veil-hub-v2` repository for reference implementation
4. Contact Vercel support if needed
