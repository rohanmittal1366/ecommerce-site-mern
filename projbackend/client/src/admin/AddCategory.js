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
    <div className="">
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3 ">
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
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data && data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch();
  };

  // display message after created category
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  // display error message
  const warningMessage = () => {
    if (error) {
      // console.log(error);
      return <h4 className="text-danger">Failed to create category</h4>;
    }
  };

  const categoryForm = () => (
    <form action="">
      <div className="form-group mt-4 text-dark">
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
        <button onClick={onSubmit} className="btn btn-outline-info mb-3">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Add Category page"
      description="Here you can create categories"
      className="container bg-info p-4 mb-5"
    >
      {goBack()}
      <div className="row bg-white rounded mb-4 ">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
