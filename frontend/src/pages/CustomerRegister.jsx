import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowLeft, UserPlus } from 'lucide-react';
import './CustomerAuth.css';

const CustomerRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login/customer'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cauth-page">
      <div className="cauth-card glass-panel">
        {/* Back Button */}
        <button className="cauth-back" onClick={() => navigate('/login/customer')}>
          <ArrowLeft size={18} /> Back to Login
        </button>

        {/* Header */}
        <div className="cauth-header">
          <div className="cauth-icon customer-icon">
            <UserPlus size={32} />
          </div>
          <h2>Create Account</h2>
          <p className="text-secondary">Join Cafe 90's and start ordering!</p>
        </div>

        {/* Messages */}
        {error && <div className="cauth-error">{error}</div>}
        {success && <div className="cauth-success">{success}</div>}

        {/* Form */}
        <form className="cauth-form" onSubmit={handleSubmit}>
          <div className="cauth-field">
            <label>Full Name</label>
            <div className="cauth-input-wrap">
              <User size={18} className="cauth-input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="cauth-field">
            <label>Email Address</label>
            <div className="cauth-input-wrap">
              <Mail size={18} className="cauth-input-icon" />
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="cauth-field">
            <label>Phone Number</label>
            <div className="cauth-input-wrap">
              <Phone size={18} className="cauth-input-icon" />
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={handleChange}
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
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="cauth-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="cauth-field">
            <label>Confirm Password</label>
            <div className="cauth-input-wrap">
              <Lock size={18} className="cauth-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="cauth-submit btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <span className="cauth-spinner" />
            ) : (
              <><UserPlus size={18} /> Create Account</>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="cauth-footer">
          <p>Already have an account?</p>
          <Link to="/login/customer" className="cauth-register-btn">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
