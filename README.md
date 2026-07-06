# Auriel Systems — auriel.systems

Static marketing website for Auriel Systems. Plain HTML/CSS/JS — no build step, no dependencies.

## Structure

```
index.html      Home
founder.html    About the founder (Noel Kanaparthi)
products.html   What we do / product list
contact.html    Contact form + details
css/styles.css  Design system + responsive layout
js/main.js      Mobile nav + contact form
assets/         Logos, watermark
robots.txt, sitemap.xml
```

## Design — "The Engineering Dossier"

The site is styled as a piece of precision engineering documentation, true to a founder
who is an aerospace engineer with an axial-fan cooling patent: drafting paper, a faint
blueprint grid, corner registration marks, figure-numbered sections ("Fig. 01 — Mission"),
measurement annotations, and a live technical instrument (the patented fan) as the hero
centerpiece — it plots itself in on load and rotates slowly.

- **Palette:** drafting paper `#F4F1E8`, ink `#16150F`, signal blue `#0A57D8`,
  rare oxblood accent `#A6321F` (from the logo).
- **Type:** Fraunces (display serif) · IBM Plex Sans (body) · IBM Plex Mono (data/annotation).
- **Motion:** staggered load reveals, scroll-triggered section reveals (with a fail-safe so
  content is never stuck hidden), a rotating instrument, and precision hover micro-interactions.
  All motion respects `prefers-reduced-motion`.
- Fully responsive (desktop / tablet / mobile) with a hamburger menu under 760px.

## Run locally

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to auriel.systems

It's a static site, so any host works:

- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder or connect the repo,
  then point the `auriel.systems` domain at it in the dashboard.
- **GitHub Pages** — push to a repo, enable Pages, add a `CNAME` file containing
  `auriel.systems`, and set the DNS `CNAME`/`A` records at your registrar.
- **Any web host** — upload the files to the web root.

## Contact form

The form uses a `mailto:` handler (opens the visitor's mail client, pre-addressed to
`noel@auriel.co.in`). To capture submissions server-side without a backend, swap the
handler in `js/main.js` for a form service such as Formspree — set the form `action` to
your endpoint and let it POST normally.
