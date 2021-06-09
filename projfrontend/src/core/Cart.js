import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./helper/StripeCheckout";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className="row mt-4">
        {products &&
          products.map((product, index) => (
            <div className="col-4 mb-3">
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addToCart={false}
                setReload={setReload}
                reload={reload}
              />
            </div>
          ))}
      </div>
    );
  };
  // flat and flat mates

  const loadCheckout = () => {
    return (
      <div className="">
        <h2>This section is for checkout</h2>
      </div>
    );
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
    <Base title="Cart Page" description="check your products">
      <div className="row text-center">
        <div className="col-8">
          <div className=" text-center">
            <h2>This section is to load products</h2>
            {products.length > 0 ? (
              loadAllProducts(products)
            ) : (
              <h3> No products in cart</h3>
            )}
          </div>
        </div>
        <div className="col-4 ">
          <h2>Your Bill is $ {getAmount()}</h2>
          <div className="card text-white bg-dark border border-info mb-4 mt-4">
            <StripeCheckout products={products} setReload={setReload} />
          </div>
          <div className="card text-white bg-dark border border-info mt-4 ">
            <PaymentB products={products} setReload={setReload} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
