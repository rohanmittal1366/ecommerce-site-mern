import React from "react";
import { Redirect, Route } from "react-router";
import { authenticated } from "./index";

const AdmineRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated && authenticated.user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin ",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdmineRoutes;
