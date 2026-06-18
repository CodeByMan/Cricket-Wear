import React from "react";
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./CartIcon.css";

const CartIcon = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const cartItemCount = cartItems
    ? cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0)
    : 0;

  return (
    <div className="cartIconWrapper">
      <ShoppingCartOutlinedIcon className="cartMainIcon" />

      {cartItemCount > 0 && (
        <span className="cartItemCount">{cartItemCount}</span>
      )}
    </div>
  );
};

export default CartIcon;