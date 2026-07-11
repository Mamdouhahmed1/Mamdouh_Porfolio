# Mamdouh Ahmed — Portfolio Website

An advanced, animated portfolio for visual storyteller **Mamdouh Ahmed**
(Background / Concept / Character / Storyboard artist).

---

## How to Edit Everything (Non-Technical Guide)

All the text and images on the website are controlled by **two things**:

1. **`src/lib/content.ts`** — controls all text (bio, project descriptions, gallery order)
2. **`public/artwork/`** — controls all images (organized in folders by category)

### Where to Find the File

The file is at:
```
website/src/lib/content.ts
```
Open it in any text editor (Notepad, VS Code, etc.).

---

### How to Edit Your Name, Email, Phone

Find this section near the top of `content.ts`:

```ts
export const site = {
  name: "Mamdouh Ahmed",
  studio: "Mamdouh Studio",
  ...
  email: "mamdouh24681@gmail.com",
  phone: "+20 10 1442 2530",
  ...
};
```

Change anything between the `" "` quotes. Save the file.

---

### How to Edit the Hero Section (Landing Page)

Find this section:

```ts
export const hero = {
  eyebrow: "Portfolio · 2026",
  titleLines: ["Mamdouh", "Ahmed"],
  role: "Visual Storyteller — Backgrounds · Concept Art ...",
  intro: "Background Artist, Concept Artist ...",
};
```

Edit the text between `" "` quotes.

---

### How to Edit the About Section

Find the `about` object. You can edit:

- **`paragraphs`** — the bio text (each `" "` is a new paragraph)
- **`disciplines`** — the skills listed
- **`software`** — the software tools listed
- **`experience`** — work experience entries
- **`stats`** — the numbers shown (e.g. "6+" Disciplines)

---

### How to Edit "The Color of Zahian" Section

Find the `featuredProject` object. Each chapter has:

```ts
{
  id: "world",
  kicker: "World Building",
  title: "A world that runs on color",
  body: "The film takes place in ...",
  image: "/artwork/zhiyan/zhiyan-23.webp",
}
```

- Change `kicker`, `title`, `body` text between `" "` quotes
- To change the image, replace the `.webp` file in `public/artwork/zhiyan/` with the same filename

---

### How to Add or Remove Gallery Images

Find this section:

```ts
const pageList: Record<GalleryCategory, number[]> = {
  background: [5, 6, 7, 8, 9, 10, ...],
  "concept-art": [61, 25, 26, 27, ...],
  "character-design": [34, 35, 37, ...],
  "personal-projects": [47, 48, 49, ...],
};
```

Each folder represents a filter tab:
- **`background`** = "Background" tab
- **`concept-art`** = "Concept Art" tab
- **`character-design`** = "Character Design" tab
- **`personal-projects`** = "Personal Projects" tab

**To add a new image:**
1. Name it like `background-99.webp` (pick a number not already used)
2. Place it in `public/artwork/background/`
3. Add the number `99` to the array: `background: [5, 6, 7, ..., 99]`

**To remove an image:**
1. Delete the number from the array
2. Delete the `.webp` files from the `public/artwork/` folder

**To reorder images:** rearrange the numbers in the array. The order in the array = the order on the website.

---

### How to Change Images

All images are in `public/artwork/`, organized by category:

```
public/artwork/
  background/         → Background tab images
  concept-art/        → Concept Art tab images
  character-design/   → Character Design tab images
  personal-projects/  → Personal Projects tab images
  hero/               → Landing page cover image
  zhiyan/             → "The Color of Zahian" section images
```

**Image naming convention:**
- Full image: `category-XX.webp` (e.g. `background-05.webp`)
- Thumbnail: `category-XX-thumb.webp` (e.g. `background-05-thumb.webp`)

**To replace an image:**
1. Prepare your image as `.webp` format (use https://convertio.co to convert)
2. Name it exactly the same as the file you want to replace
3. Drop it in the correct folder, overwriting the old file

---

### How to Edit Social Media Links

Find the `site` object and change the URLs:

```ts
instagram: "https://instagram.com/mamdouh_studio",
linkedin: "https://www.linkedin.com/in/...",
facebook: "https://www.facebook.com/...",
upwork: "https://www.upwork.com/...",
```

---

### How to Deploy Updates to the Website

After making any changes:

1. Open PowerShell in the `website` folder
2. Run:
```powershell
git add .
git commit -m "Updated content"
git push
```
3. Vercel auto-deploys within ~1 minute

---

## Contact Form

The form uses **Web3Forms** (free) to send submissions to your email.

To set it up:
1. Go to https://web3forms.com
2. Enter your email → click **Create Access Key**
3. In Vercel → your project → **Settings → Environment Variables**
4. Add: Name = `NEXT_PUBLIC_WEB3FORMS_KEY`  Value = your access key
5. Redeploy

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first theme tokens)
- **Animation:** Motion (`motion/react`), Lenis smooth scroll, scroll-linked parallax
- **Imagery:** `next/image` optimization; artwork in optimized WebP

## Getting Started (Development)

```bash
npm install
npm run dev      # opens at http://localhost:3000
```

## Project Structure

```
src/
  app/
    layout.tsx            fonts, SEO metadata, global providers
    page.tsx              composes all sections
    globals.css           design system (color-emerge theme, tokens, animations)
    api/contact/route.ts  contact form backend
  components/             Navbar, Hero, About, FeaturedProject, Gallery,
                         Contact, Footer, Cursor, SmoothScroll, Preloader
  lib/
    content.ts            ← all portfolio copy/data (edit this file)
    utils.ts
public/artwork/           optimized WebP images (full + thumbnails)
```
