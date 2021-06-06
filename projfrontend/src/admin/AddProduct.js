import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authenticated } from "../auth/helper";
import Base from "../core/Base";
import { allCategory, createProduct } from "./helper/adminapicall";

function AddProduct() {
  const { user, token } = authenticated();

  const [values, setValues] = useState({
    name: "",
    discription: "",
    stock: "",
    price: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  // destructure the values
  const {
    name,
    discription,
    stock,
    price,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  // set the categories in the form field
  const preload = () => {
    allCategory().then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        // console.log("CATEGORIES : ", categories);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  // call function on click submit button

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            discription: "",
            price: "",
            photo: "",
            stock: "",
            loading: true,
            getaRedirect: true,
            createdProduct: data.name,
          });
        }
      })
      .then();
  };

  // handle the change in fields of the form
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // display message after created category
  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  // to print error
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const createProductForm = () => (
    <form className="mt-3">
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("discription")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={discription}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product "
      description="welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}

export default AddProduct;
