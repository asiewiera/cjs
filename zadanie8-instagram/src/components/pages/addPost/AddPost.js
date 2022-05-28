import React, { useState, useContext } from 'react';
import Main from 'components/layouts/main/Main';
import { useNavigate } from 'react-router-dom';

import {} from 'firebase/auth';

import { addFileToStorage, save } from 'services/firebase';

import InputGroup from 'components/elements/input-group/InputGroup';
import Button from 'components/elements/button/Button';

import { MainContext } from 'contexts/main';
import { RestrictedRoute } from 'utils/AuthorizationRoutes';

import ENDPOINTS from 'consts/endpoint';

function AddPost() {
  const { currentUser } = useContext(MainContext);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const [file, setFile] = useState(null);

  const [apiError, setAPiError] = useState('');

  const navigate = useNavigate();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title === null || description === null) {
      setAPiError('Title and description cannot be null');
      return;
    }

    // z firebase
    addFileToStorage(file)
      .then((url) => {
        console.log('submit post');
        console.log(currentUser);
        console.log(title);
        console.log(description);
        console.log(url);

        const newPost = {
          title,
          description,
          image: url,
          author: {
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
        };

        return save(ENDPOINTS.posts, newPost);
      })
      .then(() => navigate('/dashboard'));
  };

  return (
    <RestrictedRoute>
      <Main>
        Hello from Create Post
        <form className="form" onSubmit={handleSubmit}>
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
          <InputGroup
            id="file"
            type="file"
            label="File"
            handleChange={handleFileChange}
          />
          <Button btnType="submit">Create Post</Button>
          {apiError && <p>{apiError}</p>}
        </form>
      </Main>
    </RestrictedRoute>
  );
}

export default AddPost;
