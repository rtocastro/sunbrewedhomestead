# Sunbrewed Homestead React/Vite starter

Copy `src/App.jsx`, `src/main.jsx`, `src/styles.css`, and `src/siteData.js` into your existing React/Vite project's `src/` folder. Copy the `public/` contents into your existing `public/` folder.

Install router: `npm install react-router-dom`
Run: `npm run dev`

## Editable content
All text, stats, photo filenames, and external links live in `src/siteData.js`.

Add images to `public/images/`:
- `logo.png`
- `goat-1.jpg`, `goat-2.jpg`, `goat-3.jpg`
- `composting-101.jpg`
- `team-1.jpg`, `team-2.jpg`, `team-3.jpg`, `team-group.jpg`

If an image is missing, the starter shows a styled placeholder (except the optional logo).

## Forms (important)
Volunteer and Contact currently use a **mailto draft**, NOT true automatic form submission. Add the receiving email to `site.email` to activate drafting. On submission, the visitor must send the draft from their own email client. For production-quality send-by-email forms with confirmation, spam protection, and no email app requirement, integrate a verified backend or hosted form service. Do not put email service secret keys in client-side JSX.

## External buttons
Missing external URLs render non-clickable Coming soon pills instead of dead links. Add real donation, kitten listings, adoption application, foster, and Pickfresh URLs to `siteData.js`.

## Instagram
Currently has a placeholder. A real Instagram embed requires an approved provider snippet or API/widget. Avoid injecting arbitrary `instagramEmbedHtml` via `dangerouslySetInnerHTML`.

## Routing/deploy
Uses `BrowserRouter`; configure your static hosting to serve `index.html` for unknown page paths to support direct visits to routes.

## Colors
Reference swatches are in `public/palette-reference.png` and token constants in `src/siteData.js`; matching hex values are in the stylesheet. Responsive/mobile layout and basic accessibility are included.
