/* =========================================================
   OneClerk — AI-First E-Commerce Operating System
   Landing Page + Onboarding Flow + Founder Dashboard + Storefront Studio
   ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pick = (arr, n) => [...arr].sort(() => Math.random() - 0.5).slice(0, n);
const uid = () => Math.random().toString(36).slice(2, 9);
const slug = (s) => (s || 'yourstore').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30) || 'yourstore';

/* ---------------------------------------------------------
   Content & Presets (Phosphor Icons Everywhere — Zero 3D Emojis)
   --------------------------------------------------------- */
const CATEGORIES = [
  { id: 'fashion', label: 'Fashion & Apparel', icon: 'ph-t-shirt' },
  { id: 'beauty', label: 'Beauty & Skincare', icon: 'ph-drop' },
  { id: 'food', label: 'Food & Drinks', icon: 'ph-fork-knife' },
  { id: 'home', label: 'Home & Living', icon: 'ph-armchair' },
  { id: 'electronics', label: 'Electronics & Gadgets', icon: 'ph-headphones' },
  { id: 'art', label: 'Art & Handmade', icon: 'ph-palette' },
  { id: 'health', label: 'Health & Fitness', icon: 'ph-heartbeat' },
  { id: 'kids', label: 'Kids & Toys', icon: 'ph-baby' },
  { id: 'other', label: 'Something else', icon: 'ph-sparkle' },
];

const CAT_DATA = {
  fashion: {
    names: ['Thread & Co.', 'Maison Nova', 'Loom Studio', 'Common Thread', 'Atelier North', 'Kin Clothing', 'Softwear Club'],
    products: ['Linen Overshirt', 'Everyday Organic Tee', 'Relaxed French Terry Hoodie', 'Wrap Midi Dress', 'Heavyweight Canvas Tote', 'Wide-Leg Pleated Trousers'],
    headline: 'Clothes made to be lived in.',
    sub: 'Considered essentials, crafted sustainably for effortless everyday wear.',
    options: { Size: ['XS', 'S', 'M', 'L', 'XL'], Color: ['Black', 'Oatmeal', 'Sand', 'Olive'] },
    avgPrice: 48,
  },
  beauty: {
    names: ['Glow Theory', 'Dew & Daisy', 'Pure Ritual', 'Skin Society', 'Bloom Lab', 'Velvet Botanics'],
    products: ['Hydrating Peptide Serum', 'Barrier Restore Face Cream', 'Peptide Lip Balm', 'Pink Clay Detox Mask', 'Botanical Facial Oil', 'Whipped Body Butter'],
    headline: 'Skincare that actually feels good.',
    sub: 'Clean formulas, visible clinical results, zero fillers.',
    options: { Size: ['30ml', '50ml', '100ml'], Scent: ['Fragrance-Free', 'Rose Water', 'Neroli'] },
    avgPrice: 36,
  },
  food: {
    names: ['Golden Comb', 'Little Pantry', 'Harvest & Hive', 'Salt + Stone', 'The Good Batch', 'Sunday Bakehouse'],
    products: ['Raw Wildflower Honey Jar', 'Small-Batch Fermented Hot Sauce', 'Single-Origin Ethiopian Coffee', 'Artisan Sourdough Loaf', 'Maple Pecan Granola'],
    headline: 'Small batches. Big flavour.',
    sub: 'Handmade with ingredients we personally know and trust.',
    options: { Size: ['250g', '500g', '1kg'], Flavor: ['Original', 'Extra Hot', 'Smoked'] },
    avgPrice: 22,
  },
  home: {
    names: ['Nest & Nook', 'Oak + Ember', 'Casa Calma', 'Hearth House', 'Still Life Home', 'Moss & Clay'],
    products: ['Hand-thrown Ceramic Vase', 'Washed Linen Throw Blanket', 'Smoked Cedar Soy Candle', 'Stoneware Pour-Over Mug', 'Woven Seagrass Basket'],
    headline: 'Objects for slower living.',
    sub: 'Thoughtful pieces designed to bring warmth and calm to everyday spaces.',
    options: { Size: ['Small', 'Medium', 'Large'], Color: ['Natural Sand', 'Charcoal', 'Terracotta'] },
    avgPrice: 54,
  },
  electronics: {
    names: ['Volt Supply', 'Nimbus Tech', 'Pixel & Port', 'Circuit Goods', 'Arc Audio', 'Northwave'],
    products: ['Active Noise-Cancelling Earbuds', '65W GaN Fast Charger', 'MagSafe Aluminum Phone Stand', 'Pocket Bluetooth Speaker', '8-in-1 USB-C Hub'],
    headline: 'Tech that just works.',
    sub: 'Reliable, beautifully designed gear for modern work and travel.',
    options: { Color: ['Space Grey', 'Matte Black', 'Silver'], Storage: ['64GB', '128GB', '256GB'] },
    avgPrice: 89,
  },
  art: {
    names: ['Paper Moon', 'Studio Fern', 'Kiln & Thread', 'Little Wild Things', 'Inkwell Studio', 'Made by Marlow'],
    products: ['Archival Giclée Art Print', 'Hand-glazed Ceramic Bowl', 'Macramé Wall Tapestry', 'Letterpress Greeting Card Set', 'Hand-formed Brass Ring'],
    headline: 'Handmade, one piece at a time.',
    sub: 'Original independent artwork shipped directly from the artist’s studio.',
    options: { Size: ['A4 (8x10")', 'A3 (11x14")', 'A2 (16x20")'], Frame: ['Unframed', 'Natural Oak Frame', 'Black Frame'] },
    avgPrice: 65,
  },
  health: {
    names: ['Daily Form', 'Kinetic Co.', 'Fuel & Flow', 'Balance Lab', 'Peak Ritual', 'Root Wellness'],
    products: ['Eco Cork Yoga Mat', 'Organic Plant Protein Powder', 'Fabric Resistance Band Trio', 'Triple-Insulated Water Flask', 'Magnesium Muscle Recovery Balm'],
    headline: 'Feel good, every day.',
    sub: 'Everything you need to move, recover, and stay in peak rhythm.',
    options: { Size: ['Standard', 'Pro Large'], Color: ['Charcoal Sand', 'Midnight', 'Clay'] },
    avgPrice: 42,
  },
  kids: {
    names: ['Little Acorn', 'Tiny Tribe', 'Hello Wonder', 'Pip & Pebble', 'Moonbeam Kids', 'Small Folk'],
    products: ['Natural Wood Stacking Tower', 'Organic Cotton Ribbed Romper', 'Heirloom Knit Bunny', 'Illustrated Hardcover Storybook', 'Quilted Play Mat'],
    headline: 'Made for little adventures.',
    sub: 'Gentle, durable, non-toxic essentials that kids love and parents treasure.',
    options: { Age: ['0–6 Months', '6–12 Months', '1–2 Years'], Color: ['Oat', 'Dusty Rose', 'Sage'] },
    avgPrice: 32,
  },
  other: {
    names: ['Northstar Goods', 'The Corner Shop', 'Good Things Co.', 'Field & Fable', 'Bright Supply', 'Everyday Edit'],
    products: ['Signature Starter Kit', 'Curated Gift Box', 'Limited Edition Batch #1', 'Essentials Daily Bundle'],
    headline: 'Good things, delivered.',
    sub: 'Carefully chosen products, packaged with care and shipped straight to you.',
    options: { Size: ['Small', 'Medium', 'Large'], Color: ['Natural', 'Charcoal'] },
    avgPrice: 45,
  },
};

const TEMPLATE_VIBES = [
  { id: 'mabel', name: 'Mabel & Co.', badge: 'Artisanal', tag: 'Artisanal Bakery & Handmade Goods', desc: 'Warm serif, gourmet imagery, organic textures. Perfect for bakery, cafe, handcrafted pantry.', primary: '#121212', accent: '#CB7A30', bg: '#F4EBE3', card: '#FFFFFF', fontHeading: 'Instrument Serif', fontBody: 'Inter' },
  { id: 'atelier', name: 'Atelier Geist', badge: 'Minimal', tag: 'Minimalist Apparel & Living', desc: 'Swiss grid, monochrome elegance, spacious photography. Ideal for fashion, ceramics, design objects.', primary: '#111111', accent: '#76756F', bg: '#F5F4F0', card: '#FFFFFF', fontHeading: 'Geist', fontBody: 'Inter' },
  { id: 'aether', name: 'Aether Studio', badge: 'Digital', tag: 'Digital Downloads & Creator Presets', desc: 'Dark mode glow, punchy typography, instant file downloads. Built for presets, audio, templates, software.', primary: '#0D0D0D', accent: '#D4FF3A', bg: '#18181B', card: '#27272A', fontHeading: 'Inter Tight', fontBody: 'Geist' },
  { id: 'solace', name: 'Solace Care', badge: 'Services', tag: 'Boutique Consultations & Wellness', desc: 'Earth tones, calm rounded cards, calendar integration. Tailored for wellness, coaching, consultations.', primary: '#1A1A1A', accent: '#C48D65', bg: '#F7F5F0', card: '#FFFFFF', fontHeading: 'Georgia', fontBody: 'Inter' },
];

/* ---------------------------------------------------------
   State
   --------------------------------------------------------- */
const newProduct = (type = 'physical') => ({
  id: uid(),
  type, // physical, digital, service, subscription, food
  name: '',
  price: '0.00',
  stock: '50',
  sku: '',
  description: '',
  original: null,
  image: null,
  edited: false,
  showing: 'after',
  options: [],
  fulfillment: ['shipping', 'pickup'],
  meta: {},
  createdAt: new Date().toISOString(),
});

const state = {
  currentView: 'landing', // 'landing', 'onboarding', 'dashboard', 'storefront'
  category: 'food',
  categoryLabel: 'Food & Drinks',
  storeName: "Mabel's",
  storeSubdomain: 'mabels-bakery',
  products: [],
  template: 'mabel', // 'mabel', 'atelier', 'aether', 'solace'
  currentScreen: 'home', // 'home', 'pdp', 'cart', 'about', 'thankyou' or custom page id
  customPages: [], // User custom pages created via spec form or Clerk AI
  brand: {
    logo: null,
    brandGuideName: '',
    brandVoice: 'Warm & Artisanal',
    primaryColor: '#121212',
    accentColor: '#CB7A30',
    headingFont: 'Instrument Serif',
    bodyFont: 'Inter',
    heroHeadline: 'Sweet things, made slowly.',
    heroSubtitle: 'Seasonal cakes and small-batch treats, made by hand with very good ingredients.',
    heroCta: 'Explore our cakes →'
  },
  user: null, // { name: 'Alex Morgan', email: 'alex@example.com' }
  isLaunched: false,
  isPublished: false, // Default: private draft mode (never published automatically)
  cart: [],
  orders: [
    { id: '1014', date: 'Today, 2:15 PM', customer: 'Sarah Jenkins', email: 'sarah.j@gmail.com', items: '1x Signature Product', payment: 'Paid (Apple Pay)', fulfillment: 'Ready for Pickup', total: '$54.00' },
    { id: '1013', date: 'Yesterday', customer: 'Michael Chen', email: 'mchen@outlook.com', items: '2x Studio Editions', payment: 'Paid (Visa)', fulfillment: 'Shipped (USPS)', total: '$118.00' },
  ],
  whatsapp: {
    phone: '+1 (555) 382-9102',
    autoResponder: true
  },
  activeInboxTicketId: 't1',
  inboxFilterMode: 'all',
  inboxTickets: [
    {
      id: 't1',
      customer: 'Michael Chen',
      channel: 'Storefront Web Chat',
      time: 'Just now',
      query: 'Looking for a custom tiered cake for 50 people on Saturday. Can I speak to the founder?',
      status: 'Handover Required',
      urgency: 'High',
      unread: true,
      transcript: [
        { sender: 'customer', text: 'Hi! Do you do custom large cakes for private events?' },
        { sender: 'ai', text: 'Hello Michael! We do custom orders. For tiered event cakes, our founder Alex reviews orders directly to ensure dates and dietary needs are met.' },
        { sender: 'customer', text: 'Looking for a custom tiered cake for 50 people on Saturday. Can I speak to the founder?' },
        { sender: 'ai', text: 'I understand! I have alerted Alex in the Founder Dashboard. You can also chat with them directly on WhatsApp at +1 (555) 382-9102.' }
      ]
    },
    {
      id: 't2',
      customer: 'Tola Adebayo',
      channel: 'WhatsApp Direct',
      time: '12m ago',
      query: 'Can I swap the size on order #4471 before it ships?',
      status: 'AI Handled',
      urgency: 'Normal',
      unread: false,
      transcript: [
        { sender: 'customer', text: 'Can I swap the size on order #4471 before it ships?' },
        { sender: 'ai', text: "Good news, order #4471 hasn't shipped yet! I've updated your size at no extra charge. Dispatch confirmation will be emailed shortly." }
      ]
    },
    {
      id: 't3',
      customer: 'Sarah Jenkins',
      channel: 'Storefront Web Chat',
      time: '35m ago',
      query: 'Do you ship to Canada or offer curbside pickup?',
      status: 'AI Handled',
      urgency: 'Normal',
      unread: false,
      transcript: [
        { sender: 'customer', text: 'Do you ship to Canada or offer curbside pickup?' },
        { sender: 'ai', text: 'We offer express international parcel shipping as well as free curbside pickup at our Brooklyn studio!' }
      ]
    }
  ],
  builderImages: [],
  // UI filter states
  catalogCategoryFilter: 'all',
  catalogSearch: '',
  catalogSort: 'newest',
  productModalCategory: 'physical',
};

const cutCache = new Map();

/* ---------------------------------------------------------
   AI Simulation Helpers
   --------------------------------------------------------- */
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function cutout(img) {
  if (cutCache.has(img.src)) return cutCache.get(img.src);
  const c = document.createElement('canvas');
  const w = (c.width = img.naturalWidth || img.width || 600);
  const h = (c.height = img.naturalHeight || img.height || 600);
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h);
  const p = d.data;

  const sample = (x, y) => {
    const i = (y * w + x) * 4;
    return [p[i], p[i + 1], p[i + 2]];
  };
  const corners = [
    sample(2, 2),
    sample(w - 3, 2),
    sample(2, h - 3),
    sample(w - 3, h - 3),
    sample(Math.floor(w / 2), 2),
  ];
  const bgR = corners.reduce((s, c) => s + c[0], 0) / corners.length;
  const bgG = corners.reduce((s, c) => s + c[1], 0) / corners.length;
  const bgB = corners.reduce((s, c) => s + c[2], 0) / corners.length;

  for (let i = 0; i < p.length; i += 4) {
    const dr = p[i] - bgR;
    const dg = p[i + 1] - bgG;
    const db = p[i + 2] - bgB;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    const bright = (p[i] + p[i + 1] + p[i + 2]) / 3;
    if (dist < 42 && bright > 180) {
      p[i + 3] = 0;
    } else if (dist < 60 && bright > 190) {
      p[i + 3] = Math.max(0, Math.floor(((dist - 42) / 18) * 255));
    }
  }
  ctx.putImageData(d, 0, 0);
  cutCache.set(img.src, c);
  return c;
}

function averageCenterColor(img) {
  const c = document.createElement('canvas');
  const w = (c.width = 40);
  const h = (c.height = 40);
  const ctx = c.getContext('2d');
  ctx.drawImage(img, w * 0.25, h * 0.25, w * 0.5, h * 0.5, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  let r = 0, g = 0, b = 0, cnt = 0;
  for (let i = 0; i < d.length; i += 4) {
    r += d[i]; g += d[i + 1]; b += d[i + 2]; cnt++;
  }
  return [Math.round(r / cnt), Math.round(g / cnt), Math.round(b / cnt)];
}

function nearestColorName([r, g, b]) {
  const named = [
    { name: 'Oatmeal Cream', rgb: [230, 220, 200] },
    { name: 'Matte Charcoal', rgb: [40, 40, 45] },
    { name: 'Warm Terracotta', rgb: [195, 110, 80] },
    { name: 'Charcoal Sand', rgb: [130, 150, 130] },
    { name: 'Natural Sand', rgb: [215, 200, 175] },
  ];
  return named[0].name;
}

function interpretPrompt(text = '') {
  const t = text.toLowerCase();
  const cfg = { bgType: 'studio', tone: 'warm', shadow: true, vignette: false };
  if (t.includes('marble')) cfg.bgType = 'marble';
  else if (t.includes('wood') || t.includes('table')) cfg.bgType = 'wood';
  else if (t.includes('white') || t.includes('clean')) { cfg.bgType = 'white'; cfg.shadow = false; }
  else if (t.includes('studio') || t.includes('beige') || t.includes('soft')) cfg.bgType = 'studio';
  if (t.includes('cool')) cfg.tone = 'cool';
  return cfg;
}

function renderEdit(img, cfg, cut) {
  const c = document.createElement('canvas');
  const w = (c.width = 600);
  const h = (c.height = 600);
  const ctx = c.getContext('2d');

  if (cfg.bgType === 'studio') {
    const g = ctx.createRadialGradient(w * 0.45, h * 0.35, 30, w * 0.5, h * 0.5, w * 0.7);
    g.addColorStop(0, '#f9f6f0');
    g.addColorStop(0.7, '#ede6da');
    g.addColorStop(1, '#dfd5c4');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  } else if (cfg.bgType === 'white') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
  } else {
    ctx.fillStyle = '#f5f4f0';
    ctx.fillRect(0, 0, w, h);
  }

  // Soft contact shadow
  if (cfg.shadow) {
    ctx.save();
    ctx.translate(w / 2, h * 0.78);
    ctx.scale(1, 0.24);
    const sg = ctx.createRadialGradient(0, 0, 10, 0, 0, 160);
    sg.addColorStop(0, 'rgba(25, 20, 15, 0.28)');
    sg.addColorStop(0.5, 'rgba(25, 20, 15, 0.12)');
    sg.addColorStop(1, 'rgba(25, 20, 15, 0)');
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.arc(0, 0, 160, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Draw subject
  const scale = Math.min((w * 0.75) / cut.width, (h * 0.75) / cut.height);
  const dw = cut.width * scale;
  const dh = cut.height * scale;
  const dx = (w - dw) / 2;
  const dy = h * 0.78 - dh;
  ctx.drawImage(cut, dx, dy, dw, dh);

  return c.toDataURL('image/jpeg', 0.92);
}

async function aiEditImage(product, promptText) {
  const img = await loadImg(product.original || product.image);
  const cut = cutout(img);
  const cfg = interpretPrompt(promptText);
  const dataUrl = renderEdit(img, cfg, cut);
  return { image: dataUrl, prompt: promptText };
}

async function aiWriteDescription(product) {
  await sleep(400);
  const cat = state.category || 'other';
  const name = product.name || 'Handcrafted item';
  return `Thoughtfully crafted ${name.toLowerCase()}, designed for durability, tactile comfort, and everyday enjoyment. Small-batch produced with transparent materials.`;
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


// Expose core navigation functions globally
window.setView = setView;
window.switchDashTab = switchDashTab;
window.openStorefront = () => setView('storefront');
window.openDashboard = () => {
  seedDemoStore();
  setView('dashboard');
};

/* =========================================================
   ROUTING & VIEW MANAGEMENT
   Views: 'landing', 'onboarding', 'dashboard', 'storefront'
   ========================================================= */
function setView(view) {
  state.currentView = view;
  const landing = $('#landingPage');
  const onboardingTopbar = $('#onboardingTopbar');
  const flow = $('#flow');
  const stepNav = $('#stepNav');
  const aurora = $('.aurora');
  const dashboard = $('#dashboardApp');
  const storefront = $('#storefrontApp');
  const productBuilder = $('#productBuilderApp');

  // Landing Page
  if (landing) landing.hidden = view !== 'landing';

  // Onboarding
  const isOnboarding = (view === 'onboarding');
  if (onboardingTopbar) onboardingTopbar.hidden = !isOnboarding;
  if (flow) flow.hidden = !isOnboarding;
  if (stepNav) stepNav.hidden = !isOnboarding;
  if (aurora) aurora.hidden = !isOnboarding;

  // Dashboard
  if (dashboard) dashboard.hidden = view !== 'dashboard';

  // Storefront
  if (storefront) storefront.hidden = view !== 'storefront';

  // Product Builder
  if (productBuilder) productBuilder.hidden = view !== 'product-builder';

  window.scrollTo(0, 0);

  if (view === 'onboarding') {
    renderCategories();
    renderVibeTemplates();
    setActive(0);
  } else if (view === 'dashboard') {
    syncDashboardUI();
  } else if (view === 'storefront') {
    renderStorefront();
  } else if (view === 'product-builder') {
    const vp = $('#pbScrollViewport');
    if (vp) vp.scrollTop = 0;
  }
}

/* =========================================================
   ONBOARDING STEPPER CONTROLLER
   Clean 1-Question Focus · No Reversion Traps · Instant Flow
   ========================================================= */
let activeStep = 0;

function getOnboardingSteps() {
  return $$('main.flow .step');
}

function setActive(idx) {
  const steps = getOnboardingSteps();
  if (!steps.length) return;
  activeStep = Math.max(0, Math.min(idx, steps.length - 1));

  // Exactly one step is visible at a time
  steps.forEach((s, i) => {
    const isActive = (i === activeStep);
    s.hidden = !isActive;
    s.classList.toggle('active', isActive);
    s.classList.remove('is-dim');
  });

  // Topbar progress indicators
  const progressFill = $('#progressFill');
  const progressLabel = $('#progressLabel');
  const pct = Math.round((activeStep / (steps.length - 1)) * 100);
  if (progressFill) progressFill.style.width = `${Math.max(14, pct)}%`;
  if (progressLabel) {
    if (activeStep === 0) progressLabel.textContent = "Welcome";
    else if (activeStep === steps.length - 1) progressLabel.textContent = "Ready to launch";
    else progressLabel.textContent = `Step ${activeStep} of 5`;
  }

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Auto focus input or choice
  setTimeout(() => focusStep(activeStep), 80);
}

function scrollToStep(idx) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function focusStep(idx) {
  const steps = getOnboardingSteps();
  const target = steps[idx]?.querySelector('input:not([hidden]), button.choice, button.btn-primary');
  target?.focus({ preventScroll: true });
}

function next() {
  if (validate(activeStep)) {
    setActive(activeStep + 1);
  }
}

function validate(step) {
  if (step === 0) {
    // Intro step: no validation required
    return true;
  }
  if (step === 1) {
    // Category step
    const err = $('#categoryErr');
    if (!state.category) {
      if (err) err.textContent = 'Please choose a business category to begin.';
      return false;
    }
    if (err) err.textContent = '';
    return true;
  }
  if (step === 2) {
    // Store name step
    const err = $('#nameErr');
    const input = $('#storeNameInput');
    const val = input ? input.value.trim() : '';
    if (!val) {
      if (err) err.textContent = 'Please enter a store name.';
      input?.focus();
      return false;
    }
    if (err) err.textContent = '';
    updateStoreName(val);
    return true;
  }
  if (step === 3) {
    // Store URL step
    const err = $('#urlErr');
    const input = $('#urlSubdomainInput');
    const val = input ? input.value.trim() : '';
    if (!val) {
      if (err) err.textContent = 'Please choose a store URL handle.';
      input?.focus();
      return false;
    }
    if (err) err.textContent = '';
    state.storeSubdomain = slug(val);
    return true;
  }
  if (step === 4) {
    // Products step: sync name and price from inputs
    const nameInput = $('#productNameInput');
    const priceInput = $('#productPriceInput');
    if (nameInput && state.products[0]) state.products[0].name = nameInput.value.trim() || state.products[0].name;
    if (priceInput && state.products[0]) state.products[0].price = priceInput.value.trim() || state.products[0].price;
    return true;
  }
  if (step === 5) {
    // Design vibe step: render summary
    renderSummary();
    return true;
  }
  return true;
}

function renderCategories() {
  const cont = $('#categoryChoices');
  if (!cont) return;
  cont.innerHTML = CATEGORIES.map((c) => `
    <button class="choice ${state.category === c.id ? 'selected' : ''}" data-cat="${c.id}" type="button">
      <span class="emoji"><i class="ph-bold ${c.icon}"></i></span>
      <span class="label">${c.label}</span>
    </button>
  `).join('');

  cont.onclick = (e) => {
    const btn = e.target.closest('.choice'); if (!btn) return;
    const cat = btn.dataset.cat;
    if (cat === 'other') {
      const otherWrap = $('#otherWrap');
      if (otherWrap) otherWrap.hidden = false;
      $('#otherInput')?.focus();
      return;
    }
    const otherWrap = $('#otherWrap');
    if (otherWrap) otherWrap.hidden = true;
    $$('.choice', cont).forEach((b) => b.classList.toggle('selected', b === btn));
    state.category = cat;
    state.categoryLabel = CATEGORIES.find(c => c.id === cat)?.label || '';
    $('#categoryErr').textContent = '';
    renderNameSuggestions(cat);
    if (!state.products.length) {
      const p = newProduct('physical');
      state.products.push(p);
      renderProducts();
    }
    setTimeout(() => next(), 180);
  };
}

// When other input OK is clicked
$('#otherWrap button')?.addEventListener('click', (e) => {
  e.preventDefault();
  const val = $('#otherInput')?.value.trim();
  if (val) {
    state.category = 'other';
    state.categoryLabel = val;
    $('#categoryErr').textContent = '';
    renderNameSuggestions('other');
    if (!state.products.length) {
      const p = newProduct('physical');
      p.name = val;
      state.products.push(p);
      renderProducts();
    }
    next();
  }
});

function renderNameSuggestions(cat) {
  const data = CAT_DATA[cat] || CAT_DATA.other;
  const list = pick(data.names, 4);
  const cont = $('#nameSuggestions');
  if (!cont) return;
  cont.innerHTML = list.map((n) => `<button type="button" class="sugg-chip">${esc(n)}</button>`).join('');
  cont.onclick = (e) => {
    const btn = e.target.closest('.sugg-chip'); if (!btn) return;
    $('#storeNameInput').value = btn.textContent;
    updateStoreName(btn.textContent);
  };
}

function updateStoreName(name) {
  state.storeName = name;
  const sub = slug(name);
  state.storeSubdomain = sub;
  const subInput = $('#urlSubdomainInput');
  if (subInput) subInput.value = sub;
  renderUrlVariations(sub);
  renderSummary();
}

function renderUrlVariations(sub) {
  const cont = $('#urlVariations'); if (!cont) return;
  const vars = [`${sub}-shop`, `get${sub}`, `the${sub}`, `${sub}studio`];
  cont.innerHTML = vars.map(v => `<button type="button" class="sugg-chip">${v}.oneclerk.shop</button>`).join('');
  cont.onclick = (e) => {
    const btn = e.target.closest('.sugg-chip'); if (!btn) return;
    const clean = btn.textContent.replace('.oneclerk.shop', '');
    $('#urlSubdomainInput').value = clean;
    state.storeSubdomain = clean;
  };
}

function renderProducts() {
  const cont = $('#products'); if (!cont) return;
  if (!state.products.length) {
    const p = newProduct(state.category || 'physical');
    p.name = 'Hand-thrown Ceramic Mug';
    p.price = '38.00';
    state.products.push(p);
  }
  cont.innerHTML = state.products.map((p, i) => `
    <div class="product-item" data-id="${p.id}">
      <div class="field">
        <label>Product Name</label>
        <input class="input lg" id="productNameInput" value="${esc(p.name)}" placeholder="e.g. Sourdough Country Loaf" />
      </div>
      <div class="row-2" style="margin-top:12px;">
        <div class="field">
          <label>Selling Price ($ USD)</label>
          <input class="input" id="productPriceInput" value="${esc(p.price || '24.00')}" placeholder="24.00" />
        </div>
        <div class="field">
          <label>Fulfillment</label>
          <input class="input" value="Shipping + Curbside Pickup" readonly style="background:var(--bg-canvas);" />
        </div>
      </div>
    </div>
  `).join('');
}

function renderVibeTemplates() {
  const tplStoreName = $('#tplStoreName');
  if (tplStoreName) tplStoreName.textContent = (state.storeName || 'your store') + '.';

  const cont = $('#tplVibeGrid') || $('#templateChoices');
  if (!cont) return;
  cont.innerHTML = TEMPLATE_VIBES.map(v => `
    <div class="tpl-vibe-card ${v.id === state.template ? 'selected' : ''}" data-tpl="${v.id}">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span class="pill">${v.badge}</span>
        <span style="font-size:12px; color:var(--muted);">${v.fontHeading}</span>
      </div>
      <b style="display:block; font-size:18px; margin-bottom:4px;">${v.name}</b>
      <p style="font-size:13px; color:var(--muted); margin:0;">${v.tag}</p>
    </div>
  `).join('');

  cont.onclick = (e) => {
    const card = e.target.closest('.tpl-vibe-card'); if (!card) return;
    state.template = card.dataset.tpl;
    $$('.tpl-vibe-card', cont).forEach(b => b.classList.toggle('selected', b === card));
    renderSummary();
  };
}

function renderSummary() {
  const cont = $('#summary');
  if (!cont) return;
  const tpl = TEMPLATE_VIBES.find(t => t.id === state.template) || TEMPLATE_VIBES[0];
  cont.innerHTML = `
    <div class="sum-row">
      <span class="k">Store Name</span>
      <span class="v"><b>${esc(state.storeName || "Mabel's")}</b></span>
    </div>
    <div class="sum-row">
      <span class="k">Store URL</span>
      <span class="v"><code>https://${esc(state.storeSubdomain || 'mabels-bakery')}.oneclerk.shop</code></span>
    </div>
    <div class="sum-row">
      <span class="k">Category</span>
      <span class="v">${esc(state.categoryLabel || 'Food & Drinks')}</span>
    </div>
    <div class="sum-row">
      <span class="k">Products</span>
      <span class="v">${state.products.length} product${state.products.length === 1 ? '' : 's'} configured</span>
    </div>
    <div class="sum-row">
      <span class="k">Design Vibe</span>
      <span class="v">${esc(tpl.name)} (${esc(tpl.badge)})</span>
    </div>
  `;
}

// Stepper click handlers
$$('[data-next]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    next();
  });
});

