import { Category, Product } from "@/types";

export const categories: Category[] = [
  {
    id: "cat_iptv",
    name: "TV Subscriptions",
    slug: "tv-subscriptions",
    description: "Access thousands of channels and VOD content instantly.",
  },
  {
    id: "cat_giftcards",
    name: "Gift Cards",
    slug: "gift-cards",
    description: "The perfect gift for gamers and entertainment lovers.",
  },
  {
    id: "cat_software",
    name: "Software & Tools",
    slug: "software",
    description: "Premium software licenses at unbeatable prices.",
  }
];

export const products: Product[] = [
  // TV Subscriptions
  {
    id: "prod_vip_gold",
    name: "VIP Gold IPTV",
    slug: "vip-gold-iptv",
    category: "tv-subscriptions",
    short_description: "Premium 4K/FHD streaming with anti-freeze technology.",
    full_description: "Experience the ultimate entertainment with our VIP Gold IPTV. Featuring over 10,000 live channels, 50,000+ movies and series, and 99.9% uptime stability. Compatible with all devices including Smart TVs, Android Box, Mag, and Smartphones.",
    features: [
      "+15,000 Live Channels",
      "4K & FHD Quality",
      "Anti-Freeze Technology",
      "Movies & Series VOD (Updated)",
      "24/7 Premium Support",
      "Compatible with all devices"
    ],
    badge: "Best Seller",
    prices: [
      {
        duration_label: "3 Months",
        duration_value: "3 months",
        price: 45,
        currency: "TND",
        original_price: 60
      },
      {
        duration_label: "6 Months",
        duration_value: "6 months",
        price: 70,
        currency: "TND",
        original_price: 90
      },
      {
        duration_label: "12 Months",
        duration_value: "1 year",
        price: 100,
        currency: "TND",
        original_price: 140,
        popular: true
      }
    ]
  },
  {
    id: "prod_standard_iptv",
    name: "Standard IPTV",
    slug: "standard-iptv",
    category: "tv-subscriptions",
    short_description: "Reliable HD streaming for the whole family.",
    full_description: "A great choice for family entertainment with a focus on stability and variety. Includes all major sports, kids, and entertainment channels in HD quality.",
    features: [
      "+8,000 Live Channels",
      "HD & SD Quality",
      "Stable Server",
      "VOD Library",
      "Standard Support",
      "Mobile Friendly"
    ],
    prices: [
      {
        duration_label: "6 Months",
        duration_value: "6 months",
        price: 50,
        currency: "TND"
      },
      {
        duration_label: "12 Months",
        duration_value: "1 year",
        price: 80,
        currency: "TND",
        popular: true
      }
    ]
  },
  // Gift Cards
  {
    id: "prod_netflix",
    name: "Netflix Gift Card",
    slug: "netflix-gift-card",
    category: "gift-cards",
    short_description: "Top up your Netflix account easily.",
    full_description: "Get a Netflix gift card to subscribe or renew your subscription without a credit card. delivered instantly via WhatsApp.",
    features: [
      "Instant Delivery",
      "No Expiry Date",
      "Global Region",
      "Secure Code"
    ],
    prices: [
      {
        duration_label: "25 USD",
        duration_value: "25 USD",
        price: 90,
        currency: "TND"
      },
      {
        duration_label: "50 USD",
        duration_value: "50 USD",
        price: 175,
        currency: "TND",
        popular: true
      }
    ]
  },
  {
    id: "prod_psn",
    name: "PlayStation Store Card",
    slug: "psn-card",
    category: "gift-cards",
    short_description: "Buy games and add-ons from the PS Store.",
    full_description: "Add funds to your PlayStation Network wallet to purchase games, addons, and more.",
    features: [
      "Instant Delivery",
      "USA / FR Regions",
      "Works on PS4 & PS5"
    ],
    prices: [
      {
        duration_label: "10 USD (USA)",
        duration_value: "10 USD",
        price: 40,
        currency: "TND"
      },
      {
        duration_label: "50 USD (USA)",
        duration_value: "50 USD",
        price: 180,
        currency: "TND"
      }
    ]
  },
  // Software
  {
    id: "prod_win11",
    name: "Windows 11 Pro Key",
    slug: "windows-11-pro",
    category: "software",
    short_description: "Genuine retail key for Windows 11 Pro.",
    full_description: "Activate your Windows 11 Pro installation permanently with a genuine retail key. Supports multi-language and updates.",
    features: [
      "Lifetime Activation",
      "Retail Key",
      "Global Activation",
      "Instant Delivery"
    ],
    badge: "Hot",
    prices: [
      {
        duration_label: "1 Device / Lifetime",
        duration_value: "Lifetime",
        price: 35,
        currency: "TND",
        popular: true
      }
    ]
  }
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (categorySlug: string) => products.filter((p) => p.category === categorySlug);
export const getFeaturedProducts = () => products.filter((p) => p.badge || p.prices.some(pr => pr.popular)).slice(0, 4);
