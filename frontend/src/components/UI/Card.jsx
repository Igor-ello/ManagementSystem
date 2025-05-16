import React from 'react';
import { Button } from './Button';
import './Card.scss';

export const Card = ({ title, text }) => (
  <div className="card custom-card">
    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{text}</p>
      <Button variant="secondary">Learn More</Button>
    </div>
  </div>
);
scss
Копировать
Редактировать
