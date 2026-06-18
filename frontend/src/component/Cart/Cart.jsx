import React, { useState } from "react";
import "./Cart.css";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import CartPaymentImage from "../../Image/cart/cart_img.png";
import { useHistory } from "react-router-dom";
import CartItem from "./CartItem";
import {
  dispalyMoney,
  generateDiscountedPrice,
} from "../DisplayMoney/DisplayMoney";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      return;
    }

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;

    if (quantity <= 1) {
      return;
    }

    dispatch(addItemToCart(id, newQty));
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setIsValid(false);
      return;
    }

    setIsValid(false);
  };

  const handleFocus = (event) => {
    setIsFocused(event.target.value !== "");
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=/shipping");
  };

  let totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let discountedPrice = generateDiscountedPrice(totalPrice);
  let totalDiscount = totalPrice - discountedPrice;
  let finalAmount = totalPrice - totalDiscount;

  const formattedFinalAmount = dispalyMoney(finalAmount);
  const formattedTotalDiscount = dispalyMoney(totalDiscount);
  const formattedTotalPrice = dispalyMoney(totalPrice);

  return (
    <>
      <MetaData title="Your Cart" />

      <main className="cartPage">
        <section className="cart_HeaderTop">
          <div className="headerLeft">
            <Typography component="p" className="cartBadge">
              Cricket Wear Cart
            </Typography>

            <Typography variant="h5" component="h1" className="cartHeading">
              Shopping Cart
            </Typography>

            <Typography variant="body2" className="cartText3">
              Total ({cartItems.length} {cartItems.length > 1 ? "items" : "item"}){" "}
              <b>{formattedFinalAmount}</b>
            </Typography>
          </div>

          <Typography
            variant="body2"
            className="cartText2"
            onClick={() => history.push("/products")}
          >
            Continue Shopping
          </Typography>
        </section>

        <div className="separator_cart2"></div>

        {cartItems.length === 0 ? (
          <section className="emptyCartContainer">
            <RemoveShoppingCartIcon className="cartIcon" />

            <Typography variant="h5" component="h1" className="cartHeading">
              Your Shopping Cart is Empty
            </Typography>

            <Typography variant="body1" className="cartText">
              Nothing to see here.
            </Typography>

            <Typography variant="body1" className="cartText">
              Let&apos;s get shopping!
            </Typography>

            <Link to="/products" className="shopNowLink">
              <Button className="shopNowButton">Shop Now</Button>
            </Link>
          </section>
        ) : (
          <section className="cart_content_wrapper">
            <div className="cart_left_container">
              {cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  deleteCartItems={deleteCartItems}
                  decreaseQuantity={decreaseQuantity}
                  increaseQuantity={increaseQuantity}
                  length={cartItems.length}
                  id={item.productId}
                />
              ))}
            </div>

            <aside className="cart_right_container">
              <div className="order_summary">
                <div className="summaryHeader">
                  <div>
                    <h4>Order Summary</h4>
                    <p>
                      {cartItems.length} {cartItems.length > 1 ? "items" : "item"} in cart
                    </p>
                  </div>

                  <ShoppingCartCheckoutIcon className="summaryIcon" />
                </div>

                <div className="order_summary_details">
                  <div className="order_Summary_Item">
                    <span>Original Price</span>
                    <p>{formattedTotalPrice}</p>
                  </div>

                  <div className="order_Summary_Item discount">
                    <span>Discount</span>
                    <p>
                      <del>{formattedTotalDiscount}</del>
                    </p>
                  </div>

                  <div className="order_Summary_Item delivery">
                    <span>
                      <LocalShippingOutlinedIcon />
                      Delivery
                    </span>
                    <p>
                      <b>Free</b>
                    </p>
                  </div>

                  <div className="separator_cart"></div>

                  <div className="order_Summary_Item total_price">
                    <div>
                      <h4>Total Price</h4>
                      <p className="taxText">(Inclusive of all taxes)</p>
                    </div>

                    <p>
                      <b>{formattedFinalAmount}</b>
                    </p>
                  </div>
                </div>
              </div>

              <div className="coupon-box-wrapper">
                <div
                  className={`coupon-box-content ${isFocused ? "focused" : ""}`}
                >
                  <div className="couponTitle">
                    <DiscountOutlinedIcon />
                    <span>Have a coupon?</span>
                  </div>

                  <div className="couponInputRow">
                    <TextField
                      label="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setIsValid(true);
                      }}
                      onFocus={handleFocus}
                      onBlur={() => setIsFocused(false)}
                      error={!isValid}
                      helperText={!isValid && "Invalid coupon code"}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />

                    <Button
                      variant="contained"
                      className="coupon-box-apply-btn"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                variant="contained"
                className="btn-custom"
                onClick={checkoutHandler}
              >
                Checkout
              </Button>

              <div className="paymentLogoImg">
                <img
                  src={CartPaymentImage}
                  alt="payment-icons"
                  className="paymentImg"
                />
              </div>
            </aside>
          </section>
        )}
      </main>
    </>
  );
};

export default Cart;