import PropTypes from 'prop-types';
import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Bebibas({ history }) {
  return (
    <div>
      <Header pageName="Bebidas" haveSearch webPage="thecocktaildb" history={ history } />
      <Footer />
    </div>
  );
}

Bebibas.propTypes = {
  history: PropTypes.string.isRequired,
};
