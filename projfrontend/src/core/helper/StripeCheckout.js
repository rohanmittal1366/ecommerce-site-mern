import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authenticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "./CartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../../backend";
const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const token = authenticated() && authenticated().token;
  const userId = authenticated() && authenticated().user._id;

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
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((err) => console.log(err));
  };

  // conditional rendering of payment button
  const showStripeButton = () => {
    return authenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51J04JASFQXAPTcwoeybyST6gSIEVWAxTfoRRV2cxRLfG9STC3YS8E7equBlwpDEQwJ2FWH8i99jNmJjANm1Q3SIN00pZ8ZALZi"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Products"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success mt-3 mb-3">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Go To Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
