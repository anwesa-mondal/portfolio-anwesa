<div align="center">
	<h1>Modern Portfolio – Build Guide</h1>
	<p>A Next.js (App Router) + Tailwind project using custom animated UI primitives.</p>
	<p><strong>Goal:</strong> Assemble a responsive, accessible, dark/light mode personal portfolio using the supplied components.</p>
</div>

## 🧩 Available Components

Core (in `src/components`):

- `GooeyNav` (navbar) • `LogoLoop` (scrolling skills) • `RotatingText` (circular rotating roles)
- Visual FX: `MetaBalls`, `Threads`, `GlassSurface`, `ElectricBorder`, `GlareHover`, `TargetCursor`, `TrueFocus`, `GradientText`, `ShinyText`, `StarBorder`, `ElasticSlider`, `ClickSpark`, `Dock`, `Lanyard`, `VariableProximity`, `TextType`
- Interaction: `Stepper` (multi‑step form)

UI (in `src/components/ui`):

- `timeline` (vertical / horizontal timeline)
- `3d-pin` (interactive 3D project pins)
- `infinite-moving-cards` (auto-scrolling gallery / card strip)

## 🎨 Design & Theming Requirements

- Provide both Light and Dark modes (system preference + manual toggle).
- Use Tailwind CSS variables (CSS custom props) or a theme provider (e.g. `data-theme="dark"`).
- Maintain strong contrast (WCAG AA) and reduce motion when `prefers-reduced-motion` is set.

## 🗂 Page Sections (Order)

1. Hero
2. Education
3. Experience
4. Projects
5. Gallery (Infinite Cards)
6. Contact (Stepper Form)
7. Footer

Each section should be wrapped in a landmark (`<header>`, `<section>`, `<footer>`) and have an accessible heading (`h2`+). Use consistent max width (e.g. `mx-auto max-w-6xl px-4`).

---

## 1. Hero Section

Includes:

- Name (large typographic lockup)
- Portrait inside an “orb” (use an existing circular / blur / metaball style container; if you have an `MetaBalls` or `TrueFocus` wrapper, combine with a rounded div). Use a placeholder transparent PNG from Unsplash, e.g.:
  ```text
  https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=512&q=80
  ```
- Rotating roles: integrate `RotatingText` with items: `AI/ML Engineer · Researcher · Data Scientist · Competitive Programming (C++/DSA)`.
- Scrolling skills ticker using `LogoLoop` (pass a list of logos / keywords: Python, PyTorch, TensorFlow, Next.js, TypeScript, C++, etc.).
- Subtle background effect (choose ONE to avoid visual overload): `MetaBalls`, `Threads`, or `GlassSurface` overlay.

Layout tip:

```tsx
<header className="relative flex flex-col items-center justify-center min-h-[90vh] text-center gap-10">
  <GooeyNav />
  <div className="space-y-6">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Your Name</h1>
    <RotatingText
      texts={[
        "AI/ML Engineer",
        "Researcher",
        "Data Scientist",
        "Competitive Programming (C++/DSA)",
      ]}
    />
    <LogoLoop
      items={[
        "Python",
        "PyTorch",
        "TensorFlow",
        "Next.js",
        "TypeScript",
        "C++",
      ]}
    />
  </div>
  {/* Orb framed image */}
  <div className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-primary/50 backdrop-blur">
    <img
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=512&q=80"
      alt="Portrait"
      className="object-cover w-full h-full"
    />
  </div>
</header>
```

## 2. Education Section

Show institution, degree, duration, focus areas. Consider a two-column layout (summary + key courses / achievements). Enhance heading with `GradientText` or `ShinyText` sparingly.

## 3. Experience Section (Timeline)

Use `timeline` component for roles, research assistantships, internships.
Each timeline entry: role, company, date range, short bullet impact statements.
Optional: add `ElectricBorder` or subtle hover glow for active node.

## 4. Projects Section (3D Pins)

Use `3d-pin` for 3–6 featured projects.
Project card fields:

- Title
- Short tagline
- Tech badges
- Link (GitHub / Live)
- Optional image / icon layered within the pin

Grid suggestion:

```tsx
<section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {/* map projects -> <ThreeDPin ... /> */}
</section>
```

## 5. Gallery (Infinite Moving Cards)

Use `infinite-moving-cards` for a visual gallery (research posters, hackathon photos, generated art, etc.).
Hover reveals: implement a detail overlay (title, description, stack). Provide alt text for each image.

Accessibility: ensure pause on hover / focus (stop auto movement for keyboard users if required).

## 6. Contact Me (Stepper Form)

Multi-step form using `Stepper`:

- Step 1: Basic info (Name, Email)
- Step 2: Inquiry type (radio or select: Collaboration / Research / Speaking / Other)
- Step 3: Message textarea
- Step 4: Review + submit

