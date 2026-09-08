import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react';
import './CustomerAuth.css';

const CustomerLogin = () => {
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
    try {
      let res;
      try {
        res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } catch (networkErr) {
        throw new Error('Cannot connect to server. Make sure the backend is running on port 5000.');
      }

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('Server returned an invalid response. Please try again.');
      }

      if (res.status === 404) throw new Error('No account found with this email. Please create an account first.');
      if (res.status === 401) throw new Error('Incorrect password. Please try again.');
      if (res.status === 409) throw new Error('Email already exists.');
      if (!res.ok) throw new Error(data.error || `Login failed (${res.status})`);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard/customer');
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
        <button className="cauth-back" onClick={() => navigate('/login')}>
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <div className="cauth-header">
          <div className="cauth-icon customer-icon">
            <User size={32} />
          </div>
          <h2>Customer Login</h2>
          <p className="text-secondary">Welcome back! Sign in to your account.</p>
        </div>

        {/* Error */}
        {error && <div className="cauth-error">{error}</div>}

        {/* Form */}
        <form className="cauth-form" onSubmit={handleSubmit}>
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
                autoComplete="email"
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
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
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

          <button className="cauth-submit btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <span className="cauth-spinner" />
            ) : (
              <><LogIn size={18} /> Sign In</>
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="cauth-footer">
          <p>New to Cafe 90's?</p>
          <Link to="/register/customer" className="cauth-register-btn">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
