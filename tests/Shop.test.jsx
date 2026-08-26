import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Shop from "../src/components/shop/Shop.jsx";
import useProducts from "../src/hooks/useProducts.js";
import ProductCard from "../src/components/shop/ProductCard.jsx";

vi.mock("../src/hooks/useProducts.js");
vi.mock("../src/components/shop/ProductCard.jsx")

describe("Shop", () => {
  beforeEach(() => {
    ProductCard.mockImplementation(({ product }) => <div>{product.title}</div>);
  });

  it("shows a loading message while loading", () => {
    useProducts.mockReturnValue({ products: [], loading: true, error: null });

    render(<Shop />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows an error message on error", () => {
    useProducts.mockReturnValue({ products: [], loading: false, error: "Network failure" });

    render(<Shop />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("renders a product card for each product", () => {
    const mockProducts = [
      { id: 1, title: "Product One", price: 9.99, image: "one.jpg" },
      { id: 2, title: "Product Two", price: 19.99, image: "two.jpg" },
    ];
    useProducts.mockReturnValue({ products: mockProducts, loading: false, error: null });

    render(<Shop />);

    expect(screen.getByText("Product One")).toBeInTheDocument();
    expect(screen.getByText("Product Two")).toBeInTheDocument();
  });
});