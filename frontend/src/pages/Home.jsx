import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShinyText from '../components/ShinyText';
import { Clock, Star, Flame, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Background Image Overlay */}
      <div className="hero-bg">
        <div className="bg-overlay"></div>
      </div>

      <Navbar />

      <main className="hero-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '40px' }}>
          <div className="hero-left">
            <span className="welcome-text">Welcome to</span>
            <div style={{ margin: '0' }}>
              <img src="/logo.jpg" alt="Cafe 90's Logo" style={{ width: '450px', maxWidth: '100%', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', mixBlendMode: 'screen' }} />
            </div>
          </div>
          
          <div className="hero-right glass-panel" style={{ maxWidth: '450px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h3 className="hero-subtitle">
              <ShinyText text="Good Food | Good Mood" color="#FFB800" shineColor="#ffffff" speed={2.5} />
            </h3>
            <p className="hero-desc" style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '100%', color: 'rgba(255,255,255,0.9)' }}>
              Enjoy the best taste, made with love and served with happiness.
            </p>
            <button className="btn-primary hero-btn" style={{ fontSize: '1.2rem', padding: '16px 40px' }} onClick={() => navigate('/menu')}>Order Now</button>
          </div>
        </div>

        <div className="features-strip">
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Clock className="text-accent" size={24}/></div>
            <div>
              <h4>Fast Delivery</h4>
              <p>Quick & on time</p>
            </div>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Star className="text-accent" size={24}/></div>
            <div>
              <h4>Best Quality</h4>
              <p>Premium ingredients</p>
            </div>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Flame className="text-accent" size={24}/></div>
            <div>
              <h4>Fresh & Hot</h4>
              <p>Made with love</p>
            </div>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Package className="text-accent" size={24}/></div>
            <div>
              <h4>Safe Packaging</h4>
              <p>Hygienic & safe</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
