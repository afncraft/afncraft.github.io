/*
# Extend AfnCraft product system for real products

1. Modified tables
- `products`: Add `short_description` (text) — a one-line summary for product cards and listings.
- `products`: Add `handmade` (boolean, default true) — indicates whether the product is handmade.

2. Storage
- Create a public storage bucket `product-images` for uploading real AfnCraft product photos.
- Policy: anyone can read product images; only authenticated (admin) can upload/update/delete.

3. Data cleanup
- Remove all existing demo products, their images, and demo categories so the system is empty and ready for real products.

4. Security
- RLS already enabled on products table; no structural changes.
- New columns inherit existing policies (public read, admin write).
- Storage bucket policies follow the same read-public / write-authenticated pattern.
*/

-- Add short_description column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'short_description'
  ) THEN
    ALTER TABLE products ADD COLUMN short_description text;
  END IF;
END $$;

-- Add handmade column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'handmade'
  ) THEN
    ALTER TABLE products ADD COLUMN handmade boolean NOT NULL DEFAULT true;
  END IF;
END $$;

-- Delete all demo data
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, authenticated write
DROP POLICY IF EXISTS "public_read_product_images" ON storage.objects;
CREATE POLICY "public_read_product_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "admin_upload_product_images" ON storage.objects;
CREATE POLICY "admin_upload_product_images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "admin_update_product_images" ON storage.objects;
CREATE POLICY "admin_update_product_images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "admin_delete_product_images" ON storage.objects;
CREATE POLICY "admin_delete_product_images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-images');