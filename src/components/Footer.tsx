import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-ivory-100 mt-20">
      <div className="container-luxe section-padding py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-3">
              Afn<span className="text-gold-300 font-light">Craft</span>
            </h3>
            <p className="text-ivory-200 text-sm leading-relaxed max-w-xs">
              Crafting Timeless Art. Each piece is handcrafted with devotion,
              blending heritage techniques with contemporary elegance.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 border border-ivory-300 rounded-full flex items-center justify-center hover:bg-gold-400 hover:border-gold-400 hover:text-charcoal-900 transition-all duration-300"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="w-10 h-10 border border-ivory-300 rounded-full flex items-center justify-center hover:bg-gold-400 hover:border-gold-400 hover:text-charcoal-900 transition-all duration-300"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-sans font-medium uppercase tracking-widest text-gold-300 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-ivory-200 text-sm hover:text-gold-300 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/category/wall-art" className="text-ivory-200 text-sm hover:text-gold-300 transition-colors">
                  Wall Art
                </Link>
              </li>
              <li>
                <Link to="/category/home-decor" className="text-ivory-200 text-sm hover:text-gold-300 transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/category/wooden-crafts" className="text-ivory-200 text-sm hover:text-gold-300 transition-colors">
                  Wooden Crafts
                </Link>
              </li>
              <li>
                <Link to="/category/handmade-gifts" className="text-ivory-200 text-sm hover:text-gold-300 transition-colors">
                  Handmade Gifts
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-sans font-medium uppercase tracking-widest text-gold-300 mb-5">
              About
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-ivory-200 text-sm hover:text-gold-300 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ivory-200 text-sm hover:text-gold-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-ivory-200 text-sm hover:text-gold-300 transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-sans font-medium uppercase tracking-widest text-gold-300 mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-ivory-200">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-300 flex-shrink-0" strokeWidth={1.5} />
                <span>hello@afncraft.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-300 flex-shrink-0" strokeWidth={1.5} />
                <span>+44 20 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-gold-300 flex-shrink-0" strokeWidth={1.5} />
                <span>Artisan Studio, London, UK</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-forest-700 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory-300 text-xs tracking-wide">
            © {new Date().getFullYear()} AfnCraft. Crafting Timeless Art. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-ivory-300 text-xs hover:text-gold-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-ivory-300 text-xs hover:text-gold-300 transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
