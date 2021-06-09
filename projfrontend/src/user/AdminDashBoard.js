import React from "react";
import { Link } from "react-router-dom";
import { authenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { name, lastname, email, role },
  } = authenticated();

  const adminLeftSide = () => {
    return (
      <div className="card ">
        <h4 className="card-header bg-dark text-white">Admin Naviagtion</h4>
        <ul className="list-group pre-scrollable">
          <li className="list-group-item">
            <Link
              to="/admin/create/category"
              className="nav-link text-success "
            >
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success ">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name :</span>
            {name} {lastname}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email :</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin page"
      description="Manage your products and categories here"
      className="container bg-success p-2"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
