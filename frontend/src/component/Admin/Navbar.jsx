import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import MainLogo from "../../Image/logo.png";

const useStyles = makeStyles((theme) => ({
  navbar: {
    width: "100%",
    minHeight: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    zIndex: 999,
    background: "#ffffff",
    padding: "0.75rem 1rem",
    borderRadius: 18,
    border: "1px solid rgba(227, 6, 5, 0.12)",
    boxShadow: "0 12px 30px rgba(227, 6, 5, 0.07)",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      minHeight: 62,
      padding: "0.55rem 0.7rem",
      borderRadius: 14,
    },
  },
  menuIcon: {
    display: "none !important",
    color: "#121212 !important",
    [theme.breakpoints.down(999)]: {
      display: "inline-flex !important",
    },
    "&:hover": {
      color: "#e30605 !important",
      backgroundColor: "rgba(227, 6, 5, 0.08) !important",
    },
    "& svg": {
      fontSize: "2rem !important",
    },
  },
  dashboardHead: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
  },
  logoLink: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    minWidth: 0,
  },
  headerBottom__logo_main: {
    height: "54px",
    width: "auto",
    objectFit: "contain",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      height: "48px",
    },
  },
  contactButton: {
    minHeight: "42px !important",
    padding: "0 1.35rem !important",
    borderRadius: "999px !important",
    boxShadow: "none !important",
    cursor: "pointer",
    fontWeight: "900 !important",
    fontSize: "0.82rem !important",
    color: "#fff !important",
    letterSpacing: "0.7px !important",
    background: "#e30605 !important",
    border: "2px solid #e30605 !important",
    textTransform: "uppercase !important",
    transition: "all 0.25s ease !important",
    whiteSpace: "nowrap",
    "&:hover": {
      background: "#ffffff !important",
      color: "#e30605 !important",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "38px !important",
      padding: "0 0.9rem !important",
      fontSize: "0.76rem !important",
    },
    [theme.breakpoints.down(380)]: {
      display: "none !important",
    },
  },
}));

const Navbar = ({ toggleHandler }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <IconButton className={classes.menuIcon} onClick={toggleHandler} aria-label="Open admin menu">
        <MenuIcon />
      </IconButton>

      <div className={classes.dashboardHead}>
        <Link to="/admin/dashboard" className={classes.logoLink}>
          <img src={MainLogo} alt="Cricket Wear Admin" className={classes.headerBottom__logo_main} />
        </Link>
      </div>

      <Link to="/contact" style={{ textDecoration: "none" }}>
        <Button className={classes.contactButton}>Contact Us</Button>
      </Link>
    </nav>
  );
};

export default Navbar;