$$('.btn-back').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (activeStep > 0) {
      setActive(activeStep - 1);
    } else {
      setView('landing');
    }
  });
});

$('#addProductBtn')?.addEventListener('click', () => {
  const p = newProduct(state.category || 'physical');
  p.name = `Item #${state.products.length + 1}`;
  p.price = '32.00';
  state.products.push(p);
  renderProducts();
  toast('New item added to store draft');
});

$('#onboardingHomeLogo')?.addEventListener('click', (e) => {
  e.preventDefault();
  setView('landing');
});

$('#backToHomeBtn')?.addEventListener('click', () => setView('landing'));

$('#demoDashboardBtn')?.addEventListener('click', () => {
  seedDemoStore();
  setView('dashboard');
  toast('Welcome to your demo store! Explore My Clerk, catalog, and storefront.');
});

$('#restartBtn')?.addEventListener('click', () => {
  state.category = '';
  state.categoryLabel = '';
  state.storeName = '';
  state.products = [];
  setActive(0);
  toast('Restarted onboarding flow');
});

$('#navUp')?.addEventListener('click', () => {
  if (activeStep > 0) setActive(activeStep - 1);
  else setView('landing');
});

$('#navDown')?.addEventListener('click', () => next());

// Enter key advances on inputs in flow, Up arrow moves back
document.addEventListener('keydown', (e) => {
  if (state.currentView !== 'onboarding') return;
  if (e.key === 'Enter') {
    const target = e.target;
    if (target && target.matches('main.flow input')) {
      e.preventDefault();
      next();
    }
  } else if (e.key === 'ArrowUp') {
    const target = e.target;
    if (target && !target.matches('input, textarea')) {
      e.preventDefault();
      if (activeStep > 0) setActive(activeStep - 1);
    }
  }
});

$('#launchBtn')?.addEventListener('click', () => {
  if (!state.user) {
    openAuthModal('signup');
  } else {
    runLaunchSequence();
  }
});

/* =========================================================
   AUTH MODAL & SIGNUP / LOGIN
   ========================================================= */
function openAuthModal(mode = 'signup') {
  setAuthMode(mode);
  const modal = $('#authModal');
  if (modal) modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  const modal = $('#authModal');
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
}

function setAuthMode(mode) {
  const title = $('#authTitle');
  const sub = $('#authSubtitle');
  const submit = $('#authSubmitBtn');
  const toggle = $('#authToggleBtn');
  const nameRow = $('#authNameRow');

  if (mode === 'signup') {
    if (title) title.textContent = 'Create your Founder Account';
    if (sub) sub.textContent = 'Save your store draft and launch your live business dashboard.';
    if (submit) submit.innerHTML = '<span>Save &amp; Open Dashboard</span> <i class="ph-bold ph-arrow-right"></i>';
    if (toggle) toggle.textContent = 'Already have an account? Sign in';
    if (nameRow) nameRow.hidden = false;
  } else {
    if (title) title.textContent = 'Welcome back to OneClerk';
    if (sub) sub.textContent = 'Sign in to access your orders, catalog, and store analytics.';
    if (submit) submit.innerHTML = '<span>Sign In to Dashboard</span> <i class="ph-bold ph-arrow-right"></i>';
    if (toggle) toggle.textContent = "Don't have an account? Create one";
    if (nameRow) nameRow.hidden = true;
  }
}

$('#closeAuthModal')?.addEventListener('click', closeAuthModal);
$('#authToggleBtn')?.addEventListener('click', () => {
  const isSignup = !$('#authNameRow').hidden;
  setAuthMode(isSignup ? 'login' : 'signup');
});

$('#quickDemoLoginBtn')?.addEventListener('click', () => {
  state.user = { name: 'Alex Morgan', email: 'alex@lumina.studio' };
  seedDemoStore();
  closeAuthModal();
  runLaunchSequence();
});

$('#googleAuthBtn')?.addEventListener('click', () => {
  state.user = { name: 'Alex Morgan', email: 'alex.morgan@gmail.com' };
  seedDemoStore();
  closeAuthModal();
  runLaunchSequence();
});

$('#appleAuthBtn')?.addEventListener('click', () => {
  state.user = { name: 'Alex Morgan', email: 'alex@icloud.com' };
  seedDemoStore();
  closeAuthModal();
  runLaunchSequence();
});

$('#authForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#authFounderName').value.trim() || 'Alex Morgan';
  const email = $('#authEmail').value.trim() || 'alex@example.com';
  state.user = { name, email };
  closeAuthModal();
  runLaunchSequence();
});

/* =========================================================
   SEED DEMO STORE (Boutique Multi-Category Data)
   ========================================================= */
function seedDemoStore() {
  if (!state.storeName) state.storeName = "Mabel's";
  if (!state.storeSubdomain) state.storeSubdomain = 'mabels-bakery';
  if (!state.category) { state.category = 'food'; state.categoryLabel = 'Food & Drinks'; }
  
  if (!state.products.length) {
    // 1. Physical Good (Handcrafted Ceramic Mug)
    const p1 = newProduct('physical');
    p1.name = 'Hand-thrown Ceramic Mug';
    p1.price = '38.00';
    p1.stock = '42';
    p1.sku = 'MUG-01';
    p1.image = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
    p1.fulfillment = ['shipping', 'pickup'];
    p1.options = ['Natural Sand', 'Matte Charcoal'];
    p1.description = 'Hand-thrown stoneware mug with speckled sand glaze. Dishwasher and microwave safe.';

    // 2. Digital Download (Recipe Guide PDF)
    const p2 = newProduct('digital');
    p2.name = 'Pottery Studio Glaze Recipe Guide (PDF)';
    p2.price = '18.00';
    p2.stock = '999';
    p2.sku = 'DIG-01';
    p2.image = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';
    p2.fulfillment = ['digital'];
    p2.options = ['Instant PDF Download'];
    p2.description = 'Comprehensive 48-page guide covering cone 6 oxidation glaze formulations and raw materials.';

    // 3. Service / Booking (1-on-1 Wheel Throwing Session)
    const p3 = newProduct('service');
    p3.name = 'Private Wheel Throwing Masterclass';
    p3.price = '85.00';
    p3.stock = '8';
    p3.sku = 'SRV-01';
    p3.image = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80';
    p3.fulfillment = ['service'];
    p3.options = ['60 Min Studio Session', '90 Min Intensive'];
    p3.description = 'One-on-one intensive studio workshop in centering, pulling walls, and trimming vessels. Clay & bisque firing included.';

    // 4. Food & Artisan Bakes (Sourdough Boule)
    const p4 = newProduct('food');
    p4.name = 'Artisanal Sourdough Country Loaf';
    p4.price = '14.00';
    p4.stock = '24';
    p4.sku = 'BAKE-01';
    p4.image = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80';
    p4.fulfillment = ['pickup', 'courier'];
    p4.options = ['Classic Country', 'Seeded Multigrain'];
    p4.description = 'Naturally fermented 36-hour sourdough boule baked in heavy steam for blistered crust and custard crumb.';

    state.products.push(p1, p2, p3, p4);
  }

  state.user = { name: 'Alex Morgan', email: 'alex@lumina.studio' };
}

function runLaunchSequence() {
  const overlay = $('#launchOverlay');
  if (overlay) overlay.hidden = false;
  confetti();
  setTimeout(() => {
    if (overlay) overlay.hidden = true;
    state.isLaunched = true;
    saveStoreState();
    setView('dashboard');
  }, 1100);
}

function confetti() {
  const cvs = $('#confetti'); if (!cvs) return;
  const ctx = cvs.getContext('2d');
  cvs.width = window.innerWidth; cvs.height = window.innerHeight;
  const parts = Array.from({ length: 65 }, () => ({
    x: Math.random() * cvs.width,
    y: -20,
    w: Math.random() * 8 + 4,
    h: Math.random() * 12 + 6,
    c: ['#121212', '#76756F', '#A3A29E', '#E7E5DE', '#262626'][Math.floor(Math.random() * 5)],
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 4 + 3,
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 6
  }));

  let frames = 0;
  function step() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (++frames < 140) requestAnimationFrame(step);
    else ctx.clearRect(0, 0, cvs.width, cvs.height);
  }
  step();
}

/* =========================================================
   DASHBOARD SYNC & MANAGEMENT
   ========================================================= */
function syncDashboardUI() {
  const storeName = state.storeName || "Mabel's";
  const storeSub = state.storeSubdomain || slug(storeName);
  const fullUrl = `${storeSub}.oneclerk.shop`;

  const curName = $('#dashStoreCurrentName'); if (curName) curName.textContent = storeName;
  const urlPill = $('#dashStoreUrlPill'); if (urlPill) urlPill.textContent = fullUrl;
  const liveUrl = $('#dashLiveStudioUrl'); if (liveUrl) liveUrl.textContent = fullUrl;

  if (state.user) {
    const uName = $('#dashUserName'); if (uName) uName.textContent = state.user.name || 'Alex Morgan';
    const inits = (state.user.name || 'AM').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const avatar = $('#dashAvatar'); if (avatar) avatar.textContent = inits;
  }

  updatePublishingUI();
  renderDashboardCatalog();
  renderStorefrontStudio();
  renderInboxHub();
  updateDashboardCounts();
}

function updatePublishingUI() {
  const isPub = state.isPublished;
  const bar = $('#overviewPublishBar');
  const title = $('#publishStatusTitle');
  const desc = $('#publishStatusDesc');
  const toggleBtn = $('#overviewPublishToggleBtn');
  const headBtn = $('#dashHeaderPublishBtn');
  const sidePill = $('#sidebarLivePill');
  const pulse = $('#dashStatusPulse');

  if (bar) bar.className = `store-publish-bar ${isPub ? 'live' : 'draft'}`;
  if (title) {
    title.innerHTML = isPub 
      ? '<span class="status-indicator live"></span> Live to the World' 
      : '<span class="status-indicator draft"></span> Draft Mode (Private)';
  }
  if (desc) {
    desc.textContent = isPub 
      ? `Your store is live and accepting customer orders at https://${state.storeSubdomain || 'yourstore'}.oneclerk.shop.`
      : 'Your store is currently in private draft mode. Customers cannot access until you hit Publish.';
  }
  if (toggleBtn) {
    toggleBtn.innerHTML = isPub 
      ? '<i class="ph-bold ph-pause"></i> Set to Private Draft' 
      : '<i class="ph-bold ph-rocket-launch"></i> Publish Store Live';
  }
  if (headBtn) {
    headBtn.innerHTML = isPub 
      ? '<i class="ph-bold ph-check-circle"></i> Live' 
      : '<i class="ph-bold ph-rocket-launch"></i> Publish';
    headBtn.style.background = isPub ? '#121212' : 'var(--brand-primary, #121212)';
  }
  if (sidePill) {
    sidePill.textContent = isPub ? 'Live' : 'Draft';
    sidePill.style.background = isPub ? '#121212' : '#d97706';
  }
  if (pulse) {
    pulse.style.background = isPub ? '#121212' : '#f59e0b';
  }
}

$('#overviewPublishToggleBtn')?.addEventListener('click', togglePublishAction);
$('#dashHeaderPublishBtn')?.addEventListener('click', togglePublishAction);

function togglePublishAction() {
  if (!state.isPublished) {
    const m = $('#publishModal');
    if (m) {
      const domText = $('#publishStoreDomainText');
      if (domText) domText.textContent = `${state.storeSubdomain || 'yourstore'}.oneclerk.shop`;
      m.hidden = false;
    }
  } else {
    state.isPublished = false;
    saveStoreState();
    updatePublishingUI();
    toast('Store switched to Private Draft Mode.');
  }
}

$('#closePublishModal')?.addEventListener('click', () => { $('#publishModal').hidden = true; });
$('#cancelPublishBtn')?.addEventListener('click', () => { $('#publishModal').hidden = true; });
$('#confirmPublishBtn')?.addEventListener('click', () => {
  state.isPublished = true;
  saveStoreState();
  $('#publishModal').hidden = true;
  confetti();
  updatePublishingUI();
  toast('Store is officially LIVE to the world!');
});

/* =========================================================
   THEME CONTROLLER (Light / Dark)
   ========================================================= */
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  setTheme(saved);
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('theme', theme);

  const dashIcon = $('#dashThemeIcon');
  const landingIcon = $('#landingThemeIcon');

  if (dashIcon) dashIcon.innerHTML = isDark ? '<i class="ph-bold ph-moon"></i>' : '<i class="ph-bold ph-sun"></i>';
  if (landingIcon) landingIcon.innerHTML = isDark ? '<i class="ph-bold ph-moon"></i>' : '<i class="ph-bold ph-sun"></i>';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
  toast(`Switched to ${current === 'dark' ? 'Light' : 'Dark'} Mode`);
}

$('#dashThemeToggleBtn')?.addEventListener('click', toggleTheme);
$('#landingThemeToggleBtn')?.addEventListener('click', toggleTheme);

/* =========================================================
   DASHBOARD TABS & SIDEBAR CONTROLLER
   ========================================================= */
function switchDashTab(tabId) {
  if (!tabId) return;
  $$('.dash-nav-item').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  $$('.dash-section').forEach(s => s.classList.toggle('active', s.id === `tab-${tabId}`));
  const dashMain = $('.dash-main');
  if (dashMain) dashMain.classList.toggle('is-storefront-view', tabId === 'storefront');
  if (tabId === 'catalog') renderDashboardCatalog();
  if (tabId === 'storefront') renderStorefrontStudio();
  if (tabId === 'inbox') renderInboxHub();
}

$$('.dash-nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.tab) switchDashTab(btn.dataset.tab);
  });
});

$('#sidebarCollapseBtn')?.addEventListener('click', () => {
  const sidebar = $('#dashSidebar');
  if (sidebar) sidebar.classList.toggle('collapsed');
});

$('#sidebarLogoHome')?.addEventListener('click', () => switchDashTab('overview'));
$('#dashHelpBtn')?.addEventListener('click', () => toast('OneClerk Help Centre: Documentation & 24/7 AI Founder Support'));
$('#overviewQuickAddProductBtn')?.addEventListener('click', () => openProductBuilder());
$('#overviewQuickStorefrontBtn')?.addEventListener('click', () => switchDashTab('storefront'));

/* Viewport Switcher (Website / Tablet / Mobile) */
$('#viewModeDesktopBtn')?.addEventListener('click', () => {
  $('#viewModeDesktopBtn')?.classList.add('active');
  $('#viewModeTabletBtn')?.classList.remove('active');
  $('#viewModeMobileBtn')?.classList.remove('active');
  $('#studioPreviewFrame')?.classList.remove('tablet-mode', 'mobile-mode');
  toast('Switched to Desktop Website view (100%)');
});

$('#viewModeTabletBtn')?.addEventListener('click', () => {
  $('#viewModeTabletBtn')?.classList.add('active');
  $('#viewModeDesktopBtn')?.classList.remove('active');
  $('#viewModeMobileBtn')?.classList.remove('active');
  $('#studioPreviewFrame')?.classList.remove('mobile-mode');
  $('#studioPreviewFrame')?.classList.add('tablet-mode');
  toast('Switched to Tablet / iPad view (768px)');
});

$('#viewModeMobileBtn')?.addEventListener('click', () => {
  $('#viewModeMobileBtn')?.classList.add('active');
  $('#viewModeDesktopBtn')?.classList.remove('active');
  $('#viewModeTabletBtn')?.classList.remove('active');
  $('#studioPreviewFrame')?.classList.remove('tablet-mode');
  $('#studioPreviewFrame')?.classList.add('mobile-mode');
  toast('Switched to Mobile Phone view (390px)');
});

/* Undo button in Topbar */
$('#dashUndoBtn')?.addEventListener('click', () => {
  toast('Undid last visual change');
  renderStorefrontStudio();
});

/* =========================================================
   ENHANCED CATALOG DISPLAY & ACTIONS
   Zero-tech cards, table view, KPI stats, and instant inline edits
   ========================================================= */
