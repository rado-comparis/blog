import styles from "../styles/Container.module.css";

export default function Container({ children }) {
    return <main className={styles.container}>{children}</main>
  }