import React, { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Bath,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Facebook,
  Home,
  Instagram,
  KeyRound,
  Landmark,
  Mail,
  MapPin,
  Maximize,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
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
  address:
    "6 Mezzanine Floor, Mujahid Plaza, Jinnah Avenue, Block H, G-7/2, Blue Area, Islamabad, Pakistan",
  instagram: "https://www.instagram.com/prime_property.developers/",
  facebook: "https://www.facebook.com/Primepropertyanddevelopers/",
  twitter: "https://x.com/PrimeProperty7",
  tiktok: "https://www.tiktok.com/@prime_property_dev.com",
};

const WA = (message = "Hello Prime Property & Developers, I am interested in your property services.") =>
  `https://wa.me/${COMPANY.phoneIntl}?text=${encodeURIComponent(message)}`;

/* ============================================================
   DATA
============================================================ */

const properties = [
  {
    id: 1,
    title: "Contemporary F-7 Residence",
    location: "F-7, Islamabad",
    type: "House",
    purpose: "Buy",
    price: "PKR 8.95 Cr",
    beds: 5,
    baths: 6,
    area: "500 Sq. Yd.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    tag: "Featured",
    description:
      "A sophisticated family residence combining spacious interiors, premium finishes and an exceptional Islamabad location.",
  },
  {
    id: 2,
    title: "Modern F-8 Family Home",
    location: "F-8, Islamabad",
    type: "House",
    purpose: "Buy",
    price: "PKR 6.75 Cr",
    beds: 5,
    baths: 5,
    area: "400 Sq. Yd.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    tag: "Prime Pick",
    description:
      "A refined contemporary home with generous living spaces and excellent access to the city's key destinations.",
  },
  {
    id: 3,
    title: "Executive E-7 Residence",
    location: "E-7, Islamabad",
    type: "House",
    purpose: "Buy",
    price: "PKR 12.50 Cr",
    beds: 6,
    baths: 7,
    area: "1000 Sq. Yd.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
    tag: "Luxury",
    description:
      "An expansive executive property positioned in one of Islamabad's most sought-after residential sectors.",
  },
  {
    id: 4,
    title: "Blue Area Business Tower",
    location: "Blue Area, Islamabad",
    type: "Commercial",
    purpose: "Invest",
    price: "PKR 18.00 Cr",
    beds: 0,
    baths: 4,
    area: "12,000 Sq. Ft.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    tag: "Investment",
    description:
      "A commercial opportunity in Islamabad's central business district, suitable for corporate and investment purposes.",
  },
  {
    id: 5,
    title: "Luxury F-6 Villa",
    location: "F-6, Islamabad",
    type: "House",
    purpose: "Buy",
    price: "PKR 10.25 Cr",
    beds: 6,
    baths: 7,
    area: "800 Sq. Yd.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=85",
    tag: "Luxury",
    description:
      "A statement villa with elegant architecture, privacy and premium living spaces in F-6.",
  },
  {
    id: 6,
    title: "Blue Area Executive Office",
    location: "Blue Area, Islamabad",
    type: "Commercial",
    purpose: "Rent",
    price: "PKR 4.50 Lac/mo",
    beds: 0,
    baths: 2,
    area: "3,500 Sq. Ft.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    tag: "Commercial",
    description:
      "A professional office environment for businesses looking for a prestigious Blue Area address.",
  },
  {
    id: 7,
    title: "Elegant F-7 Apartment",
    location: "F-7, Islamabad",
    type: "Apartment",
    purpose: "Rent",
    price: "PKR 3.25 Lac/mo",
    beds: 3,
    baths: 3,
    area: "2,800 Sq. Ft.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    tag: "Rental",
    description:
      "A beautifully appointed apartment offering comfort, convenience and an upscale lifestyle.",
  },
];

const areas = [
  {
    name: "F-6",
    subtitle: "Established luxury",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "F-7",
    subtitle: "Premium residential",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "F-8",
    subtitle: "Family living",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "E-7",
    subtitle: "Ultra prime",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Blue Area",
    subtitle: "Business district",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  },
];

const services = [
  {
    icon: Home,
    number: "01",
    title: "Property Sales",
    text: "Strategic buying and selling support for residential and commercial properties.",
  },
  {
    icon: KeyRound,
    number: "02",
    title: "Property Rentals",
    text: "Find quality rental opportunities matched to your lifestyle and business needs.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Investment Advisory",
    text: "Identify opportunities with a practical approach to location, value and growth.",
  },
  {
    icon: Landmark,
    number: "04",
    title: "Property Consultancy",
    text: "Professional guidance throughout your property journey, from search to closing.",
  },
];

const testimonials = [
  {
    name: "Satisfied Client",
    role: "Property Buyer",
    quote:
      "The team made the entire property search feel simple and professional. Their understanding of Islamabad's market was impressive.",
  },
  {
    name: "Satisfied Investor",
    role: "Property Investor",
    quote:
      "Prime Property & Developers provided clear guidance and helped us evaluate opportunities with much more confidence.",
  },
  {
    name: "Satisfied Client",
    role: "Home Owner",
    quote:
      "Professional communication, good market knowledge and a very smooth overall experience.",
  },
  {
    name: "Satisfied Client",
    role: "Property Seller",
    quote:
      "Their team understood what we needed and handled the process with care and professionalism.",
  },
];

const stats = [
  { value: 12, suffix: "+", label: "Years of Experience" },
  { value: 480, suffix: "+", label: "Properties Handled" },
  { value: 5, suffix: "", label: "Prime Areas" },
  { value: 96, suffix: "%", label: "Client Satisfaction" },
];

