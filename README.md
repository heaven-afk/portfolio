# Zion Ogadi - Portfolio Website

A static portfolio website for an Operations & Community Systems professional with a Data Analytics focus.

## Quick Start

1. Open `index.html` in your browser
2. That's it! No build step or dependencies required.

## File Structure

```
/
├── index.html                    # Home page
├── README.md                     # This file
├── case-studies/
│   ├── discord-revamp.html       # Discord Infrastructure case study
│   ├── community-scaling.html    # Community Scaling case study
│   └── analytics-ranking.html    # Analytics & Ranking case study
└── assets/
    ├── css/
    │   └── styles.css            # All styles (edit here to customize)
    ├── js/
    │   └── main.js               # Mobile nav toggle (optional)
    └── images/
        └── .gitkeep              # Add your images here
```

## Customization

### Colors & Styling

Edit CSS variables in `assets/css/styles.css` (lines 15-40):

```css
:root {
  --color-primary: #1a1a2e;     /* Dark blue - headings */
  --color-accent: #0f3460;       /* Accent blue - links, highlights */
  --color-text: #333333;         /* Body text */
  --color-background: #ffffff;   /* Page background */
  /* ... more variables */
}
```

### Content

- **Personal info**: Edit `index.html` (hero section, contact buttons)
- **Case studies**: Edit files in `case-studies/` folder
- **Last updated date**: Search for "Last updated" in HTML files

### Adding Images

1. Add images to `assets/images/`
2. Reference in HTML: `<img src="assets/images/your-image.jpg" alt="Description">`

---

## Deploy to GitHub Pages

### Step 1: Create Repository

1. Go to [github.com](https://github.com) and log in
2. Click **New repository** (or go to github.com/new)
3. Name it `your-username.github.io` for a user site, or any name for a project site
4. Keep it **Public**
5. Click **Create repository**

### Step 2: Push Your Code

From your terminal in this folder:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**

### Step 4: Access Your Site

Your site will be live at:
- User site: `https://your-username.github.io/`
- Project site: `https://your-username.github.io/repo-name/`

It may take 1-2 minutes to deploy initially.

---

## Tech Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Custom properties, Flexbox, Grid, responsive design
- **JavaScript**: Vanilla JS for mobile navigation (optional)
- **No frameworks**: Pure static files, no build step

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

---

*Last updated: January 2026*
