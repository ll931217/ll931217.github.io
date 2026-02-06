# Portfolio Redesign: Five Distinctive Designs

**Created:** 2026-02-06  
**Status:** In Progress  
**Goal:** Create five visually unique portfolio designs at routes /1, /2, /3, /4, /5 with shared navigation

---

## Tasks

### Phase 1: Foundation
- [x] Create shared floating navigation component (DesignNav.tsx)
- [x] Update App.tsx with new routes (/1, /2, /3, /4, /5)
- [x] Add font imports to index.css
- [x] Extend Tailwind config with new font families and colors

### Phase 2: Design Implementations
- [x] Implement Design 1: Brutalist/Raw aesthetic (/1)
- [x] Implement Design 2: Editorial/Magazine aesthetic (/2)
- [x] Implement Design 3: Retro-futuristic/Terminal aesthetic (/3)
- [x] Implement Design 4: Luxury/Refined minimalist aesthetic (/4)
- [x] Implement Design 5: Geometric/Art Deco aesthetic (/5)

### Phase 3: Testing
- [x] Test all designs in browser with Chrome DevTools
- [x] Verify navigation works across all pages
- [x] Check responsive behavior

---

## Design Specifications

### Design 1: BRUTALIST (/1)
**Concept:** Raw, honest engineering. No pretense.

**Aesthetic:**
- Monospace typography (IBM Plex Mono)
- Black background (#0a0a0a) with harsh white/red (#ff3333) accents
- Exposed grid system with visible guidelines
- Broken layouts, elements overlap
- Heavy borders, no shadows, no gradients
- ASCII art decorations

**Key Elements:**
- Giant cropped name spanning viewport
- Exposed scroll coordinates
- Skills as terminal-like file listings
- Projects as file system output
- Raw data visualization

---

### Design 2: EDITORIAL (/2)
**Concept:** Professional magazine feature telling your story.

**Aesthetic:**
- Editorial grid with dramatic white space
- Mixed serif/sans (Playfair Display + Source Serif 4)
- Warm cream background (#faf9f6)
- Black text with gold accents (#c9a227)
- Asymmetric layouts with floating elements

**Key Elements:**
- Issue number "№ 01 — 2024"
- Large serif name positioned asymmetrically
- Pull quote: "Simplicity is best"
- Skills as article sections with drop caps
- Projects as featured stories

---

### Design 3: TERMINAL (/3)
**Concept:** Cyberpunk command line interface.

**Aesthetic:**
- CRT monitor effect (scan lines, subtle curvature)
- Matrix green (#39ff14) on black (#0d1117)
- Typing animations for text reveal
- Blinking cursors
- ASCII borders

**Key Elements:**
- Boot sequence animation on load
- Command prompt navigation
- `$ whoami`, `$ ls skills/`, `$ cat projects.md`
- Status bar with uptime, time, location
- Scanline overlay effect
- Screen flicker animation

---

### Design 4: REFINED (/4)
**Concept:** Luxury minimalism. Every pixel intentional.

**Aesthetic:**
- 70%+ negative space
- Ultra-thin typography (Cormorant Garamond, Jost)
- Warm off-white background (#f8f7f4)
- Warm taupe/bronze accents (#8b7355)
- Subtle micro-animations on scroll

**Key Elements:**
- Name revealed slowly with animation
- Single-word descriptors spaced dramatically
- Skills as minimal horizontal line with dots
- Large clean project cards
- Subtle hover states
- Scroll progress indicator

---

### Design 5: GEOMETRIC (/5)
**Concept:** Bauhaus precision. Design as engineering.

**Aesthetic:**
- Strong geometric shapes (circles, triangles, rectangles)
- Primary colors (red #e63946, yellow #f4a261, teal #2a9d8f) on neutral (#f5f5f0)
- Bold sans-serif (Bebas Neue, DM Sans)
- Grid-based precision
- Shapes that interact on scroll/hover

**Key Elements:**
- Large geometric background shapes
- Name integrated with shapes
- Skills as colored block grid
- Projects as overlapping rectangular cards
- Animated shapes on hover

---

## Font Imports

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Source+Serif+4:wght@400;600&family=Archivo:wght@500;700&family=VT323&family=Fira+Code:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;1,300&family=Jost:wght@200;300;400;500&family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
```

---

## Content Data

**Name:** Liang-Shih Lin  
**Role:** Full-stack Developer  
**Location:** Taiwan  
**Bio:** Passionate full-stack developer specializing in modern web technologies and creative solutions. Building systems that work.

**Skills:**
- Frontend: React, Vue, TypeScript, Nuxt.js, Tailwind CSS
- Backend: Node.js, Python, Express, FastAPI, GraphQL, RESTful APIs
- Database: MongoDB, PostgreSQL, Redis, Firebase, TypeORM
- DevOps: Docker, GitHub Actions, AWS, Terraform, GCP

**Philosophy:** "Simplicity is best" - pragmatic engineer who values honesty over hype

---

## Implementation Notes

- All designs should fetch real data from existing components where possible
- Use the DesignNav component on all 5 pages
- Each design is completely independent - no shared styles between them
- Responsive design for mobile/tablet
- Smooth transitions and animations appropriate to each aesthetic
