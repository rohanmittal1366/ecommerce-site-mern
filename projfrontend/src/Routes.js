import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashBoard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
