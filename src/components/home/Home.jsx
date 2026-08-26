import { Link } from "react-router";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Simple shopping</p>

        <h1>
          Everyday essentials,
          <br />
          without the clutter.
        </h1>

        <p className={styles.description}>
          Browse our collection of clothing,
          accessories, and electronics.
        </p>

        <Link to="/shop" className={styles.shopButton}>
          Shop Now
        </Link>
      </section>
    </main>
  );
};

export default Home;