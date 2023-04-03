import React, { useState } from "react";
import { connect } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../redux/actions/user_products";

import Button from "../Button";
import styles from "./productItem.module.css";

const ProductItem = ({ product, id, update, remove }) => {
  const { title, quantity, checked, groupTitle } = product;
  const [state, setState] = useState({
    title,
    quantity,
    checked,
    groupTitle,
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleChecked = () => {
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
    update({ product: { ...state, _id: id } });
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
        <span className={styles.editContainer}>
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
          <Button icon="save" iconStyle onClick={handleSave} />
        </span>
      ) : (
        <span className={styles.editContainer}>
          <div className={styles.productTitle}>{state.title}</div>{" "}
          <div className={styles.productQuantity}>{state.quantity}</div>
          <Button icon="pen" iconStyle onClick={handleEdit} />
        </span>
      )}

      <Button iconStyle icon="bin" onClick={() => remove(id)} />
    </li>
  );
};

export default connect(null, (dispatch) => ({
  update: (data) => dispatch(updateProduct(data)),
  remove: (id) => dispatch(deleteProduct(id)),
}))(ProductItem);
