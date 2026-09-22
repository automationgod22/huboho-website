/*
  Huboho menu data — transcribed from the printed menu (Zomato menu photos, Sept 2026).
  Prices in ₹, taxes extra.

  t (type):  "v" veg ▼ · "c" chicken ● · "e" contains egg ■ · "vc" veg or chicken (two prices)
             "n" non-veg the printed menu doesn't mark (shown without a symbol, hidden in Pure veg)
             "u" two prices the printed menu doesn't label (shown as printed, no symbol)
  p (price): a number, or [veg, chicken] / [first, second] for two-price items
  nx:        on a "vc" item, the second option isn't marked as chicken on the printed menu
  vn:        name to show when "Pure veg" is on (for "vc" items whose name mentions chicken)
  s:         spice level (1 or 2 chillies)
*/

window.HUBOHO_FOOD = [
  {
    id: "appetizers", title: "Appetizers", note: "Starters and easy snacks",
    items: [
      { n: "Classic Fries / Peri Peri", d: "Crispy, golden and perfectly seasoned.", t: "v", p: [199, 229] },
      { n: "Cheese Max Fries", d: "Cheesy, indulgent and perfectly crispy.", t: "v", p: 279 },
      { n: "Onion Rings", d: "Golden, crispy and savoury.", t: "v", p: 249 },
      { n: "Chicken Popcorn", d: "Crispy, bite-sized chicken.", t: "c", p: 279 },
      { n: "Guac Nachos / with Chicken", vn: "Guac Nachos", d: "Crispy nachos under creamy, zesty guacamole.", t: "vc", p: [339, 359] }
    ]
  },
  {
    id: "asian-starters", title: "Asian Starters", note: "Inspired by Pan-Asian kitchens",
    items: [
      { n: "Honey Chilli Potatoes", d: "Tossed in a sweet and spicy honey chilli glaze.", t: "v", p: 289 },
      { n: "Paneer Teriyaki", d: "Grilled paneer glazed with sweet teriyaki.", t: "v", p: 319 },
      { n: "Chilli Garlic Paneer", d: "Spicy, savoury, with a chilli garlic kick.", t: "v", p: 319 },
      { n: "Honey Chilli Chicken", d: "Crispy chicken in a sweet and spicy glaze.", t: "c", p: 329 },
      { n: "Chicken Teriyaki", d: "Grilled chicken glazed with sweet teriyaki.", t: "c", p: 339 },
      { n: "Chilli Garlic Chicken", d: "Spicy, savoury, with a chilli garlic kick.", t: "c", p: 339 }
    ]
  },
  {
    id: "garlic-breads", title: "Boho Garlic Breads", note: "Serves 1",
    items: [
      { n: "Korean Cheesy Garlic Bread", d: "Soft, garlicky bread baked with cream cheese.", t: "v", p: 259 },
      { n: "Wood-fired Garlic Bread", d: "Rustic, with a crispy charred crust.", t: "v", p: 289 },
      { n: "Veggie Stuffed Garlic Bread", d: "Stuffed with fresh, flavourful veggies.", t: "v", p: 319 },
      { n: "Pepperoni Stuffed Garlic Bread", d: "Stuffed with spicy, savoury pepperoni.", t: "c", p: 369 }
    ]
  },
  {
    id: "sourdough", title: "Sourdough Toasts", note: "Serves 1",
    items: [
      { n: "Mushroom Cheese Sourdough", d: "Savoury mushrooms and melty cheese.", t: "v", p: 259 },
      { n: "Cream Cheese Bruschetta Sourdough", d: "Tangy cream cheese and fresh bruschetta.", t: "v", p: 259 },
      { n: "Avocado on Sourdough", d: "Creamy avocado on toasted sourdough.", t: "v", p: 279 },
      { n: "Avocado Sunny Side Sourdough", d: "Avocado topped with a sunny-side-up egg.", t: "e", p: 299 },
      { n: "Shakshouka with Sourdough", d: "Spiced tomato sauce with poached eggs.", t: "e", p: 299 }
    ]
  },
  {
    id: "baos", title: "Bohemian Baos", note: "3 pieces · serves 2",
    items: [
      { n: "Spicy Paneer Baos", d: "Steamed baos with spicy, flavourful paneer.", t: "v", p: 359, s: 1 },
      { n: "Pulled Chicken Baos", d: "Steamed baos with tender pulled chicken.", t: "c", p: 399, s: 1 }
    ]
  },
  {
    id: "dim-sums", title: "Dim Sums", note: "5 pieces · serves 2",
    items: [
      { n: "Mushroom Cheese Dim Sums", d: "Mushrooms and melted cheese.", t: "v", p: 459 },
      { n: "Chilli Garlic Dim Sums", d: "With a spicy chilli garlic kick.", t: "v", p: 459, s: 1 },
      { n: "Cheese Corn Dim Sums", d: "Cheese and sweet corn.", t: "v", p: 459 },
      { n: "Broccoli Water Chestnut Dim Sums", d: "Crunchy broccoli and water chestnut.", t: "v", p: 459 },
      { n: "Exotic Veg Dim Sums", d: "Filled with exotic veggies.", t: "v", p: 459 },
      { n: "Chicken Cheese Dim Sums", d: "Savoury chicken and melted cheese.", t: "c", p: 459 },
      { n: "Boho Assorted Dim Sum Basket", d: "A mixed basket of steamed veg dim sums, 8 pieces.", t: "v", p: 569 }
    ]
  },
  {
    id: "specials", title: "Huboho Specials", note: "Made only here",
    items: [
      { n: "Bohemian Mezze Platter", d: "An eclectic spread of dips, spreads and fresh bites.", t: "v", p: 569 },
      { n: "Khow Suey My Way", d: "Our twist on the classic Burmese noodle soup.", t: "v", p: 569 },
      { n: "55 Chinatown Sizzler / with Chicken", vn: "55 Chinatown Sizzler", d: "A sizzling Asian-fusion platter, named for our plot number.", t: "vc", p: [569, 589], s: 1 },
      { n: "Tex Mex Sizzler / with Chicken", vn: "Tex Mex Sizzler", d: "A sizzling Tex-Mex platter with vibrant flavours.", t: "vc", p: [569, 589], s: 1 }
    ]
  },
  {
    id: "sushi", title: "Sushi", note: "Serves 2",
    items: [
      { n: "Creamy Avocado Sushi", d: "Rolls filled with creamy, fresh avocado.", t: "v", p: 569 },
      { n: "Maki Mushroom Sushi", d: "Maki rolls with savoury mushrooms.", t: "v", p: 569 },
      { n: "Tempura Kale Sushi", d: "Rolls with crispy tempura kale.", t: "v", p: 569 },
      { n: "Tempura Asparagus Sushi", d: "Rolls with crispy tempura asparagus.", t: "v", p: 569 },
      { n: "Tempura Chicken Sushi", d: "Rolls with crispy tempura chicken.", t: "c", p: 569 },
      { n: "Tempura Smoke Chicken Sushi", d: "Rolls with crispy tempura smoked chicken.", t: "c", p: 569 }
    ]
  },
  {
    id: "ramen", title: "Soups & Ramen Bowls", note: "Serves 1",
    items: [
      { n: "Tomato Basil Soup", d: "Rich and tangy.", t: "v", p: 249 },
      { n: "Cream of Broccoli", d: "Velvety and smooth.", t: "v", p: 249 },
      { n: "Dumpling Ramen", d: "Flavourful broth with tender dumplings.", t: "u", p: [399, 429] },
      { n: "Kimchi Ramen", d: "Fiery ramen with kimchi and a savoury broth.", t: "u", p: [399, 429], s: 1 },
      { n: "Miso Mushroom Ramen", d: "Umami-rich, with miso and mushrooms.", t: "u", p: [399, 429] }
    ]
  },
  {
    id: "salads", title: "Salads", note: "Serves 1",
    items: [
      { n: "Caesar Salad / with Chicken", vn: "Caesar Salad", d: "Romaine, Caesar dressing, croutons and Parmesan.", t: "vc", p: [269, 289] },
      { n: "Greek Salad / with Chicken", vn: "Greek Salad", d: "Cucumber, tomato, olives, cottage cheese and a tangy dressing.", t: "vc", p: [269, 289] },
      { n: "Avocado Salad", d: "Creamy avocado and fresh vegetables.", t: "v", p: 329 },
      { n: "Peach Burrata Salad", d: "Juicy peaches, creamy burrata and a light vinaigrette.", t: "v", p: 349 },
      { n: "Mexican Salad", d: "A loaded bowl over tortilla chips.", t: "v", p: 329 }
    ]
  },
  {
    id: "pan-asian-mains", title: "Pan Asian Mains", note: "Serves 2",
    items: [
      { n: "Kung Pao Paneer / Chicken", vn: "Kung Pao Paneer", d: "In a tangy, spicy Kung Pao gravy.", t: "vc", p: [369, 389] },
      { n: "Thai Basil Paneer / Chicken", vn: "Thai Basil Paneer", d: "Stir-fried with fragrant Thai basil.", t: "vc", p: [369, 389], s: 1 },
      { n: "Red Thai Curry / Green Thai Curry", d: "Rich and aromatic, with vegetables.", t: "vc", p: [369, 389] }
    ]
  },
  {
    id: "noodles-rice", title: "Pan Asian Noodles & Rice", note: "Serves 2",
    items: [
      { n: "Hakka Noodles", d: "Stir-fried in a savoury Hakka sauce.", t: "vc", p: [309, 339] },
      { n: "Pad Thai Noodles", d: "Rice noodles with a nutty peanut sauce.", t: "vc", p: [349, 389] },
      { n: "Soupy Pan Fried Noodles", d: "Pan-fried noodles in a flavourful broth.", t: "vc", p: [439, 469] },
      { n: "Chilli Garlic Noodles", d: "Spicy, with chilli and garlic.", t: "vc", p: [319, 349], s: 1 },
      { n: "Classic Fried Rice", d: "Fried rice with vegetables.", t: "vc", p: [309, 339] },
      { n: "Kimchi Fried Rice", d: "Spicy and tangy, with kimchi.", t: "vc", p: [329, 359] },
      { n: "Burnt Garlic Rice", d: "With aromatic burnt garlic.", t: "vc", p: [319, 349] }
    ]
  },
  {
    id: "hokkaido", title: "Hokkaido Sandwiches", note: "Soft, fluffy Hokkaido milk bread",
    items: [
      { n: "Tomato BP / Sausage BP", vn: "Tomato BP", d: "Tomato or sausage, with bell pepper.", t: "vc", nx: true, p: [289, 299] },
      { n: "Pulled Paneer / Pulled Chicken", vn: "Pulled Paneer", d: "Spicy pulled filling.", t: "vc", p: [289, 299], s: 1 },
      { n: "Pesto Mushroom / Pesto Chicken", vn: "Pesto Mushroom", d: "With a flavourful pesto.", t: "vc", p: [289, 299] }
    ]
  },
  {
    id: "pastas", title: "Italian Pastas", note: "Rich, flavourful sauces",
    items: [
      { n: "Alfredo Pasta", d: "Creamy, with a rich cheesy sauce.", t: "u", p: [329, 359] },
      { n: "Arrabbiata Pasta", d: "Spicy and tangy tomato sauce.", t: "u", p: [329, 359] },
      { n: "Peppy Pink Pasta", d: "Creamy, tangy pink sauce with fresh herbs.", t: "u", p: [359, 389] },
      { n: "Pesto Pasta", d: "Tossed in fresh, vibrant pesto.", t: "u", p: [359, 389] },
      { n: "Mac & Cheese", d: "Classic, rich and creamy.", t: "u", p: [359, 389] },
      { n: "Spaghetti Aglio Olio", d: "Simple: garlic and olive oil.", t: "u", p: [329, 359] },
      { n: "Spaghetti Your Way", d: "Pick your sauce.", t: "u", p: [339, 369] }
    ]
  },
  {
    id: "burgers", title: "Burgers", note: "Veg or with chicken",
    items: [
      { n: "Vintage Burger", d: "Secret sauce, mustard & ketchup, caramelised onion.", t: "vc", p: [269, 289] },
      { n: "Chimichurri Burger", d: "Chimichurri mayo, chimichurri glaze, jalapeños.", t: "vc", p: [279, 299] },
      { n: "Boho Blaze", d: "Chipotle south-west, BBQ sauce, spice rub.", t: "vc", p: [279, 299], s: 1 },
      { n: "Morning California", d: "Roasted garlic sauce, olives.", t: "vc", p: [279, 299] },
      { n: "The Cowboy Burger", d: "Secret sauce, BBQ sauce, caramelised onions.", t: "vc", p: [279, 299] }
    ]
  },
  {
    id: "hotdogs", title: "Hotdogs", note: "Tender chicken hotdogs",
    items: [
      { n: "Classic American Hotdog", d: "Savoury toppings in a soft bun.", t: "c", p: 269 },
      { n: "South West Hotdog", d: "A spicy south-western twist.", t: "c", p: 269, s: 1 },
      { n: "Chimichurri Hotdog", d: "Topped with zesty chimichurri.", t: "c", p: 269 }
    ]
  },
  {
    id: "wheat", title: "Wheat Based", note: "Made with 100% wheat",
    items: [
      { n: "Quesadilla Veg / Chicken", vn: "Quesadilla", d: "Cheesy and grilled.", t: "vc", p: [299, 339] },
      { n: "Burrito Veg / Chicken", vn: "Burrito", d: "Flavour-packed and generously filled.", t: "vc", p: [319, 339] }
    ]
  },
  {
    id: "pizza-veg", title: "Wood-fired Pizzas · Veg", note: "Neapolitan-style, crisp and charred",
    items: [
      { n: "Margherita", d: "Fresh basil and mozzarella.", t: "v", p: 379 },
      { n: "Desi Veggie", d: "Spicy, flavourful Indian vegetables.", t: "v", p: 419 },
      { n: "Blanco", d: "White pizza: creamy cheese, garlic and mushroom.", t: "v", p: 419 },
      { n: "Honolulu", d: "Hawaiian-style, with veggies and pineapple.", t: "v", p: 449 },
      { n: "Flamno Bhut", d: "Topped with fiery Bhut Jolokia peppers.", t: "v", p: 439, s: 2 },
      { n: "Quattro Formaggi", d: "A rich, creamy four-cheese blend.", t: "v", p: 459 },
      { n: "Veg Buffalo", d: "Tangy buffalo sauce and fresh toppings.", t: "v", p: 449 },
      { n: "Delhi-6 Veg", d: "Makhani sauce with gourmet veg toppings.", t: "v", p: 449 }
    ]
  },
  {
    id: "pizza-chicken", title: "Wood-fired Pizzas · Chicken", note: "Neapolitan-style, crisp and charred",
    items: [
      { n: "Chicken Makhani", d: "Makhani sauce with chicken tikka.", t: "c", p: 489 },
      { n: "The Prax", d: "Exotic chicken and marinara.", t: "c", p: 489 },
      { n: "Bae-route", d: "Middle Eastern-inspired toppings.", t: "c", p: 489 },
      { n: "Pepperoni", d: "Savoury chicken pepperoni.", t: "c", p: 529 },
      { n: "Smoked Chicken", d: "Flavourful smoked chicken.", t: "c", p: 549 },
      { n: "Hawaiian Chicken", d: "Chicken and pineapple.", t: "c", p: 549 }
    ]
  },
  {
    id: "pizza-addons", title: "Pizza Add-ons", note: "Make it yours",
    items: [
      { n: "Cheese Burst", d: "An extra layer of melted cheese.", t: "v", p: 119 },
      { n: "Burrata Cheese", d: "A creamy, indulgent finish.", t: "v", p: 219 },
      { n: "Mushrooms / Sweet Corn", d: "", t: "v", p: 30 },
      { n: "Olives / Jalapeños / Paprika", d: "", t: "v", p: 30 },
      { n: "Paneer / Broccoli / Bell Pepper / Zucchini", d: "", t: "v", p: 40 },
      { n: "Salami / Sausages / Chicken Tikka / Pepperoni", d: "", t: "n", p: 80 }
    ]
  },
  {
    id: "desserts", title: "Desserts", note: "For the sweet tooth",
    items: [
      { n: "Burnt Basque Cheesecake", d: "Rich and creamy, with a caramelised top.", t: "e", p: 289 },
      { n: "Fudgy Brownie", d: "Decadent, with a gooey centre.", t: "e", p: 189 },
      { n: "Chocolate Truffle", d: "Pastry filled with smooth chocolate truffle.", t: "v", p: 259 },
      { n: "Nutella Berry Croissant", d: "Flaky, with Nutella and fresh berries.", t: "v", p: 229 },
      { n: "Supreme Croissant", d: "Flaky, with a rich blend of fillings.", t: "v", p: 229 },
      { n: "Butter Croissant", d: "Classic and flaky.", t: "v", p: 179 },
      { n: "French Toast", d: "Golden, crisp and buttery.", t: "e", p: 249 },
      { n: "Pancakes with Syrup", d: "Chocolate, honey or maple.", t: "e", p: 289 },
      { n: "Nutella Berry Pancake", d: "Topped with Nutella and berries.", t: "e", p: 329 },
      { n: "Lotus Biscoff Pancake", d: "Biscoff spread and crumbles.", t: "e", p: 329 }
    ]
  }
];

