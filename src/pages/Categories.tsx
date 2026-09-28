import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Category, Product } from '@/lib/types';
import { getCategories, getCategoryBySlug, getProductsByCategory, getAllProductsWithImages } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function Categories() {
  const { slug } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);

        if (slug) {
          const cat = await getCategoryBySlug(slug);
          setActiveCategory(cat);
          if (cat) {
            const prods = await getProductsByCategory(cat.id);
            setProducts(prods);
          }
        } else {
          setActiveCategory(null);
          const allProducts = await getAllProductsWithImages();
          setProducts(allProducts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-800 py-16 md:py-20">
        <div className="container-luxe section-padding text-center">
          <p className="text-gold-300 text-xs font-sans uppercase tracking-[0.3em] mb-3">
            Explore Our Range
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-ivory-50">
            {activeCategory ? activeCategory.name : 'Product Categories'}
          </h1>
          {activeCategory?.description && (
            <p className="text-ivory-200 font-sans font-light mt-4 max-w-xl mx-auto">
              {activeCategory.description}
            </p>
          )}
        </div>
      </section>

      {/* Category grid when no slug */}
      {!slug && (
        <section className="section-padding py-12 md:py-16">
          <div className="container-luxe">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="aspect-[4/3] bg-ivory-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, i) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="group relative aspect-[4/3] overflow-hidden img-zoom animate-fade-in-up"
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
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl sm:text-2xl font-serif font-medium text-ivory-50 mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-ivory-200 text-sm font-light line-clamp-2 mb-2">
                        {cat.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-gold-300 text-xs font-sans uppercase tracking-widest group-hover:gap-3 transition-all">
                        Explore <ArrowRight size={14} strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Products in selected category */}
      {slug && (
        <section className="section-padding py-12 md:py-16">
          <div className="container-luxe">
            <div className="mb-8">
              <Link to="/categories" className="text-sm text-charcoal-500 hover:text-forest-700 transition-colors">
                ← All Categories
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-ivory-200 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <p className="text-center text-charcoal-500 py-20">
                No products in this category yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