function renderDashboardCatalog() {
  const cont = $('#boutiqueGrid');
  const tableCont = $('#catalogTableBody');
  const emptyStage = $('#catalogEmptyStage');
  if (!cont) return;

  // Filter items
  let items = [...state.products];
  const filterCat = state.catalogCategoryFilter || 'all';
  if (filterCat !== 'all') {
    items = items.filter(p => (p.type || 'physical').toLowerCase() === filterCat);
  }

  const query = (state.catalogSearch || '').toLowerCase().trim();
  if (query) {
    items = items.filter(p => (p.name || '').toLowerCase().includes(query) || (p.sku || '').toLowerCase().includes(query));
  }

  // Sort items
  const sort = state.catalogSort || 'newest';
  if (sort === 'price-low') {
    items.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
  } else if (sort === 'price-high') {
    items.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
  } else if (sort === 'name') {
    items.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  // Render KPI Bar
  const totalCount = state.products.length;
  const activeCount = state.products.filter(p => (parseInt(p.stock) || 0) > 0).length;
  const lowStockCount = state.products.filter(p => { const s = parseInt(p.stock) || 0; return s > 0 && s <= 10; }).length;
  const valuation = state.products.reduce((acc, p) => acc + (parseFloat(p.price) || 0) * (parseInt(p.stock) || 0), 0);

  const statTotal = $('#catStatTotal'); if (statTotal) statTotal.textContent = totalCount;
  const statActive = $('#catStatActive'); if (statActive) statActive.textContent = activeCount;
  const statLow = $('#catStatLowStock'); if (statLow) statLow.textContent = lowStockCount;
  const statVal = $('#catStatValuation'); if (statVal) statVal.textContent = `$${valuation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const countBadge = $('#catCountAll'); if (countBadge) countBadge.textContent = totalCount;

  // Handle empty state
  if (items.length === 0) {
    cont.innerHTML = '';
    if (tableCont) tableCont.innerHTML = '';
    if (emptyStage) emptyStage.hidden = false;
    return;
  }
  if (emptyStage) emptyStage.hidden = true;

  // Render Boutique Cards Grid
  cont.innerHTML = items.map(p => {
    const isAvailable = (parseInt(p.stock) || 0) > 0;
    const catLabel = (p.type || 'physical').toUpperCase();
    const fulfillLabel = (p.fulfillment || ['shipping', 'pickup']).map(f => {
      if (f === 'shipping') return 'Shipping';
      if (f === 'pickup') return 'Pickup';
      if (f === 'courier') return 'Courier';
      if (f === 'digital') return 'Instant Download';
      if (f === 'service') return 'Calendar Booking';
      return f;
    }).join(' • ');

    return `
      <div class="boutique-card" data-pid="${p.id}">
        <div class="boutique-card-media">
          <img src="${p.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80'}" alt="${esc(p.name)}" />
          <span class="boutique-type-tag">${catLabel}</span>
        </div>
        <div class="boutique-card-body">
          <h3 class="boutique-card-title">${esc(p.name || 'Untitled Product')}</h3>
          <div style="font-size:12px; color:var(--muted); margin-bottom:8px;">
            Fulfillment: ${fulfillLabel}
          </div>
          <div class="boutique-meta-row">
            <div class="boutique-price-chip" onclick="quickEditPrice('${p.id}')" title="Click to edit price">
              <b>$${parseFloat(p.price || 0).toFixed(2)}</b>
              <span style="font-size:12px; opacity:0.7;"><i class="ph-bold ph-pencil-simple"></i> Edit</span>
            </div>
            <button class="boutique-stock-toggle ${isAvailable ? 'in-stock' : 'sold-out'}" onclick="toggleStockStatus('${p.id}')">
              ${isAvailable ? '<i class="ph-bold ph-check"></i> In Stock' : '<i class="ph-bold ph-x"></i> Sold Out'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Render Table View
  if (tableCont) {
    tableCont.innerHTML = items.map(p => {
      const isAvailable = (parseInt(p.stock) || 0) > 0;
      return `
        <tr>
          <td><input type="checkbox" /></td>
          <td><img src="${p.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100'}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;" /></td>
          <td>
            <b>${esc(p.name)}</b>
            <div style="font-size:12px; color:var(--muted);">${esc(p.sku || 'SKU-AUTO')}</div>
          </td>
          <td><span class="pill" style="font-size:12px;">${p.type || 'physical'}</span></td>
          <td>${p.stock || '50'} units</td>
          <td><b>$${parseFloat(p.price || 0).toFixed(2)}</b></td>
          <td>
            <span class="${isAvailable ? 'status-indicator live' : 'status-indicator draft'}"></span>
            ${isAvailable ? 'Live on Store' : 'Draft / Sold Out'}
          </td>
          <td class="text-right">
            <button class="btn btn-ghost btn-xs" onclick="quickEditPrice('${p.id}')">Edit</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  updateDashboardCounts();
}

window.quickEditPrice = (id) => {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  const current = p.price || '0.00';
  const nextVal = prompt(`Enter new price for "${p.name}":`, current);
  if (nextVal !== null && nextVal.trim()) {
    p.price = parseFloat(nextVal.replace(/[^0-9.]/g, '')).toFixed(2);
    saveStoreState();
    renderDashboardCatalog();
    toast(`Updated ${p.name} price to $${p.price}`);
  }
};

window.toggleStockStatus = (id) => {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  p.stock = (parseInt(p.stock) || 0) > 0 ? 0 : 50;
  saveStoreState();
  renderDashboardCatalog();
  toast(`${p.name} marked as ${p.stock > 0 ? 'In Stock' : 'Sold Out'}`);
};

// ---------------------------------------------------------
// OneClerk AI Intelligent Natural-Language Catalog Creator
// ---------------------------------------------------------
let currentAiReviewProduct = null;

function parseArbitraryProductPrompt(text) {
  const raw = text.trim();
  const q = raw.toLowerCase();

  // Price extraction
  const priceMatch = raw.match(/\$?([0-9]+(?:\.[0-9]{1,2})?)/);
  const price = priceMatch ? parseFloat(priceMatch[1]).toFixed(2) : '38.00';

  // Stock extraction
  const stockMatch = raw.match(/\b(\d+)\s*(?:in stock|units|items|available|qty|count)\b/i) || raw.match(/\bstock\s*(?:of|:)?\s*(\d+)\b/i);
  const stock = stockMatch ? stockMatch[1] : '45';

  // Category determination
  let category = 'physical';
  if (q.includes('download') || q.includes('pdf') || q.includes('ebook') || q.includes('template') || q.includes('audio') || q.includes('preset') || q.includes('digital')) {
    category = 'digital';
  } else if (q.includes('consultation') || q.includes('coaching') || q.includes('strategy') || q.includes('session') || q.includes('service') || q.includes('booking') || q.includes('class') || q.includes('workshop')) {
    category = 'service';
  } else if (q.includes('subscription') || q.includes('membership') || q.includes('monthly') || q.includes('recurring')) {
    category = 'subscription';
  } else if (q.includes('cake') || q.includes('bread') || q.includes('sourdough') || q.includes('cookie') || q.includes('pastry') || q.includes('tea') || q.includes('coffee') || q.includes('food') || q.includes('bake')) {
    category = 'food';
  }

  // Name extraction
  let name = raw
    .replace(/\$?([0-9]+(?:\.[0-9]{1,2})?)/g, '')
    .replace(/\b(\d+)\s*(?:in stock|units|items|available|qty|count)\b/gi, '')
    .replace(/\bstock\s*(?:of|:)?\s*(\d+)\b/gi, '')
    .replace(/add\s+(?:a|an|the)?/gi, '')
    .replace(/create\s+(?:a|an|the)?/gi, '')
    .replace(/selling\s+for/gi, '')
    .replace(/in\s+stock/gi, '')
    .replace(/ready\s+to\s+ship/gi, '')
    .replace(/shipping\s*(?:&|and)?\s*pickup/gi, '')
    .replace(/pickup\s*(?:&|and)?\s*shipping/gi, '')
    .replace(/[\n\r,.]+/g, ' ')
    .trim();

  // Strip excessive whitespace
  name = name.replace(/\s+/g, ' ');
  if (!name || name.length < 3) {
    name = category === 'food' ? 'Artisan Sourdough Creation' : category === 'service' ? '1-on-1 Creative Consultation' : 'Handcrafted Boutique Piece';
  } else {
    // Truncate to clean title
    const words = name.split(' ');
    if (words.length > 7) name = words.slice(0, 6).join(' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Options / choices
  const options = [];
  ['Sand', 'Sage', 'Oatmeal', 'Charcoal', 'Terracotta', 'Amber', 'Small', 'Medium', 'Large'].forEach(opt => {
    if (q.includes(opt.toLowerCase())) options.push(opt);
  });
  if (!options.length) options.push('Studio Edition');

  // Curated imagery
  let imgUrl = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
  if (category === 'food' || q.includes('cake') || q.includes('sourdough') || q.includes('bread')) {
    imgUrl = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80';
  } else if (q.includes('candle') || q.includes('scent') || q.includes('wax')) {
    imgUrl = 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80';
  } else if (q.includes('linen') || q.includes('apron') || q.includes('tote')) {
    imgUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';
  } else if (category === 'service') {
    imgUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80';
  } else if (category === 'digital') {
    imgUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';
  }

  // Description in store tone
  const desc = `Handcrafted with care for ${state.storeName || 'our shop'}. Featuring considered materials, thoughtful proportions, and timeless aesthetic refinement.`;

  return {
    name,
    price,
    stock,
    category,
    options: options.join(', '),
    fulfillment: category === 'digital' || category === 'service' ? ['shipping'] : ['shipping', 'pickup'],
    description: desc,
    image: imgUrl
  };
}

function handleQuickAiCatalogCreate(promptText) {
  if (!promptText || !promptText.trim()) {
    toast('Please describe a product in plain English or click a prompt chip.');
    return;
  }

  toast('OneClerk AI parsing product details…');
  const parsed = parseArbitraryProductPrompt(promptText);
  currentAiReviewProduct = parsed;

  // Populate Review Modal
  const modal = $('#catalogAiReviewModal');
  if (!modal) return;

  $('#aiReviewNameInput').value = parsed.name;
  $('#aiReviewPriceInput').value = parsed.price;
  $('#aiReviewStockInput').value = parsed.stock;
  $('#aiReviewCategorySelect').value = parsed.category;
  $('#aiReviewCategoryBadge').textContent = parsed.category.toUpperCase();
  $('#aiReviewOptionsInput').value = parsed.options;
  $('#aiReviewDescInput').value = parsed.description;
  $('#aiReviewImgPreview').src = parsed.image;

  $('#aiReviewFulfillShipping').checked = parsed.fulfillment.includes('shipping');
  $('#aiReviewFulfillPickup').checked = parsed.fulfillment.includes('pickup');
  $('#aiReviewFulfillInstant').checked = parsed.category === 'digital' || parsed.category === 'service';

  modal.hidden = false;
}

// Wire quick creator buttons & chips
$('#quickAiProductBtn')?.addEventListener('click', () => {
  const val = $('#quickAiProductInput')?.value.trim();
  handleQuickAiCatalogCreate(val);
});

$$('.catalog-ai-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const prompt = chip.dataset.prompt;
    const inp = $('#quickAiProductInput');
    if (inp) inp.value = prompt;
    handleQuickAiCatalogCreate(prompt);
  });
});

$('#cancelAiReviewBtn')?.addEventListener('click', () => {
  const modal = $('#catalogAiReviewModal');
  if (modal) modal.hidden = true;
});

$('#confirmAiReviewBtn')?.addEventListener('click', () => {
  const name = $('#aiReviewNameInput')?.value.trim() || 'Artisan Product';
  const price = parseFloat($('#aiReviewPriceInput')?.value || 0).toFixed(2);
  const stock = $('#aiReviewStockInput')?.value.trim() || '50';
  const cat = $('#aiReviewCategorySelect')?.value || 'physical';
  const opts = ($('#aiReviewOptionsInput')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
  const desc = $('#aiReviewDescInput')?.value.trim() || '';
  const img = $('#aiReviewImgPreview')?.src || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600';

  const fulfills = [];
  if ($('#aiReviewFulfillShipping')?.checked) fulfills.push('shipping');
  if ($('#aiReviewFulfillPickup')?.checked) fulfills.push('pickup');
  if (!fulfills.length) fulfills.push('shipping');

  const p = newProduct(cat);
  p.name = name;
  p.price = price;
  p.stock = stock;
  p.category = cat;
  p.options = opts.length ? opts : ['Standard'];
  p.fulfillment = fulfills;
  p.description = desc;
  p.image = img;
  p.images = [{ id: 'img_' + Date.now(), url: img, alt: name, isCover: true }];

  state.products.unshift(p);
  saveStoreState();
  renderDashboardCatalog();
  renderStorefront();

  const modal = $('#catalogAiReviewModal');
  if (modal) modal.hidden = true;

  const inp = $('#quickAiProductInput');
  if (inp) inp.value = '';

  confetti();
  toast(`“${name}” confirmed and published to your catalog!`);
});

// Category filter tabs in Catalog
$$('#catalogTypeFilters .catalog-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('#catalogTypeFilters .catalog-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    state.catalogCategoryFilter = tab.dataset.type || 'all';
    renderDashboardCatalog();
  });
});

// Search input
$('#catalogSearchInput')?.addEventListener('input', (e) => {
  state.catalogSearch = e.target.value;
  renderDashboardCatalog();
});

// Sort select
$('#catalogSortSelect')?.addEventListener('change', (e) => {
  state.catalogSort = e.target.value;
  renderDashboardCatalog();
});

// View switchers (Cards vs Table)
$('#viewModeBoutiqueBtn')?.addEventListener('click', () => {
  $('#boutiqueGrid').hidden = false;
  $('#catalogTableWrap').hidden = true;
  $('#viewModeBoutiqueBtn').classList.add('active');
  $('#viewModeTableBtn').classList.remove('active');
});
$('#viewModeTableBtn')?.addEventListener('click', () => {
  $('#boutiqueGrid').hidden = true;
  $('#catalogTableWrap').hidden = false;
  $('#viewModeTableBtn').classList.add('active');
  $('#viewModeBoutiqueBtn').classList.remove('active');
});

// Empty stage buttons
$('#emptyAddProductBtn')?.addEventListener('click', () => openProductBuilder());
$('#emptySeedProductsBtn')?.addEventListener('click', () => {
  seedDemoStore();
  saveStoreState();
  renderDashboardCatalog();
  toast('Loaded 4 sample boutique items across categories!');
});

/* =========================================================
   TYPEFORM-STYLE INTERACTIVE PRODUCT BUILDER
   Interactive, 1-Question-at-a-Time Flow for Less Tech-Savvy Founders
   ========================================================= */
let tfModalStep = 1;

/* =========================================================
   FULL-PAGE TYPEFORM PRODUCT STUDIO CONTROLLER
   Pure Whitespace · Progressive Question Activation · Smooth Scroll
   ========================================================= */

let pbActiveQ = 1;
let pbMaxUnlockedQ = 1;
let pbObserverInitialized = false;

function updatePbProgress(qNum) {
  const numEl = $('#pbProgressNum');
  const fillEl = $('#pbProgressFill');
  if (qNum <= 5) {
    if (numEl) numEl.textContent = `Question ${qNum} of 5`;
    if (fillEl) fillEl.style.width = `${(qNum / 5) * 100}%`;
  } else {
    if (numEl) numEl.textContent = 'Ready to Launch';
    if (fillEl) fillEl.style.width = '100%';
  }
}

function unlockAndScrollTo(qNum) {
  const target = Math.max(1, Math.min(qNum, 6));
  pbMaxUnlockedQ = Math.max(pbMaxUnlockedQ, target);
  pbActiveQ = target;

  // Mark prior questions as completed & unlock target
  for (let i = 1; i <= 6; i++) {
    const qEl = $(`#pbQ${i}`);
    if (!qEl) continue;
    
    if (i < target) {
      qEl.classList.add('is-completed');
      qEl.classList.remove('is-locked', 'is-active');
    } else if (i === target) {
      qEl.classList.remove('is-locked');
      qEl.classList.add('is-active');
    } else if (i <= pbMaxUnlockedQ) {
      qEl.classList.remove('is-locked', 'is-active');
    } else {
      qEl.classList.add('is-locked');
      qEl.classList.remove('is-active', 'is-completed');
    }
  }

  // Smooth scroll target block into viewport center
  const targetEl = $(`#pbQ${target}`);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  updatePbProgress(target);

  // Auto-focus input for target question
  if (target === 2) {
    setTimeout(() => $('#modalProductName')?.focus(), 250);
  } else if (target === 3) {
    setTimeout(() => $('#modalProductPrice')?.focus(), 250);
  } else if (target === 6) {
    populatePbReviewRecap();
  }
}

function populatePbReviewRecap() {
  const rName = $('#tfReviewName');
  const rPrice = $('#tfReviewPrice');
  const rCat = $('#tfReviewCatPill');
  const rStock = $('#tfReviewStockPill');
  const rFulfill = $('#tfReviewFulfillPill');

  const pName = $('#modalProductName')?.value.trim() || 'Artisanal Product';
  const pPrice = $('#modalProductPrice')?.value.trim() || '0.00';
  const pCat = (state.productModalCategory || 'physical').toUpperCase();
  const pStock = $('#modalProductStock')?.value.trim() || '45';

  if (rName) rName.textContent = pName;
  if (rPrice) rPrice.textContent = `$${parseFloat(pPrice || 0).toFixed(2)}`;
  if (rCat) rCat.textContent = pCat;
  if (rStock) rStock.textContent = `In Stock (${pStock})`;
  if (rFulfill) {
    const fulfills = $$('#multiReceiveGrid .multi-receive-card.selected').map(c => c.dataset.fulfill);
    rFulfill.textContent = fulfills.length 
      ? fulfills.map(f => f === 'pickup' ? 'Studio Pickup' : f === 'courier' ? 'Local Courier' : 'Postal Shipping').join(' & ') 
      : 'Postal Shipping & Studio Pickup';
  }
}

function openProductBuilder() {
  pbActiveQ = 1;
  pbMaxUnlockedQ = 1;

  // Clear inputs
  const pName = $('#modalProductName'); if (pName) pName.value = '';
  const pPrice = $('#modalProductPrice'); if (pPrice) pPrice.value = '';
  const pDesc = $('#modalProductDesc'); if (pDesc) pDesc.value = '';
  const pStock = $('#modalProductStock'); if (pStock) pStock.value = '45';
  const pSku = $('#modalProductSku'); if (pSku) pSku.value = '';
  const pPrompt = $('#modalAiQuickPromptInput'); if (pPrompt) pPrompt.value = '';

  const suggList = $('#modalTitleSuggList'); if (suggList) suggList.innerHTML = '';
  const varTags = $('#modalVariantTags'); if (varTags) varTags.innerHTML = '';
  const dropIdle = $('#modalDropIdle'); if (dropIdle) dropIdle.hidden = false;
  const dropPreview = $('#modalDropPreview'); if (dropPreview) dropPreview.hidden = true;
  const previewImg = $('#modalPreviewImg'); if (previewImg) previewImg.src = '';

  // Reset category
  state.productModalCategory = 'physical';
  $$('#tfCatCardsGrid .tf-cat-card').forEach(t => t.classList.toggle('active', t.dataset.pcat === 'physical'));
  ['Physical', 'Digital', 'Service', 'Subscription', 'Food'].forEach(c => {
    const sec = $(`#catFields${c}`);
    if (sec) sec.hidden = (c !== 'Physical');
  });

  // Reset continue buttons
  const b2 = $('#pbQ2Continue'); if (b2) b2.disabled = true;
  const b3 = $('#pbQ3Continue'); if (b3) b3.disabled = true;

  // Reset question blocks: Q1 active, Q2-Q6 locked
  for (let i = 1; i <= 6; i++) {
    const qEl = $(`#pbQ${i}`);
    if (qEl) {
      if (i === 1) {
        qEl.classList.add('is-active');
        qEl.classList.remove('is-locked', 'is-completed');
      } else {
        qEl.classList.add('is-locked');
        qEl.classList.remove('is-active', 'is-completed');
      }
    }
  }

  // Live preview card default
  syncLiveCustomerCard({
    name: 'Artisanal Sourdough Country Loaf',
    price: '18.00',
    type: 'PHYSICAL',
    stock: '45',
    desc: 'Naturally leavened with wild starter, baked in heavy steam for a blistered, crackling crust and airy crumb.',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    options: ['Single Loaf', '2-Pack']
  });

  // Initialize multi-image gallery
  state.builderImages = [
    {
      id: 'img_default',
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      alt: 'Artisan sourdough country loaf with blistered crust in natural light',
      isCover: true
    }
  ];
  renderPbGallery();

  updatePbProgress(1);

  // Switch view to product builder
  setView('product-builder');

  // Initialize intersection observer once
  if (!pbObserverInitialized) {
    initPbIntersectionObserver();
    pbObserverInitialized = true;
  }

  // Scroll viewport to top
  const vp = $('#pbScrollViewport');
  if (vp) vp.scrollTo({ top: 0, behavior: 'smooth' });
}

function exitProductBuilder() {
  setView('dashboard');
  switchDashTab('catalog');
}

// Aliases for backward compatibility (hoisted functions)
function openAddProductModal() {
  openProductBuilder();
}
function closeAddProductModal() {
  exitProductBuilder();
}

// Wire exit triggers
$('#pbExitBtn')?.addEventListener('click', exitProductBuilder);
$('#pbDiscardBtn')?.addEventListener('click', exitProductBuilder);
$('#openAddProductModalBtn')?.addEventListener('click', openProductBuilder);

// Floating Chevrons
$('#tfScrollPrevBtn')?.addEventListener('click', () => {
  if (pbActiveQ > 1) {
    unlockAndScrollTo(pbActiveQ - 1);
  }
});

$('#tfScrollNextBtn')?.addEventListener('click', () => {
  if (pbActiveQ < pbMaxUnlockedQ) {
    unlockAndScrollTo(pbActiveQ + 1);
  } else if (pbActiveQ === 1) {
    unlockAndScrollTo(2);
  } else if (pbActiveQ === 2 && $('#modalProductName')?.value.trim().length >= 2) {
    unlockAndScrollTo(3);
  } else if (pbActiveQ === 3 && parseFloat($('#modalProductPrice')?.value || 0) > 0) {
    unlockAndScrollTo(4);
  } else if (pbActiveQ === 4) {
    unlockAndScrollTo(5);
  } else if (pbActiveQ === 5) {
    unlockAndScrollTo(6);
  }
});

// IntersectionObserver for free up/down scrolling feedback
function initPbIntersectionObserver() {
  const vp = $('#pbScrollViewport');
  if (!vp || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        const qNum = parseInt(entry.target.dataset.q, 10);
        if (qNum) {
          pbActiveQ = qNum;
          updatePbProgress(qNum);
          $$('.tf-q-block').forEach(b => b.classList.toggle('is-active', parseInt(b.dataset.q, 10) === qNum));
        }
      }
    });
  }, {
    root: vp,
    threshold: [0.4, 0.6]
  });

  $$('.tf-q-block').forEach(b => observer.observe(b));
}

// Keyboard navigation in viewport
$('#pbScrollViewport')?.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (pbActiveQ > 1) unlockAndScrollTo(pbActiveQ - 1);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (pbActiveQ < pbMaxUnlockedQ) unlockAndScrollTo(pbActiveQ + 1);
  }
});

// Question 1: Category Intent Cards & AI Autofill
$$('#tfCatCardsGrid .tf-cat-card').forEach(card => {
  card.addEventListener('click', () => {
    $$('#tfCatCardsGrid .tf-cat-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const pcat = card.dataset.pcat || 'physical';
    state.productModalCategory = pcat;

    ['Physical', 'Digital', 'Service', 'Subscription', 'Food'].forEach(c => {
      const sec = $(`#catFields${c}`);
      if (sec) sec.hidden = (c.toLowerCase() !== pcat);
    });

    const badge = $('#livePreviewCardType');
    if (badge) badge.textContent = pcat.toUpperCase();

    // Auto-advance to Q2
    setTimeout(() => unlockAndScrollTo(2), 220);
  });
});

$('#pbQ1Continue')?.addEventListener('click', () => unlockAndScrollTo(2));

// Instant One-Liner AI Autofill
$('#modalAiQuickFillBtn')?.addEventListener('click', () => {
  const promptInp = $('#modalAiQuickPromptInput');
  const val = promptInp ? promptInp.value.trim() : '';

  let name = 'Artisanal Ceramic Vase';
  let price = '48.00';
  let desc = 'Wheel-thrown stoneware with an organic speckled glaze and tapered neck for single florals.';

  if (val) {
    const priceMatch = val.match(/\$([0-9.]+)/);
    if (priceMatch) price = parseFloat(priceMatch[1]).toFixed(2);
    name = val.replace(/\$([0-9.]+)/, '').replace(/add/i, '').replace(/a /i, '').trim() || name;
    desc = `Crafted with patient craftsmanship, this ${name.toLowerCase()} offers tactile beauty and timeless everyday use.`;
  }

  $('#modalProductName').value = name;
  $('#modalProductPrice').value = price;
  $('#modalProductDesc').value = desc;

  const b2 = $('#pbQ2Continue'); if (b2) b2.disabled = false;
  const b3 = $('#pbQ3Continue'); if (b3) b3.disabled = false;

  syncLiveCustomerCard({ name, price, desc });
  toast('Instant AI Autofill applied! Stepping to review…');
  
  pbMaxUnlockedQ = 6;
  unlockAndScrollTo(6);
});

// Question 2: Product Name
$('#modalProductName')?.addEventListener('input', (e) => {
  const val = e.target.value.trim();
  const btn = $('#pbQ2Continue');
  if (btn) btn.disabled = val.length < 2;
  syncLiveCustomerCard({ name: val });
});

$('#modalProductName')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const val = $('#modalProductName')?.value.trim();
    if (val.length >= 2) unlockAndScrollTo(3);
  }
});

$('#pbQ2Continue')?.addEventListener('click', () => {
  const val = $('#modalProductName')?.value.trim();
  if (val.length >= 2) unlockAndScrollTo(3);
  else {
    toast('Please enter a product title to continue.');
    $('#modalProductName')?.focus();
  }
});

// Title suggestions
$('#modalAiTitleSuggBtn')?.addEventListener('click', () => {
  const data = CAT_DATA[state.category] || CAT_DATA.other;
  const list = pick(data.products, 3);
  const cont = $('#modalTitleSuggList');
  if (!cont) return;
  cont.innerHTML = list.map(t => `<button type="button" class="sugg-chip">${esc(t)}</button>`).join('');
  cont.onclick = (e) => {
    const btn = e.target.closest('.sugg-chip'); if (!btn) return;
    const nameVal = btn.textContent;
    $('#modalProductName').value = nameVal;
    const b2 = $('#pbQ2Continue'); if (b2) b2.disabled = false;
    syncLiveCustomerCard({ name: nameVal });
    cont.innerHTML = '';
  };
});

// Question 3: Selling Price
$('#modalProductPrice')?.addEventListener('input', (e) => {
  const val = e.target.value.trim();
  const num = parseFloat(val);
  const btn = $('#pbQ3Continue');
  if (btn) btn.disabled = isNaN(num) || num <= 0;
  syncLiveCustomerCard({ price: val });
});

$('#modalProductPrice')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const val = $('#modalProductPrice')?.value.trim();
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) unlockAndScrollTo(4);
  }
});

$('#pbQ3Continue')?.addEventListener('click', () => {
  const val = $('#modalProductPrice')?.value.trim();
  const num = parseFloat(val);
  if (!isNaN(num) && num > 0) unlockAndScrollTo(4);
  else {
    toast('Please set a selling price.');
    $('#modalProductPrice')?.focus();
  }
});

// Smart market price suggestion
$('#modalAiPriceBtn')?.addEventListener('click', () => {
  const avg = (CAT_DATA[state.category] || CAT_DATA.other).avgPrice || 42;
  const val = (avg + (Math.random() * 6 - 3)).toFixed(2);
  $('#modalProductPrice').value = val;
  const b3 = $('#pbQ3Continue'); if (b3) b3.disabled = false;
  syncLiveCustomerCard({ price: val });
  toast(`AI suggested market-optimal price: $${val}`);
});

// Question 4: Photo & Visuals (Multi-Image Gallery & AI Studio)
$('#pbQ4Continue')?.addEventListener('click', () => unlockAndScrollTo(5));
$('#pbQ4Skip')?.addEventListener('click', () => unlockAndScrollTo(5));

// Multi-Image Gallery State & Renderer
function renderPbGallery() {
  const container = $('#pbGalleryContainer');
  if (!container) return;

  if (!state.builderImages || !state.builderImages.length) {
    state.builderImages = [
      {
        id: 'img_default',
        url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        alt: 'Artisan sourdough country loaf in natural light',
        isCover: true
      }
    ];
  }

  container.innerHTML = state.builderImages.map((img, idx) => `
    <div class="pb-gallery-item ${img.isCover ? 'is-cover' : ''}" data-id="${img.id}">
      <div class="pb-gallery-thumb-wrap">
        <img src="${img.url}" alt="${esc(img.alt || 'Product image')}" />
        ${img.isCover ? '<span class="pb-gallery-cover-badge"><i class="ph-bold ph-star"></i> Cover Photo</span>' : ''}
        ${state.builderImages.length > 1 ? `<button class="pb-gallery-del-btn" data-del-id="${img.id}" type="button" title="Remove photo"><i class="ph ph-trash"></i></button>` : ''}
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
        <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">Image #${idx + 1}</span>
        ${!img.isCover ? `<button class="btn btn-ghost btn-xs pb-set-cover-btn" data-cover-id="${img.id}" type="button" style="font-size:12px; padding:2px 6px;">Set as Cover</button>` : '<span style="font-size:12px; font-weight:700; color:var(--text-primary);">Primary</span>'}
      </div>
      <div class="pb-alt-wrap">
        <div class="pb-alt-label">
          <span>Alt Text (Accessibility &amp; SEO)</span>
          <button class="pb-ai-alt-btn" data-alt-id="${img.id}" type="button">
            <i class="ph-bold ph-sparkle"></i> Suggest
          </button>
        </div>
        <input class="pb-alt-input" data-input-id="${img.id}" value="${esc(img.alt || '')}" placeholder="Describe image for screen readers…" />
      </div>
    </div>
  `).join('');

  // Update live preview card with cover image
  const cover = state.builderImages.find(i => i.isCover) || state.builderImages[0];
  if (cover) {
    syncLiveCustomerCard({ img: cover.url });
  }

  // Wire delete buttons
  container.querySelectorAll('.pb-gallery-del-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.delId;
      state.builderImages = state.builderImages.filter(i => i.id !== id);
      if (state.builderImages.length && !state.builderImages.some(i => i.isCover)) {
        state.builderImages[0].isCover = true;
      }
      renderPbGallery();
    });
  });

  // Wire set cover buttons
  container.querySelectorAll('.pb-set-cover-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.coverId;
      state.builderImages.forEach(i => { i.isCover = (i.id === id); });
      renderPbGallery();
      toast('Primary cover photo updated');
    });
  });

  // Wire alt text input changes
  container.querySelectorAll('.pb-alt-input').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const id = inp.dataset.inputId;
      const img = state.builderImages.find(i => i.id === id);
      if (img) img.alt = e.target.value.trim();
    });
  });

  // Wire AI Alt Text suggestions
  container.querySelectorAll('.pb-ai-alt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.altId;
      const img = state.builderImages.find(i => i.id === id);
      if (!img) return;

      const title = $('#modalProductName')?.value.trim() || 'Artisan product';
      const cat = (state.productModalCategory || 'physical').toLowerCase();
      const prompts = [
        `Studio shot of ${title.toLowerCase()} highlighting natural surface texture and handcrafted details.`,
        `Front view of ${title.toLowerCase()} on neutral background with soft contact shadow.`,
        `Elevated lifestyle angle of ${title.toLowerCase()} suitable for modern minimalist spaces.`,
        `Close-up artisan detail of ${title.toLowerCase()} showcasing fine materials and craftsmanship.`
      ];
      const selected = prompts[Math.floor(Math.random() * prompts.length)];
      img.alt = selected;
      const inp = container.querySelector(`.pb-alt-input[data-input-id="${id}"]`);
      if (inp) inp.value = selected;
      toast('AI wrote accessible alt text');
    });
  });
}

// Media multi-upload dropzone
$('#modalMediaDrop')?.addEventListener('click', (e) => {
  if (e.target.closest('button')) return;
  $('#modalImgFileInput').click();
});

$('#modalImgFileInput')?.addEventListener('change', async (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  toast(`Loading ${files.length} photo(s)…`);
  for (let idx = 0; idx < files.length; idx++) {
    const file = files[idx];
    const dataUrl = await fileToDataURL(file);
    const title = $('#modalProductName')?.value.trim() || 'Product';
    state.builderImages.push({
      id: 'img_' + Date.now() + '_' + idx,
      url: dataUrl,
      alt: `${title} - angle ${state.builderImages.length + 1}`,
      isCover: state.builderImages.length === 0
    });
  }

  renderPbGallery();
  toast(`${files.length} photo(s) added to gallery. Alt text ready!`);
});

// Prompt AI to Restyle / Improve Photo
$('#pbApplyRestyleBtn')?.addEventListener('click', async () => {
  const prompt = $('#pbRestylePromptInput')?.value.trim();
  if (!prompt) return toast('Please type a restyle instruction or choose a preset.');

  const cover = state.builderImages.find(i => i.isCover) || state.builderImages[0];
  if (!cover) return toast('No photo in gallery to restyle.');

  toast('Clerk AI re-rendering photo with new lighting & backdrop…');
  await sleep(650);

  const res = await aiEditImage({ original: cover.url, id: 'pb_restyle' }, prompt);
  cover.url = res.image;
  renderPbGallery();
  toast('Photo restyled with AI backdrop!');
});

// Restyle preset chips
$$('.pb-preset-chip[data-style]').forEach(chip => {
  chip.addEventListener('click', () => {
    const style = chip.dataset.style;
    const inp = $('#pbRestylePromptInput');
    if (inp) inp.value = style;
    $('#pbApplyRestyleBtn')?.click();
  });
});

// Generate New Product Photo with AI
$('#pbGenAiBtn')?.addEventListener('click', async () => {
  const prompt = $('#pbGenAiPromptInput')?.value.trim();
  if (!prompt) return toast('Please describe the photo you want AI to generate.');

  toast('Clerk AI generating high-resolution product photography…');
  await sleep(750);

  // High quality curated unsplash photography based on keywords
  const q = prompt.toLowerCase();
  let imgUrl = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
  if (q.includes('candle') || q.includes('wax') || q.includes('scent')) {
    imgUrl = 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80';
  } else if (q.includes('linen') || q.includes('tote') || q.includes('apron') || q.includes('fabric')) {
    imgUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';
  } else if (q.includes('bake') || q.includes('sourdough') || q.includes('bread') || q.includes('cake') || q.includes('pastry')) {
    imgUrl = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80';
  } else if (q.includes('mug') || q.includes('ceramic') || q.includes('tea') || q.includes('bowl')) {
    imgUrl = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
  } else if (q.includes('leather') || q.includes('bag') || q.includes('wallet')) {
    imgUrl = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80';
  }

  state.builderImages.push({
    id: 'ai_gen_' + Date.now(),
    url: imgUrl,
    alt: prompt,
    isCover: state.builderImages.length === 0
  });

  renderPbGallery();
  toast('New AI product photo added to your gallery!');
});

// Generate preset chips
$$('.pb-preset-chip[data-gen]').forEach(chip => {
  chip.addEventListener('click', () => {
    const gen = chip.dataset.gen;
    const inp = $('#pbGenAiPromptInput');
    if (inp) inp.value = gen;
    $('#pbGenAiBtn')?.click();
  });
});

// Question 5: Customer Choices, Delivery & Description
$('#pbQ5Continue')?.addEventListener('click', () => {
  populatePbReviewRecap();
  unlockAndScrollTo(6);
});

$('#modalProductDesc')?.addEventListener('input', (e) => syncLiveCustomerCard({ desc: e.target.value }));
$('#modalProductStock')?.addEventListener('input', (e) => syncLiveCustomerCard({ stock: e.target.value }));

// AI Description generator
$('#modalAiDescBtn')?.addEventListener('click', async () => {
  const title = $('#modalProductName').value.trim() || 'Artisanal item';
  const cat = state.productModalCategory || 'physical';
  toast('Clerk AI writing evocative story…');
  await sleep(500);
  const desc = `Thoughtfully crafted ${title.toLowerCase()} tailored for modern simplicity. Made from high-grade, sustainable materials with tactile refinement for lasting everyday enjoyment.`;
  $('#modalProductDesc').value = desc;
  syncLiveCustomerCard({ desc });
  toast('AI description crafted');
});

// Variant presets & custom tags
$('#presetSizesBtn')?.addEventListener('click', () => {
  ['Small', 'Medium', 'Large', 'Extra Large'].forEach(s => addVariantTag(s));
});

$('#presetColorsBtn')?.addEventListener('click', () => {
  ['Sand', 'Warm Charcoal', 'Linen White'].forEach(c => addVariantTag(c));
});

$('#presetScentsBtn')?.addEventListener('click', () => {
  ['Smoked Amber', 'Cedarwood & Bergamot', 'Vanilla Sea Salt'].forEach(s => addVariantTag(s));
});

$('#addCustomVariantBtn')?.addEventListener('click', () => {
  const inp = $('#customVariantInput');
  const val = inp?.value.trim();
  if (val) {
    addVariantTag(val);
    inp.value = '';
  }
});

$('#customVariantInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const val = e.target.value.trim();
    if (val) {
      addVariantTag(val);
      e.target.value = '';
    }
  }
});

function addVariantTag(text) {
  const cont = $('#modalVariantTags');
  if (!cont) return;
  const existing = $$('#modalVariantTags .variant-choice-tag span').map(s => s.textContent);
  if (existing.includes(text)) return;
  const span = document.createElement('span');
  span.className = 'variant-choice-tag';
  span.innerHTML = `<span>${esc(text)}</span><button type="button" aria-label="Remove option"><i class="ph ph-x"></i></button>`;
  span.querySelector('button').addEventListener('click', () => {
    span.remove();
    updateLiveChoices();
  });
  cont.appendChild(span);
  updateLiveChoices();
}

function updateLiveChoices() {
  const tags = $$('#modalVariantTags .variant-choice-tag span').map(s => s.textContent);
  syncLiveCustomerCard({ options: tags });
}

