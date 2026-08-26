import { useState } from "react";
import { useOutletContext } from "react-router";

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
        <div>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <div>
                <button onClick={handleDecrement}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrement}>+</button>
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
