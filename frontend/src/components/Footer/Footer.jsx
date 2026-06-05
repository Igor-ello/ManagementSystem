import React from 'react';
import './Footer.scss';
import logo from '../../assets/logo.svg';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-top container">
        <Link className="footer-brand" to="/home">
            <img src={logo} alt="Squadly Logo" className="footer-logo"/>
            <h1>Squadly</h1>
        </Link>

        <nav className="footer-nav">
          <a href="#">О нас</a>
          <a href="#">Документация</a>
          <a href="#">Сценарии использования</a>
          <a href="#">Блог</a>
        </nav>

        <div className="footer-social">
          <Linkedin />
          <Facebook />
          <Twitter />
        </div>
      </div>

      <div className="footer-middle container">
        <div className="footer-contact">
          <p className="footer-contact-label">Связаться с нами:</p>
          <div className="contact-item">
            <Mail className="contact-icon" />
            <span>info@squadly.com</span>
          </div>
          <div className="contact-item">
            <Phone className="contact-icon" />
            <span>8(916)5345040</span>
          </div>
          <div className="contact-item">
            <MapPin className="contact-icon" />
            <span>1234 Main St<br />Moonstone City, Stardust State 12345</span>
          </div>
        </div>

        <div className="footer-subscribe">
          <input type="email" placeholder="Email" />
          <button>Подписаться на новости</button>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© 2025 Squadly.</p>
      </div>
    </footer>
  );
};

export default Footer;