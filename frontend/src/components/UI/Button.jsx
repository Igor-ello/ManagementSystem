import React from 'react';
import './Button.scss';

export const Button = ({ children, variant = 'primary', ...props }) => {
  const className = variant === 'secondary' ? 'btn btn-secondary' : 'btn btn-primary';
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
