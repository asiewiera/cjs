import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { auth } from 'services/firebase';

import { onAuthStateChanged } from 'firebase/auth';

export const MainContext = React.createContext({
  currentUser: null,
});

export function MainContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    setIsLoading(false);
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <MainContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ currentUser }}
    >
      {children}
    </MainContext.Provider>
  );
}

MainContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
