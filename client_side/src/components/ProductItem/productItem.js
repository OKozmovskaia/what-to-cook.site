import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../redux/actions/user_products";

import Button from "../Button";
import styles from "./productItem.module.css";
import cn from "classnames";

const ProductItem = ({ product, id, updateProduct, deleteProduct }) => {
  const [state, setState] = useState({
    ...product,
  });
  useEffect(() => {
    setState(product);
  }, [product]);

  const [isEdit, setIsEdit] = useState(false);
  const handleChecked = () => {
    updateProduct({ product: { ...state, checked: !state.checked, _id: id } });
    setState({
      ...state,
      checked: !state.checked,
    });
  };

  const handleTitle = (e) => {
    setState({
      ...state,
      title: e.target.value,
    });
  };

  const handleQuantity = (e) => {
    setState({
      ...state,
      quantity: +e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    updateProduct({ product: { ...state, _id: id } });
    setIsEdit(false);
  };

  return (
    <li className={styles.container}>
      <input
        type="checkBox"
        checked={state.checked}
        name="checked"
        value={state.checked}
        onChange={handleChecked}
      />
      {isEdit ? (
        <form onSubmit={handleSave} className={styles.editContainer}>
          <input
            type="text"
            placeholder={state.title}
            name="title"
            value={state.title}
            onChange={handleTitle}
          />

          <input
            type="number"
            placeholder={state.quantity}
            name="quantity"
            min="1"
            value={state.quantity}
            onChange={handleQuantity}
          />
          <Button icon="save" iconStyle submit />
        </form>
      ) : (
        <span className={styles.editContainer}>
          <div
            className={cn(styles.productTitle, {
              [styles.productTitleChecked]: state.checked,
            })}
          >
            {state.title}
          </div>{" "}
          <div className={styles.productQuantity}>{state.quantity}</div>
          <Button icon="pen" iconStyle onClick={handleEdit} />
        </span>
      )}

      <Button iconStyle icon="bin" onClick={() => deleteProduct(id)} />
    </li>
  );
};

export default connect(null, { updateProduct, deleteProduct })(ProductItem);
