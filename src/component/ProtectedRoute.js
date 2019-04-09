import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "./auth";

export const ProtectedRoute = ({ render: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Auth()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
