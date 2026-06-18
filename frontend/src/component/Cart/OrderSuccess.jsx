import React from "react";
import { makeStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  orderSuccess: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "8rem 1rem 4rem",
    background: "linear-gradient(180deg, #ffffff 0%, #fff7f7 55%, #ffffff 100%)",
    boxSizing: "border-box",
  },
  successCard: {
    width: "min(560px, 100%)",
    padding: "2rem",
    borderRadius: 24,
    background: "#ffffff",
    border: "1px solid rgba(227, 6, 5, 0.14)",
    boxShadow: "0 16px 38px rgba(227, 6, 5, 0.1)",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "1.25rem",
      borderRadius: 18,
    },
  },
  successIcon: {
    fontSize: "5.5rem !important",
    color: "#0a8f28",
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "4rem !important",
    },
  },
  successText: {
    marginBottom: "1rem !important",
    fontWeight: "900 !important",
    fontSize: "clamp(1.45rem, 5vw, 2.2rem) !important",
    color: "#121212 !important",
    lineHeight: "1.3 !important",
  },
  successSubText: {
    color: "#555555 !important",
    fontWeight: "500 !important",
    lineHeight: "1.6 !important",
    marginBottom: "1.4rem !important",
  },
  link: {
    textDecoration: "none",
    width: "100%",
    display: "block",
  },
  viewOrdersButton: {
    width: "100% !important",
    minHeight: "48px !important",
    backgroundColor: "#e30605 !important",
    color: "#ffffff !important",
    borderRadius: "999px !important",
    textTransform: "uppercase !important",
    letterSpacing: "0.7px !important",
    fontWeight: "900 !important",
    boxShadow: "0 10px 24px rgba(227, 6, 5, 0.22) !important",
    border: "2px solid #e30605 !important",
    transition: "all 0.25s ease !important",
    "&:hover": {
      backgroundColor: "#ffffff !important",
      color: "#e30605 !important",
    },
  },
}));

function OrderSuccess() {
  const classes = useStyles();

  return (
    <div className={classes.orderSuccess}>
      <section className={classes.successCard}>
        <CheckCircleIcon className={classes.successIcon} />

        <Typography variant="h4" className={classes.successText}>
          Congratulations!
          <br />
          Your Order has been Placed Successfully
        </Typography>

        <Typography className={classes.successSubText}>
          Thank you for shopping with Cricket Wear. You can track your order from your orders page.
        </Typography>

        <Link to="/orders" className={classes.link}>
          <Button variant="contained" className={classes.viewOrdersButton}>
            View Orders
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default OrderSuccess;
