import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authenticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "./CartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../../backend";
import { createOrder } from "./OrderHelper";
const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  // calculate the price in checkout section
  const getFinalPrice = () => {
    let amount = 0;
    products &&
      products.map((p) => {
        amount = amount + p.price;
      });

    return amount;
  };

  const tokens = authenticated() && authenticated().token;
  const userId = authenticated() && authenticated().user._id;

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        // console.log(response);
        const { status } = response;
        console.log("STATUS", status);
        const orderData = {
          products: products,
          amount: getFinalPrice(),
        };
        createOrder(userId, tokens, orderData);
        cartEmpty(() => {});
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  // conditional rendering of payment button
  const showStripeButton = () => {
    return products.length > 0 ? (
      authenticated() ? (
        <StripeCheckoutButton
          stripeKey="pk_test_51J04JASFQXAPTcwoeybyST6gSIEVWAxTfoRRV2cxRLfG9STC3YS8E7equBlwpDEQwJ2FWH8i99jNmJjANm1Q3SIN00pZ8ZALZi"
          token={makePayment}
          amount={getFinalPrice() * 100}
          name="Buy Products"
          shippingAddress
          billingAddress
        >
          <div className="row">
            <button className="btn btn-success mt-3 mb-3 col-10 offset-md-1 ">
              Buy
            </button>
          </div>
        </StripeCheckoutButton>
      ) : (
        <Link to="/signin">
          <button className="btn btn-warning">Go To Signin</button>
        </Link>
      )
    ) : (
      <h3 className="mt-3">Please add something to cart</h3>
    );
  };

  return (
    <div className="card-body">
      <h2 className="text-white mt-3 text-info  ">Pay with Stripe </h2>
      <span className="row ml-4 mt-3 text-warning">
        Use Card Number : 4242 4242 4242 4242
      </span>
      <span className="row ml-4 text-warning">Expiration Date : 12/21 </span>
      <span className="row ml-4 text-warning"> CVV : 123 </span>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
