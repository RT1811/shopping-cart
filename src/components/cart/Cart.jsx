import { useOutletContext } from "react-router";

const Cart = () => {
    const {cart,removeItem,updateQuantity,} = useOutletContext();

    if (cart.length === 0) {
        return <p> Your Cart is Empty.</p>;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  return (
    <main>
        <h1>Cart</h1>
        
        {cart.map((item) => (
            <div key={item.id}>
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.price}</p>
                <div>
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                    -
                    </button>
                
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                    </button>
                </div>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
        ))}
        <h2>Total: ${total.toFixed(2)}</h2>
    </main>
  );
};

export default Cart;