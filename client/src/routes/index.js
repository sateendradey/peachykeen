import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from '../components/Signup';
import Main from '../components/Main';
import Login from '../components/Login';
import About from '../components/About';
import AppliedRoute from "../components/AppliedRoute";
import NotFound from "../components/NotFound";
import Profile from "../components/Profile";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";
import Restaurant from '../components/Restaurant';
import Admin from '../components/Admin'



const Routes = ({ childProps }) => (
  <Switch>
    <AppliedRoute exact path="/" exact component={Main} props={childProps} />
    <AppliedRoute exact path="/main" exact component={Main} props={childProps} />
    <UnauthenticatedRoute exact path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute exact path="/signup" exact component={Signup} props={childProps} />a
    <AppliedRoute exact path="/about" exact component={About} props={childProps} />
    <AppliedRoute exact path="/restaurant/:id" exact component={Restaurant} props={childProps} />
    <AuthenticatedRoute exact path="/profile/:email" exact component={Profile} props={childProps} />
    <AuthenticatedRoute exact path="/profile" exact component={Profile} props={childProps} />
    <AppliedRoute exact path="/admin" exact component={Admin} props={childProps} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
