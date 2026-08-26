import { useOutletContext } from "react-router";

const Cart = () => {
    const {
    cart,
    removeItem,
    updateQuantity,
  } = useOutletContext();

  return (
    <main>
      <h1>Cart</h1>

      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </main>
  );
};

export default Cart;