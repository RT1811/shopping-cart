import { useOutletContext } from "react-router";
import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard";

const Shop = () => {
  const { addItem } = useOutletContext();
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>

  return (
    <main>
    <h1>Shop</h1>

    {products.map((product) => (
      <ProductCard product={product} key={product.id} />
    ))}
  </main>
  );
};

export default Shop;