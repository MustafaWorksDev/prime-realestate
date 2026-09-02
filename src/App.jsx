import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
   COMPANY DATA
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
  return `https://wa.me/${COMPANY.phoneIntl}?text=${encodeURIComponent(message)}`;
}

/* ============================================================
   NAV / SEARCH DATA
   ============================================================ */

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Properties", id: "properties" },
  { label: "Services", id: "services" },
  { label: "Areas", id: "areas" },
  { label: "Clients", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

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
   PROPERTIES
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
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
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
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
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
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",
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
      "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&w=1400&q=80",
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
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
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
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
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
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=80",
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
   AREAS / SERVICES / WHY / PROCESS
   ============================================================ */

const AREAS = [
  { id: "f6", name: "F-6", description: "An established address for old-money quiet and mature, tree-lined streets.", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80" },
  { id: "f7", name: "F-7", description: "Islamabad's most requested postcode, close to markets, schools and diplomatic enclaves.", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80" },
  { id: "f8", name: "F-8", description: "A broad mix of family homes and rentals, five minutes from the Margalla trails.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80" },
  { id: "e7", name: "E-7", description: "Exclusive, low-density plots favoured by families who want space and privacy.", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" },
  { id: "blue-area", name: "Blue Area", description: "Islamabad's commercial spine, where every serious investor wants a floor.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
];

const SERVICES = [
  { icon: HomeIcon, title: "Property Sales", description: "Professional marketing and negotiation support to sell residential and commercial property at the right price." },
  { icon: KeyRound, title: "Property Purchase", description: "A shortlist built around your budget and priorities, with honest guidance at every viewing." },
  { icon: Building2, title: "Rentals", description: "Tenant screening, paperwork and ongoing support for landlords, and a smoother search for tenants." },
  { icon: TrendingUp, title: "Investment Consultancy", description: "Sector-by-sector insight to help you place capital where Islamabad's growth is heading next." },
];

const WHY_POINTS = [
  "Deep, current knowledge of the Islamabad market",
  "Specialists in F-6, F-7, F-8, E-7 and Blue Area",
  "Consultancy built around your priorities, not a script",
  "Residential and commercial expertise under one roof",
  "Support that continues after the paperwork is signed",
  "An investment-first lens on every recommendation",
];

const PROCESS_STEPS = [
  { number: "01", title: "Tell us what you need", description: "Share what you're looking to buy, sell, rent or invest in, and where." },
  { number: "02", title: "Explore suitable properties", description: "We put together a shortlist of properties that genuinely match your brief." },
  { number: "03", title: "Get expert guidance", description: "Our consultants walk you through options, locations and next steps." },
  { number: "04", title: "Make your move", description: "Proceed with confidence, supported at every stage of the transaction." },
];

const STATS = [
  { value: 12, suffix: "+", label: "Years active in Islamabad's property market" },
  { value: 480, suffix: "+", label: "Properties sold, let or transacted" },
  { value: 5, suffix: "", label: "Prime sectors covered end to end" },
  { value: 96, suffix: "%", label: "Clients who would recommend us" },
];

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

const INTEREST_OPTIONS = ["Buying", "Selling", "Renting", "Investment", "Commercial", "General inquiry"];

/* ============================================================
   HELPERS
   ============================================================ */

function scrollToId(id) {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useScrollFlag(threshold) {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    function onScroll() {
      setFlag(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return flag;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ as = "div", className, children, delay = 0, ...rest }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* Animated count-up number, triggered once when it scrolls into view */
function CountUp({ value, suffix = "", duration = 1.8 }) {
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
    function tick(now) {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value, duration, reduceMotion]);

  return (
    <motion.span onViewportEnter={start} viewport={{ once: true, amount: 0.6 }}>
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

      :root{
        --navy:#07111f;
        --navy-2:#0d1c30;
        --gold:#c6a15b;
        --gold-light:#e3c78f;
        --gold-dark:#8a6b34;
        --ivory:#f6f2e9;
        --white:#ffffff;
        --text:#1a2230;
        --text-light:#6b7484;
        --text-muted:#98a0ac;
        --border:rgba(7,17,31,0.12);
        --container:1240px;
        --font-display:'Playfair Display', serif;
        --font-body:'Manrope', sans-serif;
      }

      *{margin:0;padding:0;box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      .pp-root{font-family:var(--font-body);color:var(--text);background:var(--white);line-height:1.6;overflow-x:hidden;position:relative;}
      .pp-root img{display:block;width:100%;max-width:100%;}
      .pp-root button,.pp-root input,.pp-root select,.pp-root textarea{font:inherit;}
      .pp-root button{border:0;cursor:pointer;background:none;}
      .pp-root a{color:inherit;text-decoration:none;}
      .pp-root ul{list-style:none;}
      .pp-root ::selection{background:var(--gold);color:var(--white);}

      .container{width:min(100% - 40px, var(--container));margin-inline:auto;}
      .section{padding:120px 0;}
      .section--tight{padding:90px 0;}
      .section--navy{background:var(--navy);color:var(--white);}
      .section--ivory{background:var(--ivory);}

      .kicker{
        font-family:var(--font-display);
        font-style:italic;
        font-weight:400;
        font-size:17px;
        color:var(--gold-dark);
        margin-bottom:16px;
      }
      .section--navy .kicker{color:var(--gold-light);}

      .heading{
        font-family:var(--font-display);
        font-weight:500;
        letter-spacing:-0.02em;
        line-height:1.08;
        font-size:clamp(32px,4.4vw,52px);
        max-width:720px;
      }

      .lede{
        max-width:520px;
        color:var(--text-light);
        font-size:15.5px;
        line-height:1.85;
        margin-top:18px;
      }
      .section--navy .lede{color:rgba(255,255,255,0.62);}

      .grain{
        position:fixed;inset:0;pointer-events:none;z-index:2;opacity:0.035;mix-blend-mode:overlay;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      }

      /* ---------- scroll progress ---------- */
      .scroll-progress{position:fixed;top:0;left:0;right:0;height:3px;transform-origin:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold),var(--gold-light));z-index:1200;}

      /* ---------- buttons ---------- */
      .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:52px;padding:0 26px;font-size:12.5px;font-weight:700;letter-spacing:0.02em;border:1px solid transparent;transition:all .3s ease;overflow:hidden;white-space:nowrap;}
      .btn::before{content:'';position:absolute;inset:0;transform:translateX(-104%);transition:transform .45s ease;z-index:0;}
      .btn:hover::before{transform:translateX(0);}
      .btn span,.btn svg{position:relative;z-index:1;}
      .btn--gold{background:var(--gold);color:var(--white);}
      .btn--gold::before{background:var(--gold-dark);}
      .btn--outline{border-color:rgba(255,255,255,0.45);color:var(--white);}
      .btn--outline::before{background:var(--white);}
      .btn--outline:hover{color:var(--navy);}
      .btn--outline-dark{border-color:var(--navy);color:var(--navy);}
      .btn--outline-dark::before{background:var(--navy);}
      .btn--outline-dark:hover{color:var(--white);}
      .btn--small{min-height:42px;padding:0 18px;font-size:11px;}

      /* ---------- navbar ---------- */
      .navbar{position:fixed;top:0;left:0;right:0;height:88px;z-index:1000;color:var(--white);transition:background .35s ease,height .35s ease,box-shadow .35s ease;}
      .navbar--scrolled{height:74px;background:rgba(7,17,31,0.92);backdrop-filter:blur(16px);box-shadow:0 12px 34px rgba(0,0,0,0.16);}
      .navbar__inner{height:100%;display:flex;align-items:center;justify-content:space-between;gap:32px;}
      .navbar__brand{display:flex;align-items:center;gap:12px;}
      .navbar__brand-mark{width:42px;height:42px;display:grid;place-items:center;border:1px solid var(--gold);color:var(--gold);font-family:var(--font-display);font-size:18px;flex:0 0 auto;}
      .navbar__brand-mark--footer{border-color:var(--gold);color:var(--gold);}
      .navbar__brand-name{font-family:var(--font-display);font-size:17px;line-height:1.15;}
      .navbar__brand-name span{display:block;color:var(--gold-light);font-size:10.5px;font-family:var(--font-body);letter-spacing:0.06em;margin-top:2px;}
      .navbar__links{display:flex;align-items:center;gap:30px;}
      .navbar__links a{position:relative;font-size:12.5px;font-weight:600;color:rgba(255,255,255,0.85);transition:color .25s ease;}
      .navbar__links a::after{content:'';position:absolute;left:0;bottom:-7px;width:0;height:1px;background:var(--gold);transition:width .3s ease;}
      .navbar__links a:hover{color:var(--gold-light);}
      .navbar__links a:hover::after{width:100%;}
      .navbar__actions{display:flex;align-items:center;gap:14px;}
      .navbar__hamburger{width:42px;height:42px;display:none;align-items:center;justify-content:center;color:var(--white);}

      .mobile-menu{position:fixed;inset:0;z-index:1100;background:var(--navy);display:flex;flex-direction:column;padding:26px 24px;}
      .mobile-menu__top{display:flex;align-items:center;justify-content:space-between;}
      .mobile-menu__close{width:42px;height:42px;display:grid;place-items:center;color:var(--white);}
      .mobile-menu__links{display:flex;flex-direction:column;gap:6px;margin-top:60px;}
      .mobile-menu__links a{font-family:var(--font-display);font-size:30px;color:var(--white);padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);}
      .mobile-menu__cta{margin-top:30px;align-self:flex-start;}

      /* ---------- hero ---------- */
      .hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;color:var(--white);}
      .hero__image{position:absolute;inset:-6% ;background-size:cover;background-position:center;will-change:transform;}
      .hero__overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,10,19,0.92) 5%,rgba(4,10,19,0.6) 55%,rgba(4,10,19,0.25) 100%),linear-gradient(to top,rgba(2,6,12,0.55),transparent 45%);}
      .hero__glow{position:absolute;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(198,161,91,0.22),transparent 70%);pointer-events:none;transform:translate(-50%,-50%);transition:opacity .4s ease;}
      .hero__content{position:relative;z-index:2;max-width:760px;padding-top:70px;}
      .hero__kicker{font-family:var(--font-display);font-style:italic;color:var(--gold-light);font-size:19px;margin-bottom:22px;}
      .hero__heading{font-family:var(--font-display);font-weight:500;letter-spacing:-0.03em;line-height:0.98;font-size:clamp(46px,7vw,88px);margin-bottom:26px;}
      .hero__sub{max-width:560px;color:rgba(255,255,255,0.76);font-size:16.5px;line-height:1.85;margin-bottom:34px;}
      .hero__buttons{display:flex;flex-wrap:wrap;gap:14px;}
      .hero__trust{display:flex;flex-wrap:wrap;gap:26px;margin-top:48px;color:rgba(255,255,255,0.62);font-size:12px;font-weight:600;}
      .hero__scroll{position:absolute;left:50%;bottom:34px;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:8px;color:rgba(255,255,255,0.6);font-size:10.5px;letter-spacing:0.14em;}
      .hero__scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,rgba(255,255,255,0.7),transparent);}

      /* ---------- search ---------- */
      .hero-search{position:relative;z-index:3;margin-top:56px;}
      .hero-search__panel{display:grid;grid-template-columns:repeat(3,1fr) auto;background:var(--white);box-shadow:0 30px 70px rgba(0,0,0,0.3);}
      .hero-search__field{padding:16px 22px;border-right:1px solid var(--border);}
      .hero-search__field label{display:block;font-size:9.5px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px;}
      .hero-search__field select{width:100%;border:0;outline:0;background:transparent;color:var(--navy);font-size:13.5px;font-weight:700;cursor:pointer;}
      .hero-search__submit{border-radius:0;min-width:170px;}

      /* ---------- marquee ---------- */
      .marquee{position:relative;overflow:hidden;background:var(--navy);padding:22px 0;border-top:1px solid rgba(198,161,91,0.25);border-bottom:1px solid rgba(198,161,91,0.25);}
      .marquee__track{display:flex;width:max-content;animation:marquee 32s linear infinite;}
      .marquee:hover .marquee__track{animation-play-state:paused;}
      .marquee__item{display:flex;align-items:center;gap:22px;padding-right:22px;font-family:var(--font-display);font-style:italic;font-size:22px;color:rgba(255,255,255,0.8);white-space:nowrap;}
      .marquee__item svg{color:var(--gold);flex:0 0 auto;}
      @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

      /* ---------- stats ---------- */
      .stats{background:var(--ivory);padding:70px 0;}
      .stats__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);}
      .stats__card{background:var(--ivory);padding:36px 30px;}
      .stats__value{display:block;font-family:var(--font-display);font-size:clamp(38px,4vw,54px);font-weight:500;color:var(--navy);}
      .stats__label{margin-top:10px;color:var(--text-light);font-size:13px;line-height:1.6;max-width:220px;}
      .stats__note{margin-top:26px;color:var(--text-muted);font-size:11.5px;}

      /* ---------- trust ---------- */
      .trust__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);margin-top:56px;}
      .trust__card{background:var(--white);padding:38px 28px;transition:transform .3s ease,box-shadow .3s ease;}
      .trust__card:hover{transform:translateY(-6px);box-shadow:0 22px 50px rgba(7,17,31,0.1);z-index:1;}
      .trust__icon{color:var(--gold);margin-bottom:22px;}
      .trust__card h3{font-family:var(--font-display);font-size:20px;font-weight:600;margin-bottom:8px;}
      .trust__card p{color:var(--text-light);font-size:12.5px;}

      /* ---------- section intro ---------- */
      .section__intro{display:flex;align-items:flex-end;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:54px;}
      .section__note{margin-top:14px;color:var(--text-muted);font-size:11.5px;max-width:340px;}

      /* ---------- property grid / card ---------- */
      .property-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
      .property-card{background:var(--white);border:1px solid var(--border);overflow:hidden;transition:box-shadow .4s ease,transform .4s ease;}
      .property-card:hover{box-shadow:0 26px 60px rgba(7,17,31,0.14);transform:translateY(-6px);}
      .property-card__media{position:relative;height:250px;overflow:hidden;}
      .property-card__media img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.22,1,.36,1);}
      .property-card:hover .property-card__media img{transform:scale(1.09);}
      .property-card__badge{position:absolute;top:16px;left:16px;padding:7px 12px;background:rgba(7,17,31,0.75);backdrop-filter:blur(6px);color:var(--white);font-size:10px;font-weight:700;letter-spacing:0.04em;}
      .property-card__body{padding:24px;}
      .property-card__top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px;}
      .property-card__top h3{font-family:var(--font-display);font-size:21px;font-weight:600;}
      .property-card__price{color:var(--gold-dark);font-weight:700;font-size:13.5px;white-space:nowrap;}
      .property-card__location{display:flex;align-items:center;gap:6px;color:var(--text-light);font-size:12.5px;margin-bottom:16px;}
      .property-card__meta{display:flex;gap:16px;padding-top:16px;border-top:1px solid var(--border);color:var(--text-light);font-size:12px;font-weight:600;}
      .property-card__meta span{display:flex;align-items:center;gap:6px;}
      .property-card__meta svg{color:var(--gold);}
      .property-card__actions{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
      .property-card__view{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;color:var(--navy);}
      .property-card__arrow{transition:transform .3s ease;}
      .property-card__view:hover .property-card__arrow{transform:translate(3px,-3px);}
      .property-card__whatsapp{width:38px;height:38px;display:grid;place-items:center;border:1px solid var(--border);color:var(--navy);transition:all .25s ease;}
      .property-card__whatsapp:hover{background:#25d366;border-color:#25d366;color:var(--white);}
      .property-grid__empty{grid-column:1/-1;padding:70px 30px;text-align:center;background:var(--ivory);color:var(--text-light);}
      .property-grid__count{margin-top:26px;color:var(--text-muted);font-size:12px;}

      /* ---------- modal ---------- */
      .modal-backdrop{position:fixed;inset:0;z-index:2000;background:rgba(3,8,14,0.82);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px;}
      .modal{position:relative;width:min(940px,100%);max-height:90vh;overflow:auto;display:grid;grid-template-columns:1fr 1fr;background:var(--white);box-shadow:0 40px 100px rgba(0,0,0,0.4);}
      .modal__close{position:absolute;top:16px;right:16px;z-index:3;width:40px;height:40px;display:grid;place-items:center;border-radius:50%;background:var(--white);color:var(--navy);box-shadow:0 8px 20px rgba(0,0,0,0.15);}
      .modal__media{min-height:400px;}
      .modal__media img{width:100%;height:100%;object-fit:cover;min-height:400px;}
      .modal__body{padding:44px;}
      .modal__badge{display:inline-block;padding:6px 12px;background:var(--ivory);color:var(--gold-dark);font-size:10px;font-weight:800;letter-spacing:0.06em;margin-bottom:18px;}
      .modal__body h3{font-family:var(--font-display);font-size:32px;font-weight:600;margin-bottom:10px;}
      .modal__location{display:flex;align-items:center;gap:6px;color:var(--text-light);font-size:12.5px;margin-bottom:16px;}
      .modal__price{font-family:var(--font-display);font-size:24px;color:var(--gold-dark);margin-bottom:18px;}
      .modal__description{color:var(--text-light);font-size:14px;line-height:1.85;margin-bottom:24px;}
      .modal__meta{display:flex;gap:22px;padding:18px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:24px;font-size:12.5px;font-weight:600;color:var(--text);}
      .modal__meta span{display:flex;align-items:center;gap:7px;}
      .modal__meta svg{color:var(--gold);}
      .modal__features h4{font-family:var(--font-display);font-size:16px;margin-bottom:12px;}
      .modal__features ul{display:grid;gap:9px;margin-bottom:28px;}
      .modal__features li{display:flex;align-items:flex-start;gap:9px;font-size:13px;color:var(--text-light);}
      .modal__features svg{color:var(--gold);flex:0 0 auto;margin-top:2px;}
      .modal__actions{display:flex;gap:12px;flex-wrap:wrap;}

      /* ---------- services ---------- */
      .services__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.12);margin-top:54px;}
      .services__card{background:var(--navy);padding:38px 28px;min-height:250px;transition:background .3s ease;}
      .services__card:hover{background:var(--navy-2);}
      .services__icon{color:var(--gold);margin-bottom:26px;}
      .services__card h3{font-family:var(--font-display);font-size:21px;font-weight:600;margin-bottom:10px;}
      .services__card p{color:rgba(255,255,255,0.6);font-size:12.5px;line-height:1.75;}

      /* ---------- why ---------- */
      .why__inner{display:grid;grid-template-columns:0.85fr 1.15fr;gap:80px;align-items:center;}
      .why__image{position:relative;}
      .why__image img{height:560px;object-fit:cover;}
      .why__image::before{content:'';position:absolute;top:-18px;left:-18px;width:110px;height:110px;border-top:1px solid var(--gold);border-left:1px solid var(--gold);}
      .why__list{display:grid;gap:16px;margin-top:34px;}
      .why__list li{display:flex;align-items:flex-start;gap:14px;font-size:14.5px;color:var(--text);}
      .why__check{width:24px;height:24px;flex:0 0 auto;display:grid;place-items:center;border:1px solid rgba(198,161,91,0.5);color:var(--gold-dark);margin-top:1px;}

      /* ---------- areas ---------- */
      .areas__grid{display:grid;grid-template-columns:1.3fr 1fr 1fr;grid-template-rows:260px 260px;gap:16px;margin-top:54px;}
      .areas__card{position:relative;overflow:hidden;color:var(--white);cursor:default;}
      .areas__card:first-child{grid-row:span 2;}
      .areas__card img{width:100%;height:100%;object-fit:cover;transition:transform .7s ease;}
      .areas__card:hover img{transform:scale(1.08);}
      .areas__overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(3,9,17,0.88),rgba(3,9,17,0.05) 60%);}
      .areas__text{position:absolute;left:26px;right:26px;bottom:24px;}
      .areas__text h3{font-family:var(--font-display);font-size:26px;font-weight:500;margin-bottom:6px;}
      .areas__text p{font-size:12.5px;color:rgba(255,255,255,0.72);max-width:260px;}
      .areas__arrow{position:absolute;top:20px;right:20px;color:var(--gold-light);opacity:0;transform:translate(-6px,6px);transition:all .3s ease;}
      .areas__card:hover .areas__arrow{opacity:1;transform:translate(0,0);}

      /* ---------- testimonials ---------- */
      .testimonials{position:relative;overflow:hidden;}
      .testimonials__quote-mark{color:rgba(198,161,91,0.35);margin-bottom:18px;}
      .testimonials__stage{position:relative;min-height:220px;max-width:760px;}
      .testimonials__quote{font-family:var(--font-display);font-size:clamp(22px,2.6vw,30px);font-weight:400;line-height:1.5;color:var(--white);}
      .testimonials__meta{margin-top:26px;display:flex;align-items:center;gap:14px;}
      .testimonials__avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-dark));display:grid;place-items:center;font-family:var(--font-display);color:var(--white);font-size:16px;}
      .testimonials__name{font-weight:700;font-size:13.5px;}
      .testimonials__context{color:rgba(255,255,255,0.55);font-size:12px;}
      .testimonials__controls{display:flex;align-items:center;gap:16px;margin-top:44px;}
      .testimonials__dots{display:flex;gap:8px;}
      .testimonials__dot{width:24px;height:2px;background:rgba(255,255,255,0.25);transition:background .3s ease;}
      .testimonials__dot--active{background:var(--gold);}
      .testimonials__arrow{width:44px;height:44px;display:grid;place-items:center;border:1px solid rgba(255,255,255,0.2);color:var(--white);transition:all .25s ease;}
      .testimonials__arrow:hover{border-color:var(--gold);color:var(--gold);}
      .testimonials__note{margin-top:34px;color:rgba(255,255,255,0.4);font-size:11px;}

      /* ---------- cinematic ---------- */
      .cinematic{position:relative;min-height:560px;display:flex;align-items:center;color:var(--white);background-size:cover;background-position:center;background-attachment:fixed;}
      .cinematic__overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,12,21,0.9),rgba(5,12,21,0.4));}
      .cinematic__content{position:relative;z-index:1;max-width:680px;}
      .cinematic__content h2{font-family:var(--font-display);font-size:clamp(38px,5.4vw,64px);font-weight:500;line-height:1.06;margin-bottom:22px;}
      .cinematic__content p{max-width:560px;color:rgba(255,255,255,0.72);font-size:15.5px;line-height:1.85;margin-bottom:30px;}

      /* ---------- process ---------- */
      .process__row{display:grid;grid-template-columns:repeat(4,1fr);gap:36px;position:relative;margin-top:56px;}
      .process__row::before{content:'';position:absolute;top:26px;left:8%;right:8%;height:1px;background:rgba(198,161,91,0.35);}
      .process__step{position:relative;}
      .process__number{position:relative;z-index:1;display:inline-flex;width:52px;height:52px;align-items:center;justify-content:center;border:1px solid var(--gold);color:var(--gold-dark);font-family:var(--font-display);font-size:17px;background:var(--white);margin-bottom:22px;}
      .process__step h3{font-family:var(--font-display);font-size:19px;font-weight:600;margin-bottom:8px;}
      .process__step p{color:var(--text-light);font-size:13px;line-height:1.75;}

      /* ---------- investment cta ---------- */
      .investment-cta__inner{position:relative;padding:74px 70px;background:linear-gradient(120deg,rgba(198,161,91,0.14),transparent 60%);border:1px solid rgba(198,161,91,0.28);text-align:left;}
      .investment-cta__inner h2{font-family:var(--font-display);font-size:clamp(30px,4vw,46px);font-weight:500;line-height:1.1;max-width:640px;margin-bottom:16px;}
      .investment-cta__inner p{max-width:520px;color:rgba(255,255,255,0.62);font-size:14.5px;margin-bottom:30px;}
      .investment-cta__buttons{display:flex;gap:14px;flex-wrap:wrap;}

      /* ---------- about ---------- */
      .about__inner{display:grid;grid-template-columns:0.9fr 1.1fr;gap:70px;align-items:center;}
      .about__image{position:relative;}
      .about__image img{height:480px;object-fit:cover;}
      .about__copy p{color:var(--text-light);font-size:14.5px;line-height:1.9;margin-bottom:20px;}

      /* ---------- contact ---------- */
      .contact__grid{display:grid;grid-template-columns:0.8fr 1.2fr;gap:70px;align-items:start;margin-top:54px;}
      .contact__item{display:flex;align-items:flex-start;gap:16px;margin-bottom:26px;}
      .contact__item svg{color:var(--gold);flex:0 0 auto;margin-top:2px;}
      .contact__item a,.contact__item p{font-size:14px;color:var(--text);}
      .contact__form{background:var(--white);padding:44px;box-shadow:0 20px 60px rgba(7,17,31,0.08);}
      .contact__row{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
      .contact__field{display:flex;flex-direction:column;gap:7px;margin-bottom:20px;}
      .contact__field label{font-size:10.5px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);}
      .contact__field input,.contact__field select,.contact__field textarea{border:0;border-bottom:1px solid var(--border);padding:11px 0;font-size:14px;background:transparent;outline:0;transition:border-color .25s ease;}
      .contact__field input:focus,.contact__field select:focus,.contact__field textarea:focus{border-color:var(--gold);}
      .contact__field textarea{resize:vertical;min-height:100px;}
      .contact__submit{width:100%;margin-top:6px;}

      .toast{position:fixed;left:50%;bottom:30px;z-index:3000;display:flex;align-items:center;gap:12px;padding:16px 22px;background:var(--navy);color:var(--white);border-left:3px solid var(--gold);box-shadow:0 20px 50px rgba(0,0,0,0.3);max-width:min(420px,90vw);}
      .toast svg{color:var(--gold);flex:0 0 auto;}

      /* ---------- footer ---------- */
      .footer{padding:70px 0 26px;background:#040a13;color:var(--white);}
      .footer__top{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:50px;padding-bottom:50px;border-bottom:1px solid rgba(255,255,255,0.08);}
      .footer__brand h3{font-family:var(--font-display);font-size:16px;margin-top:16px;max-width:220px;}
      .footer__brand p{margin-top:12px;color:rgba(255,255,255,0.45);font-size:12.5px;}
      .footer__col h4{color:var(--gold-light);font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;}
      .footer__col ul{display:grid;gap:11px;}
      .footer__col a,.footer__col li{color:rgba(255,255,255,0.55);font-size:12.5px;}
      .footer__col a:hover{color:var(--gold);}
      .footer__bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding-top:22px;color:rgba(255,255,255,0.35);font-size:11px;}
      .footer__social{display:flex;gap:10px;}
      .footer__social a{width:36px;height:36px;display:grid;place-items:center;border:1px solid rgba(255,255,255,0.14);transition:all .25s ease;}
      .footer__social a:hover{border-color:var(--gold);color:var(--gold);}

      /* ---------- floating buttons ---------- */
      .whatsapp-float{position:fixed;right:26px;bottom:26px;z-index:900;width:58px;height:58px;display:grid;place-items:center;border-radius:50%;background:#25d366;color:var(--white);box-shadow:0 16px 40px rgba(37,211,102,0.35);}
      .whatsapp-float__pulse{position:absolute;inset:0;border-radius:50%;background:#25d366;animation:pulse 2.2s ease-out infinite;}
      @keyframes pulse{0%{transform:scale(1);opacity:.6;}100%{transform:scale(1.9);opacity:0;}}
      .whatsapp-float__tooltip{position:absolute;right:70px;background:var(--navy);color:var(--white);padding:8px 14px;font-size:12px;white-space:nowrap;opacity:0;transform:translateX(6px);transition:all .25s ease;pointer-events:none;}
      .whatsapp-float:hover .whatsapp-float__tooltip{opacity:1;transform:translateX(0);}
      .back-to-top{position:fixed;right:26px;bottom:96px;z-index:900;width:44px;height:44px;display:grid;place-items:center;background:var(--navy);color:var(--white);border:1px solid rgba(255,255,255,0.1);}
      .back-to-top:hover{background:var(--gold);}

      /* ---------- responsive ---------- */
      @media (max-width:1100px){
        .property-grid{grid-template-columns:repeat(2,1fr);}
        .services__grid{grid-template-columns:repeat(2,1fr);}
        .stats__grid{grid-template-columns:repeat(2,1fr);}
        .why__inner,.about__inner,.contact__grid{gap:46px;}
      }
      @media (max-width:900px){
        .navbar__links,.navbar__actions .btn{display:none;}
        .navbar__hamburger{display:flex;}
        .hero-search__panel{grid-template-columns:repeat(2,1fr);}
        .hero-search__submit{grid-column:1/-1;}
        .trust__grid{grid-template-columns:repeat(2,1fr);}
        .why__inner{grid-template-columns:1fr;}
        .why__image img{height:400px;}
        .areas__grid{grid-template-columns:1fr 1fr;grid-template-rows:220px 220px 220px;}
        .areas__card:first-child{grid-row:auto;grid-column:1/-1;}
        .process__row{grid-template-columns:1fr 1fr;row-gap:44px;}
        .process__row::before{display:none;}
        .investment-cta__inner{padding:50px 34px;}
        .about__inner{grid-template-columns:1fr;}
        .contact__grid{grid-template-columns:1fr;}
        .footer__top{grid-template-columns:1fr 1fr;}
      }
      @media (max-width:600px){
        .section{padding:76px 0;}
        .property-grid{grid-template-columns:1fr;}
        .services__grid{grid-template-columns:1fr;}
        .stats__grid{grid-template-columns:1fr;}
        .hero-search__panel{grid-template-columns:1fr;}
        .hero-search__field{border-right:0;border-bottom:1px solid var(--border);}
        .modal{grid-template-columns:1fr;}
        .modal__media img{min-height:220px;}
        .modal__meta{flex-wrap:wrap;gap:14px;}
        .section__intro{display:block;}
        .contact__row{grid-template-columns:1fr;}
        .contact__form{padding:28px 22px;}
        .footer__top{grid-template-columns:1fr;}
        .marquee__item{font-size:18px;}
      }

      /* ============================================================
         CLIENT-READY POLISH + SECTION SEPARATION
         ============================================================ */
      .pp-root{background:#fff;isolation:isolate;}
      main{position:relative;z-index:1;}
      .section{position:relative;scroll-margin-top:88px;}
      .section:not(.section--navy)::after{content:"";position:absolute;left:50%;bottom:0;width:min(100% - 80px,1180px);height:1px;background:linear-gradient(90deg,transparent,rgba(198,161,91,.35),transparent);transform:translateX(-50%);}
      .section--ivory{background:linear-gradient(180deg,#f8f5ee 0%,#f3eee3 100%);}
      .section--navy{background:linear-gradient(145deg,#06101d 0%,#0b1a2d 55%,#07111f 100%);}
      .section--navy::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 85% 15%,rgba(198,161,91,.11),transparent 28%),radial-gradient(circle at 10% 90%,rgba(198,161,91,.06),transparent 24%);}
      .section--navy>.container{position:relative;z-index:1;}

      .hero{min-height:clamp(720px,100svh,980px);}
      .hero__overlay{background:linear-gradient(90deg,rgba(3,8,16,.96) 0%,rgba(4,10,19,.72) 45%,rgba(4,10,19,.30) 100%),linear-gradient(0deg,rgba(2,6,12,.72),transparent 55%);}
      .hero__content{padding-top:96px;}
      .hero__heading{max-width:780px;text-shadow:0 8px 30px rgba(0,0,0,.22);}
      .hero__sub{max-width:610px;}
      .hero-search{margin-top:62px;}
      .hero-search__panel{border:1px solid rgba(255,255,255,.16);border-radius:3px;overflow:hidden;box-shadow:0 34px 90px rgba(0,0,0,.36);}
      .hero-search__field{min-width:0;background:rgba(255,255,255,.98);}
      .hero-search__submit{min-width:190px;}

      .stats{position:relative;border-bottom:1px solid rgba(7,17,31,.08);}
      .stats__grid,.trust__grid{border-radius:4px;overflow:hidden;box-shadow:0 14px 45px rgba(7,17,31,.06);}
      .stats__card{transition:transform .3s ease,background .3s ease;}
      .stats__card:hover{transform:translateY(-3px);background:#fffdf8;}
      .trust__card{min-height:210px;}

      .section__intro{align-items:flex-end;}
      .property-grid{gap:30px;}
      .property-card{border-radius:6px;box-shadow:0 8px 25px rgba(7,17,31,.045);}
      .property-card__media{height:285px;}
      .property-card__media::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 58%,rgba(3,8,14,.28));pointer-events:none;}
      .property-card__badge{z-index:1;border:1px solid rgba(255,255,255,.16);border-radius:999px;}
      .property-card__whatsapp{border-radius:50%;}
      .property-card__view{padding:8px 0;}

      .services__card,.areas__card,.process__step,.contact__form,.investment-cta__inner{border-radius:5px;}
      .services__card{min-height:245px;border:1px solid rgba(255,255,255,.08);background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018));transition:transform .35s ease,border-color .35s ease,background .35s ease;}
      .services__card:hover{transform:translateY(-7px);border-color:rgba(198,161,91,.45);background:linear-gradient(145deg,rgba(198,161,91,.10),rgba(255,255,255,.025));}
      .areas__card{box-shadow:0 15px 40px rgba(7,17,31,.08);}
      .areas__card img{transition:transform .8s cubic-bezier(.22,1,.36,1),filter .8s ease;}
      .areas__card:hover img{transform:scale(1.06);filter:saturate(1.05);}

      .testimonials{overflow:hidden;}
      .testimonials__stage{max-width:850px;}
      .testimonials__quote{font-size:clamp(24px,3.2vw,42px);line-height:1.35;}
      .testimonials__avatar{box-shadow:0 0 0 5px rgba(198,161,91,.10);}

      .cinematic{min-height:650px;display:flex;align-items:center;position:relative;background-attachment:fixed;}
      .cinematic__content{position:relative;z-index:1;}
      .cinematic::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 70% 45%,rgba(198,161,91,.13),transparent 30%);pointer-events:none;}

      .investment-cta__inner{position:relative;overflow:hidden;border:1px solid rgba(198,161,91,.24);box-shadow:0 25px 70px rgba(0,0,0,.16);}
      .investment-cta__inner::after{content:"";position:absolute;width:360px;height:360px;right:-170px;top:-190px;border:1px solid rgba(198,161,91,.18);border-radius:50%;box-shadow:0 0 0 55px rgba(198,161,91,.035),0 0 0 110px rgba(198,161,91,.02);}
      .contact__form{box-shadow:0 20px 55px rgba(7,17,31,.07);border:1px solid rgba(7,17,31,.08);}
      .contact__field input:focus,.contact__field select:focus,.contact__field textarea:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(198,161,91,.12);}
      .footer{position:relative;}
      .whatsapp-float{box-shadow:0 14px 35px rgba(0,0,0,.25);}
      .back-to-top{box-shadow:0 12px 30px rgba(7,17,31,.18);}

      @media (max-width:900px){
        .hero__content{padding-top:115px;}
        .hero-search{margin-top:42px;}
        .hero-search__panel{grid-template-columns:1fr 1fr;}
        .hero-search__submit{grid-column:1/-1;}
        .property-grid{grid-template-columns:1fr 1fr;}
        .property-card__media{height:245px;}
      }

      @media (prefers-reduced-motion: reduce){
        html{scroll-behavior:auto;}
        *,*::before,*::after{animation-duration:.01ms !important;transition-duration:.01ms !important;}
      }
    `}</style>
  );
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

/* ============================================================
   NAVBAR
   ============================================================ */

function Navbar({ onOpenMenu, menuOpen, onCloseMenu }) {
  const scrolled = useScrollFlag(60);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner container">
          <a
            href="#home"
            className="navbar__brand"
            onClick={(e) => { e.preventDefault(); scrollToId("home"); }}
          >
            <span className="navbar__brand-mark">PP</span>
            <span className="navbar__brand-name">
              Prime Property
              <span>&amp; Developers</span>
            </span>
          </a>

          <nav className="navbar__links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollToId(link.id); }}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">
            <a href="#contact" className="btn btn--gold btn--small" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>
              Book Consultation
            </a>
            <button type="button" className="navbar__hamburger" aria-label="Open menu" aria-expanded={menuOpen} onClick={onOpenMenu}>
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="mobile-menu__top">
              <span className="navbar__brand-mark">PP</span>
              <button type="button" className="mobile-menu__close" aria-label="Close menu" onClick={onCloseMenu}>
                <X size={26} aria-hidden="true" />
              </button>
            </div>

            <motion.nav
              className="mobile-menu__links"
              aria-label="Mobile"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                  onClick={(e) => { e.preventDefault(); onCloseMenu(); setTimeout(() => scrollToId(link.id), 200); }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="btn btn--gold mobile-menu__cta"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                onClick={(e) => { e.preventDefault(); onCloseMenu(); setTimeout(() => scrollToId("contact"), 200); }}
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
   HERO  (cinematic scroll-zoom)
   ============================================================ */

function Hero({ filters, setFilters, onSearch }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, opacity: 0 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);

  function handleMouseMove(e) {
    if (reduceMotion) return;
    const rect = heroRef.current.getBoundingClientRect();
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }

  return (
    <section
      id="home"
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, opacity: 0 }))}
    >
      <motion.div
        className="hero__image"
        style={reduceMotion ? undefined : { scale: imageScale }}
        initial={reduceMotion ? false : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        css={undefined}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      <div className="hero__overlay" aria-hidden="true" />
      <div
        className="hero__glow"
        aria-hidden="true"
        style={{ left: glow.x, top: glow.y, opacity: glow.opacity * 0.9 }}
      />

      <motion.div
        className="hero__content container"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="hero__kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Islamabad&rsquo;s prime addresses, handled personally
        </motion.p>

        <motion.h1
          className="hero__heading"
          style={reduceMotion ? undefined : { scale: headingScale, transformOrigin: "left center" }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Your Prime Address in Islamabad.
        </motion.h1>

        <motion.p className="hero__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.8 }}>
          Premium property consultancy, sales, rentals and investment
          solutions across Islamabad&rsquo;s most sought-after sectors.
        </motion.p>

        <motion.div
          className="hero__buttons"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 1.0 } } }}
        >
          <motion.a
            href="#properties"
            className="btn btn--gold"
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            onClick={(e) => { e.preventDefault(); scrollToId("properties"); }}
          >
            Explore Properties
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn--outline"
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}
          >
            Book a Consultation
          </motion.a>
        </motion.div>

        <motion.div className="hero__trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.3 }}>
          <span>Residential</span>
          <span>Commercial</span>
          <span>Investment Advisory</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-search container"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
      >
        <form className="hero-search__panel" onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
          <div className="hero-search__field">
            <label htmlFor="lookingFor">Looking for</label>
            <select id="lookingFor" value={filters.purpose} onChange={(e) => setFilters((f) => ({ ...f, purpose: e.target.value }))}>
              {LOOKING_FOR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="hero-search__field">
            <label htmlFor="propertyType">Property type</label>
            <select id="propertyType" value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}>
              {PROPERTY_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="hero-search__field">
            <label htmlFor="location">Location</label>
            <select id="location" value={filters.location} onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}>
              {LOCATION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn--gold hero-search__submit">
            <Search size={17} aria-hidden="true" />
            Search Property
          </button>
        </form>
      </motion.div>

      <motion.div className="hero__scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }}>
        <span>SCROLL</span>
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}

/* ============================================================
   MARQUEE TICKER
   ============================================================ */

function Marquee() {
  const items = ["F-6", "F-7", "F-8", "E-7", "Blue Area", "Buy", "Rent", "Invest"];
  const loop = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <MapPin size={16} aria-hidden="true" />
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
          {STATS.map((stat, i) => (
            <Reveal as="div" className="stats__card" key={stat.label} delay={i * 0.08}>
              <span className="stats__value">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <p className="stats__label">{stat.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="stats__note">Figures shown are illustrative demo content for this preview site.</p>
      </div>
    </section>
  );
}

/* ============================================================
   TRUST SECTION
   ============================================================ */

function TrustSection() {
  const items = [
    { icon: MapPin, title: "Prime Locations", detail: "F-6, F-7, F-8, E-7" },
    { icon: HomeIcon, title: "Property Expertise", detail: "Residential & commercial" },
    { icon: Handshake, title: "Complete Solutions", detail: "Sales, purchase, rental" },
    { icon: TrendingUp, title: "Investment Focus", detail: "Strategic guidance" },
  ];

  return (
    <section className="section section--ivory">
      <div className="container">
        <Reveal as="h2" className="heading">Real estate, with a clearer perspective.</Reveal>
        <div className="trust__grid">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal as="div" className="trust__card" key={item.title} delay={i * 0.08}>
                <Icon className="trust__icon" size={26} aria-hidden="true" />
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
   PROPERTY CARD + GRID
   ============================================================ */

function PropertyCard({ property, onView }) {
  const propertyType = property.type === "commercial" ? "Commercial" : property.type === "apartment" ? "Apartment" : "Residential";

  return (
    <motion.article
      className="property-card"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <div className="property-card__media">
        <img src={property.image} alt={`${property.title} in ${property.location}`} loading="lazy" />
        <span className="property-card__badge">{propertyType}</span>
      </div>

      <div className="property-card__body">
        <div className="property-card__top">
          <h3>{property.title}</h3>
          <span className="property-card__price">{property.price}</span>
        </div>

        <p className="property-card__location">
          <MapPin size={15} aria-hidden="true" />
          {property.location}
        </p>

        <div className="property-card__meta">
          {property.beds !== null && <span><Bed size={16} aria-hidden="true" />{property.beds} Beds</span>}
          {property.baths !== null && <span><Bath size={16} aria-hidden="true" />{property.baths} Baths</span>}
          <span><Maximize size={16} aria-hidden="true" />{property.size}</span>
        </div>

        <div className="property-card__actions">
          <button type="button" className="property-card__view" onClick={() => onView(property)}>
            View Property
            <ArrowUpRight size={16} aria-hidden="true" className="property-card__arrow" />
          </button>

          <a
            href={waLink(`Hello Prime Property & Developers, I am interested in ${property.title} (${property.location}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="property-card__whatsapp"
            aria-label={`Ask about ${property.title} on WhatsApp`}
          >
            <MessageCircle size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedProperties({ filters, onView, resultsRef }) {
  const filtered = useMemo(() => {
    return PROPERTIES.filter((property) => {
      if (filters.purpose && property.purpose !== filters.purpose) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (filters.location && property.locationTag !== filters.location) return false;
      return true;
    });
  }, [filters]);

  const isFiltered = filters.purpose || filters.type || filters.location;

  return (
    <section id="properties" className="section" ref={resultsRef}>
      <div className="container">
        <div className="section__intro">
          <div>
            <Reveal as="p" className="kicker">Featured properties</Reveal>
            <Reveal as="h2" className="heading" delay={0.05}>
              Selected opportunities across Islamabad&rsquo;s prime sectors.
            </Reveal>
            <p className="section__note">
              Featured listings can be replaced with the client's live inventory, pricing and availability.
            </p>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="property-grid">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} onView={onView} />
            ))}
          </div>
        ) : (
          <div className="property-grid__empty">
            <p>No demo properties match that search. Try a different combination.</p>
          </div>
        )}

        {isFiltered && (
          <p className="property-grid__count">Showing {filtered.length} of {PROPERTIES.length} demo properties</p>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   PROPERTY MODAL
   ============================================================ */

function PropertyModal({ property, onClose }) {
  useEffect(() => {
    function onKey(event) { if (event.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!property) return null;

  const propertyType = property.type === "commercial" ? "Commercial" : property.type === "apartment" ? "Apartment" : "Residential";

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={property.title}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>
          <X size={22} aria-hidden="true" />
        </button>

        <div className="modal__media">
          <img src={property.image} alt={`${property.title} in ${property.location}`} />
        </div>

        <div className="modal__body">
          <span className="modal__badge">{propertyType}</span>
          <h3>{property.title}</h3>
          <p className="modal__location"><MapPin size={16} aria-hidden="true" />{property.location}</p>
          <p className="modal__price">{property.price}</p>
          <p className="modal__description">{property.description}</p>

          <div className="modal__meta">
            {property.beds !== null && <span><Bed size={17} aria-hidden="true" />{property.beds} Beds</span>}
            {property.baths !== null && <span><Bath size={17} aria-hidden="true" />{property.baths} Baths</span>}
            <span><Maximize size={17} aria-hidden="true" />{property.size}</span>
          </div>

          <div className="modal__features">
            <h4>Features</h4>
            <ul>
              {property.features.map((feature) => (
                <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>
              ))}
            </ul>
          </div>

          <div className="modal__actions">
            <a
              href="#contact"
              className="btn btn--gold"
              onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => scrollToId("contact"), 250); }}
            >
              Contact Us
            </a>
            <a
              href={waLink(`Hello Prime Property & Developers, I am interested in ${property.title} (${property.location}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline-dark"
            >
              <MessageCircle size={17} aria-hidden="true" />
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
    <section id="services" className="section section--navy">
      <div className="container">
        <Reveal as="p" className="kicker">What we do</Reveal>
        <Reveal as="h2" className="heading" delay={0.05}>Real estate solutions built around you.</Reveal>

        <div className="services__grid">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal as="div" className="services__card" key={service.title} delay={index * 0.08}>
                <Icon className="services__icon" size={30} aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY PRIME PROPERTY
   ============================================================ */

function WhyPrime() {
  return (
    <section className="section">
      <div className="container why__inner">
        <motion.div
          className="why__image"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80"
            alt="Premium residential interior in Islamabad"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="why__content"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="kicker">Why Prime Property</p>
          <h2 className="heading">More than property. A better investment decision.</h2>

          <ul className="why__list">
            {WHY_POINTS.map((point, index) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <span className="why__check"><Check size={14} aria-hidden="true" /></span>
                {point}
              </motion.li>
            ))}
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
    <section id="areas" className="section section--ivory">
      <div className="container">
        <Reveal as="p" className="kicker">Where we work</Reveal>
        <Reveal as="h2" className="heading" delay={0.05}>Islamabad&rsquo;s prime addresses.</Reveal>

        <div className="areas__grid">
          {AREAS.map((area, index) => (
            <motion.div
              className="areas__card"
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <img src={area.image} alt={`${area.name}, Islamabad`} loading="lazy" />
              <div className="areas__overlay" aria-hidden="true" />
              <ArrowUpRight className="areas__arrow" size={20} aria-hidden="true" />
              <div className="areas__text">
                <h3>{area.name}</h3>
                <p>{area.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const goTo = useCallback((next) => {
    setDirection(next > index || (index === TESTIMONIALS.length - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  }, [index]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(timerRef.current);
  }, []);

  const current = TESTIMONIALS[index];
  const initials = current.name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <section id="testimonials" className="section section--navy testimonials">
      <div className="container">
        <p className="kicker">In their words</p>
        <h2 className="heading" style={{ marginBottom: 46 }}>What clients say about working with us.</h2>

        <Quote className="testimonials__quote-mark" size={44} aria-hidden="true" />

        <div className="testimonials__stage">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: 40 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * direction }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="testimonials__quote">&ldquo;{current.quote}&rdquo;</p>
              <div className="testimonials__meta">
                <span className="testimonials__avatar">{initials}</span>
                <div>
                  <p className="testimonials__name">{current.name}</p>
                  <p className="testimonials__context">{current.context}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="testimonials__controls">
          <button type="button" className="testimonials__arrow" aria-label="Previous testimonial" onClick={() => goTo((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>
            <ArrowLeft size={17} aria-hidden="true" />
          </button>
          <div className="testimonials__dots">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                className={`testimonials__dot ${i === index ? "testimonials__dot--active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button type="button" className="testimonials__arrow" aria-label="Next testimonial" onClick={() => goTo((index + 1) % TESTIMONIALS.length)}>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>

        <p className="testimonials__note">Client testimonials can be replaced with verified reviews and case studies before launch.</p>
      </div>
    </section>
  );
}

/* ============================================================
   CINEMATIC
   ============================================================ */

function Cinematic() {
  return (
    <section
      className="cinematic"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2000&q=80')" }}
    >
      <div className="cinematic__overlay" aria-hidden="true" />
      <div className="container cinematic__content">
        <Reveal as="h2">Invest where Islamabad grows.</Reveal>
        <Reveal as="p" delay={0.1}>
          Discover residential, commercial and investment opportunities in one of Pakistan&rsquo;s most prestigious cities.
        </Reveal>
        <Reveal as="a" href="#properties" className="btn btn--gold" delay={0.2} onClick={(e) => { e.preventDefault(); scrollToId("properties"); }}>
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
        <Reveal as="p" className="kicker">How it works</Reveal>
        <Reveal as="h2" className="heading" delay={0.05}>A simpler way to find the right property.</Reveal>

        <div className="process__row">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              className="process__step"
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <span className="process__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
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
        <Reveal as="div" className="investment-cta__inner">
          <h2>Ready to make your next property move?</h2>
          <p>Speak with our team for tailored property advice, viewing support and investment guidance.</p>
          <div className="investment-cta__buttons">
            <a href="#contact" className="btn btn--gold" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>Talk to an Expert</a>
            <a href={waLink(WHATSAPP_DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn--outline">WhatsApp Us</a>
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
    <section id="about" className="section">
      <div className="container about__inner">
        <motion.div
          className="about__image"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Prime Property & Developers office team"
            loading="lazy"
          />
        </motion.div>

        <div className="about__copy">
          <Reveal as="p" className="kicker">About us</Reveal>
          <Reveal as="h2" className="heading" delay={0.05} style={{ marginBottom: 24 }}>
            Your trusted real estate partner in Islamabad.
          </Reveal>
          <Reveal as="p" delay={0.1}>
            Prime Property &amp; Developers Pvt. Ltd. is a real estate company based
            in Islamabad, working with clients across the city&rsquo;s most
            established sectors, including F-6, F-7, F-8, E-7 and Blue Area.
          </Reveal>
          <Reveal as="p" delay={0.15}>
            We provide property marketing and consultancy, alongside support for
            sales, purchases and rentals across both residential and commercial
            properties &mdash; guided by what each client actually needs, from the
            first conversation through to completion.
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
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const message = [
      `New website inquiry from ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Interest: ${form.interest}`,
      `Message: ${form.message}`,
    ].join("\n");
    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setForm({ name: "", phone: "", email: "", interest: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <section id="contact" className="section section--ivory">
      <div className="container">
        <Reveal as="p" className="kicker">Get in touch</Reveal>
        <Reveal as="h2" className="heading" delay={0.05}>Let&rsquo;s find your prime property.</Reveal>

        <div className="contact__grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact__item">
              <MapPin size={22} aria-hidden="true" />
              <p>{COMPANY.address.map((line) => <span key={line}>{line}<br /></span>)}</p>
            </div>
            <div className="contact__item">
              <Phone size={22} aria-hidden="true" />
              <a href={`tel:+${COMPANY.phoneIntl}`}>{COMPANY.phone}</a>
            </div>
            <div className="contact__item">
              <Mail size={22} aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={handleSubmit}
          >
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" required value={form.name} onChange={handleChange("name")} />
              </div>
              <div className="contact__field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" required value={form.phone} onChange={handleChange("phone")} />
              </div>
            </div>

            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required value={form.email} onChange={handleChange("email")} />
              </div>
              <div className="contact__field">
                <label htmlFor="interest">Interest</label>
                <select id="interest" required value={form.interest} onChange={handleChange("interest")}>
                  <option value="" disabled>Select an option</option>
                  {INTEREST_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} required value={form.message} onChange={handleChange("message")} />
            </div>

            <button type="submit" className="btn btn--gold contact__submit">Send Inquiry</button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.35 }}
            role="status"
          >
            <Check size={18} aria-hidden="true" />
            Thank you. Your inquiry has been received. Prime Property &amp; Developers will be in touch.
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
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <span className="navbar__brand-mark navbar__brand-mark--footer">PP</span>
          <h3>{COMPANY.legalName}</h3>
          <p>Find your prime address.</p>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollToId(link.id); }}>{link.label}</a>
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
            <li><a href={`tel:+${COMPANY.phoneIntl}`}>{COMPANY.phone}</a></li>
            <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
            <li>Islamabad, Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; 2026 {COMPANY.legalName} All rights reserved.</p>
        <div className="footer__social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} aria-hidden="true" /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} aria-hidden="true" /></a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X"><Twitter size={18} aria-hidden="true" /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><Music2 size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   FLOATING ELEMENTS
   ============================================================ */

function WhatsAppFloat() {
  return (
    <a href={waLink(WHATSAPP_DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat with us on WhatsApp">
      <span className="whatsapp-float__pulse" aria-hidden="true" />
      <MessageCircle size={26} aria-hidden="true" />
      <span className="whatsapp-float__tooltip">Chat with us</span>
    </a>
  );
}

function BackToTop() {
  const show = useScrollFlag(600);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className="back-to-top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, setFilters] = useState({ purpose: "", type: "", location: "" });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleSearch() {
    if (resultsRef.current) resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="pp-root">
      <GlobalStyles />
      <div className="grain" aria-hidden="true" />
      <ScrollProgressBar />

      <Navbar menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} onCloseMenu={() => setMenuOpen(false)} />

      <main>
        <Hero filters={filters} setFilters={setFilters} onSearch={handleSearch} />
        <Marquee />
        <Stats />
        <TrustSection />
        <FeaturedProperties filters={filters} onView={setSelectedProperty} resultsRef={resultsRef} />
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
        {selectedProperty && <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
      </AnimatePresence>
    </div>
  );
}