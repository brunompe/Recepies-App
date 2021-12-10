import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Comidas({ history }) {
  return (
    <div>
      <Header pageName="Comidas" haveSearch webPage="themealdb" history={ history } />
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.string.isRequired,
};
