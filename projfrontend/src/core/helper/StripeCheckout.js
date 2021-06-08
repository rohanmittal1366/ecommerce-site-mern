import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authenticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "./CartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
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
    //
  };

  // conditional rendering of payment button
  const showStripeButton = () => {
    return authenticated() ? (
      <StripeCheckoutButton
        stripeKey=""
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Products"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
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
