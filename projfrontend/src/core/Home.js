import React, { useEffect, useState } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState("");
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts()
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setError(data.error);
        } else setProducts(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to Online shopping site">
      <div className="row text-center">
        <h1 className="text-white">All of tshirts</h1>
        <div className="row">
          {products &&
            products.map((product, index) => {
              return (
                <div key={index} className="col-4 mb-3">
                  <Card product={product} />
                </div>
              );
            })}
        </div>
      </div>
    </Base>
  );
}

export default Home;
