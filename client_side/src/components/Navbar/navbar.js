import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import useStickyOnScroll from "../../hooks/useStickyOnScroll";
import styles from "./navbar.module.css";
import cn from "classnames";
import Button from "../Button";
import { badgeProductsSelector } from "../../redux/selectors";

const Navbar = ({ badgeNum }) => {
  const [badge, setBadge] = useState(badgeNum);
  useEffect(() => {
    setBadge(badgeNum);
  }, [badgeNum]);

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
      <div className={styles.shopBag}>
        <Link to="/my_products">
          <Button iconStyle icon="shopBag" />
        </Link>
        <span className={styles.badge}>{badge}</span>
      </div>
    </div>
  );
};

export default connect(
  createStructuredSelector({
    badgeNum: badgeProductsSelector,
  })
)(Navbar);