/* ============================================================
   GLOBAL CSS
============================================================ */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap');

    :root {
      --navy: #081225;
      --navy-2: #0c1830;
      --navy-3: #111f3b;
      --gold: #c9a45c;
      --gold-light: #e6c985;
      --cream: #f7f3eb;
      --white: #ffffff;
      --muted: #718096;
      --line: rgba(201,164,92,.18);
      --dark-line: rgba(255,255,255,.1);
      --shadow: 0 25px 80px rgba(5,14,30,.13);
      --radius: 22px;
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      scroll-padding-top: 85px;
    }

    body {
      margin: 0;
      font-family: "Manrope", sans-serif;
      background: var(--white);
      color: var(--navy);
      overflow-x: hidden;
    }

    body, button, input, select, textarea {
      font-family: "Manrope", sans-serif;
    }

    button, a {
      -webkit-tap-highlight-color: transparent;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button {
      border: 0;
      cursor: pointer;
    }

    img {
      display: block;
      max-width: 100%;
    }

    .app {
      min-height: 100vh;
      overflow: hidden;
    }

    .container {
      width: min(1180px, calc(100% - 48px));
      margin: 0 auto;
    }

    .section {
      position: relative;
      padding: 110px 0;
    }

    .section--cream {
      background: var(--cream);
    }

    .section--navy {
      background: var(--navy);
      color: white;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      color: var(--gold);
      text-transform: uppercase;
      letter-spacing: .2em;
      font-size: 11px;
      font-weight: 800;
      margin-bottom: 18px;
    }

    .eyebrow::before {
      content: "";
      width: 28px;
      height: 1px;
      background: currentColor;
    }

    .section-heading {
      max-width: 720px;
      margin-bottom: 55px;
    }

    .section-heading.center {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }

    .section-heading.center .eyebrow {
      justify-content: center;
    }

    .section-title {
      margin: 0;
      font-family: "Playfair Display", serif;
      font-size: clamp(40px, 5vw, 68px);
      line-height: .98;
      letter-spacing: -.045em;
      font-weight: 600;
    }

    .section-description {
      margin: 22px 0 0;
      color: var(--muted);
      line-height: 1.9;
      font-size: 15px;
      max-width: 650px;
    }

    .section--navy .section-description {
      color: rgba(255,255,255,.62);
    }

    /* progress */
    .progress {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--gold);
      transform-origin: left;
    }

    /* navbar */
    .navbar {
      position: fixed;
      z-index: 90;
      top: 0;
      left: 0;
      width: 100%;
      padding: 20px 0;
      transition: .35s ease;
    }

    .navbar.scrolled {
      background: rgba(8,18,37,.94);
      backdrop-filter: blur(18px);
      padding: 12px 0;
      box-shadow: 0 10px 35px rgba(0,0,0,.16);
    }

    .nav-inner {
      width: min(1250px, calc(100% - 38px));
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      color: white;
      min-width: 220px;
    }

    .brand-mark {
      width: 43px;
      height: 43px;
      border: 1px solid var(--gold);
      display: grid;
      place-items: center;
      position: relative;
      overflow: hidden;
    }

    .brand-mark::before {
      content: "";
      position: absolute;
      inset: 6px;
      border: 1px solid rgba(201,164,92,.5);
    }

    .brand-mark span {
      position: relative;
      font-family: "Playfair Display", serif;
      color: var(--gold);
      font-size: 17px;
      font-weight: 700;
    }

    .brand-text strong {
      display: block;
      font-family: "Playfair Display", serif;
      font-size: 16px;
      letter-spacing: .01em;
    }

    .brand-text small {
      display: block;
      color: rgba(255,255,255,.55);
      font-size: 8px;
      letter-spacing: .15em;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .nav-link {
      color: rgba(255,255,255,.78);
      font-size: 12px;
      font-weight: 700;
      padding: 11px 13px;
      border-radius: 999px;
      transition: .25s ease;
    }

    .nav-link:hover {
      color: white;
      background: rgba(255,255,255,.07);
    }

    .nav-contact {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--navy);
      background: var(--gold);
      padding: 12px 17px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      white-space: nowrap;
      transition: .3s ease;
    }

    .nav-contact:hover {
      background: var(--gold-light);
      transform: translateY(-2px);
    }

    .menu-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255,255,255,.08);
      color: white;
      display: none;
      align-items: center;
      justify-content: center;
    }

    /* mobile nav */
    .mobile-menu {
      position: fixed;
      z-index: 89;
      inset: 0;
      background: var(--navy);
      padding: 105px 24px 30px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    .mobile-menu-links {
      display: grid;
      gap: 5px;
    }

    .mobile-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      font-family: "Playfair Display", serif;
      font-size: clamp(30px, 8vw, 46px);
      padding: 14px 0;
      border-bottom: 1px solid var(--dark-line);
    }

    .mobile-link svg {
      color: var(--gold);
      width: 22px;
    }

    .mobile-contact {
      margin-top: auto;
      padding-top: 30px;
      display: grid;
      gap: 10px;
    }

    .mobile-contact a {
      display: flex;
      align-items: center;
      gap: 12px;
      color: rgba(255,255,255,.7);
      padding: 13px 0;
    }

    /* hero */
    .hero {
      min-height: 850px;
      height: 100svh;
      max-height: 980px;
      position: relative;
      background: var(--navy);
      color: white;
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    .hero-image {
      position: absolute;
      inset: -5%;
      background:
        linear-gradient(90deg, rgba(4,10,22,.92) 0%, rgba(4,10,22,.67) 42%, rgba(4,10,22,.3) 100%),
        linear-gradient(0deg, rgba(4,10,22,.58), transparent 40%),
        url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90")
        center/cover no-repeat;
      transform-origin: center;
    }

    .hero-grid {
      position: absolute;
      inset: 0;
      opacity: .07;
      background-image:
        linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px);
      background-size: 80px 80px;
      mask-image: linear-gradient(to bottom, black, transparent 90%);
    }

    .hero-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(1px);
      border: 1px solid rgba(201,164,92,.25);
    }

    .hero-orb.one {
      width: 320px;
      height: 320px;
      right: -120px;
      top: 17%;
    }

    .hero-orb.two {
      width: 180px;
      height: 180px;
      right: 19%;
      bottom: 4%;
      opacity: .5;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      width: min(1180px, calc(100% - 48px));
      margin: auto;
      padding-top: 75px;
    }

    .hero-copy {
      max-width: 760px;
    }

    .hero-kicker {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: var(--gold-light);
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: .25em;
      font-weight: 800;
      margin-bottom: 22px;
    }

    .hero-kicker span {
      width: 42px;
      height: 1px;
      background: var(--gold);
    }

    .hero-title {
      font-family: "Playfair Display", serif;
      font-weight: 500;
      font-size: clamp(54px, 8vw, 104px);
      line-height: .88;
      letter-spacing: -.055em;
      margin: 0;
    }

    .hero-title em {
      color: var(--gold-light);
      font-style: italic;
    }

    .hero-description {
      max-width: 590px;
      color: rgba(255,255,255,.68);
      line-height: 1.85;
      margin: 28px 0;
      font-size: 15px;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 48px;
      padding: 13px 19px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .02em;
      transition: .3s ease;
    }

    .btn svg {
      transition: transform .3s ease;
    }

    .btn:hover svg {
      transform: translateX(3px);
    }

    .btn-gold {
      background: var(--gold);
      color: var(--navy);
    }

    .btn-gold:hover {
      background: var(--gold-light);
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(201,164,92,.22);
    }

    .btn-outline {
      border: 1px solid rgba(255,255,255,.28);
      color: white;
      background: rgba(255,255,255,.04);
    }

    .btn-outline:hover {
      border-color: var(--gold);
      background: rgba(201,164,92,.08);
      transform: translateY(-3px);
    }

    .hero-trust {
      margin-top: 48px;
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      color: rgba(255,255,255,.5);
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: .15em;
      font-weight: 700;
    }

    .hero-trust span {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .hero-trust svg {
      color: var(--gold);
    }

    .scroll-indicator {
      position: absolute;
      z-index: 2;
      right: 38px;
      bottom: 35px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      color: rgba(255,255,255,.45);
      font-size: 8px;
      letter-spacing: .2em;
      text-transform: uppercase;
    }

    .scroll-line {
      width: 1px;
      height: 55px;
      background: linear-gradient(var(--gold), transparent);
    }

    /* search */
    .search-wrap {
      position: relative;
      z-index: 5;
      margin-top: -70px;
    }

    .search-panel {
      background: rgba(255,255,255,.96);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,.8);
      border-radius: 24px;
      padding: 18px;
      box-shadow: 0 30px 80px rgba(8,18,37,.18);
    }

    .search-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 5px 15px;
    }

    .search-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .15em;
      color: var(--navy);
    }

    .search-label {
      color: var(--gold);
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .12em;
    }

    .search-fields {
      display: grid;
      grid-template-columns: 1fr 1fr 1.25fr auto;
      gap: 10px;
    }

    .field {
      min-width: 0;
      position: relative;
    }

    .field select {
      width: 100%;
      min-height: 56px;
      appearance: none;
      border: 1px solid #e6e9ee;
      background: #fafafa;
      color: var(--navy);
      border-radius: 15px;
      padding: 0 42px 0 43px;
      outline: none;
      font-size: 12px;
      font-weight: 700;
      transition: .25s ease;
    }

    .field select:focus {
      border-color: var(--gold);
      background: white;
      box-shadow: 0 0 0 4px rgba(201,164,92,.09);
    }

    .field-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--gold);
      width: 17px;
      pointer-events: none;
    }

    .field-chevron {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #98a1af;
      width: 14px;
      pointer-events: none;
    }

    .search-btn {
      min-height: 56px;
      min-width: 125px;
      border-radius: 15px;
      background: var(--navy);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 800;
      transition: .3s ease;
    }

    .search-btn:hover {
      background: var(--gold);
      color: var(--navy);
      transform: translateY(-2px);
    }

    /* marquee */
    .marquee {
      overflow: hidden;
      border-bottom: 1px solid var(--line);
      border-top: 1px solid var(--line);
      background: white;
    }

    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee 28s linear infinite;
    }

    .marquee-item {
      display: flex;
      align-items: center;
      gap: 25px;
      padding: 17px 30px;
      font-family: "Playfair Display", serif;
      font-size: 18px;
      color: var(--navy);
      white-space: nowrap;
    }

    .marquee-item span {
      color: var(--gold);
      font-size: 12px;
    }

    @keyframes marquee {
      to { transform: translateX(-50%); }
    }

    /* stats */
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
      border-top: 1px solid var(--line);
    }

    .stat {
      padding: 40px 25px;
      border-right: 1px solid var(--line);
      position: relative;
    }

    .stat:last-child {
      border-right: 0;
    }

    .stat-icon {
      color: var(--gold);
      margin-bottom: 20px;
    }

    .stat-number {
      font-family: "Playfair Display", serif;
      font-size: clamp(38px, 5vw, 56px);
      line-height: 1;
      color: var(--navy);
    }

    .stat-label {
      color: var(--muted);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-weight: 800;
      margin-top: 9px;
    }

    /* properties */
    .property-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 22px;
    }

    .property-card {
      min-width: 0;
      background: white;
      border: 1px solid #e9e9e6;
      border-radius: var(--radius);
      overflow: hidden;
      transition: .45s cubic-bezier(.2,.7,.2,1);
      cursor: pointer;
      box-shadow: 0 5px 25px rgba(8,18,37,.03);
    }

    .property-card:hover {
      transform: translateY(-9px);
      border-color: rgba(201,164,92,.5);
      box-shadow: var(--shadow);
    }

    .property-image {
      height: 260px;
      position: relative;
      overflow: hidden;
    }

    .property-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .8s cubic-bezier(.2,.7,.2,1);
    }

    .property-card:hover .property-image img {
      transform: scale(1.08);
    }

    .property-image::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(8,18,37,.45), transparent 60%);
    }

    .property-tag {
      position: absolute;
      z-index: 2;
      top: 14px;
      left: 14px;
      padding: 7px 10px;
      border-radius: 999px;
      background: rgba(8,18,37,.82);
      color: var(--gold-light);
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-weight: 800;
      backdrop-filter: blur(10px);
    }

    .property-arrow {
      position: absolute;
      z-index: 2;
      right: 14px;
      bottom: 14px;
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: white;
      color: var(--navy);
      transition: .3s ease;
    }

    .property-card:hover .property-arrow {
      background: var(--gold);
      transform: rotate(45deg);
    }

    .property-body {
      padding: 20px;
    }

    .property-location {
      display: flex;
      align-items: center;
      gap: 5px;
      color: var(--gold);
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .1em;
      margin-bottom: 9px;
    }

    .property-title {
      margin: 0;
      font-family: "Playfair Display", serif;
      font-size: 23px;
      line-height: 1.1;
      font-weight: 600;
    }

    .property-price {
      margin-top: 15px;
      font-size: 17px;
      color: var(--navy);
      font-weight: 800;
    }

    .property-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 13px;
      margin-top: 17px;
      padding-top: 14px;
      border-top: 1px solid #ecece9;
      color: #7b8491;
      font-size: 9px;
      font-weight: 700;
    }

    .property-meta span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    /* split section */
    .split {
      display: grid;
      grid-template-columns: .95fr 1.05fr;
      gap: 75px;
      align-items: center;
    }

    .image-stack {
      position: relative;
      min-height: 570px;
    }

    .image-main {
      width: 78%;
      height: 500px;
      object-fit: cover;
      border-radius: 22px;
    }

    .image-small {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 43%;
      height: 245px;
      object-fit: cover;
      border: 12px solid var(--white);
      border-radius: 22px;
      box-shadow: var(--shadow);
    }

    .floating-badge {
      position: absolute;
      top: 35px;
      right: 5%;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: var(--gold);
      color: var(--navy);
      display: grid;
      place-items: center;
      text-align: center;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: .1em;
      font-weight: 900;
      box-shadow: 0 20px 45px rgba(201,164,92,.25);
    }

    .floating-badge svg {
      display: block;
      margin: 0 auto 5px;
    }

    .check-list {
      display: grid;
      gap: 15px;
      margin: 30px 0;
    }

    .check-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      color: #4e5968;
      line-height: 1.7;
      font-size: 13px;
    }

    .check-item-icon {
      flex: 0 0 25px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: rgba(201,164,92,.12);
      color: var(--gold);
      display: grid;
      place-items: center;
    }

    /* services */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0,1fr));
      gap: 1px;
      background: var(--dark-line);
      border: 1px solid var(--dark-line);
    }

    .service {
      min-width: 0;
      padding: 35px 28px;
      background: var(--navy);
      min-height: 300px;
      transition: .35s ease;
      position: relative;
      overflow: hidden;
    }

    .service:hover {
      background: var(--navy-3);
    }

    .service-number {
      color: rgba(255,255,255,.2);
      font-family: "Playfair Display", serif;
      font-size: 42px;
    }

    .service-icon {
      color: var(--gold);
      margin: 28px 0 22px;
    }

    .service h3 {
      margin: 0 0 12px;
      font-family: "Playfair Display", serif;
      font-size: 25px;
      font-weight: 500;
    }

    .service p {
      color: rgba(255,255,255,.55);
      font-size: 12px;
      line-height: 1.8;
      margin: 0;
    }

    .service::after {
      content: "";
      position: absolute;
      width: 100px;
      height: 100px;
      right: -50px;
      bottom: -50px;
      border-radius: 50%;
      border: 1px solid rgba(201,164,92,.16);
      transition: .5s ease;
    }

    .service:hover::after {
      transform: scale(2);
    }

    /* areas */
    .areas-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0,1fr));
      gap: 12px;
    }

    .area {
      height: 420px;
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      cursor: pointer;
    }

    .area img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: .8s cubic-bezier(.2,.7,.2,1);
    }

    .area:hover img {
      transform: scale(1.1);
    }

    .area::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(4,10,22,.88), transparent 60%);
    }

    .area-content {
      position: absolute;
      z-index: 2;
      left: 22px;
      right: 22px;
      bottom: 22px;
      color: white;
    }

    .area-content h3 {
      font-family: "Playfair Display", serif;
      font-size: 30px;
      margin: 0 0 5px;
    }

    .area-content p {
      margin: 0;
      color: rgba(255,255,255,.62);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .12em;
    }

    /* testimonials */
    .testimonial-wrap {
      max-width: 880px;
      margin: auto;
      text-align: center;
    }

    .quote-icon {
      color: var(--gold);
      margin: 0 auto 25px;
    }

    .testimonial-quote {
      font-family: "Playfair Display", serif;
      font-size: clamp(26px, 4vw, 44px);
      line-height: 1.25;
      font-weight: 400;
      margin: 0;
    }

    .stars {
      display: flex;
      justify-content: center;
      gap: 4px;
      margin: 28px 0 16px;
      color: var(--gold);
    }

    .testimonial-name {
      font-size: 12px;
      font-weight: 800;
      margin: 0;
    }

    .testimonial-role {
      color: rgba(255,255,255,.45);
      font-size: 10px;
      margin-top: 4px;
    }

    .slider-controls {
      display: flex;
      justify-content: center;
      gap: 9px;
      margin-top: 35px;
    }

    .slider-btn {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: white;
      border: 1px solid var(--dark-line);
      background: transparent;
      transition: .25s ease;
    }

    .slider-btn:hover {
      background: var(--gold);
      color: var(--navy);
      border-color: var(--gold);
    }

    /* process */
    .process-grid {
      display: grid;
      grid-template-columns: repeat(4,1fr);
      gap: 25px;
    }

    .process-card {
      position: relative;
      padding: 30px 0;
      border-top: 1px solid var(--line);
    }

    .process-card:not(:last-child)::after {
      content: "";
      position: absolute;
      width: 35px;
      height: 1px;
      right: -30px;
      top: -1px;
      background: var(--gold);
    }

    .process-number {
      font-family: "Playfair Display", serif;
      color: var(--gold);
      font-size: 40px;
    }

    .process-card h3 {
      font-family: "Playfair Display", serif;
      font-size: 23px;
      margin: 20px 0 10px;
    }

    .process-card p {
      color: var(--muted);
      font-size: 11px;
      line-height: 1.8;
      margin: 0;
    }

    /* CTA */
    .cta {
      position: relative;
      overflow: hidden;
      padding: 80px;
      border-radius: 30px;
      background:
        linear-gradient(90deg, rgba(8,18,37,.96), rgba(8,18,37,.72)),
        url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85")
        center/cover;
      color: white;
    }

    .cta::before {
      content: "";
      position: absolute;
      width: 400px;
      height: 400px;
      right: -180px;
      top: -180px;
      border: 1px solid rgba(201,164,92,.2);
      border-radius: 50%;
    }

    .cta-content {
      position: relative;
      max-width: 700px;
    }

    .cta h2 {
      font-family: "Playfair Display", serif;
      font-size: clamp(42px, 6vw, 68px);
      line-height: .98;
      font-weight: 500;
      margin: 0;
    }

    .cta p {
      color: rgba(255,255,255,.6);
      max-width: 560px;
      line-height: 1.8;
      font-size: 13px;
      margin: 20px 0 28px;
    }

    /* contact */
    .contact-grid {
      display: grid;
      grid-template-columns: .85fr 1.15fr;
      gap: 70px;
      align-items: start;
    }

    .contact-list {
      display: grid;
      gap: 17px;
      margin-top: 35px;
    }

    .contact-item {
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }

    .contact-icon {
      width: 45px;
      height: 45px;
      flex: 0 0 45px;
      border-radius: 50%;
      background: rgba(201,164,92,.1);
      color: var(--gold);
      display: grid;
      place-items: center;
    }

    .contact-item strong {
      display: block;
      font-size: 12px;
      margin-bottom: 5px;
    }

    .contact-item span,
    .contact-item a {
      color: var(--muted);
      font-size: 11px;
      line-height: 1.7;
    }

    .contact-form {
      background: var(--cream);
      border-radius: 25px;
      padding: 30px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 13px;
    }

    .form-field {
      min-width: 0;
    }

    .form-field.full {
      grid-column: 1 / -1;
    }

    .form-field label {
      display: block;
      color: #596372;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .12em;
      margin: 0 0 7px 4px;
    }

    .form-field input,
    .form-field select,
    .form-field textarea {
      width: 100%;
      border: 1px solid #e2dfd8;
      background: white;
      border-radius: 12px;
      padding: 14px;
      outline: none;
      color: var(--navy);
      font-size: 12px;
      resize: vertical;
      transition: .25s ease;
    }

    .form-field textarea {
      min-height: 120px;
    }

    .form-field input:focus,
    .form-field select:focus,
    .form-field textarea:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 4px rgba(201,164,92,.08);
    }

    .form-submit {
      width: 100%;
      margin-top: 13px;
      min-height: 52px;
      border-radius: 13px;
      background: var(--navy);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 9px;
      font-size: 11px;
      font-weight: 800;
      transition: .3s ease;
    }

    .form-submit:hover {
      background: var(--gold);
      color: var(--navy);
    }

    /* footer */
    .footer {
      background: #050b17;
      color: white;
      padding: 70px 0 25px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr;
      gap: 45px;
      padding-bottom: 55px;
      border-bottom: 1px solid var(--dark-line);
    }

    .footer-brand p {
      max-width: 330px;
      color: rgba(255,255,255,.45);
      font-size: 11px;
      line-height: 1.9;
      margin: 20px 0;
    }

    .footer-title {
      color: var(--gold);
      text-transform: uppercase;
      letter-spacing: .15em;
      font-size: 9px;
      font-weight: 800;
      margin-bottom: 20px;
    }

    .footer-links {
      display: grid;
      gap: 10px;
    }

    .footer-links a {
      color: rgba(255,255,255,.55);
      font-size: 11px;
      transition: .2s ease;
    }

    .footer-links a:hover {
      color: white;
      transform: translateX(3px);
    }

    .socials {
      display: flex;
      gap: 8px;
    }

    .social {
      width: 37px;
      height: 37px;
      border-radius: 50%;
      border: 1px solid var(--dark-line);
      display: grid;
      place-items: center;
      color: rgba(255,255,255,.55);
      transition: .25s ease;
    }

    .social:hover {
      color: var(--navy);
      background: var(--gold);
      border-color: var(--gold);
      transform: translateY(-3px);
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding-top: 22px;
      color: rgba(255,255,255,.32);
      font-size: 9px;
    }

    /* modal */
    .modal-backdrop {
      position: fixed;
      z-index: 120;
      inset: 0;
      background: rgba(2,7,16,.78);
      backdrop-filter: blur(12px);
      display: grid;
      place-items: center;
      padding: 20px;
    }

    .modal {
      width: min(920px, 100%);
      max-height: min(850px, 92vh);
      overflow: hidden;
      background: white;
      border-radius: 25px;
      display: grid;
      grid-template-columns: .9fr 1.1fr;
      box-shadow: 0 40px 100px rgba(0,0,0,.35);
    }

    .modal-image {
      min-height: 580px;
      position: relative;
    }

    .modal-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .modal-close {
      position: absolute;
      z-index: 3;
      top: 14px;
      right: 14px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: rgba(255,255,255,.92);
      color: var(--navy);
    }

    .modal-content {
      padding: 45px;
      overflow-y: auto;
    }

    .modal-content h2 {
      font-family: "Playfair Display", serif;
      font-size: 43px;
      line-height: 1;
      margin: 10px 0 15px;
    }

    .modal-price {
      font-size: 20px;
      font-weight: 800;
      color: var(--gold);
      margin: 15px 0 25px;
    }

    .modal-description {
      color: var(--muted);
      line-height: 1.9;
      font-size: 13px;
    }

    .modal-meta {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 8px;
      margin: 30px 0;
    }

    .modal-meta-item {
      padding: 15px 8px;
      border-radius: 13px;
      background: var(--cream);
      text-align: center;
      color: var(--navy);
    }

    .modal-meta-item svg {
      color: var(--gold);
      margin-bottom: 5px;
    }

    .modal-meta-item span {
      display: block;
      font-size: 9px;
      font-weight: 800;
    }

    /* floating */
    .floating-actions {
      position: fixed;
      z-index: 80;
      right: 20px;
      bottom: 20px;
      display: grid;
      gap: 10px;
    }

    .float-btn {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      box-shadow: 0 15px 35px rgba(0,0,0,.18);
      transition: .3s ease;
    }

    .float-btn:hover {
      transform: translateY(-4px) scale(1.04);
    }

    .whatsapp {
      color: white;
      background: #1fa968;
    }

    .top-btn {
      background: var(--navy);
      color: white;
    }

    /* toast */
    .toast {
      position: fixed;
      z-index: 150;
      left: 50%;
      bottom: 25px;
      transform: translateX(-50%);
      background: var(--navy);
      color: white;
      padding: 13px 18px;
      border-radius: 999px;
      box-shadow: 0 15px 40px rgba(0,0,0,.2);
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
    }

    .toast svg {
      color: var(--gold);
    }

    /* responsive */
    @media (max-width: 1100px) {
      .nav-links,
      .nav-contact {
        display: none;
      }

      .menu-btn {
        display: flex;
      }

      .property-grid {
        grid-template-columns: repeat(2, minmax(0,1fr));
      }

      .areas-grid {
        grid-template-columns: repeat(3, minmax(0,1fr));
      }

      .area {
        height: 350px;
      }

      .services-grid {
        grid-template-columns: repeat(2,1fr);
      }

      .search-fields {
        grid-template-columns: repeat(2,1fr);
      }

      .search-btn {
        width: 100%;
      }
    }

    @media (max-width: 900px) {
      .section {
        padding: 80px 0;
      }

      .split,
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 45px;
      }

      .image-stack {
        min-height: 520px;
        max-width: 650px;
      }

      .process-grid {
        grid-template-columns: repeat(2,1fr);
        gap: 0 25px;
      }

      .process-card:not(:last-child)::after {
        display: none;
      }

      .footer-grid {
        grid-template-columns: repeat(2,1fr);
      }

      .modal {
        grid-template-columns: 1fr;
        max-height: 90vh;
        overflow-y: auto;
      }

      .modal-image {
        min-height: 300px;
        height: 300px;
      }

      .modal-content {
        padding: 30px;
      }
    }

    @media (max-width: 650px) {
      .container,
      .hero-content {
        width: min(100% - 30px, 1180px);
      }

      .navbar {
        padding: 13px 0;
      }

      .nav-inner {
        width: calc(100% - 24px);
      }

      .brand {
        min-width: 0;
      }

      .brand-mark {
        width: 38px;
        height: 38px;
      }

      .brand-text strong {
        font-size: 14px;
      }

      .brand-text small {
        font-size: 7px;
      }

      .hero {
        min-height: 760px;
        height: 100svh;
      }

      .hero-image {
        background:
          linear-gradient(90deg, rgba(4,10,22,.91), rgba(4,10,22,.55)),
          linear-gradient(0deg, rgba(4,10,22,.65), transparent),
          url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85")
          center/cover no-repeat;
      }

      .hero-content {
        padding-top: 70px;
      }

      .hero-title {
        font-size: clamp(48px, 15vw, 72px);
      }

      .hero-description {
        font-size: 12px;
        line-height: 1.75;
        margin: 22px 0;
      }

      .hero-actions {
        display: grid;
        grid-template-columns: 1fr;
      }

      .hero-actions .btn {
        width: 100%;
      }

      .hero-trust {
        margin-top: 28px;
        gap: 10px 18px;
      }

      .hero-trust span {
        font-size: 8px;
      }

      .scroll-indicator {
        display: none;
      }

      .search-wrap {
        margin-top: -45px;
      }

      .search-panel {
        padding: 13px;
        border-radius: 19px;
      }

      .search-top {
        padding: 1px 3px 11px;
      }

      .search-fields {
        grid-template-columns: 1fr;
        gap: 8px;
      }

      .field select,
      .search-btn {
        min-height: 51px;
      }

      .marquee-item {
        font-size: 15px;
        padding: 14px 20px;
      }

      .stats {
        grid-template-columns: 1fr 1fr;
      }

      .stat {
        padding: 27px 16px;
      }

      .stat:nth-child(2) {
        border-right: 0;
      }

      .stat:nth-child(3),
      .stat:nth-child(4) {
        border-top: 1px solid var(--line);
      }

      .section-title {
        font-size: clamp(39px, 12vw, 55px);
      }

      .section-heading {
        margin-bottom: 35px;
      }

      .section-description {
        font-size: 12px;
        line-height: 1.8;
      }

      .property-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .property-image {
        height: 245px;
      }

      .property-body {
        padding: 18px;
      }

      .property-title {
        font-size: 21px;
      }

      .image-stack {
        min-height: 430px;
      }

      .image-main {
        width: 82%;
        height: 370px;
      }

      .image-small {
        height: 175px;
        width: 46%;
        border-width: 7px;
      }

      .floating-badge {
        width: 90px;
        height: 90px;
        font-size: 7px;
        top: 15px;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }

      .service {
        min-height: 245px;
        padding: 28px 22px;
      }

      .areas-grid {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .area {
        height: 280px;
        border-radius: 15px;
      }

      .area:last-child {
        grid-column: 1 / -1;
        height: 250px;
      }

      .area-content {
        left: 15px;
        right: 15px;
        bottom: 15px;
      }

      .area-content h3 {
        font-size: 25px;
      }

      .process-grid {
        grid-template-columns: 1fr;
      }

      .process-card {
        padding: 24px 0;
      }

      .cta {
        padding: 42px 24px;
        border-radius: 22px;
      }

      .cta h2 {
        font-size: 43px;
      }

      .contact-form {
        padding: 18px;
        border-radius: 18px;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .form-field.full {
        grid-column: auto;
      }

      .footer {
        padding-top: 55px;
      }

      .footer-grid {
        grid-template-columns: 1fr;
        gap: 35px;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 8px;
      }

      .modal-backdrop {
        padding: 10px;
        align-items: end;
      }

      .modal {
        border-radius: 22px 22px 15px 15px;
        max-height: 94vh;
      }

      .modal-image {
        min-height: 230px;
        height: 230px;
      }

      .modal-content {
        padding: 24px 20px 30px;
      }

      .modal-content h2 {
        font-size: 34px;
      }

      .modal-meta {
        grid-template-columns: repeat(3,1fr);
      }

      .floating-actions {
        right: 14px;
        bottom: 14px;
      }

      .float-btn {
        width: 47px;
        height: 47px;
      }

      .toast {
        width: calc(100% - 30px);
        justify-content: center;
        white-space: normal;
        text-align: center;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: .01ms !important;
      }
    }
  `}</style>
);

/* ============================================================
   HELPERS
============================================================ */

const reveal = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.7, 0.2, 1],
    },
  },
};

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function useScrollFlag() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return scrolled;
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* ============================================================
   COUNT UP
============================================================ */

function CountUp({ value, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start;
    let frame;

    const duration = 1500;

    const animate = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

/* ============================================================
   NAVBAR
============================================================ */

function Navbar() {
  const scrolled = useScrollFlag();
  const [open, setOpen] = useState(false);

  const links = [
    ["Home", "home"],
    ["Properties", "properties"],
    ["Services", "services"],
    ["Areas", "areas"],
    ["About", "about"],
    ["Contact", "contact"],
  ];

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), 100);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="brand" onClick={() => go("home")}>
            <div className="brand-mark">
              <span>PP</span>
            </div>

            <div className="brand-text">
              <strong>Prime Property</strong>
              <small>& Developers</small>
            </div>
          </button>

          <div className="nav-links">
            {links.map(([label, id]) => (
              <button
                key={id}
                className="nav-link"
                onClick={() => scrollToId(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <a className="nav-contact" href={`tel:+${COMPANY.phoneIntl}`}>
            <Phone size={14} />
            {COMPANY.phone}
          </a>

          <button
            className="menu-btn"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={21} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="menu-btn"
              style={{ position: "absolute", right: 15, top: 14 }}
              onClick={() => setOpen(false)}
            >
              <X size={21} />
            </button>

            <motion.div
              className="mobile-menu-links"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.07,
                  },
                },
              }}
            >
              {links.map(([label, id]) => (
                <motion.button
                  key={id}
                  className="mobile-link"
                  onClick={() => go(id)}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {label}
                  <ArrowUpRight />
                </motion.button>
              ))}
            </motion.div>

            <div className="mobile-contact">
              <a href={`tel:+${COMPANY.phoneIntl}`}>
                <Phone size={17} />
                {COMPANY.phone}
              </a>

              <a href={`mailto:${COMPANY.email}`}>
                <Mail size={17} />
                {COMPANY.email}
              </a>

              <a
                href={WA()}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "var(--navy)",
                  background: "var(--gold)",
                  padding: "15px 18px",
                  borderRadius: "999px",
                  justifyContent: "center",
                  fontWeight: 800,
                }}
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   HERO
============================================================ */

function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : 100]);
  const imageScale = useTransform(
    scrollY,
    [0, 800],
    [1, reduceMotion ? 1 : 1.08]
  );

  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-image"
        style={{ y: imageY, scale: imageScale }}
      />

      <div className="hero-grid" />

      <motion.div
        className="hero-orb one"
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, -20, 0],
                rotate: [0, 12, 0],
              }
        }
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="hero-orb two"
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, 18, 0],
                x: [0, -15, 0],
              }
        }
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="hero-content">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-kicker">
            <span />
            Islamabad's Property Specialists
          </div>

          <h1 className="hero-title">
            Find a place
            <br />
            <em>worth calling</em>
            <br />
            home.
          </h1>

          <p className="hero-description">
            Premium residential and commercial real estate solutions in
            Islamabad — built around trust, market knowledge and your long-term
            goals.
          </p>

          <div className="hero-actions">
            <button
              className="btn btn-gold"
              onClick={() => scrollToId("properties")}
            >
              Explore Properties
              <ArrowUpRight size={15} />
            </button>

            <a
              className="btn btn-outline"
              href={WA(
                "Hello Prime Property & Developers, I would like to discuss a property opportunity."
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </a>
          </div>

          <div className="hero-trust">
            <span>
              <ShieldCheck size={13} />
              Trusted guidance
            </span>

            <span>
              <Award size={13} />
              Premium properties
            </span>

            <span>
              <Compass size={13} />
              Islamabad specialists
            </span>
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        Scroll
        <motion.div
          className="scroll-line"
          animate={reduceMotion ? {} : { scaleY: [1, .4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </div>
    </section>
  );
}

/* ============================================================
   SEARCH
============================================================ */

function SearchBox({ onSearch }) {
  const [purpose, setPurpose] = useState("Buy");
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");

  return (
    <div className="search-wrap">
      <div className="container">
        <motion.div
          className="search-panel"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
        >
          <div className="search-top">
            <span className="search-title">Find your property</span>
            <span className="search-label">Curated opportunities</span>
          </div>

          <div className="search-fields">
            <div className="field">
              <Search className="field-icon" size={17} />

              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option>Buy</option>
                <option>Rent</option>
                <option>Invest</option>
              </select>

              <ChevronDown className="field-chevron" size={14} />
            </div>

            <div className="field">
              <Building2 className="field-icon" size={17} />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>All</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Commercial</option>
              </select>

              <ChevronDown className="field-chevron" size={14} />
            </div>

            <div className="field">
              <MapPin className="field-icon" size={17} />

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All</option>
                <option>F-6</option>
                <option>F-7</option>
                <option>F-8</option>
                <option>E-7</option>
                <option>Blue Area</option>
              </select>

              <ChevronDown className="field-chevron" size={14} />
            </div>

            <button
              className="search-btn"
              onClick={() => onSearch({ purpose, type, location })}
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   MARQUEE
============================================================ */

function Marquee() {
  const items = [
    "F-6 Islamabad",
    "F-7 Islamabad",
    "F-8 Islamabad",
    "E-7 Islamabad",
    "Blue Area",
    "Premium Real Estate",
  ];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <div className="marquee-item" key={i}>
            {item}
            <span>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   STATS
============================================================ */

function Stats() {
  const icons = [Clock3, Building2, MapPin, Users];

  return (
    <section className="section" style={{ paddingBottom: 60 }}>
      <div className="container">
        <div className="stats">
          {stats.map((stat, index) => {
            const Icon = icons[index];

            return (
              <Reveal key={stat.label} delay={index * .08}>
                <div className="stat">
                  <Icon className="stat-icon" size={20} />

                  <div className="stat-number">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>

                  <div className="stat-label">{stat.label}</div>
                </div>
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

function PropertyCard({ property, onClick }) {
  return (
    <motion.article
      className="property-card"
      whileTap={{ scale: .985 }}
      onClick={() => onClick(property)}
      layout
    >
      <div className="property-image">
        <img src={property.image} alt={property.title} loading="lazy" />

        <span className="property-tag">{property.tag}</span>

        <span className="property-arrow">
          <ArrowUpRight size={17} />
        </span>
      </div>

      <div className="property-body">
        <div className="property-location">
          <MapPin size={11} />
          {property.location}
        </div>

        <h3 className="property-title">{property.title}</h3>

        <div className="property-price">{property.price}</div>

        <div className="property-meta">
          {property.beds > 0 && (
            <span>
              <BedDouble size={13} />
              {property.beds} Beds
            </span>
          )}

          <span>
            <Bath size={13} />
            {property.baths} Baths
          </span>

          <span>
            <Maximize size={13} />
            {property.area}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   PROPERTIES
============================================================ */

function FeaturedProperties({ onSelect, filters }) {
  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const purposeMatch =
        filters.purpose === "All" || property.purpose === filters.purpose;

      const typeMatch =
        filters.type === "All" || property.type === filters.type;

      const locationMatch =
        filters.location === "All" ||
        property.location.startsWith(filters.location);

      return purposeMatch && typeMatch && locationMatch;
    });
  }, [filters]);

  return (
    <section id="properties" className="section section--cream">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div className="eyebrow">Curated portfolio</div>

            <h2 className="section-title">
              Properties with
              <br />
              <i>possibility.</i>
            </h2>

            <p className="section-description">
              Explore a selection of residential and commercial opportunities
              across Islamabad's most sought-after locations.
            </p>
          </div>
        </Reveal>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div className="property-grid" layout>
              {filtered.map((property, index) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * .05 }}
                >
                  <PropertyCard
                    property={property}
                    onClick={onSelect}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                padding: "60px 20px",
                textAlign: "center",
                background: "white",
                borderRadius: 20,
              }}
            >
              <Search
                size={32}
                color="var(--gold)"
                style={{ marginBottom: 15 }}
              />

              <h3
                style={{
                  fontFamily: "Playfair Display",
                  fontSize: 28,
                  margin: 0,
                }}
              >
                No matching properties
              </h3>

              <p style={{ color: "var(--muted)", fontSize: 12 }}>
                Try changing your search filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ============================================================
   MODAL
============================================================ */

function PropertyModal({ property, onClose }) {
  if (!property) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal"
          initial={{ opacity: 0, y: 30, scale: .97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-image">
            <img src={property.image} alt={property.title} />

            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={19} />
            </button>
          </div>

          <div className="modal-content">
            <div className="eyebrow">{property.tag}</div>

            <h2>{property.title}</h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "var(--muted)",
                fontSize: 11,
              }}
            >
              <MapPin size={13} color="var(--gold)" />
              {property.location}
            </div>

            <div className="modal-price">{property.price}</div>

            <p className="modal-description">
              {property.description}
            </p>

            <div className="modal-meta">
              {property.beds > 0 && (
                <div className="modal-meta-item">
                  <BedDouble size={17} />
                  <span>{property.beds} Beds</span>
                </div>
              )}

              <div className="modal-meta-item">
                <Bath size={17} />
                <span>{property.baths} Baths</span>
              </div>

              <div className="modal-meta-item">
                <Maximize size={17} />
                <span>{property.area}</span>
              </div>
            </div>

            <a
              href={WA(
                `Hello Prime Property & Developers, I am interested in ${property.title} in ${property.location}. Please share more details.`
              )}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold"
              style={{ width: "100%" }}
            >
              <MessageCircle size={16} />
              Enquire on WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   ABOUT
============================================================ */

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="split">
          <Reveal>
            <div className="image-stack">
              <img
                className="image-main"
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
                alt="Luxury property"
              />

              <img
                className="image-small"
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=85"
                alt="Luxury interior"
              />

              <motion.div
                className="floating-badge"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div>
                  <Sparkles size={18} />
                  <br />
                  Prime
                  <br />
                  Standard
                </div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={.15}>
            <div>
              <div className="eyebrow">Why Prime Property</div>

              <h2 className="section-title">
                Property is
                <br />
                personal.
              </h2>

              <p className="section-description">
                We believe finding the right property is about more than
                square footage and price. It is about finding the right
                opportunity for your life, your family or your future.
              </p>

              <div className="check-list">
                {[
                  "Local knowledge across Islamabad's prime sectors",
                  "Personalised property recommendations",
                  "Professional buying, selling and rental guidance",
                  "Transparent communication throughout the process",
                ].map((item) => (
                  <div className="check-item" key={item}>
                    <span className="check-item-icon">
                      <Check size={14} />
                    </span>

                    {item}
                  </div>
                ))}
              </div>

              <button
                className="btn btn-gold"
                onClick={() => scrollToId("contact")}
              >
                Talk to our team
                <ArrowUpRight size={15} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES
============================================================ */

function Services() {
  return (
    <section id="services" className="section section--navy">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div className="eyebrow">What we do</div>

            <h2 className="section-title">
              A smarter way
              <br />
              to move forward.
            </h2>

            <p className="section-description">
              From your first property search to your next investment, our
              services are designed around clarity and confidence.
            </p>
          </div>
        </Reveal>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                className="service"
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .08 }}
              >
                <div className="service-number">{service.number}</div>

                <motion.div
                  className="service-icon"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                >
                  <Icon size={28} />
                </motion.div>

                <h3>{service.title}</h3>

                <p>{service.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   AREAS
============================================================ */

function Areas() {
  return (
    <section id="areas" className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading center">
            <div className="eyebrow">Prime locations</div>

            <h2 className="section-title">
              Know the
              <br />
              <i>neighbourhood.</i>
            </h2>

            <p className="section-description" style={{ marginInline: "auto" }}>
              Focused expertise in the areas that define Islamabad's premium
              property market.
            </p>
          </div>
        </Reveal>

        <div className="areas-grid">
          {areas.map((area, index) => (
            <motion.div
              className="area"
              key={area.name}
              initial={{ opacity: 0, scale: .96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * .06 }}
              whileHover={{ y: -5 }}
            >
              <img src={area.image} alt={area.name} loading="lazy" />

              <div className="area-content">
                <h3>{area.name}</h3>
                <p>{area.subtitle}</p>
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
  const [active, setActive] = useState(0);

  const next = () => setActive((v) => (v + 1) % testimonials.length);
  const prev = () =>
    setActive((v) => (v - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[active];

  return (
    <section id="clients" className="section section--navy">
      <div className="container">
        <div className="testimonial-wrap">
          <Reveal>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Client perspective
            </div>

            <Quote className="quote-icon" size={35} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: .35 }}
              >
                <p className="testimonial-quote">
                  “{testimonial.quote}”
                </p>

                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={13} fill="currentColor" />
                  ))}
                </div>

                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-role">{testimonial.role}</p>
              </motion.div>
            </AnimatePresence>

            <div className="slider-controls">
              <button className="slider-btn" onClick={prev}>
                <ArrowLeft size={16} />
              </button>

              <button className="slider-btn" onClick={next}>
                <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROCESS
============================================================ */

function Process() {
  const steps = [
    {
      number: "01",
      title: "Tell us what you need",
      text: "Share your property goals, preferred location and budget.",
    },
    {
      number: "02",
      title: "Explore opportunities",
      text: "We shortlist suitable properties based on your requirements.",
    },
    {
      number: "03",
      title: "Make an informed decision",
      text: "Review the details and understand the opportunity clearly.",
    },
    {
      number: "04",
      title: "Move forward",
      text: "Our team supports you through the next stage of your property journey.",
    },
  ];

  return (
    <section className="section section--cream">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div className="eyebrow">Simple process</div>

            <h2 className="section-title">
              From search
              <br />
              to <i>signature.</i>
            </h2>
          </div>
        </Reveal>

        <div className="process-grid">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * .08}>
              <div className="process-card">
                <div className="process-number">{step.number}</div>

                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
============================================================ */

function InvestmentCTA() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="cta">
            <div className="cta-content">
              <div className="eyebrow">Your next move</div>

              <h2>
                Let's find
                <br />
                what's <i>next.</i>
              </h2>

              <p>
                Whether you're buying your first home, searching for a premium
                rental or exploring your next investment, our team is ready to
                help.
              </p>

              <a
                href={WA()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
              >
                Start a conversation
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
============================================================ */

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    interest: "Buying a property",
    message: "",
  });

  const [toast, setToast] = useState(false);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();

    const message = `
Hello Prime Property & Developers,

Name: ${form.name}
Phone: ${form.phone}
Interest: ${form.interest}

Message:
${form.message || "I would like to discuss a property opportunity."}
    `.trim();

    window.open(WA(message), "_blank");

    setToast(true);

    setTimeout(() => setToast(false), 3500);
  };

  return (
    <section id="contact" className="section section--cream">
      <div className="container">
        <div className="contact-grid">
          <Reveal>
            <div>
              <div className="eyebrow">Let's connect</div>

              <h2 className="section-title">
                Have a property
                <br />
                <i>in mind?</i>
              </h2>

              <p className="section-description">
                Tell us what you're looking for and our team will help you
                explore the right opportunities.
              </p>

              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone size={18} />
                  </div>

                  <div>
                    <strong>Call us</strong>
                    <a href={`tel:+${COMPANY.phoneIntl}`}>
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail size={18} />
                  </div>

                  <div>
                    <strong>Email</strong>
                    <a href={`mailto:${COMPANY.email}`}>
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <strong>Visit us</strong>
                    <span>{COMPANY.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={.12}>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-grid">
                <div className="form-field">
                  <label>Your name</label>

                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-field">
                  <label>Phone number</label>

                  <input
                    required
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="03XX XXXXXXX"
                  />
                </div>

                <div className="form-field full">
                  <label>I'm interested in</label>

                  <select
                    value={form.interest}
                    onChange={(e) => update("interest", e.target.value)}
                  >
                    <option>Buying a property</option>
                    <option>Renting a property</option>
                    <option>Selling a property</option>
                    <option>Property investment</option>
                    <option>Commercial property</option>
                    <option>General consultation</option>
                  </select>
                </div>

                <div className="form-field full">
                  <label>Message</label>

                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us what you're looking for..."
                  />
                </div>
              </div>

              <button className="form-submit" type="submit">
                <Send size={15} />
                Send inquiry on WhatsApp
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Check size={15} />
            WhatsApp inquiry opened successfully
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
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <div className="brand-mark">
                <span>PP</span>
              </div>

              <div className="brand-text">
                <strong>Prime Property</strong>
                <small>& Developers</small>
              </div>
            </div>

            <p>
              Premium property solutions for Islamabad's residential,
              commercial and investment market.
            </p>

            <div className="socials">
              <a
                className="social"
                href={COMPANY.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>

              <a
                className="social"
                href={COMPANY.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>

              <a
                className="social"
                href={COMPANY.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div>
            <div className="footer-title">Explore</div>

            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#properties">Properties</a>
              <a href="#services">Services</a>
              <a href="#areas">Areas</a>
            </div>
          </div>

          <div>
            <div className="footer-title">Services</div>

            <div className="footer-links">
              <a href="#services">Property Sales</a>
              <a href="#services">Property Rentals</a>
              <a href="#services">Investment Advisory</a>
              <a href="#services">Consultancy</a>
            </div>
          </div>

          <div>
            <div className="footer-title">Contact</div>

            <div className="footer-links">
              <a href={`tel:+${COMPANY.phoneIntl}`}>
                {COMPANY.phone}
              </a>

              <a href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>

              <a href="#contact">Islamabad, Pakistan</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {COMPANY.legalName}
          </span>

          <span>Designed with a Prime standard.</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   FLOATING ACTIONS
============================================================ */

function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handle = () => setShowTop(window.scrollY > 500);

    handle();

    window.addEventListener("scroll", handle, { passive: true });

    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="floating-actions">
      <motion.a
        href={WA()}
        target="_blank"
        rel="noreferrer"
        className="float-btn whatsapp"
        aria-label="WhatsApp"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <MessageCircle size={21} />
      </motion.a>

      <AnimatePresence>
        {showTop && (
          <motion.button
            className="float-btn top-btn"
            initial={{ opacity: 0, scale: .7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .7 }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
          >
            <ArrowDown
              size={19}
              style={{ transform: "rotate(180deg)" }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   APP
============================================================ */

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [filters, setFilters] = useState({
    purpose: "Buy",
    type: "All",
    location: "All",
  });

  const { scrollYProgress } = useScroll();

  const handleSearch = (newFilters) => {
    setFilters(newFilters);

    setTimeout(() => {
      scrollToId("properties");
    }, 100);
  };

  return (
    <div className="app">
      <GlobalStyles />

      <motion.div
        className="progress"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar />

      <Hero />

      <SearchBox onSearch={handleSearch} />

      <Marquee />

      <Stats />

      <FeaturedProperties
        filters={filters}
        onSelect={setSelectedProperty}
      />

      <About />

      <Services />

      <Areas />

      <Testimonials />

      <Process />

      <InvestmentCTA />

      <Contact />

      <Footer />

      <FloatingActions />

      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