/* Drinks keep the four colours of the printed drinks menu */
window.HUBOHO_DRINKS = [
  {
    id: "cold-milk", title: "Cold with milk", tone: "sky",
    items: [
      { n: "Brown Bunny", d: "Espresso, creamy cold-frothed milk, a hint of chocolate.", p: 199 },
      { n: "Hazelbomb", d: "Double shot, hazelnut and rich cold-frothed milk.", p: 199 },
      { n: "Mango Matcha", d: "Juicy mango meets creamy matcha. A tropical green dream.", p: 259 },
      { n: "Coconut Cloud Matcha", d: "Ceremonial AA matcha under silky coconut foam.", p: 259 },
      { n: "Irishman", d: "Double shot, Irish flavour, dairy-free cream.", p: 229 },
      { n: "Bahamas", d: "House-made butter cream jam with a double shot.", p: 199 },
      { n: "Flamingo Matcha", d: "Ceremonial matcha with a flamingo-pink cold foam.", p: 249 },
      { n: "Iced Latte", d: "Single shot, milk, a hint of sweetness.", p: 199 },
      { n: "Creamy Matcha Latte", d: "Smooth matcha, sweetened just right, over ice.", p: 199 }
    ]
  },
  {
    id: "hot-coffee", title: "Hot coffee with milk", tone: "butter",
    items: [
      { n: "Hazelnut Cappuccino", d: "Double shot, steamed milk and hazelnut.", p: 189 },
      { n: "Pumpkin Spice", d: "Double shot, pumpkin and a hint of cinnamon.", p: 189 },
      { n: "Irish Cappuccino", d: "Double shot with rich Irish cream.", p: 189 },
      { n: "Latte", d: "Single shot, more milk, thin microfoam.", p: 179 },
      { n: "Flat White", d: "Ristretto, steamed milk, a thin layer of microfoam.", p: 179 },
      { n: "Cappuccino", d: "Double shot, steamed milk, thick foam.", p: 169 },
      { n: "Americano", d: "Hot water and a fresh double shot.", p: 139 },
      { n: "Nutella Hot Chocolate", d: "Hot chocolate blended with creamy Nutella.", p: 239, sub: "Hot chocolate" },
      { n: "Italian Hot Chocolate", d: "Thick, velvety, Italian-style.", p: 199, sub: "Hot chocolate" }
    ]
  },
  {
    id: "cold-espresso", title: "Cold espresso", tone: "sage",
    items: [
      { n: "Wake Me Up", d: "Ristretto over Red Bull and a secret blend. For coffee maniacs.", p: 239 },
      { n: "Espresso Tonic", d: "Bittersweet tonic topped with a double shot.", p: 199 },
      { n: "Jazz Brew", d: "Ristretto poured over berry sparkling water.", p: 199 },
      { n: "Iced Americano", d: "Iced water and a rich double shot.", p: 149 },
      { n: "Manual Brews", d: "For pure craft. Ask your barista about today's roasts.", p: null }
    ]
  },
  {
    id: "refreshers", title: "Refreshers, shakes & teas", tone: "lilac",
    items: [
      { n: "Hurricane", d: "Tangy raw mango, bubbly, a little sweet.", p: 209 },
      { n: "Jamun Cooler", d: "", p: 209 },
      { n: "Double Berry Smash", d: "", p: 209 },
      { n: "Cuban Guava", d: "", p: 209 },
      { n: "Peach Iced Tea", d: "", p: 199 },
      { n: "Bohemian 22 Iced Tea", d: "", p: 199 },
      { n: "Virgin Mojito", d: "", p: 189 },
      { n: "Lemon Iced Tea", d: "", p: 189 },
      { n: "Mango Shake", d: "", p: 199, sub: "Shakes" },
      { n: "Guava Shake", d: "", p: 199, sub: "Shakes" },
      { n: "Blueberry Shake", d: "", p: 199, sub: "Shakes" },
      { n: "Strawberry Shake", d: "", p: 199, sub: "Shakes" },
      { n: "Chocolate Shake", d: "", p: 199, sub: "Shakes" },
      { n: "Brownie Shake", d: "", p: 199, sub: "Shakes" },
      { n: "Green Tea", d: "", p: 199, sub: "Teas" },
      { n: "Hibiscus, hot or iced", d: "", p: 199, sub: "Teas" },
      { n: "Honey Ginger Tea", d: "", p: 199, sub: "Teas" },
      { n: "Chamomile", d: "", p: 199, sub: "Teas" }
    ]
  }
];

