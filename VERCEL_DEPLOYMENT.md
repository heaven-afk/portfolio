# Vercel Deployment Guide for Portfolio

## Prerequisites
✅ Git repository initialized (already done)
✅ Portfolio files ready
✅ Vercel account (create at https://vercel.com if needed)

---

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Website (Recommended - Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Portfolio ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: **Other** (static site)
     - Root Directory: `./`
     - Build Command: (leave empty)
     - Output Directory: `./`
   - Click "Deploy"

3. **Done!** 🎉
   - Your site will be live at `your-project.vercel.app`
   - You can add a custom domain in Vercel settings

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd "C:\Users\ziono\Documents\My Portfolio"
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy: Y
   - Which scope: (select your account)
   - Link to existing project: N
   - Project name: (e.g., `portfolio`)
   - Directory: `./`
   - Override settings: N

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

---

## ⚙️ Configuration

I've created a `vercel.json` file with optimal settings:
- Clean URLs enabled (removes `.html` from URLs)
- Proper static file serving
- No build step needed (pure HTML/CSS/JS)

---

## 🔄 Auto-Deploy Setup

Once connected to GitHub:
- Every push to `main` → Automatic deployment
- Pull requests → Preview deployments
- No manual deployment needed!

---

## 🌐 Custom Domain (Optional)

After deployment:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Done!

---

## 📝 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify dark mode toggle works
- [ ] Check all case study links
- [ ] Test on mobile devices
- [ ] Verify contact links (LinkedIn, Email, WhatsApp, GitHub)

---

## 🐛 Troubleshooting

**Issue**: 404 errors on case study pages
**Solution**: Vercel should handle this automatically with the config, but if needed, you can add rewrites in `vercel.json`

**Issue**: Dark mode not persisting
**Solution**: Already fixed with cache-busting (`?v=2`)

**Issue**: Images not loading
**Solution**: Check paths in Vercel logs; all paths should be relative

---

## 🎯 Quick Start (Recommended)

**Fastest Method**:
1. Commit and push to GitHub
2. Visit https://vercel.com/new
3. Import your repo
4. Click Deploy
5. Done! ✅
