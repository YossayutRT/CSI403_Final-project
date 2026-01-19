import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Menu, X } from 'lucide-react';

// Import Pages
import Home from './pages/public/Home';       
import Products from './pages/public/Products';  // เมนูสินค้า
import CartSection from './pages/customer/sections/CartSection.jsx'; // ตะกร้าสินค้า
import Login from './pages/auth/Login';       
import Register from './pages/auth/Register'; 

import logo from './assets/BakeQuery_Logo.png'; 
import './index.css'; 

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // เก็บสินค้าในตะกร้า
  const location = useLocation(); 

  // ฟังก์ชันเพิ่มสินค้า
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว`);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="app-wrapper">
      
      {/* Navbar */}
      {!isAuthPage && (
        <nav className="navbar">
          <div className="container nav-inner">
            <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
              <img src={logo} alt="BakeQuery" className="nav-logo" />
              <span className="brand-text">BakeQuery</span>
            </Link>
            
            <div className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>Home</Link>
              {/* เชื่อมไปหน้า Products */}
              <Link to="/menu" className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`} onClick={closeMobileMenu}>Menu</Link>
              <Link to="/promotions" className="nav-link" onClick={closeMobileMenu}>Promotions</Link>
            </div>

            <div className="nav-actions">
              {/* เชื่อมไปหน้า CartSection */}
              <Link to="/cart" className="icon-btn" style={{position: 'relative'}}>
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </Link>
              
              <Link to="/login" className="btn-login">
                <User size={18} />
                <span>Login</span>
              </Link>

              <button 
                className="icon-btn mobile-only" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Routing System */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/menu" element={<Products addToCart={addToCart} />} />
          <Route path="/cart" element={<CartSection cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div style={{padding:'100px', textAlign:'center'}}>404 Not Found</div>} />
        </Routes>
      </main>

      {!isAuthPage && (
        <footer className="footer">
          <div className="container">
            <p>© 2026 BakeQuery. All rights reserved.</p>
          </div>
        </footer>
      )}

    </div>
  );
}

export default App;