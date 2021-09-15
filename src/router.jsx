import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/index';
import Store from './store';

function Content() {
  return (
    <div id="app">
      <Switch>
        <Route path="/" exact component={Index} />
      </Switch>
    </div>
  );
}

function MyRouter(props) {
  return (
    <Router {...props}>
      <Store>
        <Content />
      </Store>
    </Router>
  );
}

export default MyRouter;
