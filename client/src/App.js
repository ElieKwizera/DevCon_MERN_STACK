import React, { Fragment,useEffect } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/Register';
import Login from './components/Login';
import Alert from './components/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './helpers/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () =>
{
  

    useEffect(()=>
    {
      store.dispatch(loadUser());
    },[]
  );
  
  
 
  
  return (
    <Provider store={store}>

      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert/>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
          
        </Fragment>
      </Router>
    </Provider>
   
  )
}

export default App;
