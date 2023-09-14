import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';


const ProductPage = () => {
  const [data, setData] = useState([]);
  
  const [cartItems, setCartItems] = useState([]);

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/products");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData.products);
        setIsLoading(false);
        // console.log('product=',jsonData.products);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

    const handleLoginClick = () => {
      history.push('/login'); 
      // console.log('Login button clicked');
    };

    const handleRegistrationClick = () => {
      history.push('/register'); 
    };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Product</h1>
      <div className="d-flex justify-content-end mb-5">
      <button className="btn btn-primary me-3" onClick={handleLoginClick}>Login</button>
      <button className="btn btn-primary" onClick={handleRegistrationClick}>Registration</button>
      </div>
      <div className="row">
    <div className="col-md-4 mb-5">
      {/* Cart Section */}
      <h2>Shopping Cart</h2>
      <ul className="list-group">
        {cartItems.map((cartItem, index) => (
          <li className="list-group-item" key={index}>
            {cartItem.name} - BDT{cartItem.price}
          </li>
        ))}
      </ul>
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
    </div>
  </div>
      <div className="row">
        {data.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card">
              <img
                src={product.image_url}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">BDT{product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
