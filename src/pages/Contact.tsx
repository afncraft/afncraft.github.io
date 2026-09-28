import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-forest-800 py-16 md:py-20">
        <div className="container-luxe section-padding text-center">
          <p className="text-gold-300 text-xs font-sans uppercase tracking-[0.3em] mb-3">
            We'd Love to Hear From You
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-ivory-50">
            Contact AfnCraft
          </h1>
        </div>
      </section>

      <section className="section-padding py-16 md:py-24">
        <div className="container-luxe grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-charcoal-800 mb-6">
              Get in Touch
            </h2>
            <p className="text-charcoal-600 font-sans font-light leading-relaxed mb-10">
              Whether you have a question about a product, a custom request, or
              simply want to say hello — we're always happy to hear from you.
              Reach out and we'll get back to you within 48 hours.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@afncraft.com' },
                { icon: Phone, label: 'Phone', value: '+44 20 1234 5678' },
                { icon: MapPin, label: 'Studio', value: 'Artisan Studio, London, UK' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-gold-400 rounded-full flex items-center justify-center text-forest-700 flex-shrink-0">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-charcoal-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-charcoal-700 font-sans">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-ivory-100 border-l-4 border-gold-400">
              <p className="text-sm text-charcoal-600 font-sans font-light leading-relaxed">
                <span className="font-medium text-forest-700">Studio Hours:</span>
                <br />
                Monday – Friday: 9am – 6pm
                <br />
                Saturday: 10am – 4pm
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-ivory-100 p-8 md:p-10">
            <h2 className="text-2xl font-serif font-light text-charcoal-800 mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-sans uppercase tracking-widest text-charcoal-500 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                {sent ? (
                  <>
                    <Check size={18} strokeWidth={2} />
                    Message Sent
                  </>
                ) : (
                  <>
                    <Send size={18} strokeWidth={1.5} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
