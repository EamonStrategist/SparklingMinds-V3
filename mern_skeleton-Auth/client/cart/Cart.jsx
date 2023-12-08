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
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(localStorageData).map(([key, value]) => {
            const isProduct = key.includes("Product");
            const itemName = key.replace("Product: ", "");
            const formattedValue = isProduct ? `$${value}` : value;

            return (
              <tr key={key} className="cart-item">
                <td>{itemName}</td>
                <td>{isProduct ? "1" : value}</td>
                <td>{isProduct ? value : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
