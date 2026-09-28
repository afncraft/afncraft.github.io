// AfnCraft ecommerce storefront
import { useMemo, useState } from 'react';
import { Menu, X, ShoppingBag, ArrowRight, MessageCircle, MapPin, Phone, Plus, Minus, Trash2, Check, ShoppingCart } from 'lucide-react';

type Product = {
  id:number; name:string; category:string; price:number; material:string; description:string; images?:string[];
};

const products:Product[] = [
  {id:1,name:'Handmade Marble Jewellery Box',category:'Jewellery Box',price:4999,material:'Marble • Handmade',description:'Premium handcrafted white marble jewellery box with intricate floral inlay work in blue, green, red and gold. Detailed top, front and side decoration with a soft fabric-lined interior makes it ideal for jewellery, keepsakes and gifting.',images:['marble-box-1.jpg','marble-box-2.jpg','marble-box-3.jpg','marble-box-4.jpg','marble-box-5.jpg','marble-box-6.jpg','marble-box-7.jpg','marble-box-8.jpg']},
  {id:2,name:'Parrot Floral Inlay Jewellery Box',category:'Jewellery Box',price:4499,material:'Marble • Handmade Inlay',description:'Statement handcrafted inlay box featuring a colourful parrot surrounded by flowers and foliage. Rich blue, green, red, white and gold detailing gives this piece a vibrant artisan character.',images:['parrot-box-1.jpg','parrot-box-2.jpg','parrot-box-3.jpg']},
  {id:3,name:'Blue Floral Marble Serving Tray',category:'Marble Décor',price:2999,material:'Marble • Handmade Inlay',description:'Elegant rectangular marble tray decorated with a delicate blue floral inlay pattern. A refined accent for serving, styling a console or coffee table, and gifting.',images:['blue-tray-1.jpg','blue-tray-2.jpg','blue-tray-3.jpg','blue-tray-4.jpg']},
  {id:4,name:'Handcrafted Marble Chess Board',category:'Chess & Games',price:3999,material:'Marble & Wood • Handmade',description:'Classic handcrafted chess board with contrasting natural stone squares set into a wooden presentation box. Designed for both play and display.',images:['chess-board-1.jpg','chess-board-2.jpg','chess-board-3.jpg','chess-board-4.jpg']},
];

const productExtras:Record<number,{story:string;details:string[];care:string}> = {
  1:{
    story:'Inspired by traditional Indian marble inlay craftsmanship, this jewellery box is designed as a small work of art as well as a useful keepsake box. Every floral detail is arranged with patience to give the piece a rich, handcrafted character.',
    details:['Handcrafted white marble body','Detailed floral inlay artwork in multiple colours','Soft-lined interior for jewellery and keepsakes','Elegant piece for dressing tables, shelves and gifting','Natural handmade variations make every piece unique'],
    care:'Wipe gently with a soft, dry cloth. Avoid harsh cleaners, soaking and rough surfaces to preserve the natural marble and inlay finish.'
  },
  2:{
    story:'The colourful parrot motif gives traditional floral inlay a lively character. Carefully arranged stone details create an artistic composition that looks beautiful from different angles and makes the box a memorable gift.',
    details:['Handcrafted marble construction','Parrot and floral inlay artwork','Blue, green, red, white and gold detailing','Useful for jewellery and small keepsakes','Designed for décor, collecting and gifting'],
    care:'Clean with a soft dry or slightly damp cloth. Do not use abrasive products or leave water standing on the marble surface.'
  },
  3:{
    story:'The calm character of white marble is paired with a graceful blue floral composition. This tray is made to work as both a useful serving piece and a decorative accent for a thoughtfully styled home.',
    details:['Natural marble base','Hand-finished blue floral inlay','Rectangular presentation design','Suitable for serving or décor styling','Gift-friendly artisan piece'],
    care:'Handle with both hands when carrying. Wipe spills promptly and use a soft cloth for regular cleaning.'
  },
  4:{
    story:'This chess board brings together the timeless strategy of chess and the visual appeal of handcrafted materials. The contrasting pattern creates a strong centrepiece for a study, living room or games table.',
    details:['Marble and wood construction','Contrasting handcrafted chess pattern','Presentation-style design','Made for play and display','Distinctive gift for chess lovers'],
    care:'Keep dry and wipe with a soft cloth. Avoid direct impact on stone edges and prolonged exposure to moisture.'
  }
};

