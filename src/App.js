import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import DashboardAdmin from "./components/DashboardAdmin/js/DashboardAdmin";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard-admin" />
        </Route>
        <Route path="/dashboard-admin" component={DashboardAdmin} />
      </Switch>
    </Router>
  );
}
export default App;
