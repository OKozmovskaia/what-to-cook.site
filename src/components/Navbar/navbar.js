import React from "react";
import useStickyOnScroll from "../../hooks/useStickyOnScroll";
import styles from "./navbar.module.css";
import cn from "classnames";

export default function Navbar() {
  const { sticky, stickyRef } = useStickyOnScroll();

  return (
    <div
      className={cn(styles.container, { [styles.sticky]: sticky })}
      ref={stickyRef}
    >
      <p>Home</p>
      <p>My recipes</p>
      <p>My product</p>
    </div>
  );
}
