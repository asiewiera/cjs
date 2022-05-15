import PropTypes from 'prop-types';

const { MainContext } = require('contexts/main');
const { useContext, useEffect } = require('react');
const { useNavigate } = require('react-router-dom');

export function RestrictedRoute({ children }) {
  const { currentUser } = useContext(MainContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, []);

  return children;
}
// na  stronie glownej zalogowany user
export function PublicRoute({ children }) {
  const { currentUser } = useContext(MainContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, []);

  return children;
}

RestrictedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