// Multi-receive selection (can choose multiple!)
$$('#multiReceiveGrid .multi-receive-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('selected'));
});

// Service duration pills
$$('#serviceDurationPills .duration-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    $$('#serviceDurationPills .duration-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// Subscription pills
$$('#subFrequencyPills .duration-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    $$('#subFrequencyPills .duration-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// Dietary tags
$$('#foodDietaryTags .diet-tag-btn').forEach(btn => {
  btn.addEventListener('click', () => btn.classList.toggle('active'));
});

// Digital file upload
$('#digitalFileDrop')?.addEventListener('click', () => $('#digitalFileInput').click());
$('#digitalFileInput')?.addEventListener('change', (e) => {
  if (e.target.files[0]) {
    $('#digitalFileNameDisplay').textContent = `Attached: ${e.target.files[0].name}`;
    toast(`File "${e.target.files[0].name}" attached for digital delivery!`);
  }
});

// Question 6: Launch Actions
$('#saveProductModalBtn')?.addEventListener('click', () => {
  const p = buildProductFromModal();
  if (!p) return;
  state.products.push(p);
  saveStoreState();
  renderDashboardCatalog();
  toast(`"${p.name}" added to your catalog!`);
  exitProductBuilder();
});

$('#saveAndAddAnotherBtn')?.addEventListener('click', () => {
  const p = buildProductFromModal();
  if (!p) return;
  state.products.push(p);
  saveStoreState();
  renderDashboardCatalog();
  toast(`Saved "${p.name}"! Starting next item…`);
  openProductBuilder();
});

function buildProductFromModal() {
  const name = $('#modalProductName')?.value.trim();
  const price = $('#modalProductPrice')?.value.trim();
  if (!name) {
    toast('Please enter a product name.');
    unlockAndScrollTo(2);
    $('#modalProductName')?.focus();
    return null;
  }

  const p = newProduct(state.productModalCategory || 'physical');
  p.name = name;
  p.price = price ? parseFloat(price).toFixed(2) : '0.00';
  p.description = $('#modalProductDesc')?.value.trim() || '';
  p.stock = $('#modalProductStock')?.value.trim() || '45';
  p.sku = $('#modalProductSku')?.value.trim() || `SKU-${Math.floor(1000 + Math.random() * 9000)}`;

  const fulfills = $$('#multiReceiveGrid .multi-receive-card.selected').map(c => c.dataset.fulfill);
  p.fulfillment = fulfills.length ? fulfills : ['shipping', 'pickup'];
  p.options = $$('#modalVariantTags .variant-choice-tag span').map(s => s.textContent);

  const coverImg = (state.builderImages && state.builderImages.find(i => i.isCover)) || (state.builderImages && state.builderImages[0]);
  if (coverImg && coverImg.url) {
    p.image = coverImg.url;
    p.images = [...state.builderImages];
  } else {
    p.image = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80';
    p.images = [{ id: 'img_default', url: p.image, alt: p.name, isCover: true }];
  }

  return p;
}

// Live customer card synchronization
function syncLiveCustomerCard(data) {
  if (data.name !== undefined) {
    const el = $('#livePreviewCardTitle');
    if (el) el.textContent = data.name || 'Untitled Product';
  }
  if (data.price !== undefined) {
    const priceVal = parseFloat(data.price || 0).toFixed(2);
    const pEl = $('#livePreviewCardPrice'); if (pEl) pEl.textContent = `$${priceVal}`;
    const bEl = $('#livePreviewBtnPrice'); if (bEl) bEl.textContent = `$${priceVal}`;
  }
  if (data.desc !== undefined) {
    const dEl = $('#livePreviewCardDesc');
    if (dEl) dEl.textContent = data.desc || 'No description entered yet.';
  }
  if (data.stock !== undefined) {
    const sEl = $('#livePreviewCardStock');
    const val = parseInt(data.stock, 10);
    if (sEl) {
      sEl.innerHTML = val > 0 
        ? '<span class="live-dot-pulse"></span> In Stock' 
        : '<span style="color:var(--text-tertiary);"><i class="ph ph-x"></i> Sold Out</span>';
    }
  }
  if (data.img) {
    const imgEl = $('#livePreviewCardImg');
    if (imgEl) imgEl.src = data.img;
  }
  if (data.options) {
    const cEl = $('#livePreviewCardChoices');
    if (cEl) {
      if (data.options.length) {
        cEl.innerHTML = data.options.map((opt, i) => `<span class="live-choice-pill ${i === 0 ? 'active' : ''}">${esc(opt)}</span>`).join('');
      } else {
        cEl.innerHTML = '<span class="live-choice-pill active">Standard</span>';
      }
    }
  }
}

/* =========================================================
   STOREFRONT STUDIO (TAB 6 / PORTAL)
   Whitespaced, Editorial Layouts for All 5 Conversion Screens
   ========================================================= */
function renderStorefrontStudio() {
  const brandLabel = $('#studioStoreBrandName');
  if (brandLabel) brandLabel.textContent = (state.storeName || "Mabel's").toUpperCase();

  const tplData = TEMPLATE_VIBES.find(t => t.id === state.template) || TEMPLATE_VIBES[0];
  const tplLabel = $('#currentTemplateLabel');
  if (tplLabel) tplLabel.textContent = tplData.name;

  const container = $('#studioScreenContainer');
  if (!container) return;

  const currentScreen = state.currentScreen || 'home';
  const brand = state.brand;
  const storeName = state.storeName || "Mabel's";
  const prods = state.products.length ? state.products : [
    { id: 'p1', name: 'Hand-thrown Ceramic Mug', price: '38.00', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600', fulfillment: ['shipping', 'pickup'] },
    { id: 'p2', name: 'Artisanal Sourdough Country Loaf', price: '14.00', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600', fulfillment: ['pickup'] }
  ];

  // Apply template typography & styling
  container.style.fontFamily = brand.bodyFont || tplData.fontBody;

  if (currentScreen === 'home') {
    container.innerHTML = `
      <!-- SCREEN 1: HOMEPAGE (Airy, Whitespaced Editorial) -->
      <div class="screen-view-page screen-home">
        <!-- Store Navigation Header -->
        <header class="store-nav-preview" style="border-bottom:1px solid rgba(0,0,0,0.06); padding:24px 44px; display:flex; justify-content:space-between; align-items:center; background:#fff;">
          <div style="display:flex; align-items:center; gap:14px;">
            ${brand.logo ? `<img src="${brand.logo}" style="height:36px; border-radius:6px;" alt="Logo" />` : ''}
            <span class="studio-editable" data-edit="storeName" style="font-family:${brand.headingFont || tplData.fontHeading}; font-size:24px; font-weight:700; color:${brand.primaryColor}; cursor:pointer;" title="Click to edit name">${esc(storeName)}</span>
          </div>
          <nav style="display:flex; gap:32px; font-size:13.5px; font-weight:500; color:#444;">
            <a href="#" style="color:inherit; text-decoration:none;">Shop All</a>
            <a href="#" style="color:inherit; text-decoration:none;">Our Story</a>
            <a href="#" style="color:inherit; text-decoration:none;">Contact</a>
          </nav>
          <div>
            <button class="btn btn-ghost btn-sm" type="button" style="border-radius:99px; padding:6px 16px; font-weight:600;" onclick="switchStudioScreen('cart')">
              <i class="ph-bold ph-shopping-bag"></i> Bag (${state.cart.length})
            </button>
          </div>
        </header>

        <!-- Spacious Hero Section -->
        <section class="store-hero-preview" style="padding:96px 44px; text-align:center; background:${tplData.bg};">
          <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:${brand.accentColor}; display:inline-block; margin-bottom:14px;">Handcrafted &amp; Sustainable</span>
          <h1 class="studio-editable" data-edit="heroHeadline" style="font-family:${brand.headingFont || tplData.fontHeading}; font-size:44px; line-height:1.2; max-width:720px; margin:0 auto 20px; color:${brand.primaryColor}; cursor:pointer;" title="Click to edit headline">${esc(brand.heroHeadline)}</h1>
          <p class="studio-editable" data-edit="heroSubtitle" style="font-size:16px; color:#555; max-width:580px; margin:0 auto 32px; line-height:1.6; cursor:pointer;" title="Click to edit subtitle">${esc(brand.heroSubtitle)}</p>
          <div>
            <button class="btn btn-primary" style="background:${brand.primaryColor}; color:#fff; border-radius:12px; padding:14px 34px; font-size:15px; font-weight:600; cursor:pointer; box-shadow:0 8px 24px rgba(0,0,0,0.12);" onclick="switchStudioScreen('pdp')">
              ${esc(brand.heroCta)}
            </button>
          </div>
        </section>

        <!-- Trust Ribbon with generous whitespace -->
        <div style="background:#fff; border-top:1px solid rgba(0,0,0,0.06); border-bottom:1px solid rgba(0,0,0,0.06); padding:20px 44px; display:flex; justify-content:space-around; font-size:13px; color:#666;">
          <span><i class="ph-bold ph-package"></i> Express Shipping</span>
          <span><i class="ph-bold ph-storefront"></i> Curbside Pickup Available</span>
          <span><i class="ph-bold ph-shield-check"></i> Safe 256-Bit SSL Checkout</span>
        </div>

        <!-- Featured Catalog Grid with generous card spacing -->
        <section style="padding:72px 44px; max-width:1040px; margin:0 auto;">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px;">
            <div>
              <h2 style="font-family:${brand.headingFont || tplData.fontHeading}; font-size:28px; color:${brand.primaryColor}; margin-bottom:6px;">Featured Collection</h2>
              <p style="font-size:14px; color:#777;">Thoughtfully crafted, fresh from our studio.</p>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="switchStudioScreen('pdp')">View Product Page →</button>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:32px;">
            ${prods.map(p => `
              <div class="sf-product-card" style="border:1px solid rgba(0,0,0,0.08); border-radius:16px; overflow:hidden; background:#fff; box-shadow:0 4px 16px rgba(0,0,0,0.03); transition:transform 0.2s, box-shadow 0.2s;">
                <div style="height:220px; overflow:hidden; position:relative;">
                  <img src="${p.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600'}" style="width:100%; height:100%; object-fit:cover;" alt="${esc(p.name)}" />
                  <span style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.7); color:#fff; font-size:12px; padding:3px 10px; border-radius:99px; font-weight:600;">${(p.type || 'PHYSICAL').toUpperCase()}</span>
                </div>
                <div style="padding:20px 22px;">
                  <h4 style="font-size:16px; margin-bottom:6px; font-weight:600; color:var(--text-primary);">${esc(p.name)}</h4>
                  <div style="font-size:15px; font-weight:700; color:${brand.primaryColor}; margin-bottom:14px;">$${parseFloat(p.price || 0).toFixed(2)}</div>
                  <button class="btn btn-ghost btn-sm" style="width:100%; border-color:${brand.primaryColor}; font-weight:600; border-radius:10px;" onclick="addToCartPreview('${p.id}')">
                    + Add to Bag
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  } else if (currentScreen === 'pdp') {
    const featured = prods[0];
    container.innerHTML = `
      <!-- SCREEN 2: PRODUCT DETAIL PAGE (Spacious 2-Col) -->
      <div class="screen-view-page screen-pdp" style="padding:64px 44px; max-width:980px; margin:0 auto;">
        <div style="font-size:13px; color:#888; margin-bottom:28px;">
          <a href="#" onclick="switchStudioScreen('home')" style="color:inherit; text-decoration:none;">Home</a> / 
          <span>Collection</span> / 
          <b>${esc(featured.name)}</b>
        </div>

        <div style="display:grid; grid-template-columns:1.1fr 1fr; gap:56px; align-items:start;">
          <!-- Left: High Res Gallery -->
          <div>
            <div style="border-radius:18px; overflow:hidden; height:400px; box-shadow:0 8px 30px rgba(0,0,0,0.06);">
              <img src="${featured.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600'}" style="width:100%; height:100%; object-fit:cover;" alt="PDP Image" />
            </div>
            <div style="display:flex; gap:12px; margin-top:16px;">
              <img src="${featured.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100'}" style="width:70px; height:70px; border-radius:10px; object-fit:cover; border:2px solid ${brand.accentColor};" />
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100" style="width:70px; height:70px; border-radius:10px; object-fit:cover; opacity:0.6;" />
            </div>
          </div>

          <!-- Right: Product Buy Details -->
          <div>
            <span class="pill" style="font-size:12px; margin-bottom:10px; display:inline-block;">${(featured.type || 'PHYSICAL').toUpperCase()}</span>
            <h1 class="studio-editable" data-edit="productName" style="font-family:${brand.headingFont || tplData.fontHeading}; font-size:34px; color:${brand.primaryColor}; margin-bottom:10px; cursor:pointer;" title="Click to edit">${esc(featured.name)}</h1>
            
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px; font-size:13.5px; color:#666;">
              <span style="color:#f59e0b;"><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i></span>
              <b>5.0</b> (48 verified customer reviews)
            </div>

            <div style="font-size:26px; font-weight:700; color:${brand.primaryColor}; margin-bottom:18px;">
              $${parseFloat(featured.price || 0).toFixed(2)}
            </div>

            <p style="font-size:14.5px; color:#555; line-height:1.6; margin-bottom:24px;">
              ${esc(featured.description || 'Thoughtfully crafted with patient care. Hand-finished for everyday use and timeless aesthetics.')}
            </p>

            <!-- Choices -->
            <div style="margin-bottom:24px;">
              <label style="font-size:12.5px; font-weight:600; display:block; margin-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">Select Option:</label>
              <div style="display:flex; gap:10px;">
                <button class="choice selected" style="padding:8px 18px; border-radius:8px; font-size:13px; font-weight:600;">Standard Edition</button>
                <button class="choice" style="padding:8px 18px; border-radius:8px; font-size:13px;">Gift Bundle (+10%)</button>
              </div>
            </div>

            <!-- Add to Bag CTA -->
            <div style="display:flex; gap:14px; margin-bottom:24px;">
              <button class="btn btn-primary" style="flex:1; background:${brand.primaryColor}; color:#fff; border-radius:12px; padding:14px; font-weight:600; font-size:15px; box-shadow:0 6px 20px rgba(0,0,0,0.1);" onclick="addToCartPreview('${featured.id}')">
                <i class="ph-bold ph-shopping-bag"></i> Add to Bag
              </button>
              <button class="btn btn-ghost" style="border-radius:12px; padding:14px 20px;" onclick="switchStudioScreen('cart')">
                View Bag →
              </button>
            </div>

            <!-- Guarantee -->
            <div style="font-size:12.5px; color:#777; border-top:1px solid #eee; padding-top:18px; line-height:1.8;">
              <div><i class="ph-bold ph-package"></i> Ships in 24 hours with plastic-free packaging</div>
              <div><i class="ph-bold ph-storefront"></i> Free curbside pickup ready in 2 hours</div>
              <div><i class="ph-bold ph-shield-check"></i> 30-day founder guarantee</div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (currentScreen === 'cart') {
    container.innerHTML = `
      <!-- SCREEN 3: BAG & EXPRESS CHECKOUT (Clean & Whitespaced) -->
      <div class="screen-view-page screen-cart" style="padding:64px 44px; max-width:920px; margin:0 auto;">
        <h1 style="font-family:${brand.headingFont || tplData.fontHeading}; font-size:32px; margin-bottom:28px; color:${brand.primaryColor};">Your Shopping Bag</h1>
        
        <div style="display:grid; grid-template-columns:1.6fr 1fr; gap:36px; align-items:start;">
          <!-- Left: Cart Items List -->
          <div style="background:#fff; border:1px solid rgba(0,0,0,0.08); border-radius:16px; padding:24px; box-shadow:0 4px 16px rgba(0,0,0,0.02);">
            <div style="display:flex; gap:18px; padding-bottom:20px; border-bottom:1px solid #eee;">
              <img src="${prods[0].image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=120'}" style="width:80px; height:80px; border-radius:10px; object-fit:cover;" />
              <div style="flex:1;">
                <h4 style="font-size:16px; margin-bottom:4px; font-weight:600;">${esc(prods[0].name)}</h4>
                <div style="font-size:13px; color:#777; margin-bottom:8px;">Standard · Curbside Pickup Ready</div>
                <b style="font-size:15px;">$${parseFloat(prods[0].price || 0).toFixed(2)}</b>
              </div>
            </div>

            <div style="margin-top:20px;">
              <label style="font-size:12.5px; font-weight:600; display:block; margin-bottom:8px;">Promo or Gift Code:</label>
              <div style="display:flex; gap:10px;">
                <input class="input" placeholder="SPRING20" value="SPRING20" style="font-size:13.5px;" />
                <button class="btn btn-ghost btn-sm" style="border-radius:8px;">Apply</button>
              </div>
            </div>
          </div>

          <!-- Right: Summary Card -->
          <div style="background:${tplData.bg}; border:1px solid rgba(0,0,0,0.08); border-radius:16px; padding:24px; box-shadow:0 4px 16px rgba(0,0,0,0.02);">
            <h3 style="font-size:17px; margin-bottom:16px; font-weight:700;">Order Summary</h3>
            <div style="display:flex; justify-content:space-between; font-size:14.5px; margin-bottom:10px;">
              <span>Subtotal</span>
              <b>$${parseFloat(prods[0].price || 0).toFixed(2)}</b>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:14.5px; margin-bottom:10px;">
              <span>Shipping</span>
              <span style="color:#121212; font-weight:600;">Free (Pickup)</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:17px; font-weight:700; border-top:1px solid rgba(0,0,0,0.1); padding-top:14px; margin-top:14px;">
              <span>Total</span>
              <span>$${parseFloat(prods[0].price || 0).toFixed(2)}</span>
            </div>

            <button class="btn btn-primary" style="width:100%; margin-top:22px; background:${brand.primaryColor}; color:#fff; border-radius:12px; padding:14px; font-weight:700; font-size:15px; box-shadow:0 8px 24px rgba(0,0,0,0.12);" onclick="switchStudioScreen('thankyou')">
              Pay with Apple Pay →
            </button>

            <div style="text-align:center; font-size:12.5px; color:#777; margin-top:14px;">
              <i class="ph-bold ph-lock-key"></i> Guaranteed Safe 256-Bit SSL Checkout
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (currentScreen === 'about') {
    container.innerHTML = `
      <!-- SCREEN 4: BRAND STORY (Editorial Whitespace) -->
      <div class="screen-view-page screen-about" style="padding:80px 44px; max-width:840px; margin:0 auto;">
        <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:${brand.accentColor}; display:block; margin-bottom:10px;">Origin &amp; Mission</span>
        <h1 class="studio-editable" data-edit="storyTitle" style="font-family:${brand.headingFont || tplData.fontHeading}; font-size:38px; color:${brand.primaryColor}; margin-bottom:24px; cursor:pointer;" title="Click to edit">The craft behind ${esc(storeName)}</h1>
        
        <div style="border-radius:16px; overflow:hidden; height:300px; margin-bottom:28px; box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&auto=format&fit=crop&q=80" style="width:100%; height:100%; object-fit:cover;" alt="Story studio" />
        </div>

        <p style="font-size:17px; line-height:1.75; color:#444; margin-bottom:28px;">
          “We started ${esc(storeName)} with a straightforward purpose: to create goods that are crafted with patience, human touch, and materials we personally know and trust. In an era of disposable mass production, we believe things should be built to last.”
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; margin:36px 0;">
          <div style="background:#fff; border:1px solid #eee; padding:20px; border-radius:12px;">
            <b style="display:block; margin-bottom:6px; font-size:15px;">1. Pure Ingredients</b>
            <span style="font-size:13px; color:#666; line-height:1.5;">Zero synthetic fillers or hidden shortcuts.</span>
          </div>
          <div style="background:#fff; border:1px solid #eee; padding:20px; border-radius:12px;">
            <b style="display:block; margin-bottom:6px; font-size:15px;">2. Local Community</b>
            <span style="font-size:13px; color:#666; line-height:1.5;">Curbside pickup directly from our workspace.</span>
          </div>
          <div style="background:#fff; border:1px solid #eee; padding:20px; border-radius:12px;">
            <b style="display:block; margin-bottom:6px; font-size:15px;">3. Direct Fair Value</b>
            <span style="font-size:13px; color:#666; line-height:1.5;">Independent pricing direct to you.</span>
          </div>
        </div>

        <div style="border-top:1px solid #eee; padding-top:24px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-family:${brand.headingFont || tplData.fontHeading}; font-size:19px;">— Alex Morgan, Founder</span>
          <button class="btn btn-ghost btn-sm" onclick="switchStudioScreen('home')">← Back to Shop</button>
        </div>
      </div>
    `;
  } else if (currentScreen === 'thankyou') {
    container.innerHTML = `
      <!-- SCREEN 5: ORDER CONFIRMATION (Celebratory & Serene) -->
      <div class="screen-view-page screen-thankyou" style="padding:80px 44px; max-width:700px; margin:0 auto; text-align:center;">
        <div style="width:72px; height:72px; border-radius:50%; background:var(--bg-canvas, #F5F4F0); color:#121212; display:inline-flex; align-items:center; justify-content:center; font-size:32px; margin-bottom:20px;">
          <i class="ph-bold ph-check"></i>
        </div>
        <h1 style="font-family:${brand.headingFont || tplData.fontHeading}; font-size:36px; color:${brand.primaryColor}; margin-bottom:10px;">Thank You for Your Order!</h1>
        <p style="font-size:15.5px; color:#666; margin-bottom:32px; line-height:1.5;">Order #4829 has been received and confirmed. A receipt is on its way to your email.</p>

        <!-- Progress delivery tracker -->
        <div style="background:#fff; border:1px solid #eee; border-radius:16px; padding:28px; text-align:left; margin-bottom:32px; box-shadow:0 4px 16px rgba(0,0,0,0.02);">
          <b style="font-size:14.5px; display:block; margin-bottom:18px;">Order Velocity &amp; Fulfillment Tracker:</b>
          <div style="display:flex; justify-content:space-between; position:relative; font-size:12.5px;">
            <div style="text-align:center; flex:1;">
              <div style="width:28px; height:28px; border-radius:50%; background:#121212; color:#fff; display:inline-flex; align-items:center; justify-content:center; margin-bottom:8px;"><i class="ph-bold ph-check"></i></div>
              <div style="font-weight:600;">Confirmed</div>
            </div>
            <div style="text-align:center; flex:1;">
              <div style="width:28px; height:28px; border-radius:50%; background:${brand.accentColor}; color:#fff; display:inline-flex; align-items:center; justify-content:center; margin-bottom:8px;"><i class="ph-bold ph-package"></i></div>
              <div style="font-weight:600;">Packaging</div>
            </div>
            <div style="text-align:center; flex:1;">
              <div style="width:28px; height:28px; border-radius:50%; background:#e5e7eb; color:#888; display:inline-flex; align-items:center; justify-content:center; margin-bottom:8px;"><i class="ph-bold ph-storefront"></i></div>
              <div style="color:#888;">Ready for Pickup</div>
            </div>
          </div>
        </div>

        <button class="btn btn-primary" style="background:${brand.primaryColor}; color:#fff; border-radius:12px; padding:12px 28px; font-weight:600;" onclick="switchStudioScreen('home')">
          Continue Exploring Shop →
        </button>
      </div>
    `;
  } else {
    // Check if currentScreen is a user custom page created via Form or Clerk AI
    const customPage = (state.customPages || []).find(p => p.id === currentScreen);
    if (customPage) {
      container.innerHTML = customPage.html || `
        <div class="custom-page-container" style="padding:60px 44px; text-align:center;">
          <h1 class="studio-editable" data-edit="pageTitle" style="font-family:${brand.headingFont || tplData.fontHeading}; font-size:36px; color:${brand.primaryColor};">${esc(customPage.title)}</h1>
          <p class="studio-editable" data-edit="pageDesc" style="font-size:16px; color:#555; max-width:600px; margin:20px auto;">${esc(customPage.desc || 'Custom page generated by Clerk AI.')}</p>
          <button class="btn btn-secondary btn-sm" onclick="switchStudioScreen('home')">← Back to Homepage</button>
        </div>
      `;
    } else {
      // Fallback to home screen if unknown
      switchStudioScreen('home');
      return;
    }
  }

  // Attach direct click-to-edit on preview elements
  container.querySelectorAll('.studio-editable').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const field = el.dataset.edit;
      const current = el.textContent.trim();
      const nextVal = prompt(`Edit ${field}:`, current);
      if (nextVal !== null && nextVal.trim()) {
        el.textContent = nextVal.trim();
        if (field === 'heroHeadline') state.brand.heroHeadline = nextVal.trim();
        if (field === 'heroSubtitle') state.brand.heroSubtitle = nextVal.trim();
        if (field === 'storeName') updateStoreName(nextVal.trim());
        saveStoreState();
        toast(`Updated ${field}! Saved to store.`);
      }
    });
  });
}

window.switchStudioScreen = (screenName) => {
  state.currentScreen = screenName;
  $$('#studioScreenSwitcher .screen-btn').forEach(b => b.classList.toggle('active', b.dataset.screen === screenName));
  $$('#pagesDropdownMenu .page-menu-item').forEach(i => i.classList.toggle('active', i.dataset.screen === screenName));
  renderStorefrontStudio();
  toast(`Switched to ${screenName.toUpperCase()} screen`);
};

window.addToCartPreview = (id) => {
  const p = state.products.find(x => x.id === id) || state.products[0];
  if (p) state.cart.push(p);
  toast(`Added "${p ? p.name : 'Item'}" to bag! Check out in the Cart screen.`);
  renderStorefrontStudio();
};

// Screen switcher tabs in topbar
$$('#studioScreenSwitcher .screen-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.screen) switchStudioScreen(btn.dataset.screen);
  });
});

// Template selector dropdown
$('#studioTplSelectBtn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  const m = $('#studioTemplateMenu');
  if (m) m.hidden = !m.hidden;
});

document.addEventListener('click', (e) => {
  const m = $('#studioTemplateMenu');
  if (m && !m.hidden && !e.target.closest('.studio-template-dropdown-wrap')) {
    m.hidden = true;
  }
});

$$('#studioTemplateMenu .tpl-menu-item').forEach(item => {
  item.addEventListener('click', () => {
    $$('#studioTemplateMenu .tpl-menu-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const tplId = item.dataset.tpl;
    setTemplateTheme(tplId);
    $('#studioTemplateMenu').hidden = true;
  });
});

// Inspector template cards
$$('.studio-tpl-cards-list .studio-tpl-card').forEach(card => {
  card.addEventListener('click', () => {
    $$('.studio-tpl-cards-list .studio-tpl-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const tplId = card.dataset.tpl;
    setTemplateTheme(tplId);
  });
});

function setTemplateTheme(tplId) {
  state.template = tplId;
  const tpl = TEMPLATE_VIBES.find(t => t.id === tplId) || TEMPLATE_VIBES[0];
  state.brand.headingFont = tpl.fontHeading;
  state.brand.bodyFont = tpl.fontBody;
  state.brand.primaryColor = tpl.primary;
  state.brand.accentColor = tpl.accent;
  saveStoreState();
  renderStorefrontStudio();
  toast(`Template updated to: ${tpl.name}`);
}

// Pages dropdown popover
$('#pagesDropdownBtn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  const menu = $('#pagesDropdownMenu');
  if (menu) menu.hidden = !menu.hidden;
});

document.addEventListener('click', (e) => {
  const menu = $('#pagesDropdownMenu');
  if (menu && !menu.hidden && !e.target.closest('.pages-dropdown-wrap')) {
    menu.hidden = true;
  }
});

$$('.page-menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const screen = item.dataset.screen;
    if (screen) switchStudioScreen(screen);
    $('#pagesDropdownMenu').hidden = true;
  });
});

// =========================================================
// CUSTOM PAGES & CLERK AI PAGE GENERATOR CONTROLLER
// Dual Creation Paths: Quick Spec Form OR/AND Chatbot Prompt
// =========================================================

// Initialize custom pages ribbon and dropdown menu on load
setTimeout(() => {
  if (typeof refreshScreensRibbon === 'function') refreshScreensRibbon();
  if (typeof refreshPagesDropdownMenu === 'function') refreshPagesDropdownMenu();
}, 200);


