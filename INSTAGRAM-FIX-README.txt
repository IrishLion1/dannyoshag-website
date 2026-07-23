INSTAGRAM PERFORMANCE FIX

What changed
- Instagram/mobile no longer downloads or decodes any of the psychedelic MP4 files.
- Mobile uses the real photographs with lightweight animated color overlays.
- The actual photograph is always visible, so there are no color-only placeholder panels.
- Only the photograph nearest the center of the screen animates on mobile.
- The repeated delayed scroll restoration calls were removed. Restoration stops as soon as the visitor touches or scrolls.
- Desktop retains the optimized pre-rendered videos, with the real photo underneath while each video loads.
- Cache-busting version updated to v=30.

How to deploy
1. Replace the files in your repository with the contents of this folder.
2. Commit the changes in GitHub Desktop.
3. Push origin.
4. Fully close and reopen Instagram before testing.

Important
Test through a web server or GitHub Pages. Opening HTML directly from inside a ZIP is not a reliable performance test.
