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


## V17.1 — revised directly from V16.3

- Removed the shared left-to-right single-pan sweep
- Applied more of Photo 2's soft folding color-shift treatment across the set
- Kept Photo 1 super-saturated and continuously multicolored
- Preserved Photo 3's pattern and movement
- Replaced Photo 4's rays with spirals
- Applied stronger Photo 2-style color shifting to Photo 5
- Blended Photo 3's patterned motion with Photo 2's color shift on Photo 6


## V17.2 — restored Photos 4–6

- Added more organic movement to Photo 1 while keeping the saturated rainbow
- Removed the diagonal stripe overlays from Photos 4, 5, and 6
- Restored Photo 4's V16.3 kaleidoscope treatment
- Restored Photo 5's V16.3 radial/spiral treatment
- Restored Photo 6's V16.3 colored blob treatment
- Added a center-origin irregular color sweep to Photo 6
- Kept the horizontal shared sweeps removed


## V18

- Photo 4 now uses the same saturated rainbow treatment as Photo 1
- Photo 5 now uses Photo 2's wave/color-shift base plus Photo 4's rainbow treatment layered on top
- Photo 6 keeps the same structure as V17.2 but is more saturated and stronger


## V19

- Left Photos 1, 2, 3, and 6 unchanged
- Photo 4 now uses the same rainbow treatment as Photo 1, but out of phase and with a different color-grade loop
- Photo 5 now combines Photo 2's wave/color-shift base with Photo 3's prism/bullseye overlay


## V20

- Added moving modulation to the solarized `curve-solar` look on Photos 2 and 5
- Added animated RGB drift, luma pulsing, and ripple movement to the solarized photos
- Increased the size and glitch strength of the sitewide chroma/glitch effect
- Increased the whole-page warble and background motion
- Left the non-solarized photo designs otherwise intact


## V20.1

- Removed the bullseye/ripple overlay from Photo 2
- Kept Photo 2's solarized movement
- Kept Photo 5's new effect unchanged
- Kept all other V20 changes unchanged


## V21

- Animated the actual solarized RGB curve table values for Photos 2 and 5
- Curves now expand, contract, partially invert, crawl across the mapping points, and transform over time
- Added dedicated animated solar filters for Photo 2 and Photo 5
- Fixed the transform conflict by moving line tearing from the image elements to the frame wrappers
- Kept Photo 5's overall stronger solarized look


## V22

- Photo 3 is now much bolder via stronger saturation, contrast, brightness, and overlay intensity
- Kept Photo 3's basic pattern/motion the same
- Added a brand-new caustic contour overlay to Photo 4
- Left the other photo treatments unchanged


## V22.1 — Photo 4 redo only

- Scrapped the previous Photo 4 effect stack
- Rebuilt Photo 4 specifically for the black-and-white image
- New base treatment: richer monochrome contrast/brightness
- New overlay 1: animated duotone interference wash
- New overlay 2: liquid silver contour / topographic light lines
- No sitewide settings changed
- No other photo treatments changed


## V22.2 — Photo 4 color swirls / explosions

- Rebuilt Photo 4 again from scratch
- Removed the previous Photo 4 treatment
- Added animated broad color swirls and patches
- Added brighter color-burst / explosion overlays
- Kept the underlying image monochrome-forward
- No sitewide changes
- No other photo changes


## V22.3 — Photo 4 direct color hit

- Rebuilt Photo 4 yet again with a much more direct, unmistakable treatment
- Removed the prior subtle Photo 4 approach
- Added large animated color swirls / clouds with very high visibility
- Added repeated expanding color-burst / explosion overlays
- Added a slight pulse to the black-and-white base image so the color feels like it hits the image itself
- No sitewide changes
- No other photo changes


## V23 — image assets only

Rebuilt directly from V22.3.

The only website change in this revision is image delivery for Psychedelic mode:

- Added 900px and 1400px JPEG variants
- Added `srcset` and `sizes` to the six Psychedelic-mode foreground photos
- Reused those same optimized assets for the existing warped backgrounds
- Mobile warped backgrounds use the 900px variants
- Desktop warped backgrounds use the 1400px variants
- Original photographs remain untouched and are still used by the Normal page
- No effects, animation timing, movement, filters, layout, or sitewide settings were changed