const CORE_STORE_SCREENS = [
  { key: 'home', name: 'Homepage', triggers: ['home', 'homepage', 'frontpage', 'main page', 'landing page', 'index'] },
  { key: 'pdp', name: 'Product Detail Page (PDP)', triggers: ['product page', 'pdp', 'item page', 'single product', 'product detail', 'product view'] },
  { key: 'cart', name: 'Bag & Express Checkout', triggers: ['cart', 'checkout', 'bag', 'slide cart', 'basket', 'shopping bag', 'order bag'] },
  { key: 'about', name: 'Brand Story / About Us', triggers: ['about', 'story', 'our story', 'founder', 'brand story', 'about us', 'mission'] },
  { key: 'thankyou', name: 'Order Confirmation', triggers: ['thank you', 'confirmation', 'receipt', 'order confirmation', 'thankyou', 'success page'] }
];

function checkExistingCoreScreen(text = '') {
  const lower = text.toLowerCase().trim();
  for (const cs of CORE_STORE_SCREENS) {
    if (cs.triggers.some(t => lower === t || lower.includes(t))) {
      return cs;
    }
  }
  return null;
}

// Helpers
function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\\s+/g, '-')
    .replace(/[^\\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '') || 'custom-page';
}

function updateSlugPreview() {
  const title = $('#newPageTitleInput')?.value || '';
  const preview = $('#newPageSlugPreview');
  if (preview) {
    preview.textContent = slugify(title);
  }
}

function updateTemplateHarmonyCard() {
  const tplData = TEMPLATE_VIBES.find(t => t.id === state.template) || TEMPLATE_VIBES[0];
  const nameEl = $('#harmonyTplName');
  const descEl = $('#harmonyTplDesc');
  const chatTpl = $('#chatTplName');
  if (nameEl) nameEl.textContent = tplData.name;
  if (chatTpl) chatTpl.textContent = tplData.name;
  if (descEl) {
    descEl.textContent = `Clerk will automatically align heading typography (${tplData.fontHeading}), brand swatches (${state.brand.primaryColor || tplData.primary} / ${state.brand.accentColor || tplData.accent}), and sensory ${tplData.vibe.toLowerCase()} voice.`;
  }
}

// Modal open/close handlers
window.openNewPageModal = (initialTab = 'form') => {
  const modal = $('#newPageModal');
  if (!modal) return;
  modal.hidden = false;
  switchNewPageTab(initialTab);
  updateTemplateHarmonyCard();
  updateSlugPreview();
};

window.closeNewPageModal = () => {
  const modal = $('#newPageModal');
  if (modal) modal.hidden = true;
  const overlay = $('#pageGeneratingOverlay');
  if (overlay) overlay.hidden = true;
};

function switchNewPageTab(tabKey) {
  const isForm = tabKey === 'form';
  const tabForm = $('#modeTabForm');
  const tabChat = $('#modeTabChat');
  const paneForm = $('#newPageFormPane');
  const paneChat = $('#newPageChatPane');

  if (tabForm) tabForm.classList.toggle('active', isForm);
  if (tabChat) tabChat.classList.toggle('active', !isForm);
  if (paneForm) paneForm.hidden = !isForm;
  if (paneChat) paneChat.hidden = isForm;

  if (isForm) {
    setTimeout(() => $('#newPageTitleInput')?.focus(), 80);
  } else {
    setTimeout(() => $('#pageChatInput')?.focus(), 80);
  }
}

// Wire modal buttons
$('#modeTabForm')?.addEventListener('click', () => switchNewPageTab('form'));
$('#modeTabChat')?.addEventListener('click', () => switchNewPageTab('chat'));
$('#closeNewPageModalBtn')?.addEventListener('click', closeNewPageModal);
$('#cancelNewPageBtn')?.addEventListener('click', closeNewPageModal);

// Archetype chip clicks
$$('#pageTypeChipsGrid .type-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    $$('#pageTypeChipsGrid .type-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const title = chip.dataset.title || '';
    const desc = chip.dataset.desc || '';
    const titleInp = $('#newPageTitleInput');
    const descInp = $('#newPageDescInput');
    if (titleInp) titleInp.value = title;
    if (descInp) descInp.value = desc;
    updateSlugPreview();
  });
});

$('#newPageTitleInput')?.addEventListener('input', updateSlugPreview);

// Generate from Form button
$('#generatePageFromFormBtn')?.addEventListener('click', () => {
  const activeChip = $('#pageTypeChipsGrid .type-chip.active');
  const type = activeChip ? activeChip.dataset.type : 'custom';
  const title = $('#newPageTitleInput')?.value.trim() || 'Custom Page';
  const desc = $('#newPageDescInput')?.value.trim() || '';

  // Check collision with existing core template screens
  const matchedCore = checkExistingCoreScreen(title) || checkExistingCoreScreen(desc);
  if (matchedCore) {
    const harmonyDesc = $('#harmonyTplDesc');
    if (harmonyDesc) {
      harmonyDesc.innerHTML = `<span style="color:#121212; font-weight:600;"><i class="ph-bold ph-info"></i> Note:</span> <b>${matchedCore.name}</b> already exists in your active template! Opening existing canvas view.`;
    }
    toast(`"${matchedCore.name}" is already a predesigned template screen. Navigating to canvas.`);
    closeNewPageModal();
    switchStudioScreen(matchedCore.key);
    setView('dashboard');
    switchDashTab('storefront');
    return;
  }

  // Also check if user already created a custom page with this slug
  const testSlug = slugify(title);
  const existingCustom = (state.customPages || []).find(p => p.slug === testSlug);
  if (existingCustom) {
    toast(`Page "/pages/${testSlug}" already exists in your store. Navigating to canvas.`);
    closeNewPageModal();
    switchStudioScreen(existingCustom.id);
    setView('dashboard');
    switchDashTab('storefront');
    return;
  }

  executePageGeneration({
    type,
    title,
    desc,
    source: 'form'
  });
});

// Prompt pill clicks in Chat pane
$$('#pageChatHistory .chat-prompt-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const promptText = pill.dataset.prompt || pill.textContent.trim();
    const chatInput = $('#pageChatInput');
    if (chatInput) {
      chatInput.value = promptText;
      handlePageChatSubmit();
    }
  });
});

// Chat input and send button
$('#pageChatSendBtn')?.addEventListener('click', handlePageChatSubmit);
$('#pageChatInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handlePageChatSubmit();
  }
});

function appendPageChatMessage(role, htmlContent) {
  const history = $('#pageChatHistory');
  if (!history) return;
  const msg = document.createElement('div');
  msg.className = `page-chat-msg ${role}`;
  msg.innerHTML = `
    <div class="page-chat-avatar"><i class="${role === 'user' ? 'ph-bold ph-user' : 'ph-bold ph-sparkle'}"></i></div>
    <div class="page-chat-bubble">${htmlContent}</div>
  `;
  history.appendChild(msg);
  history.scrollTop = history.scrollHeight;
}

function handlePageChatSubmit() {
  const input = $('#pageChatInput');
  if (!input) return;
  const prompt = input.value.trim();
  if (!prompt) return;
  input.value = '';

  // 1. Add user bubble
  appendPageChatMessage('user', `<p>${esc(prompt)}</p>`);

  // 2. Check if user is asking for an existing core template screen
  const pLower = prompt.toLowerCase();
  const matchedCore = checkExistingCoreScreen(prompt);

  // If asking to open/edit or create a duplicate of an existing core template page
  if (matchedCore) {
    const isExplicitNew = pLower.includes('new lookbook') || pLower.includes('custom') || pLower.includes('b2b') || pLower.includes('press');
    if (!isExplicitNew) {
      setTimeout(() => {
        const tplData = TEMPLATE_VIBES.find(t => t.id === state.template) || TEMPLATE_VIBES[0];
        appendPageChatMessage('bot', `
          <p><b>Predesigned Template Screen Detected:</b></p>
          <p style="margin-top:4px;">You already have an optimized, conversion-ready <b>${matchedCore.name}</b> built into your active <b>${tplData.name}</b> template guide.</p>
          <div style="background:rgba(18,18,18,0.03); border:1px solid rgba(18,18,18,0.08); border-radius:12px; padding:12px 14px; margin:10px 0; font-size:12.5px; line-height:1.5;">
            <div><b>Status:</b> Ready on Canvas</div>
            <div><b>Typography:</b> ${tplData.fontHeading} + ${tplData.fontBody}</div>
            <div><b>Colorway:</b> ${state.brand.primaryColor || tplData.primary} / ${state.brand.accentColor || tplData.accent}</div>
            <div style="margin-top:4px; color:var(--text-secondary);">No duplicate page generation needed. You can edit this screen directly.</div>
          </div>
          <div style="margin-top:10px; display:flex; gap:8px;">
            <button class="btn btn-primary btn-sm" type="button" onclick="closeNewPageModal(); switchStudioScreen('${matchedCore.key}'); setView('dashboard'); switchDashTab('storefront');" style="background:#121212; color:#fff;">
              <i class="ph-bold ph-arrow-square-out"></i> Jump to ${matchedCore.name} on Canvas
            </button>
          </div>
        `);
      }, 350);
      return;
    }
  }

  // Check if user is referencing an already generated custom page
  const matchedCustom = (state.customPages || []).find(p => pLower.includes(p.title.toLowerCase()) || pLower.includes(p.slug));
  if (matchedCustom && !pLower.includes('create another') && !pLower.includes('generate another')) {
    setTimeout(() => {
      appendPageChatMessage('bot', `
        <p><b>Existing Custom Page:</b> You have already created <b>"${esc(matchedCustom.title)}"</b> (<code>/pages/${matchedCustom.slug}</code>).</p>
        <div style="margin-top:10px;">
          <button class="btn btn-secondary btn-sm" type="button" onclick="closeNewPageModal(); switchStudioScreen('${matchedCustom.id}'); setView('dashboard'); switchDashTab('storefront');">
            <i class="ph ph-arrow-square-out"></i> Open "${esc(matchedCustom.title)}" on Canvas
          </button>
        </div>
      `);
    }, 350);
    return;
  }

  // 3. Infer page archetype and generate blueprint proposal
  let inferredType = 'lookbook';
  let inferredTitle = 'Seasonal Lookbook';
  if (pLower.includes('wholesale') || pLower.includes('b2b') || pLower.includes('stockist')) {
    inferredType = 'wholesale';
    inferredTitle = 'Wholesale & Stockists';
  } else if (pLower.includes('care') || pLower.includes('sizing') || pLower.includes('size') || pLower.includes('wash') || pLower.includes('material')) {
    inferredType = 'care';
    inferredTitle = 'Care & Sizing Guide';
  } else if (pLower.includes('press') || pLower.includes('news') || pLower.includes('award') || pLower.includes('media')) {
    inferredType = 'press';
    inferredTitle = 'Press & Editorial Honors';
  } else if (pLower.includes('event') || pLower.includes('workshop') || pLower.includes('class') || pLower.includes('pop-up') || pLower.includes('tasting')) {
    inferredType = 'events';
    inferredTitle = 'Workshops & Events';
  } else if (pLower.includes('faq') || pLower.includes('help') || pLower.includes('policy') || pLower.includes('shipping info')) {
    inferredType = 'faq';
    inferredTitle = 'FAQ & Customer Care';
  } else {
    inferredType = 'custom';
    inferredTitle = prompt.length > 30 ? prompt.slice(0, 30) + '…' : prompt;
  }

  const tplData = TEMPLATE_VIBES.find(t => t.id === state.template) || TEMPLATE_VIBES[0];

  setTimeout(() => {
    appendPageChatMessage('bot', `
      <p>I have prepared a custom layout blueprint for: <b>"${esc(inferredTitle)}"</b>.</p>
      <div style="background:rgba(18,18,18,0.03); border:1px solid rgba(18,18,18,0.08); border-radius:12px; padding:12px 14px; margin:8px 0; font-size:12.5px; line-height:1.5;">
        <div><b>Archetype:</b> ${inferredType.toUpperCase()}</div>
        <div><b>Template Harmony:</b> ${tplData.name} (${tplData.fontHeading} + ${state.brand.primaryColor})</div>
        <div><b>Proposed Sections:</b> Hero Banner, Responsive Multi-column Grid, Interactive Specs, Call-to-Action</div>
      </div>
      <p style="font-size:13px; color:var(--text-secondary);">Ready to synthesize the HTML &amp; mount it to your canvas?</p>
      <div style="margin-top:10px; display:flex; gap:8px;">
        <button class="btn btn-primary btn-sm" type="button" id="triggerChatGenBtn" style="background:#121212; color:#fff;">
          <i class="ph-bold ph-sparkle"></i> Generate Page &amp; View on Canvas
        </button>
      </div>
    `);

    $('#triggerChatGenBtn')?.addEventListener('click', () => {
      executePageGeneration({
        type: inferredType,
        title: inferredTitle,
        desc: prompt,
        source: 'chat'
      });
    });
  }, 500);
}

// Execution engine with animated steps overlay
function executePageGeneration({ type, title, desc, source }) {
  const overlay = $('#pageGeneratingOverlay');
  if (overlay) overlay.hidden = false;

  const tplData = TEMPLATE_VIBES.find(t => t.id === state.template) || TEMPLATE_VIBES[0];
  const pageId = 'page_' + Date.now();
  const slug = slugify(title);

  const steps = [
    { id: 'genStep1', time: 350 },
    { id: 'genStep2', time: 700 },
    { id: 'genStep3', time: 1050 },
    { id: 'genStep4', time: 1400 }
  ];

  steps.forEach(s => {
    setTimeout(() => {
      const el = $(`#${s.id}`);
      if (el) {
        el.className = 'gen-step done';
        el.querySelector('i').className = 'ph-bold ph-check';
      }
      const nextStepIdx = steps.findIndex(x => x.id === s.id) + 1;
      if (nextStepIdx < steps.length) {
        const nextEl = $(`#${steps[nextStepIdx].id}`);
        if (nextEl) {
          nextEl.className = 'gen-step active';
          nextEl.querySelector('i').className = 'ph-bold ph-spinner ph-spin';
        }
      }
    }, s.time);
  });

  setTimeout(() => {
    // Generate bespoke semantic HTML for the page archetype matching active template
    const pageHtml = generateCustomPageHtml({
      id: pageId,
      type,
      title,
      slug,
      desc,
      tpl: tplData,
      brand: state.brand,
      storeName: state.storeName || "Mabel's"
    });

    const newPageObj = {
      id: pageId,
      type,
      title,
      slug,
      desc,
      templateId: state.template,
      html: pageHtml,
      createdAt: new Date().toISOString()
    };

    if (!state.customPages) state.customPages = [];
    state.customPages.push(newPageObj);
    saveStoreState();

    // Close modal & overlay
    if (overlay) overlay.hidden = true;
    closeNewPageModal();

    // Reset steps state for next usage
    steps.forEach((s, idx) => {
      const el = $(`#${s.id}`);
      if (el) {
        el.className = idx === 0 ? 'gen-step done' : (idx === 1 ? 'gen-step active' : 'gen-step');
        el.querySelector('i').className = idx === 0 ? 'ph-bold ph-check' : (idx === 1 ? 'ph-bold ph-spinner ph-spin' : 'ph-bold ph-circle');
      }
    });

    // Update screen switcher ribbon & pages dropdown
    refreshScreensRibbon();
    refreshPagesDropdownMenu();

    // Switch to new page screen
    switchStudioScreen(pageId);
    toast(`Page "${title}" generated successfully with Clerk AI!`);
  }, 1600);
}

// Custom Page HTML Synthesizer
function generateCustomPageHtml({ id, type, title, slug, desc, tpl, brand, storeName }) {
  const headingFont = brand.headingFont || tpl.fontHeading;
  const primary = brand.primaryColor || tpl.primary;
  const accent = brand.accentColor || tpl.accent;

  // Archetype body generation
  let bodyContent = '';

  if (type === 'lookbook') {
    bodyContent = `
      <div style="padding:60px 44px; max-width:1120px; margin:0 auto;">
        <!-- Editorial Header -->
        <div style="text-align:center; max-width:760px; margin:0 auto 48px;">
          <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:${accent}; display:inline-block; margin-bottom:12px;">Editorial Lookbook</span>
          <h1 class="studio-editable" data-edit="pageTitle" style="font-family:${headingFont}; font-size:46px; line-height:1.2; color:${primary}; margin:0 0 16px;">${esc(title)}</h1>
          <p class="studio-editable" data-edit="pageDesc" style="font-size:16px; color:#555; line-height:1.6; margin:0;">${esc(desc || 'Handcrafted objects photographed in natural daylight. Capturing timeless form, raw textures, and everyday serenity.')}</p>
        </div>

        <!-- 3-Column Photography Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:24px; margin-bottom:48px;">
          <div style="background:#fff; border:1px solid #eee; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.03);">
            <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80" style="width:100%; height:320px; object-fit:cover;" alt="Ceramic Mug" />
            <div style="padding:20px;">
              <span style="font-size:12px; font-weight:600; text-transform:uppercase; color:${accent};">Series 01</span>
              <h3 style="font-family:${headingFont}; font-size:22px; margin:6px 0; color:${primary};">Earthy Glaze Studies</h3>
              <p style="font-size:13.5px; color:#666; line-height:1.5;">Hand-thrown stoneware finished with natural iron speckle glaze.</p>
              <button class="btn btn-secondary btn-sm" style="margin-top:10px; width:100%;" onclick="switchStudioScreen('pdp')">View Featured Piece →</button>
            </div>
          </div>

          <div style="background:#fff; border:1px solid #eee; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.03);">
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80" style="width:100%; height:320px; object-fit:cover;" alt="Artisan Loaf" />
            <div style="padding:20px;">
              <span style="font-size:12px; font-weight:600; text-transform:uppercase; color:${accent};">Series 02</span>
              <h3 style="font-family:${headingFont}; font-size:22px; margin:6px 0; color:${primary};">Slow Morning Rituals</h3>
              <p style="font-size:13.5px; color:#666; line-height:1.5;">Stone-milled flours baked dark for caramel crust and deep flavor.</p>
              <button class="btn btn-secondary btn-sm" style="margin-top:10px; width:100%;" onclick="switchStudioScreen('pdp')">View Featured Piece →</button>
            </div>
          </div>

          <div style="background:#fff; border:1px solid #eee; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.03);">
            <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80" style="width:100%; height:320px; object-fit:cover;" alt="Pantry & Botanical" />
            <div style="padding:20px;">
              <span style="font-size:12px; font-weight:600; text-transform:uppercase; color:${accent};">Series 03</span>
              <h3 style="font-family:${headingFont}; font-size:22px; margin:6px 0; color:${primary};">Small-Batch Preserves</h3>
              <p style="font-size:13.5px; color:#666; line-height:1.5;">Organic citrus and seasonal botanicals cooked in traditional copper pans.</p>
              <button class="btn btn-secondary btn-sm" style="margin-top:10px; width:100%;" onclick="switchStudioScreen('pdp')">View Featured Piece →</button>
            </div>
          </div>
        </div>

        <!-- Founder Quote -->
        <div style="background:var(--bg-canvas, #F5F4F0); border-radius:16px; padding:36px; text-align:center; border:1px solid rgba(0,0,0,0.04);">
          <p style="font-family:${headingFont}; font-size:24px; font-style:italic; color:${primary}; max-width:680px; margin:0 auto 14px; line-height:1.4;">"Every batch carries the fingerprint of its maker — patient, intentional, and made for living."</p>
          <span style="font-size:13px; font-weight:600; color:#666;">— Atelier Studio Note</span>
        </div>
      </div>
    `;
  } else if (type === 'wholesale') {
    bodyContent = `
      <div style="padding:60px 44px; max-width:1000px; margin:0 auto;">
        <div style="text-align:center; max-width:720px; margin:0 auto 40px;">
          <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:${accent}; display:inline-block; margin-bottom:12px;">B2B &amp; Stockist Partnerships</span>
          <h1 class="studio-editable" data-edit="pageTitle" style="font-family:${headingFont}; font-size:42px; line-height:1.2; color:${primary}; margin:0 0 16px;">${esc(title)}</h1>
          <p class="studio-editable" data-edit="pageDesc" style="font-size:16px; color:#555; line-height:1.6; margin:0;">${esc(desc || 'We collaborate with select independent cafes, design boutiques, and specialty retailers worldwide.')}</p>
        </div>

        <!-- Wholesale Terms Cards -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px; margin-bottom:44px;">
          <div style="background:#fff; border:1px solid #eee; border-radius:14px; padding:24px;">
            <b style="font-size:15px; display:block; margin-bottom:6px;"><i class="ph-bold ph-package"></i> Low Opening Minimums</b>
            <span style="font-size:13px; color:#666; line-height:1.5;">Opening orders start at $250. Reorders have no strict minimums to keep your stock fresh.</span>
          </div>
          <div style="background:#fff; border:1px solid #eee; border-radius:14px; padding:24px;">
            <b style="font-size:15px; display:block; margin-bottom:6px;"><i class="ph-bold ph-clock"></i> 5–7 Day Turnaround</b>
            <span style="font-size:13px; color:#666; line-height:1.5;">Orders packed and dispatched from our local workshop via insured carrier.</span>
          </div>
          <div style="background:#fff; border:1px solid #eee; border-radius:14px; padding:24px;">
            <b style="font-size:15px; display:block; margin-bottom:6px;"><i class="ph-bold ph-credit-card"></i> Flexible Terms</b>
            <span style="font-size:13px; color:#666; line-height:1.5;">Net 30 terms available for verified retail stockists upon secondary order.</span>
          </div>
        </div>

        <!-- Stockist Application Form Card -->
        <div style="background:#fff; border:1px solid #eee; border-radius:16px; padding:36px; box-shadow:0 4px 20px rgba(0,0,0,0.03);">
          <h3 style="font-family:${headingFont}; font-size:26px; color:${primary}; margin:0 0 8px;">Apply for a Wholesale Account</h3>
          <p style="font-size:13.5px; color:#666; margin:0 0 24px;">Fill out your store details below and our team will respond within 24 business hours with line sheets and catalog pricing.</p>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
            <div>
              <label style="font-size:12.5px; font-weight:600; display:block; margin-bottom:6px;">Store / Business Name</label>
              <input class="input" placeholder="e.g. Haven Home & Goods" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:12.5px; font-weight:600; display:block; margin-bottom:6px;">Store Website / Instagram</label>
              <input class="input" placeholder="e.g. instagram.com/havengoods" style="width:100%;" />
            </div>
          </div>
          <div style="margin-bottom:20px;">
            <label style="font-size:12.5px; font-weight:600; display:block; margin-bottom:6px;">Tell us about your space &amp; estimated volume</label>
            <textarea class="textarea" rows="3" placeholder="Tell us which products you are interested in stocking…" style="width:100%;"></textarea>
          </div>
          <button class="btn btn-primary" type="button" style="background:${primary}; color:#fff; border-radius:10px; padding:12px 28px;" onclick="toast('Wholesale application demo submitted! In live store, owner receives email notification.')">
            Submit Wholesale Application →
          </button>
        </div>
      </div>
    `;
  } else if (type === 'care') {
    bodyContent = `
      <div style="padding:60px 44px; max-width:960px; margin:0 auto;">
        <div style="text-align:center; max-width:700px; margin:0 auto 40px;">
          <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:${accent}; display:inline-block; margin-bottom:12px;">Provenance &amp; Specifications</span>
          <h1 class="studio-editable" data-edit="pageTitle" style="font-family:${headingFont}; font-size:42px; line-height:1.2; color:${primary}; margin:0 0 16px;">${esc(title)}</h1>
          <p class="studio-editable" data-edit="pageDesc" style="font-size:16px; color:#555; line-height:1.6; margin:0;">${esc(desc || 'Guidance on caring for your handcrafted goods so they bring warmth to your home for years to come.')}</p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:36px;">
          <div style="background:#fff; border:1px solid #eee; border-radius:14px; padding:28px;">
            <div style="width:40px; height:40px; border-radius:8px; background:rgba(0,0,0,0.04); display:flex; align-items:center; justify-content:center; margin-bottom:14px; font-size:20px; color:${primary};"><i class="ph-bold ph-hand-soap"></i></div>
            <h3 style="font-size:18px; margin:0 0 8px;">Cleaning &amp; Washing</h3>
            <p style="font-size:13.5px; color:#666; line-height:1.6; margin:0;">Wash gently with warm water and neutral detergent. Avoid harsh abrasives or metallic scourers which can score hand-glazed stoneware.</p>
          </div>
          <div style="background:#fff; border:1px solid #eee; border-radius:14px; padding:28px;">
            <div style="width:40px; height:40px; border-radius:8px; background:rgba(0,0,0,0.04); display:flex; align-items:center; justify-content:center; margin-bottom:14px; font-size:20px; color:${primary};"><i class="ph-bold ph-thermometer"></i></div>
            <h3 style="font-size:18px; margin:0 0 8px;">Thermal Shock Caution</h3>
            <p style="font-size:13.5px; color:#666; line-height:1.6; margin:0;">Allow pieces to reach room temperature before pouring boiling liquids or transferring into cold water to prevent thermal shock.</p>
          </div>
        </div>

        <!-- Warranty & Guarantee Banner -->
        <div style="background:var(--bg-canvas, #F5F4F0); border-radius:14px; padding:28px; border:1px solid rgba(0,0,0,0.06); display:flex; align-items:center; justify-content:space-between; gap:20px;">
          <div>
            <b style="font-size:16px; display:block; margin-bottom:4px; color:${primary};">Artisan Craftsmanship Warranty</b>
            <span style="font-size:13.5px; color:#666;">We stand behind every item we create. If a defect emerges within 12 months, we will happily repair or replace it.</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="switchStudioScreen('home')">Shop Catalog →</button>
        </div>
      </div>
    `;
  } else if (type === 'press') {
    bodyContent = `
      <div style="padding:60px 44px; max-width:1040px; margin:0 auto;">
        <div style="text-align:center; max-width:720px; margin:0 auto 40px;">
          <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:${accent}; display:inline-block; margin-bottom:12px;">Press &amp; Media</span>
          <h1 class="studio-editable" data-edit="pageTitle" style="font-family:${headingFont}; font-size:42px; line-height:1.2; color:${primary}; margin:0 0 16px;">${esc(title)}</h1>
          <p class="studio-editable" data-edit="pageDesc" style="font-size:16px; color:#555; line-height:1.6; margin:0;">${esc(desc || 'Features, interview snippets, and editorial mentions across design publications and culinary journals.')}</p>
        </div>

        <!-- Editorial Quotes Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:24px; margin-bottom:44px;">
          <div style="background:#fff; border:1px solid #eee; border-radius:16px; padding:32px; box-shadow:0 4px 16px rgba(0,0,0,0.02);">
            <div style="font-family:${headingFont}; font-size:24px; font-weight:700; color:${primary}; margin-bottom:14px;">The Craft Digest</div>
            <p style="font-size:15px; color:#444; line-height:1.6; font-style:italic; margin-bottom:16px;">"${storeName} proves that slow, intentional production creates objects that feel immediately soulful in modern spaces."</p>
            <span style="font-size:12.5px; color:#888;">— Autumn Design Quarterly, Issue 42</span>
          </div>
          <div style="background:#fff; border:1px solid #eee; border-radius:16px; padding:32px; box-shadow:0 4px 16px rgba(0,0,0,0.02);">
            <div style="font-family:${headingFont}; font-size:24px; font-weight:700; color:${primary}; margin-bottom:14px;">Culinary Table</div>
            <p style="font-size:15px; color:#444; line-height:1.6; font-style:italic; margin-bottom:16px;">"The sourdough and pantry preserves represent artisanal bakery culture at its absolute finest."</p>
            <span style="font-size:12.5px; color:#888;">— Weekend Review, Best Bakeries</span>
          </div>
        </div>

        <!-- Press Kit Download Box -->
        <div style="background:#fff; border:1px solid #eee; border-radius:16px; padding:32px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 2px 10px rgba(0,0,0,0.02);">
          <div>
            <h4 style="font-size:17px; margin:0 0 6px; color:${primary};">Press Kit &amp; High-Res Brand Assets</h4>
            <p style="font-size:13px; color:#666; margin:0;">Download founder headshots, high-resolution product photography, and brand fact sheet.</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="toast('Press kit assets package download ready (ZIP, 48MB)')">
            <i class="ph-bold ph-download-simple"></i> Download Assets
          </button>
        </div>
      </div>
    `;
  } else if (type === 'events') {
    bodyContent = `
      <div style="padding:60px 44px; max-width:1040px; margin:0 auto;">
        <div style="text-align:center; max-width:720px; margin:0 auto 40px;">
          <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:${accent}; display:inline-block; margin-bottom:12px;">Workshops &amp; Experiences</span>
          <h1 class="studio-editable" data-edit="pageTitle" style="font-family:${headingFont}; font-size:42px; line-height:1.2; color:${primary}; margin:0 0 16px;">${esc(title)}</h1>
          <p class="studio-editable" data-edit="pageDesc" style="font-size:16px; color:#555; line-height:1.6; margin:0;">${esc(desc || 'Join us in our sunlit studio for hands-on sessions, seasonal sourdough masterclasses, and tasting dinners.')}</p>
        </div>

        <!-- Events List -->
        <div style="display:flex; flex-direction:column; gap:20px; margin-bottom:44px;">
          <div style="background:#fff; border:1px solid #eee; border-radius:16px; padding:28px 32px; display:flex; justify-content:space-between; align-items:center; gap:24px; box-shadow:0 4px 14px rgba(0,0,0,0.02);">
            <div style="display:flex; gap:20px; align-items:center;">
              <div style="width:64px; height:64px; border-radius:12px; background:var(--bg-canvas, #F5F4F0); text-align:center; display:flex; flex-direction:column; justify-content:center;">
                <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:${accent};">NOV</span>
                <span style="font-size:22px; font-weight:700; color:${primary};">18</span>
              </div>
              <div>
                <h3 style="font-family:${headingFont}; font-size:22px; color:${primary}; margin:0 0 4px;">Hands-on Sourdough Masterclass</h3>
                <p style="font-size:13.5px; color:#666; margin:0;">Saturday 10:00 AM – 2:00 PM • Includes organic starter kit &amp; bread basket</p>
              </div>
            </div>
            <button class="btn btn-primary btn-sm" style="background:${primary}; color:#fff;" onclick="toast('RSVP Spot confirmed for Masterclass!')">Book Spot ($85)</button>
          </div>

          <div style="background:#fff; border:1px solid #eee; border-radius:16px; padding:28px 32px; display:flex; justify-content:space-between; align-items:center; gap:24px; box-shadow:0 4px 14px rgba(0,0,0,0.02);">
            <div style="display:flex; gap:20px; align-items:center;">
              <div style="width:64px; height:64px; border-radius:12px; background:var(--bg-canvas, #F5F4F0); text-align:center; display:flex; flex-direction:column; justify-content:center;">
                <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:${accent};">DEC</span>
                <span style="font-size:22px; font-weight:700; color:${primary};">06</span>
              </div>
              <div>
                <h3 style="font-family:${headingFont}; font-size:22px; color:${primary}; margin:0 0 4px;">Holiday Studio Pop-Up &amp; Cider Tasting</h3>
                <p style="font-size:13.5px; color:#666; margin:0;">Friday Evening 5:00 PM – 9:00 PM • Free community admission</p>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="toast('RSVP recorded! We look forward to seeing you.')">RSVP Free</button>
          </div>
        </div>
      </div>
    `;
  } else if (type === 'faq') {
    bodyContent = `
      <div style="padding:60px 44px; max-width:900px; margin:0 auto;">
        <div style="text-align:center; max-width:700px; margin:0 auto 40px;">
          <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:${accent}; display:inline-block; margin-bottom:12px;">Frequently Asked Questions</span>
          <h1 class="studio-editable" data-edit="pageTitle" style="font-family:${headingFont}; font-size:42px; line-height:1.2; color:${primary}; margin:0 0 16px;">${esc(title)}</h1>
          <p class="studio-editable" data-edit="pageDesc" style="font-size:16px; color:#555; line-height:1.6; margin:0;">${esc(desc || 'Answers regarding packaging, dispatch times, local pickup, and dietary information.')}</p>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:36px;">
          <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:24px;">
            <b style="font-size:16px; display:block; margin-bottom:8px; color:${primary};">How fast do orders ship?</b>
            <p style="font-size:13.5px; color:#666; line-height:1.6; margin:0;">We ship orders Monday through Thursday so fresh goods never sit in transit over the weekend. Typical delivery takes 2 to 4 business days.</p>
          </div>
          <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:24px;">
            <b style="font-size:16px; display:block; margin-bottom:8px; color:${primary};">Where do I pick up curbside orders?</b>
            <p style="font-size:13.5px; color:#666; line-height:1.6; margin:0;">Curbside orders are packed at our central workshop (482 Artisan Row). You will receive an SMS and email notification when your bag is ready.</p>
          </div>
          <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:24px;">
            <b style="font-size:16px; display:block; margin-bottom:8px; color:${primary};">What is your refund or return policy?</b>
            <p style="font-size:13.5px; color:#666; line-height:1.6; margin:0;">Because our items are perishable and handcrafted, we evaluate returns on a case-by-case basis. If anything arrives damaged, we replace it instantly.</p>
          </div>
        </div>
      </div>
    `;
  } else {
    // Custom / Bespoke General Page
    bodyContent = `
      <div style="padding:60px 44px; max-width:960px; margin:0 auto;">
        <div style="text-align:center; max-width:720px; margin:0 auto 40px;">
          <span style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:${accent}; display:inline-block; margin-bottom:12px;">Custom Page</span>
          <h1 class="studio-editable" data-edit="pageTitle" style="font-family:${headingFont}; font-size:42px; line-height:1.2; color:${primary}; margin:0 0 16px;">${esc(title)}</h1>
          <p class="studio-editable" data-edit="pageDesc" style="font-size:16px; color:#555; line-height:1.6; margin:0;">${esc(desc || 'Custom designed page synthesized by Clerk AI to match your store layout and voice.')}</p>
        </div>

        <div style="background:#fff; border:1px solid #eee; border-radius:16px; padding:36px; margin-bottom:32px; box-shadow:0 4px 16px rgba(0,0,0,0.02);">
          <h3 style="font-family:${headingFont}; font-size:24px; color:${primary}; margin:0 0 12px;">Page Content &amp; Visuals</h3>
          <p style="font-size:14px; color:#555; line-height:1.7; margin-bottom:20px;">
            This bespoke page was generated according to your prompt. You can click on any title, subtitle or paragraph directly inside the Storefront Studio to edit the copy in real-time, or prompt My Clerk at the bottom of the screen to rewrite any section.
          </p>
          <div style="display:flex; gap:12px;">
            <button class="btn btn-primary btn-sm" style="background:${primary}; color:#fff;" onclick="switchStudioScreen('home')">← Back to Shop</button>
            <button class="btn btn-secondary btn-sm" onclick="openNewPageModal('chat')"><i class="ph-bold ph-sparkle"></i> Add Another Page</button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="custom-page-container" id="customPage_${id}">
      <!-- Custom Page Admin Header Banner -->
      <div class="custom-page-banner">
        <div class="custom-page-banner-meta">
          <span class="custom-badge"><i class="ph-bold ph-sparkle"></i> Clerk AI Generated</span>
          <span class="page-slug-badge">URL: /pages/${slug}</span>
        </div>
        <div class="custom-page-banner-actions">
          <button class="btn btn-ghost btn-xs" type="button" onclick="openNewPageModal('form')">
            <i class="ph ph-plus"></i> New Page
          </button>
          <button class="btn btn-ghost btn-xs text-danger" type="button" onclick="deleteCustomPage('${id}')">
            <i class="ph ph-trash"></i> Delete Page
          </button>
        </div>
      </div>

      <!-- Navigation Bar -->
      <header class="store-nav-preview" style="border-bottom:1px solid rgba(0,0,0,0.06); padding:20px 44px; display:flex; justify-content:space-between; align-items:center; background:#fff;">
        <div style="display:flex; align-items:center; gap:14px;">
          ${brand.logo ? `<img src="${brand.logo}" style="height:34px; border-radius:6px;" alt="Logo" />` : ''}
          <span class="studio-editable" data-edit="storeName" style="font-family:${headingFont}; font-size:22px; font-weight:700; color:${primary}; cursor:pointer;" onclick="switchStudioScreen('home')">${esc(storeName)}</span>
        </div>
        <nav style="display:flex; gap:28px; font-size:13.5px; font-weight:500; color:#444;">
          <a href="#" style="color:inherit; text-decoration:none;" onclick="switchStudioScreen('home')">Shop All</a>
          <a href="#" style="color:inherit; text-decoration:none;" onclick="switchStudioScreen('about')">Our Story</a>
          <a href="#" style="color:inherit; text-decoration:none; font-weight:700; color:${primary};">${esc(title)}</a>
        </nav>
        <div>
          <button class="btn btn-ghost btn-sm" type="button" style="border-radius:99px; padding:6px 14px; font-weight:600;" onclick="switchStudioScreen('cart')">
            <i class="ph-bold ph-shopping-bag"></i> Bag (${state.cart.length})
          </button>
        </div>
      </header>

      <!-- Dynamic Page Body -->
      <main style="background:${tpl.bg || '#FDFDFD'}; min-height:600px;">
        ${bodyContent}
      </main>

      <!-- Store Footer -->
      <footer style="border-top:1px solid rgba(0,0,0,0.08); padding:40px 44px; text-align:center; font-size:13px; color:#777; background:#fff;">
        <div style="font-family:${headingFont}; font-size:18px; color:${primary}; margin-bottom:8px;">${esc(storeName)}</div>
        <p style="margin:0;">Handcrafted in small batches. Powered by OneClerk.</p>
      </footer>
    </div>
  `;
}

// Delete custom page
window.deleteCustomPage = (pageId) => {
  if (!confirm('Are you sure you want to delete this custom page?')) return;
  state.customPages = (state.customPages || []).filter(p => p.id !== pageId);
  saveStoreState();
  refreshScreensRibbon();
  refreshPagesDropdownMenu();
  switchStudioScreen('home');
  toast('Page deleted from storefront.');
};

// Ribbon and Dropdown synchronizers
function refreshScreensRibbon() {
  const switcher = $('#studioScreenSwitcher');
  if (!switcher) return;

  // Keep core 5 screen buttons
  const coreScreens = [
    { key: 'home', icon: 'ph-house', label: 'Homepage', title: 'Storefront Homepage' },
    { key: 'pdp', icon: 'ph-shopping-bag', label: 'Product (PDP)', title: 'Product Detail Page' },
    { key: 'cart', icon: 'ph-shopping-cart', label: 'Bag & Checkout', title: 'Bag & Slide Checkout' },
    { key: 'about', icon: 'ph-book-open', label: 'Brand Story', title: 'Brand Story & Origin' },
    { key: 'thankyou', icon: 'ph-check-circle', label: 'Order Confirmation', title: 'Order Confirmation Screen' }
  ];

  let html = coreScreens.map(s => `
    <button class="screen-btn ${state.currentScreen === s.key ? 'active' : ''}" data-screen="${s.key}" type="button" title="${s.title}">
      <i class="ph ${s.icon}"></i>
      <span>${s.label}</span>
    </button>
  `).join('');

  // Add custom pages buttons
  (state.customPages || []).forEach(p => {
    html += `
      <button class="screen-btn ${state.currentScreen === p.id ? 'active' : ''}" data-screen="${p.id}" type="button" title="${esc(p.title)} (/pages/${p.slug})">
        <i class="ph-bold ph-file-text"></i>
        <span>${esc(p.title)}</span>
      </button>
    `;
  });

  switcher.innerHTML = html;

  // Re-attach switcher listeners
  switcher.querySelectorAll('.screen-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const scr = btn.dataset.screen;
      if (scr) switchStudioScreen(scr);
    });
  });
}

