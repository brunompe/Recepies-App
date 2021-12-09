import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Bebidas from './pages/Bebibas';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ComidasIngredientes from './pages/ComidasIngredientes';
import BebidasIngredientes from './pages/BebidasIngredientes';
import BebidasLocal from './pages/BebidasLocal';
import ComidasLocal from './pages/ComidasLocal';
import Perfil from './pages/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ComidasIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ComidasLocal } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ BebidasIngredientes }
        />
        <Route exact path="/explorar/bebidas/area" component={ BebidasLocal } />

        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