const money=
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
  const [viewProduct,setViewProduct]=useState<Product|null>(null);
  const [viewIndex,setViewIndex]=useState(0);

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
          <button className="product-img product-image-btn" onClick={()=>{setViewProduct(p);setViewIndex(0)}} aria-label={`View ${p.name}`}><img src={p.images?.[0] ? `${import.meta.env.BASE_URL}products/${p.images[0]}` : logo()} alt={p.name}/><span>VIEW PRODUCT</span></button>
          <div className="product-info"><p>{p.category}</p><h3>{p.name}</h3><small>{p.material}</small><strong>{money(p.price)}</strong><button className="add-btn" onClick={()=>{add(p.id);setCartOpen(true)}}>Add to Cart <ShoppingBag size={16}/></button></div>
        </article>)}</div>
      </section>

      <section className="about" id="about"><div><p className="eyebrow">Why AfnCraft</p><h2>Crafted with detail.<br/>Made with care.</h2></div><p>Every AfnCraft piece is made to bring handcrafted character into your home. For customized requirements, contact us directly.</p></section>
      <section className="contact" id="contact"><p className="eyebrow">Get in touch</p><h2>Let's talk about your next piece</h2><p>For product enquiries, orders and custom requirements, contact AfnCraft directly.</p><div className="contact-details"><a href={`tel:${phone}`}><Phone size={18}/> {displayPhone}</a><span><MapPin size={18}/> Agra, Uttar Pradesh, India</span></div><a className="button dark" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp Us</a></section>
    </main>

    <footer><div className="brand brand-logo"><img src={logo()} alt="AfnCraft"/></div><p>© 2026 AfnCraft • Handmade with care • Agra, Uttar Pradesh</p></footer>

    {viewProduct&&<div className="product-modal product-fullscreen" onClick={()=>setViewProduct(null)}>
      <div className="product-viewer product-full-view" onClick={e=>e.stopPropagation()}>
        <div className="full-view-top">
          <button className="viewer-close" onClick={()=>setViewProduct(null)}><X/><span>Close</span></button>
          <div className="full-view-brand"><img src={logo()} alt="AfnCraft"/></div>
          <button className="page-cart" onClick={()=>{setViewProduct(null);setCartOpen(true)}}><ShoppingBag size={19}/><span>Cart</span>{count>0&&<b>{count}</b>}</button>
        </div>
        <div className="full-view-body">
          <section className="viewer-gallery">
            <div className="viewer-main">
              <img src={viewProduct.images?.[viewIndex] ? `${import.meta.env.BASE_URL}products/${viewProduct.images[viewIndex]}` : logo()} alt={viewProduct.name}/>
              <button className="viewer-prev" onClick={()=>setViewIndex(i=>i<=0?(viewProduct.images?.length||1)-1:i-1)}>‹</button>
              <button className="viewer-next" onClick={()=>setViewIndex(i=>i>=(viewProduct.images?.length||1)-1?0:i+1)}>›</button>
              <span className="image-count">{viewIndex+1} / {viewProduct.images?.length||1}</span>
            </div>
            <div className="viewer-thumbs">{(viewProduct.images||[]).map((img,i)=><button key={img} className={i===viewIndex?'selected':''} onClick={()=>setViewIndex(i)}><img src={`${import.meta.env.BASE_URL}products/${img}`} alt={`View ${i+1}`}/></button>)}</div>
          </section>
          <section className="viewer-info rich-product-info">
            <p className="eyebrow">{viewProduct.category}</p>
            <h1>{viewProduct.name}</h1>
            <div className="detail-price">{money(viewProduct.price)}</div>
            <div className="detail-material">{viewProduct.material}</div>
            <p className="detail-description">{viewProduct.description}</p>
            <div className="viewer-actions">
              <button className="button" onClick={()=>{add(viewProduct.id);setViewProduct(null);setCartOpen(true)}}><ShoppingBag size={17}/> Add to Cart</button>
              <a className="whatsapp-button" href={`https://wa.me/${phone}?text=${encodeURIComponent('Hello AfnCraft, I am interested in: '+viewProduct.name+' — '+money(viewProduct.price))}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp Enquiry</a>
            </div>
            <div className="detail-sections">
              <div><h3>Product Story</h3><p>{productExtras[viewProduct.id].story}</p></div>
              <div><h3>Product Details</h3><ul>{productExtras[viewProduct.id].details.map(item=><li key={item}>{item}</li>)}</ul></div>
              <div><h3>Care & Maintenance</h3><p>{productExtras[viewProduct.id].care}</p></div>
              <div><h3>Handmade Note</h3><p>Each piece is handcrafted. Small variations in colour, stone pattern and finish can occur naturally. These differences are part of the character and individuality of handmade marble work.</p></div>
            </div>
          </section>
        </div>
        <section className="detail-bottom"><p className="eyebrow">AfnCraft • Handmade Collection</p><h2>Made slowly. Meant to be treasured.</h2><p>For custom requirements, bulk enquiries or product questions, contact AfnCraft directly.</p></section>
      </div>
    </div>}

    {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}>
      <div className="drawer-head"><div><p className="eyebrow">AfnCraft</p><h2>Your Cart</h2></div><button onClick={()=>setCartOpen(false)}><X/></button></div>
      {!cartItems.length?<div className="empty"><ShoppingBag size={42}/><p>Your cart is empty.</p><button className="button" onClick={()=>{setCartOpen(false);document.getElementById('shop')?.scrollIntoView()}}>Browse Products</button></div>:
      <><div className="cart-items">{cartItems.map(p=><div className="cart-item" key={p.id}><img src={`${import.meta.env.BASE_URL}products/${p.images?.[0]||""}`} alt={p.name}/><div className="cart-item-info"><h3>{p.name}</h3><strong>{money(p.price)}</strong><div className="qty"><button onClick={()=>remove(p.id)}><Minus size={14}/></button><span>{p.qty}</span><button onClick={()=>add(p.id)}><Plus size={14}/></button><button className="trash" onClick={()=>setCart(c=>{const n={...c};delete n[p.id];return n})}><Trash2 size={15}/></button></div></div></div>)}</div>
      <div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><div className="drawer-actions"><button className="clear" onClick={clearCart}>Clear Cart</button><button className="button" onClick={()=>setCheckout(true)}>Place Order <ArrowRight size={16}/></button></div></>}
      {checkout&&<div className="checkout"><div className="checkout-head"><h2>Place Order</h2><button onClick={()=>setCheckout(false)}><X/></button></div>{placed?<div className="success"><Check size={40}/><h3>Order details opened in WhatsApp</h3><p>WhatsApp me aapka order message open ho gaya hai. Send karke order confirm karein.</p><button className="button" onClick={()=>{setCheckout(false);setCartOpen(false)}}>Done</button></div>:<><p className="checkout-note">Apni details fill karein. Order WhatsApp par confirmation ke liye open hoga.</p><input placeholder="Full Name" value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})}/><input placeholder="Phone Number" value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})}/><textarea placeholder="Delivery Address" rows={4} value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})}/><div className="checkout-total">Order Total <strong>{money(total)}</strong></div><button className="button place-full" onClick={placeOrder}>Place Order on WhatsApp <MessageCircle size={17}/></button></>}</div>}
    </aside></div>}
  </div>
}
