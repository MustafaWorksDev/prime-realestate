import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Bed,
  Bath,
  Maximize,
  ArrowUpRight,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Check,
  Building2,
  Home as HomeIcon,
  TrendingUp,
  KeyRound,
  Handshake,
  Facebook,
  Instagram,
  Twitter,
  Music2,
  Search,
  Quote,
} from "lucide-react";

/* ============================================================
   COMPANY
============================================================ */

const COMPANY = {
  name: "Prime Property & Developers",
  legalName: "Prime Property & Developers Pvt. Ltd.",
  phone: "0300 3794458",
  phoneIntl: "923003794458",
  email: "primepropertypk@gmail.com",

  address: [
    "6 Mezzanine Floor, Mujahid Plaza,",
    "Jinnah Avenue, Block H, G-7/2,",
    "Blue Area, Islamabad, Pakistan",
  ],

  instagram: "@prime_property.developers",
  facebook: "Prime Property & Developers",
  twitter: "@PrimeProperty7",
  tiktok: "@prime_property_dev.com",
};

const WHATSAPP_DEFAULT_MESSAGE =
  "Hello Prime Property & Developers, I am interested in learning more about your property services.";

function waLink(message) {
  return `https://wa.me/${COMPANY.phoneIntl}?text=${encodeURIComponent(
    message
  )}`;
}

/* ============================================================
   NAVIGATION
============================================================ */

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Properties", id: "properties" },
  { label: "Services", id: "services" },
  { label: "Areas", id: "areas" },
  { label: "Clients", id: "testimonials" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

/* ============================================================
   SEARCH OPTIONS
============================================================ */

const LOOKING_FOR_OPTIONS = [
  { value: "", label: "Buy, rent or invest" },
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "invest", label: "Invest" },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "Any property type" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Commercial" },
];

const LOCATION_OPTIONS = [
  { value: "", label: "Any location" },
  { value: "F-6", label: "F-6" },
  { value: "F-7", label: "F-7" },
  { value: "F-8", label: "F-8" },
  { value: "E-7", label: "E-7" },
  { value: "Blue Area", label: "Blue Area" },
];

/* ============================================================
   PROPERTY DATA
============================================================ */

const PROPERTIES = [
  {
    id: "p1",
    title: "Luxury Residence",
    type: "house",
    purpose: "buy",
    location: "F-7, Islamabad",
    locationTag: "F-7",
    price: "PKR 12.5 Crore",
    size: "1 Kanal",
    beds: 5,
    baths: 6,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    description:
      "A stately residence set on a full kanal in F-7, built for families who expect space, privacy and quiet refinement in equal measure.",
    features: [
      "Double-height living and dining spaces",
      "Landscaped lawn with covered seating",
      "Staff quarters and dedicated service areas",
      "Covered parking for multiple vehicles",
    ],
  },

  {
    id: "p2",
    title: "Modern Family Home",
    type: "house",
    purpose: "buy",
    location: "F-6, Islamabad",
    locationTag: "F-6",
    price: "PKR 8.75 Crore",
    size: "10 Marla",
    beds: 4,
    baths: 5,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    description:
      "A well-proportioned 10 Marla home in F-6, designed around natural light and an easy flow between everyday living areas.",
    features: [
      "Open-plan kitchen and family lounge",
      "Sun-lit terrace and study nook",
      "Modern fittings throughout",
      "Secure, gated street",
    ],
  },

  {
    id: "p3",
    title: "Contemporary Villa",
    type: "house",
    purpose: "buy",
    location: "E-7, Islamabad",
    locationTag: "E-7",
    price: "PKR 18 Crore",
    size: "2 Kanal",
    beds: 6,
    baths: 7,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85",
    description:
      "An expansive two-kanal villa in E-7, combining generous entertaining spaces with private wings for extended family living.",
    features: [
      "Formal and informal living areas",
      "Home theatre and library room",
      "Mature gardens with outdoor seating",
      "Independent guest suite",
    ],
  },

  {
    id: "p4",
    title: "Premium Commercial Floor",
    type: "commercial",
    purpose: "invest",
    location: "Blue Area, Islamabad",
    locationTag: "Blue Area",
    price: "Contact for price",
    size: "5,000 sq ft",
    beds: null,
    baths: null,
    image:
      "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&w=1400&q=85",
    description:
      "A prominent commercial floor plate in Blue Area, positioned for businesses that want visibility in Islamabad's commercial core.",
    features: [
      "Prime Blue Area frontage",
      "Flexible open floor plan",
      "Elevator access and dedicated parking",
      "Close to major banks and corporate offices",
    ],
  },

  {
    id: "p5",
    title: "Executive Residence",
    type: "house",
    purpose: "buy",
    location: "F-8, Islamabad",
    locationTag: "F-8",
    price: "PKR 10.5 Crore",
    size: "1 Kanal",
    beds: 5,
    baths: 5,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85",
    description:
      "A comfortable, well-maintained residence in F-8, suited to a household that values a settled, established neighbourhood.",
    features: [
      "Spacious bedrooms with attached baths",
      "Separate drawing and dining rooms",
      "Rooftop terrace",
      "Ample front and side lawn",
    ],
  },

  {
    id: "p6",
    title: "Commercial Investment Block",
    type: "commercial",
    purpose: "invest",
    location: "Blue Area, Islamabad",
    locationTag: "Blue Area",
    price: "Contact for price",
    size: "Multiple floors",
    beds: null,
    baths: null,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    description:
      "A multi-floor commercial opportunity in the heart of Blue Area, suited to investors seeking a foothold in Islamabad's business district.",
    features: [
      "Multiple leasable floors",
      "High footfall business district",
      "Suitable for offices or retail",
      "Strong long-term rental potential",
    ],
  },

  {
    id: "p7",
    title: "Skyline Apartment",
    type: "apartment",
    purpose: "rent",
    location: "F-8, Islamabad",
    locationTag: "F-8",
    price: "PKR 275,000 / month",
    size: "2,200 sq ft",
    beds: 3,
    baths: 3,
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=85",
    description:
      "A bright, contemporary apartment available for rent in F-8, offering low-maintenance living close to Islamabad's commercial hubs.",
    features: [
      "Modern open-plan interior",
      "Balcony with sector views",
      "Dedicated covered parking",
      "Round-the-clock building security",
    ],
  },
];

/* ============================================================
   AREAS
============================================================ */

const AREAS = [
  {
    id: "f6",
    name: "F-6",
    description:
      "An established address for old-money quiet and mature, tree-lined streets.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",
  },

  {
    id: "f7",
    name: "F-7",
    description:
      "Islamabad's most requested postcode, close to markets, schools and diplomatic enclaves.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },

  {
    id: "f8",
    name: "F-8",
    description:
      "A broad mix of family homes and rentals, five minutes from the Margalla trails.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85",
  },

  {
    id: "e7",
    name: "E-7",
    description:
      "Exclusive, low-density plots favoured by families who want space and privacy.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85",
  },

  {
    id: "blue-area",
    name: "Blue Area",
    description:
      "Islamabad's commercial spine, where every serious investor wants a floor.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
];

/* ============================================================
   SERVICES
============================================================ */

const SERVICES = [
  {
    icon: HomeIcon,
    title: "Property Sales",
    description:
      "Professional marketing and negotiation support to sell residential and commercial property at the right price.",
  },

  {
    icon: KeyRound,
    title: "Property Purchase",
    description:
      "A shortlist built around your budget and priorities, with honest guidance at every viewing.",
  },

  {
    icon: Building2,
    title: "Rentals",
    description:
      "Tenant screening, paperwork and ongoing support for landlords, and a smoother search for tenants.",
  },

  {
    icon: TrendingUp,
    title: "Investment Consultancy",
    description:
      "Sector-by-sector insight to help you place capital where Islamabad's growth is heading next.",
  },
];

/* ============================================================
   WHY
============================================================ */

const WHY_POINTS = [
  "Deep, current knowledge of the Islamabad market",
  "Specialists in F-6, F-7, F-8, E-7 and Blue Area",
  "Consultancy built around your priorities, not a script",
  "Residential and commercial expertise under one roof",
  "Support that continues after the paperwork is signed",
  "An investment-first lens on every recommendation",
];

/* ============================================================
   PROCESS
============================================================ */

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share what you're looking to buy, sell, rent or invest in, and where.",
  },

  {
    number: "02",
    title: "Explore suitable properties",
    description:
      "We put together a shortlist of properties that genuinely match your brief.",
  },

  {
    number: "03",
    title: "Get expert guidance",
    description:
      "Our consultants walk you through options, locations and next steps.",
  },

  {
    number: "04",
    title: "Make your move",
    description:
      "Proceed with confidence, supported at every stage of the transaction.",
  },
];

/* ============================================================
   STATS
============================================================ */

const STATS = [
  {
    value: 12,
    suffix: "+",
    label: "Years active in Islamabad's property market",
  },

  {
    value: 480,
    suffix: "+",
    label: "Properties sold, let or transacted",
  },

  {
    value: 5,
    suffix: "",
    label: "Prime sectors covered end to end",
  },

  {
    value: 96,
    suffix: "%",
    label: "Clients who would recommend us",
  },
];

/* ============================================================
   TESTIMONIALS
============================================================ */

const TESTIMONIALS = [
  {
    name: "F-7 Homeowner",
    context: "Purchased a 1 Kanal residence",
    quote:
      "We had looked at a dozen agents before Prime Property. What stood out was that they said no to two houses that didn't fit our budget instead of just pushing a sale.",
  },

  {
    name: "Blue Area Investor",
    context: "Acquired a commercial floor",
    quote:
      "Their read on which floors in Blue Area were undervalued turned out to be right. The rental yield has outperformed what we modelled going in.",
  },

  {
    name: "F-8 Tenant",
    context: "Rented a 3-bed apartment",
    quote:
      "Renting in Islamabad can be slow and full of surprises. They handled the paperwork, negotiated the terms, and moved us in within two weeks.",
  },

  {
    name: "E-7 Homeowner",
    context: "Sold a family villa",
    quote:
      "The marketing they put together for our villa was genuinely well done. We had a serious offer within the first month of listing.",
  },
];

const INTEREST_OPTIONS = [
  "Buying",
  "Selling",
  "Renting",
  "Investment",
  "Commercial",
  "General inquiry",
];

/* ============================================================
   HELPERS
============================================================ */