function refreshPagesDropdownMenu() {
  const menu = $('#pagesDropdownMenu');
  if (!menu) return;

  const coreScreens = [
    { key: 'home', label: 'Homepage' },
    { key: 'pdp', label: 'Product Detail (PDP)' },
    { key: 'cart', label: 'Bag & Express Checkout' },
    { key: 'about', label: 'Brand Story' },
    { key: 'thankyou', label: 'Order Confirmation' }
  ];

  let html = '<div class="page-menu-section-title">Predesigned Screens</div>';
  coreScreens.forEach(s => {
    html += `
      <div class="page-menu-item ${state.currentScreen === s.key ? 'active' : ''}" data-screen="${s.key}">
        <span>${s.label}</span>
        ${state.currentScreen === s.key ? '<i class="ph ph-check"></i>' : ''}
      </div>
    `;
  });

  if (state.customPages && state.customPages.length > 0) {
    html += '<div class="page-menu-divider"></div>';
    html += '<div class="page-menu-section-title">Custom Pages</div>';
    state.customPages.forEach(p => {
      html += `
        <div class="page-menu-item ${state.currentScreen === p.id ? 'active' : ''}" data-screen="${p.id}">
          <span>${esc(p.title)}</span>
          ${state.currentScreen === p.id ? '<i class="ph ph-check"></i>' : ''}
        </div>
      `;
    });
  }

  html += `
    <div class="page-menu-divider"></div>
    <div class="page-menu-section-title">Add Custom Pages</div>
    <button class="add-page-btn" id="addNewCustomPageBtn" type="button">
      <i class="ph-bold ph-textbox"></i> + Quick Spec Form
    </button>
    <button class="add-page-btn" id="addAiPromptPageBtn" type="button">
      <i class="ph-bold ph-sparkle"></i> Prompt Clerk AI to Generate
    </button>
  `;

  menu.innerHTML = html;

  // Re-attach listeners
  menu.querySelectorAll('.page-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const scr = item.dataset.screen;
      if (scr) switchStudioScreen(scr);
      menu.hidden = true;
    });
  });

  $('#addNewCustomPageBtn')?.addEventListener('click', () => {
    menu.hidden = true;
    openNewPageModal('form');
  });

  $('#addAiPromptPageBtn')?.addEventListener('click', () => {
    menu.hidden = true;
    openNewPageModal('chat');
  });
}

// Dismiss training guide banner
$('#dismissTrainingBannerBtn')?.addEventListener('click', () => {
  const banner = $('#studioTrainingBanner');
  if (banner) banner.hidden = true;
});

// Inspector Tabs Switcher (Templates / Brand / Copy / Commerce)
function switchInspectorTab(tabKey) {
  const tabs = ['Templates', 'Brand', 'Content', 'Commerce'];
  tabs.forEach(t => {
    const btn = $(`#inspectorTab${t}`);
    const content = $(`#inspectorTabContent${t === 'Content' ? 'Copy' : t}`);
    if (btn) btn.classList.toggle('active', t.toLowerCase() === tabKey.toLowerCase());
    if (content) content.hidden = (t.toLowerCase() !== tabKey.toLowerCase());
  });
}

$('#inspectorTabTemplates')?.addEventListener('click', () => switchInspectorTab('Templates'));
$('#inspectorTabBrand')?.addEventListener('click', () => switchInspectorTab('Brand'));
$('#inspectorTabContent')?.addEventListener('click', () => switchInspectorTab('Content'));
$('#inspectorTabCommerce')?.addEventListener('click', () => switchInspectorTab('Commerce'));

// Commerce settings save
$('#saveCommerceSettingsBtn')?.addEventListener('click', () => {
  const ann = $('#inspectorAnnounceInput')?.value;
  const ship = $('#inspectorFreeShippingInput')?.value;
  const wa = $('#inspectorWhatsAppInput')?.value;
  if (ann) {
    state.brand.announcement = ann;
    const sfAnn = $('#sfAnnounceText');
    if (sfAnn) sfAnn.textContent = ann;
  }
  if (ship) state.brand.freeShippingThreshold = parseFloat(ship) || 75;
  if (wa) {
    if (!state.whatsapp) state.whatsapp = {};
    state.whatsapp.phone = wa;
  }
  saveStoreState();
  renderStorefrontStudio();
  renderStorefront();
  toast('Commerce & fulfillment settings saved!');
});

// Inspector Close Button
$('#studioInspectorCloseBtn')?.addEventListener('click', () => {
  const panel = $('#studioInspectorPanel');
  if (panel) {
    panel.style.display = 'none';
    toast('Closed Brand & Style Inspector');
  }
});

// Logo upload in Inspector
$('#uploadLogoBtn')?.addEventListener('click', () => $('#brandLogoFileInput').click());
$('#inspectorLogoUploader')?.addEventListener('click', (e) => {
  if (e.target.id === 'removeLogoBtn') return;
  $('#brandLogoFileInput').click();
});
$('#brandLogoFileInput')?.addEventListener('change', async (e) => {
  if (e.target.files[0]) {
    const dataUrl = await fileToDataURL(e.target.files[0]);
    state.brand.logo = dataUrl;
    $('#logoPreviewImg').src = dataUrl;
    $('#logoPreviewImg').hidden = false;
    $('#logoPlaceholderText').hidden = true;
    $('#removeLogoBtn').hidden = false;
    saveStoreState();
    renderStorefrontStudio();
    toast('Logo uploaded! Applied across all storefront screens.');
  }
});
$('#removeLogoBtn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  state.brand.logo = null;
  $('#logoPreviewImg').src = '';
  $('#logoPreviewImg').hidden = true;
  $('#logoPlaceholderText').hidden = false;
  $('#removeLogoBtn').hidden = true;
  $('#brandLogoFileInput').value = '';
  saveStoreState();
  renderStorefrontStudio();
  toast('Logo removed.');
});

// Brand guide upload
$('#uploadBrandGuideBtn')?.addEventListener('click', () => $('#brandGuideFileInput').click());
$('#brandGuideFileInput')?.addEventListener('change', (e) => {
  if (e.target.files[0]) {
    const fName = e.target.files[0].name;
    state.brand.brandGuideName = fName;
    $('#brandGuideFileName').textContent = `Loaded: ${fName}`;
    saveStoreState();
    toast(`Brand guide "${fName}" uploaded! My Clerk now writes copy in your brand tone.`);
  }
});

// Tone of voice select
$('#brandVoiceSelect')?.addEventListener('change', (e) => {
  state.brand.brandVoice = e.target.value;
  saveStoreState();
  toast(`Brand tone set to: ${e.target.value}`);
});

// Palette dots
$$('#inspectorPaletteRow .palette-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    $$('#inspectorPaletteRow .palette-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    const color = dot.dataset.color || '#121212';
    state.brand.primaryColor = color;
    $('#primaryColorPicker').value = color;
    $('#primaryColorHex').textContent = color;
    saveStoreState();
    renderStorefrontStudio();
  });
});

$('#primaryColorPicker')?.addEventListener('input', (e) => {
  state.brand.primaryColor = e.target.value;
  $('#primaryColorHex').textContent = e.target.value;
  saveStoreState();
  renderStorefrontStudio();
});

$('#accentColorPicker')?.addEventListener('input', (e) => {
  state.brand.accentColor = e.target.value;
  $('#accentColorHex').textContent = e.target.value;
  saveStoreState();
  renderStorefrontStudio();
});

// Typography selects
$('#headingFontSelect')?.addEventListener('change', (e) => {
  state.brand.headingFont = e.target.value;
  saveStoreState();
  renderStorefrontStudio();
});

$('#bodyFontSelect')?.addEventListener('change', (e) => {
  state.brand.bodyFont = e.target.value;
  saveStoreState();
  renderStorefrontStudio();
});

// Copy changes button
$('#applyCopyChangesBtn')?.addEventListener('click', () => {
  const head = $('#editHeroHeadlineInput').value.trim();
  const sub = $('#editHeroSubtitleInput').value.trim();
  const cta = $('#editHeroCtaInput').value.trim();
  if (head) state.brand.heroHeadline = head;
  if (sub) state.brand.heroSubtitle = sub;
  if (cta) state.brand.heroCta = cta;
  saveStoreState();
  renderStorefrontStudio();
  toast('Storefront copy updated!');
});

// Inspector Toggle
$('#studioEditsToggleBtn')?.addEventListener('click', () => {
  const panel = $('#studioInspectorPanel');
  if (panel) {
    const isHidden = panel.style.display === 'none';
    panel.style.display = isHidden ? 'flex' : 'none';
    toast(isHidden ? 'Opened Brand & Style Inspector' : 'Closed Inspector');
  }
});

/* =========================================================
   STICKY "MY CLERK" MULTIMODAL AI CHATBOT ENGINE
   Docked persistently at bottom across ALL pages
   ========================================================= */
let myClerkAttachments = [];

function toggleMyClerkDrawer(forceOpen) {
  const drawer = $('#myClerkDrawer');
  if (!drawer) return;
  const shouldOpen = forceOpen !== undefined ? forceOpen : drawer.hidden;
  drawer.hidden = !shouldOpen;
  if (shouldOpen) {
    $('#myClerkInput')?.focus();
    scrollMyClerkToBottom();
  }
}

function scrollMyClerkToBottom() {
  const stream = $('#myClerkMessages');
  if (stream) stream.scrollTop = stream.scrollHeight;
}

$('#myClerkToggleDrawerBtn')?.addEventListener('click', () => toggleMyClerkDrawer());
$('#closeMyClerkDrawerBtn')?.addEventListener('click', () => toggleMyClerkDrawer(false));
$('#clearMyClerkChatBtn')?.addEventListener('click', () => {
  const stream = $('#myClerkMessages');
  if (stream) {
    stream.innerHTML = `
      <div class="clerk-chat-msg bot">
        <div class="msg-avatar"><i class="ph-bold ph-sparkle"></i></div>
        <div class="msg-bubble">
          <p>Chat history cleared. What would you like to update on your store?</p>
        </div>
      </div>
    `;
  }
  toast('My Clerk chat reset.');
});

// Global keyboard shortcut: Cmd+K / Ctrl+K
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    toggleMyClerkDrawer(true);
    $('#myClerkInput')?.focus();
  }
});

// Blinking cursor handling in input
const myClerkInput = $('#myClerkInput');
const blinkingCursor = $('#myClerkBlinkingCursor');

function updateBlinkingCursor() {
  if (!myClerkInput || !blinkingCursor) return;
  blinkingCursor.style.display = myClerkInput.value ? 'none' : 'block';
}

myClerkInput?.addEventListener('input', updateBlinkingCursor);
myClerkInput?.addEventListener('focus', () => { if (blinkingCursor) blinkingCursor.style.opacity = '0.3'; });
myClerkInput?.addEventListener('blur', () => { if (blinkingCursor) blinkingCursor.style.opacity = '1'; });

// Multimodal File Attachment Button
$('#myClerkAttachBtn')?.addEventListener('click', () => $('#myClerkFileInput').click());
$('#myClerkFileInput')?.addEventListener('change', async (e) => {
  const files = [...e.target.files];
  if (!files.length) return;

  for (const file of files) {
    const isImg = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    let previewSrc = '';
    if (isImg) {
      previewSrc = await fileToDataURL(file);
    }
    myClerkAttachments.push({
      name: file.name,
      type: file.type,
      isImg,
      isVideo,
      src: previewSrc
    });
  }

  renderMyClerkAttachmentTray();
  toggleMyClerkDrawer(true);
  toast(`Attached ${files.length} file${files.length > 1 ? 's' : ''} to My Clerk`);
});

function renderMyClerkAttachmentTray() {
  const tray = $('#myClerkAttachmentsPreview');
  if (!tray) return;

  if (!myClerkAttachments.length) {
    tray.hidden = true;
    tray.innerHTML = '';
    return;
  }

  tray.hidden = false;
  tray.innerHTML = myClerkAttachments.map((att, idx) => `
    <div class="my-clerk-attach-chip">
      ${att.isImg ? `<img src="${att.src}" class="chip-thumb" alt="thumb" />` : `<i class="ph-bold ${att.isVideo ? 'ph-video' : 'ph-file'}"></i>`}
      <span>${esc(att.name)}</span>
      <button type="button" class="chip-remove" onclick="removeMyClerkAttachment(${idx})"><i class="ph ph-x"></i></button>
    </div>
  `).join('');
}

window.removeMyClerkAttachment = (idx) => {
  myClerkAttachments.splice(idx, 1);
  renderMyClerkAttachmentTray();
};

// Send message
$('#myClerkSendBtn')?.addEventListener('click', handleMyClerkSubmit);
$('#myClerkInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleMyClerkSubmit();
  }
});

// Quick action chips
$$('.my-clerk-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const prompt = chip.dataset.prompt;
    if (prompt) openMyClerkPrompt(prompt);
  });
});

function openMyClerkPrompt(text) {
  if (myClerkInput) myClerkInput.value = text;
  updateBlinkingCursor();
  toggleMyClerkDrawer(true);
  handleMyClerkSubmit();
}

async function handleMyClerkSubmit() {
  const text = (myClerkInput?.value || '').trim();
  if (!text && !myClerkAttachments.length) return;

  const currentAtts = [...myClerkAttachments];
  myClerkAttachments = [];
  renderMyClerkAttachmentTray();
  if (myClerkInput) myClerkInput.value = '';
  updateBlinkingCursor();

  toggleMyClerkDrawer(true);

  // Render User Message
  renderUserMessage(text, currentAtts);
  scrollMyClerkToBottom();

  // Assistant Thinking Indicator
  const botMsgWrap = renderBotThinking();
  scrollMyClerkToBottom();

  await sleep(650);

  // Intent parsing & execution
  const response = await executeMyClerkCommand(text, currentAtts);
  botMsgWrap.innerHTML = `
    <div class="msg-avatar"><i class="ph-bold ph-sparkle"></i></div>
    <div class="msg-bubble">
      ${response.html}
      ${response.actionButton ? `<div style="margin-top:10px;"><button class="btn btn-ghost btn-xs" style="border-color:var(--brand-primary); font-weight:600;" onclick="${response.actionButton.handler}">${response.actionButton.label}</button></div>` : ''}
    </div>
  `;
  scrollMyClerkToBottom();
}

