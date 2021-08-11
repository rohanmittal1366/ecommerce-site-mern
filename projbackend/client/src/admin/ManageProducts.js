import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authenticated } from "../auth/helper";
import Base from "../core/Base";
import { allProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState("");

  const { user, token } = authenticated();

  const preload = () => {
    allProducts()
      .then((data) => {
        //   console.log(data);
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch();
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(user._id, token, productId)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      })
      .catch();
  };

  return (
    <Base title="MANAGE PRODUCT" description="Manage products here">
      <Link className="btn btn-info mb-4" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>

      <h2 className="">All products:</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {products.length} products
          </h2>
          {products &&
            products.map((product, index) => {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-white text-left">{product.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisProduct(product._id);
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

export default ManageProducts;
