import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';

const CartSection = ({ cartItems, setCartItems }) => {
  // คำนวณยอดรวม
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="container" style={{ padding: '40px 50px', maxWidth: '900px', margin: '0 auto', minHeight: '60vh' }}>
        <br /><br /><br />

        {/* <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '25px', fontSize: '2rem' }}>
            Shopping Cart <span style={{fontSize:'1.2rem', color:'#888', fontWeight:'normal'}}>({cartItems.length} items)</span>
        </h2> */}

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#f9f9f9', borderRadius: '16px', border: '1px dashed #ddd' }}>
          <ShoppingBag size={64} color="#ccc" style={{ marginBottom: '20px' }} />
          <h3 style={{ color: '#666', marginBottom: '10px' }}>ตะกร้าสินค้าว่างเปล่า</h3>
          <p style={{ color: '#999', marginBottom: '25px' }}>คุณยังไม่ได้เลือกสินค้าเลย ลองไปดูเมนูอร่อยๆ กันเถอะ</p>
          <Link to="/menu" className="btn-login" style={{ display: 'inline-flex', padding: '12px 30px' }}>
            เลือกซื้อสินค้า
          </Link>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          {/* Cart Items List */}
          <div style={{ padding: '30px' }}>
            {cartItems.map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '20px 0', 
                borderBottom: index !== cartItems.length - 1 ? '1px solid #f0f0f0' : 'none' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1rem' }}>{item.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>{item.category}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                  <span style={{ fontWeight: '600', fontSize: '1.2rem', color: '#623500' }}>฿{item.price}</span>
                  <button 
                    onClick={() => removeFromCart(index)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f', padding: '8px', borderRadius: '50%', transition: 'background 0.2s' }}
                    className="delete-btn"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Total & Checkout */}
          <div style={{ background: '#fafafa', padding: '30px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.1rem', color: '#666' }}>Subtotal</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#623500' }}>฿{totalPrice}</span>
            </div>
            <button className="btn-login" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem', borderRadius: '12px' }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSection;