# 🚀 Quick Deploy to GitHub Pages - Step by Step

Follow these exact steps to get your real estate website live on the internet!

---

## ⚡ Before You Start

Make sure you have:
- [ ] A GitHub account (sign up at https://github.com)
- [ ] Git installed (download from https://git-scm.com)
- [ ] All your website files in one folder

---

## 📝 Step-by-Step Instructions

### Step 1: Create GitHub Repository (5 minutes)

1. Go to https://github.com and log in
2. Click the **"+"** button (top right) → **"New repository"**
3. Fill in:
   - **Repository name:** `benoni-boksburg-realestate`
   - **Description:** "Real Estate Website for Benoni & Boksburg"
   - **Public** (must be public for free hosting)
   - ✅ **Leave everything else UNCHECKED**
4. Click **"Create repository"**
5. **Keep this page open** - you'll need it in Step 3

---

### Step 2: Prepare Your Files (2 minutes)

1. Open **Terminal** (Mac/Linux) or **Command Prompt** (Windows)
2. Navigate to your project folder:
   ```bash
   cd Desktop/my-website
   ```
   (Replace `Desktop/my-website` with your actual folder path)

3. Type these commands **one by one**:
   ```bash
   git init
   ```
   ```bash
   git add .
   ```
   ```bash
   git commit -m "Initial website commit"
   ```

---

### Step 3: Connect to GitHub (3 minutes)

1. Go back to the GitHub page from Step 1
2. Copy the HTTPS URL (looks like: `https://github.com/username/benoni-boksburg-realestate.git`)
3. In your terminal, type:
   ```bash
   git remote add origin YOUR-COPIED-URL-HERE
   ```
   (Replace `YOUR-COPIED-URL-HERE` with the actual URL you copied)

4. Then type:
   ```bash
   git branch -M main
   ```
   ```bash
   git push -u origin main
   ```

5. You may be asked to log in - enter your GitHub username and password

---

### Step 4: Update Configuration (5 minutes)

#### A. Update vite.config.js

1. Open the file `vite.config.js` in your code editor
2. Find this line:
   ```javascript
   base: '/',
   ```
3. Change it to:
   ```javascript
   base: '/benoni-boksburg-realestate/',
   ```
   (Replace `benoni-boksburg-realestate` with YOUR repository name)

   **NOTE:** If you're using your custom domain (realestateconnect.co), keep it as:
   ```javascript
   base: '/',
   ```

#### B. Update package.json

1. Open `package.json`
2. Find the line with `"version":`
3. **Right after that line**, add:
   ```json
   "homepage": "https://realestateconnect.co",
   ```
   
   Or if using GitHub Pages without custom domain:
   ```json
   "homepage": "https://YOUR-USERNAME.github.io/benoni-boksburg-realestate",
   ```
   Replace `YOUR-USERNAME` with your GitHub username and `benoni-boksburg-realestate` with your repo name

4. Save both files

5. In terminal, type:
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push
   ```

---

### Step 5: Enable GitHub Pages (2 minutes)

1. Go to your repository on GitHub
2. Click **"Settings"** tab (top of page)
3. Click **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Source:** GitHub Actions
5. That's it! The deployment will start automatically

---

### Step 6: Wait for Deployment (3-5 minutes)

1. Click the **"Actions"** tab in your repository
2. You'll see a workflow running (yellow dot = in progress)
3. Wait for the green checkmark ✅
4. Once complete, go to:
   ```
   https://YOUR-USERNAME.github.io/benoni-boksburg-realestate/
   ```

---

## 🎉 Your Website is Live!

Your real estate website is now accessible at:
**https://YOUR-USERNAME.github.io/benoni-boksburg-realestate/**

### Want to use your custom domain? (realestateconnect.co)

See the complete guide: **CUSTOM_DOMAIN_SETUP.md**

Quick steps:
1. Go to repository Settings → Pages
2. Add custom domain: `realestateconnect.co`
3. Configure DNS with your domain provider
4. Wait 1-48 hours for DNS propagation
5. Your site will be live at **https://realestateconnect.co** ✨

---

## 📱 Next Steps

### 1. Update Property Listings
- Go to your live website
- Click **"Add New Listing"**
- Upload property images from your computer
- Fill in property details
- Click **"Add Listing"**

### 2. Test the Contact Form
- Fill out the contact form
- Check that WhatsApp messages come to: **082 314 6558**

### 3. Share Your Website
- Add the link to your WhatsApp Business status
- Share on Facebook/Instagram
- Add to your email signature
- Print on business cards

---

## 🔄 Making Updates

Whenever you want to change something on your website:

1. Make your changes in the code
2. Open terminal in your project folder
3. Type:
   ```bash
   git add .
   git commit -m "Updated property listings"
   git push
   ```
4. Wait 3-5 minutes for the site to update automatically

---

## 🆘 Troubleshooting

### Problem: "git: command not found"
**Solution:** Install Git from https://git-scm.com

### Problem: Website shows blank page
**Solution:** 
1. Check that `base` in `vite.config.js` matches your repository name exactly
2. Make sure it ends with `/` like this: `/benoni-boksburg-realestate/`

### Problem: Images not showing
**Solution:**
- Images uploaded through "Add New Listing" are stored in your browser
- They will work on your computer but may not work for other visitors
- For best results, upload images to a free service like:
  - Cloudinary (https://cloudinary.com)
  - ImgBB (https://imgbb.com)
  - Then paste the image URL when adding listings

### Problem: Deployment failed
**Solution:**
1. Go to the "Actions" tab on GitHub
2. Click on the failed workflow
3. Look for error messages
4. Common fix: Make sure `package.json` has all required fields

---

## 📞 Important Numbers

Your website sends WhatsApp messages to: **082 314 6558**

Make sure this number:
- Has WhatsApp installed
- Can receive messages from unknown numbers
- Is available to respond to inquiries

---

## 🎯 SEO Checklist

After deployment:

- [ ] Submit to Google Search Console (see `SEO_CONTENT.md`)
- [ ] Set up Google Business Profile (see `GOOGLE_BUSINESS_SETUP.md`)
- [ ] Add your website to Property24, Private Property
- [ ] Share on social media
- [ ] Ask satisfied clients for reviews

---

## ✅ All Done!

**Congratulations!** Your professional real estate website is now live and ready to generate leads. 

Every time someone fills out the contact form or clicks "Inquire via WhatsApp," you'll get a direct message to help close the deal.

**Good luck with your real estate business in Benoni and Boksburg!** 🏡
