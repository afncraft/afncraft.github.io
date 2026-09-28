import { useCallback, useEffect, useState } from 'react';
import { Lock, LogOut, Package, Plus, ShoppingCart, Tag, Trash2, Pencil, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatINR, getCategories } from '@/lib/products';
import type { Category, Order, Product } from '@/lib/types';

type Tab = 'products' | 'categories' | 'orders';

type ProductForm = {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  category_id: string;
  material: string;
  dimensions: string;
  handmade: boolean;
  available: boolean;
  featured: boolean;
};

const emptyProduct: ProductForm = {
  name: '', slug: '', description: '', short_description: '', price: '',
  category_id: '', material: '', dimensions: '', handmade: true,
  available: true, featured: false,
};

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Admin() {
  const [session, setSession] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [tab, setTab] = useState<Tab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [productForm, setProductForm] = useState<ProductForm | null>(null);
  const [categoryForm, setCategoryForm] = useState<{ id?: string; name: string; description: string; image_url: string } | null>(null);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    const [cats, productResult, orderResult] = await Promise.all([
      getCategories(),
      supabase.from('products').select('*, category:categories(*), images:product_images(*)').order('created_at', { ascending: false }),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
    ]);
    setCategories(cats);
    if (productResult.error) throw productResult.error;
    if (orderResult.error) throw orderResult.error;
    setProducts(productResult.data || []);
    setOrders(orderResult.data || []);
  }, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) { setSession(Boolean(data.session)); setChecking(false); }
    });
    const { data } = supabase.auth.onAuthStateChange((_event, authSession) => {
      if (active) setSession(Boolean(authSession));
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (session) loadData().catch((err: unknown) => setError(err instanceof Error ? err.message : 'Unable to load store data.'));
  }, [session, loadData]);

  async function signIn(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setAuthError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setAuthError(signInError.message);
  }

  async function removeProduct(id: string): Promise<void> {
    if (!window.confirm('Delete this product?')) return;
    const { error: deleteError } = await supabase.from('products').delete().eq('id', id);
    if (deleteError) setError(deleteError.message);
    else loadData();
  }

  async function removeCategory(id: string): Promise<void> {
    if (!window.confirm('Delete this category?')) return;
    const { error: deleteError } = await supabase.from('categories').delete().eq('id', id);
    if (deleteError) setError(deleteError.message);
    else loadData();
  }

  async function updateOrder(id: string, status: string): Promise<void> {
    const { error: updateError } = await supabase.from('orders').update({ status }).eq('id', id);
    if (updateError) setError(updateError.message);
    else loadData();
  }

  if (checking) return <div className="section-padding py-20 text-center text-charcoal-500">Loading...</div>;

  if (!session) {
    return (
      <div className="section-padding py-20 md:py-28">
        <div className="max-w-md mx-auto bg-ivory-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-forest-700 text-ivory-50 flex items-center justify-center"><Lock size={24} /></div>
            <h1 className="text-3xl font-serif font-light">Admin Panel</h1>
            <p className="text-sm text-charcoal-500 mt-2">Sign in to manage your store</p>
          </div>
          <form onSubmit={signIn} className="space-y-4">
            <input className="input-field" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" />
            <input className="input-field" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
            {authError && <p className="text-sm text-red-600 bg-red-50 p-3">{authError}</p>}
            <button className="btn-primary w-full" type="submit">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding py-10">
      <div className="container-luxe">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div><h1 className="text-3xl font-serif font-light">Admin Dashboard</h1><p className="text-sm text-charcoal-500">Manage your AfnCraft store</p></div>
          <button className="btn-secondary" onClick={() => supabase.auth.signOut()}><LogOut size={16} /> Sign Out</button>
        </div>
        <div className="flex gap-2 border-b border-ivory-300 mb-8 overflow-x-auto">
          {([['products', 'Products', Package], ['categories', 'Categories', Tag], ['orders', 'Orders', ShoppingCart]] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 px-5 py-3 border-b-2 whitespace-nowrap ${tab === id ? 'border-forest-700 text-forest-700' : 'border-transparent text-charcoal-500'}`}><Icon size={16} /> {label}</button>
          ))}
        </div>
        {error && <p className="mb-6 bg-red-50 border border-red-200 text-red-600 p-3 text-sm">{error}</p>}
        {tab === 'products' && <Products products={products} onAdd={() => setProductForm(emptyProduct)} onEdit={(product) => setProductForm({ name: product.name, slug: product.slug, description: product.description, short_description: product.short_description || '', price: String(product.price), category_id: product.category_id || '', material: product.material || '', dimensions: product.dimensions || '', handmade: product.handmade, available: product.available, featured: product.featured })} onDelete={removeProduct} />}
        {tab === 'categories' && <Categories categories={categories} onAdd={() => setCategoryForm({ name: '', description: '', image_url: '' })} onEdit={(category) => setCategoryForm({ id: category.id, name: category.name, description: category.description || '', image_url: category.image_url || '' })} onDelete={removeCategory} />}
        {tab === 'orders' && <Orders orders={orders} onUpdate={updateOrder} />}
        {productForm && <ProductModal form={productForm} categories={categories} onChange={setProductForm} onClose={() => setProductForm(null)} onSaved={() => { setProductForm(null); loadData(); }} />}
        {categoryForm && <CategoryModal form={categoryForm} onChange={setCategoryForm} onClose={() => setCategoryForm(null)} onSaved={() => { setCategoryForm(null); loadData(); }} />}
      </div>
    </div>
  );
}

function Products({ products, onAdd, onEdit, onDelete }: { products: Product[]; onAdd: () => void; onEdit: (product: Product) => void; onDelete: (id: string) => void }) {
  return <div><div className="flex justify-between items-center mb-5"><p className="text-sm text-charcoal-500">{products.length} products</p><button className="btn-primary" onClick={onAdd}><Plus size={16} /> Add Product</button></div><div className="space-y-3">{products.map((product) => <div key={product.id} className="bg-ivory-100 p-4 flex items-center gap-4"><div className="w-16 h-16 bg-ivory-200 shrink-0 overflow-hidden">{product.images?.[0] && <img src={product.images[0].image_url} alt={product.name} className="w-full h-full object-cover" />}</div><div className="flex-1 min-w-0"><h3 className="font-serif text-lg truncate">{product.name}</h3><p className="text-sm text-charcoal-500">{formatINR(product.price)} · {product.category?.name || 'Uncategorised'}</p></div><button className="p-2 text-charcoal-500 hover:text-forest-700" onClick={() => onEdit(product)}><Pencil size={17} /></button><button className="p-2 text-charcoal-500 hover:text-red-600" onClick={() => onDelete(product.id)}><Trash2 size={17} /></button></div>)}</div></div>;
}

function Categories({ categories, onAdd, onEdit, onDelete }: { categories: Category[]; onAdd: () => void; onEdit: (category: Category) => void; onDelete: (id: string) => void }) {
  return <div><div className="flex justify-between items-center mb-5"><p className="text-sm text-charcoal-500">{categories.length} categories</p><button className="btn-primary" onClick={onAdd}><Plus size={16} /> Add Category</button></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{categories.map((category) => <div key={category.id} className="bg-ivory-100 p-4"><h3 className="font-serif text-lg">{category.name}</h3><p className="text-sm text-charcoal-500 mt-1">{category.description}</p><div className="flex gap-2 mt-3"><button className="p-2 text-charcoal-500" onClick={() => onEdit(category)}><Pencil size={16} /></button><button className="p-2 text-charcoal-500 hover:text-red-600" onClick={() => onDelete(category.id)}><Trash2 size={16} /></button></div></div>)}</div></div>;
}

function Orders({ orders, onUpdate }: { orders: Order[]; onUpdate: (id: string, status: string) => void }) {
  return <div className="space-y-3">{orders.map((order) => <div key={order.id} className="bg-ivory-100 p-4 flex flex-col sm:flex-row sm:items-center gap-4"><div className="flex-1"><h3 className="font-serif text-lg">{order.customer_name}</h3><p className="text-sm text-charcoal-500">{order.email} · {formatINR(order.total)} · {new Date(order.created_at).toLocaleDateString()}</p></div><select className="input-field w-auto" value={order.status} onChange={(event) => onUpdate(order.id, event.target.value)}><option value="pending">Pending</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select></div>)}</div>;
}

function Modal({ children, title, onClose }: { children: React.ReactNode; title: string; onClose: () => void }) { return <div className="fixed inset-0 z-50 bg-charcoal-900/50 flex items-start justify-center overflow-y-auto p-4 py-8"><div className="bg-ivory-50 w-full max-w-2xl p-6"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-serif">{title}</h2><button onClick={onClose}><X /></button></div>{children}</div></div>; }

function ProductModal({ form, categories, onChange, onClose, onSaved }: { form: ProductForm; categories: Category[]; onChange: (form: ProductForm) => void; onClose: () => void; onSaved: () => void }) {
  const [saving, setSaving] = useState(false);
  async function save(): Promise<void> { setSaving(true); const payload = { ...form, slug: form.slug || slugify(form.name), short_description: form.short_description || null, price: Number(form.price), category_id: form.category_id || null, material: form.material || null, dimensions: form.dimensions || null }; const { error } = await supabase.from('products').upsert(payload); setSaving(false); if (error) alert(error.message); else onSaved(); }
  const set = (key: keyof ProductForm, value: string | boolean) => onChange({ ...form, [key]: value });
  return <Modal title="Product" onClose={onClose}><div className="space-y-4"><input className="input-field" placeholder="Name" value={form.name} onChange={(e) => set('name', e.target.value)} /><input className="input-field" placeholder="Short description" value={form.short_description} onChange={(e) => set('short_description', e.target.value)} /><textarea className="input-field resize-none" rows={4} placeholder="Description" value={form.description} onChange={(e) => set('description', e.target.value)} /><div className="grid sm:grid-cols-2 gap-4"><input className="input-field" type="number" placeholder="Price" value={form.price} onChange={(e) => set('price', e.target.value)} /><select className="input-field" value={form.category_id} onChange={(e) => set('category_id', e.target.value)}><option value="">Uncategorised</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select><input className="input-field" placeholder="Material" value={form.material} onChange={(e) => set('material', e.target.value)} /><input className="input-field" placeholder="Dimensions" value={form.dimensions} onChange={(e) => set('dimensions', e.target.value)} /></div><div className="flex flex-wrap gap-5 text-sm">{(['handmade', 'available', 'featured'] as const).map((key) => <label key={key} className="flex gap-2 items-center"><input type="checkbox" checked={form[key]} onChange={(e) => set(key, e.target.checked)} /> {key}</label>)}</div><div className="flex gap-3"><button className="btn-secondary flex-1" onClick={onClose}>Cancel</button><button className="btn-primary flex-1" disabled={saving} onClick={save}>{saving ? 'Saving...' : 'Save Product'}</button></div></div></Modal>;
}

function CategoryModal({ form, onChange, onClose, onSaved }: { form: { id?: string; name: string; description: string; image_url: string }; onChange: (form: { id?: string; name: string; description: string; image_url: string }) => void; onClose: () => void; onSaved: () => void }) {
  const [saving, setSaving] = useState(false);
  async function save(): Promise<void> { setSaving(true); const payload = { name: form.name, slug: slugify(form.name), description: form.description || null, image_url: form.image_url || null }; const result = form.id ? await supabase.from('categories').update(payload).eq('id', form.id) : await supabase.from('categories').insert(payload); setSaving(false); if (result.error) alert(result.error.message); else onSaved(); }
  return <Modal title="Category" onClose={onClose}><div className="space-y-4"><input className="input-field" placeholder="Name" value={form.name} onChange={(e) => onChange({ ...form, name: e.target.value })} /><textarea className="input-field resize-none" rows={3} placeholder="Description" value={form.description} onChange={(e) => onChange({ ...form, description: e.target.value })} /><input className="input-field" placeholder="Image URL" value={form.image_url} onChange={(e) => onChange({ ...form, image_url: e.target.value })} /><div className="flex gap-3"><button className="btn-secondary flex-1" onClick={onClose}>Cancel</button><button className="btn-primary flex-1" disabled={saving} onClick={save}>{saving ? 'Saving...' : 'Save Category'}</button></div></div></Modal>;
}
