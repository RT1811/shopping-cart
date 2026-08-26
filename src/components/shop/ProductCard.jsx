import { useState } from "react";
import { useOutletContext } from "react-router";
import styles from "./ProductCard.module.css"

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useOutletContext();

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

    const handleAddToCart = () => {
        addItem(product, quantity);
        setQuantity(1);
    };

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                className={styles.image}
                src={product.image}
                alt={product.title}
                />
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>{product.title}</h2>

                <p className={styles.price}>
                ${product.price.toFixed(2)}
                </p>

                <div className={styles.quantity}>
                <button onClick={handleDecrement}>−</button>

                <span>{quantity}</span>

                <button onClick={handleIncrement}>+</button>
                </div>

                <button
                className={styles.addButton}
                onClick={handleAddToCart}
                >
                Add to Cart
                </button>
            </div>
        </article>
    );
};

export default ProductCard;
