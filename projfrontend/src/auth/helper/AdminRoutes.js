import React from "react";
import { Redirect, Route } from "react-router";
import { authenticated } from "./index";

const AdminRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated() && authenticated().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoutes;
