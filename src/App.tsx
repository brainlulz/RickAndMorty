import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './App.module.css';


import Characters from './components/Characters';
import Home from './components/Home';

function App() {
  return (
    <Router basename='/' >
      <div>
        <nav>
          <ul className={styles.navbar}>
            <li className={styles.navbar}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.navbar}>
              <Link to="/characters">Characters</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;