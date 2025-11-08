# Bridgewater Democratic Town Committee Website

A modern, responsive website for the Bridgewater Democratic Town Committee with Netlify Forms integration.

## Features

- **Home Page** with 5-slide hero slider
- **Contact Form** with Netlify Forms email notifications
- **Responsive Design** optimized for all devices
- **GitHub + Netlify** continuous deployment

---

## 🚀 Deployment to Netlify via GitHub

### Prerequisites
- GitHub account
- Netlify account (free tier works great)

### Step 1: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Create a new repository:**
   - Name: `bridgewater-dems` (or your preferred name)
   - Visibility: Public or Private (your choice)
   - Do NOT initialize with README (we have one)
3. **Copy the repository URL** (e.g., `https://github.com/yourusername/bridgewater-dems.git`)

### Step 2: Push Code to GitHub

**Option A: Using GitHub Desktop (Easiest)**

1. Download GitHub Desktop: https://desktop.github.com
2. Open GitHub Desktop
3. Click "Add" → "Add existing repository"
4. Select your `bridgewater-dems` folder
5. Click "Publish repository"
6. Choose repository name and public/private setting
7. Click "Publish Repository"

**Option B: Using Git Command Line**

```bash
# Navigate to your project folder
cd bridgewater-dems

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Bridgewater DTC website"

# Add remote repository (use YOUR repository URL)
git remote add origin https://github.com/yourusername/bridgewater-dems.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Connect to Netlify

1. **Go to Netlify:** https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your `bridgewater-dems` repository
6. **Configure build settings:**
   - **Build command:** `bun run build`
   - **Publish directory:** `dist`
7. Click **"Deploy site"**

### Step 4: Configure Contact Form Email Notifications

After your first deployment (takes ~2 minutes):

1. In Netlify Dashboard, go to **Site Settings → Forms**
2. Your "contact" form should be automatically detected
3. Click **"Form notifications"** → **"Add notification"**
4. Choose **"Email notification"**
5. Enter email address(es) to receive form submissions
6. Save settings

**Your contact form is now live and will email you all submissions!**

---

## 📧 Netlify Forms - How It Works

The contact form uses **Netlify's built-in form handling**.

### What You Receive:
When someone submits the contact form, you'll get an email with:
- Name
- Email
- Phone (optional)
- Subject
- Message

### Additional Options in Netlify:
- **Spam filtering:** Enable reCAPTCHA or Akismet
- **Slack notifications:** Get alerts in Slack
- **Webhook integrations:** Connect to other services
- **Multiple recipients:** Add as many email addresses as needed

---

## 🔄 Making Content Updates

All content updates are made by **editing the code** and **pushing to GitHub**. Netlify will automatically rebuild and deploy.

### Quick Update Guide:

**To Update Hero Slider:**
1. Edit `src/utils/contentService.ts` (line ~621)
2. Change image URLs, titles, or subtitles
3. Commit: `git commit -am "Update hero slider"`
4. Push: `git push origin main`
5. Netlify auto-deploys in 1-2 minutes

**To Update Footer Text:**
1. Edit `src/utils/contentService.ts` (line ~574)
2. Commit and push to GitHub
3. Netlify auto-deploys

**For detailed instructions, see:** `CONTENT_MANAGEMENT.md`

---

## 💻 Local Development

### Prerequisites
- Bun (recommended) or Node.js 18+
- Git

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/bridgewater-dems.git
cd bridgewater-dems

# Install dependencies
bun install

# Start development server
bun run dev
```

### Access Locally
- **Public site:** http://localhost:5173

---

## 📁 Project Structure

```
bridgewater-dems/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── HeroSlider.tsx
│   ├── pages/           # Main page components
│   │   ├── Home.tsx
│   │   └── Contact.tsx
│   ├── utils/
│   │   └── contentService.ts  # ← Edit this for content updates
│   └── App.tsx
├── public/              # Static assets
├── netlify.toml        # Netlify configuration
├── CONTENT_MANAGEMENT.md  # Content update guide
└── package.json
```

---

## 🎯 Content Management Workflow

1. **Edit content files** (see `CONTENT_MANAGEMENT.md`)
2. **Test changes locally:** `bun run dev`
3. **Commit changes:** `git commit -am "Description of changes"`
4. **Push to GitHub:** `git push origin main`
5. **Netlify auto-deploys** (1-2 minutes)
6. **Verify changes** on live site

---

## 🖼️ Image Management

### Best Practice: Use Imgur

1. **Upload to Imgur:** https://imgur.com/upload
2. **Copy direct image URL** (right-click image → "Copy Image Address")
3. **Use in code files** (must start with `https://i.imgur.com/` and end with `.jpg` or `.png`)

### Image Specifications:
- **Hero slider:** 1920x1080px recommended, under 500KB
- **Format:** JPG for photos, PNG for graphics
- **Optimize before upload:** https://tinypng.com

---

## 🆘 Support

For issues or questions:
- **Email:** info@bridgewaterdems.org
- **Content updates:** See `CONTENT_MANAGEMENT.md`
- **Technical issues:** Check browser console for errors

---

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Vite** - Build tool
- **Bun** - Package manager & runtime
- **Netlify Forms** - Form handling
- **GitHub** - Version control
- **Netlify** - Hosting & deployment

---

## 📄 License

Copyright © 2024 Bridgewater Democratic Town Committee. All rights reserved.

Paid for by the Bridgewater DTC, Cynthia Feuer, Treasurer
P.O. Box 132, Bridgewater, CT 06752

---

## 🔗 Quick Links

- **Imgur Upload:** https://imgur.com/upload
- **Netlify Dashboard:** https://app.netlify.com
- **Image Optimizer:** https://tinypng.com
- **Content Management Guide:** `CONTENT_MANAGEMENT.md`
