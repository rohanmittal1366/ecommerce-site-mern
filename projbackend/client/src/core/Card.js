import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { addItemToCart, RemoveItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "Product";
  const cartdescription = product
    ? product.description
    : "This product is realy good";
  const cartPrice = product ? product.price : "Default";

  const addThisToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  //   useEffect(() => {}, []);

  // to show the Add to cart Button
  const showAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={addThisToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  // to show Remove from cart button
  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            RemoveItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {/* {getRedirect(redirect)} */}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap mt-3">
          {cartdescription}
        </p>

        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart()}</div>
          <div className="col-12">{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
