import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';
import Signin from './Signin';
import Signup from './Signup';
import EditForm from './profolio/edit_form';
import { AuthRoute, ProtectedRoute } from './SpecialRoutes';

function App() {
  const loggedIn = false;
  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <Switch>
        <AuthRoute exact path="/signin" component={Signin} />
        <AuthRoute exact path="/signup" component={Signup} />
        <Route exact path="/" component={Landing} />
        {/* <ProtectedRoute exact path='/edit' component={EditForm} /> */}
      </Switch>
    </div>
  );
}

export default App;
