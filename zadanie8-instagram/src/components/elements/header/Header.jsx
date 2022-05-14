import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signOutUser } from 'services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Button from '../button/Button';

import styles from './style.module.css';

function Header() {
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  const signOut = () => {
    signOutUser().then(() => {
      navigate('/');
    });
  };
  console.log('currentUser', currentUser);
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logo}>
          <h1 className={styles.title}>Instagram App</h1>
        </Link>
        <nav className={styles.navigation}>
          <ul>
            {currentUser ? (
              <Button onClick={signOut}>Sign Out</Button>
            ) : (
              <>
                <li>
                  <Link to="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <Button>Sign In</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
