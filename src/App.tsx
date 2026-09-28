// AfnCraft ecommerce storefront
import { useMemo, useState } from 'react';
import { Menu, X, ShoppingBag, ArrowRight, MessageCircle, MapPin, Phone, Plus, Minus, Trash2, Check, ShoppingCart } from 'lucide-react';

type Product = {
  id:number; name:string; category:string; price:number; material:string; description:string;
};

const products:Product[] = [
  {id:1,name:'Handmade Marble Jewellery Box',category:'Jewellery Box',price:3999,material:'Marble • Handmade',description:'Premium handmade marble jewellery box with detailed artisan finishing.'},
  {id:2,name:'Marble Elephant',category:'Marble Handicrafts',price:2999,material:'Marble • Handmade',description:'Elegant handcrafted marble elephant, made as a timeless décor piece.'},
  {id:3,name:'Marble & Wood Chess Box',category:'Chess Box',price:2499,material:'Marble & Wood • Handmade',description:'Handcrafted marble and wood chess box designed for display and play.'},
  {id:4,name:'Handmade Marble Plate',category:'Marble Décor',price:1999,material:'Marble • Handmade',description:'Decorative handmade marble plate with a refined artisan finish.'},
  {id:5,name:'Handmade Marble Cup Cover',category:'Marble Décor',price:1499,material:'Marble • Handmade',description:'Compact handcrafted marble cup cover made for elegant everyday décor.'},
  {id:6,name:'Handmade Marble Jewellery Box',category:'Jewellery Box',price:2999,material:'Marble • Handmade',description:'Beautiful handmade marble jewellery box with a classic handcrafted look.'},
  {id:7,name:'Handmade Marble Jewellery Box',category:'Jewellery Box',price:1999,material:'Marble • Handmade',description:'A smaller handmade marble jewellery box, ideal for gifting and personal use.'},
  {id:8,name:'Custom Marble Name Plaque',category:'Customized Décor',price:2599,material:'Premium Marble • Handmade',description:'Customizable marble plaque with your name or logo and blue, green and gold stone detailing.'},
];

const money=(n:number)=>'₹'+n.toLocaleString('en-IN');
const phone='+918279921238';
const displayPhone='+91 8279921238';
const logo=()=>`${import.meta.env.BASE_URL}afncraft-logo.jpg`;