function renderUserMessage(text, attachments) {
  const stream = $('#myClerkMessages');
  if (!stream) return;
  const div = document.createElement('div');
  div.className = 'clerk-chat-msg user';
  div.innerHTML = `
    <div class="msg-avatar">AM</div>
    <div class="msg-bubble">
      ${text ? `<p>${esc(text)}</p>` : ''}
      ${attachments.length ? `
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:6px;">
          ${attachments.map(a => a.isImg ? `<img src="${a.src}" style="width:72px; height:72px; border-radius:6px; object-fit:cover;" />` : `<span class="pill" style="font-size:12px;"><i class="ph-bold ph-file"></i> ${esc(a.name)}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
  stream.appendChild(div);
}

function renderBotThinking() {
  const stream = $('#myClerkMessages');
  const div = document.createElement('div');
  div.className = 'clerk-chat-msg bot';
  div.innerHTML = `
    <div class="msg-avatar"><i class="ph-bold ph-sparkle"></i></div>
    <div class="msg-bubble">
      <span style="color:var(--muted);"><i class="ph-bold ph-spinner ph-spin"></i> Clerk analyzing request and executing platform actions…</span>
    </div>
  `;
  stream.appendChild(div);
  return div;
}

async function executeMyClerkCommand(text, attachments) {
  const q = text.toLowerCase().trim();

  // 1. NAVIGATION INTENTS
  if (q === 'analytics' || q.includes('go to analytics') || q.includes('show analytics') || q.includes('overview') || q.includes('dashboard')) {
    switchDashTab('overview');
    return {
      html: `<p>Navigated to <b>Dashboard &amp; Analytics</b>. Store metrics and velocity are visible at the top.</p>`,
      actionButton: { label: 'View Overview →', handler: "switchDashTab('overview')" }
    };
  }

  if (q.includes('go to catalog') || q.includes('show catalog') || q.includes('open catalog') || q.includes('view products') || q.includes('see products') || q === 'catalog') {
    switchDashTab('catalog');
    return {
      html: `<p>Opened your <b>Products &amp; Catalog</b> tab. You currently have <b>${state.products.length} active items</b>.</p>`,
      actionButton: { label: 'View Catalog →', handler: "switchDashTab('catalog')" }
    };
  }

  if (q.includes('storefront studio') || q.includes('edit storefront') || q.includes('edit store') || q === 'storefront') {
    switchDashTab('storefront');
    return {
      html: `<p>Opened <b>Storefront Studio</b>. You can customize layouts, typography, and theme styling.</p>`,
      actionButton: { label: 'Open Studio →', handler: "switchDashTab('storefront')" }
    };
  }

  if (q.includes('live store') || q.includes('live storefront') || q.includes('customer store') || q.includes('test store') || q.includes('view live')) {
    setView('storefront');
    return {
      html: `<p>Switched to <b>Live Customer Storefront Mode</b>. You can test customer shopping and the 24/7 AI concierge.</p>`,
      actionButton: { label: 'Return to Dashboard →', handler: "setView('dashboard')" }
    };
  }

  if (q.includes('inbox') || q.includes('messages') || q.includes('tickets') || q.includes('customer care') || q.includes('handover') || q === 'inbox') {
    switchDashTab('inbox');
    return {
      html: `<p>Opened <b>Omnichannel Customer Inbox</b>. View live WhatsApp inquiries and storefront handover tickets.</p>`,
      actionButton: { label: 'Inspect Inbox →', handler: "switchDashTab('inbox')" }
    };
  }

  if (q.includes('orders') || q.includes('view orders') || q.includes('order list') || q === 'orders') {
    switchDashTab('orders');
    return {
      html: `<p>Opened <b>Orders Tab</b>. You have <b>${state.orders.length} orders recorded</b>.</p>`,
      actionButton: { label: 'View Orders →', handler: "switchDashTab('orders')" }
    };
  }

  if (q.includes('billing') || q.includes('credits') || q.includes('plan') || q === 'billing') {
    switchDashTab('billing');
    return {
      html: `<p>Opened <b>Billing &amp; Subscription</b>. You have <b>900 AI studio credits</b> remaining.</p>`,
      actionButton: { label: 'View Billing →', handler: "switchDashTab('billing')" }
    };
  }

  if (q.includes('notifications') || q.includes('alerts')) {
    switchDashTab('notifications');
    return {
      html: `<p>Opened <b>Notifications Center</b>.</p>`,
      actionButton: { label: 'View Notifications →', handler: "switchDashTab('notifications')" }
    };
  }

  if (q.includes('settings') || q.includes('preferences')) {
    switchDashTab('settings');
    return {
      html: `<p>Opened <b>Store Settings</b>.</p>`,
      actionButton: { label: 'View Settings →', handler: "switchDashTab('settings')" }
    };
  }

  // 2. ADD PRODUCT INTENT (VIA PROMPT OR ATTACHMENTS)
  if (q.includes('add product') || q.includes('create product') || q.includes('new product') || (attachments.length && (q.includes('add') || q.includes('upload')))) {
    const priceMatch = text.match(/\$([0-9.]+)/);
    const price = priceMatch ? parseFloat(priceMatch[1]).toFixed(2) : '48.00';
    let name = text.replace(/\$([0-9.]+)/, '').replace(/add a new/i, '').replace(/add/i, '').replace(/create/i, '').replace(/product/i, '').replace(/physical/i, '').replace(/digital/i, '').replace(/service/i, '').replace(/food/i, '').replace(/:/g, '').trim();
    if (!name || name.length < 3) name = 'Artisan Collection Piece';

    let type = 'physical';
    if (q.includes('digital') || q.includes('download') || q.includes('pdf')) type = 'digital';
    else if (q.includes('service') || q.includes('booking') || q.includes('consultation')) type = 'service';
    else if (q.includes('subscription') || q.includes('recurring')) type = 'subscription';
    else if (q.includes('food') || q.includes('bake') || q.includes('cookie') || q.includes('cake')) type = 'food';

    const p = newProduct(type);
    p.name = name;
    p.price = price;
    p.description = `Curated by Clerk AI with ${state.brand.brandVoice} tone. Premium small-batch craftsmanship.`;
    if (attachments.find(a => a.isImg)) {
      p.image = attachments.find(a => a.isImg).src;
    } else {
      p.image = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
    }
    p.images = [{ id: 'img_' + Date.now(), url: p.image, alt: p.name, isCover: true }];

    state.products.unshift(p);
    saveStoreState();
    renderDashboardCatalog();
    renderStorefront();

    return {
      html: `<p>Done! Created and saved <b>${esc(p.name)}</b> for <b>$${p.price}</b> in your <b>${type.toUpperCase()}</b> catalog.</p><p style="font-size:12px; color:var(--muted); margin-top:4px;">Stock: 50 units · Fulfillment: Shipping + Pickup ready.</p>`,
      actionButton: { label: 'View in Catalog →', handler: "switchDashTab('catalog')" }
    };
  }

  // 3. EDIT PRICE OF EXISTING PRODUCT
  if ((q.includes('price of') || q.includes('set price') || q.includes('change price')) && text.match(/\$([0-9.]+)/)) {
    const newPrice = parseFloat(text.match(/\$([0-9.]+)/)[1]).toFixed(2);
    // Find target product
    let target = state.products[0];
    for (const prod of state.products) {
      if (q.includes(prod.name.toLowerCase())) {
        target = prod;
        break;
      }
    }
    if (target) {
      const oldPrice = target.price;
      target.price = newPrice;
      saveStoreState();
      renderDashboardCatalog();
      renderStorefront();
      return {
        html: `<p>Updated price for <b>${esc(target.name)}</b> from <b>$${oldPrice}</b> to <b>$${newPrice}</b>.</p>`,
        actionButton: { label: 'View in Catalog →', handler: "switchDashTab('catalog')" }
      };
    }
  }

  // 4. STOCK & INVENTORY ADJUSTMENT
  if (q.includes('out of stock') || q.includes('in stock') || q.includes('stock of')) {
    let target = state.products[0];
    for (const prod of state.products) {
      if (q.includes(prod.name.toLowerCase())) {
        target = prod;
        break;
      }
    }
    if (target) {
      if (q.includes('out of stock')) {
        target.stock = 0;
      } else {
        const numMatch = q.match(/\b(\d+)\b/);
        target.stock = numMatch ? parseInt(numMatch[1], 10) : 50;
      }
      saveStoreState();
      renderDashboardCatalog();
      renderStorefront();
      return {
        html: `<p>Updated inventory for <b>${esc(target.name)}</b>: now <b>${target.stock > 0 ? target.stock + ' units (In Stock)' : 'Sold Out'}</b>.</p>`,
        actionButton: { label: 'Inspect Catalog →', handler: "switchDashTab('catalog')" }
      };
    }
  }

  // 5. DELETE PRODUCT
  if (q.includes('delete product') || q.includes('remove product') || q.includes('delete item')) {
    let targetIdx = -1;
    for (let i = 0; i < state.products.length; i++) {
      if (q.includes(state.products[i].name.toLowerCase())) {
        targetIdx = i;
        break;
      }
    }
    if (targetIdx !== -1) {
      const removed = state.products.splice(targetIdx, 1)[0];
      saveStoreState();
      renderDashboardCatalog();
      renderStorefront();
      return {
        html: `<p>Removed <b>${esc(removed.name)}</b> from your active catalog.</p>`,
        actionButton: { label: 'View Catalog →', handler: "switchDashTab('catalog')" }
      };
    }
  }

  // 6. SWITCH TEMPLATE INTENT
  if (q.includes('template') || q.includes('switch to')) {
    let tplId = 'atelier';
    if (q.includes('mabel')) tplId = 'mabel';
    else if (q.includes('atelier') || q.includes('geist')) tplId = 'atelier';
    else if (q.includes('aether')) tplId = 'aether';
    else if (q.includes('solace')) tplId = 'solace';

    setTemplateTheme(tplId);
    return {
      html: `<p>Switched store template to <b>${TEMPLATE_VIBES.find(t => t.id === tplId).name}</b> across all 5 e-commerce conversion screens.</p>`,
      actionButton: { label: 'Preview Storefront →', handler: "switchDashTab('storefront')" }
    };
  }

  // 7. NEW PAGE CREATION INTENT (Clerk AI Page Generator)
  if (q.includes('add page') || q.includes('create page') || q.includes('new page') || q.includes('build page') || q.includes('generate page') || q.includes('add lookbook') || q.includes('add wholesale') || q.includes('add faq') || q.includes('add press') || q.includes('add events')) {
    // Check if asking for an existing core template page
    const matchedCore = checkExistingCoreScreen(text);
    if (matchedCore && !q.includes('lookbook') && !q.includes('wholesale') && !q.includes('press') && !q.includes('event') && !q.includes('care') && !q.includes('faq')) {
      switchStudioScreen(matchedCore.key);
      setView('dashboard');
      switchDashTab('storefront');
      return {
        html: `<p><b>Notice:</b> You already have <b>${matchedCore.name}</b> in your active template. Switched your canvas directly to that screen!</p>`,
        actionButton: { label: `View ${matchedCore.name} →`, handler: `switchStudioScreen('${matchedCore.key}')` }
      };
    }

    // Open Add New Page Modal directly with Clerk AI Chat mode
    setTimeout(() => {
      openNewPageModal('chat');
      const chatInput = $('#pageChatInput');
      if (chatInput) {
        chatInput.value = text;
        handlePageChatSubmit();
      }
    }, 400);

    return {
      html: `<p>Opening <b>Clerk AI Page Architect</b> to synthesize your new page layout and copy according to your active template guide.</p>`,
      actionButton: { label: 'Open Page Architect →', handler: "openNewPageModal('chat')" }
    };
  }

  // 7b. SWITCH SCREEN / PAGE INTENT
  if (q.includes('screen') || q.includes('go to cart') || q.includes('go to pdp') || q.includes('go to about') || q.includes('go to thankyou')) {
    let scr = 'home';
    if (q.includes('pdp') || q.includes('product detail')) scr = 'pdp';
    else if (q.includes('cart') || q.includes('checkout') || q.includes('bag')) scr = 'cart';
    else if (q.includes('about') || q.includes('story')) scr = 'about';
    else if (q.includes('thankyou') || q.includes('confirmation')) scr = 'thankyou';

    switchStudioScreen(scr);
    return {
      html: `<p>Navigated to the <b>${scr.toUpperCase()}</b> screen in Storefront Studio.</p>`,
      actionButton: { label: 'Open Studio →', handler: "switchDashTab('storefront')" }
    };
  }

  // 8. THEME TOGGLE (DARK / LIGHT)
  if (q.includes('dark mode') || q.includes('light mode') || q.includes('toggle theme')) {
    toggleTheme();
    return {
      html: `<p>Switched application theme to <b>${document.documentElement.getAttribute('data-theme') || 'Light'} Mode</b>.</p>`
    };
  }

  // 9. STORE NAME / BRANDING
  if (q.includes('rename store') || q.includes('change store name') || q.includes('store name to')) {
    const clean = text.replace(/rename|store|change|name|to/gi, '').trim() || 'My Artisan Studio';
    state.storeName = clean;
    saveStoreState();
    syncDashboardUI();
    renderStorefront();
    return {
      html: `<p>Updated store name to: <b>${esc(clean)}</b> across your dashboard and storefront.</p>`,
      actionButton: { label: 'Preview Store →', handler: "setView('storefront')" }
    };
  }

  // 10. PUBLISH / DRAFT INTENT
  if (q.includes('publish') || q.includes('go live')) {
    state.isPublished = true;
    saveStoreState();
    updatePublishingUI();
    confetti();
    return {
      html: `<p>Congratulations! Your store is now <b>Live to the World</b> at <code>https://${state.storeSubdomain || 'yourstore'}.oneclerk.shop</code>.</p>`,
      actionButton: { label: 'View Live Store →', handler: "setView('storefront')" }
    };
  }
  if (q.includes('unpublish') || q.includes('draft mode') || q.includes('make private')) {
    state.isPublished = false;
    saveStoreState();
    updatePublishingUI();
    return {
      html: `<p>Switched store back to <b>Private Draft Mode</b>. Visitors cannot access it until you publish again.</p>`
    };
  }

  // 11. SALES & REVENUE INTENT
  if (q.includes('sales') || q.includes('revenue') || q.includes('order') || q.includes('stats')) {
    return {
      html: `
        <p><b>Live Storefront Telemetry:</b></p>
        <p>• Orders Placed: <b>${state.orders.length} completed</b><br />
        • Catalog Size: <b>${state.products.length} products active</b><br />
        • 24/7 AI Concierge: <b>Online &amp; Responding</b><br />
        • Handover Tickets: <b>${state.inboxTickets.filter(t => t.status === 'Handover Required').length} pending review</b></p>
      `,
      actionButton: { label: 'Inspect Orders Tab →', handler: "switchDashTab('orders')" }
    };
  }

  // 12. DISCOUNT / COUPON INTENT
  if (q.includes('discount') || q.includes('promo') || q.includes('coupon') || q.includes('sale')) {
    return {
      html: `<p>Created active promo code <b>SPRING20</b> (20% off all catalog items). Linked to checkout drawer automatically.</p>`,
      actionButton: { label: 'Test at Checkout →', handler: "switchStudioScreen('cart')" }
    };
  }

  // 13. COPY / HEADLINE EDIT INTENT
  if (q.includes('headline') || q.includes('title') || q.includes('make hero') || q.includes('change text')) {
    const clean = text.replace(/change|headline|title|to|make|hero|say/gi, '').trim() || 'Sweet things, made slowly.';
    state.brand.heroHeadline = clean;
    saveStoreState();
    renderStorefrontStudio();
    renderStorefront();
    return {
      html: `<p>Updated hero headline to: <i>“${clean}”</i> on your Homepage screen.</p>`,
      actionButton: { label: 'View in Studio →', handler: "switchDashTab('storefront')" }
    };
  }

  // DEFAULT ASSISTANT RESPONSE
  return {
    html: `
      <p>I'm on it! Your store <b>${esc(state.storeName || "Mabel's")}</b> currently has <b>${state.products.length} active products</b>.</p>
      <p style="font-size:13px; color:#555; margin-top:6px;">You can prompt me to add new inventory, adjust pricing, switch visual templates, or generate sales copy anytime.</p>
    `
  };
}

/* =========================================================
   CUSTOMER-FACING LIVE STOREFRONT APP VIEW (#storefrontApp)
   24/7 AI Concierge + WhatsApp Direct + Human Handover
   ========================================================= */
function renderStorefront() {
  const sf = $('#storefrontApp'); if (!sf) return;
  const storeName = state.storeName || 'My Store';
  $('#sfNavBrandName').textContent = storeName;
  const chatStoreName = $('#sfChatStoreName'); if (chatStoreName) chatStoreName.textContent = storeName;
  const welcomeBrand = $('#sfChatWelcomeBrand'); if (welcomeBrand) welcomeBrand.textContent = storeName;

  // Render dynamic custom pages in storefront navbar
  const navList = sf.querySelector('.sf-nav-links');
  if (navList) {
    const existingCustomLinks = navList.querySelectorAll('.sf-custom-page-nav-item');
    existingCustomLinks.forEach(el => el.remove());

    (state.customPages || []).forEach(p => {
      const li = document.createElement('li');
      li.className = 'sf-custom-page-nav-item';
      li.innerHTML = `<a href="#/pages/${p.slug}" class="sf-nav-link" data-pageid="${p.id}">${esc(p.title)}</a>`;
      li.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        // Switch studio to this page and inform customer
        toast(`Viewing page: ${p.title}`);
        switchStudioScreen(p.id);
        // Switch to Storefront tab to see full studio canvas
        setView('dashboard');
        switchDashTab('storefront');
      });
      navList.appendChild(li);
    });
  }

  const heroTitle = $('#sfHeroHeadline');
  if (heroTitle) heroTitle.textContent = state.brand.heroHeadline || 'Handcrafted essentials made for everyday life.';
  const heroSub = $('#sfHeroSubhead');
  if (heroSub) heroSub.textContent = state.brand.heroSubtitle || 'Thoughtful pieces designed to bring warmth and calm to everyday spaces.';

  const adminBadge = $('#sfAdminModeBadge');
  if (adminBadge) adminBadge.textContent = state.isPublished ? 'Live Storefront' : 'Draft Preview Mode';
  const adminBtn = $('#sfAdminPublishBtn');
  if (adminBtn) adminBtn.textContent = state.isPublished ? 'Unpublish Store' : 'Publish Live';
  const adminText = $('#sfAdminPublishText');
  if (adminText) adminText.textContent = state.isPublished ? 'Unpublish Store' : 'Publish Live';
  const topPublishLabel = $('#sfTopPublishLabel');
  if (topPublishLabel) topPublishLabel.textContent = state.isPublished ? 'Unpublish Store' : 'Publish Live';

  const allProds = (state.products && state.products.length ? state.products : sampleProducts());
  const countAll = $('#countAll');
  if (countAll) countAll.textContent = allProds.length;

  // Filter products by search query and category
  const filter = state.sfFilter || 'all';
  const query = (state.sfSearchQuery || '').toLowerCase().trim();
  const sort = state.sfSort || 'featured';

  let filtered = allProds.filter(p => {
    const matchesQuery = !query || 
      (p.name && p.name.toLowerCase().includes(query)) || 
      (p.description && p.description.toLowerCase().includes(query)) ||
      (p.category && p.category.toLowerCase().includes(query));
    
    if (!matchesQuery) return false;
    if (filter === 'all') return true;
    if (filter === 'bestseller') return (parseInt(p.stock) || 0) > 10;
    if (filter === 'bakery') return (p.name || '').toLowerCase().includes('loaf') || (p.name || '').toLowerCase().includes('bake') || (p.category || '').toLowerCase().includes('food');
    if (filter === 'pantry') return (p.name || '').toLowerCase().includes('mug') || (p.name || '').toLowerCase().includes('candle') || (p.category || '').toLowerCase().includes('home');
    return true;
  });

  // Sort products
  if (sort === 'price-asc') {
    filtered.sort((a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0));
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0));
  } else if (sort === 'name-asc') {
    filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  const grid = $('#sfCatalogGrid');
  if (grid) {
    if (!filtered.length) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:60px 20px; background:rgba(18,18,18,0.02); border-radius:16px;">
          <i class="ph ph-magnifying-glass" style="font-size:32px; color:var(--text-secondary); margin-bottom:10px;"></i>
          <h4 style="margin:0 0 6px;">No products found</h4>
          <p style="font-size:13px; color:var(--text-secondary); margin:0;">Try adjusting your search keyword or clearing the category filter.</p>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(p => {
        const inStock = (parseInt(p.stock) || 0) > 0;
        const fulfill = (p.fulfillment || ['shipping', 'pickup']).map(f => f === 'pickup' ? '<i class="ph-bold ph-storefront"></i> Pickup' : '<i class="ph-bold ph-package"></i> Shipping').join(' • ');
        return `
          <div class="sf-product-card" data-sf-pid="${p.id}">
            <div class="sf-img-wrap" onclick="openProductQuickView('${p.id}')" title="Click to view details">
              <img src="${p.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80'}" alt="${esc(p.name)}" />
              <span class="sf-card-badge">${inStock ? 'In Stock' : 'Sold Out'}</span>
            </div>
            <div class="sf-card-details">
              <h3 class="sf-card-title">${esc(p.name)}</h3>
              <div class="sf-card-price">$${parseFloat(p.price || 0).toFixed(2)}</div>
              <div class="sf-card-fulfillment">${fulfill}</div>
              <div class="sf-card-actions-row">
                <button class="sf-quick-add-btn" type="button" onclick="addToCart('${p.id}')">
                  <i class="ph-bold ph-plus"></i> Add to Bag
                </button>
                <button class="sf-quick-view-btn" type="button" onclick="openProductQuickView('${p.id}')" title="Quick View">
                  <i class="ph ph-eye"></i> View
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  updateCartDrawer();
}

// ---------------------------------------------------------
// Product Quick View Modal Controller
// ---------------------------------------------------------
let activeModalProductId = null;
let activeModalQty = 1;

window.openProductQuickView = (productId) => {
  const p = (state.products && state.products.find(x => x.id === productId)) || sampleProducts().find(x => x.id === productId);
  if (!p) return;
  activeModalProductId = p.id;
  activeModalQty = 1;

  $('#sfModalImg').src = p.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600';
  $('#sfModalBrand').textContent = (state.storeName || 'OUR STORE').toUpperCase();
  $('#sfModalTitle').textContent = p.name || 'Product';
  $('#sfModalPrice').textContent = `$${parseFloat(p.price || 0).toFixed(2)}`;
  $('#sfModalDesc').textContent = p.description || 'Thoughtfully crafted with patient care. Hand-finished for everyday use and timeless aesthetics.';
  $('#sfModalBadge').textContent = (parseInt(p.stock) || 0) > 0 ? 'In Stock' : 'Made to Order';
  $('#sfModalQtyDisplay').textContent = '1';

  const modal = $('#sfProductModal');
  if (modal) modal.hidden = false;
};

$('#sfCloseModalBtn')?.addEventListener('click', () => {
  const modal = $('#sfProductModal');
  if (modal) modal.hidden = true;
});

$('#sfModalQtyMinusBtn')?.addEventListener('click', () => {
  if (activeModalQty > 1) {
    activeModalQty--;
    $('#sfModalQtyDisplay').textContent = activeModalQty;
  }
});

$('#sfModalQtyPlusBtn')?.addEventListener('click', () => {
  if (activeModalQty < 20) {
    activeModalQty++;
    $('#sfModalQtyDisplay').textContent = activeModalQty;
  }
});

$('#sfModalAddBtn')?.addEventListener('click', () => {
  const p = (state.products && state.products.find(x => x.id === activeModalProductId)) || sampleProducts().find(x => x.id === activeModalProductId);
  if (!p) return;
  for (let i = 0; i < activeModalQty; i++) {
    state.cart.push(p);
  }
  updateCartDrawer();
  const modal = $('#sfProductModal');
  if (modal) modal.hidden = true;
  $('#sfCartOverlay').hidden = false;
  toast(`Added ${activeModalQty}x "${p.name}" to shopping bag!`);
});

$('#sfModalAskAiBtn')?.addEventListener('click', () => {
  const p = (state.products && state.products.find(x => x.id === activeModalProductId)) || sampleProducts().find(x => x.id === activeModalProductId);
  const modal = $('#sfProductModal');
  if (modal) modal.hidden = true;
  if (sfChatPopup) sfChatPopup.hidden = false;
  if (p) {
    handleStorefrontCustomerChat(`Can you tell me more about ${p.name}? Is it in stock and how is it crafted?`);
  }
});

// Category Filter Tabs
$$('.sf-filter-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.sf-filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.sfFilter = btn.dataset.filter || 'all';
    renderStorefront();
  });
});

$$('.sf-nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const cat = link.dataset.cat;
    if (cat) {
      e.preventDefault();
      $$('.sf-nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      state.sfFilter = cat;
      $$('.sf-filter-pill').forEach(b => b.classList.toggle('active', (b.dataset.filter || 'all') === cat));
      renderStorefront();
      const catSec = $('#sfCatalogSection');
      if (catSec) catSec.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Live Instant Product Search
$('#sfProductSearchInput')?.addEventListener('input', (e) => {
  state.sfSearchQuery = e.target.value;
  const clearBtn = $('#sfSearchClearBtn');
  if (clearBtn) clearBtn.hidden = !e.target.value;
  renderStorefront();
});

$('#sfSearchClearBtn')?.addEventListener('click', () => {
  const inp = $('#sfProductSearchInput');
  if (inp) inp.value = '';
  state.sfSearchQuery = '';
  $('#sfSearchClearBtn').hidden = true;
  renderStorefront();
});

// Sort Selector
$('#sfSortSelect')?.addEventListener('change', (e) => {
  state.sfSort = e.target.value;
  renderStorefront();
});

// Customer Hero CTAs
$('#sfHeroShopBtn')?.addEventListener('click', () => {
  const catSec = $('#sfCatalogSection');
  if (catSec) catSec.scrollIntoView({ behavior: 'smooth' });
});

$('#sfHeroStoryBtn')?.addEventListener('click', () => {
  toast('Scroll down to explore our handcrafted collections and story.');
});

$('#sfNavOurStoryLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  toast(`Welcome to ${state.storeName || 'our store'}! Handcrafted in small batches.`);
});

$('#sfDismissAnnounceBtn')?.addEventListener('click', () => {
  const bar = $('#sfTopAnnounce');
  if (bar) bar.style.display = 'none';
});

// Real Testing Banner Buttons

// Direct buttons and hash link helpers for Dashboard and Storefront
$('#overviewTestStorefrontBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  setView('storefront');
});

$('#overviewQuickStorefrontBtn')?.addEventListener('click', () => {
  setView('dashboard');
  switchDashTab('storefront');
});

$$('a[href="#storefront"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    setView('storefront');
  });
});

$$('a[href="#dashboard"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    seedDemoStore();
    setView('dashboard');
  });
});

$('#sfTopReturnDashLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  setView('dashboard');
  switchDashTab('storefront');
});

$('#sfTopPublishToggleBtn')?.addEventListener('click', togglePublishAction);

$('#sfTopCopyUrlBtn')?.addEventListener('click', () => {
  const domain = `${(state.storeSubdomain || 'mystore')}.oneclerk.shop`;
  navigator.clipboard.writeText(`https://${domain}`).then(() => {
    toast(`Copied store URL: https://${domain}`);
  }).catch(() => {
    toast(`Store link: https://${domain}`);
  });
});

// ---------------------------------------------------------
// 24/7 Storefront AI Concierge Chatbot & Handover Logic
// ---------------------------------------------------------
const sfChatFloatBtn = $('#sfChatFloatBtn');
const sfChatPopup = $('#sfChatPopup');
const sfChatCloseBtn = $('#sfChatCloseBtn');
const sfChatInput = $('#sfChatInput');
const sfChatSendBtn = $('#sfChatSendBtn');
const sfChatMessages = $('#sfChatMessages');

sfChatFloatBtn?.addEventListener('click', () => {
  if (sfChatPopup) {
    sfChatPopup.hidden = !sfChatPopup.hidden;
    if (!sfChatPopup.hidden) sfChatInput?.focus();
  }
});

sfChatCloseBtn?.addEventListener('click', () => {
  if (sfChatPopup) sfChatPopup.hidden = true;
});

sfChatSendBtn?.addEventListener('click', () => {
  const q = sfChatInput?.value.trim();
  if (q) {
    handleStorefrontCustomerChat(q);
    sfChatInput.value = '';
  }
});

sfChatInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const q = sfChatInput?.value.trim();
    if (q) {
      handleStorefrontCustomerChat(q);
      sfChatInput.value = '';
    }
  }
});

// Quick question chips in storefront chatbot
document.addEventListener('click', (e) => {
  const chip = e.target.closest('.sf-quick-chip');
  if (chip) {
    const prompt = chip.dataset.prompt;
    if (prompt) handleStorefrontCustomerChat(prompt);
  }
});

