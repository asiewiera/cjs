import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Main from 'components/layouts/main/Main';
import InputGroup from 'components/elements/inputGroup/InputGroup';
import Button from 'components/elements/button/Button';
import { update, get } from 'services/firebase';

function MyProfile() {
  const [profileName, setProfileName] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    get('currentUser').then((user) => {
      console.log('User', user);
      if (user && user.name) {
        setProfileName(user.name);
      }
    });
  }, []);

  const handleNameChange = (event) => {
    const inputName = event.target.value;
    setProfileName(inputName);
    setIsError(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Profile name saved:', profileName);

    if (profileName === null || profileName === '') {
      setIsError(true);
      return;
    }

    update('currentUser/', {
      name: profileName,
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <Main>
      <div>
        <h1>Hello My Profile</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <InputGroup
              inputId="profileName"
              type="text"
              label="Name"
              handleInputChange={handleNameChange}
              inputValue={profileName}
              errorInInput={isError}
            />
            {/* Send Msg jest typu children */}
            <Button type="submit">
              <i>&#9728;</i>
              Save
            </Button>
          </div>
        </form>
      </div>
    </Main>
  );
}

export default MyProfile;
