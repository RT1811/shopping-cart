import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard";
import styles from "./Shop.module.css";

const Shop = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p className={styles.status}>Loading products...</p>;
  if (error)  return <p className={styles.status}>Error: {error}</p>;

  return (
    <main className={styles.shop}>
        <div className={styles.heading}>
          <h1>Shop</h1>
          <p>Browse our collection</p>
        </div>

        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
    </main>
  );
};

export default Shop;