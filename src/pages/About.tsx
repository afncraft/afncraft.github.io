import { Link } from 'react-router-dom';
import { ArrowRight, Hand, Leaf, Award, Heart, Globe, Users } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-forest-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/28867408/pexels-photo-28867408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Artisan craftsmanship"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-forest-900/50" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <p className="text-gold-300 text-xs font-sans uppercase tracking-[0.3em] mb-4 animate-fade-in-down">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-ivory-50 animate-fade-in-up">
            About AfnCraft
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding py-20 md:py-28">
        <div className="container-luxe max-w-3xl mx-auto">
          <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-4 text-center">
            The Beginning
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800 text-center mb-8">
            A journey rooted in craftsmanship
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mb-10" />
          <div className="space-y-6 text-charcoal-600 font-sans font-light leading-relaxed text-lg">
            <p>
              AfnCraft was born from a simple belief: that objects made by hand
              carry a soul that factory-made things can never replicate. What
              began as a personal passion for traditional craftsmanship has
              grown into a curated collection of handmade artisan products —
              each one a celebration of patience, precision, and heritage.
            </p>
            <p>
              Our journey starts with marble inlay jewellery boxes, decorative
              boxes, wall art, and plates — each piece shaped and finished by
              skilled artisans who have spent years, sometimes decades,
              perfecting their craft. We work with natural materials: marble,
              wood, brass, and semi-precious stones, sourcing them with care
              for both quality and sustainability.
            </p>
            <p>
              At AfnCraft, we don't just sell products. We share stories. The
              story of the artisan whose hands shaped the marble. The story of
              the inlay pattern passed down through generations. The story of a
              piece that will be treasured for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* Image split */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="img-zoom aspect-[4/3] md:aspect-auto">
          <img
            src="https://images.pexels.com/photos/22823/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Pottery wheel"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="img-zoom aspect-[4/3] md:aspect-auto">
          <img
            src="https://images.pexels.com/photos/8063880/pexels-photo-8063880.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Hands crafting"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="section-padding py-20 md:py-28 bg-ivory-100">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs font-sans uppercase tracking-[0.3em] mb-3">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Hand, title: 'Handmade Excellence', desc: 'Every product is crafted entirely by hand. No machines, no shortcuts — just the skill and devotion of our artisans.' },
              { icon: Leaf, title: 'Natural & Sustainable', desc: 'We use natural materials and traditional techniques that respect both the environment and the craft.' },
              { icon: Award, title: 'Heritage Techniques', desc: 'We preserve and celebrate traditional inlay, carving, and weaving methods passed down through generations.' },
              { icon: Heart, title: 'Made with Passion', desc: 'Each piece is created with love and care, ensuring you receive something truly special.' },
              { icon: Globe, title: 'Ethically Sourced', desc: 'Our materials are responsibly sourced, and our artisans are fairly compensated for their skill and time.' },
              { icon: Users, title: 'Artisan Community', desc: 'We work directly with skilled craftspeople, supporting their livelihoods and preserving their craft.' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-ivory-50 p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="w-14 h-14 mx-auto mb-5 border border-gold-400 rounded-full flex items-center justify-center text-forest-700">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-medium text-charcoal-800 mb-3">
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

      {/* CTA */}
      <section className="section-padding py-20 md:py-28">
        <div className="container-luxe text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-charcoal-800 mb-6">
            Explore our handcrafted collection
          </h2>
          <p className="text-charcoal-600 font-sans font-light leading-relaxed mb-10">
            Each piece is a work of art, waiting to become part of your story.
          </p>
          <Link to="/shop" className="btn-primary">
            Shop Now
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}
