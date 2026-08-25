import App from "./App";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import Cart from "./components/cart/Cart";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "cart", element: <Cart /> },
        ],
    },
];

export default routes;