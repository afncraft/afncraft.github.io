import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ArrowRight, Hand, Award, Sparkles, Wrench,
  Star, Quote, Mail, Check,
} from 'lucide-react';
import type { Product, Category } from '@/lib/types';
import { getFeaturedProducts, getCategories, getProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [f, c, all] = await Promise.all([
          getFeaturedProducts(),
          getCategories(),
          getProducts(),
        ]);
        setFeatured(f);
        setCategories(c);
        setBestSellers(all.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSent(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSent(false), 4000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-forest-800">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6611369/pexels-photo-6611369.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Artisan craftsmanship"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-forest-800/50 to-forest-900/70" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-gold-300 text-xs sm:text-sm font-sans uppercase tracking-[0.3em] mb-6 animate-fade-in-down">
            Handcrafted Artisan Collection
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-ivory-50 leading-tight animate-fade-in-up">
            Crafting
            <span className="block font-medium italic text-gold-300 mt-2">
              Timeless Art
            </span>
          </h1>
          <p className="mt-8 text-ivory-200 text-base sm:text-lg font-sans font-light leading-relaxed max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            Each piece is shaped by hand, carrying the soul of traditional
            craftsmanship into your everyday life.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            <Link to="/shop" className="btn-gold">
              Explore Collection
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
            <Link to="/about" className="btn-secondary border-ivory-200 text-ivory-50 hover:bg-ivory-50 hover:text-forest-800">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 1. Featured Collection */}
      <section className="section-padding py-16 md:py-24">
        <div className="container-luxe">
          <div className="text-center mb-12">
            <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-3">
              Curated Selection
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800">
              Featured Collection
            </h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-ivory-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
              {featured.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} showButtons />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-secondary">
              View All Products
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category */}
      <section className="section-padding py-16 md:py-24 bg-ivory-100">
        <div className="container-luxe">
          <div className="text-center mb-12">
            <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-3">
              Browse by Type
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800">
              Shop by Category
            </h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-ivory-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="group relative aspect-[4/5] overflow-hidden img-zoom animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                >
                  {cat.image_url && (
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-center">
                    <h3 className="text-lg sm:text-xl font-serif font-medium text-ivory-50 mb-1">
                      {cat.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-gold-300 text-[10px] sm:text-xs font-sans uppercase tracking-widest group-hover:gap-2.5 transition-all">
                      Explore <ArrowRight size={12} strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Best Sellers */}
      <section className="section-padding py-16 md:py-24">
        <div className="container-luxe">
          <div className="text-center mb-12">
            <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-3">
              Loved by Our Customers
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800">
              Best Sellers
            </h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-ivory-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
              {bestSellers.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} showButtons />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. About AfnCraft */}
      <section className="relative overflow-hidden bg-forest-800">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div className="img-zoom order-2 md:order-1">
            <img
              src="https://images.pexels.com/photos/16303094/pexels-photo-16303094.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Artisan at work"
              className="w-full h-full object-cover min-h-[300px]"
            />
          </div>
          <div className="flex items-center px-6 sm:px-8 md:px-16 py-16 order-1 md:order-2">
            <div className="max-w-md mx-auto md:mx-0">
              <p className="text-gold-300 text-xs font-sans uppercase tracking-[0.3em] mb-4">
                About AfnCraft
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-ivory-50 leading-snug mb-6">
                Handcrafted with attention to every detail
              </h2>
              <div className="w-12 h-px bg-gold-400 mb-6" />
              <p className="text-ivory-200 font-sans font-light leading-relaxed mb-8">
                AfnCraft creates handcrafted artistic products with a deep
                commitment to traditional craftsmanship. Every piece — from
                marble inlay boxes to handwoven wall art — is shaped by
                skilled artisans who pour their expertise and passion into
                each creation. We believe that true beauty lies in the
                imperfections of the handmade, and that objects crafted with
                care carry a warmth that lasts for generations.
              </p>
              <Link to="/about" className="btn-gold">
                Read Our Story
                <ArrowRight size={18} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose AfnCraft */}
      <section className="section-padding py-16 md:py-24">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-3">
              The AfnCraft Difference
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800">
              Why Choose AfnCraft
            </h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Hand, title: 'Handmade', desc: 'Every piece is crafted entirely by hand by skilled artisans.' },
              { icon: Award, title: 'Premium Quality', desc: 'We use only the finest natural materials, built to last.' },
              { icon: Sparkles, title: 'Unique Designs', desc: 'No two pieces are alike — each one is a one-of-a-kind creation.' },
              { icon: Wrench, title: 'Carefully Crafted', desc: 'Traditional techniques refined over generations of expertise.' },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="w-16 h-16 mx-auto mb-5 border border-gold-400 rounded-full flex items-center justify-center text-forest-700 hover:bg-gold-400 transition-colors duration-300">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-medium text-charcoal-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal-500 text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <section className="section-padding py-16 md:py-24 bg-ivory-100">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-3">
              What Our Customers Say
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800">
              Customer Reviews
            </h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'Sarah M.',
                location: 'London, UK',
                text: 'The marble inlay jewellery box is absolutely stunning. The craftsmanship is incredible — you can see and feel the difference of something made by hand. It\'s now the centrepiece of my dressing table.',
              },
              {
                name: 'James T.',
                location: 'Manchester, UK',
                text: 'I bought the woven wall panel as a gift and it exceeded all expectations. The colours, the texture, the quality — everything about it feels special. AfnCraft has a customer for life.',
              },
              {
                name: 'Priya K.',
                location: 'Birmingham, UK',
                text: 'The brass incense burner is beautifully made and looks so elegant in my home. Delivery was quick and the packaging showed real care. I\'ve already ordered two more pieces.',
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-ivory-50 p-8 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <Quote size={32} className="text-gold-400 mb-4" strokeWidth={1} />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={16} className="text-gold-400" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-charcoal-600 font-sans font-light leading-relaxed text-sm mb-6">
                  {review.text}
                </p>
                <div className="border-t border-ivory-300 pt-4">
                  <p className="font-serif text-base font-medium text-charcoal-800">{review.name}</p>
                  <p className="text-xs text-charcoal-400">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter / Contact */}
      <section className="section-padding py-16 md:py-24">
        <div className="container-luxe">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 mx-auto mb-6 border border-gold-400 rounded-full flex items-center justify-center text-forest-700">
              <Mail size={26} strokeWidth={1.5} />
            </div>
            <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-3">
              Stay Connected
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800 mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-charcoal-600 font-sans font-light leading-relaxed mb-8">
              Be the first to know about new collections, special offers, and
              stories from our artisans. No spam, just beautiful things.
            </p>

            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="input-field flex-1 text-center sm:text-left"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                {newsletterSent ? (
                  <>
                    <Check size={18} strokeWidth={2} />
                    Subscribed
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            {newsletterSent && (
              <p className="text-forest-600 text-sm mt-4 animate-fade-in">
                Thank you for subscribing! Welcome to the AfnCraft family.
              </p>
            )}

            <div className="mt-10 pt-8 border-t border-ivory-300">
              <p className="text-sm text-charcoal-500 mb-2">
                Prefer to talk? We'd love to hear from you.
              </p>
              <Link to="/contact" className="btn-secondary text-sm py-2.5 px-6">
                Contact Us
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
