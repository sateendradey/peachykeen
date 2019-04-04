import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from '../components/Signup';
import Main from '../components/Main';
import Login from '../components/Login';
import About from '../components/About';
import AppliedRoute from "../components/AppliedRoute";
import NotFound from "../components/NotFound";


const Routes = ({ childProps }) => (
  <Switch>
    <AppliedRoute exact path="/" exact component={Main} props={childProps} />
    <AppliedRoute exact path="/main" exact component={Main} props={childProps} />
    <AppliedRoute exact path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute exact path="/login" exact component={Login} props={childProps} />
    <AppliedRoute exact path="/about" exact component={About} props={childProps} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
