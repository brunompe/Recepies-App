import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

export default function RedirectPage({ history }) {
  useEffect(() => {
    history.push('/receitas-favoritas');
  }, []);
  return (
    <div />
  );
}

RedirectPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
