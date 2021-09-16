import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import UserForm from "./components/Guest-user-form";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Home} />
          <Route path="/guest-information" component={UserForm} />
          <Route path="/preferences" component={Dashboard} />
          <PrivateRoute path="/preferences" component={Dashboard} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
