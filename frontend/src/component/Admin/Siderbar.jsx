import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Avatar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  sidebar: {
    backgroundColor: "#ffffff",
    padding: "1.2rem 0.9rem",
    borderRadius: "18px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },
  avatar11: {
    width: "82px !important",
    height: "82px !important",
    border: "4px solid rgba(227, 6, 5, 0.35)",
    margin: "0 auto 0.85rem",
    backgroundColor: "#121212 !important",
  },
  name: {
    fontWeight: "900 !important",
    textAlign: "center",
    fontSize: "0.98rem !important",
    color: "#121212 !important",
    lineHeight: "1.35 !important",
    wordBreak: "break-word",
  },
  email: {
    color: "#666666 !important",
    margin: "0.35rem auto 1rem !important",
    textAlign: "center",
    fontSize: "0.78rem !important",
    fontWeight: "600 !important",
    lineHeight: "1.35 !important",
    wordBreak: "break-word",
  },
  divider: {
    height: "1px",
    width: "100%",
    backgroundColor: "rgba(227, 6, 5, 0.12)",
    margin: "1rem 0",
  },
  button: {
    width: "100% !important",
    minHeight: "44px !important",
    boxShadow: "none !important",
    backgroundColor: "#e30605 !important",
    color: "white !important",
    padding: "0 1rem !important",
    borderRadius: "999px !important",
    fontWeight: "900 !important",
    textTransform: "uppercase !important",
    fontSize: "0.8rem !important",
    border: "2px solid #e30605 !important",
    "&:hover": {
      backgroundColor: "#ffffff !important",
      color: "#e30605 !important",
    },
  },
  sideBarMenu: {
    listStyleType: "none",
    padding: 0,
    margin: "1rem 0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
  },
  sideBarMenuItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.8rem 0.85rem",
    borderRadius: "14px",
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(227, 6, 5, 0.035)",
    border: "1px solid rgba(227, 6, 5, 0.09)",
    transition: "background-color 0.25s ease, transform 0.25s ease, color 0.25s ease",
    "&:hover": {
      backgroundColor: "#e30605",
      transform: "translateX(3px)",
      "& svg": {
        color: "white",
      },
      "& span": {
        color: "white !important",
      },
    },
    "& svg": {
      color: "#e30605",
      fontSize: "23px !important",
      marginRight: "0.8rem",
      flexShrink: 0,
    },
    "& span": {
      color: "#121212",
      fontSize: "0.9rem",
      fontWeight: "900",
      textDecoration: "none",
      transition: "color 0.25s ease",
    },
  },
}));

function Sidebar() {
  const classes = useStyles();
  const { user, loading } = useSelector((state) => state.userData);
  const history = useHistory();

  const accountHandler = () => {
    history.push("/account");
  };

  const menuItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { to: "/", label: "Home", icon: <HomeIcon /> },
    { to: "/admin/products", label: "Products", icon: <PostAddIcon /> },
    { to: "/admin/new/product", label: "Add Product", icon: <AddIcon /> },
    { to: "/admin/orders", label: "Orders", icon: <ListAltIcon /> },
    { to: "/admin/reviews", label: "Reviews", icon: <RateReviewIcon /> },
    { to: "/contact", label: "Contact", icon: <ContactPageIcon /> },
  ];

  return (
    <>
      {!loading && (
        <div className={classes.sidebar}>
          <Avatar src={user && user.avatar && user.avatar.url} alt="User Avatar" className={classes.avatar11} />
          <Typography variant="subtitle1" className={classes.name}>
            {user && user.name}
          </Typography>
          <Typography variant="subtitle2" className={classes.email}>
            {user && user.email}
          </Typography>

          <div className={classes.divider} />

          <ul className={classes.sideBarMenu}>
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to} style={{ color: "inherit", textDecoration: "none" }}>
                <li className={classes.sideBarMenuItem}>
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              </Link>
            ))}
          </ul>

          <div className={classes.divider} />

          <Button className={classes.button} onClick={accountHandler} variant="contained">
            <ManageAccountsIcon fontSize="large" style={{ marginRight: "8px" }} />
            Account
          </Button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
