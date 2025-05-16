import React from 'react';
import PropTypes from 'prop-types';
import './ContactBlockv2.scss';

const ContactBlockv1 = ({ title, fields }) => {
  return (
    <div className="contact-block card p-3">
      <h3 className="section-title mb-3">{title}</h3>
      <div className="contact-fields">
        {fields.map(({ label, value, type = 'text' }, index) => {
          // Можно добавить разные форматы рендера в зависимости от type
          let content;
          switch (type) {
            case 'email':
              content = <a href={`mailto:${value}`}>{value}</a>;
              break;
            case 'phone':
              content = <a href={`tel:${value}`}>{value}</a>;
              break;
            case 'link':
              content = <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>;
              break;
            default:
              content = <span>{value}</span>;
          }

          return (
            <div key={index} className="contact-field d-flex justify-content-between mb-2">
              <div className="contact-label fw-bold">{label}</div>
              <div className="contact-value">{content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ContactBlockv1.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      type: PropTypes.string, // 'text', 'email', 'phone', 'link'
    })
  ).isRequired,
};

export default ContactBlockv1;
