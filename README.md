# VRANKLY — High-Performance Digital Agency & Portfolio Website
**CEO & Founder: Faizan Cheena**

An elite, high-performance web application showcasing VRankly's full-spectrum digital agency capabilities: SEO/AEO/GEO ranking dominance, Google & Meta Ads, AI Automations, and 24/7 business operations.

---

## ✨ Features & Architecture

- **Multi-Page Structure**:
  - `#/` — **Home Page**: Hero with dynamic typography, metrics counter, client trust marquee, flagship showcase teasers, core capabilities, why choose us bento grid, and testimonials reel.
  - `#/about` — **About Us**: Origin story, engineering creed, interactive chronology milestones (2020-2026), and engineering pillars.
  - `#/services` — **Services & Scope Calculator**: 6 engineering verticals, 5-stage delivery methodology, and an interactive **Project Scope & Cost Estimator** that calculates budget and sprint timelines in real time.
  - `#/portfolio` — **Portfolio Showcase**: Interactive category filtering (`AI & ML`, `Mobile`, `Cloud & DevOps`, `HealthTech`), high-res project mockups, key metrics, and in-depth **Case Study Modals**.
  - `#/team` — **Team Section**: Dedicated leadership and senior engineering representation with high-res executive portraits, role titles, bios, core mastery tags, social links, and open career roles.
  - `#/contact` — **Interactive Contact**: Form with live field validation, service picker, budget pills, celebratory confetti effect upon submission, ticket ID generation, direct contact channels (Email, Phone, WhatsApp), global office locations, and FAQ accordion.

- **Design System & Aesthetics**:
  - Futuristic Dark Mode with Radial Cyber Mesh Gradients.
  - Frosted Glassmorphism panels with subtle border highlights.
  - Interactive HTML5 Canvas particle background connecting floating nodes to the user's cursor.
  - Cursor Glow follower with buttery smoothing.
  - 100% Mobile Responsive design with animated sliding drawer navigation.

---

## 🚀 How to Run Locally

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   The compiled, minified, ultra-fast production bundle is created in the `dist/` directory.

---

## 🌐 How to Upload / Deploy

### Option 1: Uploading to cPanel / Shared Hosting / Apache
1. Run `npm run build`.
2. Open your hosting File Manager (e.g. cPanel `public_html`).
3. Upload all files and folders located inside the `dist/` directory:
   - `index.html`
   - `assets/`
   - `images/`
   - `.htaccess`
4. Your site will instantly go live!

### Option 2: Uploading with WordPress
- **Standalone subfolder**: Create a folder in your WordPress hosting (e.g. `yourdomain.com/portfolio`) and drop the contents of the `dist/` folder into it.
- **Custom Page / iFrame**: You can embed the build into any WordPress template page.

### Option 3: 1-Click Free Hosting (Vercel / Netlify / GitHub Pages)
- **Vercel**: Run `npx vercel` or drag-and-drop the `dist` folder onto [vercel.com](https://vercel.com).
- **Netlify**: Drag-and-drop the `dist` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 🛠️ How to Customize Data & Content

All content is cleanly separated and centralized in:
`src/data/portfolioData.js`

- **Company Name & Contact**: Edit `COMPANY_INFO` (name, email, phone, stats).
- **Team Members**: Add or update names, roles, bios, and portraits in `TEAM_MEMBERS`.
- **Projects**: Add or edit case studies, metrics, tags, and images in `PROJECTS`.
- **Services**: Update offerings and deliverables in `SERVICES`.
- **Testimonials**: Update client quotes and ratings in `TESTIMONIALS`.
- **FAQs**: Update frequently asked questions in `FAQS`.
