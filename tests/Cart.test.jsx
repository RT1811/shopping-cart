import { screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Cart from "../src/components/cart/Cart.jsx";
import { renderWithOutletContext } from "../src/test-utils/renderWithOutletContext";

const mockCart = [
  {
    id: 1,
    title: "Fake Product",
    price: 10,
    image: "fake.jpg",
    quantity: 2,
  },
];

describe("Cart", () => {
  it("shows a message when the cart is empty", () => {
    renderWithOutletContext(<Cart />, {
      cart: [],
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
    });

    expect(
      screen.getByText(/your cart is empty/i)
    ).toBeInTheDocument();
  });

  it("renders cart items and their subtotal", () => {
    renderWithOutletContext(<Cart />, {
        cart: mockCart,
        removeItem: vi.fn(),
        updateQuantity: vi.fn(),
    });

    expect(screen.getByText("Fake Product")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    const cartItem = screen
        .getByRole("heading", { name: "Fake Product" })
        .closest("article");

    expect(
        within(cartItem).getByText("$20.00")
    ).toBeInTheDocument();
    });

  it("increments item quantity", () => {
    const updateQuantity = vi.fn();

    renderWithOutletContext(<Cart />, {
      cart: mockCart,
      removeItem: vi.fn(),
      updateQuantity,
    });

    fireEvent.click(screen.getByText("+"));

    expect(updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("decrements item quantity", () => {
    const updateQuantity = vi.fn();

    renderWithOutletContext(<Cart />, {
      cart: mockCart,
      removeItem: vi.fn(),
      updateQuantity,
    });

    fireEvent.click(screen.getByText("−"));

    expect(updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("removes an item from the cart", () => {
    const removeItem = vi.fn();

    renderWithOutletContext(<Cart />, {
      cart: mockCart,
      removeItem,
      updateQuantity: vi.fn(),
    });

    fireEvent.click(
      screen.getByRole("button", { name: /remove/i })
    );

    expect(removeItem).toHaveBeenCalledWith(1);
  });

  it("calculates the total price of all cart items", () => {
    const cart = [
      {
        id: 1,
        title: "Product One",
        price: 10,
        image: "one.jpg",
        quantity: 2,
      },
      {
        id: 2,
        title: "Product Two",
        price: 5.5,
        image: "two.jpg",
        quantity: 3,
      },
    ];

    renderWithOutletContext(<Cart />, {
      cart,
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
    });

    // (10 * 2) + (5.50 * 3) = 36.50
    expect(screen.getByText("$36.50")).toBeInTheDocument();
  });
});