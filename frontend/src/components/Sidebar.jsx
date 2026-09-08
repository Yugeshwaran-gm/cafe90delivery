import { Home, Users, ShoppingCart, Clock, HelpCircle, Info, LogOut, Bike, Menu as MenuIcon, Image } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role = 'customer', activeView, onViewChange }) => {
  const location = useLocation();
  const path = location.pathname;

  const getLinks = () => {
    if (role === 'admin') {
      return [
        { name: 'Dashboard', path: '#', icon: Home },
        { name: 'Customers', path: '#', icon: Users },
        { name: 'Orders', path: '#', icon: ShoppingCart },
        { name: 'Delivery Partners', path: '#', icon: Bike },
        { name: 'Food Menu', path: '#', icon: MenuIcon },
        { name: 'Reports', path: '#', icon: Info },
        { name: 'Settings', path: '#', icon: HelpCircle },
      ];
    }
    if (role === 'delivery') {
      return [
        { name: 'Dashboard', path: '/dashboard/delivery', icon: Home },
        { name: 'Assigned Orders', path: '#', icon: Clock },
        { name: 'My Deliveries', path: '#', icon: ShoppingCart },
        { name: 'Earnings', path: '#', icon: Info },
        { name: 'Profile', path: '#', icon: Users },
      ];
    }
    
    // Customer
    return [
      { name: 'Home', path: '/dashboard/customer', icon: Home },
      { name: 'Cart', path: '#', icon: ShoppingCart },
      { name: 'My Orders', path: '#', icon: Clock },
      { name: 'Gallery', path: '#', icon: Image },
      { name: 'Help', path: '#', icon: HelpCircle },
      { name: 'About Us', path: '#', icon: Info },
    ];
  };

  const links = getLinks();

  const handleLinkClick = (e, link) => {
    if (onViewChange) {
      if (role === 'customer') {
        if (link.name === 'Home') { e.preventDefault(); onViewChange('menu'); }
        else if (link.name === 'Cart') { e.preventDefault(); onViewChange('cart'); }
        else if (link.name === 'My Orders') { e.preventDefault(); onViewChange('orders'); }
        else if (link.name === 'Gallery') { e.preventDefault(); onViewChange('gallery'); }
        else if (link.name === 'Help') { e.preventDefault(); onViewChange('help'); }
        else if (link.name === 'About Us') { e.preventDefault(); onViewChange('about'); }
      } else if (role === 'admin') {
        if (link.name === 'Dashboard') { e.preventDefault(); onViewChange('overview'); }
        else if (link.name === 'Customers') { e.preventDefault(); onViewChange('customers'); }
        else if (link.name === 'Orders') { e.preventDefault(); onViewChange('orders'); }
        else if (link.name === 'Delivery Partners') { e.preventDefault(); onViewChange('delivery_partners'); }
        else if (link.name === 'Staff Directory') { e.preventDefault(); onViewChange('staff'); }
        else if (link.name === 'Food Menu') { e.preventDefault(); onViewChange('food_menu'); }
      } else if (role === 'delivery') {
        if (link.name === 'Dashboard') { e.preventDefault(); onViewChange('dashboard'); }
        else if (link.name === 'Assigned Orders') { e.preventDefault(); onViewChange('assigned'); }
        else if (link.name === 'My Deliveries') { e.preventDefault(); onViewChange('deliveries'); }
        else if (link.name === 'Earnings') { e.preventDefault(); onViewChange('earnings'); }
        else if (link.name === 'Profile') { e.preventDefault(); onViewChange('profile'); }
      }
    }
  };

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-logo" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="/logo.jpg" alt="Cafe 90's Logo" style={{ width: '80%', maxWidth: '120px', mixBlendMode: 'screen' }} />
      </div>
      
      <div className="sidebar-links">
        {links.map((link, idx) => {
          const Icon = link.icon;
          let isActive = path === link.path;
          
          if (role === 'customer') {
            if (link.name === 'Home' && activeView === 'menu') isActive = true;
            if (link.name === 'Cart' && activeView === 'cart') isActive = true;
            if (link.name === 'My Orders' && activeView === 'orders') isActive = true;
            if (link.name === 'Gallery' && activeView === 'gallery') isActive = true;
            if (link.name === 'Help' && activeView === 'help') isActive = true;
            if (link.name === 'About Us' && activeView === 'about') isActive = true;
          } else if (role === 'admin') {
            if (link.name === 'Dashboard' && activeView === 'overview') isActive = true;
            if (link.name === 'Customers' && activeView === 'customers') isActive = true;
            if (link.name === 'Orders' && activeView === 'orders') isActive = true;
            if (link.name === 'Delivery Partners' && activeView === 'delivery_partners') isActive = true;
            if (link.name === 'Staff Directory' && activeView === 'staff') isActive = true;
            if (link.name === 'Food Menu' && activeView === 'food_menu') isActive = true;
          } else if (role === 'delivery') {
            if (link.name === 'Dashboard' && activeView === 'dashboard') isActive = true;
            if (link.name === 'Assigned Orders' && activeView === 'assigned') isActive = true;
            if (link.name === 'My Deliveries' && activeView === 'deliveries') isActive = true;
            if (link.name === 'Earnings' && activeView === 'earnings') isActive = true;
            if (link.name === 'Profile' && activeView === 'profile') isActive = true;
          }

          return (
            <Link 
              key={idx} 
              to={link.path} 
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, link)}
            >
              <Icon size={20} />
              <span>{link.name}</span>
              {link.badge && <span className="sidebar-badge">{link.badge}</span>}
            </Link>
          )
        })}
      </div>
      
      <div className="sidebar-footer">
        <Link to="/" className="sidebar-link">
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

// Simple placeholder for missing icon in this scope
const User = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

export default Sidebar;
