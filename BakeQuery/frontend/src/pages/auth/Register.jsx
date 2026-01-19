import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, ArrowLeft, Cake } from 'lucide-react';
import './Auth.css'; // Import ไฟล์ CSS ที่แยกออกมา

const Register = () => {
  return (
    <div className="auth-page">
      <Link to="/" className="back-home-btn">
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <div className="auth-container reverse">
        {/* Banner ด้านขวา (สำหรับ Register) */}
        <div className="auth-banner register-bg">
          <div className="banner-content">
            <div className="logo-circle">
              <Cake size={40} color="#623500" />
            </div>
            <h1>Join Family</h1>
            <p>Start your journey</p>
          </div>
        </div>

        {/* ฟอร์ม Register ด้านซ้าย */}
        <div className="auth-form-wrapper">
          <div className="form-header">
            <h2>Create Account</h2>
            <p className="sub-text">สมัครสมาชิกใหม่ได้ง่ายๆ</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>ชื่อ-นามสกุล</label>
              <div className="input-field">
                <User className="field-icon" size={18} />
                <input type="text" placeholder="ชื่อผู้ใช้งาน" />
              </div>
            </div>

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
                <input type="password" placeholder="ตั้งรหัสผ่าน" />
              </div>
            </div>

            <button className="btn-submit" style={{marginTop:'20px'}}>
              สมัครสมาชิก <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer">
            <p>มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบ</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;