function scrollToId(id) {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function useScrollFlag(threshold) {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setFlag(window.scrollY > threshold);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return flag;
}

/* ============================================================
   REVEAL
============================================================ */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Reveal({
  as = "div",
  className,
  children,
  delay = 0,
  ...rest
}) {
  const Comp = motion[as] || motion.div;

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={fadeUp}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ============================================================
   COUNT UP
============================================================ */

function CountUp({
  value,
  suffix = "",
  duration = 1.6,
}) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  const reduceMotion = useReducedMotion();

  const start = useCallback(() => {
    if (started.current) return;

    started.current = true;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min(
        (now - startTime) / (duration * 1000),
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [value, duration, reduceMotion]);

  return (
    <motion.span
      onViewportEnter={start}
      viewport={{
        once: true,
        amount: 0.5,
      }}
    >
      {display}
      {suffix}
    </motion.span>
  );
}

/* ============================================================
   GLOBAL STYLES
============================================================ */

function GlobalStyles() {
  return (
    <style>{`
      @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");

      :root {
        --navy: #07111f;
        --navy-2: #0d1c30;
        --navy-3: #101f34;

        --gold: #c6a15b;
        --gold-light: #e3c78f;
        --gold-dark: #8a6b34;

        --ivory: #f6f2e9;
        --white: #ffffff;

        --text: #18202d;
        --text-light: #6b7484;
        --text-muted: #929aa7;

        --border: rgba(7, 17, 31, 0.11);

        --container: 1240px;

        --font-display: "Playfair Display", serif;
        --font-body: "Manrope", sans-serif;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        scroll-behavior: smooth;
        -webkit-text-size-adjust: 100%;
      }

      body {
        margin: 0;
        background: var(--white);
      }

      body,
      button,
      input,
      select,
      textarea {
        font-family: var(--font-body);
      }

      button,
      input,
      select,
      textarea {
        font: inherit;
      }

      button {
        cursor: pointer;
      }

      img {
        display: block;
        max-width: 100%;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      ul {
        list-style: none;
      }

      ::selection {
        background: var(--gold);
        color: white;
      }

      .pp-root {
        position: relative;
        min-height: 100vh;
        overflow-x: clip;
        color: var(--text);
        background: var(--white);
        line-height: 1.6;
      }

      .pp-root main {
        position: relative;
        z-index: 1;
      }

      .container {
        width: min(
          calc(100% - 48px),
          var(--container)
        );
        margin-inline: auto;
      }

      .section {
        position: relative;
        padding: 120px 0;
        scroll-margin-top: 90px;
      }

      .section:not(.section--navy)::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: min(
          calc(100% - 80px),
          1180px
        );
        height: 1px;
        transform: translateX(-50%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(198,161,91,.32),
          transparent
        );
      }

      .section--ivory {
        background:
          linear-gradient(
            180deg,
            #f8f5ee 0%,
            #f2ede2 100%
          );
      }

      .section--navy {
        color: white;
        background:
          radial-gradient(
            circle at 85% 15%,
            rgba(198,161,91,.11),
            transparent 26%
          ),
          radial-gradient(
            circle at 10% 90%,
            rgba(198,161,91,.06),
            transparent 25%
          ),
          linear-gradient(
            145deg,
            #06101d,
            #0b1a2d 55%,
            #07111f
          );
      }

      .section--navy > .container {
        position: relative;
        z-index: 2;
      }

      /* ======================================================
         GRAIN
      ====================================================== */

      .grain {
        position: fixed;
        inset: 0;
        z-index: 5;
        pointer-events: none;
        opacity: .025;
        mix-blend-mode: overlay;
        background-image:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      }

      /* ======================================================
         SCROLL BAR
      ====================================================== */

      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        z-index: 5000;
        transform-origin: left center;
        background:
          linear-gradient(
            90deg,
            var(--gold-dark),
            var(--gold),
            var(--gold-light)
          );
      }

      /* ======================================================
         TYPOGRAPHY
      ====================================================== */

      .kicker {
        margin-bottom: 15px;
        color: var(--gold-dark);
        font-family: var(--font-display);
        font-size: 17px;
        font-style: italic;
      }

      .section--navy .kicker {
        color: var(--gold-light);
      }

      .heading {
        max-width: 760px;
        font-family: var(--font-display);
        font-size: clamp(34px, 4.2vw, 54px);
        font-weight: 500;
        line-height: 1.08;
        letter-spacing: -.025em;
      }

      .lede {
        max-width: 580px;
        margin-top: 18px;
        color: var(--text-light);
        font-size: 15px;
        line-height: 1.85;
      }

      .section--navy .lede {
        color: rgba(255,255,255,.64);
      }

      /* ======================================================
         BUTTONS
      ====================================================== */

      .btn {
        position: relative;
        display: inline-flex;
        min-height: 52px;
        align-items: center;
        justify-content: center;
        gap: 9px;
        padding: 0 25px;

        border: 1px solid transparent;

        color: white;

        font-size: 12px;
        font-weight: 800;
        letter-spacing: .025em;

        overflow: hidden;
        white-space: nowrap;

        transition:
          transform .25s ease,
          border-color .25s ease,
          color .25s ease,
          background .25s ease;
      }

      .btn:hover {
        transform: translateY(-2px);
      }

      .btn::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        transform: translateX(-105%);
        transition: transform .4s ease;
      }

      .btn:hover::before {
        transform: translateX(0);
      }

      .btn > * {
        position: relative;
        z-index: 1;
      }

      .btn--gold {
        background: var(--gold);
      }

      .btn--gold::before {
        background: var(--gold-dark);
      }

      .btn--outline {
        border-color: rgba(255,255,255,.45);
        background: transparent;
      }

      .btn--outline::before {
        background: white;
      }

      .btn--outline:hover {
        color: var(--navy);
        border-color: white;
      }

      .btn--outline-dark {
        color: var(--navy);
        border-color: var(--navy);
        background: transparent;
      }

      .btn--outline-dark::before {
        background: var(--navy);
      }

      .btn--outline-dark:hover {
        color: white;
      }

      .btn--small {
        min-height: 42px;
        padding: 0 18px;
        font-size: 10.5px;
      }

      /* ======================================================
         NAVBAR
      ====================================================== */

      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 3000;

        height: 88px;

        color: white;

        transition:
          height .3s ease,
          background .3s ease,
          box-shadow .3s ease;
      }

      .navbar--scrolled {
        height: 72px;
        background: rgba(5,13,24,.9);
        backdrop-filter: blur(18px);
        box-shadow:
          0 12px 40px rgba(0,0,0,.2);
      }

      .navbar__inner {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
      }

      .navbar__brand {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 11px;
      }

      .navbar__brand-mark {
        width: 42px;
        height: 42px;

        display: grid;
        place-items: center;

        flex: 0 0 auto;

        border: 1px solid var(--gold);

        color: var(--gold);

        font-family: var(--font-display);
        font-size: 17px;
      }

      .navbar__brand-name {
        min-width: 0;
        color: white;

        font-family: var(--font-display);
        font-size: 16px;
        line-height: 1.1;
      }

      .navbar__brand-name span {
        display: block;
        margin-top: 3px;

        color: var(--gold-light);

        font-family: var(--font-body);
        font-size: 9.5px;
        font-weight: 600;
        letter-spacing: .07em;
      }

      .navbar__links {
        display: flex;
        align-items: center;
        gap: 26px;
      }

      .navbar__links a {
        position: relative;
        color: rgba(255,255,255,.82);
        font-size: 11.5px;
        font-weight: 700;
        transition: color .25s ease;
      }

      .navbar__links a::after {
        content: "";
        position: absolute;
        bottom: -7px;
        left: 0;

        width: 0;
        height: 1px;

        background: var(--gold);

        transition: width .3s ease;
      }

      .navbar__links a:hover {
        color: var(--gold-light);
      }

      .navbar__links a:hover::after {
        width: 100%;
      }

      .navbar__actions {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .navbar__hamburger {
        width: 44px;
        height: 44px;

        display: none;
        align-items: center;
        justify-content: center;

        border: 1px solid rgba(255,255,255,.18);

        color: white;
        background: rgba(255,255,255,.04);
      }

      /* ======================================================
         MOBILE MENU
      ====================================================== */

      .mobile-menu {
        position: fixed;
        inset: 0;
        z-index: 4500;

        display: flex;
        flex-direction: column;

        padding:
          max(20px, env(safe-area-inset-top))
          24px
          max(28px, env(safe-area-inset-bottom));

        color: white;
        background:
          radial-gradient(
            circle at 85% 10%,
            rgba(198,161,91,.12),
            transparent 25%
          ),
          var(--navy);

        overflow-y: auto;
      }

      .mobile-menu__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .mobile-menu__close {
        width: 44px;
        height: 44px;

        display: grid;
        place-items: center;

        border: 1px solid rgba(255,255,255,.16);

        color: white;
        background: rgba(255,255,255,.04);
      }

      .mobile-menu__links {
        display: flex;
        flex-direction: column;

        margin-top: 48px;
      }

      .mobile-menu__links a:not(.btn) {
        padding: 15px 0;

        border-bottom: 1px solid rgba(255,255,255,.08);

        color: white;

        font-family: var(--font-display);
        font-size: clamp(26px,8vw,38px);
        line-height: 1.1;
      }

      .mobile-menu__cta {
        margin-top: 28px;
        align-self: flex-start;
      }

      /* ======================================================
         HERO
      ====================================================== */

      .hero {
        position: relative;

        min-height: max(
          760px,
          100svh
        );

        display: flex;
        flex-direction: column;
        justify-content: center;

        padding:
          130px 0
          90px;

        color: white;

        overflow: hidden;
      }

      .hero__image {
        position: absolute;
        inset: -7%;

        background:
          url("https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2200&q=90")
          center / cover no-repeat;

        will-change: transform;
      }

      .hero__overlay {
        position: absolute;
        inset: 0;

        background:
          linear-gradient(
            90deg,
            rgba(2,7,14,.96) 0%,
            rgba(4,10,19,.78) 42%,
            rgba(4,10,19,.35) 100%
          ),
          linear-gradient(
            0deg,
            rgba(2,6,12,.8),
            transparent 55%
          );
      }

      .hero__glow {
        position: absolute;

        width: 520px;
        height: 520px;

        border-radius: 50%;

        pointer-events: none;

        background:
          radial-gradient(
            circle,
            rgba(198,161,91,.18),
            transparent 68%
          );

        transform: translate(-50%,-50%);
      }

      .hero__content {
        position: relative;
        z-index: 2;

        width: min(
          calc(100% - 48px),
          var(--container)
        );

        margin-inline: auto;
      }

      .hero__kicker {
        margin-bottom: 20px;

        color: var(--gold-light);

        font-family: var(--font-display);
        font-size: clamp(16px,2vw,19px);
        font-style: italic;
      }

      .hero__heading {
        max-width: 850px;

        margin-bottom: 24px;

        font-family: var(--font-display);
        font-size: clamp(
          46px,
          7vw,
          88px
        );

        font-weight: 500;
        line-height: .98;

        letter-spacing: -.04em;

        text-shadow:
          0 10px 35px rgba(0,0,0,.2);
      }

      .hero__sub {
        max-width: 600px;

        margin-bottom: 32px;

        color: rgba(255,255,255,.74);

        font-size: 15.5px;
        line-height: 1.85;
      }

      .hero__buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      .hero__trust {
        display: flex;
        flex-wrap: wrap;

        gap: 20px;

        margin-top: 40px;

        color: rgba(255,255,255,.55);

        font-size: 11px;
        font-weight: 700;
        letter-spacing: .04em;
      }

      .hero__trust span {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .hero__trust span::before {
        content: "";
        width: 4px;
        height: 4px;

        border-radius: 50%;

        background: var(--gold);
      }

      /* ======================================================
         SEARCH
      ====================================================== */

      .hero-search {
        position: relative;
        z-index: 5;

        width: min(
          calc(100% - 48px),
          var(--container)
        );

        margin: 48px auto 0;
      }

      .hero-search__panel {
        display: grid;
        grid-template-columns:
          1fr
          1fr
          1fr
          180px;

        overflow: hidden;

        border: 1px solid rgba(255,255,255,.16);
        border-radius: 4px;

        background: white;

        box-shadow:
          0 30px 80px rgba(0,0,0,.35);
      }

      .hero-search__field {
        min-width: 0;

        padding: 16px 20px;

        border-right: 1px solid var(--border);

        background: rgba(255,255,255,.98);
      }

      .hero-search__field label {
        display: block;

        margin-bottom: 6px;

        color: var(--text-muted);

        font-size: 9px;
        font-weight: 800;
        letter-spacing: .1em;
        text-transform: uppercase;
      }

      .hero-search__field select {
        width: 100%;

        border: 0;
        outline: 0;

        color: var(--navy);
        background: transparent;

        font-size: 12.5px;
        font-weight: 800;

        cursor: pointer;
      }

      .hero-search__submit {
        min-width: 0;
        border-radius: 0;
      }

      /* ======================================================
         HERO SCROLL
      ====================================================== */

      .hero__scroll {
        position: absolute;
        bottom: 24px;
        left: 50%;

        z-index: 3;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 7px;

        transform: translateX(-50%);

        color: rgba(255,255,255,.55);

        font-size: 9px;
        font-weight: 700;
        letter-spacing: .16em;
      }

      .hero__scroll-line {
        width: 1px;
        height: 34px;

        background:
          linear-gradient(
            to bottom,
            rgba(255,255,255,.7),
            transparent
          );
      }

      /* ======================================================
         MARQUEE
      ====================================================== */

      .marquee {
        position: relative;

        overflow: hidden;

        padding: 18px 0;

        border-top: 1px solid rgba(198,161,91,.2);
        border-bottom: 1px solid rgba(198,161,91,.2);

        background: var(--navy);
      }

      .marquee__track {
        display: flex;
        width: max-content;

        animation: marquee 30s linear infinite;
      }

      .marquee:hover .marquee__track {
        animation-play-state: paused;
      }

      .marquee__item {
        display: flex;
        align-items: center;
        gap: 20px;

        padding-right: 20px;

        color: rgba(255,255,255,.76);

        font-family: var(--font-display);
        font-size: 20px;
        font-style: italic;

        white-space: nowrap;
      }

      .marquee__item svg {
        color: var(--gold);
      }

      @keyframes marquee {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }
      }

      /* ======================================================
         STATS
      ====================================================== */

      .stats {
        position: relative;

        padding: 68px 0;

        background: var(--ivory);
      }

      .stats__grid {
        display: grid;
        grid-template-columns: repeat(4,1fr);

        overflow: hidden;

        border: 1px solid var(--border);
        border-radius: 5px;

        box-shadow:
          0 14px 45px rgba(7,17,31,.05);
      }

      .stats__card {
        padding: 34px 28px;

        border-right: 1px solid var(--border);

        background: var(--ivory);

        transition:
          transform .3s ease,
          background .3s ease;
      }

      .stats__card:last-child {
        border-right: 0;
      }

      .stats__card:hover {
        transform: translateY(-3px);
        background: #fffdf8;
      }

      .stats__value {
        display: block;

        color: var(--navy);

        font-family: var(--font-display);
        font-size: clamp(38px,4vw,54px);
        font-weight: 500;
        line-height: 1;
      }

      .stats__label {
        max-width: 220px;

        margin-top: 11px;

        color: var(--text-light);

        font-size: 12.5px;
        line-height: 1.6;
      }

      .stats__note {
        margin-top: 20px;

        color: var(--text-muted);

        font-size: 10.5px;
      }

      /* ======================================================
         TRUST
      ====================================================== */

      .trust__grid {
        display: grid;
        grid-template-columns: repeat(4,1fr);

        margin-top: 52px;

        overflow: hidden;

        border: 1px solid var(--border);
        border-radius: 5px;
      }

      .trust__card {
        min-height: 205px;

        padding: 34px 26px;

        border-right: 1px solid var(--border);

        background: white;

        transition:
          transform .3s ease,
          box-shadow .3s ease;
      }

      .trust__card:last-child {
        border-right: 0;
      }

      .trust__card:hover {
        position: relative;
        z-index: 1;

        transform: translateY(-6px);

        box-shadow:
          0 25px 50px rgba(7,17,31,.1);
      }

      .trust__icon {
        margin-bottom: 20px;
        color: var(--gold);
      }

      .trust__card h3 {
        margin-bottom: 7px;

        font-family: var(--font-display);
        font-size: 20px;
      }

      .trust__card p {
        color: var(--text-light);
        font-size: 12px;
      }

      /* ======================================================
         SECTION INTRO
      ====================================================== */

      .section__intro {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 40px;

        margin-bottom: 50px;
      }

      .section__note {
        max-width: 340px;

        margin-top: 14px;

        color: var(--text-muted);

        font-size: 11px;
        line-height: 1.7;
      }

      /* ======================================================
         PROPERTIES
      ====================================================== */

      .property-grid {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 28px;
      }

      .property-card {
        overflow: hidden;

        border: 1px solid var(--border);
        border-radius: 6px;

        background: white;

        box-shadow:
          0 8px 25px rgba(7,17,31,.045);

        transition:
          transform .4s ease,
          box-shadow .4s ease;
      }

      .property-card:hover {
        transform: translateY(-7px);

        box-shadow:
          0 28px 65px rgba(7,17,31,.14);
      }

      .property-card__media {
        position: relative;

        height: 280px;

        overflow: hidden;

        background: #e8e5df;
      }

      .property-card__media img {
        width: 100%;
        height: 100%;

        object-fit: cover;

        transition:
          transform .7s cubic-bezier(.22,1,.36,1);
      }

      .property-card:hover
      .property-card__media img {
        transform: scale(1.08);
      }

      .property-card__media::after {
        content: "";

        position: absolute;
        inset: 0;

        pointer-events: none;

        background:
          linear-gradient(
            to bottom,
            transparent 55%,
            rgba(3,8,14,.22)
          );
      }

      .property-card__badge {
        position: absolute;
        top: 15px;
        left: 15px;

        z-index: 2;

        padding: 7px 11px;

        border: 1px solid rgba(255,255,255,.18);
        border-radius: 999px;

        color: white;
        background: rgba(7,17,31,.76);

        backdrop-filter: blur(8px);

        font-size: 9.5px;
        font-weight: 800;
        letter-spacing: .05em;
      }

      .property-card__body {
        padding: 23px;
      }

      .property-card__top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;

        margin-bottom: 9px;
      }

      .property-card__top h3 {
        min-width: 0;

        color: var(--navy);

        font-family: var(--font-display);
        font-size: 20px;
        line-height: 1.2;
      }

      .property-card__price {
        flex: 0 0 auto;

        color: var(--gold-dark);

        font-size: 12.5px;
        font-weight: 800;

        text-align: right;
      }

      .property-card__location {
        display: flex;
        align-items: center;
        gap: 6px;

        margin-bottom: 15px;

        color: var(--text-light);

        font-size: 12px;
      }

      .property-card__location svg {
        flex: 0 0 auto;
        color: var(--gold);
      }

      .property-card__meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px 15px;

        padding-top: 15px;

        border-top: 1px solid var(--border);

        color: var(--text-light);

        font-size: 11px;
        font-weight: 700;
      }

      .property-card__meta span {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .property-card__meta svg {
        color: var(--gold);
      }

      .property-card__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-top: 18px;
      }

      .property-card__view {
        display: inline-flex;
        align-items: center;
        gap: 6px;

        padding: 7px 0;

        color: var(--navy);

        font-size: 12px;
        font-weight: 800;
      }

      .property-card__arrow {
        transition: transform .25s ease;
      }

      .property-card__view:hover
      .property-card__arrow {
        transform: translate(3px,-3px);
      }

      .property-card__whatsapp {
        width: 38px;
        height: 38px;

        display: grid;
        place-items: center;

        border: 1px solid var(--border);
        border-radius: 50%;

        color: var(--navy);

        transition: all .25s ease;
      }

      .property-card__whatsapp:hover {
        color: white;
        border-color: #25d366;
        background: #25d366;
        transform: translateY(-2px);
      }

      .property-grid__empty {
        grid-column: 1/-1;

        padding: 70px 25px;

        text-align: center;

        border: 1px solid var(--border);

        color: var(--text-light);
        background: var(--ivory);
      }

      .property-grid__count {
        margin-top: 22px;

        color: var(--text-muted);

        font-size: 11px;
      }

      /* ======================================================
         MODAL
      ====================================================== */

      .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 6000;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 20px;

        overflow-y: auto;

        background: rgba(3,8,14,.84);

        backdrop-filter: blur(10px);
      }

      .modal {
        position: relative;

        width: min(950px,100%);

        display: grid;
        grid-template-columns: 1fr 1fr;

        overflow: hidden;

        border-radius: 6px;

        background: white;

        box-shadow:
          0 40px 100px rgba(0,0,0,.45);
      }

      .modal__close {
        position: absolute;
        top: 14px;
        right: 14px;

        z-index: 4;

        width: 42px;
        height: 42px;

        display: grid;
        place-items: center;

        border-radius: 50%;

        color: var(--navy);
        background: white;

        box-shadow:
          0 8px 25px rgba(0,0,0,.18);
      }

      .modal__media {
        min-height: 520px;
      }

      .modal__media img {
        width: 100%;
        height: 100%;
        min-height: 520px;

        object-fit: cover;
      }

      .modal__body {
        padding: 44px;
        overflow-y: auto;
        max-height: 85vh;
      }

      .modal__badge {
        display: inline-block;

        margin-bottom: 17px;
        padding: 6px 11px;

        color: var(--gold-dark);
        background: var(--ivory);

        font-size: 9px;
        font-weight: 800;
        letter-spacing: .06em;
      }

      .modal__body h3 {
        margin-bottom: 9px;

        color: var(--navy);

        font-family: var(--font-display);
        font-size: 32px;
        line-height: 1.15;
      }

      .modal__location {
        display: flex;
        align-items: center;
        gap: 6px;

        margin-bottom: 14px;

        color: var(--text-light);

        font-size: 12px;
      }

      .modal__price {
        margin-bottom: 18px;

        color: var(--gold-dark);

        font-family: var(--font-display);
        font-size: 24px;
      }

      .modal__description {
        margin-bottom: 22px;

        color: var(--text-light);

        font-size: 13.5px;
        line-height: 1.8;
      }

      .modal__meta {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;

        margin-bottom: 22px;
        padding: 17px 0;

        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);

        color: var(--text);

        font-size: 11.5px;
        font-weight: 700;
      }

      .modal__meta span {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .modal__meta svg {
        color: var(--gold);
      }

      .modal__features h4 {
        margin-bottom: 11px;

        font-family: var(--font-display);
        font-size: 17px;
      }

      .modal__features ul {
        display: grid;
        gap: 8px;

        margin-bottom: 25px;
      }

      .modal__features li {
        display: flex;
        align-items: flex-start;
        gap: 8px;

        color: var(--text-light);

        font-size: 12px;
      }

      .modal__features li svg {
        flex: 0 0 auto;
        margin-top: 2px;

        color: var(--gold);
      }

      .modal__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      /* ======================================================
         SERVICES
      ====================================================== */

      .services__grid {
        display: grid;
        grid-template-columns: repeat(4,1fr);

        margin-top: 52px;

        gap: 1px;

        overflow: hidden;

        border: 1px solid rgba(255,255,255,.08);
        border-radius: 5px;
      }

      .services__card {
        min-height: 245px;

        padding: 36px 27px;

        background:
          linear-gradient(
            145deg,
            rgba(255,255,255,.055),
            rgba(255,255,255,.018)
          );

        transition:
          transform .35s ease,
          background .35s ease,
          border-color .35s ease;
      }

      .services__card:hover {
        transform: translateY(-7px);

        background:
          linear-gradient(
            145deg,
            rgba(198,161,91,.1),
            rgba(255,255,255,.025)
          );
      }

      .services__icon {
        margin-bottom: 24px;
        color: var(--gold);
      }

      .services__card h3 {
        margin-bottom: 9px;

        font-family: var(--font-display);
        font-size: 20px;
      }

      .services__card p {
        color: rgba(255,255,255,.6);

        font-size: 12px;
        line-height: 1.75;
      }

      /* ======================================================
         WHY
      ====================================================== */

      .why__inner {
        display: grid;
        grid-template-columns: .85fr 1.15fr;
        align-items: center;
        gap: 80px;
      }

      .why__image {
        position: relative;
      }

      .why__image img {
        width: 100%;
        height: 560px;

        object-fit: cover;

        border-radius: 5px;
      }

      .why__image::before {
        content: "";

        position: absolute;
        top: -16px;
        left: -16px;

        width: 105px;
        height: 105px;

        border-top: 1px solid var(--gold);
        border-left: 1px solid var(--gold);
      }

      .why__list {
        display: grid;
        gap: 14px;

        margin-top: 32px;
      }

      .why__list li {
        display: flex;
        align-items: flex-start;
        gap: 13px;

        color: var(--text);

        font-size: 14px;
        line-height: 1.6;
      }

      .why__check {
        width: 24px;
        height: 24px;

        display: grid;
        place-items: center;

        flex: 0 0 auto;

        border: 1px solid rgba(198,161,91,.5);

        color: var(--gold-dark);
      }

      /* ======================================================
         AREAS
      ====================================================== */

      .areas__grid {
        display: grid;

        grid-template-columns: 1.3fr 1fr 1fr;
        grid-template-rows: 260px 260px;

        gap: 15px;

        margin-top: 52px;
      }

      .areas__card {
        position: relative;

        overflow: hidden;

        border-radius: 5px;

        color: white;

        box-shadow:
          0 15px 40px rgba(7,17,31,.08);
      }

      .areas__card:first-child {
        grid-row: span 2;
      }

      .areas__card img {
        width: 100%;
        height: 100%;

        object-fit: cover;

        transition:
          transform .8s cubic-bezier(.22,1,.36,1);
      }

      .areas__card:hover img {
        transform: scale(1.07);
      }

      .areas__overlay {
        position: absolute;
        inset: 0;

        background:
          linear-gradient(
            to top,
            rgba(3,9,17,.9),
            rgba(3,9,17,.04) 65%
          );
      }

      .areas__text {
        position: absolute;
        right: 22px;
        bottom: 21px;
        left: 22px;
      }

      .areas__text h3 {
        margin-bottom: 5px;

        font-family: var(--font-display);
        font-size: 25px;
        font-weight: 500;
      }

      .areas__text p {
        max-width: 300px;

        color: rgba(255,255,255,.72);

        font-size: 11.5px;
        line-height: 1.6;
      }

      .areas__arrow {
        position: absolute;
        top: 18px;
        right: 18px;

        color: var(--gold-light);

        opacity: 0;
        transform: translate(-5px,5px);

        transition: all .3s ease;
      }

      .areas__card:hover .areas__arrow {
        opacity: 1;
        transform: translate(0,0);
      }

      /* ======================================================
         TESTIMONIALS
      ====================================================== */

      .testimonials {
        overflow: hidden;
      }

      .testimonials__quote-mark {
        margin-bottom: 17px;

        color: rgba(198,161,91,.35);
      }

      .testimonials__stage {
        position: relative;

        min-height: 270px;

        max-width: 880px;
      }

      .testimonials__quote {
        color: white;

        font-family: var(--font-display);
        font-size: clamp(24px,3.1vw,42px);
        line-height: 1.38;
      }

      .testimonials__meta {
        display: flex;
        align-items: center;
        gap: 13px;

        margin-top: 28px;
      }

      .testimonials__avatar {
        width: 44px;
        height: 44px;

        display: grid;
        place-items: center;

        flex: 0 0 auto;

        border-radius: 50%;

        color: white;

        background:
          linear-gradient(
            135deg,
            var(--gold),
            var(--gold-dark)
          );

        font-family: var(--font-display);

        box-shadow:
          0 0 0 5px rgba(198,161,91,.1);
      }

      .testimonials__name {
        color: white;
        font-size: 13px;
        font-weight: 800;
      }

      .testimonials__context {
        color: rgba(255,255,255,.5);
        font-size: 11px;
      }

      .testimonials__controls {
        display: flex;
        align-items: center;
        gap: 14px;

        margin-top: 25px;
      }

      .testimonials__arrow {
        width: 44px;
        height: 44px;

        display: grid;
        place-items: center;

        border: 1px solid rgba(255,255,255,.2);

        color: white;

        transition: all .25s ease;
      }

      .testimonials__arrow:hover {
        color: var(--gold);
        border-color: var(--gold);
      }

      .testimonials__dots {
        display: flex;
        gap: 7px;
      }

      .testimonials__dot {
        width: 23px;
        height: 2px;

        background: rgba(255,255,255,.24);

        transition: background .3s ease;
      }

      .testimonials__dot--active {
        background: var(--gold);
      }

      .testimonials__note {
        margin-top: 28px;

        color: rgba(255,255,255,.35);

        font-size: 10px;
      }

      /* ======================================================
         CINEMATIC
      ====================================================== */

      .cinematic {
        position: relative;

        min-height: 620px;

        display: flex;
        align-items: center;

        color: white;

        background:
          url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2200&q=85")
          center / cover no-repeat;
      }

      .cinematic__overlay {
        position: absolute;
        inset: 0;

        background:
          linear-gradient(
            90deg,
            rgba(5,12,21,.92),
            rgba(5,12,21,.42)
          );
      }

      .cinematic::after {
        content: "";

        position: absolute;
        inset: 0;

        pointer-events: none;

        background:
          radial-gradient(
            circle at 70% 45%,
            rgba(198,161,91,.14),
            transparent 30%
          );
      }

      .cinematic__content {
        position: relative;
        z-index: 2;
      }

      .cinematic__content h2 {
        max-width: 700px;

        margin-bottom: 20px;

        font-family: var(--font-display);
        font-size: clamp(40px,5.3vw,65px);
        font-weight: 500;
        line-height: 1.06;
      }

      .cinematic__content p {
        max-width: 570px;

        margin-bottom: 28px;

        color: rgba(255,255,255,.72);

        font-size: 15px;
        line-height: 1.85;
      }

      /* ======================================================
         PROCESS
      ====================================================== */

      .process__row {
        position: relative;

        display: grid;
        grid-template-columns: repeat(4,1fr);

        gap: 32px;

        margin-top: 54px;
      }

      .process__row::before {
        content: "";

        position: absolute;

        top: 26px;
        left: 7%;
        right: 7%;

        height: 1px;

        background:
          rgba(198,161,91,.35);
      }

      .process__step {
        position: relative;
        z-index: 1;
      }

      .process__number {
        width: 52px;
        height: 52px;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 20px;

        border: 1px solid var(--gold);

        color: var(--gold-dark);
        background: white;

        font-family: var(--font-display);
      }

      .process__step h3 {
        margin-bottom: 8px;

        font-family: var(--font-display);
        font-size: 18px;
      }

      .process__step p {
        color: var(--text-light);

        font-size: 12.5px;
        line-height: 1.75;
      }

      /* ======================================================
         INVESTMENT CTA
      ====================================================== */

      .investment-cta__inner {
        position: relative;

        overflow: hidden;

        padding: 68px;

        border: 1px solid rgba(198,161,91,.24);
        border-radius: 5px;

        background:
          linear-gradient(
            120deg,
            rgba(198,161,91,.14),
            transparent 62%
          );

        box-shadow:
          0 25px 70px rgba(0,0,0,.16);
      }

      .investment-cta__inner::after {
        content: "";

        position: absolute;

        width: 360px;
        height: 360px;

        right: -170px;
        top: -190px;

        border: 1px solid rgba(198,161,91,.18);
        border-radius: 50%;

        box-shadow:
          0 0 0 55px rgba(198,161,91,.035),
          0 0 0 110px rgba(198,161,91,.02);
      }

      .investment-cta__inner h2 {
        position: relative;
        z-index: 1;

        max-width: 650px;

        margin-bottom: 14px;

        font-family: var(--font-display);
        font-size: clamp(31px,4vw,48px);
        font-weight: 500;
        line-height: 1.1;
      }

      .investment-cta__inner p {
        position: relative;
        z-index: 1;

        max-width: 550px;

        margin-bottom: 28px;

        color: rgba(255,255,255,.62);

        font-size: 14px;
      }

      .investment-cta__buttons {
        position: relative;
        z-index: 2;

        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      /* ======================================================
         ABOUT
      ====================================================== */

      .about__inner {
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        align-items: center;
        gap: 70px;
      }

      .about__image {
        position: relative;
      }

      .about__image img {
        width: 100%;
        height: 480px;

        object-fit: cover;

        border-radius: 5px;
      }

      .about__copy p:not(.kicker) {
        margin-bottom: 18px;

        color: var(--text-light);

        font-size: 14px;
        line-height: 1.9;
      }

      /* ======================================================
         CONTACT
      ====================================================== */

      .contact__grid {
        display: grid;
        grid-template-columns: .8fr 1.2fr;

        align-items: start;

        gap: 70px;

        margin-top: 52px;
      }

      .contact__item {
        display: flex;
        align-items: flex-start;
        gap: 15px;

        margin-bottom: 25px;
      }

      .contact__item svg {
        flex: 0 0 auto;

        margin-top: 2px;

        color: var(--gold);
      }

      .contact__item p,
      .contact__item a {
        color: var(--text);

        font-size: 13.5px;
        line-height: 1.7;
      }

      .contact__item a:hover {
        color: var(--gold-dark);
      }

      .contact__form {
        padding: 42px;

        border: 1px solid rgba(7,17,31,.08);
        border-radius: 5px;

        background: white;

        box-shadow:
          0 20px 55px rgba(7,17,31,.07);
      }

      .contact__row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .contact__field {
        display: flex;
        flex-direction: column;
        gap: 6px;

        margin-bottom: 20px;
      }

      .contact__field label {
        color: var(--text-muted);

        font-size: 9.5px;
        font-weight: 800;
        letter-spacing: .08em;
        text-transform: uppercase;
      }

      .contact__field input,
      .contact__field select,
      .contact__field textarea {
        width: 100%;

        padding: 11px 0;

        border: 0;
        border-bottom: 1px solid var(--border);

        outline: none;

        color: var(--text);

        background: transparent;

        font-size: 13px;

        transition:
          border-color .25s ease,
          box-shadow .25s ease;
      }

      .contact__field input:focus,
      .contact__field select:focus,
      .contact__field textarea:focus {
        border-color: var(--gold);

        box-shadow:
          0 3px 0 rgba(198,161,91,.1);
      }

      .contact__field textarea {
        min-height: 105px;

        resize: vertical;
      }

      .contact__submit {
        width: 100%;
        margin-top: 5px;
      }

      /* ======================================================
         TOAST
      ====================================================== */

      .toast {
        position: fixed;

        left: 50%;
        bottom: 25px;

        z-index: 7000;

        width: min(
          calc(100% - 32px),
          450px
        );

        display: flex;
        align-items: flex-start;
        gap: 11px;

        padding: 15px 18px;

        border-left: 3px solid var(--gold);

        color: white;
        background: var(--navy);

        box-shadow:
          0 20px 50px rgba(0,0,0,.3);

        font-size: 12px;
        line-height: 1.55;
      }

      .toast svg {
        flex: 0 0 auto;
        margin-top: 1px;
        color: var(--gold);
      }

      /* ======================================================
         FOOTER
      ====================================================== */

      .footer {
        padding: 70px 0 25px;

        color: white;

        background: #040a13;
      }

      .footer__top {
        display: grid;
        grid-template-columns: 1.4fr 1fr 1fr 1fr;
        gap: 45px;

        padding-bottom: 45px;

        border-bottom: 1px solid rgba(255,255,255,.08);
      }

      .footer__brand h3 {
        max-width: 250px;

        margin-top: 15px;

        font-family: var(--font-display);
        font-size: 16px;
        line-height: 1.35;
      }

      .footer__brand p {
        margin-top: 11px;

        color: rgba(255,255,255,.42);

        font-size: 12px;
      }

      .footer__col h4 {
        margin-bottom: 17px;

        color: var(--gold-light);

        font-size: 10px;
        font-weight: 800;
        letter-spacing: .08em;
        text-transform: uppercase;
      }

      .footer__col ul {
        display: grid;
        gap: 10px;
      }

      .footer__col li,
      .footer__col a {
        color: rgba(255,255,255,.53);

        font-size: 11.5px;
      }

      .footer__col a:hover {
        color: var(--gold);
      }

      .footer__bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        gap: 15px;

        padding-top: 22px;

        color: rgba(255,255,255,.32);

        font-size: 10.5px;
      }

      .footer__social {
        display: flex;
        gap: 8px;
      }

      .footer__social a {
        width: 36px;
        height: 36px;

        display: grid;
        place-items: center;

        border: 1px solid rgba(255,255,255,.13);

        transition: all .25s ease;
      }

      .footer__social a:hover {
        color: var(--gold);
        border-color: var(--gold);
      }

      /* ======================================================
         FLOATING BUTTONS
      ====================================================== */

      .whatsapp-float {
        position: fixed;

        right: 25px;
        bottom: 25px;

        z-index: 2500;

        width: 58px;
        height: 58px;

        display: grid;
        place-items: center;

        border-radius: 50%;

        color: white;
        background: #25d366;

        box-shadow:
          0 14px 35px rgba(0,0,0,.25);
      }

      .whatsapp-float__pulse {
        position: absolute;
        inset: 0;

        border-radius: 50%;

        background: #25d366;

        animation: pulse 2.2s ease-out infinite;

        z-index: -1;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: .5;
        }

        100% {
          transform: scale(1.8);
          opacity: 0;
        }
      }

      .whatsapp-float__tooltip {
        position: absolute;

        right: 69px;

        padding: 8px 12px;

        color: white;
        background: var(--navy);

        white-space: nowrap;

        font-size: 11px;

        opacity: 0;
        transform: translateX(5px);

        pointer-events: none;

        transition: all .25s ease;
      }

      .whatsapp-float:hover
      .whatsapp-float__tooltip {
        opacity: 1;
        transform: translateX(0);
      }

      .back-to-top {
        position: fixed;

        right: 32px;
        bottom: 95px;

        z-index: 2400;

        width: 44px;
        height: 44px;

        display: grid;
        place-items: center;

        border: 1px solid rgba(255,255,255,.1);

        color: white;
        background: var(--navy);

        box-shadow:
          0 12px 30px rgba(7,17,31,.18);

        transition: all .25s ease;
      }

      .back-to-top:hover {
        background: var(--gold);
      }

      /* ======================================================
         TABLET
      ====================================================== */

      @media (max-width: 1100px) {

        .navbar__links {
          gap: 18px;
        }

        .navbar__links a {
          font-size: 10.5px;
        }

        .property-grid {
          grid-template-columns: repeat(2,1fr);
        }

        .services__grid {
          grid-template-columns: repeat(2,1fr);
        }

        .stats__grid {
          grid-template-columns: repeat(2,1fr);
        }

        .stats__card:nth-child(2) {
          border-right: 0;
        }

        .stats__card:nth-child(-n+2) {
          border-bottom: 1px solid var(--border);
        }

        .trust__grid {
          grid-template-columns: repeat(2,1fr);
        }

        .trust__card:nth-child(2) {
          border-right: 0;
        }

        .trust__card:nth-child(-n+2) {
          border-bottom: 1px solid var(--border);
        }

        .why__inner,
        .about__inner {
          gap: 45px;
        }

        .contact__grid {
          gap: 45px;
        }

        .footer__top {
          grid-template-columns: 1.2fr 1fr 1fr;
        }
      }

      /* ======================================================
         TABLET / MOBILE NAV
      ====================================================== */

      @media (max-width: 900px) {

        .container {
          width: min(
            calc(100% - 36px),
            var(--container)
          );
        }

        .navbar {
          height: 76px;
        }

        .navbar--scrolled {
          height: 68px;
        }

        .navbar__links,
        .navbar__actions .btn {
          display: none;
        }

        .navbar__hamburger {
          display: flex;
        }

        .hero {
          min-height: 850px;
          padding-top: 130px;
        }

        .hero__content {
          width: min(
            calc(100% - 36px),
            var(--container)
          );
        }

        .hero__heading {
          max-width: 720px;
        }

        .hero-search {
          width: min(
            calc(100% - 36px),
            var(--container)
          );

          margin-top: 42px;
        }

        .hero-search__panel {
          grid-template-columns: 1fr 1fr;
        }

        .hero-search__submit {
          grid-column: 1/-1;
          min-height: 56px;
        }

        .property-grid {
          grid-template-columns: repeat(2,1fr);
        }

        .property-card__media {
          height: 245px;
        }

        .why__inner {
          grid-template-columns: 1fr;
        }

        .why__image img {
          height: 430px;
        }

        .areas__grid {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 230px 230px 230px;
        }

        .areas__card:first-child {
          grid-column: 1/-1;
          grid-row: auto;
        }

        .process__row {
          grid-template-columns: 1fr 1fr;
          gap: 45px 30px;
        }

        .process__row::before {
          display: none;
        }

        .investment-cta__inner {
          padding: 50px 40px;
        }

        .about__inner {
          grid-template-columns: 1fr;
        }

        .about__image img {
          height: 430px;
        }

        .contact__grid {
          grid-template-columns: 1fr;
        }

        .footer__top {
          grid-template-columns: 1fr 1fr;
        }
      }

      /* ======================================================
         MOBILE
      ====================================================== */

      @media (max-width: 600px) {

        html {
          scroll-behavior: smooth;
        }

        .container {
          width: calc(100% - 32px);
        }

        .section {
          padding: 76px 0;
        }

        .section:not(.section--navy)::after {
          width: calc(100% - 40px);
        }

        .heading {
          font-size: clamp(
            32px,
            9vw,
            42px
          );
        }

        .kicker {
          font-size: 15px;
        }

        /* NAV */

        .navbar__brand-name {
          font-size: 14px;
        }

        .navbar__brand-name span {
          font-size: 8.5px;
        }

        .navbar__brand-mark {
          width: 39px;
          height: 39px;
          font-size: 16px;
        }

        /* HERO */

        .hero {
          min-height: auto;

          padding-top: 125px;
          padding-bottom: 40px;

          justify-content: flex-start;
        }

        .hero__image {
          inset: -4% -10%;

          background-position:
            64% center;
        }

        .hero__overlay {
          background:
            linear-gradient(
              180deg,
              rgba(2,7,14,.94) 0%,
              rgba(3,9,17,.8) 48%,
              rgba(3,8,14,.92) 100%
            );
        }

        .hero__content {
          width: calc(100% - 32px);
        }

        .hero__kicker {
          max-width: 310px;

          margin-bottom: 16px;

          font-size: 15px;
          line-height: 1.5;
        }

        .hero__heading {
          max-width: 100%;

          margin-bottom: 20px;

          font-size:
            clamp(44px, 13vw, 64px);

          line-height: .98;

          letter-spacing: -.045em;
        }

        .hero__sub {
          max-width: 100%;

          margin-bottom: 25px;

          font-size: 13.5px;
          line-height: 1.75;
        }

        .hero__buttons {
          width: 100%;

          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .hero__buttons .btn {
          width: 100%;
        }

        .hero__trust {
          gap: 10px 16px;

          margin-top: 28px;

          font-size: 9.5px;
        }

        .hero-search {
          width: calc(100% - 32px);

          margin-top: 34px;
        }

        .hero-search__panel {
          grid-template-columns: 1fr;

          border-radius: 4px;
        }

        .hero-search__field {
          padding: 15px 17px;

          border-right: 0;
          border-bottom: 1px solid var(--border);
        }

        .hero-search__field:last-of-type {
          border-bottom: 0;
        }

        .hero-search__submit {
          grid-column: auto;

          min-height: 54px;
        }

        .hero__scroll {
          display: none;
        }

        /* MARQUEE */

        .marquee {
          padding: 15px 0;
        }

        .marquee__item {
          gap: 14px;

          padding-right: 14px;

          font-size: 17px;
        }

        /* STATS */

        .stats {
          padding: 48px 0;
        }

        .stats__grid {
          grid-template-columns: 1fr;
        }

        .stats__card {
          min-height: auto;

          padding: 26px 22px;

          border-right: 0;
          border-bottom: 1px solid var(--border);
        }

        .stats__card:last-child {
          border-bottom: 0;
        }

        .stats__value {
          font-size: 42px;
        }

        .stats__label {
          max-width: 280px;
        }

        /* TRUST */

        .trust__grid {
          grid-template-columns: 1fr;

          margin-top: 35px;
        }

        .trust__card {
          min-height: auto;

          padding: 27px 22px;

          border-right: 0;
          border-bottom: 1px solid var(--border);
        }

        .trust__card:last-child {
          border-bottom: 0;
        }

        .trust__icon {
          margin-bottom: 14px;
        }

        /* SECTION INTRO */

        .section__intro {
          display: block;

          margin-bottom: 35px;
        }

        .section__note {
          margin-top: 12px;
        }

        /* PROPERTY */

        .property-grid {
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .property-card__media {
          height: 230px;
        }

        .property-card__body {
          padding: 20px;
        }

        .property-card__top {
          flex-direction: column;
          gap: 5px;
        }

        .property-card__top h3 {
          font-size: 21px;
        }

        .property-card__price {
          text-align: left;
          font-size: 12px;
        }

        .property-card__meta {
          gap: 10px 14px;
        }

        /* MODAL */

        .modal-backdrop {
          align-items: flex-start;

          padding:
            12px
            12px
            max(12px, env(safe-area-inset-bottom));
        }

        .modal {
          width: 100%;

          grid-template-columns: 1fr;

          margin: auto 0;

          max-height:
            calc(100svh - 24px);

          overflow-y: auto;
        }

        .modal__media {
          min-height: 220px;

          height: 220px;
        }

        .modal__media img {
          min-height: 220px;
          height: 220px;
        }

        .modal__body {
          padding: 28px 22px 24px;

          max-height: none;
          overflow: visible;
        }

        .modal__body h3 {
          font-size: 28px;
        }

        .modal__price {
          font-size: 21px;
        }

        .modal__description {
          font-size: 13px;
        }

        .modal__actions {
          display: grid;
          grid-template-columns: 1fr;
        }

        .modal__actions .btn {
          width: 100%;
        }

        /* SERVICES */

        .services__grid {
          grid-template-columns: 1fr;

          margin-top: 35px;
        }

        .services__card {
          min-height: auto;

          padding: 28px 22px;

          border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .services__card:last-child {
          border-bottom: 0;
        }

        /* WHY */

        .why__inner {
          gap: 45px;
        }

        .why__image img {
          height: 330px;
        }

        .why__image::before {
          top: -10px;
          left: -10px;

          width: 75px;
          height: 75px;
        }

        .why__list {
          gap: 12px;

          margin-top: 26px;
        }

        .why__list li {
          font-size: 13px;
        }

        /* AREAS */

        .areas__grid {
          display: grid;

          grid-template-columns: 1fr;
          grid-template-rows: repeat(5,210px);

          gap: 12px;

          margin-top: 35px;
        }

        .areas__card:first-child {
          grid-column: auto;
          grid-row: auto;
        }

        .areas__text {
          right: 18px;
          bottom: 18px;
          left: 18px;
        }

        .areas__text h3 {
          font-size: 24px;
        }

        .areas__text p {
          font-size: 11px;
        }

        .areas__arrow {
          opacity: 1;
          transform: none;
        }

        /* TESTIMONIALS */

        .testimonials__quote-mark {
          width: 36px;
          height: 36px;
        }

        .testimonials__stage {
          min-height: 330px;
        }

        .testimonials__quote {
          font-size: 23px;
          line-height: 1.48;
        }

        .testimonials__controls {
          margin-top: 10px;
        }

        /* CINEMATIC */

        .cinematic {
          min-height: 560px;

          background-position: 62% center;
        }

        .cinematic__overlay {
          background:
            linear-gradient(
              180deg,
              rgba(5,12,21,.86),
              rgba(5,12,21,.8)
            );
        }

        .cinematic__content h2 {
          font-size: 40px;
        }

        .cinematic__content p {
          font-size: 13.5px;
        }

        /* PROCESS */

        .process__row {
          grid-template-columns: 1fr;

          gap: 30px;

          margin-top: 38px;
        }

        .process__step {
          display: grid;

          grid-template-columns: 52px 1fr;

          column-gap: 15px;
        }

        .process__number {
          grid-row: span 2;

          margin-bottom: 0;
        }

        .process__step h3 {
          margin-top: 3px;
        }

        .process__step p {
          grid-column: 2;
        }

        /* CTA */

        .investment-cta__inner {
          padding: 35px 23px;
        }

        .investment-cta__inner h2 {
          font-size: 31px;
        }

        .investment-cta__inner p {
          font-size: 13px;
        }

        .investment-cta__buttons {
          display: grid;
          grid-template-columns: 1fr;
        }

        .investment-cta__buttons .btn {
          width: 100%;
        }

        /* ABOUT */

        .about__inner {
          gap: 38px;
        }

        .about__image img {
          height: 300px;
        }

        .about__copy p:not(.kicker) {
          font-size: 13.5px;
        }

        /* CONTACT */

        .contact__grid {
          gap: 35px;

          margin-top: 38px;
        }

        .contact__form {
          padding: 28px 20px;
        }

        .contact__row {
          grid-template-columns: 1fr;
          gap: 0;
        }

        .contact__field input,
        .contact__field select,
        .contact__field textarea {
          font-size: 14px;
        }

        /* FOOTER */

        .footer {
          padding: 55px 0 20px;
        }

        .footer__top {
          grid-template-columns: 1fr;

          gap: 35px;

          padding-bottom: 35px;
        }

        .footer__bottom {
          flex-direction: column;
          align-items: flex-start;

          padding-top: 20px;
        }

        /* FLOATING */

        .whatsapp-float {
          right: 16px;
          bottom:
            max(16px, env(safe-area-inset-bottom));

          width: 54px;
          height: 54px;
        }

        .whatsapp-float__tooltip {
          display: none;
        }

        .back-to-top {
          right: 17px;
          bottom: 83px;

          width: 40px;
          height: 40px;
        }

        .toast {
          bottom:
            max(80px, calc(env(safe-area-inset-bottom) + 70px));
        }
      }

      /* ======================================================
         VERY SMALL PHONES
      ====================================================== */

      @media (max-width: 380px) {

        .container,
        .hero__content,
        .hero-search {
          width: calc(100% - 26px);
        }

        .hero__heading {
          font-size: 42px;
        }

        .hero__sub {
          font-size: 12.5px;
        }

        .navbar__brand-name {
          display: none;
        }

        .property-card__media {
          height: 215px;
        }

        .modal__body {
          padding: 25px 18px;
        }

        .modal__body h3 {
          font-size: 25px;
        }

        .testimonials__quote {
          font-size: 21px;
        }
      }

      /* ======================================================
         REDUCED MOTION
      ====================================================== */

      @media (prefers-reduced-motion: reduce) {

        html {
          scroll-behavior: auto;
        }

        *,
        *::before,
        *::after {
          animation-duration: .01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: .01ms !important;
        }
      }
    `}</style>
  );
}

/* ============================================================
   SCROLL PROGRESS
============================================================ */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX: scrollYProgress,
      }}
    />
  );
}

