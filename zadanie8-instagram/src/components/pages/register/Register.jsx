import React, { useState } from 'react';
import Main from 'components/layouts/main/Main';
import InputGroup from 'components/elements/input-group/InputGroup';
import Button from 'components/elements/button/Button';

import { PublicRoute } from 'utils/AuthorizationRoutes';

import { registerUser } from 'services/firebase';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [apiError, setAPiError] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    registerUser(email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
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
    <PublicRoute>
      <Main>
        <h1>Hello Register</h1>
        <form className="form" onSubmit={handleRegister}>
          <InputGroup
            id="email"
            type="text"
            label="Email"
            handleChange={handleEmailChange}
            inputValue={email}
          />
          <InputGroup
            id="password"
            type="text"
            label="Password"
            handleChange={handlePasswordChange}
            inputValue={password}
          />
          <Button btnType="submit">Sign Up</Button>
          {apiError && <p>{apiError}</p>}
        </form>
      </Main>
    </PublicRoute>
  );
}

export default Register;
