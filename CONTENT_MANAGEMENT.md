# Content Management Guide

## How to Update Website Content

This site is deployed via **GitHub + Netlify**. Content changes are made by editing code files and pushing to GitHub. Netlify will automatically rebuild and deploy your changes.

---

## 🎨 Updating Hero Slider (Home Page)

### Location: `src/utils/contentService.ts`

Find the `heroSlider` array (around line 621) and edit the slides:

```typescript
heroSlider: [
  {
    id: "slide1",
    image: "https://i.imgur.com/XXXXX.jpg",  // Image URL from Imgur
    title: "Bridgewater",                    // Main title
    subtitle: "We love our town.",           // Subtitle text
    isActive: true                            // Show/hide slide
  },
  // Add more slides...
]
```

### To Add a New Slide:
1. Upload your image to Imgur (https://imgur.com/upload)
2. Right-click image → "Copy Image Address"
3. URL should look like: `https://i.imgur.com/abc123.jpg`
4. Add a new slide object to the array
5. Commit and push to GitHub

### To Remove a Slide:
- Set `isActive: false` or delete the entire slide object

### To Change Slide Order:
- Rearrange the slide objects in the array

---

## 📧 Contact Form Email Settings

The contact form uses **Netlify Forms**. Email recipients are configured in your **Netlify Dashboard**, not in code.

### To Update Email Recipients:
1. Go to Netlify Dashboard: https://app.netlify.com
2. Select your site
3. Navigate to **Site Settings → Forms**
4. Click **"Form notifications"**
5. Add, edit, or remove email addresses

**Note:** Code changes are NOT required for email settings.

---

## 📄 Page Content Updates

### Home Page Welcome Message
**Location:** `src/utils/contentService.ts` (around line 658)

```typescript
welcomeMessage: [
  "Paragraph 1 text here...",
  "Paragraph 2 text here...",
  "Paragraph 3 text here...",
  "Paragraph 4 text here..."
]
```

### Footer Content
**Location:** `src/utils/contentService.ts` (around line 574)

```typescript
footer: {
  ourTown: {
    title: "Our Town",
    quote: "Your quote here...",
    attribution: "-- Author Name"
  },
  copyright: {
    text: "Copyright © 2024...",
    address: "P.O. Box 132, Bridgewater, CT 06752"
  }
}
```

---

## 🔄 Deployment Workflow

### Step 1: Make Changes Locally (Recommended)
```bash
# Edit the files you need to change
# Test changes locally
bun run dev
```

View at http://localhost:5173 to verify changes look good.

### Step 2: Commit Changes

**Using GitHub Desktop:**
1. Open GitHub Desktop
2. You'll see your changed files
3. Add a commit message (e.g., "Update hero slider images")
4. Click "Commit to main"
5. Click "Push origin"

**Using Command Line:**
```bash
git add .
git commit -m "Update hero slider images"
git push origin main
```

### Step 3: Automatic Deployment
- Netlify detects the push
- Automatically builds the site
- Deploys to production
- Usually takes 1-2 minutes

---

## 🖼️ Image Management

### Best Practices:
1. **Use Imgur for hosting:** https://imgur.com/upload
2. **Optimize images before upload:**
   - Hero slider: 1920x1080px (recommended)
   - File size: Under 500KB
   - Format: JPG for photos, PNG for graphics
3. **Get DIRECT image URL:**
   - Right-click on uploaded image
   - Select "Copy Image Address"
   - URL must start with `https://i.imgur.com/`
   - URL must end with `.jpg`, `.jpeg`, or `.png`

### Upload Process:
1. Go to https://imgur.com/upload
2. Upload your image
3. Right-click image → "Copy image address"
4. Use this URL in `contentService.ts`
5. Commit and push to GitHub

---

## 📝 Quick Reference

| Content Type | File Location | Line # (approx) |
|--------------|---------------|-----------------|
| Hero Slider | `src/utils/contentService.ts` | 621 |
| Welcome Message | `src/utils/contentService.ts` | 658 |
| Footer Quote | `src/utils/contentService.ts` | 574 |
| Contact Form Emails | Netlify Dashboard | N/A |
| Header Logo | `src/components/Header.tsx` | 10 |

---

## 🆘 Common Tasks

### Change Hero Slider Image:
1. Upload image to Imgur
2. Edit `src/utils/contentService.ts` line 624 (or respective slide)
3. Replace `image: "old-url"` with your new Imgur URL
4. Save, commit, push to GitHub
5. Wait 1-2 minutes for Netlify to deploy

### Update Copyright Year:
1. Edit `src/utils/contentService.ts` line 587
2. Change year in copyright text
3. Save, commit, push to GitHub

### Change Footer Quote:
1. Edit `src/utils/contentService.ts` line 576
2. Update the quote text
3. Save, commit, push to GitHub

---

## 🎯 Best Practices

1. **Always test locally first:** Run `bun run dev` before pushing
2. **Write clear commit messages:** Describe what you changed
3. **Make small, focused changes:** Easier to track and rollback
4. **Keep backups of important content:** Save text in a separate document
5. **Optimize images before uploading:** Faster page loads

---

## ⚠️ Important Notes

- **Email recipients:** Configured in Netlify Dashboard, NOT in code
- **All changes require GitHub push:** No live editing interface
- **Changes take 1-2 minutes:** Netlify rebuild time
- **Test locally first:** Avoid deploying broken changes
- **Direct image URLs only:** Must be `https://i.imgur.com/...`

---

## 🔗 Helpful Links

- **Imgur Upload:** https://imgur.com/upload
- **Netlify Dashboard:** https://app.netlify.com
- **Image Optimizer:** https://tinypng.com
- **GitHub Repository:** [Your repo URL after setup]

---

**Last Updated:** November 2024