/* Google review topics — how many reviews mention each (Sept 2026) */
window.HUBOHO_MENTIONS = [
  { topic: "Polite staff", count: 39, line: "The people who bring it all to your table", link: "#visit" },
  { topic: "Sushi", count: 28, line: "Tempura Smoke Chicken or Creamy Avocado · ₹569", link: "#cat-sushi" },
  { topic: "Ramen", count: 19, line: "Dumpling, Kimchi or Miso Mushroom · from ₹399", link: "#cat-ramen" },
  { topic: "Dim sum", count: 9, line: "Six fillings, 5 pieces · ₹459, or the mixed basket", link: "#cat-dim-sums" },
  { topic: "Mango matcha", count: 8, line: "The tropical green one · ₹259", link: "#drink-cold-milk" },
  { topic: "Outdoor seating", count: 6, line: "The verandah under the bamboo ceiling", link: "#space" },
  { topic: "Kimchi ramen", count: 5, line: "Fiery, with a savoury broth · ₹399", link: "#cat-ramen" }
];

/*
  Zodiac readings: one dish + one drink from the real menu.
  veg: swap used when "Pure veg" is on and the dish has chicken or egg.
*/
window.HUBOHO_ZODIAC = [
  { sign: "Aries", dates: "21 Mar – 19 Apr", from: [3, 21],
    dish: { n: "Flamno Bhut pizza", p: 439 }, drink: { n: "Wake Me Up", p: 239 },
    reading: "You came for inner peace. You're leaving with Bhut Jolokia. Classic Aries." },
  { sign: "Taurus", dates: "20 Apr – 20 May", from: [4, 20],
    dish: { n: "Burnt Basque Cheesecake", p: 289, t: "e" }, veg: { n: "Chocolate Truffle", p: 259 }, drink: { n: "Brown Bunny", p: 199 },
    reading: "Comfort is your love language. Take the long way through dessert." },
  { sign: "Gemini", dates: "21 May – 20 Jun", from: [5, 21],
    dish: { n: "Bohemian Mezze Platter", p: 569 }, drink: { n: "Mango Matcha", p: 259 },
    reading: "Two moods, one glass. And a platter, so you never have to pick." },
  { sign: "Cancer", dates: "21 Jun – 22 Jul", from: [6, 21],
    dish: { n: "Dumpling Ramen", p: 399 }, drink: { n: "Italian Hot Chocolate", p: 199 },
    reading: "Ruled by the moon, soothed by broth. A bowl that feels like home." },
  { sign: "Leo", dates: "23 Jul – 22 Aug", from: [7, 23],
    dish: { n: "Boho Blaze burger", p: 279 }, drink: { n: "Flamingo Matcha", p: 249 },
    reading: "Pink drink, loud burger, best seat on the verandah. Obviously." },
  { sign: "Virgo", dates: "23 Aug – 22 Sep", from: [8, 23],
    dish: { n: "Avocado Sunny Side Sourdough", p: 299, t: "e" }, veg: { n: "Avocado on Sourdough", p: 279 }, drink: { n: "Flat White", p: 179 },
    reading: "Neat, balanced, precisely made. You'll notice the microfoam." },
  { sign: "Libra", dates: "23 Sep – 22 Oct", from: [9, 23],
    dish: { n: "Peach Burrata Salad", p: 349 }, drink: { n: "Bahamas", p: 199 },
    reading: "Pretty on the plate, balanced on the palate. Very you." },
  { sign: "Scorpio", dates: "23 Oct – 21 Nov", from: [10, 23],
    dish: { n: "Kimchi Ramen", p: 399 }, drink: { n: "Espresso Tonic", p: 199 },
    reading: "Fiery, fermented, a little bittersweet. You wouldn't have it any other way." },
  { sign: "Sagittarius", dates: "22 Nov – 21 Dec", from: [11, 22],
    dish: { n: "Bae-route pizza", p: 489, t: "c" }, veg: { n: "Honolulu pizza", p: 449 }, drink: { n: "Cuban Guava", p: 209 },
    reading: "Beirut on a pizza, Havana in a glass. No passport needed." },
  { sign: "Capricorn", dates: "22 Dec – 19 Jan", from: [12, 22],
    dish: { n: "Margherita", p: 379 }, drink: { n: "Americano", p: 139 },
    reading: "The classics, done properly. No notes." },
  { sign: "Aquarius", dates: "20 Jan – 18 Feb", from: [1, 20],
    dish: { n: "Khow Suey My Way", p: 569 }, drink: { n: "Coconut Cloud Matcha", p: 259 },
    reading: "It's literally called My Way. Of course it's yours." },
  { sign: "Pisces", dates: "19 Feb – 20 Mar", from: [2, 19],
    dish: { n: "Tempura Smoke Chicken Sushi", p: 569, t: "c" }, veg: { n: "Creamy Avocado Sushi", p: 569 }, drink: { n: "Chamomile", p: 199 },
    reading: "Something from the sea side of the menu, and something to dream on." }
];
