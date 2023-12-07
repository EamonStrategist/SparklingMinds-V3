import React, { useEffect, useState } from "react";
import Card from "./Card";
import ProductContainer from "./ProductContainer";
import Title from "./Title";
//import { list } from './api-products.js';
import Dropdown from "./Dropdown"; // Import the Dropdown component
import "./ProductsPage.css";

const ProductsPage = () => {
  /* constructor(){
        super();
        const [values, setValues] = useState([]);
    }*/

  /*
     name: '',
        description: '',
        price: '',
        category: '',
        coll: '',
        quantity: '',
        imageURL: ''
    */

  /*onComponentMount(){
                fetch('http://localhost:3000/api/products/')
                .then(response => response.json())
                .then(data => setValues(data)) 
             };
        

        const getProduct = () =>{
            fetch('http://localhost:3000/api/products/')
            .then(response => response.json())
            .then(data => setValues(data))
        };
*/



  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  var cartList = [];


  
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/products/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  };
  const addToCart = (product) => {

    
    
    
    if(localStorage.getItem("Product: " + product.name) == null){
    localStorage.setItem("Product: " + product.name, product.price);
    localStorage.setItem("Quantity: " + product.name, 1);
    }else{
      let quantityLocal = parseInt(localStorage.getItem("Quantity: " + product.name));
      localStorage.setItem("Quantity: " + product.name, ++quantityLocal);
    }
    // https://stackoverflow.com/questions/55328748/how-to-store-and-retrieve-shopping-cart-items-in-localstorage

    setCart((currentCart) => {
      const cartItem = currentCart.find((item) => item.id === product.id);
      if (cartItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-page">
      <div className="navbar">
        <Title text="Products Page" />
        <Dropdown
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />
        <div className="cart-summary"><a href= "./cart">
          Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </a>
        </div>
      </div>
      <ProductContainer>
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-wrapper">
            <Card productInfo={product} />
            <div className="product-actions">
              <button
                className="add-to-cart"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </ProductContainer>
    </div>
  );
};

export default ProductsPage;