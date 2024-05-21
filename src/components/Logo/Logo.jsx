import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src="/logo.png"
          alt="Tripadvisor Aggregator"
        />
        <img
          className={`${styles.logo} ${styles.logoHover}`}
          src="/logo_green.png"
          alt="Tripadvisor Aggregator"
        />
      </div>
    </Link>
  );
}

export default Logo;