/* ============================================================
   NAVBAR
============================================================ */

function Navbar({
  onOpenMenu,
  menuOpen,
  onCloseMenu,
}) {
  const scrolled = useScrollFlag(60);

  const handleNavigation = (event, id) => {
    event.preventDefault();

    onCloseMenu();

    window.setTimeout(() => {
      scrollToId(id);
    }, menuOpen ? 180 : 0);
  };

  return (
    <>
      <header
        className={`navbar ${
          scrolled ? "navbar--scrolled" : ""
        }`}
      >
        <div className="navbar__inner container">

          <a
            href="#home"
            className="navbar__brand"
            onClick={(event) =>
              handleNavigation(event, "home")
            }
          >
            <span className="navbar__brand-mark">
              PP
            </span>

            <span className="navbar__brand-name">
              Prime Property
              <span>
                &amp; Developers
              </span>
            </span>
          </a>

          <nav
            className="navbar__links"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) =>
                  handleNavigation(event, link.id)
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">

            <a
              href="#contact"
              className="btn btn--gold btn--small"
              onClick={(event) =>
                handleNavigation(event, "contact")
              }
            >
              Book Consultation
            </a>

            <button
              type="button"
              className="navbar__hamburger"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={onOpenMenu}
            >
              <Menu size={23} />
            </button>

          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              x: "100%",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: "100%",
            }}
            transition={{
              duration: .3,
              ease: [0.22,1,.36,1],
            }}
          >
            <div className="mobile-menu__top">

              <span className="navbar__brand-mark">
                PP
              </span>

              <button
                type="button"
                className="mobile-menu__close"
                aria-label="Close navigation menu"
                onClick={onCloseMenu}
              >
                <X size={25} />
              </button>

            </div>

            <motion.nav
              className="mobile-menu__links"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: .055,
                    delayChildren: .1,
                  },
                },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: 20,
                    },

                    visible: {
                      opacity: 1,
                      x: 0,
                    },
                  }}
                  onClick={(event) =>
                    handleNavigation(
                      event,
                      link.id
                    )
                  }
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                className="btn btn--gold mobile-menu__cta"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 15,
                  },

                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                onClick={(event) =>
                  handleNavigation(
                    event,
                    "contact"
                  )
                }
              >
                Book Consultation
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   HERO
============================================================ */

