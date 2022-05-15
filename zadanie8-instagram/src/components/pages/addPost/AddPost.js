import React, { useState } from 'react';
import Main from 'components/layouts/main/Main';
import { useNavigate } from 'react-router-dom';

import {} from 'firebase/auth';

import InputGroup from 'components/elements/input-group/InputGroup';
import Button from 'components/elements/button/Button';

// import { MainContext } from 'contexts/main';
import { RestrictedRoute } from 'utils/AuthorizationRoutes';

function AddPost() {
  // const { currentUser } = useContext(MainContext);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [apiError, setAPiError] = useState('');

  const navigate = useNavigate();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    console.log('To create', title, description);

    if (title === null || description === null) {
      setAPiError('Title and description cannot be null');
      return;
    }

    navigate('/dashboard');
  };

  return (
    <RestrictedRoute>
      <Main>
        Hello from Create Post
        <form className="form" onSubmit={handleCreate}>
          <InputGroup
            id="title"
            type="text"
            label="Title"
            handleChange={handleTitle}
            inputValue={title}
          />
          <InputGroup
            id="description"
            type="text"
            label="Description"
            handleChange={handleDescription}
            inputValue={description}
          />
          <Button btnType="submit">Create Post</Button>
          {apiError && <p>{apiError}</p>}
        </form>
      </Main>
    </RestrictedRoute>
  );
}

export default AddPost;
