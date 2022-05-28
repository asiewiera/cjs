import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser } from 'services/firebase';

import { MainContext } from 'contexts/main';
import Button from '../button/Button';

import styles from './style.module.css';

function Header() {
  const navigate = useNavigate();

  const { currentUser } = useContext(MainContext);

  // console.log('Context currentUser', currentUser);

  const signOut = () => {
    signOutUser().then(() => {
      navigate('/');
    });
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logo}>
          <h1 className={styles.title}>Instagram App</h1>
        </Link>
        <nav className={styles.navigation}>
          <ul>
            {currentUser ? (
              <>
                <Link to="/create">
                  <Button>Add Post</Button>
                </Link>
                <img
                  className={styles.avatar}
                  src={currentUser.photoURL}
                  alt="not defined"
                />

                <Link to="/me">
                  <Button>My Profile</Button>
                </Link>
                <Button onClick={signOut}>Sign Out</Button>
              </>
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
