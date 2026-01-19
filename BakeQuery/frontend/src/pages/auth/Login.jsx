import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ArrowLeft, ChefHat } from 'lucide-react';
import './Auth.css'; // Import ไฟล์ CSS ที่แยกออกมา

const Login = () => {
  return (
    <div className="auth-page">
      {/* ปุ่มย้อนกลับหน้า Home */}
      <Link to="/" className="back-home-btn">
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <div className="auth-container">
        {/* Banner ด้านซ้าย */}
        <div className="auth-banner">
          <div className="banner-content">
            <div className="logo-circle">
              <ChefHat size={40} color="#623500" />
            </div>
            <h1>Welcome Back</h1>
            <p>To BakeQuery</p>
          </div>
        </div>

        {/* ฟอร์ม Login ด้านขวา */}
        <div className="auth-form-wrapper">
          <div className="form-header">
            <h2>Sign In</h2>
            <p className="sub-text">เข้าสู่ระบบเพื่อสั่งความอร่อย</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>อีเมล</label>
              <div className="input-field">
                <Mail className="field-icon" size={18} />
                <input type="email" placeholder="name@example.com" />
              </div>
            </div>
            
            <div className="input-group">
              <label>รหัสผ่าน</label>
              <div className="input-field">
                <Lock className="field-icon" size={18} />
                <input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="form-actions">
              <label style={{display:'flex', gap:'5px', cursor:'pointer', color:'#666', fontSize:'0.9rem'}}>
                <input type="checkbox" /> จดจำฉันไว้
              </label>
              <Link to="/forgot-password">ลืมรหัสผ่าน?</Link>
            </div>

            <button className="btn-submit">
              เข้าสู่ระบบ <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer">
            <p>ยังไม่มีบัญชีสมาชิก? <Link to="/register">สมัครสมาชิก</Link></p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;