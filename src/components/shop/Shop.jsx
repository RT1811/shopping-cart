import { useOutletContext } from "react-router";

const Shop = () => {
  const { addItem } = useOutletContext();

  const testProduct = {
    id: 1,
    title: "Test Product",
    price: 10,
    image: "",
    quantity: 3,
  };

  return (
    <main>
      <h1>Shop</h1>

      <button onClick={() => addItem(testProduct, 3)}>
        Add Test Product
      </button>
    </main>
  );
};

export default Shop;