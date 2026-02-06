# Replace Main Site with Brutalist Design + GSAP

**Created:** 2026-02-06  
**Status:** In Progress  
**Goal:** Replace the original portfolio with an enhanced Brutalist design using GSAP animations

---

## Tasks

### Phase 1: Setup
- [x] Install GSAP library (`npm install gsap`)

### Phase 2: Create Enhanced Brutalist Index
- [x] Replace `src/pages/Index.tsx` with enhanced Brutalist design
  - Fix name sizing (reduce from clamp(3rem, 25vw, 20rem) to something more reasonable like clamp(2rem, 8vw, 6rem))
  - Remove DesignNav component
  - Add GSAP animations:
    - Text reveal animation on load for name
    - Staggered fade-in for skills
    - Scroll-triggered animations for sections
    - Glitch effect on hover for name
    - Smooth parallax on grid lines

### Phase 3: Cleanup
- [x] Remove Design1-5 routes from `src/App.tsx`
- [x] Delete `src/pages/Design1.tsx`
- [x] Delete `src/pages/Design2.tsx`
- [x] Delete `src/pages/Design3.tsx`
- [x] Delete `src/pages/Design4.tsx`
- [x] Delete `src/pages/Design5.tsx`
- [x] Delete `src/components/DesignNav.tsx`

### Phase 4: Verification
- [x] Verify build passes
- [x] Test in browser

---

## Enhanced Brutalist Design Specification

### Typography & Sizing (FIXED)
- Name: `clamp(2rem, 8vw, 6rem)` (reduced from 25vw)
- Letter-spacing: `clamp(0.2rem, 1vw, 0.8rem)` (reduced)
- Remove the transform: scale(1.2)

### GSAP Animations to Add

1. **Name Text Reveal**:
   - Split text into characters
   - Animate each character from opacity 0, y: 50 to visible
   - Stagger: 0.05s between chars
   - Duration: 0.8s
   - Ease: power4.out

2. **Scroll Indicator Pulse**:
   - Gentle pulse animation on the scroll percentage

3. **Grid Lines Parallax**:
   - Subtle movement on scroll using GSAP ScrollTrigger

4. **Section Reveals**:
   - Each section fades in and slides up on scroll
   - Use ScrollTrigger

5. **Skills Tree Animation**:
   - Typewriter-style reveal of the file tree
   - Staggered line by line

6. **Glitch Effect on Name Hover**:
   - CSS + GSAP for glitch/distortion effect

7. **Projects List Animation**:
   - Each line appears with a terminal-typing effect

### Colors (unchanged)
- Background: `#0a0a0a`
- Primary text: `#ffffff`
- Accent: `#ff3333`
- Secondary: `#666666`

### Content Data
**Name:** Liang-Shih Lin  
**Role:** Full-stack Developer  
**Location:** Taiwan  

**Skills:**
- Frontend: React, Vue, TypeScript, Nuxt.js, Tailwind CSS
- Backend: Node.js, Python, Express, FastAPI, GraphQL, RESTful APIs
- Database: MongoDB, PostgreSQL, Redis, Firebase, TypeORM
- DevOps: Docker, GitHub Actions, AWS, Terraform, GCP

---

## Implementation Notes

- Keep all content from current Index (Hero, Skills, Projects, Blog) but style in Brutalist aesthetic
- Integrate with existing FeaturedProjects component (fetches from GitHub)
- Keep RecentPosts for blog integration
- Use GSAP's ScrollTrigger for scroll-based animations
- Import GSAP at component level: `import gsap from 'gsap'` and `import { ScrollTrigger } from 'gsap/ScrollTrigger'`
