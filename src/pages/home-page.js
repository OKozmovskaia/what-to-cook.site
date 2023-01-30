import React from "react";
import Button from "../components/Button";
import Recipe from "../components/Recipe";
import Sidebar from "../components/Sidebar";

import styles from "./home-page.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar title="Filter" />
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.searchBarContainer}>
          <input type="text" placeholder="Type products or name of recipe" />
          <Button small>Search</Button>
        </div>
        <div className={styles.scrollContainer}>
          <Recipe />
          <Recipe />
          <Recipe />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
