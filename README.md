# Huboho: Coffee & Eatery

Website for **Huboho**, a boho café & eatery by Lush House at Plot No. 55, Canal Road, Gokulpeth, Nagpur.

It's a static site: plain HTML, CSS and JavaScript with no build step.

## What's inside
- **Full menu** transcribed from the café's printed menu: food and drinks, search, pure-veg and spicy filters, and their own ▼ ● ■ 🌶 symbols.
- **Your Huboho Horoscope:** the zodiac wheel from their menu, which you can tap or spin. Each sign gets a real dish and drink from the menu.
- **Table booking** via a pre-filled WhatsApp message (095952 02161).
- **The space:** photos from the café's listing, the verandah and indoor rooms, and accessibility and pet info.
- **Details:** live open/closed status (Nagpur time), Restaurant structured data for search engines, and a mobile-first layout with reduced-motion support.

## Run locally
```bash
python -m http.server 5175
```
Then open http://localhost:5175.

## Editing
- **Menu, prices, review counts and horoscope readings:** `js/data.js`
- **Styles and design tokens:** `css/styles.css`
- **Behaviour:** `js/main.js`
- **Research, design decisions and open questions:** `PLAN.md`

Menu and prices are as of September 2026.
