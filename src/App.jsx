import { Outlet } from "react-router";
import Navbar from "./components/nav/Navbar";
import { useState } from "react";

const App = () => {
  const [cart, setCart] = useState([]);

  const addItem = (product, quantity) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) => 
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { id: product.id, title: product.title, price: product.price, image: product.image, quantity, },];
    })
  }

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => 
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 
    0
  );

  return (
    <>
      <Navbar cartCount={cartCount}/>
      <Outlet context={{ cart, addItem, removeItem, updateQuantity }}/>
    </>
  );
};

export default App;