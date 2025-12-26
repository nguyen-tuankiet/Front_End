import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  
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
              {t('footer.brandDesc')}
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
            <h4 className="footer-title">{t('footer.categories')}</h4>
            <ul className="footer-links">
              <li>{t('nav.news')}</li>
              <li>{t('nav.world')}</li>
              <li>{t('nav.business')}</li>
              <li>{t('nav.education')}</li>
              <li>{t('nav.sports')}</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">{t('footer.services')}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/quang-cao">{t('header.advertising')}</Link>
              </li>
              <li>{t('footer.contact')}</li>
              <li>{t('footer.hiring')}</li>
              <li>RSS</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">{t('footer.aboutUs')}</h4>
            <ul className="footer-links">
              <li>{t('footer.introduction')}</li>
              <li>{t('footer.terms')}</li>
              <li>{t('footer.policy')}</li>
              <li>{t('footer.copyright')}</li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="footer-col footer-subscribe">
            <h4 className="footer-title">{t('footer.subscribeNews')}</h4>
            <p className="footer-subtext">
              {t('footer.receiveLatestNews')}
            </p>
            <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('footer.yourEmail')}
                className="footer-input"
              />
              <button type="submit" className="footer-btn">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-contact">
            <span>1900 xxxx</span>
            <span>contact@tintuc.vn</span>
            <span>{t('header.cityWeather')}</span>
          </div>
          <p className="footer-copyright">
            {t('footer.copyrightText')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


