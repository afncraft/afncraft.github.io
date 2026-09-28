import { Link, useLocation } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatINR } from '@/lib/products';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <section className="bg-forest-800 py-16">
          <div className="container-luxe section-padding text-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-ivory-50">
              Your Cart
            </h1>
          </div>
        </section>

        <section className="section-padding py-20 md:py-28">
          <div className="container-luxe text-center max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-8 border border-ivory-400 rounded-full flex items-center justify-center text-charcoal-400">
              <ShoppingBag size={36} strokeWidth={1} />
            </div>
            <h2 className="text-2xl font-serif font-light text-charcoal-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-charcoal-500 font-sans font-light mb-8">
              Discover our handcrafted collection and find something timeless.
            </p>
            <Link to="/shop" className="btn-primary">
              Explore Products
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-forest-800 py-16">
        <div className="container-luxe section-padding text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-ivory-50">
            Your Cart
          </h1>
          <p className="text-ivory-200 text-sm mt-3">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </section>

      <section className="section-padding py-12 md:py-16">
        <div className="container-luxe grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <div
                key={item.product_id}
                className="flex gap-4 bg-ivory-100 p-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                <Link to={`/product/${item.slug}`} className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-ivory-200 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal-800 hover:text-forest-700 transition-colors truncate">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-charcoal-500 mt-1">
                      {formatINR(item.price)} each
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-ivory-400">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="px-3 py-1.5 text-charcoal-600 hover:text-forest-700 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-sans font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="px-3 py-1.5 text-charcoal-600 hover:text-forest-700 transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-charcoal-800 font-sans font-medium text-sm sm:text-base">
                        {formatINR(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-charcoal-400 hover:text-charcoal-700 transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-charcoal-500 hover:text-charcoal-700 transition-colors pt-2"
            >
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-ivory-100 p-6 md:p-8 sticky top-24">
              <h2 className="font-serif text-xl font-medium text-charcoal-800 mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span className="text-charcoal-600">{item.name} × {item.quantity}</span>
                    <span className="text-charcoal-700">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-ivory-300 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-500">Subtotal</span>
                  <span className="text-charcoal-700">{formatINR(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-500">Shipping</span>
                  <span className="text-charcoal-500">Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-ivory-300 mt-4 pt-4 flex justify-between items-baseline">
                <span className="font-serif text-lg text-charcoal-800">Total</span>
                <span className="font-sans text-xl font-medium text-forest-700">
                  {formatINR(totalPrice)}
                </span>
              </div>
              <Link to="/checkout" className="btn-primary w-full mt-6">
                Proceed to Checkout
                <ArrowRight size={18} strokeWidth={1.5} />
              </Link>
              <Link
                to="/shop"
                className="block text-center text-sm text-charcoal-500 hover:text-forest-700 transition-colors mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
