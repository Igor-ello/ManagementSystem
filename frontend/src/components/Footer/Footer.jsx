import React from 'react';
import './Footer.scss';
import logo from '../../assets/logo.svg';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-top container">
        <img src={logo} alt="Logo" className="footer-logo" />

        <nav className="footer-nav">
          <a href="#">About us</a>
          <a href="#">Services</a>
          <a href="#">Use Cases</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
        </nav>

        <div className="footer-social">
          <Linkedin />
          <Facebook />
          <Twitter />
        </div>
      </div>

      <div className="footer-middle container">
        <div className="footer-contact">
          <p className="footer-contact-label">Contact us:</p>
          <p>Email: info@squadly.com</p>
          <p>Phone: 8(916)5345040</p>
          <p>Address: 1234 Main St<br />Moonstone City, Stardust State 12345</p>
        </div>

        <div className="footer-subscribe">
          <input type="email" placeholder="Email" />
          <button>Subscribe to news</button>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© 2025 Squadly.</p>
      </div>
    </footer>
  );
};

export default Footer;
