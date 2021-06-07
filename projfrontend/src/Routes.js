import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashBoard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />

        {/* User  */}
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />

        {/* User and admin Dashboard */}
        <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />

        {/* Category Routes */}
        <AdminRoutes
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoutes
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoutes
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />

        {/* Products Routes */}
        <AdminRoutes
          path="/admin/create/product"
          exact
          component={AddProduct}
        />
        <AdminRoutes
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoutes path="/admin/products" exact component={ManageProducts} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
