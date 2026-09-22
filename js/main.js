(function () {
  "use strict";
  window.__huboho = true; // tells the head script the page came alive

  const FOOD = window.HUBOHO_FOOD;
  const DRINKS = window.HUBOHO_DRINKS;
  const MENTIONS = window.HUBOHO_MENTIONS;
  const ZODIAC = window.HUBOHO_ZODIAC;

  const PHONE_WA = "919595202161";
  const OPEN_MIN = 11 * 60;        // 11:00 am
  const CLOSE_MIN = 23 * 60 + 45;  // 11:45 pm

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;

  const store = {
    get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rupee = (n) => "₹" + n;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* Nagpur time, whatever the visitor's clock says */
  function istNow() {
    const d = new Date();
    return new Date(d.getTime() + d.getTimezoneOffset() * 60000 + 330 * 60000);
  }
  const pad = (n) => String(n).padStart(2, "0");
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  function fmtTime(min) {
    const h = Math.floor(min / 60), m = min % 60;
    const h12 = ((h + 11) % 12) + 1;
    return `${h12}:${pad(m)} ${h < 12 ? "am" : "pm"}`;
  }

  /* =========================================================
     Motion: word splitting, scroll reveals, hero entrance
     ========================================================= */
  function splitWords(el) {
    let i = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span");
            w.className = "w";
            const inner = document.createElement("span");
            inner.style.setProperty("--i", i++);
            inner.textContent = part;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== "BR") {
          walk(child);
        }
      });
    };
    walk(el);
    el.classList.add("split");
  }

  let revealObserver = null;
  function initReveals() {
    $$("[data-split]").forEach(splitWords);
    const targets = $$("[data-reveal], [data-split]:not(#hero-title)");
    if (reduceMotion || !hasIO) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        revealObserver.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    targets.forEach((el) => revealObserver.observe(el));

    // Fallback: if the observer hasn't fired (some embedded or headless views), show what's on screen
    setTimeout(() => {
      $$("[data-reveal], [data-split], .loved-list li").forEach((el) => {
        if (!el.classList.contains("is-in") && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-in");
          revealObserver.unobserve(el);
        }
      });
    }, 2800);
  }

  /* The ribbon loops by sliding half its width, so it needs two copies */
  function initRibbon() {
    const track = $(".ribbon-track");
    if (track) track.innerHTML += track.innerHTML;
  }

  function startHero() {
    const hero = $("#hero");
    const go = () => { hero.classList.add("is-in"); $("#hero-title").classList.add("is-in"); };
    if (reduceMotion) { go(); return; }
    if (root.classList.contains("intro")) {
      setTimeout(go, 1500); // as the intro curtain lifts
      setTimeout(() => root.classList.remove("intro"), 2400);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(go));
    }
  }

  /* =========================================================
     Header: hide on scroll down, show on scroll up; progress bar;
     hero parallax; mobile action bar
     ========================================================= */
  function initScrollEffects() {
    const header = $("#header");
    const progress = $(".progress");
    const hero = $("#hero");
    const heroCopy = $(".hero-copy");
    const heroArch = $(".hero-arch");
    const bar = $("#mobile-bar");
    let lastY = window.scrollY, ticking = false, visitInView = false, footerInView = false;

    if (hasIO) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.target.id === "book") visitInView = en.isIntersecting;
          else footerInView = en.isIntersecting;
        });
        update();
      }, { threshold: 0.05 });
      io.observe($("#book"));
      io.observe($(".site-footer"));
    }

    function update() {
      ticking = false;
      // read everything first, then write, so the browser lays out once
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const heroH = hero.offsetHeight;
      progress.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);

      header.classList.toggle("is-scrolled", y > 8);
      const navOpen = root.classList.contains("nav-open");
      const delta = y - lastY;
      if (!navOpen && y > 180 && delta > 6 && !header.contains(document.activeElement)) {
        header.classList.add("is-hidden"); root.classList.add("hdr-hidden");
      } else if (delta < -6 || y < 180) {
        header.classList.remove("is-hidden"); root.classList.remove("hdr-hidden");
      }
      lastY = y;

      if (!reduceMotion && y < heroH * 1.1) {
        const hp = clamp(y / heroH, 0, 1);
        heroCopy.style.transform = `translate3d(0, ${(-hp * 70).toFixed(1)}px, 0)`;
        heroCopy.style.opacity = (1 - hp * 1.1).toFixed(3);
        heroArch.style.transform = `translate3d(0, ${(hp * 60).toFixed(1)}px, 0)`;
      }

      bar.classList.toggle("is-shown", y > heroH * 0.6 && !visitInView && !footerInView);
    }
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", () => requestAnimationFrame(update));
    update();
  }

  /* ---------------- navigation ---------------- */
  function initNav() {
    const toggle = $(".nav-toggle");
    const nav = $("#site-nav");
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      nav.classList.toggle("is-open", open);
      root.classList.toggle("nav-open", open);
      if (open) { $("#header").classList.remove("is-hidden"); root.classList.remove("hdr-hidden"); }
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 761px)").addEventListener("change", (m) => { if (m.matches) setOpen(false); });
  }

  function updateStatus() {
    const el = $("#open-status");
    const now = istNow();
    const min = now.getHours() * 60 + now.getMinutes();
    let text, short, open = false;
    if (min >= OPEN_MIN && min < CLOSE_MIN) {
      open = true;
      text = CLOSE_MIN - min <= 45 ? "Open · closing at 11:45 pm" : "Open now · till 11:45 pm";
      short = CLOSE_MIN - min <= 45 ? "Closing soon" : "Open now";
    } else if (min < OPEN_MIN) {
      text = "Closed · opens 11 am today";
      short = "Opens 11 am";
    } else {
      text = "Closed · opens 11 am tomorrow";
      short = "Opens 11 am";
    }
    el.classList.toggle("is-open", open);
    el.setAttribute("aria-label", text);
    // phones get the short version so the header fits
    $(".status-text", el).innerHTML = `<span class="st-long">${text}</span><span class="st-short" aria-hidden="true">${short}</span>`;
  }

  /* ---------------- hero art ---------------- */
  function drawRays() {
    const g = $(".arch-art .rays");
    if (!g) return;
    let out = "";
    for (let a = 0; a < 360; a += 7.5) {
      const r = (a * Math.PI) / 180;
      out += `<line x1="210" y1="560" x2="${(210 + 720 * Math.sin(r)).toFixed(1)}" y2="${(560 - 720 * Math.cos(r)).toFixed(1)}"/>`;
    }
    g.innerHTML = out;
  }

  /* ---------------- photo strip (mobile scroll indicator) ---------------- */
  function initWindowTrack() {
    const row = $("#window-row");
    const thumb = $(".win-track span");
    const update = () => {
      const tw = row.clientWidth / row.scrollWidth;
      thumb.style.setProperty("--tw", (tw * 100).toFixed(2) + "%");
      thumb.style.setProperty("--tx", ((row.scrollLeft / row.scrollWidth) / tw * 100).toFixed(2) + "%");
    };
    row.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------------- most mentioned ---------------- */
  function renderMentions() {
    const max = Math.max(...MENTIONS.map((m) => m.count));
    const list = $("#loved-list");
    list.innerHTML = MENTIONS.map((m, i) => `
      <li data-count="${m.count}" style="--d:${(i * 0.07).toFixed(2)}s">
        <a href="${m.link}">
          <span class="loved-count">${m.count}</span>
          <span><span class="loved-topic">${esc(m.topic)}</span><span class="loved-line">${esc(m.line)}</span></span>
          <span class="loved-bar" style="--w:${Math.round((m.count / max) * 100)}%" role="img" aria-label="${m.count} reviews"></span>
        </a>
      </li>`).join("");

    if (reduceMotion || !hasIO) { $$("li", list).forEach((li) => li.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const li = en.target;
        li.classList.add("is-in");
        io.unobserve(li);
        const out = $(".loved-count", li), target = +li.dataset.count;
        const delay = parseFloat(li.style.getPropertyValue("--d")) * 1000 || 0;
        const t0 = performance.now() + delay;
        out.textContent = "0";
        const tick = (t) => {
          const p = clamp((t - t0) / 1100, 0, 1);
          out.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        // land on the real number even if animation frames get paused (background tab)
        setTimeout(() => { out.textContent = target; }, delay + 1300);
      });
    }, { threshold: 0.4 });
    $$("li", list).forEach((li) => io.observe(li));
  }

  /* =========================================================
     Menu
     ========================================================= */
  const state = {
    tab: "food",
    q: "",
    veg: store.get("huboho-veg") === "1",
    spicy: false
  };

  const MARK = {
    v: '<span class="mk mk-v" aria-label="vegetarian">▼</span>',
    c: '<span class="mk mk-c" aria-label="chicken">●</span>',
    e: '<span class="mk mk-e" aria-label="contains egg">■</span>'
  };
  const CHILLI = '<svg class="mk-chilli" aria-hidden="true"><use href="#i-chilli"/></svg>';

  function highlight(text, q) {
    const safe = esc(text);
    if (!q) return safe;
    const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
    return safe.replace(re, "<mark>$1</mark>");
  }

  function foodMatches(item, cat) {
    if (state.veg && !(item.t === "v" || item.t === "vc" || item.t === "u")) return false;
    if (state.spicy && !item.s) return false;
    if (!state.q) return true;
    const hay = `${item.n} ${item.vn || ""} ${item.d} ${cat.title}`.toLowerCase();
    return hay.includes(state.q);
  }
  function drinkMatches(item, block) {
    if (!state.q) return true;
    return `${item.n} ${item.d} ${block.title} ${item.sub || ""}`.toLowerCase().includes(state.q);
  }

  function priceHTML(item) {
    if (!Array.isArray(item.p)) return rupee(item.p);
    if (item.t === "vc") {
      if (state.veg) return rupee(item.p[0]);
      if (!item.nx) return `${rupee(item.p[0])}<small class="with-chicken">${MARK.c}${rupee(item.p[1])}</small>`;
    }
    return `${rupee(item.p[0])} <small>/ ${rupee(item.p[1])}</small>`;
  }

  function itemHTML(item) {
    const name = state.veg && item.vn ? item.vn : item.n;
    // "n" and "u" items carry no symbol on the printed menu, so none here either
    const mark = item.t === "vc" ? MARK.v : (MARK[item.t] || '<span class="mk" aria-hidden="true"></span>');
    const chillies = item.s ? `<span aria-label="${item.s === 2 ? "very spicy" : "spicy"}">${CHILLI.repeat(item.s)}</span>` : "";
    return `
      <li class="item">
        ${mark}
        <span class="item-name">${highlight(name, state.q)}${chillies}</span>
        <span class="item-price">${priceHTML(item)}</span>
        ${item.d ? `<span class="item-desc">${highlight(item.d, state.q)}</span>` : ""}
      </li>`;
  }

  const WATERMARKS = {
    "garlic-breads": () => miniWheel(),
    "dim-sums": () => `<svg class="cat-watermark" viewBox="0 0 100 120" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 118V50a42 42 0 0 1 84 0v68"/>${Array.from({ length: 13 }, (_, i) => { const a = (-90 + i * 15) * Math.PI / 180; return `<line x1="50" y1="112" x2="${(50 + 70 * Math.cos(a)).toFixed(1)}" y2="${(112 + 70 * Math.sin(a)).toFixed(1)}"/>`; }).join("")}<circle cx="50" cy="112" r="16" fill="#F6EEDB"/></g></svg>`,
    ramen: () => `<svg class="cat-watermark" viewBox="0 0 100 100" aria-hidden="true"><use href="#i-moon" x="8" y="10" width="48" height="48"/><use href="#i-sparkle" x="62" y="46" width="22" height="22"/><use href="#i-sparkle" x="40" y="70" width="14" height="14"/></svg>`,
    specials: () => `<svg class="cat-watermark" viewBox="0 0 100 100" aria-hidden="true"><use href="#i-sparkle" x="30" y="16" width="44" height="44"/><use href="#i-sparkle" x="12" y="62" width="16" height="16"/><use href="#i-sparkle" x="74" y="66" width="12" height="12"/></svg>`,
    desserts: () => `<svg class="cat-watermark" viewBox="0 0 100 100" aria-hidden="true"><use href="#i-moon" x="46" y="8" width="36" height="36"/><use href="#i-sparkle" x="16" y="40" width="26" height="26"/></svg>`
  };

  function renderFood() {
    let count = 0;
    const html = FOOD.map((cat) => {
      const items = cat.items.filter((it) => foodMatches(it, cat));
      count += items.length;
      if (!items.length) return "";
      const wm = WATERMARKS[cat.id] ? WATERMARKS[cat.id]() : "";
      return `
        <section class="cat" id="cat-${cat.id}" data-rail="${esc(cat.title)}">
          ${wm}
          <h3 class="cat-title">${esc(cat.title)}</h3>
          <p class="cat-note">${esc(cat.note)}</p>
          <ul class="items">${items.map(itemHTML).join("")}</ul>
        </section>`;
    }).join("");
    $("#panel-food").innerHTML = html;
    return count;
  }

  function renderDrinks() {
    let count = 0;
    const blocks = {};
    DRINKS.forEach((block) => { // same order as the printed drinks menu
      const items = block.items.filter((it) => drinkMatches(it, block));
      count += items.length;
      if (!items.length) { blocks[block.id] = ""; return; }
      let lastSub = null;
      const list = items.map((it) => {
        let sub = "";
        if (it.sub && it.sub !== lastSub) { sub = `<li class="drink-sub">${esc(it.sub)}</li>`; lastSub = it.sub; }
        return `${sub}
          <li>
            <div class="drink-row"><span class="drink-name">${highlight(it.n, state.q)}</span><span class="drink-price">${it.p ? it.p : "Ask"}</span></div>
            ${it.d ? `<p class="drink-desc">${highlight(it.d, state.q)}</p>` : ""}
          </li>`;
      }).join("");
      blocks[block.id] = `
        <section class="drink-block" id="drink-${block.id}" data-tone="${block.tone}" data-rail="${esc(block.title)}">
          <svg class="logo" viewBox="0 0 64 104" aria-hidden="true"><rect x="2" y="2" width="60" height="100" rx="30" fill="none" stroke="currentColor" stroke-width="2"/><g font-family="Marcellus, serif" font-size="18" text-anchor="middle" fill="currentColor"><text x="32" y="40">HU</text><text x="32" y="62">BO</text><text x="32" y="84">HO</text></g></svg>
          <ul class="drink-items">${list}</ul>
          <h3 class="drink-title">${esc(block.title)}</h3>
        </section>`;
    });
    $("#panel-drinks").innerHTML = DRINKS.map((b) => blocks[b.id]).join("");
    return count;
  }

  let railObserver = null;
  function renderRail() {
    const rail = $("#cat-rail");
    const panel = state.tab === "food" ? $("#panel-food") : $("#panel-drinks");
    const sections = $$("[data-rail]", panel);
    rail.innerHTML = sections.map((s) =>
      `<a href="#${s.id}" data-tone="${s.dataset.tone || ""}">${esc(s.dataset.rail)}</a>`).join("");

    if (railObserver) railObserver.disconnect();
    if (!hasIO || !sections.length) return;
    railObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        $$("a", rail).forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
        const chip = $(`a[href="#${en.target.id}"]`, rail);
        if (chip) rail.scrollTo({ left: chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }, { rootMargin: "-140px 0px -65% 0px" });
    sections.forEach((s) => railObserver.observe(s));
  }

  function renderMenu() {
    const foodCount = renderFood();
    const drinkCount = renderDrinks();
    const empty = $("#menu-empty");
    const here = state.tab === "food" ? foodCount : drinkCount;
    const there = state.tab === "food" ? drinkCount : foodCount;
    const otherTab = state.tab === "food" ? "drinks" : "food";

    if (here === 0) {
      const what = state.q ? `“${esc(state.q)}”` : "those filters";
      let msg = `Nothing on the ${state.tab} menu matches ${what}.`;
      if (state.q && there > 0) {
        msg += ` <button type="button" data-go-tab="${otherTab}">Show ${there} in ${otherTab}</button>`;
      } else {
        msg += ` Try <button type="button" data-try="ramen">ramen</button>, <button type="button" data-try="paneer">paneer</button> or <button type="button" data-try="matcha">matcha</button>, or <button type="button" data-clear>clear the filters</button>.`;
      }
      empty.innerHTML = msg;
      empty.hidden = false;
    } else {
      empty.hidden = true;
    }
    renderRail();
  }

  /* Soft cross-fade for user-driven menu changes */
  let swapTimer = null;
  function withFade(fn) {
    if (reduceMotion) { fn(); return; }
    const panels = $$(".panel");
    panels.forEach((p) => p.classList.add("is-swapping"));
    clearTimeout(swapTimer);
    swapTimer = setTimeout(() => {
      fn();
      requestAnimationFrame(() => panels.forEach((p) => p.classList.remove("is-swapping")));
    }, 200);
  }

  function setTab(tab, opts = {}) {
    const apply = () => {
      state.tab = tab;
      const isFood = tab === "food";
      $(".tabs").dataset.active = tab;
      $("#tab-food").setAttribute("aria-selected", String(isFood));
      $("#tab-drinks").setAttribute("aria-selected", String(!isFood));
      $("#tab-food").tabIndex = isFood ? 0 : -1;
      $("#tab-drinks").tabIndex = isFood ? -1 : 0;
      $("#panel-food").hidden = !isFood;
      $("#panel-drinks").hidden = isFood;
      $(".filters").classList.toggle("is-hidden", !isFood);
      $("#menu .legend-bar").hidden = !isFood; // every drink is veg
      $(".menu-sheet").classList.toggle("no-legend", !isFood);
      renderMenu();
      if (opts.focus) (isFood ? $("#tab-food") : $("#tab-drinks")).focus();
    };
    if (opts.animate) withFade(apply); else apply();
  }

  function setVeg(on, opts = {}) {
    state.veg = on;
    store.set("huboho-veg", on ? "1" : "0");
    $("#filter-veg").setAttribute("aria-pressed", String(on));
    $("#stars-veg").checked = on;
    if (opts.animate) withFade(renderMenu); else renderMenu();
    renderReading(true);
  }

  function clearFilters() {
    state.q = "";
    state.spicy = false;
    $("#menu-search").value = "";
    $("#filter-spicy").setAttribute("aria-pressed", "false");
    if (state.veg) setVeg(false, { animate: true }); else withFade(renderMenu);
  }

  function initMenu() {
    $("#filter-veg").setAttribute("aria-pressed", String(state.veg));
    $("#stars-veg").checked = state.veg;
    $(".tabs").dataset.active = "food";

    $("#tab-food").addEventListener("click", () => { if (state.tab !== "food") setTab("food", { animate: true }); });
    $("#tab-drinks").addEventListener("click", () => { if (state.tab !== "drinks") setTab("drinks", { animate: true }); });
    $(".tabs").addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        setTab(state.tab === "food" ? "drinks" : "food", { focus: true, animate: true });
      }
    });

    let t;
    $("#menu-search").addEventListener("input", (e) => {
      clearTimeout(t);
      t = setTimeout(() => { state.q = e.target.value.trim().toLowerCase(); renderMenu(); }, 120);
    });
    $("#menu-search").addEventListener("keydown", (e) => { if (e.key === "Enter") e.target.blur(); });
    $("#filter-veg").addEventListener("click", () => setVeg(!state.veg, { animate: true }));
    $("#filter-spicy").addEventListener("click", (e) => {
      state.spicy = !state.spicy;
      e.currentTarget.setAttribute("aria-pressed", String(state.spicy));
      withFade(renderMenu);
    });
    $("#menu-empty").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.goTab) setTab(b.dataset.goTab, { animate: true });
      if (b.dataset.try) { $("#menu-search").value = b.dataset.try; state.q = b.dataset.try; state.spicy = false; $("#filter-spicy").setAttribute("aria-pressed", "false"); renderMenu(); }
      if ("clear" in b.dataset) clearFilters();
    });

    renderMenu();
  }

  /* Links like #cat-sushi or #drink-cold-milk: open the right tab first */
  function initDeepLinks() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const isFood = id.startsWith("cat-");
      const isDrink = id.startsWith("drink-");
      if (!isFood && !isDrink) return;
      let el = document.getElementById(id);
      if (el && !el.closest("[hidden]")) return; // already visible: let the browser scroll
      e.preventDefault();
      if (state.q || state.spicy) { state.q = ""; state.spicy = false; $("#menu-search").value = ""; $("#filter-spicy").setAttribute("aria-pressed", "false"); }
      if (isFood && state.veg && !document.getElementById(id)) setVeg(false);
      setTab(isFood ? "food" : "drinks");
      el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  }

  /* =========================================================
     Horoscope wheel
     ========================================================= */
  const GLYPHS = {
    Aries: "M12 21V10.5C12 6.5 9.6 4 7.2 4.6 5 5.2 4.6 8.3 6.6 9.6M12 10.5C12 6.5 14.4 4 16.8 4.6 19 5.2 19.4 8.3 17.4 9.6",
    Taurus: "M4.5 4c1 3.6 3.8 5.6 7.5 5.6S18.5 7.6 19.5 4M6.8 14.8a5.2 5.2 0 1 0 10.4 0a5.2 5.2 0 1 0-10.4 0",
    Gemini: "M5 4.5c4.5 1.6 9.5 1.6 14 0M5 19.5c4.5-1.6 9.5-1.6 14 0M9 5.6v12.8M15 5.6v12.8",
    Cancer: "M4.6 9a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0-4.8 0M7 6.6C11 4.6 16.5 5 19.6 8.6M14.6 15a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0-4.8 0M17 17.4C13 19.4 7.5 19 4.4 15.4",
    Leo: "M4.8 15.8a3 3 0 1 0 6 0a3 3 0 1 0-6 0M10.8 15.8C10.8 12.5 8.6 10.6 8.6 7.8A4.3 4.3 0 0 1 17.2 7.8c0 3-2.4 4.8-2.4 8.2 0 2.1 1.3 3.3 3.4 3",
    Virgo: "M4 7.5V18M4 9.8c0-3 4.2-3 4.2 0V18M8.2 9.8c0-3 4.2-3 4.2 0V16.5M12.4 12.8c1-3.4 6.4-3.2 6 .6-.3 2.8-3.4 5.1-7.6 6.6",
    Libra: "M4 19.5h16M4 15.5h4.3a5.4 5.4 0 1 1 7.4 0H20",
    Scorpio: "M3.5 7.5V17M3.5 9.6c0-2.9 4-2.9 4 0V17M7.5 9.6c0-2.9 4-2.9 4 0v7.2c0 1.8 1.2 2.7 2.8 2.7h5.2M17.4 16.9l2.6 2.6-2.6 2.6",
    Sagittarius: "M5 19L19 5M12.5 5H19v6.5M7.5 11.5l5 5",
    Capricorn: "M3.5 6.5 7 17.5 10 7.5c.8-2 3-2 3.6 0l.4 1.5V16c0 2.2 1.4 3.5 3.3 3.5 1.9 0 3.2-1.5 3.1-3.3-.1-1.9-1.8-3-3.6-2.5-1.4.4-2.4 1.6-2.8 3.3",
    Aquarius: "M3 10.5l3-3 3 3 3-3 3 3 3-3 3 3M3 16.5l3-3 3 3 3-3 3 3 3-3 3 3",
    Pisces: "M6 4c4 4.2 4 11.8 0 16M18 4c-4 4.2-4 11.8 0 16M5.5 12h13"
  };

  const C = 220;
  const pt = (r, a) => { const rad = (a * Math.PI) / 180; return [(C + r * Math.sin(rad)).toFixed(2), (C - r * Math.cos(rad)).toFixed(2)]; };
  function sector(r0, r1, a0, a1) {
    const [x1, y1] = pt(r1, a0), [x2, y2] = pt(r1, a1), [x3, y3] = pt(r0, a1), [x4, y4] = pt(r0, a0);
    return `M${x1} ${y1}A${r1} ${r1} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r0} ${r0} 0 0 0 ${x4} ${y4}Z`;
  }

  function miniWheel() {
    let s = `<svg class="cat-watermark" viewBox="0 0 440 440" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4">
      <circle cx="220" cy="220" r="206"/><circle cx="220" cy="220" r="140"/><circle cx="220" cy="220" r="44"/>`;
    ZODIAC.forEach((z, i) => {
      const [x1, y1] = pt(140, i * 30 + 15), [x2, y2] = pt(206, i * 30 + 15);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
      s += `<g transform="rotate(${i * 30} 220 220) translate(200 152) scale(1.7)"><path d="${GLYPHS[z.sign]}" stroke-width="2" stroke-linecap="round"/></g>`;
    });
    return s + "</g></svg>";
  }

  let current = 0, rotation = 0, userPicked = false, suppressClick = false;

  function signForDate(d) {
    const md = (d.getMonth() + 1) * 100 + d.getDate();
    let best = null, bestMd = -1;
    ZODIAC.forEach((z, i) => {
      const f = z.from[0] * 100 + z.from[1];
      if (f <= md && f > bestMd) { best = i; bestMd = f; }
    });
    return best === null ? ZODIAC.findIndex((z) => z.sign === "Capricorn") : best;
  }
  const todaySign = signForDate(istNow());

  function applyRotation(duration) {
    const rotor = $("#rotor");
    if (duration === 0 || reduceMotion) {
      rotor.style.transition = "none";
      rotor.style.transform = `rotate(${rotation}deg)`;
      void rotor.getBoundingClientRect();
      rotor.style.transition = "";
    } else {
      rotor.style.transition = duration ? `transform ${duration}s cubic-bezier(.2, .85, .2, 1)` : "";
      rotor.style.transform = `rotate(${rotation}deg)`;
    }
  }

  function buildWheel() {
    const svg = $("#wheel");
    let rays = "";
    for (let a = 0; a < 360; a += 10) {
      const [x1, y1] = pt(48, a), [x2, y2] = pt(126, a);
      rays += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }
    let segs = "";
    ZODIAC.forEach((z, i) => {
      const [bx1, by1] = pt(140, 15), [bx2, by2] = pt(206, 15);
      segs += `
        <g class="seg" data-i="${i}" tabindex="${i === todaySign ? 0 : -1}" role="button" aria-pressed="false" aria-label="${z.sign}, ${z.dates}" transform="rotate(${i * 30} ${C} ${C})">
          <path class="seg-hit" d="${sector(140, 206, -15, 15)}"/>
          <line x1="${bx1}" y1="${by1}" x2="${bx2}" y2="${by2}" stroke="rgba(239,228,202,.55)" stroke-width="1"/>
          <g transform="translate(205.5 26) scale(1.2)"><path class="seg-glyph" d="${GLYPHS[z.sign]}"/></g>
          <text class="seg-name" x="${C}" y="74" text-anchor="middle"${z.sign.length > 8 ? ' textLength="60" lengthAdjust="spacingAndGlyphs"' : ""}>${z.sign.toUpperCase()}</text>
        </g>`;
    });
    svg.innerHTML = `
      <g class="rotor" id="rotor">
        <circle class="ring" cx="${C}" cy="${C}" r="216" stroke-width=".8"/>
        <circle class="ring" cx="${C}" cy="${C}" r="211" stroke-width="1.2" stroke-dasharray="1.2 6"/>
        <circle class="ring" cx="${C}" cy="${C}" r="206" stroke-width="1.5"/>
        ${segs}
        <circle class="ring" cx="${C}" cy="${C}" r="140" stroke-width="1.5"/>
        <circle class="ring" cx="${C}" cy="${C}" r="134" stroke-width=".8"/>
        <g stroke="rgba(239,228,202,.32)" stroke-width="1">${rays}</g>
        <circle cx="${C}" cy="${C}" r="44" fill="#1F150D" stroke="rgba(239,228,202,.75)" stroke-width="1.4"/>
        <use href="#i-sparkle" x="${C - 17}" y="${C - 17}" width="34" height="34" style="color:#F2EAC4"/>
      </g>`;

    $$(".seg", svg).forEach((seg) => {
      seg.addEventListener("click", () => {
        if (suppressClick) return;
        select(+seg.dataset.i, { user: true });
      });
      seg.addEventListener("keydown", (e) => {
        const i = +seg.dataset.i;
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(i, { user: true }); }
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select((i + 1) % 12, { user: true, focus: true }); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select((i + 11) % 12, { user: true, focus: true }); }
      });
    });
    initWheelDrag(svg);
  }

  /* Spin the wheel by dragging (mouse) or swiping (touch); it snaps to the nearest sign */
  function initWheelDrag(svg) {
    let drag = null;
    const angleAt = (e) => {
      const r = svg.getBoundingClientRect();
      return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI;
    };
    const norm = (d) => ((d + 540) % 360) - 180;
    svg.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      drag = { id: e.pointerId, prev: angleAt(e), x: e.clientX, y: e.clientY, moved: false };
    });
    svg.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved) {
        if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 8) return;
        drag.moved = true;
        try { svg.setPointerCapture(drag.id); } catch (err) { /* ignore */ }
        svg.classList.add("is-dragging");
        $("#rotor").style.transition = "none";
      }
      const a = angleAt(e);
      rotation += norm(a - drag.prev);
      drag.prev = a;
      $("#rotor").style.transform = `rotate(${rotation}deg)`;
    });
    const end = () => {
      if (!drag) return;
      const moved = drag.moved;
      drag = null;
      svg.classList.remove("is-dragging");
      if (!moved) return;
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 60);
      $("#rotor").style.transition = "";
      const i = ((Math.round(-rotation / 30) % 12) + 12) % 12;
      select(i, { user: true });
    };
    svg.addEventListener("pointerup", end);
    svg.addEventListener("pointercancel", end);
  }

  function readingFor(i) {
    const z = ZODIAC[i];
    const dish = state.veg && z.veg && z.dish.t ? z.veg : z.dish;
    return { z, dish, drink: z.drink, total: dish.p + z.drink.p };
  }

  let turnTimer = null;
  function renderReading(animate) {
    const { z, dish, drink, total } = readingFor(current);
    const apply = () => {
      $("#reading-kicker").textContent = !userPicked
        ? `The sun is in ${ZODIAC[todaySign].sign} today`
        : current === todaySign ? "It's your season" : "Your reading";
      $("#reading-glyph").innerHTML = `<path d="${GLYPHS[z.sign]}"/>`;
      $("#reading-sign").textContent = z.sign;
      $("#reading-dates").textContent = z.dates;
      $("#reading-text").textContent = z.reading;
      $("#reading-dish").textContent = dish.n;
      $("#reading-dish-p").textContent = rupee(dish.p);
      $("#reading-drink").textContent = drink.n;
      $("#reading-drink-p").textContent = rupee(drink.p);
      $("#reading-total").textContent = rupee(total);
      $("#b-stars-label").textContent = `Add my stars to the message: ${z.sign}, so ${dish.n} + ${drink.n}`;
    };
    const card = $("#reading-card");
    if (!animate || reduceMotion) { apply(); return; }
    card.classList.add("is-turning");
    clearTimeout(turnTimer);
    turnTimer = setTimeout(() => { apply(); card.classList.remove("is-turning"); }, 360);
  }

  function select(i, opts = {}) {
    const target = -i * 30;
    let delta = (((target - rotation) % 360) + 540) % 360 - 180;
    if (opts.spin) delta -= 720;
    rotation += delta;
    applyRotation(opts.instant ? 0 : opts.spin ? 2.4 : undefined);
    const changed = current !== i;
    current = i;
    if (opts.user) userPicked = true;
    $$("#wheel .seg").forEach((seg) => {
      const on = +seg.dataset.i === i;
      seg.classList.toggle("is-on", on);
      seg.setAttribute("aria-pressed", String(on));
      seg.tabIndex = on ? 0 : -1;
      if (on && opts.focus) seg.focus({ preventScroll: true });
    });
    renderReading(!opts.instant && (changed || opts.user));
    if (opts.user) $("#b-stars-wrap").hidden = false;
  }

  function initStars() {
    buildWheel();
    select(todaySign, { instant: true });
    // The first time the wheel comes into view, it swings round to today's sign
    if (!reduceMotion && hasIO) {
      rotation += 330;
      applyRotation(0);
      let spun = false;
      const spinIn = () => {
        if (spun) return;
        spun = true;
        io.disconnect();
        rotation -= 330;
        setTimeout(() => applyRotation(2.6), 250);
      };
      const io = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) spinIn(); }, { threshold: 0.35 });
      io.observe($("#wheel"));
      // same on-screen fallback as the reveals
      setTimeout(() => { if ($("#wheel").getBoundingClientRect().top < window.innerHeight) spinIn(); }, 2800);
    }
    $("#reading-random").addEventListener("click", () => {
      let i;
      do { i = Math.floor(Math.random() * 12); } while (i === current);
      select(i, { user: true, spin: true });
    });
    $("#reading-book").addEventListener("click", () => {
      userPicked = true;
      $("#b-stars-wrap").hidden = false;
      $("#b-stars").checked = true;
    });
    $("#stars-veg").addEventListener("change", (e) => setVeg(e.target.checked));
  }

  /* =========================================================
     Photo viewer
     ========================================================= */
  function initLightbox() {
    const dlg = $("#lightbox");
    const img = $("#lb-img");
    const cap = $("#lb-cap");
    const count = $("#lb-count");
    const triggers = $$("[data-photo]").sort((a, b) => a.dataset.photo - b.dataset.photo);
    const photos = triggers.map((btn) => {
      const pic = $("img", btn);
      const fig = btn.closest("figure");
      const label = fig ? $("figcaption", fig).textContent : btn.getAttribute("aria-label").replace(/^View photo: /, "");
      return { src: pic.getAttribute("src"), alt: pic.alt, cap: label };
    });
    let idx = 0;

    const show = (i, fade) => {
      idx = (i + photos.length) % photos.length;
      const p = photos[idx];
      const set = () => {
        img.src = p.src; img.alt = p.alt;
        cap.textContent = p.cap;
        count.textContent = `${idx + 1} / ${photos.length}`;
        img.classList.remove("is-changing");
      };
      if (fade && !reduceMotion) { img.classList.add("is-changing"); setTimeout(set, 180); } else set();
    };
    const open = (i) => {
      show(i, false);
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
      root.classList.add("lb-open");
    };
    // release the scroll lock here too; the dialog's own "close" event isn't guaranteed to fire promptly
    const unlock = () => root.classList.remove("lb-open");
    const close = () => { if (dlg.open) dlg.close(); unlock(); };

    triggers.forEach((btn) => btn.addEventListener("click", () => open(+btn.dataset.photo)));
    $(".lb-close", dlg).addEventListener("click", close);
    $(".lb-prev", dlg).addEventListener("click", () => show(idx - 1, true));
    $(".lb-next", dlg).addEventListener("click", () => show(idx + 1, true));
    dlg.addEventListener("close", unlock);
    dlg.addEventListener("cancel", unlock); // Esc key
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.classList.contains("lb-figure")) close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(idx + 1, true);
      if (e.key === "ArrowLeft") show(idx - 1, true);
    });
    let sx = null;
    dlg.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    dlg.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1), true);
    });
  }

  /* =========================================================
     Booking
     ========================================================= */
  function initBooking() {
    const form = $("#book");
    const guests = $("#b-guests");
    const date = $("#b-date");
    const time = $("#b-time");
    const err = $("#book-error");
    const done = $("#book-done");

    guests.innerHTML = Array.from({ length: 10 }, (_, k) => `<option value="${k + 1}"${k === 1 ? " selected" : ""}>${k + 1}</option>`).join("")
      + `<option value="More than 10">More than 10</option>`;

    const now = istNow();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const lastSlot = 23 * 60;
    const today = isoDate(now);
    const tomorrow = isoDate(new Date(now.getTime() + 86400000));
    date.min = today;
    date.value = nowMin > lastSlot - 30 ? tomorrow : today;

    function fillTimes() {
      const isToday = date.value === today;
      const earliest = isToday ? nowMin + 30 : 0;
      let html = "", firstFree = null;
      for (let m = OPEN_MIN; m <= lastSlot; m += 30) {
        const past = m < earliest;
        if (!past && firstFree === null) firstFree = m;
        html += `<option value="${m}"${past ? " disabled" : ""}>${fmtTime(m)}</option>`;
      }
      const prev = +time.value;
      time.innerHTML = html;
      const preferred = 20 * 60; // 8 pm
      const pick = prev && prev >= earliest ? prev : (preferred >= earliest ? preferred : firstFree);
      if (pick !== null) time.value = String(pick);
    }
    fillTimes();
    date.addEventListener("change", fillTimes);

    const fail = (msg, field) => {
      err.textContent = msg;
      err.hidden = false;
      if (field) {
        field.removeAttribute("aria-invalid");
        void field.offsetWidth; // restart the nudge animation
        field.setAttribute("aria-invalid", "true");
        field.focus();
      }
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      err.hidden = true;
      done.hidden = true;
      $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));

      const name = $("#b-name").value.trim();
      if (!name) return fail("Add your name so the team knows who's coming.", $("#b-name"));
      if (!date.value || date.value < today) return fail("Pick a date from today onwards.", date);
      if ((time.selectedOptions[0] && time.selectedOptions[0].disabled) || !time.value) {
        return fail("That time has passed. Pick a later slot or another day.", time);
      }

      const [y, m, d] = date.value.split("-").map(Number);
      const niceDate = new Date(y, m - 1, d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
      const seat = (form.querySelector('input[name="seat"]:checked') || {}).value || "Anywhere is fine";
      const occasion = $("#b-occasion").value;
      const lines = [
        "Hi Huboho! I'd like to book a table.",
        "",
        `Name: ${name}`,
        `Guests: ${guests.value}`,
        `Date: ${niceDate}`,
        `Time: ${fmtTime(+time.value)}`,
        `Seating: ${seat}`
      ];
      if (occasion) lines.push(`Occasion: ${occasion}`);
      if ($("#b-dog").checked) lines.push("Bringing a dog: Yes 🐾");
      if (!$("#b-stars-wrap").hidden && $("#b-stars").checked) {
        const { z, dish, drink } = readingFor(current);
        lines.push(`My stars say: ${z.sign}, so ${dish.n} + ${drink.n} ✨`);
      }

      const url = `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener");
      done.hidden = false;
    });
  }

  /* ---------------- go ---------------- */
  drawRays();
  initRibbon();
  initReveals();
  initNav();
  updateStatus();
  setInterval(updateStatus, 60000);
  renderMentions();
  initMenu();
  initDeepLinks();
  initStars();
  initLightbox();
  initBooking();
  initWindowTrack();
  initScrollEffects();
  startHero();
  $("#year").textContent = istNow().getFullYear();
})();
