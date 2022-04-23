import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

function InputGroup({
  inputId,
  type,
  label,
  inputValue,
  handleInputChange,
  errorInInput,
}) {
  return (
    <div>
      <label htmlFor={inputId}>
        {label}
        <input
          type={type}
          id={inputId}
          value={inputValue}
          onChange={handleInputChange}
        />
      </label>
      {errorInInput ? (
        <p className={styles.error}>Field cannot be empty</p>
      ) : null}
    </div>
  );
}

InputGroup.defaultProps = {
  inputId: 'InputGroupId',
  type: 'text',
  label: 'text',
  inputValue: '',
  handleInputChange: () => {},
  errorInInput: false,
};

InputGroup.propTypes = {
  inputId: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  inputValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  errorInInput: PropTypes.bool,
};

export default InputGroup;
