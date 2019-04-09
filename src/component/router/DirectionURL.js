import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../login/Login";
import Register from "../login/Register";
import ChatRoom from "../chat-room/ChatRoom";
import { ProtectedRoute } from "../ProtectedRoute";

const ErrorPage = () => {
  return <h1 align="center">404</h1>;
};

export class DirectionURL extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={props => <Login {...props} />} />
        <ProtectedRoute exact path="/chat-room" render={() => <ChatRoom />} />
        <Route exact path="/register" component={Register} />
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

export default DirectionURL;
