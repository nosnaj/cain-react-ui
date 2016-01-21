import React from 'react';

import Shell from './containers/Shell';
import Home from './containers/Home';
import Styles from './containers/Styles';
import Counters from './containers/Counters';
import NotFound from './containers/NotFound';

var routes = {
  path: '/',
  component: Shell,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'styles', component: Styles },
    { path: 'home', component: Home },
    { path: 'Counter', component: Counters },
    { path: '*', component: NotFound }
  ]
};

module.exports = routes;
