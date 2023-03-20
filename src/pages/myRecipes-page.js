import React from "react";

import styles from "./page.module.css";

function MyRecipesPage() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3>Side Bar</h3>
      </aside>

      <main className={styles.mainContent}>
        <h3>Recipes</h3>
      </main>
    </div>
  );
}

export default MyRecipesPage;
