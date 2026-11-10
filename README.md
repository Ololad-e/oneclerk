# OneClerk — AI-First E-Commerce Operating System

> **Design & Engineering Iteration Prototype**  
> **Author & Designer:** Ololade Oduyomi  
> **Project Context:** Interactive prototype and design iteration workflow for [oneclerk.com](https://oneclerk.com), exploring an AI-first commerce operating system built for less tech-savvy business owners, makers, and independent artisans.

---

## 📖 Overview

This repository represents **Ololade Oduyomi's** design iteration for **OneClerk** ([oneclerk.com](https://oneclerk.com)). It serves as a working, high-fidelity prototype and functional spec crafted as an essential part of my workflow in designing the main application experience.

Traditional e-commerce platforms overwhelm non-technical creators with endless menus, SKU matrices, complex database configurations, and rigid template hierarchies. OneClerk reimagines this paradigm by placing AI-assisted generation, conversational interfaces, and frictionless progressive disclosure at the very core of the product journey.

---

## 🎯 Design Pillars & Philosophy

1. **AI-First & Accessible by Default**  
   Every complex e-commerce task (catalog creation, image enhancement, template customisation, customer support) can be performed either traditionally or conversationally via **My Clerk** — a sticky omnipresent AI assistant.
2. **Whitespace & Progressive Disclosure**  
   Interface density is carefully modulated. The product creation flow uses a full-screen, typeform-inspired, one-question-at-a-time experience so users never feel overwhelmed.
3. **Monochromatic & Modern Visual Hierarchy**  
   A restrained, elegant monochromatic palette (`#121212`, `#FFFFFF`, neutral canvas surfaces `#F5F4F0`, and crisp `#E7E5DE` borders) ensures focus stays strictly on products and brand typography. Zero distracting bright green elements.
4. **Clean Design Systems with Phosphor Icons**  
   All visual cues and interactive states utilise Phosphor vector icons exclusively, removing cluttered 3D emoji representations in favour of clean, SaaS-grade UI conventions.
5. **Universal Screen Responsiveness & Accessibility**  
   Engineered with 100% responsive breakpoints (Desktop, Tablet/iPad 768px, and Mobile 375px) and a minimum font-size floor ($\ge 12\text{px}$) across all screens.

---

## 🚀 Key Iteration Modules

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ONECLERK ECOSYSTEM                              │
├──────────────────┬───────────────────────┬─────────────────────────────┤
│ 1. Landing Page  │ 2. Guided Onboarding  │ 3. Founder Dashboard        │
│ • Showcase Stage │ • 1-Question Focus    │ • Real-time Metrics         │
│ • Direct Access  │ • Multi-Category Data │ • Full-Page Product Studio  │
│ • Theme Toggle   │ • Template Vibe Pick  │ • Storefront Studio Canvas  │
├──────────────────┴───────────────────────┴─────────────────────────────┤
│ 4. Storefront Studio & Clerk AI Page Generator                         │
│ • 5 Predesigned Screens (Home, PDP, Cart, Story, Confirmation)         │
│ • Dual-Path Add Page: Quick Spec Form OR/AND Conversational Architect  │
│ • Template Screen Collision Detection & Multi-Step AI Synthesis        │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Customer Storefront & 24/7 AI Concierge                             │
│ • WhatsApp Direct Chat Integration                                     │
│ • Omnichannel Human Handover Ticket Workflow                           │
│ • Instant Product Search, Quick-View Modal & Slide Checkout            │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Landing Page (`#landingPage`)
- Linear/Glide-inspired layout with interactive feature showcases.
- One-click navigation directly to live **Storefront** (`#storefront`), **Dashboard** (`#dashboard`), and self-guided Onboarding.
- Integrated Light / Dark mode theme toggle.

### 2. Guided 60-Second Onboarding (`#flow`)
- Frictionless category selection (Fashion, Food & Drinks, Beauty, Home, Art, Electronics).
- Instant brand identity and typography vibe synthesis (Mabel, Atelier, Aether, Solace).
- Automatic sample product seeding with realistic high-resolution imagery and pricing tiers.

### 3. Founder Dashboard (`#dashboardApp`)
- **Overview & Velocity**: Real-time sales metrics, order fulfillment trackers, and instant draft-to-live toggle.
- **Boutique Catalog & Typeform Studio**:
  - Dual view toggle: Visual Boutique Cards vs. Structured Data Table.
  - Interactive Typeform Product Studio: 1-question-at-a-time progressive activation with auto-scroll and AI image generation/enhancement suggestions.
- **Omnichannel Inbox & Support**: Unified ticket hub tracking live web chats, WhatsApp conversations, AI-handled resolutions, and human handover alerts.

### 4. Storefront Studio & Custom Page Generator (`#tab-storefront`)
- **Live Canvas Preview**: Switch between Desktop (100%), Tablet/iPad (768px), and Mobile (375px) preview viewports.
- **5 Core Pre-designed Conversion Screens**:
  1. *Homepage* — Whitespaced editorial hero, collection grid, and founder note.
  2. *Product Detail (PDP)* — Visual gallery, variant chips, stock status, and add-to-bag.
  3. *Bag & Express Checkout* — Slide-out drawer with promo code validation and order totals.
  4. *Brand Story / Origin* — Editorial narrative and artisan workshop principles.
  5. *Order Confirmation* — Celebratory receipt tracker and fulfillment timeline.
- **Add New Page with Clerk AI (`#newPageModal`)**:
  - **Quick Spec Form**: 6 Archetypes (Lookbook Gallery, Wholesale B2B, Care & Sizing Specs, Press Mentions, Events & Workshops, FAQ & Policies), title input, and live auto-slug preview (`/pages/[slug]`).
  - **Conversational Page Architect**: Natural language chatbot synthesizing bespoke copy, layout, and components matching the active template guide.
  - **Collision Detection**: Detects requests for existing core screens or previously created custom pages, offering instant canvas navigation instead of generating redundant duplicates.

### 5. Live Customer Storefront (`#storefrontApp`)
- Fully functioning customer experience running on `yourstore.oneclerk.shop`.
- Live instant product search, category filtering, quick-view modal, and simulated checkout.
- **24/7 AI Storefront Concierge**: Answers product questions, confirms dietary/sizing specs, and routes complex customer inquiries to WhatsApp or founder dashboard handover tickets.

---

## 🛠 Tech Stack & Architecture

- **Markup & Layout**: Semantic HTML5 with custom modular sections.
- **Styling**: Pure vanilla CSS3 with CSS custom properties (`--bg-surface`, `--bg-canvas`, `--border-default`, `--text-primary`), zero heavy CSS runtime overhead, strictly monochromatic palette, and responsive media queries.
- **State & Logic**: Vanilla JavaScript (ES2022) with single-source-of-truth `state` object, reactive re-rendering, `localStorage` persistence, and client-side hash routing (`#landing`, `#dashboard`, `#storefront`).
- **Icons**: Phosphor Icons library (Vector SVG / Web Font).

---

## 💻 Running the Prototype Locally

[oneclerk-iteration.vercel.app](https://oneclerk-iteration.vercel.app/)
**---

## 👤 Author & Design Credit

**Ololade Oduyomi**  
*Senior Product Designer & Design Engineer*  
- Portfolio / Contact: [ololade.xyz](https://www.ololade.xyz)  
- Iteration Focus: User experience, accessibility for non-technical entrepreneurs, conversational commerce UI, and template layout generation.

---

*Designed and prototyped with care as part of the core product definition for OneClerk.*