## V24 — optimization only

Built directly from V23 image-assets-only.

No visual effect was removed or redesigned. This revision only reduces work that
is unnecessary at a given moment:

- Keeps the existing effect CSS and all effect parameters intact
- Caps the animated RGB solar-curve calculations at approximately 30 updates/sec
- Updates Photo 2 and Photo 5 curves only while each photo is visible or within 600px of the viewport
- Reuses numeric buffers instead of allocating new curve arrays every update
- Avoids rewriting SVG filter attributes when the rounded value is unchanged
- Pauses each photo's CSS animations only while it is more than 600px offscreen
- Pauses all animation work while the browser tab/page is hidden
- Adds paint containment to each photo frame to reduce repaint spillover
- Leaves the Normal page unchanged


## V24.2 — Photo 3 animated neon texture mapping

Built from V24.

Only Photo 3 was changed:
- Added an animated RGB component-transfer filter for Photo 3 (`curve-crushed-photo3`)
- The crushed neon texture mapping now morphs, crawls, expands/contracts, and ripples over time
- Added a small extra hue/opacity drift on the existing Photo 3 prism overlay
- No other photos changed
- No global layout or asset changes


## V24.2.1 — Photo 3 roped back

Built from V24.2.

Only Photo 3 was changed:
- Kept the animated RGB-curve modulation
- Reduced the saturation / contrast boost on the image
- Reduced drop-shadow channel separation
- Reduced the RGB curve morph, crawl, drift, and ripple amplitudes
- Reduced the extra prism overlay intensity
- Left every other photo unchanged


## V24.2.3 — Photo 4 bold shards

Built from V24.2.1.

Only Photo 4 was changed:
- Replaced the previous animation overlay on Photo 4
- New direction is bold and drastic rather than subtle
- Uses aggressive prismatic color shards instead of ball/explosion shapes
- Adds animated contour/interference motion on top
- No other photos changed


## V24.2.4 — Photo 4 bullseye zoom + bold color

Built from V24.2.3.

Only Photo 4 was changed:
- The bullseye / contour layer now zooms in and out instead of drifting around
- The bullseye color treatment is much bolder and more saturated
- The shard layer and other photos remain unchanged


## V24.2.5 — Photo 4 full-frame bullseye zoom

Built from V24.2.4.

Only the Photo 4 bullseye layer was changed:
- Enlarged the overlay far beyond the photo frame
- Raised the minimum zoom level so its rectangular edges never become visible
- Kept the zooming motion and bold color shift
- No other effects or photos changed


## V24.2.7 — mobile thermal pass

Built directly from the uploaded live GitHub version.

Desktop appearance and behavior are unchanged.

Phone-sized psychedelic mode changes:
- Reduced animated Photo 2/5 SVG-curve updates from 30 fps to 15 fps
- Reduced animated Photo 3 SVG-curve updates from 24 fps to 12 fps
- Reduced the offscreen activation margin from 600px to 160px
- Kept all six warped background photographs, but stopped continuously
  hue-rotating their full-screen layers on mobile
- Preserved distinct fixed hues plus transform and opacity movement for those layers
- Quantized Photo 3 and Photo 4 hue-filter repainting while preserving their motion
- Added async decoding and lazy loading hints to lower-page photographs
- Normal mode and desktop psychedelic mode are unchanged


## V24.2.10 — fade transition + synchronized page position

Built from the uploaded V24.2.7 mobile thermal version.

Changes:
- Clicking `Escape Reality` fades the Normal page out and the psychedelic page in
- Clicking `End Trip` fades the psychedelic page out and the Normal page in
- The destination restores the same vertical location on the page
- Uses exact scroll position when page heights match and proportional position as a fallback
- Handles browser back-forward cache restoration
- Added intrinsic image dimensions to the Normal page to prevent layout shift during restoration
- No psychedelic visual effects were changed
