export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  prime: boolean;
  seller: string;
}

export const categories = [
  "All",
  "Electronics",
  "Computers",
  "Smart Home",
  "Arts & Crafts",
  "Automotive",
  "Books",
  "Fashion",
  "Health",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Toys & Games",
];

export const products: Product[] = [
  {
    id: 1,
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds with USB-C Charging",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 125432,
    image: "https://picsum.photos/seed/airpods/400/400",
    category: "Electronics",
    description:
      "Apple-engineered H2 chip for smarter noise cancellation and superior three-dimensional sound. Low-distortion, custom-built driver delivers crisp, clear high notes and deep, rich bass in stunning definition.",
    features: [
      "Active Noise Cancellation up to 2x more effective",
      "Adaptive Transparency lets outside sounds in naturally",
      "Personalized Spatial Audio with dynamic head tracking",
      "Up to 6 hours of listening time with ANC enabled",
      "MagSafe Charging Case with USB-C, speaker, and lanyard loop",
    ],
    inStock: true,
    prime: true,
    seller: "Apple",
  },
  {
    id: 2,
    title: 'Samsung 65-Inch Class OLED 4K S90D Series Smart TV with Alexa Built-in',
    price: 1297.99,
    originalPrice: 1899.99,
    rating: 4.6,
    reviewCount: 8745,
    image: "https://picsum.photos/seed/samsung-tv/400/400",
    category: "Electronics",
    description:
      "Experience the power of OLED technology with pure blacks and vibrant colors. Samsung's Neural Quantum Processor 4K uses AI to upscale content.",
    features: [
      "OLED Self-Lit Pixels for pure blacks",
      "Neural Quantum Processor 4K with AI Upscaling",
      "Dolby Atmos and Object Tracking Sound Lite",
      "Anti-Glare screen for comfortable viewing",
      "SmartThings and Alexa Built-in",
    ],
    inStock: true,
    prime: true,
    seller: "Samsung",
  },
  {
    id: 3,
    title: "Mechanical Gaming Keyboard RGB Backlit Hot-Swappable Switches",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewCount: 32100,
    image: "https://picsum.photos/seed/keyboard/400/400",
    category: "Computers",
    description:
      "Hot-swappable mechanical keyboard with customizable RGB backlighting. Features durable PBT keycaps and programmable macro keys.",
    features: [
      "Hot-swappable switches for easy customization",
      "Per-key RGB backlighting with 16.8M colors",
      "Double-shot PBT keycaps for durability",
      "Full N-key rollover and anti-ghosting",
      "Detachable USB-C cable",
    ],
    inStock: true,
    prime: true,
    seller: "TechGear",
  },
  {
    id: 4,
    title: "Echo Dot (5th Gen) Smart Speaker with Alexa - Charcoal",
    price: 27.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 214560,
    image: "https://picsum.photos/seed/echo-dot/400/400",
    category: "Smart Home",
    description:
      "Our best sounding Echo Dot yet. Enjoy an improved audio experience with clearer vocals, deeper bass, and vibrant sound in any room.",
    features: [
      "Improved audio with clearer vocals and deeper bass",
      "Voice control your entertainment and smart home",
      "Built-in temperature sensor for smart routines",
      "eero Built-in to extend your wifi network",
      "Designed with privacy in mind",
    ],
    inStock: true,
    prime: true,
    seller: "Amazon",
  },
  {
    id: 5,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker 6 Quart",
    price: 79.95,
    originalPrice: 99.95,
    rating: 4.7,
    reviewCount: 178320,
    image: "https://picsum.photos/seed/instant-pot/400/400",
    category: "Home & Kitchen",
    description:
      "Best selling multi-cooker. 7 appliances in 1: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    features: [
      "7-in-1 functionality replaces multiple kitchen appliances",
      "13 one-touch smart programs",
      "Stainless steel inner cooking pot",
      "Advanced safety protection with 10+ features",
      "Fingerprint-resistant stainless steel lid and body",
    ],
    inStock: true,
    prime: true,
    seller: "Instant Brands",
  },
  {
    id: 6,
    title: "Nike Men's Air Max 270 Running Shoes Lightweight Sneakers",
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 45230,
    image: "https://picsum.photos/seed/nike-shoes/400/400",
    category: "Fashion",
    description:
      "The Nike Air Max 270 delivers visible cushioning under every step with the first-ever Max Air unit designed for Nike Sportswear.",
    features: [
      "Max Air 270 unit for maximum cushioning",
      "Mesh upper for breathability",
      "Foam midsole for lightweight comfort",
      "Rubber outsole for durable traction",
      "Pull tab on heel for easy on and off",
    ],
    inStock: true,
    prime: false,
    seller: "Nike",
  },
  {
    id: 7,
    title: "Kindle Paperwhite (16 GB) 6.8\" Display with Adjustable Warm Light",
    price: 139.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviewCount: 89450,
    image: "https://picsum.photos/seed/kindle/400/400",
    category: "Electronics",
    description:
      "The thinnest, lightest Kindle Paperwhite yet. Features a 6.8\" display with adjustable warm light and up to 10 weeks of battery life.",
    features: [
      '6.8" glare-free display with adjustable warm light',
      "Waterproof (IPX8) for reading in the bath or by the pool",
      "Up to 10 weeks of battery life",
      "20% faster page turns than previous generation",
      "16 GB storage for thousands of books",
    ],
    inStock: true,
    prime: true,
    seller: "Amazon",
  },
  {
    id: 8,
    title: "LEGO Star Wars Millennium Falcon Building Kit (1351 Pieces)",
    price: 149.99,
    originalPrice: 169.99,
    rating: 4.8,
    reviewCount: 12340,
    image: "https://picsum.photos/seed/lego-falcon/400/400",
    category: "Toys & Games",
    description:
      "Build and display the legendary Millennium Falcon from Star Wars. Includes 7 minifigures and detailed interior compartments.",
    features: [
      "1,351 pieces for an engaging build experience",
      "7 LEGO Star Wars characters included",
      "Removable hull panels reveal detailed interior",
      "Rotating top and bottom gun turrets",
      "Compatible with other LEGO Star Wars sets",
    ],
    inStock: true,
    prime: true,
    seller: "LEGO",
  },
  {
    id: 9,
    title: "Logitech MX Master 3S Wireless Performance Mouse Ergonomic",
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 28900,
    image: "https://picsum.photos/seed/mx-mouse/400/400",
    category: "Computers",
    description:
      "Master the craft with the Logitech MX Master 3S. An iconic mouse remastered with Quiet Clicks, 8K DPI tracking, and ergonomic design.",
    features: [
      "Quiet Clicks with satisfying feel",
      "8,000 DPI Darkfield tracking on any surface",
      "MagSpeed electromagnetic scroll wheel",
      "USB-C quick charging — 3 min = 1 full day",
      "Connect up to 3 devices with Easy-Switch",
    ],
    inStock: true,
    prime: true,
    seller: "Logitech",
  },
  {
    id: 10,
    title: "Fitbit Charge 6 Advanced Fitness & Health Tracker",
    price: 99.95,
    originalPrice: 159.95,
    rating: 4.2,
    reviewCount: 15670,
    image: "https://picsum.photos/seed/fitbit/400/400",
    category: "Electronics",
    description:
      "Get the most out of every workout with the Fitbit Charge 6. Features Google integration, built-in GPS, and advanced health metrics.",
    features: [
      "Built-in GPS with real-time pace & distance",
      "Continuous heart rate tracking with PurePulse 2.0",
      "40+ exercise modes with auto-detection",
      "7-day battery life",
      "Google Maps, Wallet, and YouTube Music",
    ],
    inStock: true,
    prime: true,
    seller: "Fitbit",
  },
  {
    id: 11,
    title: "JBL Flip 6 Portable Bluetooth Speaker Waterproof with Bold Sound",
    price: 99.95,
    originalPrice: 129.95,
    rating: 4.7,
    reviewCount: 43210,
    image: "https://picsum.photos/seed/jbl-speaker/400/400",
    category: "Electronics",
    description:
      "Bold sound for every adventure with JBL Flip 6. Features IP67 waterproof and dustproof design, 12 hours playtime.",
    features: [
      "JBL Original Pro Sound with optimized racetrack driver",
      "IP67 waterproof and dustproof",
      "12 hours of playtime",
      "PartyBoost for pairing multiple speakers",
      "Eco-friendly recycled materials",
    ],
    inStock: true,
    prime: true,
    seller: "JBL",
  },
  {
    id: 12,
    title: "Yoga Mat Extra Thick Non-Slip Exercise Mat with Carrying Strap",
    price: 29.99,
    originalPrice: 45.99,
    rating: 4.5,
    reviewCount: 67890,
    image: "https://picsum.photos/seed/yoga-mat/400/400",
    category: "Sports & Outdoors",
    description:
      "Premium extra thick yoga mat with non-slip surface on both sides. Perfect for yoga, pilates, floor exercises, and stretching.",
    features: [
      '72" x 24" with 1/4 inch thickness for joint protection',
      "Double-sided non-slip texture",
      "High-density foam for durability",
      "Lightweight and easy to carry with included strap",
      "Free from latex, PVC, and heavy metals",
    ],
    inStock: true,
    prime: true,
    seller: "BalanceFrom",
  },
];

export const deals = products.filter((p) => p.originalPrice - p.price > 20);
