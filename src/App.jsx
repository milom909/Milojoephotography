import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import PhotoDetail from './pages/PhotoDetail';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/photo/:id" component={PhotoDetail} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </Router>
  );
};

export default App;