import { User, Bike, Shield, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-page">
      {/* Go Home Button */}
      <button 
        className="glass-panel" 
        onClick={() => navigate('/')}
        style={{ 
          position: 'absolute', 
          top: '30px', 
          left: '30px', 
          padding: '12px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer',
          zIndex: 10,
          borderRadius: '12px',
          fontWeight: '500'
        }}
      >
        <ArrowLeft size={18} />
        Go Home
      </button>

      <div className="login-container glass-panel">
        <div className="login-left" style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <div className="branding" style={{ marginBottom: '40px' }}>
            <img src="/logo.jpg" alt="Cafe 90's Logo" style={{ width: '280px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))', mixBlendMode: 'screen' }} />
          </div>
          <div className="welcome-section">
            <h1 className="text-accent" style={{ fontSize: '3rem' }}>Cafe 90's</h1>
            <p className="text-secondary" style={{ fontSize: '1.2rem', marginTop: '10px' }}>Login to continue and enjoy delicious food.</p>
          </div>
        </div>
        
        <div className="login-right">
          <div className="login-header">
            <h2>Login As</h2>
            <p className="text-secondary">Please select your login type</p>
          </div>
          
          <div className="role-cards">
            <div className="role-card glass-panel" onClick={() => navigate('/login/customer')} style={{ cursor: 'pointer' }}>
              <div className="role-icon customer-icon">
                <User size={32} />
              </div>
              <h3>Customer</h3>
              <p>Login as Customer</p>
            </div>
            
            <div className="role-card glass-panel" onClick={() => navigate('/login/delivery')} style={{ cursor: 'pointer' }}>
              <div className="role-icon delivery-icon">
                <Bike size={32} />
              </div>
              <h3>Delivery Partner</h3>
              <p>Login as Delivery Partner</p>
            </div>
            
            <div className="role-card glass-panel" onClick={() => navigate('/login/admin')} style={{ cursor: 'pointer' }}>
              <div className="role-icon admin-icon">
                <Shield size={32} />
              </div>
              <h3>Admin</h3>
              <p>Login as Admin</p>
            </div>
          </div>
          
          <div className="login-footer">
            <p>New here? <span className="text-accent" style={{cursor:'pointer'}} onClick={() => navigate('/register/customer')}>Sign up as Customer</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
