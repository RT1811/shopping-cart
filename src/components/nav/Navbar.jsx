import { Link } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = ({ cartCount }) => {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>
                Store
            </Link>

            <ul className={styles.links}>
                <li>
                <Link to="/">Home</Link>
                </li>

                <li>
                <Link to="/shop">Shop</Link>
                </li>

                <li>
                <Link to="/cart" className={styles.cartLink}>
                    Cart
                    <span className={styles.cartCount}>{cartCount}</span>
                </Link>
                </li>
            </ul>
        </nav>
  );
};

export default Navbar;