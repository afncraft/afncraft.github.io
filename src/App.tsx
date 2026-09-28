import { useMemo, useState } from 'react';
import { Menu, X, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';

const products = [
  { id: 1, name: 'Handcrafted Inlay Panel', category: 'Inlay Art', price: '₹2,499', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988f5?auto=format&fit=crop&w=900&q=80' },
  { id: 2, name: 'Decorative Craft Piece', category: 'Home Decor', price: '₹1,899', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80' },
  { id: 3, name: 'Traditional Art Panel', category: 'Wall Art', price: '₹3,299', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80' },
];

export default function App() {
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const shown = useMemo(() => category === 'All' ? products : products.filter(p => p.category === category), [category]);

  return (
    <div className="site">
      <div className="topbar">Handcrafted with care • Made in India</div>
      <header className="header">
        <a className="brand" href="#home">Afn<span>Craft</span></a>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button>
        <nav className={menu ? 'nav open' : 'nav'}>
          <a href="#home" onClick={()=>setMenu(false)}>Home</a>
          <a href="#shop" onClick={()=>setMenu(false)}>Shop</a>
          <a href="#about" onClick={()=>setMenu(false)}>About</a>
          <a href="#contact" onClick={()=>setMenu(false)}>Contact</a>
        </nav>
        <a className="bag" href="#shop"><ShoppingBag size={21}/><span>Shop</span></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">AfnCraft • Handmade Collection</p>
            <h1>Crafted by hand.<br/><em>Made to last.</em></h1>
            <p className="lead">Discover thoughtfully crafted pieces that bring traditional artistry and modern elegance into your space.</p>
            <a className="button" href="#shop">Explore Collection <ArrowRight size={17}/></a>
          </div>
          <div className="hero-art">
            <div className="hero-card">
              <span>AFN</span>
              <strong>CRAFT</strong>
              <small>Handmade • Unique • Timeless</small>
            </div>
          </div>
        </section>

        <section className="intro">
          <p className="eyebrow">Our collection</p>
          <h2>Objects with a story</h2>
          <p>Every AfnCraft piece is selected and presented with attention to detail, character and craftsmanship.</p>
        </section>

        <section className="shop" id="shop">
          <div className="section-head"><div><p className="eyebrow">Shop AfnCraft</p><h2>Featured pieces</h2></div></div>
          <div className="filters">{categories.map(c => <button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          <div className="grid">{shown.map(p =>
            <article className="product" key={p.id}>
              <div className="product-img"><img src={p.image} alt={p.name}/></div>
              <div className="product-info"><p>{p.category}</p><h3>{p.name}</h3><strong>{p.price}</strong></div>
            </article>
          )}</div>
        </section>

        <section className="about" id="about">
          <div><p className="eyebrow">About AfnCraft</p><h2>Simple design.<br/>Beautiful craftsmanship.</h2></div>
          <p>AfnCraft is a home for handcrafted art and decor. We believe the small details, human touch and character of handmade work deserve a place in everyday spaces.</p>
        </section>

        <section className="contact" id="contact">
          <p className="eyebrow">Get in touch</p><h2>Have a question?</h2>
          <p>For product enquiries and orders, message us directly.</p>
          <a className="button dark" href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp Us</a>
        </section>
      </main>
      <footer><div className="brand">Afn<span>Craft</span></div><p>© 2026 AfnCraft. Handmade with care.</p></footer>
    </div>
  );
}