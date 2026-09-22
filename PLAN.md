# Huboho — Website Plan

*Huboho Coffee & Eatery, by Lush House · Plot No. 55, Canal Road, Gokulpeth, Nagpur*
*Plan written 22 Sep 2026 from Google Maps, Zomato (full 15-page menu), District, Instagram and Swiggy research.*

---

## 1. Who they are (research summary)

| | |
|---|---|
| **Name** | Huboho — Coffee & Eatery (Google: "Huboho - Cafe & Eatery", हबोहो) |
| **Parent brand** | Lush House (sister café in Abhyankar Nagar, also pet-friendly) |
| **Positioning** | Boho café & eatery. Influencer reels call it "Nagpur's first boho café", but the café doesn't say so itself, so the site doesn't either |
| **Their own bio** | Speciality Coffee · Pan Asian · Wood-fired Pizzas · Pet Friendly |
| **Address** | Plot 55, First & Ground Floor, Prabha Apartment, Canal Road, Gokulpeth, Nagpur 440010 · Plus code 43V5+X3 |
| **Hours** | Open daily 11:00 am – 11:45 pm (Instagram). Zomato bookings run until 11:15 pm |
| **Phone** | **095952 02161** (confirmed by the owner's side, 22 Sep 2026). Used for calls and WhatsApp booking |
| **Ratings** | Google 4.5 ★ (1,313 reviews) · Zomato dining 4.1 (666) |
| **Cost for two** | ~₹1,000 |
| **Accessibility** | Wheelchair-accessible entrance, seating and toilet (Google) |
| **Seating** | A plant-filled verandah plus an indoor room with AC, across two floors |
| **Shop sign** | Devanagari "हु🌿बोहो" in green on white clapboard, "BY LUSH HOUSE" beneath |
| **Instagram** | @huboho (~3.9k followers). Highlights: Coffee, Food at Huboho, Huboho Invites |

### What guests talk about (Google review topics, counted)
Polite staff **39** · Sushi **28** · Ramen **19** · Tiramisu latte **10** · Dim sum **9** · Mango matcha **8** · Outdoor seating **6** · Kimchi ramen **5** · Peri peri fries 2 · Chicken bao 2

Also recurring: wood-fired pizza as a "Sunday ritual", "aesthetic but the food is genuinely good", "fast service", "full house". One weak spot: Zomato's ambience score (3.8) trails food and service, and a few complaints mention slow service at peak times.

### Brand language (taken from their own printed menu)
- **Food menu:** aged parchment paper, chunky soft-serif headings, wide geometric sans for dish names, a light rounded sans for descriptions. Faint line-art watermarks: a zodiac wheel, a folk-art stag, hands holding crystals, a mystic hand with a crescent, a sunburst arch and sparkles. A chocolate-brown legend bar reads **▼ vegetarian · ● chicken · ■ contains egg · 🌶 spicy**.
- **Drinks menu:** four flat pastel blocks, one per category. Powder blue is Cold with milk, butter is Hot coffee, sage is Cold espresso and lilac is Refreshers. Category names are set in letter-spaced serif caps.
- **Logo:** HU / BO / HO stacked in a thin serif inside a double-line capsule (arch), with a small sprig. "BY LUSH HOUSE" sits underneath.
- **Naming voice:** playful puns and local winks. Examples: *Bae-route* pizza, *Delhi-6*, *Flamno Bhut* (Bhut Jolokia), *Khow Suey My Way*, *Boho Blaze*, *Bohemian 22 Iced Tea*, and the *55 Chinatown Sizzler*, named after their plot number.
- **The space:** a bamboo-mat verandah ceiling with a wavy white trim, white clapboard walls hung with woven sun-plates, cane chairs, rattan pendant lamps, cognac leather chairs, macramé, irregular mirrors, a wall lettered *"always a wildflower child"* and a sun poster that says *"Protect your inner peace."*

---

## 2. What the website must do

**The page's one job:** get someone in Nagpur who is deciding where to go tonight to **choose Huboho, know what to order, and book or get directions**, ideally in under a minute on a phone.

The audience: college groups and young professionals from Dharampeth, Ramdaspeth and Shankar Nagar, couples, Sunday families, dog owners and Instagram creators. Most visitors will be on mobile.

"Huboho cafe menu" is one of the most frequent searches that lands on their Zomato page. **So the menu is the core feature: complete, searchable and filterable by veg.**

---

## 3. Design direction

**Concept: "the menu, come alive."** The site is built from their own printed menu, its paper, type, symbols and line art, instead of a generic café template. It uses no stock photography. The graphics are illustration-led like their menu. Real photos come only from the café's own Zomato listing gallery (see §6).

### Tokens
| Token | Hex | Source |
|---|---|---|
| Parchment | `#EFE4CA` | food-menu paper, with grain and darker edges |
| Ink | `#231A10` | menu text |
| Cocoa | `#4A3120` | the menu's legend bar, used for buttons and the footer |
| Sky | `#C9DCE9` / text `#233A62` | drinks menu: Cold with milk |
| Butter | `#F2EAC4` / text `#6B4C30` | drinks menu: Hot coffee |
| Sage | `#D3E0C1` / text `#46612F` | drinks menu: Cold espresso |
| Lilac | `#C8C2E2` / text `#393576` | drinks menu: Refreshers |
| Cane | `#B8864B` | rattan and bamboo, for hairlines only |

There is deliberately **no terracotta**, because it isn't in their brand. The pastels come straight from the drinks menu.

### Type (all chosen to echo the printed menu)
- **Caprasimo:** soft, chunky display serif, the closest free match to their menu headings. Used for headings only.
- **Lexend Exa:** a wide sans, matching the dish names on the menu.
- **Quicksand:** a rounded sans, matching the menu descriptions. Used for body text.
- **Marcellus:** letter-spaced serif caps, matching the logo and the drinks-menu category labels.

### Signature element: "Your Huboho Horoscope"
Their menu has a zodiac wheel printed on it, so the site makes it spin. A guest taps a sign, the wheel turns to it, and a tarot-style card turns over with **a real dish and a real drink from the menu, with prices** and a one-line reading. For example, Aries gets the Flamno Bhut (Bhut Jolokia pizza) and a Wake Me Up, and Scorpio gets Kimchi Ramen and an Espresso Tonic.
- On page load the wheel points at the current sun sign.
- The pure-veg toggle swaps each reading's dish for a veg alternative.
- **"Book a table for this"** carries the reading into the booking message.
- The feature solves a real problem (150 items is a lot to choose from), fits the mystic-boho brand, and is easy to share on Instagram.

Everything around it stays quiet.

---

## 4. Sitemap (single page, anchor-linked)

```
┌──────────────────────────────────────────────────────────────┐
│ [HU|BO|HO]  Menu · Your stars · The space · Visit            │
│             ● Open now · till 11:45 pm        [Book a table] │
├──────────────────────────────────────────────────────────────┤
│ HERO                                                         │
│  Boho café & eatery · Canal Road             ╭────────╮      │
│  Protect your                                │ pastel │      │
│  inner peace.                                │  dawn  │ arch │
│  Then order the Flamno Bhut.                 │ + sun  │ =logo│
│  Pizza · sushi · ramen · matcha · dogs ok    │ rays ✦ │ shape│
│  [Book a table] [See the menu]               ╰────────╯      │
│  ✦ 4.5 on Google · 1,313 reviews ✦ Dogs welcome ✦ Step-free  │
├──────────────────────────────────────────────────────────────┤
│ INSIDE: 5 listing photos in arch windows (the logo's shape)  │
│  verandah · tempura sushi · poster · pizza oven · lanterns   │
├──────────────────────────────────────────────────────────────┤
│ WHAT PEOPLE MENTION MOST (ranked by Google review count)      │
│  Polite staff 39 ▬▬▬▬▬▬ / Sushi 28 ▬▬▬▬ / Ramen 19 ▬▬▬ ...   │
│  each links to the dish and its price                        │
├──────────────────────────────────────────────────────────────┤
│ MENU   [Food | Drinks]  [search]  [Pure veg] [Spicy]         │
│  category chips (sticky) → parchment pages with ▼ ● ■ 🌶     │
│  Drinks = 4 pastel blocks like the printed drinks menu       │
├──────────────────────────────────────────────────────────────┤
│ YOUR HUBOHO HOROSCOPE  (signature)                           │
│  [ spinning zodiac wheel ]   [ tarot card: dish + drink ]    │
├──────────────────────────────────────────────────────────────┤
│ THE SPACE  (bamboo band with wavy trim, like the ceiling)    │
│  The verandah  |  Indoors  (a listing photo each) + good-to-know │
├──────────────────────────────────────────────────────────────┤
│ VISIT & BOOK                                                 │
│  booking form → WhatsApp   |  address, hours, map, links     │
├──────────────────────────────────────────────────────────────┤
│ cocoa footer: legend bar · by Lush House · sister café link   │
└──────────────────────────────────────────────────────────────┘
Mobile: sticky bottom bar → Call · Directions · Book
```

---

## 5. Features in detail

1. **Live open/closed status** in the header, calculated in IST: "Open now · till 11:45 pm" or "Closed · opens 11 am".
2. **Full digital menu** transcribed from their 15-page printed menu, with more than 150 items and prices:
   - Food and Drinks tabs.
   - Search, with an empty state that suggests other searches.
   - A **Pure veg** filter that hides chicken and egg, and shows only the veg price on dual-priced items.
   - A **Spicy** filter.
   - Category jump-chips.
   - Their own ▼ ● ■ 🌶 legend. Symbols are shown only where the printed menu (or their Zomato ordering menu) says what a dish is. Items the menu leaves unlabelled (pasta and ramen second prices, Sausage BP, the salami/sausage add-on) are shown exactly as printed, with no chicken symbol.
3. **"Most mentioned" ranking** built from real Google review-topic counts. It leads with polite staff at 39 mentions: the thing people mention most isn't a dish, it's the team.
4. **Zodiac horoscope** (the signature, described above).
5. **Booking by WhatsApp.** The form collects name, guests, date, time (11 am to 11 pm), seating (verandah or indoors), occasion and **"Bringing a dog?"**. It opens WhatsApp with the message already written, and also offers a call button plus District, Zomato and Swiggy Dineout links.
6. **Visit block:** address, plus code, hours, a Google map, directions, Instagram, and Zomato and Swiggy ordering.
7. **SEO:** Restaurant JSON-LD schema (geo, hours, cuisines, price range, reservations, menu), Open Graph tags, and a descriptive title targeting "boho café Nagpur", "Huboho menu", "sushi Nagpur" and "wood-fired pizza Gokulpeth".
8. **Accessibility:** keyboard-operable wheel and tabs, visible focus, `prefers-reduced-motion` respected, and semantic landmarks.

---

## 6. Tech

- Static HTML, CSS and vanilla JS with no build step, so it can go on Vercel, Netlify or any host.
- `index.html`, `css/styles.css`, `js/data.js` (menu and zodiac data, easy for staff to edit) and `js/main.js`.
- All illustrations are inline SVG, drawn in the same line-art style as the menu.
- **Photos:** 7 photos from the café's Zomato listing gallery (the ones uploaded as the listing's own photos, not by customers), saved locally in `images/` as webp (≈262 KB total). Ask the owner for full-resolution originals before launch.
  - *Not used:* Google Maps photos. All the ones visible are uploaded by named customers, so they belong to those customers.
  - *Not used:* listing photos of things not on the current menu (tiramisu latte collage, tres leches, chocolate strawberries) and one chain-folder interior that doesn't match Huboho.
