import { useOutletContext } from "react-router";
import styles from "./Cart.module.css";

const Cart = () => {
    const {cart,removeItem,updateQuantity,} = useOutletContext();

    if (cart.length === 0) {
        return (
            <main className={styles.empty}>
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>
            </main>
        )
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  return (
    <main className={styles.cart}>
        <h1>Your Cart</h1>

        <div className={styles.items}>
            {cart.map((item) => (
            <article className={styles.item} key={item.id}>
                <div className={styles.imageContainer}>
                    <img src={item.image} alt={item.title} />
                </div>

                <div className={styles.info}>
                    <h2>{item.title}</h2>
                    <p>${item.price.toFixed(2)}</p>

                    <div className={styles.quantity}>
                        <button onClick={() => updateQuantity( item.id, Math.max(1, item.quantity - 1))}>
                        −
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => updateQuantity( item.id, item.quantity + 1 )}>
                        +
                        </button>
                    </div>

                    <button  className={styles.remove} onClick={() => removeItem(item.id)}>
                        Remove
                    </button>
                </div>

                <p className={styles.subtotal}> ${(item.price * item.quantity).toFixed(2)} </p>
            </article>
            ))}
        </div>

        <div className={styles.total}>
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
        </div>
    </main>
  );
};

export default Cart;