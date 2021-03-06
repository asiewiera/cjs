import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import styles from './styles.module.css';

function Main({ children }) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <h1 className={styles.title}>Chat App</h1>
        </Link>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link to="/me">My Profile</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
      <footer className={styles.footer}>hello footer</footer>
    </div>
  );
}

// // domyslne wartosci
// Main.defaultProps = {
//   children: null,
// };

// // dokumentujemy typy - dobra praktyka
// Main.propTypes = {
//   children: PropTypes.node,
// };

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
