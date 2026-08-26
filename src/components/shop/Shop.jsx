import { useOutletContext } from "react-router";
import useProducts from "../../hooks/useProducts";

const Shop = () => {
  const { addItem } = useOutletContext();
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error:{error}</p>

  return (
    <div>
        {products.map((product) => (
            <div key={product.id}>{product.title}</div>
        ))}
    </div>
  );
};

export default Shop;