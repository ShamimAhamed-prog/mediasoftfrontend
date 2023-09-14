import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductPage from './Component/ProductPage';
import Login from './Component/Login';
import Registration from './Component/registration';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={ProductPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
