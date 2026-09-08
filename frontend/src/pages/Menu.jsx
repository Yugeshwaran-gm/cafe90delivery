import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';
import MagicBento from '../components/MagicBento';
import { menuItems, categories } from '../data/menuData';
import './Menu.css';

const Menu = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [dietPreference, setDietPreference] = useState("all"); // 'all', 'veg', 'non-veg'

  const getItemQty = (id) => {
    const item = cart.find(i => i.id === id);
    return item ? item.qty : 0;
  };

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const dietMatch = dietPreference === "all" || item.type === dietPreference;
    return categoryMatch && dietMatch;
  });

  return (
    <div className="menu-page">
      <Navbar />
      <div className="menu-container">
        <header className="menu-header">
          <h1 className="menu-title">Our Menu</h1>
          <p className="menu-subtitle">Delicious food for every mood</p>

          <div className="diet-toggle-container glass-panel">
            <button
              className={`diet-btn ${dietPreference === 'all' ? 'active' : ''}`}
              onClick={() => setDietPreference('all')}
            >
              All
            </button>
            <button
              className={`diet-btn veg ${dietPreference === 'veg' ? 'active' : ''}`}
              onClick={() => setDietPreference('veg')}
            >
              <span className="dot veg"></span> Veg
            </button>
            <button
              className={`diet-btn non-veg ${dietPreference === 'non-veg' ? 'active' : ''}`}
              onClick={() => setDietPreference('non-veg')}
            >
              <span className="dot non-veg"></span> Non-Veg
            </button>
          </div>
        </header>

        <div className="category-pills">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <MagicBento
          items={filteredItems}
          glowColor="217, 119, 6"
          textAutoHide={false}
          enableTilt={true}
          enableStars={true}
          renderItem={(item) => {
            const qty = getItemQty(item.id);
            return (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '15px' }}>
                <div style={{ width: '100%', height: '160px', flexShrink: 0, overflow: 'hidden', borderRadius: '12px' }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="food-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.name}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>{item.desc}</p>
                  </div>
                  <div className="food-action" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="price" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>₹{item.price}</span>
                    {qty === 0 ? (
                      <button className="btn-primary add-btn" style={{ padding: '8px 24px' }} onClick={(e) => { e.stopPropagation(); addToCart(item); }}>Add</button>
                    ) : (
                      <div className="qty-selector" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => removeFromCart(item.id)}><Minus size={16} /></button>
                        <span>{qty}</span>
                        <button onClick={() => addToCart(item)}><Plus size={16} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Menu;
