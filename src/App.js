import React from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch}  from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import UserForm from './components/Guest-user-form'
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home}/>
          <Route path="/guest-details" component={UserForm}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>
      </Router>
      );
}

export default App;
