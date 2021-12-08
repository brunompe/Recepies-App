import React from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Bebidas from './pages/Bebibas';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
