# Vercel Deployment Guide for Real Estate Connect

## Quick Start - Deploy to Vercel with GitHub

### Step 1: Push Your Code to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `real-estate-connect`
   - Make it Public or Private (your choice)
   - Do NOT initialize with README (your code already has one)
   - Click "Create repository"

2. **Push your code to GitHub:**
   ```bash
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - Real Estate Connect website"
   
   # Add your GitHub repository as remote (replace YOUR_USERNAME)
   git remote add origin https://github.com/YOUR_USERNAME/real-estate-connect.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

2. **Import Your Repository:**
   - Click "Add New..." → "Project"
   - Find and select your `real-estate-connect` repository
   - Click "Import"

3. **Configure Your Project:**
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Click "Deploy"**
   - Vercel will build and deploy your site
   - Wait 2-3 minutes for the build to complete
   - You'll get a URL like: `https://real-estate-connect.vercel.app`

### Step 3: Add Your Custom Domain (realestateconnect.co)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add domain: `realestateconnect.co`
   - Also add: `www.realestateconnect.co`

2. **Update DNS at Your Domain Registrar:**

   For **realestateconnect.co** (root domain):
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`

   For **www.realestateconnect.co**:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

3. **Wait for DNS Propagation:**
   - Usually takes 5-60 minutes
   - Vercel will automatically provision SSL certificate
   - Your site will be live at https://realestateconnect.co

## Automatic Updates

Every time you push to GitHub, Vercel will automatically:
1. Build your updated code
2. Deploy to your live site
3. Keep your previous version as backup

To update your live site:
```bash
git add .
git commit -m "Update description here"
git push
```

## Environment Variables (If Needed Later)

If you add backend features:
1. Go to Vercel Project Settings → Environment Variables
2. Add variables for production, preview, and development
3. Redeploy to apply changes

## Monitoring Your Site

**In Vercel Dashboard:**
- View deployment history
- Check build logs
- Monitor analytics
- See performance metrics

## Custom Domain SSL Certificate

Vercel automatically provides:
- Free SSL/TLS certificates
- Auto-renewal
- HTTPS redirect
- CDN for fast global delivery

## Troubleshooting

### Build Fails
- Check the build logs in Vercel
- Ensure all dependencies are in package.json
- Verify Node version compatibility

### Domain Not Working
- Verify DNS settings with your registrar
- Wait up to 48 hours for full DNS propagation
- Check Vercel domain status in Settings

### 404 Errors on Refresh
- Already configured in vercel.json
- All routes redirect to index.html

## SEO Setup After Deployment

1. **Google Search Console:**
   - Go to https://search.google.com/search-console
   - Add property: https://realestateconnect.co
   - Verify with HTML tag or DNS
   - Submit sitemap: https://realestateconnect.co/sitemap.xml

2. **Google Business Profile:**
   - Go to https://www.google.com/business
   - Create/claim your business listing
   - Add your website: https://realestateconnect.co
   - Verify your business

3. **Google Analytics (Optional):**
   - Create account at https://analytics.google.com
   - Add tracking code to index.html

## Performance Optimization

Your site includes:
- ✅ Minified CSS/JS
- ✅ Image optimization via Unsplash
- ✅ Code splitting
- ✅ Gzip compression
- ✅ Browser caching
- ✅ CDN delivery

## Security Features

Already configured:
- ✅ HTTPS/SSL
- ✅ Security headers
- ✅ XSS protection
- ✅ Clickjacking protection
- ✅ Content Security Policy

## Next Steps After Deployment

1. Test all forms and WhatsApp integration
2. Submit sitemap to Google Search Console
3. Set up Google Business Profile
4. Share your website URL on social media
5. Monitor analytics and user behavior

## Support

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Support:** https://support.github.com
- **Domain Issues:** Contact your domain registrar

---

**Your Website Will Be Live At:**
- **Main URL:** https://realestateconnect.co
- **WWW URL:** https://www.realestateconnect.co
- **Vercel URL:** https://real-estate-connect.vercel.app

All URLs will automatically redirect to HTTPS for security.
