import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import ReorderIcon from "@mui/icons-material/Reorder";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import SearchBar from "./Searchbar";
import CartIcon from "./CartIcon";
import FlagSelect from "../../Home/Flag";
import ProfileModal from "./ProfileModel";

import MainLogo from "../../../Image/logo.png";
import "./Header.css";

const navLinks = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "Products",
    path: "/products",
  },
  {
    id: 3,
    label: "About",
    path: "/about_us",
  },
  {
    id: 4,
    label: "Contact",
    path: "/contact",
  },
];

function Header() {
  const history = useHistory();
  const { isAuthenticated, user } = useSelector((state) => state.userData);

  const [searchBarActive, setSearchBarActive] = useState(false);
  const [country, setCountry] = useState("pk");
  const [sideMenu, setSideMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSideBarMenu = () => {
    setSideMenu((prev) => !prev);
  };

  const closeSideMenu = () => {
    setSideMenu(false);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchBarActive(true);
    setSideMenu(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();

    const keyword = searchValue.trim();

    if (keyword) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }

    setSearchBarActive(false);
    setSideMenu(false);
  };

  const handleCrossButtonClick = () => {
    setSearchValue("");
    setSearchBarActive(false);
  };

  const searchBarProps = {
    searchBarActive,
    searchValue,
    handleCrossButtonClick,
    handleSearchButtonClick,
    handleSearchInputChange,
    handleSearchFormSubmit,
  };

  return (
    <header className="header">
      <div className="headerTop">
        <div className="header_container headerTopInner">
          <div className="headerTopLeft">
            <p>We Offer Free Shipping</p>
          </div>

          <div className="headerTopRight">
            <Link to="/contact" className="headerRetailer">
              <LocationOnIcon className="headerRetailerIcon" />
              <span>Find Location</span>
            </Link>

            <div className="headerFlag">
              <FlagSelect value={country} onChange={handleCountryChange} />
            </div>
          </div>
        </div>
      </div>

      <div className="headerBottom">
        <div
          className={
            searchBarActive
              ? "header_container headerBottomInner headerBottomSearchMode"
              : "header_container headerBottomInner"
          }
        >
          {!searchBarActive && (
            <div className="headerLeft">
              <Link
                to="/"
                className="headerLogoLink"
                aria-label="Go to Cricket Wear home page"
                onClick={closeSideMenu}
              >
                <img
                  src={MainLogo}
                  alt="Cricket Wear logo"
                  className="headerLogo"
                />
                <span className="headerLogoText">Cricket Wear</span>
              </Link>
            </div>
          )}

          {!searchBarActive && (
            <nav className="headerNav" aria-label="Main navigation">
              <ul>
                {navLinks.map(({ id, label, path }) => (
                  <li key={id}>
                    <Link to={path}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div
            className={
              searchBarActive
                ? "headerActions headerActionsSearchActive"
                : "headerActions"
            }
          >
            <div className="headerSearch">
              <SearchBar {...searchBarProps} />
            </div>

            {!searchBarActive && (
              <>
                <Link to="/cart" className="headerCartDesktop" aria-label="Cart">
                  <CartIcon />
                </Link>

                <div className="headerProfileDesktop">
                  {isAuthenticated ? (
                    <ProfileModal user={user} isAuthenticated={isAuthenticated} />
                  ) : (
                    <Link to="/login" className="headerLoginButton">
                      Login
                    </Link>
                  )}
                </div>

                <button
                  type="button"
                  className="headerMenuButton"
                  onClick={handleSideBarMenu}
                  aria-label={sideMenu ? "Close menu" : "Open menu"}
                  aria-expanded={sideMenu}
                >
                  {sideMenu ? <CloseIcon /> : <ReorderIcon />}
                </button>
              </>
            )}
          </div>
        </div>

        {sideMenu && !searchBarActive && (
          <div className="headerMobileMenu">
            <div className="headerMobileMenuInner">
              <Link to="/" onClick={closeSideMenu} className="headerMobileMenuLink">
                <HomeOutlinedIcon />
                <span>Home</span>
              </Link>

              <Link
                to="/products"
                onClick={closeSideMenu}
                className="headerMobileMenuLink"
              >
                <Inventory2OutlinedIcon />
                <span>Products</span>
              </Link>

              <Link to="/cart" onClick={closeSideMenu} className="headerMobileMenuLink">
                <ShoppingCartOutlinedIcon />
                <span>Cart</span>
              </Link>

              <Link
                to="/orders"
                onClick={closeSideMenu}
                className="headerMobileMenuLink"
              >
                <ReceiptLongOutlinedIcon />
                <span>My Orders</span>
              </Link>

              <Link
                to="/about_us"
                onClick={closeSideMenu}
                className="headerMobileMenuLink"
              >
                <InfoOutlinedIcon />
                <span>About</span>
              </Link>

              <Link
                to="/contact"
                onClick={closeSideMenu}
                className="headerMobileMenuLink"
              >
                <ContactSupportOutlinedIcon />
                <span>Contact</span>
              </Link>

              <Link
                to={isAuthenticated ? "/account" : "/signup"}
                onClick={closeSideMenu}
                className="headerMobileMenuLink headerMobileAuthLink"
              >
                <PersonOutlineIcon />
                <span>{isAuthenticated ? "My Account" : "Login"}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;