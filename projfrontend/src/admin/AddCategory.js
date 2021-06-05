import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = authenticated();

  // function for go back to admin dashboard
  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3 ">
        Admin Home
      </Link>
    </div>
  );

  // to handle the change of fields in the form
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  // function to handle the submit button
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request
    createCategory(user._id, token, { name }).then((data) => {
      if (data && data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create category</h4>;
    }
  };

  const categoryForm = () => (
    <form action="">
      <div className="form-group">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For ex. Summer"
          onChange={handleChange}
          value={name}
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Add Category page"
      description="Here you can create categories"
      className="container bg-info p-3"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {categoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
