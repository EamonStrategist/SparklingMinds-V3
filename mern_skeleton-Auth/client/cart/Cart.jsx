import React, { useState, useEffect } from "react";
import "./Cart.css";
const Cart = () => {
  //const [keys, setKeys] = onState(Object.keys(localStorage));

  //var myObject = JSON.parse(JSON.stringify(localStorage));

  //return <div>{JSON.stringify(localStorage)}</div>;

  const [localStorageData, setLocalStorageData] = useState({});
 

  useEffect(() => {
    // Fetch and parse local storage data when the component mounts
    const data = JSON.parse(JSON.stringify(localStorage));
    setLocalStorageData(data);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {Object.entries(localStorageData).map(([key, value]) => (
          <div key={key} className="cart-item">
            <span className="item-key">{key}:</span>
            <span className="item-value">{value}</span>
     
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
