import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './components/App';
import ScrollHelper from './ScrollHelper';
import configureStore from './store/store.js';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/SessionApiUtil';
import { signout } from './actions/SessionActions';

import './stylesheets/modal.css';
import './stylesheets/profolio.css';
import './stylesheets/charts.css';
import './stylesheets/appForm.css';
import './stylesheets/landing.css';
import './stylesheets/app-list.css';
// BEGIN testing
import * as sessionActions from './actions/SessionActions';
import * as userActions from './actions/UserActions';
import * as applicationActions from './actions/ApplicationActions';
import * as jobActions from './actions/JobActions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // Create a preconfigured state we can immediately add to our store
  let preloadedState = {};

  if (localStorage.jwtToken) {
    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's info
    const decodedUser = jwt_decode(localStorage.jwtToken);

    preloadedState = {
      ...preloadedState,
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    // If token has expired
    if (decodedUser.exp < currentTime) {
      // signout the user and redirect to login
      store.dispatch(signout());
      window.location.href = '/login';
    }
  } else {
    // First time user, start w/ empty store
    store = configureStore();
  }

  const root = document.getElementById('root');

  ReactDOM.render(
    <Provider store={store}>
      <CssBaseline />
      <Router>
        <ScrollHelper>
          <App />
        </ScrollHelper>
      </Router>
    </Provider>,
    root
  );

  // BEGIN testing

  window.store = store;

  // return the current user if logged in, fetching user data if necessary
  // let curr = await currentUser();
  window.currentUser = function () {
    const state = store.getState();
    if (!state.session.user) return null;

    const userId = state.session.user.id;
    return (
      state.entities.users[userId] ||
      store.dispatch(userActions.fetchUser(userId))
    );
  };
  window.sessionActions = sessionActions;
  window.signout = signout;
  window.applicationActions = applicationActions;
  window.jobActions = jobActions;
  // END testing
});
