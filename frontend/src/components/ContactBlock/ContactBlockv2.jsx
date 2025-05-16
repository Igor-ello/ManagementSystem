import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ContactBlock.scss';

const ContactBlockv2 = ({ label, type, value, onChange, placeholder, required }) => {
  return (
    <div className="contact-block mb-3">
      <label className="contact-block__label">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="contact-block__input form-control"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
        />
      ) : (
        <input
          type={type}
          className="contact-block__input form-control"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

ContactBlockv2.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

ContactBlockv2.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
};

export default ContactBlockv2;