async function handleStorefrontCustomerChat(query) {
  if (!sfChatMessages) return;

  // Render customer message
  const userDiv = document.createElement('div');
  userDiv.className = 'sf-chat-bubble user';
  userDiv.innerHTML = `<p>${esc(query)}</p>`;
  sfChatMessages.appendChild(userDiv);
  sfChatMessages.scrollTop = sfChatMessages.scrollHeight;

  // Thinking bubble
  const botDiv = document.createElement('div');
  botDiv.className = 'sf-chat-bubble bot';
  botDiv.innerHTML = `<span style="color:var(--text-secondary); font-size:12px;"><i class="ph-bold ph-spinner ph-spin"></i> Checking store catalog &amp; policies…</span>`;
  sfChatMessages.appendChild(botDiv);
  sfChatMessages.scrollTop = sfChatMessages.scrollHeight;

  await sleep(600);

  const q = query.toLowerCase();

  // CHECK FOR HUMAN HANDOVER INTENT
  const isHandover = q.includes('human') || q.includes('founder') || q.includes('speak to') || q.includes('agent') || q.includes('real person') || q.includes('someone') || q.includes('call') || q.includes('whatsapp') || q.includes('owner') || q.includes('talk to') || q.includes('wholesale') || q.includes('bulk') || q.includes('damage') || q.includes('broken') || q.includes('refund') || q.includes('return') || q.includes('custom order') || q.includes('allergy');

  if (isHandover) {
    // Generate WhatsApp direct link
    const waPhone = (state.whatsapp && state.whatsapp.phone ? state.whatsapp.phone.replace(/[^0-9]/g, '') : '15553829102');
    const waText = encodeURIComponent(`Hello Alex! Customer message on ${state.storeName || 'OneClerk store'}: "${query}"`);
    const waLink = `https://wa.me/${waPhone}?text=${waText}`;

    botDiv.innerHTML = `
      <p>I understand completely! I've escalated your message directly to our founder, <b>Alex Morgan</b>.</p>
      <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Alex has been alerted in the Founder Dashboard and will assist you shortly. You can also chat with them directly on WhatsApp:</p>
      <a class="sf-whatsapp-handover-btn" href="${waLink}" target="_blank" rel="noopener">
        <i class="ph-bold ph-whatsapp-logo" style="font-size:18px;"></i>
        <span>Chat with Founder on WhatsApp</span>
      </a>
    `;

    // Create ticket in state.inboxTickets
    const ticketId = 't_' + Date.now();
    const newTicket = {
      id: ticketId,
      customer: 'Storefront Customer',
      channel: 'Storefront Web Chat',
      time: 'Just now',
      query: query,
      status: 'Handover Required',
      urgency: 'High',
      unread: true,
      transcript: [
        { sender: 'customer', text: query },
        { sender: 'ai', text: `Handed over to founder. Offered direct WhatsApp connection (${state.whatsapp.phone}).` }
      ]
    };

    state.inboxTickets.unshift(newTicket);
    state.activeInboxTicketId = ticketId;
    saveStoreState();
    renderInboxHub();

    // Notify founder
    toast(`Storefront Handover: Customer requested founder assistance for "${query.slice(0, 30)}…"`);
  } else if (q.includes('stock') || q.includes('product') || q.includes('item') || q.includes('candle') || q.includes('mug') || q.includes('bake') || q.includes('sourdough')) {
    // Match against catalog products
    const matches = state.products.filter(p => {
      const pName = (p.name || '').toLowerCase();
      const pCat = (p.type || p.category || '').toLowerCase();
      return q.includes(pName) || q.includes(pCat) || pName.includes(q.split(' ')[0]);
    });

    const itemsToShow = matches.length ? matches.slice(0, 2) : state.products.slice(0, 2);

    botDiv.innerHTML = `
      <p>Here are matching items from our live catalog:</p>
      <div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
        ${itemsToShow.map(p => `
          <div style="display:flex; align-items:center; gap:8px; background:var(--bg-canvas); padding:8px; border-radius:8px;">
            <img src="${p.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=80'}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;" />
            <div style="flex:1;">
              <b style="font-size:12px; display:block;">${esc(p.name)}</b>
              <span style="font-size:12px; color:var(--text-secondary);">$${parseFloat(p.price || 0).toFixed(2)} · ${p.stock > 0 ? 'In Stock' : 'Sold Out'}</span>
            </div>
            <button class="btn btn-primary btn-xs" type="button" onclick="addToCart('${p.id}')">+ Add</button>
          </div>
        `).join('')}
      </div>
    `;
  } else if (q.includes('shipping') || q.includes('pickup') || q.includes('delivery') || q.includes('how much is shipping')) {
    botDiv.innerHTML = `
      <p>We offer <b>Free Express Parcel Shipping</b> on all orders over $75, and <b>Free Curbside / In-Store Pickup</b> ready within 2 hours at our Brooklyn studio!</p>
      <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Standard parcel transit is 2-4 business days with full door-to-door tracking.</p>
    `;
  } else {
    botDiv.innerHTML = `
      <p>Thanks for visiting <b>${esc(state.storeName || 'our shop')}</b>! All items in our catalog are handcrafted in small batches.</p>
      <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">Can I help you add an item to your bag, or would you like to speak directly with our founder?</p>
      <div class="sf-chat-quick-chips" style="margin-top:8px;">
        <button class="sf-quick-chip" type="button" data-prompt="What products do you have in stock?">What's in stock?</button>
        <button class="sf-quick-chip" type="button" data-prompt="I'd like to speak with the founder / human">Talk to Founder 💬</button>
      </div>
    `;
  }

  sfChatMessages.scrollTop = sfChatMessages.scrollHeight;
}

// ---------------------------------------------------------
// Dashboard Omnichannel Customer Inbox & Handover Hub
// ---------------------------------------------------------
function renderInboxHub() {
  const container = $('#inboxThreadsList');
  if (!container) return;

  const handoverTickets = state.inboxTickets.filter(t => t.status === 'Handover Required');
  const handoverBadge = $('#inboxHandoverCount');
  if (handoverBadge) handoverBadge.textContent = handoverTickets.length;
  const filterBadge = $('#inboxFilterHandoverBadge');
  if (filterBadge) filterBadge.textContent = handoverTickets.length;

  // Filter list
  let tickets = [...state.inboxTickets];
  if (state.inboxFilterMode === 'handover') {
    tickets = tickets.filter(t => t.status === 'Handover Required');
  }

  container.innerHTML = tickets.map(t => {
    const isActive = t.id === state.activeInboxTicketId;
    const isHandover = t.status === 'Handover Required';
    const initials = t.customer.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'CU';

    return `
      <div class="inbox-thread-item ${isActive ? 'active' : ''}" data-ticket-id="${t.id}" style="cursor:pointer;">
        <div class="thread-avatar">${initials}</div>
        <div class="thread-content" style="flex:1;">
          <div class="thread-meta">
            <b>${esc(t.customer)}</b>
            <span class="thread-time">${t.time}</span>
          </div>
          <p class="thread-snippet">"${esc(t.query)}"</p>
          <div class="thread-tags" style="margin-top:6px; display:flex; gap:6px; align-items:center;">
            <span class="tag-channel" style="font-size:12px;">${t.channel}</span>
            ${isHandover 
              ? `<span class="inbox-handover-pill"><i class="ph-bold ph-bell"></i> Handover Required</span>` 
              : `<span class="tag-status" style="font-size:12px;">${t.status}</span>`}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Wire thread item clicks
  container.querySelectorAll('.inbox-thread-item').forEach(item => {
    item.addEventListener('click', () => {
      state.activeInboxTicketId = item.dataset.ticketId;
      renderInboxHub();
    });
  });

  // Render active chat pane
  const activeTicket = state.inboxTickets.find(t => t.id === state.activeInboxTicketId) || state.inboxTickets[0];
  if (!activeTicket) return;

  const headerUser = $('#inboxChatHeaderUser');
  if (headerUser) headerUser.textContent = activeTicket.customer;

  const headerMeta = $('#inboxChatHeaderMeta');
  if (headerMeta) {
    headerMeta.textContent = `${activeTicket.channel} · ${activeTicket.status}`;
  }

  const stage = $('#inboxMessagesStage');
  if (stage) {
    stage.innerHTML = activeTicket.transcript.map(msg => `
      <div class="chat-msg ${msg.sender === 'customer' ? 'customer' : msg.sender === 'founder' ? 'founder' : 'ai'}" style="${msg.sender === 'founder' ? 'align-self:flex-end;' : ''}">
        <div class="msg-bubble ${msg.sender === 'ai' ? 'ai-bubble' : ''}" style="${msg.sender === 'founder' ? 'background:#121212; color:#fff; border-radius:14px; padding:10px 14px;' : ''}">
          ${msg.sender === 'founder' ? `<b>Alex Morgan (Founder):</b> ` : ''}${esc(msg.text)}
        </div>
        <span class="msg-meta">${msg.sender === 'customer' ? 'Customer' : msg.sender === 'founder' ? 'Alex Morgan (Founder)' : 'OneClerk AI Concierge'}</span>
      </div>
    `).join('');
    stage.scrollTop = stage.scrollHeight;
  }
}

// Send founder reply to customer
$('#inboxSendReplyBtn')?.addEventListener('click', handleFounderReply);
$('#inboxReplyInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleFounderReply();
  }
});

function handleFounderReply() {
  const inp = $('#inboxReplyInput');
  const text = inp?.value.trim();
  if (!text) return;

  const activeTicket = state.inboxTickets.find(t => t.id === state.activeInboxTicketId) || state.inboxTickets[0];
  if (!activeTicket) return;

  activeTicket.transcript.push({
    sender: 'founder',
    text: text
  });
  activeTicket.status = 'Handled by Founder';
  saveStoreState();
  inp.value = '';

  // Reflect back into customer storefront chat if storefront is open
  if (sfChatMessages) {
    const founderDiv = document.createElement('div');
    founderDiv.className = 'sf-chat-bubble bot';
    founderDiv.style.border = '2px solid #121212';
    founderDiv.innerHTML = `
      <div style="font-size:12px; font-weight:800; color:#121212; display:flex; align-items:center; gap:4px; margin-bottom:2px;">
        <i class="ph-bold ph-user-circle"></i> Alex Morgan (Store Founder):
      </div>
      <p>${esc(text)}</p>
    `;
    sfChatMessages.appendChild(founderDiv);
    sfChatMessages.scrollTop = sfChatMessages.scrollHeight;
  }

  renderInboxHub();
  toast('Reply delivered directly to customer on Storefront / WhatsApp!');
}

$('#inboxResolveTicketBtn')?.addEventListener('click', () => {
  const activeTicket = state.inboxTickets.find(t => t.id === state.activeInboxTicketId);
  if (!activeTicket) return;
  activeTicket.status = 'Resolved';
  saveStoreState();
  renderInboxHub();
  toast('Ticket marked as resolved');
});

$('#inboxSimulateHandoverBtn')?.addEventListener('click', () => {
  const sampleQueries = [
    'I want to place a custom bulk order of 80 ceramic mugs for a corporate retreat next month. Can I speak to the founder?',
    'Hi! My order #1014 arrived with a chipped rim. Can I speak with Alex about a replacement?',
    'Do you have custom wedding gift baskets with personalized calligraphy?',
  ];
  const query = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
  const ticketId = 't_' + Date.now();
  const ticket = {
    id: ticketId,
    customer: 'Chloe Bennett (Storefront Customer)',
    channel: 'Storefront Web Chat',
    time: 'Just now',
    query: query,
    status: 'Handover Required',
    urgency: 'High',
    unread: true,
    transcript: [
      { sender: 'customer', text: query },
      { sender: 'ai', text: 'Alerted founder in Dashboard. Offered WhatsApp direct link.' }
    ]
  };
  state.inboxTickets.unshift(ticket);
  state.activeInboxTicketId = ticketId;
  saveStoreState();
  renderInboxHub();
  toast('New customer handover ticket simulated! Click the thread to reply.');
});

$('#inboxOpenWaDirectBtn')?.addEventListener('click', () => {
  const phone = (state.whatsapp && state.whatsapp.phone ? state.whatsapp.phone.replace(/[^0-9]/g, '') : '15553829102');
  window.open(`https://wa.me/${phone}`, '_blank');
});

// Filter buttons in Inbox
$('#inboxFilterAllBtn')?.addEventListener('click', () => {
  state.inboxFilterMode = 'all';
  $('#inboxFilterAllBtn').style.background = '#121212';
  $('#inboxFilterAllBtn').style.color = '#fff';
  $('#inboxFilterHandoverBtn').style.background = '';
  $('#inboxFilterHandoverBtn').style.color = '';
  renderInboxHub();
});

$('#inboxFilterHandoverBtn')?.addEventListener('click', () => {
  state.inboxFilterMode = 'handover';
  $('#inboxFilterHandoverBtn').style.background = '#121212';
  $('#inboxFilterHandoverBtn').style.color = '#fff';
  $('#inboxFilterAllBtn').style.background = '';
  $('#inboxFilterAllBtn').style.color = '';
  renderInboxHub();
});

// Hash Routing for direct links
function handleRoute() {
  const hash = (window.location.hash || '').toLowerCase();
  const search = (window.location.search || '').toLowerCase();
  
  if (hash === '#storefront' || hash.startsWith('#storefront') || search.includes('storefront')) {
    setView('storefront');
  } else if (hash === '#dashboard' || hash.startsWith('#dashboard') || search.includes('dashboard')) {
    seedDemoStore();
    setView('dashboard');
    if (hash === '#dashboard/storefront' || hash.includes('tab=storefront')) {
      switchDashTab('storefront');
    } else if (hash === '#dashboard/catalog' || hash.includes('tab=catalog')) {
      switchDashTab('catalog');
    }
  } else if (hash === '#landing' || hash === '#home') {
    setView('landing');
  }
}
window.addEventListener('hashchange', handleRoute);

$('#sfTopReturnDashLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  setView('dashboard');
});

function sampleProducts() {
  return [
    { id: 's1', name: 'Hand-thrown Ceramic Mug', price: '38.00', stock: 24, fulfillment: ['shipping', 'pickup'], image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600' },
    { id: 's2', name: 'Smoked Cedar Soy Candle', price: '28.00', stock: 18, fulfillment: ['shipping', 'pickup'], image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600' },
  ];
}

window.addToCart = (productId) => {
  const p = state.products.find(x => x.id === productId) || sampleProducts().find(x => x.id === productId);
  if (!p) return;
  state.cart.push(p);
  updateCartDrawer();
  $('#sfCartOverlay').hidden = false;
  toast(`Added "${p.name}" to shopping bag!`);
};

function updateCartDrawer() {
  const count = state.cart.length;
  const countBadge = $('#sfBagCountBadge'); if (countBadge) countBadge.textContent = count;
  const itemCount = $('#sfCartItemCount'); if (itemCount) itemCount.textContent = count;

  const list = $('#sfCartItemsList');
  if (!list) return;

  if (!count) {
    list.innerHTML = `
      <div style="text-align:center; padding:48px 20px; color:var(--text-secondary);">
        <i class="ph ph-shopping-bag" style="font-size:36px; color:rgba(18,18,18,0.25); margin-bottom:10px;"></i>
        <h4 style="margin:0 0 6px; color:#121212;">Your shopping bag is empty</h4>
        <p style="font-size:13px; margin:0 0 16px;">Discover small-batch essentials from our artisan collection.</p>
        <button class="btn btn-primary btn-sm" type="button" onclick="$('#sfCartOverlay').hidden=true;">
          Browse Catalog →
        </button>
      </div>
    `;
    $('#sfCartSubtotal').textContent = '$0.00';
    $('#sfCartTotal').textContent = '$0.00';
    $('#sfCartFooter').style.display = 'none';
    return;
  }

  $('#sfCartFooter').style.display = 'block';

  let subtotal = 0;
  // Group cart items by id to allow quantity controls
  const grouped = [];
  state.cart.forEach(item => {
    const existing = grouped.find(g => g.id === item.id);
    if (existing) {
      existing.qty++;
    } else {
      grouped.push({ ...item, qty: 1 });
    }
  });

  list.innerHTML = grouped.map((item) => {
    const cost = parseFloat(item.price || 0);
    const itemTotal = cost * item.qty;
    subtotal += itemTotal;
    return `
      <div class="sf-cart-item">
        <img src="${item.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=120'}" alt="${esc(item.name)}" />
        <div class="sf-cart-item-info">
          <b>${esc(item.name)}</b>
          <span style="font-size:13px; color:var(--text-secondary);">$${cost.toFixed(2)} each</span>
          <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
            <div class="sf-qty-stepper" style="padding:0;">
              <button type="button" onclick="changeCartItemQty('${item.id}', -1)" style="width:26px; height:26px;"><i class="ph-bold ph-minus"></i></button>
              <span style="font-size:12px; padding:0 8px;">${item.qty}</span>
              <button type="button" onclick="changeCartItemQty('${item.id}', 1)" style="width:26px; height:26px;"><i class="ph-bold ph-plus"></i></button>
            </div>
            <button class="btn-text" onclick="removeAllOfItemFromCart('${item.id}')" style="color:var(--text-secondary); font-size:12px; padding:2px 6px;">
              <i class="ph ph-trash"></i> Remove
            </button>
          </div>
        </div>
        <div style="font-size:14px; font-weight:700; color:#121212;">
          $${itemTotal.toFixed(2)}
        </div>
      </div>
    `;
  }).join('');

  $('#sfCartSubtotal').textContent = `$${subtotal.toFixed(2)}`;

  // Promo code calculation
  let discountAmount = 0;
  const promo = (state.cartPromoCode || '').toUpperCase();
  if (promo === 'SPRING20') {
    discountAmount = subtotal * 0.20;
  } else if (promo === 'WELCOME10') {
    discountAmount = Math.min(10, subtotal);
  }

  const discountRow = $('#sfDiscountRow');
  const discountSpan = $('#sfCartDiscount');
  if (discountAmount > 0) {
    if (discountRow) discountRow.hidden = false;
    if (discountSpan) discountSpan.textContent = `-$${discountAmount.toFixed(2)} (${promo})`;
  } else {
    if (discountRow) discountRow.hidden = true;
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);
  $('#sfCartTotal').textContent = `$${finalTotal.toFixed(2)}`;
}

window.changeCartItemQty = (productId, delta) => {
  if (delta > 0) {
    const p = state.products.find(x => x.id === productId) || sampleProducts().find(x => x.id === productId);
    if (p) state.cart.push(p);
  } else {
    const idx = state.cart.findLastIndex(x => x.id === productId);
    if (idx !== -1) state.cart.splice(idx, 1);
  }
  updateCartDrawer();
};

window.removeAllOfItemFromCart = (productId) => {
  state.cart = state.cart.filter(x => x.id !== productId);
  updateCartDrawer();
  toast('Item removed from bag.');
};

window.removeFromCart = (idx) => {
  state.cart.splice(idx, 1);
  updateCartDrawer();
};

$('#sfOpenBagBtn')?.addEventListener('click', () => { 
  $('#sfCartOverlay').hidden = false; 
  $('#sfOrderConfirmedView').hidden = true;
  if (state.cart.length) $('#sfCartFooter').style.display = 'block';
});
$('#sfCloseCartBtn')?.addEventListener('click', () => { $('#sfCartOverlay').hidden = true; });

// Cart Fulfillment Selector Radio Buttons
document.querySelectorAll('input[name="cartFulfill"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    $('#sfFulfillShippingLabel')?.classList.toggle('active', e.target.value === 'shipping');
    $('#sfFulfillPickupLabel')?.classList.toggle('active', e.target.value === 'pickup');
  });
});

// Promo Code Handlers
$('#sfApplyPromoBtn')?.addEventListener('click', () => {
  const code = $('#sfPromoInput')?.value.trim().toUpperCase();
  applyPromoCode(code);
});

$$('.sf-promo-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const code = chip.dataset.code;
    if (code) {
      const inp = $('#sfPromoInput');
      if (inp) inp.value = code;
      applyPromoCode(code);
    }
  });
});

function applyPromoCode(code) {
  const msg = $('#sfPromoAppliedMsg');
  if (code === 'SPRING20') {
    state.cartPromoCode = 'SPRING20';
    if (msg) {
      msg.hidden = false;
      msg.textContent = '✓ 20% discount applied to your order!';
    }
    toast('Applied SPRING20 (20% off)!');
  } else if (code === 'WELCOME10') {
    state.cartPromoCode = 'WELCOME10';
    if (msg) {
      msg.hidden = false;
      msg.textContent = '✓ $10.00 first order discount applied!';
    }
    toast('Applied WELCOME10 ($10 off)!');
  } else {
    state.cartPromoCode = '';
    if (msg) {
      msg.hidden = false;
      msg.textContent = 'Invalid promo code. Try SPRING20 or WELCOME10.';
    }
    toast('Invalid coupon code.');
  }
  updateCartDrawer();
}

// Checkout in Storefront Bag Drawer with Simulated Confirmed View
$('#sfCheckoutBtn')?.addEventListener('click', () => {
  if (!state.cart.length) return toast('Bag is empty.');
  confetti();
  const orderId = Math.floor(1000 + Math.random() * 9000);
  const itemsText = `${state.cart.length}x Items (${state.cart.map(i => i.name).slice(0, 2).join(', ')})`;
  const totalPaid = $('#sfCartTotal').textContent || $('#sfCartSubtotal').textContent;

  state.orders.unshift({
    id: String(orderId),
    date: 'Just now',
    customer: 'Online Shopper',
    email: 'shopper@example.com',
    items: itemsText,
    payment: 'Paid (Apple Pay)',
    fulfillment: 'Ready for Pickup',
    total: totalPaid
  });

  // Render receipt in drawer
  const summaryBox = $('#sfConfirmedSummary');
  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span>Items (${state.cart.length}):</span>
        <b>${itemsText}</b>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span>Amount Charged:</span>
        <b>${totalPaid}</b>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span>Estimated Transit:</span>
        <b>Ready in 2h / Tracking active</b>
      </div>
    `;
  }

  const orderIdEl = $('#sfConfirmedOrderId');
  if (orderIdEl) orderIdEl.textContent = `#OC-${orderId}`;

  state.cart = [];
  state.cartPromoCode = '';
  updateCartDrawer();

  // Show confirmed view and hide footer
  $('#sfCartFooter').style.display = 'none';
  $('#sfOrderConfirmedView').hidden = false;
  toast(`Order #OC-${orderId} placed successfully! Recorded in founder dashboard.`);
});

$('#sfContinueShoppingBtn')?.addEventListener('click', () => {
  $('#sfOrderConfirmedView').hidden = true;
  $('#sfCartOverlay').hidden = true;
});

$('#sfBackToDashBtn')?.addEventListener('click', () => {
  setView('dashboard');
  switchDashTab('storefront');
});

$('#sfAdminPublishBtn')?.addEventListener('click', togglePublishAction);

$('#viewLiveStoreBtn')?.addEventListener('click', () => setView('storefront'));
$('#studioOpenLiveBtn')?.addEventListener('click', () => setView('storefront'));

/* =========================================================
   LANDING PAGE INTERACTIONS & ROUTING
   ========================================================= */
$('#landingHomeLogo')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

$('#landingStartFreeNavBtn')?.addEventListener('click', () => setView('onboarding'));
$('#landingHeroCtaBtn')?.addEventListener('click', () => setView('onboarding'));
$('#landingBannerCtaBtn')?.addEventListener('click', () => setView('onboarding'));
$('#pricingStarterBtn')?.addEventListener('click', () => setView('onboarding'));
$('#galleryTryVibeBtn')?.addEventListener('click', () => setView('onboarding'));

$('#pricingGrowthBtn')?.addEventListener('click', () => openAuthModal('signup'));
$('#pricingScaleBtn')?.addEventListener('click', () => {
  toast('Studio Concierge: Our VIP team will contact you within 24 hours.');
});

$('#landingLoginBtn')?.addEventListener('click', () => openAuthModal('login'));
$('#landingExploreDemoBtn')?.addEventListener('click', () => {
  seedDemoStore();
  setView('dashboard');
  toast('Welcome to your demo store! Explore My Clerk, catalog, and storefront.');
});
$('#landingBannerDemoBtn')?.addEventListener('click', () => {
  seedDemoStore();
  setView('dashboard');
  toast('Welcome to your demo store! Explore My Clerk, catalog, and storefront.');
});

$('#backToHomeBtn')?.addEventListener('click', () => setView('landing'));
$('#exitToLandingBtn')?.addEventListener('click', () => setView('landing'));

// Interactive Showcase tabs on landing page
$$('.showcase-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.showcase-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const mode = tab.dataset.showcase;
    const promptEl = $('#showcasePromptText');
    const thumb = $('.showcase-thumb');
    const h4 = $('.showcase-meta h4');
    const price = $('.showcase-meta .price');
    const pills = $('.showcase-meta .pill-row');
    if (mode === 'photo') {
      if (promptEl) promptEl.textContent = '“Take this phone photo of ceramic mug. Remove background, place on soft marble with morning sun shadow, and suggest price for handmade pottery.”';
      if (thumb) thumb.src = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80';
      if (h4) h4.textContent = 'Hand-thrown Ceramic Mug';
      if (price) price.textContent = '$38.00';
      if (pills) pills.innerHTML = '<span>Terracotta & Sand</span><span>Free Pickup Available</span><span>In Stock (42)</span>';
    } else if (mode === 'variants') {
      if (promptEl) promptEl.textContent = '“Generate non-tech customer choices for linen tote bag: 3 earthy colorways, monogram option, and studio pickup counter.”';
      if (thumb) thumb.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80';
      if (h4) h4.textContent = 'Heavyweight Organic Linen Tote';
      if (price) price.textContent = '$46.00';
      if (pills) pills.innerHTML = '<span>Linen / Clay / Olive</span><span>Custom Monogram</span><span>Postal & Pickup</span>';
    } else if (mode === 'checkout') {
      if (promptEl) promptEl.textContent = '“Customer is ordering sourdough loaf and espresso beans. Enable contactless curbside pickup for the bread and standard shipping for beans.”';
      if (thumb) thumb.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80';
      if (h4) h4.textContent = 'Country Sourdough + Roaster Beans';
      if (price) price.textContent = '$34.00';
      if (pills) pills.innerHTML = '<span>Curbside Pickup (Today)</span><span>Postal Shipping</span><span>Apple Pay 1-Click</span>';
    }
  });
});

// Gallery Vibe tabs on landing page
$$('.gallery-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.gallery-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const vibe = btn.dataset.vibe;
    const pill = $('#galleryVibePill');
    const title = $('#galleryVibeTitle');
    const desc = $('#galleryVibeDesc');
    if (vibe === 'studio') {
      if (pill) pill.textContent = 'Studio · Minimal & Editorial';
      if (title) title.textContent = 'Considered goods for everyday rituals.';
      if (desc) desc.textContent = 'Refined typography and generous negative space crafted for design-forward brands.';
      state.template = 'mabel';
    } else if (vibe === 'bold') {
      if (pill) pill.textContent = 'Bold · Modernist Monochrome';
      if (title) title.textContent = 'Precision tools designed without compromise.';
      if (desc) desc.textContent = 'Deep contrast, geometric clarity, and high-impact layouts for modern craft.';
      state.template = 'atelier';
    } else if (vibe === 'soft') {
      if (pill) pill.textContent = 'Soft · Earth & Warm Linen';
      if (title) title.textContent = 'Small-batch creations rooted in earth.';
      if (desc) desc.textContent = 'Warm ceramic tones and tactile simplicity tailored for independent creators.';
      state.template = 'solstice';
    } else if (vibe === 'market') {
      if (pill) pill.textContent = 'Market · High-Velocity Commerce';
      if (title) title.textContent = 'Instant conversion for artisan products.';
      if (desc) desc.textContent = 'Crisp, conversion-focused product merchandising with friction-free checkout.';
      state.template = 'mono';
    }
  });
});

/* =========================================================
   PERSISTENCE & INITIALIZATION
   ========================================================= */
let toastTimer;
function toast(msg) {
  const el = $('#toast'); if (!el) return;
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

function saveStoreState() {
  try {
    localStorage.setItem('oneclerk_store', JSON.stringify({
      category: state.category,
      categoryLabel: state.categoryLabel,
      storeName: state.storeName,
      storeSubdomain: state.storeSubdomain,
      products: state.products,
      template: state.template,
      currentScreen: state.currentScreen,
      brand: state.brand,
      user: state.user,
      isLaunched: state.isLaunched,
      isPublished: state.isPublished,
      orders: state.orders
    }));
  } catch (e) {
    console.warn('Could not save state', e);
  }
}

// Restore saved session
try {
  const saved = localStorage.getItem('oneclerk_store');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed) {
      Object.assign(state, parsed);
    }
  }
} catch (e) {
  console.warn('Failed restoring session', e);
}

// If no products exist yet, seed the 4 boutique items
if (!state.products || !state.products.length) {
  seedDemoStore();
}

// Initialize Theme (Light / Dark)
initTheme();

// Safe Initial View Determination with Hash Support
const initHash = (window.location.hash || '').toLowerCase();
const initSearch = (window.location.search || '').toLowerCase();

if (initHash === '#storefront' || initHash.startsWith('#storefront') || initSearch.includes('storefront')) {
  setView('storefront');
} else if (initHash === '#dashboard' || initHash.startsWith('#dashboard') || initSearch.includes('dashboard') || (state.isLaunched && state.user)) {
  seedDemoStore();
  setView('dashboard');
} else {
  setView('landing');
}

// Global safeguard against background tab discard
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && state.isLaunched && state.user) {
    if (state.currentView === 'dashboard') {
      setView('dashboard');
    }
  }
});
