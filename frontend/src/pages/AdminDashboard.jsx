import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Users, ShoppingBag, Clock, DollarSign, Plus, Search, Filter, MoreVertical, Edit3, Trash2, Loader2, AlertCircle, Bike, CheckCircle } from 'lucide-react';
import './Dashboard.css';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data States
  const [statsData, setStatsData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  
  // Selection state for manual assignment
  const [selectedOrderForAssign, setSelectedOrderForAssign] = useState(null);

  // Modal States
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [newPartner, setNewPartner] = useState({ name: '', mobile: '', email: '', password: '' });

  // Last assigned partner index for Round Robin
  const [lastAssignedIndex, setLastAssignedIndex] = useState(-1);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(r => setTimeout(r, 800));

      setStatsData([
        { label: "Total Revenue", value: "₹2,45,678", icon: <DollarSign size={20} />, trend: "+12.5%", color: "#10B981" },
        { label: "Total Orders", value: "3,456", icon: <ShoppingBag size={20} />, trend: "+8.2%", color: "#3B82F6" },
        { label: "Total Customers", value: "1,245", icon: <Users size={20} />, trend: "+5.4%", color: "#8B5CF6" },
        { label: "Active Fleet", value: "8 Partners", icon: <Bike size={20} />, trend: "Steady", color: "#F59E0B" }
      ]);

      setOrders([
        { id: "#ORD1234", customer: "Ramesh Kumar", amount: "₹499", status: "Preparing", time: "02:30 PM", assignedTo: null },
        { id: "#ORD1235", customer: "Priya Sharma", amount: "₹299", status: "Pending", time: "01:15 PM", assignedTo: "Rahul Dravid" },
        { id: "#ORD1236", customer: "Arun Verma", amount: "₹349", status: "Preparing", time: "12:45 PM", assignedTo: null },
        { id: "#ORD1237", customer: "Neha Singh", amount: "₹199", status: "Delivered", time: "11:20 AM", assignedTo: "Sourav Ganguly" }
      ]);

      setCustomers([
        { name: "Suresh Raina", email: "suresh@gmail.com", orders: 12, totalSpent: "₹4,500" },
        { name: "Mahesh Babu", email: "mahesh@gmail.com", orders: 8, totalSpent: "₹2,800" }
      ]);

      setDeliveryPartners([
        { id: "DLV001", name: "Rahul Dravid", mobile: "9876543211", email: "rahul@cafe90.com", status: "Active" },
        { id: "DLV002", name: "Sourav Ganguly", mobile: "9876543212", email: "sourav@cafe90.com", status: "On Busy" },
        { id: "DLV003", name: "Anil Kumble", mobile: "9876543213", email: "anil@cafe90.com", status: "On Leave" },
        { id: "DLV004", name: "VVS Laxman", mobile: "9876543214", email: "vvs@cafe90.com", status: "Active" }
      ]);

      setLoading(false);
    } catch (err) {
      setError("Failed to sync with server.");
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Delivered': return { background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' };
      case 'Pending': return { background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' };
      case 'Preparing': return { background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' };
      case 'Active': return { background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' };
      case 'On Busy': return { background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' };
      case 'On Leave': return { background: 'rgba(107, 114, 128, 0.1)', color: '#6B7280' };
      default: return { background: 'rgba(107, 114, 128, 0.1)', color: '#6B7280' };
    }
  };

  // Round Robin Assignment Logic
  const autoAssignTask = (orderId) => {
    const activePartners = deliveryPartners.filter(p => p.status === 'Active');
    if (activePartners.length === 0) return alert("No active partners available for auto-assignment!");

    const nextIndex = (lastAssignedIndex + 1) % activePartners.length;
    const partnerToAssign = activePartners[nextIndex];

    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, assignedTo: partnerToAssign.name, assignedToId: partnerToAssign.id, status: 'Preparing' } : o);
    setOrders(updatedOrders);
    localStorage.setItem('all_orders', JSON.stringify(updatedOrders));
    
    setLastAssignedIndex(nextIndex);
    alert(`Order ${orderId} auto-assigned to ${partnerToAssign.name} (Round Robin)`);
  };

  const manualAssignTask = (orderId, partner) => {
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, assignedTo: partner.name, assignedToId: partner.id, status: 'Preparing' } : o);
    setOrders(updatedOrders);
    localStorage.setItem('all_orders', JSON.stringify(updatedOrders));
    setSelectedOrderForAssign(null);
  };

  if (loading) {
    return (
      <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <Loader2 className="animate-spin" size={48} />
        <span style={{ marginLeft: '15px', fontSize: '1.2rem' }}>Syncing Fleet Data...</span>
      </div>
    );
  }

  return (
    <div className="dashboard-layout" style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', display: 'flex' }}>
      <Sidebar role="admin" activeView={activeView} onViewChange={setActiveView} />
      
      <div className="dashboard-main" style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {activeView === 'overview' && "Dashboard Overview"}
              {activeView === 'customers' && "Customer Database"}
              {activeView === 'orders' && "Dispatch Control"}
              {activeView === 'delivery_partners' && "Fleet Management"}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '5px' }}>
              {activeView === 'overview' ? "Restaurant health and fleet status" : `Monitor and manage your ${activeView}`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={fetchAllData} className="glass-panel" style={{ padding: '10px', border: 'none', color: 'white', cursor: 'pointer' }} title="Refresh">
              <Clock size={20} />
            </button>
            <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => activeView === 'delivery_partners' && setIsAddPartnerOpen(true)}>
              <Plus size={18} /> {activeView === 'delivery_partners' ? 'Add Partner' : 'Action'}
            </button>
          </div>
        </header>

        {activeView === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {statsData.map((stat, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '25px', borderRadius: '20px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '0', right: '0', padding: '20px', opacity: 0.1 }}>{stat.icon}</div>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>{stat.label}</p>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '10px' }}>{stat.value}</h2>
                  <span style={{ color: stat.color, fontSize: '0.85rem', fontWeight: '600' }}>{stat.trend}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
                <h3 style={{ marginBottom: '25px' }}>Live Order Dispatch</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {orders.filter(o => o.status !== 'Delivered').map((order, i) => (
                    <div key={i} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'rgba(255,255,255,0.02)' }}>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', borderRadius: '12px' }}>
                          <ShoppingBag size={24} />
                        </div>
                        <div>
                          <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{order.customer} <span style={{ opacity: 0.3, fontWeight: 'normal', fontSize: '0.9rem' }}>{order.id}</span></p>
                          <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Assigned to: <span style={{ color: order.assignedTo ? 'var(--text-accent)' : '#EF4444', fontWeight: '600' }}>{order.assignedTo || 'Unassigned'}</span></p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {!order.assignedTo && (
                          <button onClick={() => autoAssignTask(order.id)} className="btn-secondary" style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            Auto Assign (Round Robin)
                          </button>
                        )}
                        <button onClick={() => setSelectedOrderForAssign(order.id)} className="btn-primary" style={{ padding: '8px 16px' }}>
                          {order.assignedTo ? 'Reassign' : 'Manual Assign'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeView === 'orders' && (
          <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '15px' }}>ORDER ID</th>
                  <th style={{ padding: '15px' }}>CUSTOMER</th>
                  <th style={{ padding: '15px' }}>PARTNER</th>
                  <th style={{ padding: '15px' }}>STATUS</th>
                  <th style={{ padding: '15px' }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{o.id}</td>
                    <td style={{ padding: '15px' }}>{o.customer}</td>
                    <td style={{ padding: '15px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                         <Bike size={14} style={{ opacity: 0.5 }} />
                         {o.assignedTo || <span style={{ color: '#EF4444', fontSize: '0.85rem' }}>Waiting...</span>}
                       </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                       <span style={{ ...getStatusStyle(o.status), padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem' }}>{o.status}</span>
                    </td>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{o.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeView === 'delivery_partners' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {deliveryPartners.map((p, i) => (
              <div key={i} className="glass-panel" style={{ padding: '25px', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bike size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem' }}>{p.name}</h3>
                      <p style={{ opacity: 0.5, fontSize: '0.8rem' }}>{p.id}</p>
                    </div>
                  </div>
                  <span style={{ ...getStatusStyle(p.status), padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 'bold' }}>{p.status}</span>
                </div>
                
                <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '15px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '5px' }}>Fleet Contact</p>
                  <p style={{ fontSize: '0.9rem' }}>📞 {p.mobile}</p>
                  <p style={{ fontSize: '0.9rem' }}>📧 {p.email}</p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <select 
                    style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', padding: '8px', outline: 'none' }}
                    value={p.status}
                    onChange={(e) => {
                      const updated = deliveryPartners.map((item, idx) => idx === i ? {...item, status: e.target.value} : item);
                      setDeliveryPartners(updated);
                    }}
                  >
                    <option value="Active" style={{ background: '#1a1a1a' }}>Active</option>
                    <option value="On Busy" style={{ background: '#1a1a1a' }}>On Busy</option>
                    <option value="On Leave" style={{ background: '#1a1a1a' }}>On Leave</option>
                  </select>
                  <button className="btn-secondary" style={{ padding: '8px 12px' }} onClick={() => setDeliveryPartners(prev => prev.filter((_, idx) => idx !== i))}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div 
              className="glass-panel" 
              style={{ padding: '25px', borderRadius: '24px', border: '2px dashed rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '200px' }}
              onClick={() => setIsAddPartnerOpen(true)}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                <Plus size={24} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>Add New Partner</p>
            </div>
          </div>
        )}

        {/* ── Manual Assign Modal ───────────────────────────────── */}
        {selectedOrderForAssign && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '30px', borderRadius: '24px' }}>
              <h3 style={{ marginBottom: '20px' }}>Assign Delivery Partner</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {deliveryPartners.filter(p => p.status === 'Active').map((p, i) => (
                  <button 
                    key={i} 
                    className="glass-panel w-100" 
                    style={{ padding: '15px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', color: 'white', background: 'rgba(255,255,255,0.03)' }}
                    onClick={() => manualAssignTask(selectedOrderForAssign, p)}
                  >
                    <span>{p.name}</span>
                    <CheckCircle size={18} style={{ color: '#10B981' }} />
                  </button>
                ))}
                {deliveryPartners.filter(p => p.status === 'Active').length === 0 && <p style={{ opacity: 0.5, color: 'white' }}>No active partners available.</p>}
                <button onClick={() => setSelectedOrderForAssign(null)} className="btn-secondary w-100" style={{ marginTop: '10px', color: 'white' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Add Partner Modal ───────────────────────────────── */}
        {isAddPartnerOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '30px', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3>Register New Partner</h3>
                <button onClick={() => setIsAddPartnerOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Plus size={20} style={{ transform: 'rotate(45deg)' }} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  type="text" 
                  className="glass-panel w-100" 
                  style={{ padding: '15px', color: 'white', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} 
                  placeholder="Full Name" 
                  value={newPartner.name} 
                  onChange={e => setNewPartner({...newPartner, name: e.target.value})} 
                />
                <input 
                  type="tel" 
                  className="glass-panel w-100" 
                  style={{ padding: '15px', color: 'white', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} 
                  placeholder="Mobile No" 
                  value={newPartner.mobile} 
                  onChange={e => setNewPartner({...newPartner, mobile: e.target.value})} 
                />
                <input 
                  type="email" 
                  className="glass-panel w-100" 
                  style={{ padding: '15px', color: 'white', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} 
                  placeholder="Login Email" 
                  value={newPartner.email} 
                  onChange={e => setNewPartner({...newPartner, email: e.target.value})} 
                />
                <input 
                  type="password" 
                  className="glass-panel w-100" 
                  style={{ padding: '15px', color: 'white', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} 
                  placeholder="Login Password" 
                  value={newPartner.password} 
                  onChange={e => setNewPartner({...newPartner, password: e.target.value})} 
                />
                <button 
                  className="btn-primary w-100" 
                  style={{ padding: '16px', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' }}
                  onClick={() => {
                    const id = `DLV00${deliveryPartners.length + 1}`;
                    const partnerData = { ...newPartner, id, status: 'Active' };
                    
                    // Save to State
                    setDeliveryPartners([...deliveryPartners, partnerData]);
                    
                    // Persist to LocalStorage so Login can access it
                    const existing = JSON.parse(localStorage.getItem('registered_partners') || '[]');
                    localStorage.setItem('registered_partners', JSON.stringify([...existing, partnerData]));

                    setIsAddPartnerOpen(false);
                    setNewPartner({ name: '', mobile: '', email: '', password: '' });
                    alert(`Partner ${partnerData.name} registered successfully! They can now login with ${partnerData.email}`);
                  }}
                >
                  Create Partner Account
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'customers' && (
          <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '15px' }}>NAME</th>
                  <th style={{ padding: '15px' }}>EMAIL</th>
                  <th style={{ padding: '15px' }}>ORDERS</th>
                  <th style={{ padding: '15px' }}>TOTAL SPENT</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '15px' }}>{c.name}</td>
                    <td style={{ padding: '15px', opacity: 0.6 }}>{c.email}</td>
                    <td style={{ padding: '15px' }}>{c.orders}</td>
                    <td style={{ padding: '15px', color: 'var(--text-accent)', fontWeight: 'bold' }}>{c.totalSpent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
