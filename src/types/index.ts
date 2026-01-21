export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface PriceOption {
  duration_label: string;
  duration_value: string; // e.g., '3_months', '1_year'
  price: number;
  currency: string;
  original_price?: number; // For showing discounts
  popular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: string; // slug of the category
  features: string[];
  prices: PriceOption[];
  image_url?: string;
  badge?: string; // e.g., "Best Value", "New"
}

export interface WhatsAppPayload {
  productName: string;
  duration: string;
  price: string;
  currency: string;
}
