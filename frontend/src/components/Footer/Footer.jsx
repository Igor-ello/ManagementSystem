import React from 'react';
import './Footer.scss';
import logo from '../../assets/logo.svg';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__branding">
          <img src={logo} alt="Positivus" className="footer__logo" />
          <p className="footer__copyright">© 2025 Positivus. All rights reserved.</p>
        </div>
        <div className="footer__links">
          <div>
            <h5>About us</h5>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Career</a></li>
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              <li><a href="#">Design</a></li>
              <li><a href="#">Development</a></li>
              <li><a href="#">Marketing</a></li>
              <li><a href="#">See More</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="#">+123 456 789</a></li>
              <li><a href="#">info@positivus.com</a></li>
              <li><a href="#">123 Creative Ave</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__social">
          <Facebook size={20} />
          <Twitter size={20} />
          <Linkedin size={20} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
