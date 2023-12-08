import React from "react";
import "./ProductContainer.css";

const ProductContainer = (props) => {
  return <div className="item-container">{props.children};</div>;
};

export default ProductContainer;
