import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

function Button(props) {
  const { type, children } = props;
  return (
    <button className={styles.button} type={type}>
      {children}
    </button>
  );
}
// domyslne wartosci
Button.defaultProps = {
  type: 'button',
  children: null,
};

// dokumentujemy typy - dobra praktyka
Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
