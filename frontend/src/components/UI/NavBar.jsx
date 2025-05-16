import React from 'react';
import { Button } from './Button';
import './NavBar.scss';

export const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
    <a className="navbar-brand" href="/">Logo</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse"
      data-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
        <li className="nav-item"><a className="nav-link" href="#cases">Cases</a></li>
        <li className="nav-item"><a className="nav-link" href="#team">Team</a></li>
      </ul>
      <Button variant="primary">Contact us</Button>
    </div>
  </nav>
);
