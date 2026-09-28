export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  view_type: string;
  image_url: string;
  sort_order: number;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  price: number;
  category_id: string | null;
  dimensions: string | null;
  material: string | null;
  handmade: boolean;
  available: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  category?: Category | null;
  images?: ProductImage[];
}

export interface CartItem {
  product_id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string;
  quantity: number;
}

export interface Order {
  id: string;
  customer_name: string;
  email: string;
  phone: string | null;
  address: string;
  city: string;
  postal_code: string | null;
  country: string;
  items: CartItem[];
  total: number;
  status: string;
  created_at: string;
}

export const VIEW_TYPE_LABELS: Record<string, string> = {
  front: 'Front View',
  back: 'Back View',
  top: 'Top View',
  bottom: 'Bottom View',
  left: 'Left View',
  right: 'Right View',
  open: 'Open View',
  'close-up': 'Close-up View',
};