- Preview locally with `python -m http.server 5175 --directory huboho`.
- **Motion:** first-visit logo intro (once per session); hero entrance (arch outline draws, sun rises, headline rises word by word); scroll reveals; arch-window photo reveals; menu cross-fades; wheel swings to today's sign and can be spun by drag/swipe; swaying lamps; dish-name ribbon. All motion is transform/opacity only and is switched off under `prefers-reduced-motion`. A safety net shows everything if the script fails.
- **Mobile:** full-screen menu sheet, header that hides on scroll-down, floating Call · Directions · Book bar (hidden over the booking form and footer), swipeable photo strip, swipeable photo viewer, a short open/closed status so the header fits at 360px.

---

## 7. Decisions & open items

**Decided (22 Sep 2026)**
- Phone: 095952 02161 for calls and WhatsApp.
- Closing time: 11:45 pm daily.
- Rule: **nothing goes on the site unless the café's own menu or listings say it.**
  - The tiramisu latte (a past seasonal item) has been removed.
  - Salami and sausage are shown as printed, with no chicken or pork claim.
  - "Nagpur's first" is not used.

**Still open**
1. Can the owner confirm that the 7 listing photos are theirs, and supply full-resolution originals?
2. Is the WhatsApp booking flow OK with the team, and does 095952 02161 have WhatsApp?
3. Typos on the printed menu that the site quietly corrects: "Cheesey" → Cheesy, "Arrabiata" → Arrabbiata, "Quatro" → Quattro, "Dooble Berry" → Double Berry. "Flamno Bhut" is left as-is in case it's intentional.
4. Domain: is huboho.in or huboho.cafe available?

## 8. Phase 2 ideas
- Owner-managed specials and seasonal "Volumes", added only when they're actually on the menu.
- An events feed from the "Huboho Invites" highlight.
- A Lush House ↔ Huboho shared loyalty stamp.
- Hindi and Marathi menu toggle.
