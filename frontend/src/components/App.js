import React from 'react';
import { useLocation } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';
import Signin from './Signin';
import Signup from './Signup';
import EditForm from './profolio/edit_form';
import { AuthRoute, ProtectedRoute } from './SpecialRoutes';
import Profolio from './profolio/profolio_container';
import ApplicationList from './ApplicationList';
import ApplicationListItem from './ApplicationListItem';
import Footer from './Footer';
import Charts from './charts/allChartsContainer'
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
        <Route exact path="/" component={Landing} />
        {/* <ProtectedRoute exact path='/edit' component={EditForm} /> */}
        <Route exact path="/item" component={ApplicationListItem} />
        <Route exact path="/list" component={ApplicationList} />
      </Switch>
      {location.pathname === '/signin' || location.pathname === '/signup' ? (
        <div></div>
      ) : (
          <Footer />
        )}
      <Charts />
    </div>
  );
}

export default App;
