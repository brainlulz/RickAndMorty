import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Characters from '../Characters';

function App() {
  return (
    <Router basename="/">
      <div>
        <Switch>
          <Route path="/">
            <Characters />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
