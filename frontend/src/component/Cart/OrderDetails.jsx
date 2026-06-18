import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { normalizeImageUrl } from "../../utils/imageUrl";

const useStyles = makeStyles((theme) => ({
  rootPayment: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "135px minmax(0, 1fr)",
    gap: "1rem",
    padding: "1rem 0",
    borderBottom: "1px solid rgba(227, 6, 5, 0.1)",
    boxSizing: "border-box",
    [theme.breakpoints.down(560)]: {
      gridTemplateColumns: "95px minmax(0, 1fr)",
      gap: "0.75rem",
    },
    [theme.breakpoints.down(420)]: {
      gridTemplateColumns: "1fr",
      justifyItems: "center",
      textAlign: "center",
    },
  },
  image: {
    width: "135px",
    height: "120px",
    objectFit: "contain",
    borderRadius: 14,
    background: "#fafafa",
    border: "1px solid rgba(227, 6, 5, 0.1)",
    [theme.breakpoints.down(560)]: {
      width: "95px",
      height: "95px",
    },
    [theme.breakpoints.down(420)]: {
      width: "160px",
      height: "130px",
    },
  },
  details: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  productName: {
    fontWeight: "900 !important",
    fontSize: "1rem !important",
    color: "#121212 !important",
    marginBottom: "0.45rem !important",
    lineHeight: "1.4 !important",
    wordBreak: "break-word",
  },
  quantity: {
    fontSize: "0.9rem !important",
    marginBottom: "0.45rem !important",
    color: "#555555 !important",
    fontWeight: "600 !important",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
    [theme.breakpoints.down(420)]: {
      justifyContent: "center",
    },
  },
  finalPrice: {
    fontWeight: "900 !important",
    fontSize: "0.95rem !important",
    color: "#e30605 !important",
  },
  discountPrice: {
    textDecoration: "line-through",
    color: "#777777 !important",
    fontSize: "0.85rem !important",
    fontWeight: "700 !important",
  },
  paymentStatus: {
    color: "#0a8f28 !important",
    fontSize: "0.9rem !important",
    marginTop: "0.45rem !important",
    fontWeight: "800 !important",
  },
  paymentValue: {
    fontWeight: 900,
    marginRight: "6px",
    color: "#555555",
  },
}));

const OrderDetailsSection = ({ item, totalDiscount, totalPrice }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootPayment}>
      <img src={normalizeImageUrl(item.image)} alt={item.name} className={classes.image} />
      <div className={classes.details}>
        <Typography variant="subtitle1" className={classes.productName}>
          {item.name}
        </Typography>
        <Typography variant="body2" className={classes.quantity}>
          <span className={classes.paymentValue}>Quantity:</span> {item.quantity}
        </Typography>
        <div className={classes.priceContainer}>
          <Typography variant="body2" className={classes.finalPrice}>
            {totalPrice}
          </Typography>
          <Typography variant="body2" className={classes.discountPrice}>
            {totalDiscount}
          </Typography>
        </div>
        <Typography variant="body2" className={classes.paymentStatus}>
          <span className={classes.paymentValue}>Payment:</span> Paid
        </Typography>
      </div>
    </div>
  );
};

export default OrderDetailsSection;
