# Sanjana G — Personal Portfolio 

A fast, accessible, zero-dependency personal portfolio built with semantic HTML5, modern CSS, and modular vanilla JavaScript (ES modules). Designed around a **"Mathematical Atelier"** aesthetic, it presents my background in Mathematics, Statistics & Computer Science alongside interactive case studies for web development and data analysis projects.

---

## File Map

```text
sanshikhakova.github.io/
├── index.html            # Complete semantic single-page portfolio & case-study <dialog> modals
├── 404.html              # Custom GitHub Pages 404 page with a link back home
├── robots.txt            # Search engine crawl rules + sitemap pointer
├── sitemap.xml           # XML sitemap for [https://sanshikhakova.github.io/](https://sanshikhakova.github.io/)
├── README.md             # This guide
├── css/
│   ├── tokens.css        # Design tokens: colours, fluid type scale, spacing, shadows, light/dark themes
│   ├── base.css          # Reset, graph-paper background, grain overlay, layout primitives, print styles
│   └── components.css    # Header, hero, spotlight cards, filter chips, <dialog>, timeline, footer, toast
├── js/
│   ├── main.js           # Entry point that imports and initialises every module
│   ├── theme.js          # Light/dark theme toggle with localStorage & View Transitions circular reveal
│   ├── nav.js            # Top scroll-progress bar, IntersectionObserver scrollspy, accessible mobile menu
│   ├── reveal.js         # One-time scroll reveal animations & cursor-following spotlight card glow
│   ├── hero-art.js       # Interactive Lissajous / harmonograph <canvas> with live equation caption
│   ├── projects.js       # Category filter chips (with aria-live count) & <dialog> focus/scroll management
│   └── contact.js        # Spam-resistant mailto assembly, clipboard copy with fallback, and toast feedback
└── assets/
    ├── favicon.svg       # Geometric SG monogram favicon
    ├── Sanjana_G_CV.pdf  # (Add your PDF here) Downloadable CV linked from the header and hero
    └── img/
        └── .gitkeep      # Place og-image.png (1200×630), optional portrait, screenshots & gallery photos here
