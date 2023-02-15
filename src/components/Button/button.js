import React from "react";
import styles from "./button.module.css";
import cn from "classnames";

import { ReactComponent as arrowBackIcon } from "../../icons/arrow-back.svg";
import { ReactComponent as arrowUpIcon } from "../../icons/arrow-up.svg";
import { ReactComponent as arrowForwardIcon } from "../../icons/arrow-forward.svg";
import { ReactComponent as arrowDownIcon } from "../../icons/arrow-down.svg";
import { ReactComponent as binIcon } from "../../icons/bin.svg";
import { ReactComponent as penIcon } from "../../icons/edit.svg";
import { ReactComponent as heartIcon } from "../../icons/heart.svg";
import { ReactComponent as shoppingBagIcon } from "../../icons/shopping-bag.svg";
import { ReactComponent as cancelIcon } from "../../icons/cancel.svg";
import { ReactComponent as githubIcon } from "../../icons/github.svg";
import { ReactComponent as linkedinIcon } from "../../icons/linkedin.svg";
import { ReactComponent as emailIcon } from "../../icons/email.svg";
import { ReactComponent as cvIcon } from "../../icons/CV.svg";

const icons = {
  arrowBack: arrowBackIcon,
  arrowUp: arrowUpIcon,
  arrowForward: arrowForwardIcon,
  arrowDown: arrowDownIcon,
  bin: binIcon,
  pen: penIcon,
  heart: heartIcon,
  shopBag: shoppingBagIcon,
  cancel: cancelIcon,
  github: githubIcon,
  linkedin: linkedinIcon,
  email: emailIcon,
  cv: cvIcon,
};

const Button = ({
  icon,
  iconStyle = false,
  large = false,
  small = false,
  dropDown = false,
  block = false,
  noStyle = false,
  children,
  ...props
}) => {
  const Icon = icons[icon];

  return (
    <button
      className={cn(styles.button, {
        [styles.icon]: iconStyle,
        [styles.large]: large,
        [styles.small]: small,
        [styles.dropDown]: dropDown,
        [styles.block]: block,
        [styles.nostyle]: noStyle,
      })}
      {...props}
    >
      {children}
      {Icon && <Icon />}
    </button>
  );
};

export default Button;