Validation: client-side (required fields) + success toast / confirmation.
Enhance submit button with `StarBorder` or `ElectricBorder` for a single accent piece.

## 7. Footer

Content blocks:

- Quick links (anchor to sections)
- Socials (LinkedIn, GitHub, Email)
- Small copyright notice with dynamic year

Optional animated accent: faint `Threads` or `MetaBalls` behind footer (reduced opacity).

---

## 🌗 Dark / Light Mode Implementation

Approach A (CSS class toggle):

```tsx
// in a ThemeToggle component
<button onClick={() => document.documentElement.classList.toggle("dark")}>
  Toggle Theme
</button>
```

Tailwind config should have `darkMode: 'class'` (if not, add in config).

Define semantic color tokens in `globals.css`:

```css
:root {
  --bg: 255 255 255;
  --fg: 17 20 24;
  --primary: 99 102 241;
}
.dark {
  --bg: 9 11 15;
  --fg: 240 240 245;
  --primary: 165 180 252;
}
body {
  background: rgb(var(--bg));
  color: rgb(var(--fg));
}
```

Use via Tailwind utility with arbitrary values: `bg-[rgb(var(--bg))] text-[rgb(var(--fg))]`.

---

## ♿ Accessibility Checklist

- Landmarks: `header`, `nav`, `main`, `section`, `footer`
- Headings in order (no skipping levels for styling)
- Focus styles visible (`focus:outline-none focus:ring` etc.)
- Provide `aria-label` for icon-only buttons (theme toggle, nav open)
- Motion reduction: wrap high-motion components with a `prefers-reduced-motion` media query guard.

---

## 🛠 Suggested File Structure Additions

```
src/
	app/
		layout.tsx
		page.tsx (imports all sections)
	components/
		sections/
			Hero.tsx
			Education.tsx
			Experience.tsx
			Projects.tsx
			Gallery.tsx
			Contact.tsx
			Footer.tsx
		theme/ThemeToggle.tsx
		forms/ContactForm.tsx
```

Each section component exports a `<section id="section-id">` for anchor linking from the navbar.

---

## 🔗 Navbar (GooeyNav)

Configure `GooeyNav` with links: Home, Education, Experience, Projects, Gallery, Contact.
Make it sticky (`sticky top-0 z-50 backdrop-blur`). Add theme toggle inside.

---

## 🚀 Performance & Polish

- Lazy load non-critical visual FX components (`dynamic(() => import(...), { ssr: false })`).
- Compress images (Unsplash params: `&q=80&auto=format` already applied).
- Limit simultaneous high-FPS animations.

---

## ✅ Done Definition

| Area           | Criteria                                            |
| -------------- | --------------------------------------------------- |
| Responsiveness | Mobile (360px), Tablet, Desktop layouts validated   |
| Accessibility  | Keyboard nav + semantic structure + alt text        |
| Theming        | Dark/Light toggle persists (optional: localStorage) |
| Animations     | No flashing / seizure risk, respect reduced motion  |
| Content        | All 7 sections populated                            |
| Performance    | No major layout shifts; Lighthouse perf > 85        |

---

## 🧪 Manual Test Script

1. Load page (light mode default) – hero shows name, rotating roles, scrolling skills.
2. Toggle dark mode – colors invert with no FOUC.
3. Tab through nav – visible focus ring and correct skip order.
4. Resize to 375px width – navbar collapses gracefully; sections stack.
5. Hover project pins – 3D effect triggers smoothly.
6. Scroll gallery – infinite cards loop without jank.
7. Complete multi-step contact form – validation errors surface; success message on submit.
8. Inspect timeline – entries readable and chronological.

---

## 🧵 Implementation Order (Recommended)

1. Theming & layout shell
2. Navbar + section stubs
3. Hero (rotating + logo loop) & image orb
4. Education / Experience (timeline)
5. Projects (3D pins)
6. Gallery (infinite cards)
7. Contact (Stepper form)
8. Footer + final polish (accessibility, performance)

---

## ▶️ Development

```bash
npm install
npm run dev
# open http://localhost:3000
```

---

## 📦 Deployment (Vercel)

1. Commit & push repository.
2. Import project on Vercel.
3. Set build command: `next build`; output: `.next`.
4. Add custom domain (optional) & enable analytics.

---

## ✨ Future Enhancements

- Blog (MDX) integration
- Project filtering / tags
- Internationalization (i18n routing)
- RSS + OpenGraph cards

---

Feel free to adapt this guide as the component set evolves. Build intentionally—less simultaneous motion, more clarity.

</br>
<div align="center">Made with ⚡ animations & Next.js.</div>
