import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Check, ChevronLeft, Ruler, Package, Hand } from 'lucide-react';
import type { Product, ProductImage } from '@/lib/types';
import { VIEW_TYPE_LABELS } from '@/lib/types';
import { getProductBySlug, getProductImages, formatINR } from '@/lib/products';
import { useCart } from '@/lib/cart';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const p = await getProductBySlug(slug);
        setProduct(p);
        if (p) {
          const imgs = await getProductImages(p.id);
          setImages(imgs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    const imageUrl = images.length > 0 ? images[0].image_url : '';
    addToCart(product, imageUrl, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) {
    return (
      <div className="section-padding py-20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-ivory-200 animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-ivory-200 animate-pulse w-3/4" />
              <div className="h-6 bg-ivory-200 animate-pulse w-1/4" />
              <div className="h-32 bg-ivory-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-padding py-20 text-center">
        <p className="text-charcoal-500 text-lg">Product not found.</p>
        <Link to="/shop" className="btn-secondary mt-6">
          Back to Shop
        </Link>
      </div>
    );
  }

  const currentImage = images[selectedImage];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="section-padding pt-8 pb-4">
        <div className="container-luxe flex items-center gap-2 text-sm text-charcoal-500">
          <Link to="/" className="hover:text-forest-700 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-forest-700 transition-colors">Shop</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link to={`/category/${product.category.slug}`} className="hover:text-forest-700 transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-charcoal-700">{product.name}</span>
        </div>
      </div>

      {/* Product Main */}
      <section className="section-padding pb-12 md:pb-20">
        <div className="container-luxe grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-ivory-100 overflow-hidden mb-4 group">
              {currentImage ? (
                <img
                  src={currentImage.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover animate-fade-in"
                  key={selectedImage}
                />
              ) : (
                <div className="w-full h-full bg-ivory-200" />
              )}
              {currentImage && (
                <span className="absolute top-4 right-4 bg-ivory-50/90 px-3 py-1.5 text-xs font-sans uppercase tracking-widest text-charcoal-700">
                  {VIEW_TYPE_LABELS[currentImage.view_type] || currentImage.view_type}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? 'border-forest-600'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.image_url} alt={img.view_type} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:pt-4">
            {product.category && (
              <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-3">
                {product.category.name}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-sans text-forest-700 font-medium mb-4">
              {formatINR(product.price)}
            </p>

            {product.handmade && (
              <div className="inline-flex items-center gap-2 mb-6 text-sm text-forest-600 font-sans">
                <Hand size={16} strokeWidth={1.5} />
                Handmade
              </div>
            )}

            <div className="w-12 h-px bg-gold-400 mb-6" />

            {product.short_description && (
              <p className="text-charcoal-700 font-sans text-base leading-relaxed mb-4 italic">
                {product.short_description}
              </p>
            )}

            <p className="text-charcoal-600 font-sans font-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specs */}
            <div className="space-y-4 mb-8">
              {product.dimensions && (
                <div className="flex items-start gap-3">
                  <Ruler size={18} className="text-forest-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-charcoal-400 mb-0.5">Dimensions</p>
                    <p className="text-sm text-charcoal-700">{product.dimensions}</p>
                  </div>
                </div>
              )}
              {product.material && (
                <div className="flex items-start gap-3">
                  <Package size={18} className="text-forest-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-charcoal-400 mb-0.5">Material</p>
                    <p className="text-sm text-charcoal-700">{product.material}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="mb-6">
              {product.available ? (
                <span className="inline-flex items-center gap-2 text-sm text-forest-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-forest-500" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-charcoal-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-charcoal-400" />
                  Currently Unavailable
                </span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {product.available && (
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <div className="flex items-center border border-ivory-400">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-charcoal-600 hover:text-forest-700 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} strokeWidth={1.5} />
                  </button>
                  <span className="px-6 py-3 text-charcoal-800 font-sans font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-charcoal-600 hover:text-forest-700 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1"
                >
                  {added ? (
                    <>
                      <Check size={18} strokeWidth={2} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} strokeWidth={1.5} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            )}

            <button
              onClick={() => navigate('/shop')}
              className="mt-8 inline-flex items-center gap-2 text-sm text-charcoal-500 hover:text-forest-700 transition-colors"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
              Back to Shop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
