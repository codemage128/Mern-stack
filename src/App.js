import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { Provider } from 'react-redux';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

import { DefaultLayout } from './containers';
import { Login, Page404, Page500, Register } from './views/Pages';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import { RequireAuth } from './containers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);


const isLogin = localStorage.getItem('isLogin');

if (isLogin) {
  store.dispatch({ type: AUTH_USER, user: JSON.parse(localStorage.getItem('user')), token: localStorage.getItem('token') })
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" name="Home" component={RequireAuth(DefaultLayout)} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
