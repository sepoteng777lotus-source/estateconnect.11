# GitHub Pages Deployment Guide

This guide will walk you through deploying your real estate website to GitHub Pages.

## Prerequisites

- A GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer (download from https://git-scm.com/)
- Your website files ready

---

## Step 1: Create a GitHub Repository

1. **Go to GitHub** and log in to your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in the repository details:**
   - Repository name: `benoni-boksburg-realestate` (or your preferred name)
   - Description: "Real Estate Website for Benoni & Boksburg"
   - Choose "Public" (required for free GitHub Pages)
   - **DO NOT** check "Add a README file"
   - Click **"Create repository"**

---

## Step 2: Prepare Your Project Files

1. **Open Terminal/Command Prompt** on your computer

2. **Navigate to your project folder:**
   ```bash
   cd path/to/your/project
   ```

3. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

4. **Add all files to Git:**
   ```bash
   git add .
   ```

5. **Create your first commit:**
   ```bash
   git commit -m "Initial commit - Real Estate Website"
   ```

---

## Step 3: Connect to GitHub

1. **Add your GitHub repository as remote:**
   Replace `YOUR-USERNAME` with your actual GitHub username and `benoni-boksburg-realestate` with your repository name:
   
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/benoni-boksburg-realestate.git
   ```

2. **Rename the branch to main:**
   ```bash
   git branch -M main
   ```

3. **Push your code to GitHub:**
   ```bash
   git push -u origin main
   ```

   You may be prompted to enter your GitHub credentials.

---

## Step 4: Configure GitHub Pages

### Option A: Using GitHub Actions (Recommended)

1. **Create a new file** `.github/workflows/deploy.yml` in your project:

   Create the folder structure first:
   ```bash
   mkdir -p .github/workflows
   ```

2. **Create the deployment workflow file:**

   Create a file called `deploy.yml` inside `.github/workflows/` with this content:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: '20'
         
         - name: Install dependencies
           run: npm install
         
         - name: Build
           run: npm run build
         
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

3. **Add and commit the workflow file:**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Pages deployment workflow"
   git push
   ```

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **"Settings"** tab
   - Click on **"Pages"** in the left sidebar
   - Under **"Source"**, select **"GitHub Actions"**
   - Click **"Save"**

---

## Step 5: Configure Build Settings

1. **Update `package.json`** to include build scripts and homepage:

   Add these lines to your `package.json`:
   ```json
   {
     "homepage": "https://YOUR-USERNAME.github.io/benoni-boksburg-realestate",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```
   Replace `YOUR-USERNAME` with your GitHub username.

2. **Create or update `vite.config.js`** in your project root:

   ```javascript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     base: '/benoni-boksburg-realestate/',
   });
   ```
   Replace `benoni-boksburg-realestate` with your repository name.

3. **Commit the changes:**
   ```bash
   git add package.json vite.config.js
   git commit -m "Configure for GitHub Pages deployment"
   git push
   ```

---

## Step 6: Deploy Your Website

1. **The deployment will start automatically** after you push to the main branch

2. **Check deployment status:**
   - Go to your repository on GitHub
   - Click on the **"Actions"** tab
   - You should see a workflow running
   - Wait for it to complete (usually 2-5 minutes)

3. **Access your website:**
   Once the deployment is complete, your website will be available at:
   ```
   https://YOUR-USERNAME.github.io/benoni-boksburg-realestate/
   ```

---

## Step 7: Set Up Custom Domain (Optional)

If you have a custom domain (e.g., www.benoniproperties.co.za):

1. **In your GitHub repository:**
   - Go to **Settings** → **Pages**
   - Under **"Custom domain"**, enter your domain
   - Click **"Save"**

2. **Configure DNS with your domain provider:**
   - Add a CNAME record pointing to: `YOUR-USERNAME.github.io`
   - Or add A records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Wait for DNS propagation** (can take up to 48 hours)

---

## Making Updates to Your Website

Whenever you want to update your website:

1. **Make your changes** to the code

2. **Add and commit changes:**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. **Push to GitHub:**
   ```bash
   git push
   ```

4. **GitHub Actions will automatically rebuild and deploy** your site

---

## Troubleshooting

### Issue: Website shows 404 error
**Solution:** Make sure the `base` in `vite.config.js` matches your repository name exactly.

### Issue: Deployment fails
**Solution:** 
- Check the Actions tab for error logs
- Ensure `package.json` has all required dependencies
- Make sure Node.js version is compatible

### Issue: Images not loading
**Solution:** 
- Use relative paths for images
- Store images in the `public` folder
- Or use external image hosting (like Unsplash, Cloudinary)

### Issue: GitHub Actions not running
**Solution:**
- Go to Settings → Actions → General
- Ensure "Allow all actions" is selected
- Check that GitHub Pages is enabled

---

## Alternative: Manual Deployment

If you prefer not to use GitHub Actions:

1. **Build your project locally:**
   ```bash
   npm run build
   ```

2. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json:**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select **"gh-pages"** branch
   - Click Save

---

## Next Steps After Deployment

1. **Set up Google Search Console:**
   - Go to https://search.google.com/search-console
   - Add your property: `https://YOUR-USERNAME.github.io/benoni-boksburg-realestate/`
   - Submit your sitemap: `https://YOUR-USERNAME.github.io/benoni-boksburg-realestate/sitemap.xml`

2. **Set up Google Business Profile:**
   - Follow the guide in `GOOGLE_BUSINESS_SETUP.md`

3. **Share your website:**
   - Add the link to your WhatsApp Business profile
   - Share on social media
   - Add to email signatures

4. **Monitor performance:**
   - Use Google Analytics (see SEO_CONTENT.md for setup)
   - Check GitHub repository insights for visitor stats

---

## Support

If you encounter any issues:

1. Check the GitHub Actions logs in the "Actions" tab
2. Review the error messages carefully
3. Search for the error on Google or Stack Overflow
4. Check GitHub Pages documentation: https://docs.github.com/en/pages

---

## Security Note

- Never commit sensitive data (API keys, passwords)
- Your repository is public, so all code is visible
- Use environment variables for sensitive information

---

**Congratulations!** 🎉 Your real estate website is now live on the internet and accessible to potential clients worldwide!
