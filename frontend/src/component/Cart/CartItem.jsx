import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { dispalyMoney, generateDiscountedPrice } from "../DisplayMoney/DisplayMoney";

const useStyles = makeStyles((theme) => ({
  root11: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "150px minmax(0, 1fr)",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    margin: "0 0 1rem",
    borderRadius: "20px !important",
    border: "1px solid rgba(227, 6, 5, 0.12)",
    boxShadow: "0 12px 28px rgba(227, 6, 5, 0.07) !important",
    boxSizing: "border-box",
    overflow: "hidden",
    [theme.breakpoints.down(650)]: {
      gridTemplateColumns: "110px minmax(0, 1fr)",
      gap: "0.75rem",
      padding: "0.8rem",
      borderRadius: "16px !important",
    },
    [theme.breakpoints.down(460)]: {
      gridTemplateColumns: "1fr",
      justifyItems: "center",
      textAlign: "center",
    },
  },
  roots11: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "150px minmax(0, 1fr)",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    margin: "0 0 1rem",
    borderRadius: "20px !important",
    border: "1px solid rgba(227, 6, 5, 0.12)",
    boxShadow: "0 12px 28px rgba(227, 6, 5, 0.07) !important",
    boxSizing: "border-box",
    overflow: "hidden",
    [theme.breakpoints.down(650)]: {
      gridTemplateColumns: "110px minmax(0, 1fr)",
      gap: "0.75rem",
      padding: "0.8rem",
      borderRadius: "16px !important",
    },
    [theme.breakpoints.down(460)]: {
      gridTemplateColumns: "1fr",
      justifyItems: "center",
      textAlign: "center",
    },
  },
  media: {
    width: "150px",
    height: "160px",
    borderRadius: "16px",
    backgroundSize: "contain !important",
    backgroundColor: "#fafafa",
    [theme.breakpoints.down(650)]: {
      width: "110px",
      height: "120px",
    },
    [theme.breakpoints.down(460)]: {
      width: "100%",
      maxWidth: "190px",
      height: "160px",
    },
  },
  content: {
    width: "100%",
    minWidth: 0,
    padding: "0 !important",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "0.75rem",
    [theme.breakpoints.down(460)]: {
      justifyContent: "center",
    },
  },
  title: {
    width: "100%",
    fontSize: "1rem !important",
    fontWeight: "900 !important",
    color: "#121212 !important",
    lineHeight: "1.45 !important",
    wordBreak: "break-word",
    [theme.breakpoints.down(599)]: {
      fontSize: "0.92rem !important",
    },
  },
  cartDeleteIcon: {
    color: "#121212 !important",
    width: "38px !important",
    height: "38px !important",
    flexShrink: 0,
    transition: "color 0.2s ease, background-color 0.2s ease !important",
    "&:hover": {
      color: "#e30605 !important",
      backgroundColor: "rgba(227, 6, 5, 0.08) !important",
    },
  },
  priceItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    flexWrap: "wrap",
    [theme.breakpoints.down(460)]: {
      justifyContent: "center",
    },
  },
  cartSubHeadings: {
    fontSize: "0.82rem !important",
    fontWeight: "900 !important",
    textTransform: "uppercase",
    color: "#555555 !important",
    letterSpacing: "0.4px",
  },
  itemPrice: {
    fontSize: "1rem !important",
    fontWeight: "900 !important",
    color: "#e30605 !important",
  },
  itemOldPrice: {
    fontSize: "0.82rem !important",
    fontWeight: "700 !important",
    color: "#777777 !important",
  },
  price: {
    fontSize: "1rem !important",
    fontWeight: "900 !important",
    color: "#121212 !important",
  },
  contentBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.9rem",
    flexWrap: "wrap",
    [theme.breakpoints.down(460)]: {
      flexDirection: "column",
      justifyContent: "center",
    },
    "& .prod_details_additem": {
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      flexWrap: "wrap",
      margin: 0,
      [theme.breakpoints.down(460)]: {
        justifyContent: "center",
      },
    },
    "& .prod_details_additem h5": {
      margin: 0,
      color: "#555555",
      fontSize: "0.82rem",
      fontWeight: 900,
      letterSpacing: "0.4px",
    },
    "& .additem": {
      display: "inline-flex",
      alignItems: "center",
      border: "1px solid rgba(227, 6, 5, 0.16)",
      borderRadius: "999px",
      overflow: "hidden",
      background: "#ffffff",
    },
    "& .additem button": {
      width: "34px",
      height: "34px",
      color: "#121212",
    },
    "& .additem button:hover": {
      color: "#e30605",
      backgroundColor: "rgba(227, 6, 5, 0.08)",
    },
    "& .input": {
      width: "42px",
      textAlign: "center",
    },
    "& .input input": {
      textAlign: "center",
      fontWeight: 900,
      padding: 0,
    },
  },
}));

function CartItem({ deleteCartItems, item, decreaseQuantity, increaseQuantity, length }) {
  const classes = useStyles();

  let finalPrice = generateDiscountedPrice(item.price);
  let discountedPrice = item.price - finalPrice;
  discountedPrice = dispalyMoney(discountedPrice);
  let total = finalPrice * item.quantity;
  total = dispalyMoney(total);
  finalPrice = dispalyMoney(finalPrice);

  return (
    <Card className={length < 2 ? classes.root11 : classes.roots11}>
      <CardMedia className={classes.media} image={item.image} title={item.name} />

      <CardContent className={classes.content}>
        <div>
          <div className={classes.cartHeader}>
            <Typography variant="subtitle1" className={classes.title}>
              {item.name}
            </Typography>

            <IconButton
              aria-label="delete"
              className={classes.cartDeleteIcon}
              onClick={() => deleteCartItems(item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <div className={classes.priceItem}>
            <Typography className={classes.cartSubHeadings} variant="body2">
              Price:
            </Typography>
            <Typography variant="subtitle1" className={classes.itemPrice}>
              {finalPrice}
            </Typography>
            <Typography variant="caption" component="span" className={classes.itemOldPrice}>
              <del>{discountedPrice}</del>
            </Typography>
          </div>
        </div>

        <div className={classes.contentBottom}>
          <div className="prod_details_additem">
            <h5>QTY:</h5>
            <div className="additem">
              <IconButton onClick={() => decreaseQuantity(item.productId, item.quantity)} className="additem_decrease">
                <RemoveIcon />
              </IconButton>
              <Input readOnly type="number" value={item.quantity} className="input" />
              <IconButton
                onClick={() => increaseQuantity(item.productId, item.quantity, item.stock || item.Stock)}
                className="additem_increase"
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <div className={classes.priceItem}>
            <Typography variant="body2" className={classes.cartSubHeadings}>
              Total:
            </Typography>
            <Typography variant="subtitle1" className={classes.price}>
              {total}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;
