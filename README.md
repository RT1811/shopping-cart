# Shopping Cart

A responsive shopping cart application built with React as part of The Odin Project curriculum.

The application fetches products from the Fake Store API and allows users to browse products, select quantities, add products to a cart, update quantities, remove items, and view calculated subtotals and totals.

## Live Demo

https://shopping-cart-eight-ivory-34.vercel.app/

## Features

- Browse products fetched from the Fake Store API
- Loading and error states for API requests
- Select product quantities before adding to the cart
- Add products to the cart
- Adding an existing product increases its quantity
- Increase and decrease quantities from the cart
- Prevent quantities from dropping below one
- Remove products from the cart
- Dynamic cart quantity in the navigation bar
- Per-item subtotal calculations
- Dynamic cart total calculation
- Empty cart state
- Client-side routing between Home, Shop, and Cart pages
- Responsive layout

## Built With

- React
- JavaScript
- React Router
- Vite
- CSS Modules
- Fake Store API
- Vitest
- React Testing Library
- Vercel

## Project Structure

```text
src/
├── components/
│   ├── cart/
│   ├── home/
│   ├── navbar/
│   └── shop/
├── hooks/
│   └── useProducts.js
├── test-utils/
├── App.jsx
├── index.css
├── main.jsx
└── routes.jsx
```

## Key Concepts

### Shared Cart State

The cart state is stored in the application layout so multiple parts of the application can respond to cart changes.

```jsx
const [cart, setCart] = useState([]);
```

Cart items use the following structure:

```js
{
  id,
  title,
  price,
  image,
  quantity
}
```

### React Router Outlet Context

Cart state and cart-related functions are passed to routed child components using React Router's outlet context.

```jsx
<Outlet
  context={{
    cart,
    addItem,
    removeItem,
    updateQuantity,
  }}
/>
```

Child routes can access these values using:

```jsx
const {
  cart,
  removeItem,
  updateQuantity,
} = useOutletContext();
```

### Custom Hook

Product fetching is separated into a custom `useProducts` hook.

The hook manages:

- Product data
- Loading state
- Error state
- API requests

```js
const {
  products,
  loading,
  error,
} = useProducts();
```

### API Fetching

Products are fetched asynchronously from the Fake Store API.

```js
const response = await fetch(
  "https://fakestoreapi.com/products"
);

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}

const data = await response.json();
```

### Immutable State Updates

Cart state is updated without mutating the previous state.

```js
setCart((prevCart) =>
  prevCart.map((item) =>
    item.id === id
      ? { ...item, quantity }
      : item
  )
);
```

Items are removed using `filter`:

```js
setCart((prevCart) =>
  prevCart.filter((item) => item.id !== id)
);
```

### Derived State

Values such as the cart count and total price are calculated from the existing cart rather than stored as separate state.

```js
const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);
```

```js
const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
```

## Routing

The application uses React Router for client-side routing.

```text
/       Home
/shop   Product catalogue
/cart   Shopping cart
```

The shared application layout contains the Navbar and an Outlet for routed pages.

```text
App
├── Navbar
└── Outlet
    ├── Home
    ├── Shop
    └── Cart
```

## Testing

The application includes behavior-focused tests using Vitest and React Testing Library.

Tests cover:

- Rendering product information
- Incrementing and decrementing product quantities
- Preventing quantities below one
- Adding products to the cart
- Resetting product quantity after adding
- Rendering cart items
- Updating cart quantities
- Removing cart items
- Calculating subtotals
- Calculating the cart total
- Empty cart behavior

## Styling

The application uses CSS Modules for component-specific styles.

Global styles are kept in `index.css`, while individual components maintain their own scoped styles.

The interface is responsive across desktop and mobile layouts.

## Accessibility

The finished application was checked using:

- Keyboard navigation
- Lighthouse
- axe DevTools
- WAVE

Semantic HTML and accessible interactive controls are used throughout the application.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/RT1811/shopping-cart.git
```

Enter the project directory:

```bash
cd shopping-cart
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Running Tests

```bash
npm test
```

## Build

Create a production build with:

```bash
npm run build
```

## Deployment

The application is deployed using Vercel.

The application is configured so React Router routes such as `/shop` and `/cart` continue to work when loaded or refreshed directly.

## API

Product data is provided by the Fake Store API:

https://fakestoreapi.com/

## What I Learned

This project gave me practical experience with:

- React component architecture
- Shared state management
- React Router
- Outlet context
- Custom hooks
- Asynchronous API requests
- Loading and error states
- Immutable state updates
- Derived state
- Responsive CSS
- CSS Modules
- React Testing Library
- Vitest
- Accessibility testing
- Deploying a React single-page application

## Acknowledgements

This project was completed as part of [The Odin Project](https://www.theodinproject.com/) Full Stack JavaScript curriculum.

Product data is provided by the [Fake Store API](https://fakestoreapi.com/).