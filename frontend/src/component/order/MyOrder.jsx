import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderAction";
import MetaData from "../layouts/MataData/MataData";
import CricketBallLoader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import OrderCard from "./OrderCard";

const useStyles = makeStyles((theme) => ({
  page: {
    width: "100%",
    minHeight: "100vh",
    padding: "8rem 1rem 4rem",
    background: "linear-gradient(180deg, #ffffff 0%, #fff7f7 55%, #ffffff 100%)",
    boxSizing: "border-box",
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      padding: "6.8rem 0.55rem 3rem",
    },
  },
  orderPageContainer: {
    width: "min(980px, 100%)",
    margin: "0 auto 1rem",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(227, 6, 5, 0.14)",
    borderRadius: 22,
    boxShadow: "0 14px 34px rgba(227, 6, 5, 0.08)",
    padding: "1.35rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      borderRadius: 18,
      padding: "1rem",
    },
  },
  orderPageTitle: {
    fontSize: "clamp(1.35rem, 4vw, 2rem) !important",
    fontWeight: "900 !important",
    color: "#121212 !important",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  orderPageText: {
    color: "#555555 !important",
    marginTop: "0.55rem !important",
    fontWeight: "600 !important",
  },
  ordersList: {
    width: "min(980px, 100%)",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  orderCard: {
    width: "100%",
  },
}));

const MyOrder = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { orders = [], loading, error } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.userData);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <CricketBallLoader />
      ) : (
        <main className={classes.page}>
          <MetaData title="My Orders" />

          <section className={classes.orderPageContainer}>
            <Typography variant="h6" className={classes.orderPageTitle}>
              Your Orders
            </Typography>
            <Typography variant="body1" className={classes.orderPageText}>
              {orders.length} order{orders.length === 1 ? "" : "s"} placed in {currentYear}
            </Typography>
          </section>

          <section className={classes.ordersList}>
            {orders.map((item) => (
              <div className={classes.orderCard} key={item._id}>
                <OrderCard item={item} user={user} />
              </div>
            ))}
          </section>
        </main>
      )}
    </>
  );
};

export default MyOrder;
