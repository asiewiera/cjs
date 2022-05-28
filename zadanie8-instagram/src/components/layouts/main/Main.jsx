import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from 'components/elements/header/Header';
import Footer from 'components/elements/footer/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { observeOnlyNew } from 'services/firebase';
import { MainContext } from 'contexts/main';

function Main({ children }) {
  const { currentUser } = useContext(MainContext);

  useEffect(() => {
    observeOnlyNew('notifications', (notification) => {
      console.log('Notifications: ', notification);
      if (notification.reciepent === currentUser.displayName) {
        toast('You succesfully liked comment');
      }
    });
  }, []);

  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