export default function App(){
  const [menu,setMenu]=useState(false);
  const [category,setCategory]=useState('All');
  const [cart,setCart]=useState<Record<number,number>>({});
  const [cartOpen,setCartOpen]=useState(false);
  const [checkout,setCheckout]=useState(false);
  const [placed,setPlaced]=useState(false);
  const [customer,setCustomer]=useState({name:'',phone:'',address:''});

  const categories=['All',...Array.from(new Set(products.map(p=>p.category)))];
  const shown=useMemo(()=>category==='All'?products:products.filter(p=>p.category===category),[category]);
  const cartItems=products.filter(p=>cart[p.id]).map(p=>({...p,qty:cart[p.id]}));
  const count=cartItems.reduce((s,p)=>s+p.qty,0);
  const total=cartItems.reduce((s,p)=>s+p.price*p.qty,0);

  const add=(id:number)=>setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const remove=(id:number)=>setCart(c=>{const n={...c}; if((n[id]||0)<=1) delete n[id]; else n[id]--; return n;});
  const clearCart=()=>setCart({});
  const orderText=()=>[
    'AfnCraft Order',
    ...cartItems.map(p=>`${p.name} x ${p.qty} = ${money(p.price*p.qty)}`),
    `Total: ${money(total)}`,
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address}`
  ].join('\\n');

  const placeOrder=()=>{
    if(!customer.name.trim()||!customer.phone.trim()||!customer.address.trim()||!cartItems.length)return;
    setPlaced(true);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(orderText())}`,'_blank');
  };

  return <div className="site">
    <div className="topbar">Handcrafted with care • Made in India • Agra, Uttar Pradesh</div>
    <header className="header">
      <a className="brand brand-logo" href="#home"><img src={logo()} alt="AfnCraft"/></a>
      <button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?<X/>:<Menu/>}</button>
      <nav className={menu?'nav open':'nav'}>
        <a href="#home" onClick={()=>setMenu(false)}>Home</a><a href="#shop" onClick={()=>setMenu(false)}>Shop</a><a href="#about" onClick={()=>setMenu(false)}>About</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a>
      </nav>
      <button className="bag" onClick={()=>setCartOpen(true)}><ShoppingBag size={21}/><span>Cart</span>{count>0&&<b>{count}</b>}</button>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy"><p className="eyebrow">AfnCraft • Handmade Collection</p><h1>Crafted by hand.<br/><em>Made to last.</em></h1>
        <p className="lead">Welcome to AfnCraft — handcrafted artisan products created with patience, detail and a timeless sense of design.</p>
        <div className="hero-actions"><a className="button" href="#shop">Explore Collection <ArrowRight size={17}/></a><a className="text-link" href="#contact">Talk to us</a></div></div>
        <div className="hero-art"><div className="hero-logo-card"><img src={logo()} alt="AfnCraft - Crafting Timeless Art"/></div></div>
      </section>

      <section className="intro"><p className="eyebrow">About AfnCraft</p><h2>Handmade art with a timeless touch</h2><p>Discover marble handicrafts, jewellery boxes, décor pieces and custom creations made with traditional craftsmanship.</p></section>

      <section className="shop" id="shop">
        <div className="section-head"><div><p className="eyebrow">Shop AfnCraft</p><h2>Our Collection</h2></div><button className="cart-shop-btn" onClick={()=>setCartOpen(true)}><ShoppingCart size={18}/> Cart {count>0&&`(${count})`}</button></div>
        <div className="filters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
        <div className="grid">{shown.map(p=><article className="product" key={p.id}>
          <div className="product-img"><img src={logo()} alt={p.name}/><span>AFNCRAFT</span></div>
          <div className="product-info"><p>{p.category}</p><h3>{p.name}</h3><small>{p.material}</small><strong>{money(p.price)}</strong><button className="add-btn" onClick={()=>{add(p.id);setCartOpen(true)}}>Add to Cart <ShoppingBag size={16}/></button></div>
        </article>)}</div>
      </section>

      <section className="about" id="about"><div><p className="eyebrow">Why AfnCraft</p><h2>Crafted with detail.<br/>Made with care.</h2></div><p>Every AfnCraft piece is made to bring handcrafted character into your home. For customized requirements, contact us directly.</p></section>
      <section className="contact" id="contact"><p className="eyebrow">Get in touch</p><h2>Let's talk about your next piece</h2><p>For product enquiries, orders and custom requirements, contact AfnCraft directly.</p><div className="contact-details"><a href={`tel:${phone}`}><Phone size={18}/> {displayPhone}</a><span><MapPin size={18}/> Agra, Uttar Pradesh, India</span></div><a className="button dark" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp Us</a></section>
    </main>

    <footer><div className="brand brand-logo"><img src={logo()} alt="AfnCraft"/></div><p>© 2026 AfnCraft • Handmade with care • Agra, Uttar Pradesh</p></footer>

    {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}>
      <div className="drawer-head"><div><p className="eyebrow">AfnCraft</p><h2>Your Cart</h2></div><button onClick={()=>setCartOpen(false)}><X/></button></div>
      {!cartItems.length?<div className="empty"><ShoppingBag size={42}/><p>Your cart is empty.</p><button className="button" onClick={()=>{setCartOpen(false);document.getElementById('shop')?.scrollIntoView()}}>Browse Products</button></div>:
      <><div className="cart-items">{cartItems.map(p=><div className="cart-item" key={p.id}><img src={logo()} alt=""/><div className="cart-item-info"><h3>{p.name}</h3><strong>{money(p.price)}</strong><div className="qty"><button onClick={()=>remove(p.id)}><Minus size={14}/></button><span>{p.qty}</span><button onClick={()=>add(p.id)}><Plus size={14}/></button><button className="trash" onClick={()=>setCart(c=>{const n={...c};delete n[p.id];return n})}><Trash2 size={15}/></button></div></div></div>)}</div>
      <div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><div className="drawer-actions"><button className="clear" onClick={clearCart}>Clear Cart</button><button className="button" onClick={()=>setCheckout(true)}>Place Order <ArrowRight size={16}/></button></div></>}
      {checkout&&<div className="checkout"><div className="checkout-head"><h2>Place Order</h2><button onClick={()=>setCheckout(false)}><X/></button></div>{placed?<div className="success"><Check size={40}/><h3>Order details opened in WhatsApp</h3><p>WhatsApp me aapka order message open ho gaya hai. Send karke order confirm karein.</p><button className="button" onClick={()=>{setCheckout(false);setCartOpen(false)}}>Done</button></div>:<><p className="checkout-note">Apni details fill karein. Order WhatsApp par confirmation ke liye open hoga.</p><input placeholder="Full Name" value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})}/><input placeholder="Phone Number" value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})}/><textarea placeholder="Delivery Address" rows={4} value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})}/><div className="checkout-total">Order Total <strong>{money(total)}</strong></div><button className="button place-full" onClick={placeOrder}>Place Order on WhatsApp <MessageCircle size={17}/></button></>}</div>}
    </aside></div>}
  </div>
}
