import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "../src/components/shop/ProductCard.jsx";
import { renderWithOutletContext } from "../src/test-utils/renderWithOutletContext.jsx";

const mockProduct = { id: 1, title: "Fake Product", price: 9.99, image: "fake.jpg" };

describe("ProductCard", () => {
  it("renders product details", () => {
    renderWithOutletContext(<ProductCard product={mockProduct} />, { addItem: vi.fn() });

    expect(screen.getByText("Fake Product")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  it("increments and decrements quantity", () => {
  renderWithOutletContext(
    <ProductCard product={mockProduct} />,
    { addItem: vi.fn() }
  );

  const incrementButton = screen.getByRole("button", {
    name: /increase quantity/i,
  });

  const decrementButton = screen.getByRole("button", {
    name: /decrease quantity/i,
  });

  fireEvent.click(incrementButton);
  expect(screen.getByText("2")).toBeInTheDocument();

  fireEvent.click(decrementButton);
  expect(screen.getByText("1")).toBeInTheDocument();
});

 it("does not decrement below 1", () => {
  renderWithOutletContext(
    <ProductCard product={mockProduct} />,
    { addItem: vi.fn() }
  );

  fireEvent.click(
    screen.getByRole("button", {
      name: /decrease quantity/i,
    })
  );

  expect(screen.getByText("1")).toBeInTheDocument();
});

  it("calls addItem with product and current quantity, then resets quantity", () => {
    const addItem = vi.fn();
    renderWithOutletContext(<ProductCard product={mockProduct} />, { addItem });

    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("Add to Cart"));

    expect(addItem).toHaveBeenCalledWith(mockProduct, 2);
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});