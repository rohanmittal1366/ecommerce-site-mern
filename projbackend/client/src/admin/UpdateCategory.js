import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = authenticated();

  // function for go back to admin dashboard
  const goBack = () => (
    <div className="">
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

  const preload = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        //   console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setName(data.name);
        }
      })
      .catch();
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  // function to handle the submit button
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request
    updateCategory(user._id, token, { name }, match.params.categoryId)
      .then((data) => {
        // console.log(name);
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
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };

  // display error message
  const warningMessage = () => {
    if (error) {
      // console.log(error);
      return <h4 className="text-danger">Failed to update category</h4>;
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
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="UPDATE CATEGORY"
      description="Here you can update categories"
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

export default UpdateCategory;
