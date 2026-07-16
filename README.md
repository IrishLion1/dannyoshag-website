1. Put your six JPEGs in images/ named photo-1.jpg through photo-6.jpg.
2. Create GitHub repo 'dannyoshag-website'.
3. Upload all files from this folder.
4. Cloudflare Workers & Pages -> Create -> Pages -> Connect to Git -> choose repo.
5. Framework: None. Build command: blank. Output directory: .
6. Deploy.
7. Add custom domain dannyoshag.com.


## Psychedelic mode

The normal version remains unchanged.

Psychedelic-only files:
- psychedelic.html
- psychedelic.css
- psychedelic.js

To test offline:
1. Open index.html.
2. Choose Psychedelic.
3. Open normal.html separately to verify it is unchanged.


## Version 5: psychedelic clean slate

All previously added psychedelic visual and motion effects have been removed.

The infrastructure remains:
- `index.html` — mode selection
- `normal.html` — approved normal site
- `psychedelic.html` — same layout and content as normal mode
- `psychedelic.css` — reserved for one-at-a-time visual effects
- `psychedelic.js` — reserved for one-at-a-time interactive effects

The only psychedelic-page-specific visible element retained is the `CHANGE MODE` navigation button.


## v8 — Lightweight color chaos

Built from the clean-slate dual-mode version.

Psychedelic mode changes only:
- Low-resolution, 24 fps automatic canvas color field
- Automatic color wash on every photo
- Automatic moving X/quadrant overlay on every photo
- Different timing, direction, opacity, delay, and angle per image
- No mouse or hover effects
- No giant blur layers
- Normal mode remains unchanged


## v9 — Wonky color curves

Added to psychedelic mode only:
- Four SVG color-transfer filters with non-monotonic RGB curves
- One discrete/posterized curve treatment
- Stronger hard-light color washes
- Stronger difference-blend X overlays
- Faster, still mismatched animation cycles
- Faster hue movement in the low-resolution background canvas

Normal mode remains unchanged.


## v10 — Warped photo backgrounds and unique image patterns

Changes to psychedelic mode only:
- Toned down Image 2 for readability
- Replaced similar diagonal treatments with six different pattern types
- Added more rotation, shear, stretch, and drift
- Removed the old canvas background
- Reused all six photos as stretched, warped, blended background textures
- Added lightweight RGB bleed using drop shadows
- Normal mode remains unchanged


v11:
- softened wedge effects on images 1,4,5
- reduced highlight wash on image 2 with stronger modulation
- sped up warped background motion


V12:
- Bullseye modulation on image 3
- Global VHS chroma separation layer
- RGB drift and scanlines
- Faster photo-background motion


V13:
- VHS blanket strengthened
- Chroma trails
- Highlight bloom pulses
- Subtle analog line tearing
- Faster melty background drift


V14:
- Removed target circles from image 1
- Stronger VHS blanket
- Much stronger chroma separation
- More visible line tearing
- Faster background drift


## V15 — Warm and warbly

Changes to psychedelic mode only:
- Removed the full-page VHS filter and scanline blanket
- Reduced line tearing to smaller, much rarer shifts
- Added drifting amber, orange, magenta, and gold background washes
- Added a subtle whole-page heat-haze warble
- Changed image bloom toward warmer amber/red highlights
- Warmed the blended background-photo treatment
- Preserved Normal mode


## V16 — Direct normal landing page

Navigation changes:
- `index.html` is now the approved Normal page
- Normal page includes an `Escape Reality` button linking to `psychedelic.html`
- Psychedelic page includes an `End Trip` button linking back to `index.html`
- Removed the two-option homepage and old homepage/change-mode buttons
- `normal.html` now redirects to `index.html` for compatibility


## V16.1 — Single mode button fix

- Removed all leftover mode/home navigation buttons from both pages
- Reinserted exactly one `Escape Reality` button on `index.html`
- Reinserted exactly one `End Trip` button on `psychedelic.html`
- Disabled old `.mode-link` and `.psy-badge` styles


## V16.2 — Psychedelic mode loading fix

Likely cause of the live issue:
- Instagram's in-app browser reused an older cached `psychedelic.css`, while the new HTML button loaded.

Fixes:
- Added cache-busting versions to `psychedelic.css`, `psychedelic.js`, and `styles.css`
- Repaired SVG filter tag casing so the wonky color curves work in browsers
- Preserved the single Escape Reality / End Trip navigation


## V16.3 — Inline psychedelic effects

The psychedelic page was navigating correctly, but its external stylesheet was not
being applied on the live deployment.

This version:
- embeds all psychedelic CSS directly inside `psychedelic.html`
- embeds psychedelic JavaScript directly inside `psychedelic.html`
- removes reliance on the external psychedelic asset requests
- includes a visible warm-color fallback to confirm the mode loaded
- preserves the Normal page and Escape Reality / End Trip navigation
