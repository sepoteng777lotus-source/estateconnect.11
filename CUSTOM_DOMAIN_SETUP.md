# Custom Domain Setup Guide - realestateconnect.co

This guide will help you configure your custom domain **realestateconnect.co** to point to your website.

---

## Option 1: GitHub Pages with Custom Domain (Free)

### Step 1: Configure GitHub Repository

1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **"Custom domain"**, enter: `realestateconnect.co`
5. Click **Save**
6. Wait for DNS check (this will initially fail until you complete Step 2)

### Step 2: Configure DNS Records with Your Domain Provider

Login to your domain registrar (where you bought realestateconnect.co) and add these DNS records:

#### Option A: Using CNAME (Recommended for www)

Add a **CNAME record**:
- **Host/Name:** `www`
- **Value/Points to:** `YOUR-GITHUB-USERNAME.github.io`
- **TTL:** 3600 (or automatic)

Add an **A record** for the apex domain:
- **Host/Name:** `@` or leave blank
- **Value/Points to:** Add all 4 IP addresses:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **TTL:** 3600 (or automatic)

#### Option B: Using A Records Only

Add **4 A records** (one for each IP):
- **Host/Name:** `@` or leave blank
- **Value/Points to:** 
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **TTL:** 3600 (or automatic)

### Step 3: Wait for DNS Propagation

- DNS changes can take **1-48 hours** to propagate
- Check status at: https://www.whatsmydns.net/#A/realestateconnect.co
- Your site will be live when the DNS is fully propagated

### Step 4: Enable HTTPS

1. Return to GitHub Pages settings
2. Check the box: **"Enforce HTTPS"**
3. This may take a few minutes to activate
4. Your site will be secured with a free SSL certificate

---

## Option 2: Vercel Deployment (Recommended for Professional Use)

Vercel offers better performance and automatic SSL for custom domains.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy to Vercel

In your project folder:
```bash
vercel login
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **real-estate-benoni-boksburg**
- Directory? **./** (press Enter)
- Override settings? **N**

### Step 3: Add Custom Domain in Vercel

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Domains**
4. Add domain: `realestateconnect.co`
5. Also add: `www.realestateconnect.co`

### Step 4: Configure DNS (Vercel will show you exactly what to add)

Vercel will display the exact DNS records needed. Typically:

**For realestateconnect.co:**
- **Type:** A
- **Name:** `@`
- **Value:** `76.76.21.21` (Vercel's IP)

**For www.realestateconnect.co:**
- **Type:** CNAME
- **Name:** `www`
- **Value:** `cname.vercel-dns.com`

### Step 5: Verify Domain

- Click **"Verify"** in Vercel
- Once verified, your site is live!
- HTTPS is automatically configured

---

## Option 3: Netlify Deployment

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Build Your Site

```bash
npm run build
```

### Step 3: Deploy to Netlify

```bash
netlify login
netlify init
```

Follow the prompts to deploy.

### Step 4: Add Custom Domain

1. Go to Netlify dashboard
2. Select your site
3. **Domain settings** → **Add custom domain**
4. Enter: `realestateconnect.co`
5. Follow DNS configuration instructions provided by Netlify

---

## Recommended: Vercel Deployment for realestateconnect.co

For the best experience with your custom domain, I recommend **Vercel** because:

✅ **Automatic HTTPS** - Free SSL certificate  
✅ **Global CDN** - Fast loading worldwide  
✅ **Zero Configuration** - Works out of the box  
✅ **Free Tier** - More than enough for real estate site  
✅ **Automatic Deployments** - Push to GitHub = instant deploy  
✅ **Custom Domain** - Easy setup in 5 minutes  

---

## Quick Vercel Deployment Steps

### 1. Push Your Code to GitHub First

```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Import to Vercel

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click **"Add New Project"**
4. Import your repository
5. Click **"Deploy"**
6. Wait 2-3 minutes ✅

### 3. Add Your Domain

1. Go to **Settings** → **Domains**
2. Add: `realestateconnect.co`
3. Configure DNS as shown by Vercel
4. Done! 🎉

---

## DNS Configuration for realestateconnect.co

Depending on where you bought your domain (e.g., GoDaddy, Namecheap, Google Domains), here's how to access DNS settings:

### GoDaddy
1. Login to GoDaddy
2. My Products → Domains
3. Click on realestateconnect.co
4. Manage DNS
5. Add records as specified above

### Namecheap
1. Login to Namecheap
2. Domain List → Manage
3. Advanced DNS tab
4. Add records as specified above

### Google Domains
1. Login to Google Domains
2. Click on realestateconnect.co
3. DNS settings
4. Add records as specified above

---

## Verify Your Setup

After configuring DNS, verify your setup:

1. **Check DNS propagation:**
   - Visit: https://www.whatsmydns.net
   - Enter: realestateconnect.co
   - Check A records worldwide

2. **Check HTTPS:**
   - Visit: https://realestateconnect.co
   - Look for 🔒 lock icon in browser

3. **Check redirects:**
   - Both `www.realestateconnect.co` and `realestateconnect.co` should work
   - Should automatically redirect to HTTPS

---

## Troubleshooting

### Domain not working after 48 hours
- Double-check DNS records are exactly as specified
- Clear your browser cache
- Try accessing in incognito/private mode
- Use https://dnschecker.org to verify DNS

### HTTPS not working
- Wait 24 hours after DNS propagation
- For GitHub Pages: Check "Enforce HTTPS" is enabled
- For Vercel/Netlify: HTTPS is automatic

### www vs non-www issues
- Add both versions to your deployment platform
- Set up proper redirects
- Most platforms handle this automatically

---

## Email Configuration (Optional)

If you want email@realestateconnect.co:

1. **Google Workspace** (Recommended)
   - Visit: https://workspace.google.com
   - Set up email for your domain
   - Cost: ~$6/month per user

2. **Zoho Mail** (Free option)
   - Visit: https://www.zoho.com/mail
   - Free for up to 5 users
   - Add MX records provided by Zoho

3. **Forwarding Only**
   - Set up email forwarding in your domain settings
   - Forward to your existing email
   - Free option available with most registrars

---

## Next Steps After Domain is Live

1. ✅ Update Google Business Profile with new website URL
2. ✅ Submit to Google Search Console with your custom domain
3. ✅ Update all marketing materials
4. ✅ Update social media bios
5. ✅ Add to email signature
6. ✅ Print on business cards

---

## Support

If you need help:
- GitHub Pages: https://docs.github.com/en/pages
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com

**Your domain:** realestateconnect.co  
**Current status:** Ready to configure  
**Estimated time to go live:** 1-48 hours after DNS configuration
