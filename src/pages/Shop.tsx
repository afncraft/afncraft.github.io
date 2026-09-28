import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Product, Category } from '@/lib/types';
import { getAllProductsWithImages, getCategories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, Search, X } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const selectedCategory = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'default';

  useEffect(() => {
    (async () => {
      try {
        const [p, c] = await Promise.all([getAllProductsWithImages(), getCategories()]);
        setProducts(p);
        setCategories(c);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category?.slug === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return result;
  }, [products, selectedCategory, sortBy, searchQuery]);

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all' || value === 'default') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-800 py-16 md:py-20">
        <div className="container-luxe section-padding text-center">
          <p className="text-gold-300 text-xs font-sans uppercase tracking-[0.3em] mb-3">
            The Collection
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-ivory-50">
            All Products
          </h1>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="section-padding py-6 border-b border-ivory-300 sticky top-20 bg-ivory-50/95 backdrop-blur-md z-30">
        <div className="container-luxe flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal size={18} className="text-charcoal-500" strokeWidth={1.5} />
              <button
                onClick={() => updateParam('category', 'all')}
                className={`text-sm px-4 py-1.5 transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-forest-700 text-ivory-50'
                    : 'text-charcoal-600 hover:text-forest-700'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateParam('category', cat.slug)}
                  className={`text-sm px-4 py-1.5 transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-forest-700 text-ivory-50'
                      : 'text-charcoal-600 hover:text-forest-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" strokeWidth={1.5} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-9 pr-8 py-2 text-sm border border-ivory-400 bg-ivory-50 text-charcoal-700 placeholder-charcoal-400 focus:outline-none focus:border-forest-600 w-48 sm:w-56"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                    aria-label="Clear search"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="text-sm border border-ivory-400 bg-ivory-50 px-4 py-2 text-charcoal-700 focus:outline-none focus:border-forest-600 cursor-pointer"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding py-12 md:py-16">
        <div className="container-luxe">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-ivory-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-charcoal-500 mb-2">
                {searchQuery
                  ? `No products found for "${searchQuery}".`
                  : 'No products found in this category.'}
              </p>
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    updateParam('category', 'all');
                  }}
                  className="text-sm text-forest-700 hover:text-forest-800 underline mt-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm text-charcoal-500 mb-8">
                {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} showButtons />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
