import React from 'react';
import styles from './main.module.css';

const MainLayout: React.FunctionComponent = ({ children }) => (
  <>
    <header>

    </header>
    {children}
    <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; Kacper Małachowski (Kacper9)
        </a>
        <a href="https://buycoffee.to/malachowskicode" target="_blank"><img src="https://buycoffee.to/btn/buycoffeeto-btn-primary.svg" style={{ width: "150px"}} alt="Postaw mi kawę na buycoffee.to" /></a>
    </footer>
  </>
);

export default MainLayout;