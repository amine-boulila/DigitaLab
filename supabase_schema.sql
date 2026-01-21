-- Create Categories Table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text
);

-- Create Products Table
create table products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text unique not null,
  short_description text,
  full_description text,
  category_slug text references categories(slug),
  features text[], -- Array of strings
  prices jsonb,    -- JSONB to store the pricing structure definition
  image_url text,
  badge text
);

-- Insert Sample Categories
insert into categories (name, slug, description) values
('TV Subscriptions', 'tv-subscriptions', 'Access thousands of channels and VOD content instantly.'),
('Gift Cards', 'gift-cards', 'The perfect gift for gamers and entertainment lovers.'),
('Software & Tools', 'software', 'Premium software licenses at unbeatable prices.');

-- Insert Sample Products
insert into products (name, slug, short_description, full_description, category_slug, features, prices, badge) values
(
  'VIP Gold IPTV',
  'vip-gold-iptv',
  'Premium 4K/FHD streaming with anti-freeze technology.',
  'Experience the ultimate entertainment with our VIP Gold IPTV. Featuring over 10,000 live channels.',
  'tv-subscriptions',
  ARRAY['+15,000 Live Channels', '4K & FHD Quality', 'Anti-Freeze Technology'],
  '[
    {"duration_label": "3 Months", "duration_value": "3 months", "price": 45, "currency": "TND", "original_price": 60},
    {"duration_label": "12 Months", "duration_value": "1 year", "price": 100, "currency": "TND", "original_price": 140, "popular": true}
  ]'::jsonb,
  'Best Seller'
);
