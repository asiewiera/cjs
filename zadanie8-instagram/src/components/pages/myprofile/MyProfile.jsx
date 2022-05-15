import React, { useState, useContext } from 'react';
import Main from 'components/layouts/main/Main';
import { useNavigate } from 'react-router-dom';
import { updateUser } from 'services/firebase';
import {} from 'firebase/auth';

import InputGroup from 'components/elements/input-group/InputGroup';
import Button from 'components/elements/button/Button';

import { MainContext } from 'contexts/main';
import { RestrictedRoute } from 'utils/AuthorizationRoutes';

import styles from './style.module.css';

function MyProfile() {
  const { currentUser } = useContext(MainContext);

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [photoURL, setphotoUrl] = useState(currentUser.photoURL);
  const [apiError, setAPiError] = useState('');

  const navigate = useNavigate();

  const handleDisplayName = (event) => {
    setDisplayName(event.target.value);
  };

  const handlePhotoUrl = (event) => {
    setphotoUrl(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log('To update', displayName, photoURL);
    updateUser(displayName, photoURL)
      .then(() => {
        console.log('updated', displayName, photoURL);
        navigate('/dashboard');

        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error.message);
        setAPiError(error.message);
        // ..
      });
  };

  return (
    <RestrictedRoute>
      <Main>
        Hello from My profile
        {currentUser && currentUser.photoURL && (
          <img src={currentUser.photoUrl} alt="not defined" />
        )}
        <form className="form" onSubmit={handleUpdate}>
          <InputGroup
            id="email"
            type="text"
            label="Email"
            handleChange={() => {}}
            inputValue={currentUser?.email}
          />
          <InputGroup
            id="displayName"
            type="text"
            label="DisplayName"
            handleChange={handleDisplayName}
            inputValue={displayName}
          />
          <InputGroup
            id="photoUrl"
            type="text"
            label="PhotoUrl"
            handleChange={handlePhotoUrl}
            inputValue={photoURL}
          />
          <img src={photoURL} alt="no url" className={styles.photo} />
          <Button btnType="submit">Update</Button>
          {apiError && <p>{apiError}</p>}
        </form>
      </Main>
    </RestrictedRoute>
  );
}

export default MyProfile;
