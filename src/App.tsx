import { useMemo, useState } from 'react';
import { Menu, X, ShoppingBag, ArrowRight, MessageCircle, MapPin, Phone } from 'lucide-react';

const products = [
  { id: 1, name: 'Handcrafted Inlay Panel', category: 'Inlay Art', price: '₹2,499', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988f5?auto=format&fit=crop&w=900&q=80' },
  { id: 2, name: 'Decorative Craft Piece', category: 'Home Decor', price: '₹1,899', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80' },
  { id: 3, name: 'Traditional Art Panel', category: 'Wall Art', price: '₹3,299', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80' },
];

const logo = `${import.meta.env.BASE_URL}logo.png`;
const phone = '+918279921238';
const displayPhone = '+91 8279921238';

export default function App() {
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const shown = useMemo(() => category === 'All' ? products : products.filter(p => p.category === category), [category]);

  return (
    <div className="site">
      <div className="topbar">Handcrafted with care • Made in India • Agra, Uttar Pradesh</div>

      <header className="header">
        <a className="brand brand-logo" href="#home" aria-label="AfnCraft Home">
          <img src={logo} alt="AfnCraft logo" />
        </a>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">
          {menu ? <X/> : <Menu/>}
        </button>
        <nav className={menu ? 'nav open' : 'nav'}>
          <a href="#home" onClick={()=>setMenu(false)}>Home</a>
          <a href="#shop" onClick={()=>setMenu(false)}>Shop</a>
          <a href="#about" onClick={()=>setMenu(false)}>About</a>
          <a href="#contact" onClick={()=>setMenu(false)}>Contact</a>
        </nav>
        <a className="bag" href="#contact"><ShoppingBag size={21}/><span>Contact</span></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">AfnCraft • Handmade Collection</p>
            <h1>Crafted by hand.<br/><em>Made to last.</em></h1>
            <p className="lead">Welcome to AfnCraft — handcrafted artisan products created with patience, detail and a timeless sense of design. Discover beautiful pieces made to add character to your home.</p>
            <div className="hero-actions">
              <a className="button" href="#shop">Explore Collection <ArrowRight size={17}/></a>
              <a className="text-link" href="#contact">Talk to us</a>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-logo-card">
              <img src={logo} alt="AfnCraft" />
              <p>CRAFTING TIMELESS ART</p>
              <span>Handcrafted artisan products</span>
            </div>
          </div>
        </section>

        <section className="intro">
          <p className="eyebrow">About AfnCraft</p>
          <h2>Handmade art with a timeless touch</h2>
          <p>AfnCraft brings together handcrafted art and decor inspired by traditional craftsmanship. Every piece is presented with care, so your space can carry something unique, detailed and made by hand.</p>
        </section>

        <section className="shop" id="shop">
          <div className="section-head">
            <div><p className="eyebrow">Shop AfnCraft</p><h2>Featured pieces</h2></div>
          </div>
          <div className="filters">{categories.map(c => <button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          <div className="grid">
            {shown.map(p =>
              <article className="product" key={p.id}>
                <div className="product-img">
                  <img src={p.image} alt={p.name} onError={(e) => { e.currentTarget.src = logo; }} />
                </div>
                <div className="product-info"><p>{p.category}</p><h3>{p.name}</h3><strong>{p.price}</strong></div>
              </article>
            )}
          </div>
        </section>

        <section className="about" id="about">
          <div><p className="eyebrow">Why AfnCraft</p><h2>Crafted with detail.<br/>Made with care.</h2></div>
          <p>We believe handmade work has a character that mass-produced pieces cannot replace. AfnCraft focuses on thoughtful design, careful finishing and the human touch behind every creation.</p>
        </section>

        <section className="contact" id="contact">
          <p className="eyebrow">Get in touch</p>
          <h2>Let's talk about your next piece</h2>
          <p>For product enquiries, orders and custom requirements, contact AfnCraft directly.</p>
          <div className="contact-details">
            <a href={`tel:${phone}`}><Phone size={18}/> {displayPhone}</a>
            <span><MapPin size={18}/> Agra, Uttar Pradesh, India</span>
          </div>
          <a className="button dark" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp Us</a>
        </section>
      </main>

      <footer>
        <div className="brand brand-logo"><img src={logo} alt="AfnCraft logo" /></div>
        <p>© 2026 AfnCraft • Handmade with care • Agra, Uttar Pradesh</p>
      </footer>
    </div>
  );
}
