import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explorar.css';

export default function Explorar() {
  return (
    <div>
      <Header pageName="Explorar" />
      <div className="main-div-explorer">
        <Link
          to="/explorar/comidas"
        >
          <button
            className="explorer-btn"
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas

          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            className="explorer-btn"
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas

          </button>
        </Link>
        <Footer />
      </div>

    </div>
  );
}
