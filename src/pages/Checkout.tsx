import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { supabase } from '@/lib/supabase';
import { formatINR } from '@/lib/products';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    customer_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'United Kingdom',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('orders').insert({
        customer_name: form.customer_name,
        email: form.email,
        phone: form.phone || null,
        address: form.address,
        city: form.city,
        postal_code: form.postal_code || null,
        country: form.country,
        items: items.map((i) => ({
          product_id: i.product_id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        total: totalPrice,
        status: 'pending',
      });

      if (insertError) throw insertError;

      setSuccess(true);
      clearCart();
      setTimeout(() => navigate('/'), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="section-padding py-20 md:py-28">
        <div className="container-luxe text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-8 bg-forest-700 rounded-full flex items-center justify-center text-ivory-50 animate-scale-in">
            <Check size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-serif font-light text-charcoal-800 mb-4">
            Order Placed Successfully
          </h1>
          <p className="text-charcoal-600 font-sans font-light leading-relaxed mb-2">
            Thank you for your order. We'll send a confirmation to your email shortly.
          </p>
          <p className="text-sm text-charcoal-400">Redirecting you home...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section-padding py-20 text-center">
        <p className="text-charcoal-500 text-lg mb-6">Your cart is empty.</p>
        <Link to="/shop" className="btn-secondary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-forest-800 py-16">
        <div className="container-luxe section-padding text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-ivory-50">
            Checkout
          </h1>
        </div>
      </section>

      <section className="section-padding py-12 md:py-16">
        <div className="container-luxe grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-medium text-charcoal-800 mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.customer_name}
                      onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl font-medium text-charcoal-800 mb-4">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={form.postal_code}
                      onChange={(e) => setForm({ ...form, postal_code: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-3 border border-red-200">
                  {error}
                </p>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-ivory-100 p-6 md:p-8 sticky top-24">
              <h2 className="font-serif text-xl font-medium text-charcoal-800 mb-6">
                Your Order
              </h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product_id} className="flex gap-3">
                    <div className="w-14 h-14 bg-ivory-200 flex-shrink-0 overflow-hidden">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-charcoal-700 truncate">{item.name}</p>
                      <p className="text-xs text-charcoal-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-charcoal-700 font-medium">
                      {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-ivory-300 pt-4 flex justify-between items-baseline">
                <span className="font-serif text-lg text-charcoal-800">Total</span>
                <span className="font-sans text-xl font-medium text-forest-700">
                  {formatINR(totalPrice)}
                </span>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-charcoal-400">
                <Lock size={14} strokeWidth={1.5} />
                <span>Secure checkout. Your information is protected.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
