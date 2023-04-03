import React from "react";
import { Link } from "react-router-dom";
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
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/my_recipes">
        <p>My recipes</p>
      </Link>
      <Link to="/my_products">
        <p>My product</p>
      </Link>
    </div>
  );
}