function Hero({
  filters,
  setFilters,
  onSearch,
}) {
  const reduceMotion = useReducedMotion();

  const heroRef = useRef(null);

  const [glow, setGlow] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const {
    scrollYProgress,
  } = useScroll({
    target: heroRef,
    offset: [
      "start start",
      "end start",
    ],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0,1],
    [1,1.2]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0,.9],
    [0,110]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0,.75],
    [1,0]
  );

  const handleMouseMove = (event) => {
    if (
      reduceMotion ||
      !heroRef.current
    ) {
      return;
    }

    const rect =
      heroRef.current.getBoundingClientRect();

    setGlow({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      opacity: 1,
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={() =>
        setGlow((current) => ({
          ...current,
          opacity: 0,
        }))
      }
    >

      <motion.div
        className="hero__image"
        style={
          reduceMotion
            ? undefined
            : {
                scale: imageScale,
              }
        }
        initial={
          reduceMotion
            ? false
            : {
                scale: 1.08,
              }
        }
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22,1,.36,1],
        }}
      />

      <div
        className="hero__overlay"
        aria-hidden="true"
      />

      <div
        className="hero__glow"
        aria-hidden="true"
        style={{
          left: glow.x,
          top: glow.y,
          opacity: glow.opacity,
        }}
      />

      <motion.div
        className="hero__content"
        style={
          reduceMotion
            ? undefined
            : {
                y: contentY,
                opacity: contentOpacity,
              }
        }
      >

        <motion.p
          className="hero__kicker"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .7,
            delay: .2,
          }}
        >
          Islamabad&rsquo;s prime addresses,
          handled personally
        </motion.p>

        <motion.h1
          className="hero__heading"
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .8,
            delay: .35,
          }}
        >
          Your Prime Address in Islamabad.
        </motion.h1>

        <motion.p
          className="hero__sub"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: .8,
            delay: .65,
          }}
        >
          Premium property consultancy, sales,
          rentals and investment solutions across
          Islamabad&rsquo;s most sought-after sectors.
        </motion.p>

        <motion.div
          className="hero__buttons"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .7,
            delay: .85,
          }}
        >

          <a
            href="#properties"
            className="btn btn--gold"
            onClick={(event) => {
              event.preventDefault();
              scrollToId("properties");
            }}
          >
            Explore Properties
          </a>

          <a
            href="#contact"
            className="btn btn--outline"
            onClick={(event) => {
              event.preventDefault();
              scrollToId("contact");
            }}
          >
            Book a Consultation
          </a>

        </motion.div>

        <motion.div
          className="hero__trust"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: .8,
            delay: 1,
          }}
        >
          <span>Residential</span>
          <span>Commercial</span>
          <span>Investment Advisory</span>
        </motion.div>

      </motion.div>

      <motion.div
        className="hero-search"
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .75,
          delay: 1,
          ease: "easeOut",
        }}
      >

        <form
          className="hero-search__panel"
          onSubmit={(event) => {
            event.preventDefault();
            onSearch();
          }}
        >

          <div className="hero-search__field">
            <label htmlFor="lookingFor">
              Looking for
            </label>

            <select
              id="lookingFor"
              value={filters.purpose}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  purpose:
                    event.target.value,
                }))
              }
            >
              {LOOKING_FOR_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="hero-search__field">
            <label htmlFor="propertyType">
              Property type
            </label>

            <select
              id="propertyType"
              value={filters.type}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  type:
                    event.target.value,
                }))
              }
            >
              {PROPERTY_TYPE_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="hero-search__field">
            <label htmlFor="location">
              Location
            </label>

            <select
              id="location"
              value={filters.location}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  location:
                    event.target.value,
                }))
              }
            >
              {LOCATION_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn--gold hero-search__submit"
          >
            <Search size={17} />
            Search Property
          </button>

        </form>
      </motion.div>

      <motion.div
        className="hero__scroll"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.4,
        }}
      >
        <span>SCROLL</span>
        <span className="hero__scroll-line" />
      </motion.div>

    </section>
  );
}

