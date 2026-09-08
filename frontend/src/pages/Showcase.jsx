import './Showcase.css';

const Showcase = () => {
  return (
    <div className="showcase-container">
      <div className="showcase-grid">
        <div className="showcase-item">
          <iframe src="/" title="Home Page" />
        </div>
        <div className="showcase-item">
          <iframe src="/menu" title="Menu Page" />
        </div>
        <div className="showcase-item">
          <iframe src="/login" title="Login Page" />
        </div>
        <div className="showcase-item">
          <iframe src="/dashboard/customer" title="Customer Dashboard" />
        </div>
      </div>
    </div>
  );
};

export default Showcase;
