import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bike, Mail, Lock, Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react';
import './CustomerAuth.css';

const DeliveryLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate Delivery Login
    // Note: In real app, this would hit /api/auth/login and check role
    setTimeout(() => {
      // Check against partners registered by Admin in localStorage
      const registeredPartners = JSON.parse(localStorage.getItem('registered_partners') || '[]');
      const matchedPartner = registeredPartners.find(p => p.email === form.email && p.password === form.password);

      if (matchedPartner || (form.email.includes('cafe90.com') && form.password === 'delivery123')) {
        const partner = matchedPartner || { name: 'Delivery Partner', id: 'DLV000', email: form.email };
        localStorage.setItem('token', 'delivery-token');
        localStorage.setItem('user', JSON.stringify({ 
          name: partner.name, 
          id: partner.id,
          role: 'delivery' 
        }));
        navigate('/dashboard/delivery');
      } else {
        setError('Invalid delivery credentials. Please use the email and password provided by the Admin.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="cauth-page">
      <div className="cauth-card glass-panel" style={{ borderTop: '4px solid #10B981' }}>
        {/* Back Button */}
        <button className="cauth-back" onClick={() => navigate('/login')}>
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <div className="cauth-header">
          <div className="cauth-icon delivery-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
            <Bike size={32} />
          </div>
          <h2>Delivery Login</h2>
          <p className="text-secondary">Ready to deliver happiness? Sign in now.</p>
        </div>

        {/* Error */}
        {error && <div className="cauth-error">{error}</div>}

        {/* Form */}
        <form className="cauth-form" onSubmit={handleSubmit}>
          <div className="cauth-field">
            <label>Partner Email</label>
            <div className="cauth-input-wrap">
              <Mail size={18} className="cauth-input-icon" />
              <input
                type="email"
                name="email"
                placeholder="partner@cafe90.com"
                value={form.email}
                onChange={handleChange}
                required
                style={{ color: 'white', background: 'transparent' }}
              />
            </div>
          </div>

          <div className="cauth-field">
            <label>Password</label>
            <div className="cauth-input-wrap">
              <Lock size={18} className="cauth-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                style={{ color: 'white', background: 'transparent' }}
              />
              <button
                type="button"
                className="cauth-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button className="cauth-submit btn-primary" type="submit" disabled={loading} style={{ background: 'linear-gradient(90deg, #10B981, #059669)' }}>
            {loading ? (
              <span className="cauth-spinner" />
            ) : (
              <><LogIn size={18} /> Start My Shift</>
            )}
          </button>
        </form>

        <div className="cauth-footer">
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Driver App v1.8.2 | Always Wear a Helmet</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryLogin;
