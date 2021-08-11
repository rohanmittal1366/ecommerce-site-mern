import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { authenticated } from "../auth/helper";
import { allCategory, deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = authenticated();

  const preload = () => {
    allCategory()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch();
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(user._id, token, categoryId)
      .then((data) => {
        // console.log(categoryId);
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      })
      .catch();
  };

  return (
    <Base
      title="MY CATEGORY"
      description="Manage your categories here"
      className=" p-4 mb-5"
    >
      <Link className="btn btn-info mb-4" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>

      <h2 className="mb-4 text-white">All Categories:</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {categories.length} categories
          </h2>
          {categories.map((category, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4 text-left">
                  <h3 className="text-white">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
