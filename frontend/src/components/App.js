import React from 'react';
import { useLocation } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing_container';
import Signin from './Signin';
import Signup from './Signup';
import { AuthRoute, ProtectedRoute } from './SpecialRoutes';
import Profolio from './profolio/profolio_container';
import ApplicationList from './ApplicationList';
import ApplicationDetailItem from './ApplicationDetailItem';
import Footer from './Footer';
import ApplicationPostForm from './appForms/appPostForm';
import ApplicationEditForm from './appForms/appEditForm';

function App() {
  const loggedIn = false;
  const location = useLocation();
  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <Switch>
        <AuthRoute exact path="/signin" component={Signin} />
        <AuthRoute exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/edit" component={Profolio} />
        <ProtectedRoute
          exact
          path="/newApplication"
          component={ApplicationPostForm}
        />
        <ProtectedRoute
          exact
          path="/editApplication/:applicationId"
          component={ApplicationEditForm}
        />
        <Route exact path="/" component={Landing} />
        {/* <ProtectedRoute exact path='/edit' component={EditForm} /> */}
        <Route exact path="/item" component={ApplicationDetailItem} />
        <Route exact path="/list" component={ApplicationList} />
      </Switch>
      {location.pathname === '/signin' || location.pathname === '/signup' ? (
        <div></div>
      ) : (
        <Footer />
      )}
      {/* <Charts />
      <ApplicationPostForm /> */}
    </div>
  );
}

export default App;
