import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MagicBento from '../components/MagicBento';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ShoppingCart, Search, LogOut, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { menuItems, categories } from '../data/menuData';
import './Dashboard.css';
import './Menu.css';


// ── Component ─────────────────────────────────────────────────────────────────

const CustomerDashboard = () => {
  const { cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [dietPreference, setDietPreference] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({ name: "Customer" });
  const [activeView, setActiveView] = useState("menu");
  const deliveryFee = 30;
  const [location, setLocation] = useState(null);
  const [landmark, setLandmark] = useState("");
  const [savedLocation, setSavedLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'location'
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) { navigate("/login/customer"); return; }
    try { 
      const userData = JSON.parse(stored);
      setUser(userData); 
      if (userData.lastLocation) setSavedLocation(userData.lastLocation);
    } catch { navigate("/login/customer"); }
  }, [navigate]);

  const getItemQty = (id) => {
    const item = cart.find(i => i.id === id);
    return item ? item.qty : 0;
  };

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const dietMatch = dietPreference === "all" || item.type === dietPreference;
    const searchMatch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && dietMatch && searchMatch;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handlePlaceOrder = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          setIsLocating(true);
          try {
            // Use free Nominatim API for reverse geocoding
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            
            if (data && data.address) {
              const street = data.address.road || data.address.suburb || "";
              const area = data.address.neighbourhood || data.address.residential || data.address.city_district || "";
              const cleanAddress = [street, area].filter(Boolean).join(", ");
              setLandmark(cleanAddress || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            } else {
              setLandmark(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            }
          } catch (error) {
            console.error("Reverse geocoding failed:", error);
            setLandmark(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          } finally {
            setIsLocating(false);
            setCheckoutStep('location');
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLocating(false);
          const fallback = { lat: 13.0827, lng: 80.2707 };
          setLocation(fallback);
          if (!landmark) setLandmark("Anna Nagar, Chennai");
          setCheckoutStep('location');
        }
      );
    } else {
      setIsLocating(false);
      setCheckoutStep('location');
    }
  };

  const saveLocation = () => {
    // Save location to user for next time
    const updatedUser = { ...user, lastLocation: location, lastLandmark: landmark };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setSavedLocation(location);

    // Return to cart step instead of placing order
    setCheckoutStep('cart');
  };

  const placeFinalOrder = () => {
    // This actually places the order
    clearCart();
    setCheckoutStep('cart');
    setActiveView('orders');
    alert("Order placed successfully! Tracking your delivery...");
  };

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <Sidebar role="customer" activeView={activeView} onViewChange={setActiveView} />

      {/* ── Main Content ────────────────────────────────────── */}
      <div className="dashboard-main" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Top Bar */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 100
        }}>
          <div className="search-bar glass-panel" style={{ width: 360 }}>
            <Search size={16} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontWeight: 600 }}>Hi, {user.name} 👋</span>
            <button
              style={{ position: 'relative', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => setActiveView(activeView === 'cart' ? 'menu' : 'cart')}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span style={{ background: '#D97706', borderRadius: '50%', width: 20, height: 20, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '8px 14px', color: '#f87171', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

          {/* ── Menu Panel ───────────────────────────────────── */}
          {activeView === 'menu' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
              {/* Diet toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: 4 }}>Our Menu</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {filteredItems.length} items available
                  </p>
                </div>
                <div className="diet-toggle-container glass-panel">
                  <button className={`diet-btn ${dietPreference === 'all' ? 'active' : ''}`} onClick={() => setDietPreference('all')}>All</button>
                  <button className={`diet-btn veg ${dietPreference === 'veg' ? 'active' : ''}`} onClick={() => setDietPreference('veg')}>
                    <span className="dot veg"></span> Veg
                  </button>
                  <button className={`diet-btn non-veg ${dietPreference === 'non-veg' ? 'active' : ''}`} onClick={() => setDietPreference('non-veg')}>
                    <span className="dot non-veg"></span> Non-Veg
                  </button>
                </div>
              </div>

              {/* Category pills */}
              <div className="category-pills" style={{ marginBottom: 24 }}>
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
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="food-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>{item.name}</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>{item.desc}</p>
                        </div>
                        <div className="food-action" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="price" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{item.price}</span>
                          {qty === 0 ? (
                            <button className="btn-primary add-btn" style={{ padding: '7px 20px' }} onClick={(e) => { e.stopPropagation(); addToCart(item); }}>Add</button>
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
          )}

          {/* ── Cart Panel (Now as a full view) ───────────────────────────────────── */}
          {activeView === 'cart' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="cart-page-container glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '30px' }}>
                
                {checkoutStep === 'cart' ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                      <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Your Shopping Cart</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>{cartCount} items in your tray</p>
                      </div>
                      <button 
                        className="btn-secondary" 
                        onClick={() => setActiveView('menu')}
                        style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.9rem' }}
                      >
                        Back to Menu
                      </button>
                    </div>

                    <div className="cart-items-list" style={{ marginBottom: '30px' }}>
                      {cart.map(item => (
                        <div key={item.id} className="cart-item glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '15px', marginBottom: '15px', gap: '20px' }}>
                          <img src={item.img} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>
                            <h4 style={{ marginBottom: '5px' }}>{item.name}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>₹{item.price}</p>
                          </div>
                          <div className="qty-selector">
                            <button onClick={() => removeFromCart(item.id)}><Minus size={16} /></button>
                            <span>{item.qty}</span>
                            <button onClick={() => addToCart(item)}><Plus size={16} /></button>
                          </div>
                          <div style={{ width: '80px', textAlign: 'right', fontWeight: 'bold' }}>
                            ₹{item.price * item.qty}
                          </div>
                        </div>
                      ))}
                      {cart.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                          <ShoppingCart size={64} style={{ opacity: 0.2, marginBottom: '20px' }} />
                          <h3>Your cart is empty</h3>
                          <p className="text-secondary" style={{ marginBottom: '25px' }}>Looks like you haven't added anything yet.</p>
                          <button className="btn-primary" onClick={() => setActiveView('menu')}>Start Ordering</button>
                        </div>
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="cart-checkout-section glass-panel" style={{ padding: '25px', background: 'rgba(255,255,255,0.03)' }}>
                        
                        {/* Location Preview (Between items and total) */}
                        <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Delivery To:</span>
                            <button 
                              onClick={handlePlaceOrder} 
                              style={{ background: 'none', border: 'none', color: '#D97706', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}
                            >
                              {savedLocation ? 'Change' : 'Set Location'}
                            </button>
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <div style={{ background: 'rgba(217, 119, 6, 0.1)', padding: '8px', borderRadius: '8px', color: '#D97706' }}>
                              <Search size={16} /> 
                            </div>
                            <div>
                              <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                {user.lastLandmark || 'Current Location'}
                              </p>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {savedLocation ? `(${savedLocation.lat.toFixed(4)}, ${savedLocation.lng.toFixed(4)})` : 'Detecting...'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span className="text-secondary">Subtotal</span>
                          <span>₹{cartTotal}</span>
                        </div>
                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span className="text-secondary">Delivery Fee</span>
                          <span>₹{deliveryFee}</span>
                        </div>
                        <div className="summary-row total-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '1.4rem', fontWeight: 'bold' }}>
                          <span>Total Amount</span>
                          <span className="text-accent">₹{cartTotal + deliveryFee}</span>
                        </div>
                        <button 
                          className="btn-primary w-100" 
                          style={{ marginTop: '25px', padding: '16px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} 
                          onClick={savedLocation ? placeFinalOrder : handlePlaceOrder}
                          disabled={isLocating}
                        >
                          {isLocating ? (
                            <>Detecting Location...</>
                          ) : (
                            <>{savedLocation ? 'Pay Online & Order' : 'Set Delivery Location'}</>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div className="location-card glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '25px', textAlign: 'left' }}>
                      
                      {/* Address Input Section */}
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', marginBottom: '10px', letterSpacing: '1px' }}>
                          DELIVERY ADDRESS
                        </label>
                        <div style={{ position: 'relative' }}>
                          <textarea 
                            placeholder="Enter delivery area, street or building..."
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontSize: '1rem', resize: 'none', height: '80px', marginBottom: '10px' }}
                          />
                          <button 
                            onClick={handlePlaceOrder}
                            style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', gap: '5px' }}
                            disabled={isLocating}
                          >
                            <Search size={14} />
                            {isLocating ? 'Detecting...' : 'Use My Current Location'}
                          </button>
                        </div>
                      </div>

                      {/* Map Section */}
                      <div style={{ width: '100%', height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '25px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <iframe 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          style={{ border: 0 }}
                          src={`https://maps.google.com/maps?q=${location ? `${location.lat},${location.lng}` : (landmark || 'Chennai')}&z=18&output=embed`}
                        ></iframe>
                      </div>

                      {/* Action Button */}
                      <button 
                        className="btn-primary w-100" 
                        style={{ padding: '16px', fontSize: '1.1rem', borderRadius: '12px', background: 'linear-gradient(90deg, #2563eb, #3b82f6)', border: 'none', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} 
                        onClick={saveLocation}
                        disabled={!landmark}
                      >
                        <MapPin size={20} />
                        Confirm Location
                      </button>
                      
                      {!landmark && (
                        <p style={{ textAlign: 'center', color: '#f87171', fontSize: '0.8rem', marginTop: '12px' }}>
                          Please set a landmark or use current location to confirm.
                        </p>
                      )}
                    </div>

                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', marginTop: '20px', cursor: 'pointer', fontSize: '0.9rem' }}
                      onClick={() => setCheckoutStep('cart')}
                    >
                      Cancel and return to cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Orders Panel ───────────────────────────────────── */}
          {activeView === 'orders' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="orders-page-container glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>My Orders</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Track and manage your recent orders</p>
                  </div>
                  <button 
                    className="btn-secondary" 
                    onClick={() => setActiveView('menu')}
                    style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.9rem' }}
                  >
                    Order More
                  </button>
                </div>

                <div className="orders-list">
                  <div className="order-card glass-panel" style={{ padding: '20px', marginBottom: '20px', borderLeft: '4px solid #10b981' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Order #84920</span>
                        <h4 style={{ margin: '4px 0' }}>Processing Order</h4>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Today, 2:40 PM</span>
                        <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.9rem' }}>Preparing</div>
                      </div>
                    </div>
                    <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '15px' }}>
                      <p style={{ fontSize: '0.9rem' }}>Chicken Biryani x 1, Mint Mojito x 2</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>Total: ₹428</span>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '6px 15px', fontSize: '0.8rem' }}
                        onClick={() => setSelectedOrder({
                          id: '84920',
                          status: 'Preparing',
                          date: 'Today, 2:40 PM',
                          items: 'Chicken Biryani x 1, Mint Mojito x 2',
                          total: 428,
                          location: { lat: 12.9344, lng: 77.6101 },
                          landmark: 'Jogi Colony, Bengaluru'
                        })}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="order-card glass-panel" style={{ padding: '20px', marginBottom: '20px', opacity: 0.7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Order #84812</span>
                        <h4 style={{ margin: '4px 0' }}>Delivered</h4>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Yesterday, 8:15 PM</span>
                        <div style={{ color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.9rem' }}>Completed</div>
                      </div>
                    </div>
                    <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '15px' }}>
                      <p style={{ fontSize: '0.9rem' }}>Paneer Pizza x 1, Coke x 1</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>Total: ₹315</span>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '6px 15px', fontSize: '0.8rem' }}
                        onClick={() => setSelectedOrder({
                          id: '84812',
                          status: 'Completed',
                          date: 'Yesterday, 8:15 PM',
                          items: 'Paneer Pizza x 1, Coke x 1',
                          total: 315,
                          location: { lat: 12.9250, lng: 77.5898 },
                          landmark: 'Lalbagh Road, Bengaluru'
                        })}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Gallery Panel ─────────────────────────────────── */}
          {activeView === 'gallery' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="gallery-page-container glass-panel" style={{ width: '100%', maxWidth: '1000px', padding: '40px' }}>
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Cafe 90's Gallery</h1>
                  <p style={{ color: 'var(--text-secondary)' }}>A glimpse into our atmosphere and signature dishes</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {[
                    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1559925393-8be0ec418cd9?auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1521017432531-fbd92d744264?auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80"
                  ].map((img, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '10px', borderRadius: '20px', overflow: 'hidden', height: '300px', transition: 'transform 0.3s ease' }}>
                       <img src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Help Panel ───────────────────────────────────── */}
          {activeView === 'help' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="help-page-container glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '40px' }}>
                <h1 style={{ marginBottom: '10px' }}>Help & Support</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>How can we assist you today?</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                  <div className="glass-panel" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '10px' }}>Order Tracking</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>You can track your active orders in the 'My Orders' section.</p>
                  </div>
                  <div className="glass-panel" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '10px' }}>Payment Issues</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>We accept all major cards and UPI. If a payment fails, the amount is usually refunded within 3-5 days.</p>
                  </div>
                </div>

                <div style={{ background: 'rgba(217, 119, 6, 0.1)', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
                  <h2 style={{ marginBottom: '10px' }}>Contact Us</h2>
                  <p style={{ marginBottom: '20px' }}>Need direct assistance? Our team is here for you.</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>Call Us</p>
                      <p>+91 98765 43210</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>Email</p>
                      <p>support@cafe90s.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── About Panel ──────────────────────────────────── */}
          {activeView === 'about' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="about-page-container glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '400px', background: 'url("/restaurant-bg.png") center/cover', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)' }}></div>
                  <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '40px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', zIndex: 1 }}>
                    <h1 style={{ fontSize: '4.5rem', textShadow: '2px 2px 10px rgba(0,0,0,0.5)', fontFamily: 'var(--font-vintage)', letterSpacing: '4px' }}>Cafe 90's</h1>
                    <p style={{ fontSize: '1.4rem', color: '#D97706', fontWeight: '600', fontFamily: 'var(--font-body)' }}>A Trip Down Memory Lane</p>
                  </div>
                </div>
                <div style={{ padding: '40px' }}>
                  <h2 style={{ marginBottom: '20px' }}>Our Story</h2>
                  <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    Founded in 2024, Cafe 90's was born out of a passion for great coffee and nostalgic vibes. 
                    We believe that the best moments are spent over a warm cup of coffee and good music. 
                    Our mission is to provide a space where you can escape the hustle of modern life and 
                    relive the simplicity of the 90s.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <h4 style={{ color: '#D97706', fontSize: '1.5rem' }}>10k+</h4>
                      <p style={{ fontSize: '0.8rem' }}>Happy Customers</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <h4 style={{ color: '#D97706', fontSize: '1.5rem' }}>50+</h4>
                      <p style={{ fontSize: '0.8rem' }}>Signature Dishes</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <h4 style={{ color: '#D97706', fontSize: '1.5rem' }}>4.9</h4>
                      <p style={{ fontSize: '0.8rem' }}>Average Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Order Detail Modal ───────────────────────────────── */}
          {selectedOrder && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <div className="order-modal glass-panel" style={{ width: '100%', maxWidth: '550px', padding: '30px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <h2 style={{ fontSize: '1.5rem' }}>Order Details</h2>
                  <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Plus style={{ transform: 'rotate(45deg)' }} /></button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ORDER ID</p>
                    <p style={{ fontWeight: 'bold' }}>#{selectedOrder.id}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>STATUS</p>
                    <p style={{ color: '#10b981', fontWeight: 'bold' }}>{selectedOrder.status}</p>
                  </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px' }}>Items Ordered</p>
                  <p style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {selectedOrder.items}
                  </p>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px' }}>Delivery Destination</p>
                  <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '15px' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>{selectedOrder.landmark}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Coordinates: {selectedOrder.location.lat}, {selectedOrder.location.lng}</p>
                  </div>
                  <div style={{ height: '180px', borderRadius: '12px', overflow: 'hidden' }}>
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      style={{ border: 0 }}
                      src={`https://maps.google.com/maps?q=${selectedOrder.location.lat},${selectedOrder.location.lng}&z=16&output=embed`}
                    ></iframe>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '12px' }}>
                  <span style={{ fontWeight: 'bold' }}>Total Amount Paid</span>
                  <span style={{ color: 'var(--text-accent)', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{selectedOrder.total}</span>
                </div>
                
                <button 
                  className="btn-primary w-100" 
                  style={{ marginTop: '25px' }}
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
