# 🚀 Quick Deploy Commands

## GitHub Setup (First Time Only)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Real Estate Benoni Boksburg"

# Set main branch
git branch -M main

# Add remote (replace with your GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/real-estate-benoni-boksburg.git

# Push to GitHub
git push -u origin main
```

---

## Vercel Deployment Options

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import Git Repository
3. Select your GitHub repo
4. Click Deploy (all settings auto-detected)

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (test before deploy)
npm run build

# Preview production build
npm run preview
```

---

## Update After First Deploy

```bash
# Make your changes, then:
git add .
git commit -m "Your update message"
git push

# Vercel will auto-deploy!
```

---

## Vercel Project Settings

**Framework Preset:** Vite  
**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Install Command:** `npm install`  
**Node Version:** 18.x

---

## Custom Domain Setup

After first deployment:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add: `realestateconnect.co`
3. Add DNS records at your domain provider:

```
A Record:
Name: @
Value: 76.76.21.21

CNAME Record:
Name: www
Value: cname.vercel-dns.com
```

---

## Environment Variables (If Needed)

If you need environment variables later:

1. Vercel Dashboard → Settings → Environment Variables
2. Add variables
3. Redeploy

---

## Quick Test Commands

```bash
# Check TypeScript
npx tsc --noEmit

# Build locally to test
npm run build

# Check bundle size
npm run build -- --mode production
```

---

## Troubleshooting

**Build fails?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**TypeScript errors?**
```bash
# Check for errors
npx tsc --noEmit
```

**Need to rollback?**
- Vercel Dashboard → Deployments → Select previous → Promote to Production

---

## URLs After Deployment

- **Production:** `https://realestateconnect.co`
- **Vercel URL:** `https://your-project.vercel.app`
- **Preview:** Auto-generated for each git push

---

## Contact Info (WhatsApp Integration)

Phone: **082 314 6558**  
Formatted: **+27823146558**  
Agent Password: **agent2024**

---

**That's it! Your site is ready to deploy. Just push to GitHub and import to Vercel.** 🎉
