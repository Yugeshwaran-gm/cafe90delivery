import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Bike, ShoppingBag, Clock, DollarSign, MapPin, Search, CheckCircle, ChevronRight, User, Settings, LogOut, ArrowLeft, Loader2, HandMetal } from 'lucide-react';
import './Dashboard.css';

const DeliveryDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    const loadOrders = () => {
      const sharedOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
      
      // JOB POOL LOGIC:
      // 1. Show orders that are NOT assigned to anyone (Available Pool)
      // 2. Show orders that are SPECIFICALLY assigned to me (My Tasks)
      const visibleOrders = sharedOrders.filter(o => 
        !o.assignedToId || o.assignedToId === userData?.id
      );
      
      setOrders(visibleOrders);
      setLoading(false);
    };

    loadOrders();
    window.addEventListener('storage', loadOrders);
    return () => window.removeEventListener('storage', loadOrders);
  }, []);

  const takeTask = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
    
    // Check if someone else took it while we were looking
    const target = allOrders.find(o => o.id === orderId);
    if (target && target.assignedToId && target.assignedToId !== user.id) {
      alert("Too late! This task was already taken by another partner.");
      return;
    }

    const updated = allOrders.map(o => o.id === orderId ? { 
      ...o, 
      assignedTo: user.name, 
      assignedToId: user.id, 
      status: 'Preparing' 
    } : o);

    localStorage.setItem('all_orders', JSON.stringify(updated));
    // Trigger local refresh
    window.dispatchEvent(new Event('storage'));
    alert(`Order ${orderId} is now assigned to you!`);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
    const updated = allOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem('all_orders', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const stats = [
    { label: "My Active Tasks", value: orders.filter(o => o.assignedToId === user?.id && o.status !== 'Delivered').length, icon: <Clock size={20} />, color: '#F59E0B' },
    { label: "Available Pool", value: orders.filter(o => !o.assignedToId).length, icon: <ShoppingBag size={20} />, color: '#3B82F6' },
    { label: "My Deliveries", value: orders.filter(o => o.assignedToId === user?.id && o.status === 'Delivered').length, icon: <CheckCircle size={20} />, color: '#10B981' },
    { label: "My Earnings", value: `₹${orders.filter(o => o.assignedToId === user?.id && o.status === 'Delivered').length * 85}`, icon: <DollarSign size={20} />, color: '#8B5CF6' }
  ];

  if (loading) {
    return (
      <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <Loader2 className="animate-spin" size={48} />
        <span style={{ marginLeft: '15px', fontSize: '1.2rem' }}>Scanning Order Pool...</span>
      </div>
    );
  }

  return (
    <div className="dashboard-layout" style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', display: 'flex' }}>
      <Sidebar role="delivery" activeView={activeView} onViewChange={setActiveView} />
      
      <div className="dashboard-main" style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {activeView === 'dashboard' && `Hello, ${user?.name}!`}
              {activeView === 'assigned' && "Order Pool & Tasks"}
              {activeView === 'deliveries' && "Past Deliveries"}
              {activeView === 'earnings' && "Earnings Dashboard"}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '5px' }}>
               There are {orders.filter(o => !o.assignedToId).length} available tasks in the pool.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }}></div>
             <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Status: On Duty</span>
          </div>
        </header>

        {activeView === 'dashboard' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '25px', borderRadius: '20px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.2 }}>{stat.icon}</div>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>{stat.label}</p>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stat.value}</h2>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
                <h3 style={{ marginBottom: '25px' }}>Live Order Pool</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {orders.filter(o => o.status !== 'Delivered').map((order, i) => (
                    <div key={i} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px', background: order.assignedToId === user.id ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255,255,255,0.02)' }}>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                         <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: order.assignedToId ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: order.assignedToId ? '#10B981' : '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {order.assignedToId ? <CheckCircle size={24} /> : <HandMetal size={24} />}
                         </div>
                         <div>
                            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{order.customer} <span style={{ opacity: 0.3, fontWeight: 'normal' }}>{order.id}</span></p>
                            <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>📍 {order.address || 'Chennai'}</p>
                         </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        {order.assignedToId === user.id ? (
                          <>
                            <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' }}>My Task</span>
                            <select 
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px', borderRadius: '10px', outline: 'none' }}
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            >
                              <option value="Preparing" style={{ background: '#1a1a1a' }}>Preparing</option>
                              <option value="Picked Up" style={{ background: '#1a1a1a' }}>Picked Up</option>
                              <option value="Out for Delivery" style={{ background: '#1a1a1a' }}>Out for Delivery</option>
                              <option value="Delivered" style={{ background: '#1a1a1a' }}>Delivered</option>
                            </select>
                          </>
                        ) : (
                          <button 
                            className="btn-primary" 
                            style={{ padding: '10px 25px', borderRadius: '12px' }}
                            onClick={() => takeTask(order.id)}
                          >
                            Take Task
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {orders.filter(o => o.status !== 'Delivered').length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px', opacity: 0.3 }}>
                       <Bike size={48} style={{ marginBottom: '15px' }} />
                       <p>No available tasks in the pool. Stay tuned!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Deliveries View */}
        {activeView === 'deliveries' && (
          <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                   <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <th style={{ padding: '15px' }}>ORDER</th>
                      <th style={{ padding: '15px' }}>CUSTOMER</th>
                      <th style={{ padding: '15px' }}>STATUS</th>
                      <th style={{ padding: '15px' }}>EARNINGS</th>
                   </tr>
                </thead>
                <tbody>
                   {orders.filter(o => o.assignedToId === user.id && o.status === 'Delivered').map((o, i) => (
                     <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '15px', fontWeight: 'bold' }}>{o.id}</td>
                        <td style={{ padding: '15px' }}>{o.customer}</td>
                        <td style={{ padding: '15px' }}><span style={{ color: '#10B981' }}>✓ Delivered</span></td>
                        <td style={{ padding: '15px', color: '#10B981', fontWeight: 'bold' }}>₹85.00</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

        {/* Earnings View */}
        {activeView === 'earnings' && (
          <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '40px', borderRadius: '30px', textAlign: 'center' }}>
             <DollarSign size={60} style={{ color: '#8B5CF6', marginBottom: '20px' }} />
             <h3 style={{ opacity: 0.6 }}>Total Balance</h3>
             <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: '10px 0' }}>
                ₹{orders.filter(o => o.assignedToId === user.id && o.status === 'Delivered').length * 85}
             </h1>
             <button className="btn-primary w-100" style={{ marginTop: '30px', padding: '18px' }}>Request Payout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