/* ============================================================
   MARQUEE
============================================================ */

function Marquee() {
  const items = [
    "F-6",
    "F-7",
    "F-8",
    "E-7",
    "Blue Area",
    "Buy",
    "Rent",
    "Invest",
  ];

  const loop = [
    ...items,
    ...items,
  ];

  return (
    <div
      className="marquee"
      aria-hidden="true"
    >
      <div className="marquee__track">
        {loop.map((item,index) => (
          <span
            key={`${item}-${index}`}
            className="marquee__item"
          >
            {item}
            <MapPin size={15} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   STATS
============================================================ */

function Stats() {
  return (
    <section className="stats">
      <div className="container">

        <div className="stats__grid">
          {STATS.map((stat,index) => (
            <Reveal
              key={stat.label}
              as="div"
              className="stats__card"
              delay={index * .06}
            >
              <span className="stats__value">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </span>

              <p className="stats__label">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <p className="stats__note">
          Figures shown are illustrative demo content
          for this preview website.
        </p>

      </div>
    </section>
  );
}

/* ============================================================
   TRUST
============================================================ */

function TrustSection() {
  const items = [
    {
      icon: MapPin,
      title: "Prime Locations",
      detail: "F-6, F-7, F-8, E-7",
    },

    {
      icon: HomeIcon,
      title: "Property Expertise",
      detail: "Residential & commercial",
    },

    {
      icon: Handshake,
      title: "Complete Solutions",
      detail: "Sales, purchase, rental",
    },

    {
      icon: TrendingUp,
      title: "Investment Focus",
      detail: "Strategic guidance",
    },
  ];

  return (
    <section className="section section--ivory">
      <div className="container">

        <Reveal
          as="h2"
          className="heading"
        >
          Real estate, with a clearer perspective.
        </Reveal>

        <div className="trust__grid">
          {items.map((item,index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                as="div"
                className="trust__card"
                delay={index * .07}
              >
                <Icon
                  className="trust__icon"
                  size={27}
                />

                <h3>{item.title}</h3>

                <p>{item.detail}</p>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ============================================================
   PROPERTY CARD
============================================================ */

function PropertyCard({
  property,
  onView,
}) {
  const propertyType =
    property.type === "commercial"
      ? "Commercial"
      : property.type === "apartment"
      ? "Apartment"
      : "Residential";

  return (
    <motion.article
      className="property-card"
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: .1,
      }}
      transition={{
        duration: .55,
      }}
    >

      <div className="property-card__media">

        <img
          src={property.image}
          alt={`${property.title} in ${property.location}`}
          loading="lazy"
        />

        <span className="property-card__badge">
          {propertyType}
        </span>

      </div>

      <div className="property-card__body">

        <div className="property-card__top">

          <h3>{property.title}</h3>

          <span className="property-card__price">
            {property.price}
          </span>

        </div>

        <p className="property-card__location">
          <MapPin size={15} />
          {property.location}
        </p>

        <div className="property-card__meta">

          {property.beds !== null && (
            <span>
              <Bed size={15} />
              {property.beds} Beds
            </span>
          )}

          {property.baths !== null && (
            <span>
              <Bath size={15} />
              {property.baths} Baths
            </span>
          )}

          <span>
            <Maximize size={15} />
            {property.size}
          </span>

        </div>

        <div className="property-card__actions">

          <button
            type="button"
            className="property-card__view"
            onClick={() =>
              onView(property)
            }
          >
            View Property
            <ArrowUpRight
              size={16}
              className="property-card__arrow"
            />
          </button>

          <a
            href={waLink(
              `Hello Prime Property & Developers, I am interested in ${property.title} (${property.location}).`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="property-card__whatsapp"
            aria-label={`Ask about ${property.title} on WhatsApp`}
          >
            <MessageCircle size={17} />
          </a>

        </div>

      </div>

    </motion.article>
  );
}

/* ============================================================
   FEATURED PROPERTIES
============================================================ */

function FeaturedProperties({
  filters,
  onView,
  resultsRef,
}) {
  const filtered = useMemo(() => {
    return PROPERTIES.filter(
      (property) => {

        if (
          filters.purpose &&
          property.purpose !== filters.purpose
        ) {
          return false;
        }

        if (
          filters.type &&
          property.type !== filters.type
        ) {
          return false;
        }

        if (
          filters.location &&
          property.locationTag !== filters.location
        ) {
          return false;
        }

        return true;
      }
    );
  }, [filters]);

  const isFiltered =
    filters.purpose ||
    filters.type ||
    filters.location;

  return (
    <section
      id="properties"
      className="section"
      ref={resultsRef}
    >
      <div className="container">

        <div className="section__intro">

          <div>

            <Reveal
              as="p"
              className="kicker"
            >
              Featured properties
            </Reveal>

            <Reveal
              as="h2"
              className="heading"
              delay={.05}
            >
              Selected opportunities across
              Islamabad&rsquo;s prime sectors.
            </Reveal>

            <p className="section__note">
              Featured listings can be replaced
              with the client&rsquo;s live inventory,
              pricing and availability.
            </p>

          </div>

        </div>

        {filtered.length > 0 ? (
          <div className="property-grid">
            {filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onView={onView}
              />
            ))}
          </div>
        ) : (
          <div className="property-grid__empty">
            <p>
              No demo properties match that search.
              Try a different combination.
            </p>
          </div>
        )}

        {isFiltered && (
          <p className="property-grid__count">
            Showing {filtered.length} of{" "}
            {PROPERTIES.length} demo properties
          </p>
        )}

      </div>
    </section>
  );
}

/* ============================================================
   PROPERTY MODAL
============================================================ */

function PropertyModal({
  property,
  onClose,
}) {
  useEffect(() => {
    if (!property) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      onKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        onKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [property, onClose]);

  if (!property) {
    return null;
  }

  const propertyType =
    property.type === "commercial"
      ? "Commercial"
      : property.type === "apartment"
      ? "Apartment"
      : "Residential";

  return (
    <motion.div
      className="modal-backdrop"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={property.title}
    >

      <motion.div
        className="modal"
        initial={{
          opacity: 0,
          y: 25,
          scale: .98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: .98,
        }}
        transition={{
          duration: .3,
        }}
      >

        <button
          type="button"
          className="modal__close"
          aria-label="Close property details"
          onClick={onClose}
        >
          <X size={21} />
        </button>

        <div className="modal__media">
          <img
            src={property.image}
            alt={`${property.title} in ${property.location}`}
          />
        </div>

        <div className="modal__body">

          <span className="modal__badge">
            {propertyType}
          </span>

          <h3>{property.title}</h3>

          <p className="modal__location">
            <MapPin size={15} />
            {property.location}
          </p>

          <p className="modal__price">
            {property.price}
          </p>

          <p className="modal__description">
            {property.description}
          </p>

          <div className="modal__meta">

            {property.beds !== null && (
              <span>
                <Bed size={16} />
                {property.beds} Beds
              </span>
            )}

            {property.baths !== null && (
              <span>
                <Bath size={16} />
                {property.baths} Baths
              </span>
            )}

            <span>
              <Maximize size={16} />
              {property.size}
            </span>

          </div>

          <div className="modal__features">

            <h4>Features</h4>

            <ul>
              {property.features.map(
                (feature) => (
                  <li key={feature}>
                    <Check size={14} />
                    {feature}
                  </li>
                )
              )}
            </ul>

          </div>

          <div className="modal__actions">

            <a
              href="#contact"
              className="btn btn--gold"
              onClick={(event) => {
                event.preventDefault();

                onClose();

                setTimeout(() => {
                  scrollToId("contact");
                }, 200);
              }}
            >
              Contact Us
            </a>

            <a
              href={waLink(
                `Hello Prime Property & Developers, I am interested in ${property.title} (${property.location}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline-dark"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

          </div>

        </div>

      </motion.div>

    </motion.div>
  );
}

/* ============================================================
   SERVICES
============================================================ */

function Services() {
  return (
    <section
      id="services"
      className="section section--navy"
    >
      <div className="container">

        <Reveal
          as="p"
          className="kicker"
        >
          What we do
        </Reveal>

        <Reveal
          as="h2"
          className="heading"
          delay={.05}
        >
          Real estate solutions built around you.
        </Reveal>

        <div className="services__grid">

          {SERVICES.map(
            (service,index) => {
              const Icon = service.icon;

              return (
                <Reveal
                  key={service.title}
                  as="div"
                  className="services__card"
                  delay={index * .07}
                >

                  <Icon
                    className="services__icon"
                    size={29}
                  />

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                </Reveal>
              );
            }
          )}

        </div>

      </div>
    </section>
  );
}

/* ============================================================
   WHY PRIME
============================================================ */

function WhyPrime() {
  return (
    <section className="section">
      <div className="container why__inner">

        <motion.div
          className="why__image"
          initial={{
            opacity: 0,
            x: -35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: .15,
          }}
          transition={{
            duration: .75,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=85"
            alt="Premium residential interior"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: .15,
          }}
          transition={{
            duration: .75,
            delay: .08,
          }}
        >

          <p className="kicker">
            Why Prime Property
          </p>

          <h2 className="heading">
            More than property.
            A better investment decision.
          </h2>

          <ul className="why__list">

            {WHY_POINTS.map(
              (point,index) => (
                <motion.li
                  key={point}
                  initial={{
                    opacity: 0,
                    x: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: .4,
                  }}
                  transition={{
                    duration: .45,
                    delay: index * .055,
                  }}
                >
                  <span className="why__check">
                    <Check size={14} />
                  </span>

                  <span>{point}</span>
                </motion.li>
              )
            )}

          </ul>

        </motion.div>

      </div>
    </section>
  );
}

/* ============================================================
   AREAS
============================================================ */

function Areas() {
  return (
    <section
      id="areas"
      className="section section--ivory"
    >
      <div className="container">

        <Reveal
          as="p"
          className="kicker"
        >
          Where we work
        </Reveal>

        <Reveal
          as="h2"
          className="heading"
          delay={.05}
        >
          Islamabad&rsquo;s prime addresses.
        </Reveal>

        <div className="areas__grid">

          {AREAS.map(
            (area,index) => (
              <motion.div
                key={area.id}
                className="areas__card"
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: .1,
                }}
                transition={{
                  duration: .55,
                  delay: index * .06,
                }}
              >

                <img
                  src={area.image}
                  alt={`${area.name}, Islamabad`}
                  loading="lazy"
                />

                <div
                  className="areas__overlay"
                  aria-hidden="true"
                />

                <ArrowUpRight
                  className="areas__arrow"
                  size={20}
                />

                <div className="areas__text">
                  <h3>{area.name}</h3>

                  <p>
                    {area.description}
                  </p>
                </div>

              </motion.div>
            )
          )}

        </div>

      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
============================================================ */

function Testimonials() {
  const [index,setIndex] = useState(0);
  const [direction,setDirection] = useState(1);

  const timerRef =
    useRef(null);

  const goTo = useCallback(
    (next) => {
      setDirection(
        next > index ||
        (
          index ===
            TESTIMONIALS.length - 1 &&
          next === 0
        )
          ? 1
          : -1
      );

      setIndex(next);
    },
    [index]
  );

  useEffect(() => {
    timerRef.current =
      window.setInterval(() => {
        setDirection(1);

        setIndex(
          (current) =>
            (current + 1) %
            TESTIMONIALS.length
        );
      }, 6500);

    return () =>
      window.clearInterval(
        timerRef.current
      );
  }, []);

  const current =
    TESTIMONIALS[index];

  const initials =
    current.name
      .split(" ")
      .map((word) => word[0])
      .slice(0,2)
      .join("");

  return (
    <section
      id="testimonials"
      className="section section--navy testimonials"
    >
      <div className="container">

        <p className="kicker">
          In their words
        </p>

        <h2
          className="heading"
          style={{
            marginBottom: 42,
          }}
        >
          What clients say about working with us.
        </h2>

        <Quote
          className="testimonials__quote-mark"
          size={42}
        />

        <div className="testimonials__stage">

          <AnimatePresence
            mode="wait"
            custom={direction}
          >
            <motion.div
              key={index}
              custom={direction}
              initial={{
                opacity: 0,
                x: 35 * direction,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -35 * direction,
              }}
              transition={{
                duration: .45,
                ease: [0.22,1,.36,1],
              }}
            >

              <p className="testimonials__quote">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="testimonials__meta">

                <span className="testimonials__avatar">
                  {initials}
                </span>

                <div>
                  <p className="testimonials__name">
                    {current.name}
                  </p>

                  <p className="testimonials__context">
                    {current.context}
                  </p>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        <div className="testimonials__controls">

          <button
            type="button"
            className="testimonials__arrow"
            aria-label="Previous testimonial"
            onClick={() =>
              goTo(
                (index - 1 +
                  TESTIMONIALS.length) %
                  TESTIMONIALS.length
              )
            }
          >
            <ArrowLeft size={17} />
          </button>

          <div className="testimonials__dots">

            {TESTIMONIALS.map(
              (testimonial,i) => (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-label={`Go to testimonial ${
                    i + 1
                  }`}
                  className={`testimonials__dot ${
                    i === index
                      ? "testimonials__dot--active"
                      : ""
                  }`}
                  onClick={() =>
                    goTo(i)
                  }
                />
              )
            )}

          </div>

          <button
            type="button"
            className="testimonials__arrow"
            aria-label="Next testimonial"
            onClick={() =>
              goTo(
                (index + 1) %
                  TESTIMONIALS.length
              )
            }
          >
            <ArrowRight size={17} />
          </button>

        </div>

        <p className="testimonials__note">
          Client testimonials can be replaced
          with verified reviews and case studies
          before launch.
        </p>

      </div>
    </section>
  );
}

/* ============================================================
   CINEMATIC
============================================================ */

function Cinematic() {
  return (
    <section className="cinematic">

      <div
        className="cinematic__overlay"
        aria-hidden="true"
      />

      <div className="container cinematic__content">

        <Reveal as="h2">
          Invest where Islamabad grows.
        </Reveal>

        <Reveal
          as="p"
          delay={.08}
        >
          Discover residential, commercial and
          investment opportunities in one of
          Pakistan&rsquo;s most prestigious cities.
        </Reveal>

        <Reveal
          as="a"
          href="#properties"
          className="btn btn--gold"
          delay={.15}
          onClick={(event) => {
            event.preventDefault();
            scrollToId("properties");
          }}
        >
          Explore Opportunities
        </Reveal>

      </div>

    </section>
  );
}

/* ============================================================
   PROCESS
============================================================ */

function Process() {
  return (
    <section className="section section--ivory">
      <div className="container">

        <Reveal
          as="p"
          className="kicker"
        >
          How it works
        </Reveal>

        <Reveal
          as="h2"
          className="heading"
          delay={.05}
        >
          A simpler way to find the right property.
        </Reveal>

        <div className="process__row">

          {PROCESS_STEPS.map(
            (step,index) => (
              <motion.div
                key={step.number}
                className="process__step"
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: .15,
                }}
                transition={{
                  duration: .55,
                  delay: index * .08,
                }}
              >

                <span className="process__number">
                  {step.number}
                </span>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

              </motion.div>
            )
          )}

        </div>

      </div>
    </section>
  );
}

/* ============================================================
   INVESTMENT CTA
============================================================ */

function InvestmentCTA() {
  return (
    <section className="section section--navy">
      <div className="container">

        <Reveal
          as="div"
          className="investment-cta__inner"
        >

          <h2>
            Ready to make your next property move?
          </h2>

          <p>
            Speak with our team for tailored
            property advice, viewing support and
            investment guidance.
          </p>

          <div className="investment-cta__buttons">

            <a
              href="#contact"
              className="btn btn--gold"
              onClick={(event) => {
                event.preventDefault();
                scrollToId("contact");
              }}
            >
              Talk to an Expert
            </a>

            <a
              href={waLink(
                WHATSAPP_DEFAULT_MESSAGE
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              WhatsApp Us
            </a>

          </div>

        </Reveal>

      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
============================================================ */

function About() {
  return (
    <section
      id="about"
      className="section"
    >
      <div className="container about__inner">

        <motion.div
          className="about__image"
          initial={{
            opacity: 0,
            scale: 1.04,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: .15,
          }}
          transition={{
            duration: .8,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
            alt="Premium property exterior"
            loading="lazy"
          />
        </motion.div>

        <div className="about__copy">

          <Reveal
            as="p"
            className="kicker"
          >
            About us
          </Reveal>

          <Reveal
            as="h2"
            className="heading"
            delay={.05}
            style={{
              marginBottom: 24,
            }}
          >
            Your trusted real estate partner in Islamabad.
          </Reveal>

          <Reveal
            as="p"
            delay={.1}
          >
            Prime Property &amp; Developers Pvt. Ltd.
            is a real estate company based in Islamabad,
            working with clients across the city&rsquo;s
            most established sectors, including F-6,
            F-7, F-8, E-7 and Blue Area.
          </Reveal>

          <Reveal
            as="p"
            delay={.14}
          >
            We provide property marketing and consultancy,
            alongside support for sales, purchases and
            rentals across both residential and commercial
            properties &mdash; guided by what each client
            actually needs, from the first conversation
            through to completion.
          </Reveal>

        </div>

      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
============================================================ */

function Contact() {
  const [form,setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });

  const [submitted,setSubmitted] =
    useState(false);

  const handleChange =
    (field) =>
    (event) => {
      setForm((current) => ({
        ...current,
        [field]:
          event.target.value,
      }));
    };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = [
      `New website inquiry from ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Interest: ${form.interest}`,
      `Message: ${form.message}`,
    ].join("\n");

    window.open(
      waLink(message),
      "_blank",
      "noopener,noreferrer"
    );

    setSubmitted(true);

    setForm({
      name: "",
      phone: "",
      email: "",
      interest: "",
      message: "",
    });

    window.setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="section section--ivory"
    >
      <div className="container">

        <Reveal
          as="p"
          className="kicker"
        >
          Get in touch
        </Reveal>

        <Reveal
          as="h2"
          className="heading"
          delay={.05}
        >
          Let&rsquo;s find your prime property.
        </Reveal>

        <div className="contact__grid">

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: .15,
            }}
            transition={{
              duration: .65,
            }}
          >

            <div className="contact__item">
              <MapPin size={21} />

              <p>
                {COMPANY.address.map(
                  (line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  )
                )}
              </p>
            </div>

            <div className="contact__item">
              <Phone size={21} />

              <a
                href={`tel:+${COMPANY.phoneIntl}`}
              >
                {COMPANY.phone}
              </a>
            </div>

            <div className="contact__item">
              <Mail size={21} />

              <a
                href={`mailto:${COMPANY.email}`}
              >
                {COMPANY.email}
              </a>
            </div>

          </motion.div>

          <motion.form
            className="contact__form"
            initial={{
              opacity: 0,
              x: 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: .15,
            }}
            transition={{
              duration: .65,
              delay: .08,
            }}
            onSubmit={handleSubmit}
          >

            <div className="contact__row">

              <div className="contact__field">
                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="phone">
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={handleChange("phone")}
                />
              </div>

            </div>

            <div className="contact__row">

              <div className="contact__field">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="interest">
                  Interest
                </label>

                <select
                  id="interest"
                  required
                  value={form.interest}
                  onChange={handleChange("interest")}
                >
                  <option
                    value=""
                    disabled
                  >
                    Select an option
                  </option>

                  {INTEREST_OPTIONS.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>

            </div>

            <div className="contact__field">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange("message")}
              />

            </div>

            <button
              type="submit"
              className="btn btn--gold contact__submit"
            >
              Send Inquiry
            </button>

          </motion.form>

        </div>

      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            className="toast"
            initial={{
              opacity: 0,
              y: 25,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: 15,
              x: "-50%",
            }}
            transition={{
              duration: .3,
            }}
            role="status"
          >
            <Check size={18} />

            <span>
              Your inquiry is ready in WhatsApp.
              Prime Property &amp; Developers will
              be able to respond directly.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

/* ============================================================
   FOOTER
============================================================ */

function Footer() {
  const handleFooterNav = (
    event,
    id
  ) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="footer">

      <div className="container footer__top">

        <div className="footer__brand">

          <span className="navbar__brand-mark">
            PP
          </span>

          <h3>
            {COMPANY.legalName}
          </h3>

          <p>
            Find your prime address.
          </p>

        </div>

        <div className="footer__col">

          <h4>Company</h4>

          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) =>
                    handleFooterNav(
                      event,
                      link.id
                    )
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

        </div>

        <div className="footer__col">

          <h4>Services</h4>

          <ul>
            <li>Property Sales</li>
            <li>Property Purchase</li>
            <li>Rentals</li>
            <li>Investment Consultancy</li>
          </ul>

        </div>

        <div className="footer__col">

          <h4>Contact</h4>

          <ul>
            <li>
              <a
                href={`tel:+${COMPANY.phoneIntl}`}
              >
                {COMPANY.phone}
              </a>
            </li>

            <li>
              <a
                href={`mailto:${COMPANY.email}`}
              >
                {COMPANY.email}
              </a>
            </li>

            <li>
              Islamabad, Pakistan
            </li>
          </ul>

        </div>

      </div>

      <div className="container footer__bottom">

        <p>
          &copy; 2026{" "}
          {COMPANY.legalName}.
          All rights reserved.
        </p>

        <div className="footer__social">

          <a
            href="https://www.facebook.com/Primepropertyanddevelopers"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook size={17} />
          </a>

          <a
            href="https://www.instagram.com/prime_property.developers/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={17} />
          </a>

          <a
            href="https://x.com/PrimeProperty7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <Twitter size={17} />
          </a>

          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <Music2 size={17} />
          </a>

        </div>

      </div>

    </footer>
  );
}

/* ============================================================
   WHATSAPP FLOAT
============================================================ */

function WhatsAppFloat() {
  return (
    <a
      href={waLink(
        WHATSAPP_DEFAULT_MESSAGE
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with Prime Property on WhatsApp"
    >

      <span
        className="whatsapp-float__pulse"
        aria-hidden="true"
      />

      <MessageCircle size={25} />

      <span className="whatsapp-float__tooltip">
        Chat with us
      </span>

    </a>
  );
}

/* ============================================================
   BACK TO TOP
============================================================ */

function BackToTop() {
  const show =
    useScrollFlag(600);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className="back-to-top"
          aria-label="Back to top"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 15,
          }}
          transition={{
            duration: .22,
          }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <ArrowUp size={19} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN APP
============================================================ */

export default function App() {
  const [menuOpen,setMenuOpen] =
    useState(false);

  const [filters,setFilters] =
    useState({
      purpose: "",
      type: "",
      location: "",
    });

  const [
    selectedProperty,
    setSelectedProperty,
  ] = useState(null);

  const resultsRef =
    useRef(null);

  /* Lock page scrolling when mobile menu
     or property modal is active. */
  useEffect(() => {
    if (
      menuOpen ||
      selectedProperty
    ) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    menuOpen,
    selectedProperty,
  ]);

  /* Close mobile menu with Escape */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Escape" &&
        menuOpen
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [menuOpen]);

  const handleSearch = () => {
    if (!resultsRef.current) {
      return;
    }

    resultsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="pp-root">

      <GlobalStyles />

      <div
        className="grain"
        aria-hidden="true"
      />

      <ScrollProgressBar />

      <Navbar
        menuOpen={menuOpen}
        onOpenMenu={() =>
          setMenuOpen(true)
        }
        onCloseMenu={() =>
          setMenuOpen(false)
        }
      />

      <main>

        <Hero
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
        />

        <Marquee />

        <Stats />

        <TrustSection />

        <FeaturedProperties
          filters={filters}
          onView={setSelectedProperty}
          resultsRef={resultsRef}
        />

        <Services />

        <WhyPrime />

        <Areas />

        <Testimonials />

        <Cinematic />

        <Process />

        <InvestmentCTA />

        <About />

        <Contact />

      </main>

      <Footer />

      <WhatsAppFloat />

      <BackToTop />

      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={() =>
              setSelectedProperty(null)
            }
          />
        )}
      </AnimatePresence>

    </div>
  );
}
