import React, { useEffect, useMemo, useState } from "react";
import "./ProcessOrder.css";

import { useSelector, useDispatch } from "react-redux";
import {
  updateOrder,
  clearErrors,
  getOrderDetails,
} from "../../actions/orderAction";

import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";

import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";

import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function ProcessOrder() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const orderId = params.id;

  const [status, setStatus] = useState("");
  const [toggle, setToggle] = useState(false);

  const { order = {}, error, loading } = useSelector(
    (state) => state.orderDetails
  );

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateOrder
  );

  const orderItems = useMemo(() => {
    return order.orderItems || [];
  }, [order.orderItems]);

  const orderStatus = order.orderStatus || "Processing";

  const paymentStatus =
    order.paymentInfo && order.paymentInfo.status === "succeeded"
      ? "PAID"
      : "NOT PAID";

  const isPaid = paymentStatus === "PAID";

  const shippingAddress = order.shippingInfo
    ? `${order.shippingInfo.address || ""}, ${order.shippingInfo.city || ""}, ${
        order.shippingInfo.state || ""
      }, ${order.shippingInfo.pinCode || ""}, ${
        order.shippingInfo.country || ""
      }`
    : "No shipping address available";

  const totalItems = orderItems.reduce((total, item) => {
    return total + Number(item.quantity || 0);
  }, 0);

  const nextStatusOptions = useMemo(() => {
    if (orderStatus === "Processing") {
      return ["Shipped"];
    }

    if (orderStatus === "Shipped") {
      return ["Delivered"];
    }

    return [];
  }, [orderStatus]);

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    if (!status) {
      alert.error("Please select order status");
      return;
    }

    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(orderId, myForm));
  };

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      setStatus("");

      if (orderId) {
        dispatch(getOrderDetails(orderId));
      }
    }
  }, [dispatch, alert, error, updateError, isUpdated, orderId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />

          <main className="processOrderPage">
            <aside
              className={
                toggle
                  ? "processOrderSidebar processOrderSidebarOpen"
                  : "processOrderSidebar"
              }
            >
              <Sidebar />
            </aside>

            <section className="processOrderMain">
              <div className="processOrderNavbar">
                <Navbar toggleHandler={toggleHandler} />
              </div>

              <section className="processOrderHero">
                <div className="processOrderHeroContent">
                  <p className="processOrderBadge">Cricket Wear Admin</p>

                  <h1>Process Order</h1>

                  <p>
                    Review customer order details, shipping address, payment
                    status, products, and update delivery progress.
                  </p>
                </div>

                <div className="processOrderHeroIcon">
                  <ReceiptLongOutlinedIcon />
                </div>
              </section>

              <section className="processOrderStats">
                <div className="processStatCard">
                  <div className="processStatIcon">
                    <ReceiptLongOutlinedIcon />
                  </div>

                  <div>
                    <span>Order ID</span>
                    <strong className="smallStatText">{orderId}</strong>
                  </div>
                </div>

                <div className="processStatCard">
                  <div className="processStatIcon">
                    <Inventory2OutlinedIcon />
                  </div>

                  <div>
                    <span>Total Items</span>
                    <strong>{totalItems}</strong>
                  </div>
                </div>

                <div className="processStatCard">
                  <div className="processStatIcon">
                    <PaidOutlinedIcon />
                  </div>

                  <div>
                    <span>Total Amount</span>
                    <strong>
                      Rs. {Number(order.totalPrice || 0).toLocaleString("en-PK")}
                    </strong>
                  </div>
                </div>

                <div
                  className={
                    orderStatus === "Delivered"
                      ? "processStatCard"
                      : "processStatCard dangerStat"
                  }
                >
                  <div className="processStatIcon">
                    <LocalShippingOutlinedIcon />
                  </div>

                  <div>
                    <span>Order Status</span>
                    <strong>{orderStatus}</strong>
                  </div>
                </div>
              </section>

              <section className="processOrderGrid">
                <div className="processOrderCard processOrderWideCard">
                  <div className="processCardHeader">
                    <div>
                      <h2>Ordered Items</h2>
                      <p>{orderItems.length} products in this order</p>
                    </div>

                    <ShoppingBagOutlinedIcon />
                  </div>

                  {orderItems.length > 0 ? (
                    <div className="processItemsList">
                      {orderItems.map((item, index) => {
                        const productId = item.productId || item.product;
                        const itemTotal =
                          Number(item.price || 0) * Number(item.quantity || 0);

                        return (
                          <Link
                            key={index}
                            to={`/product/${productId}`}
                            className="processItemCard"
                          >
                            <img
                              src={
                                item.image ||
                                item.productImage ||
                                "/seed-images/default-product.png"
                              }
                              alt={item.name || "Order item"}
                            />

                            <div className="processItemInfo">
                              <h3>{item.name || "Product Item"}</h3>

                              <p>
                                Qty: <strong>{item.quantity || 0}</strong>
                              </p>

                              <p>
                                Price:{" "}
                                <strong>
                                  Rs.{" "}
                                  {Number(item.price || 0).toLocaleString(
                                    "en-PK"
                                  )}
                                </strong>
                              </p>
                            </div>

                            <div className="processItemTotal">
                              Rs. {itemTotal.toLocaleString("en-PK")}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="processEmptyBox">
                      <ShoppingBagOutlinedIcon />
                      <h3>No Items Found</h3>
                      <p>This order does not contain product items.</p>
                    </div>
                  )}
                </div>

                <div className="processOrderCard">
                  <div className="processCardHeader">
                    <div>
                      <h2>Delivery Address</h2>
                      <p>Customer shipping details</p>
                    </div>

                    <HomeOutlinedIcon />
                  </div>

                  <div className="processInfoList">
                    <div className="processInfoRow">
                      <PersonOutlineOutlinedIcon />

                      <div>
                        <span>Name</span>
                        <strong>{order.user && order.user.name}</strong>
                      </div>
                    </div>

                    <div className="processInfoRow">
                      <EmailOutlinedIcon />

                      <div>
                        <span>Email</span>
                        <strong>{order.user && order.user.email}</strong>
                      </div>
                    </div>

                    <div className="processInfoRow">
                      <PhoneOutlinedIcon />

                      <div>
                        <span>Phone</span>
                        <strong>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </strong>
                      </div>
                    </div>

                    <div className="processInfoRow">
                      <HomeOutlinedIcon />

                      <div>
                        <span>Address</span>
                        <strong>{shippingAddress}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="processOrderCard">
                  <div className="processCardHeader">
                    <div>
                      <h2>Order Summary</h2>
                      <p>Payment and delivery status</p>
                    </div>

                    <CheckCircleOutlineIcon />
                  </div>

                  <div className="processSummaryList">
                    <div className="processSummaryRow">
                      <span>Total Price</span>

                      <strong>
                        Rs.{" "}
                        {Number(order.totalPrice || 0).toLocaleString("en-PK")}
                      </strong>
                    </div>

                    <div className="processSummaryRow">
                      <span>Order Status</span>

                      <strong
                        className={
                          orderStatus === "Delivered"
                            ? "processGreenText"
                            : "processRedText"
                        }
                      >
                        {orderStatus}
                      </strong>
                    </div>

                    <div className="processSummaryRow">
                      <span>Payment Status</span>

                      <strong
                        className={isPaid ? "processGreenText" : "processRedText"}
                      >
                        {paymentStatus}
                      </strong>
                    </div>

                    <div className="processSummaryRow">
                      <span>Order Items</span>
                      <strong>{totalItems}</strong>
                    </div>
                  </div>
                </div>

                {orderStatus !== "Delivered" && (
                  <div className="processOrderCard processUpdateCard">
                    <div className="processCardHeader">
                      <div>
                        <h2>Update Order</h2>
                        <p>Move this order to the next delivery stage.</p>
                      </div>

                      <AccountTreeIcon />
                    </div>

                    <form
                      className="processOrderForm"
                      onSubmit={updateOrderSubmitHandler}
                    >
                      <div className="processSelectWrap">
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Choose Status</option>

                          {nextStatusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <AccountTreeIcon />
                      </div>

                      <button
                        type="submit"
                        className="processOrderButton"
                        disabled={loading || status === ""}
                      >
                        Process Order
                      </button>
                    </form>
                  </div>
                )}
              </section>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default ProcessOrder;