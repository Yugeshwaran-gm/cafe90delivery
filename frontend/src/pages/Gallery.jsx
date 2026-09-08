import { Image } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';

const Gallery = () => {
  const images = [];

  return (
    <div className="app-container">
      <Navbar />
      <div style={{ flex: 1, padding: '120px 20px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--bg-dark)' }}>
        <div className="gallery-page-container glass-panel" style={{ width: '100%', maxWidth: '1200px', padding: '60px 40px' }}>
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Cafe 90's Gallery</h1>
            <p style={{ color: 'var(--text-secondary)' }}>A glimpse into our atmosphere and signature dishes</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
            <Image size={80} style={{ marginBottom: '20px', strokeWidth: 1 }} />
            <h2 style={{ fontWeight: '400', letterSpacing: '2px' }}>UPLOADING SOON</h2>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>We are currently capturing the best moments of Cafe 90's.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {images.map((img, i) => (
              <div key={i} className="glass-panel" style={{ padding: '12px', borderRadius: '24px', overflow: 'hidden', height: '350px', transition: 'transform 0.3s ease' }}>
                 <img src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
