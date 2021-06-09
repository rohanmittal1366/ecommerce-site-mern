import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authenticated } from "../auth/helper";

import { cartEmpty, loadCart } from "./helper/CartHelper";
import { getMeToken, processPayment } from "./helper/PaymentBHelper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = authenticated() && authenticated().user._id;
  const token = authenticated() && authenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      // console.log("INFO ", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showBrainTreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button onClick={onPurchase} className="btn  btn-block btn-success">
              Buy
            </button>
          </div>
        ) : (
          <h3>Please Login or add something to cart</h3>
        )}
      </div>
    );
  };

  // 378282246310005

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({
      loading: true,
    });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, success: response.success, loading: false });
            alert("PAYMENT DONE SUCCESSFULLY");
          })
          .catch((err) => {
            setInfo({ ...info, loading: false, success: false, error: err });
            alert("PAYMENT FAILED");
          });
      })
      .catch();
  };

  const getAmount = () => {
    let amount = 0;
    products &&
      products.map((p) => {
        amount = amount + p.price;
      });

    return amount;
  };

  return (
    <div>
      <h3>Test Bt</h3>
      {showBrainTreeDropIn()}
    </div>
  );
};

export default PaymentB;
