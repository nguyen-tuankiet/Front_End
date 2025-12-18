import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Logo + desc */}
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <span className="logo-main">TIN</span>
              <span className="logo-sub">TỨC</span>
            </div>
            <p className="footer-desc">
              Báo điện tử uy tín hàng đầu Việt Nam, cập nhật tin tức nhanh chóng và chính xác 24/7.
            </p>
            <div className="footer-socials">
              <button className="social-btn" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="social-btn" aria-label="Youtube">
                <Youtube className="w-5 h-5" />
              </button>
              <button className="social-btn" aria-label="Email">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Columns */}
          <div className="footer-col">
            <h4 className="footer-title">Chuyên mục</h4>
            <ul className="footer-links">
              <li>Thời sự</li>
              <li>Thế giới</li>
              <li>Kinh tế</li>
              <li>Giáo dục</li>
              <li>Thể thao</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Dịch vụ</h4>
            <ul className="footer-links">
              <li>
                <Link to="/quang-cao">Quảng cáo</Link>
              </li>
              <li>Liên hệ</li>
              <li>Tuyển dụng</li>
              <li>RSS</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Về chúng tôi</h4>
            <ul className="footer-links">
              <li>Giới thiệu</li>
              <li>Điều khoản</li>
              <li>Chính sách</li>
              <li>Bản quyền</li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="footer-col footer-subscribe">
            <h4 className="footer-title">Đăng ký nhận tin</h4>
            <p className="footer-subtext">
              Nhận tin tức mới nhất qua email
            </p>
            <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email của bạn"
                className="footer-input"
              />
              <button type="submit" className="footer-btn">
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-contact">
            <span>1900 xxxx</span>
            <span>contact@tintuc.vn</span>
            <span>TP. Hồ Chí Minh</span>
          </div>
          <p className="footer-copyright">
            © 2025 TIN TỨC. Bản quyền thuộc về Báo TIN TỨC.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


