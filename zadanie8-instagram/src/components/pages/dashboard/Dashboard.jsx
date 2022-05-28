import React, { useState, useEffect, useContext } from 'react';
import Main from 'components/layouts/main/Main';

import { RestrictedRoute } from 'utils/AuthorizationRoutes';
import { get, save, update } from 'services/firebase';

import { MainContext } from 'contexts/main';

import 'react-toastify/dist/ReactToastify.css';

import styles from './style.module.css';

function Dashboard() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    get('posts').then((data) => {
      setPosts(Object.values(data ?? {}));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const { currentUser } = useContext(MainContext);

  const handleLike = (post) => {
    const wasLiked =
      post.likes && post.likes.find((el) => el.email === currentUser.email);
    if (wasLiked) {
      console.log('You already liked the post');
      return;
    }

    const newLikes = post.likes
      ? post.likes.concat({ email: currentUser.email })
      : [{ email: currentUser.email }];

    update(`posts/${post.id}`, {
      ...post,
      likes: newLikes,
    }).then(() => {
      const copiedPostArray = [...posts];
      const selectedPostIndex = posts.findIndex(
        (frontPost) => frontPost.id === post.id
      );
      copiedPostArray[selectedPostIndex].likes = newLikes;
      setPosts(copiedPostArray);
      console.log('liked', post);
      save('notifications', {
        value: 'New person liked your post',
        receipent: post.author?.name,
      });
    });
  };

  return (
    <RestrictedRoute>
      <Main>
        <ul className={styles.list}>
          {posts.map((singlePost) => {
            const wasLiked =
              singlePost.likes &&
              singlePost.likes.find((el) => el.email === currentUser.email);
            return (
              <li key={singlePost.id}>
                <div className={styles.avatarContainer}>
                  <img src={singlePost.author?.avatar} alt="avatar" />
                  <p>{singlePost.author?.name}</p>
                </div>
                <img src={singlePost.image} alt="post" />

                <div className={styles.descriptionContainer}>
                  <div className={styles.likesContainer}>
                    <button
                      onClick={() => handleLike(singlePost)}
                      className={wasLiked ? styles.liked : ''}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ei-like.svg/1200px-Ei-like.svg.png"
                        alt="Like"
                      />
                      Like ({singlePost.likes?.length || 0})
                    </button>
                  </div>
                  <p className={styles.title}>{singlePost.title}</p>
                  <p className={styles.description}>{singlePost.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Main>
    </RestrictedRoute>
  );
}

export default Dashboard;
