import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'Router';

import './styles/index.css';

// const getRoute = () => {
//   if (window.location.pathname === '/') return <App />;
//   if (window.location.pathname === '/me') return <MyProfile />;

//   return null;
// };

// Client side routing

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
