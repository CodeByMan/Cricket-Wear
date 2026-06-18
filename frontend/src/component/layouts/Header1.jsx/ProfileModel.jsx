import React, { useState } from "react";
import { Modal, Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { logout } from "../../../actions/userAction";

import "./ProfileModel.css";

const ProfileModal = ({ user, isAuthenticated }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user && user.role === "admin";

  const formatJoinedDate = (currentUser) => {
    if (!currentUser || !currentUser.createdAt) return "N/A";

    const createdAt = new Date(currentUser.createdAt);

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-PK", options).format(createdAt);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const goToPage = (path) => {
    closeMenu();
    history.push(path);
  };

  const logoutUserHandler = () => {
    closeMenu();
    dispatch(logout());
    alert.success("Logout Successfully");
    history.push("/");
  };

  return (
    <>
      <button
        type="button"
        className={`profile-icon ${isOpen ? "profileIconActive" : ""}`}
        onClick={handleOpen}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        <PersonIcon className="profileMainIcon" />

        {isOpen ? (
          <ArrowDropUpIcon className="arrow-icon" />
        ) : (
          <ArrowDropDownIcon className="arrow-icon" />
        )}
      </button>

      {isOpen && (
        <Modal
          open={isOpen}
          onClose={closeMenu}
          className="modal-container"
          disableScrollLock
        >
          <div className="modal-content">
            {!isAuthenticated ? (
              <div className="welcome-message">
                <strong>Welcome!</strong>
                <p>Login to manage your account, orders, cart, and profile.</p>
              </div>
            ) : (
              <div className="profile-info">
                <Avatar
                  src={user && user.avatar && user.avatar.url}
                  alt="User Avatar"
                  className="profileAvatar"
                />

                {isAdmin && (
                  <div className="adminBadge">
                    <AdminPanelSettingsIcon />
                    <span>Admin</span>
                  </div>
                )}

                <p className="user-id">
                  <strong>ID:</strong>{" "}
                  {user && user._id ? user._id.substring(0, 8) : "N/A"}
                </p>

                <p className="user-name">
                  <strong>Name:</strong> {user && user.name}
                </p>

                <p className="user-email">
                  <strong>Email:</strong> {user && user.email}
                </p>

                <p className="created-at">
                  <strong>Joined:</strong> {formatJoinedDate(user)}
                </p>
              </div>
            )}

            <div className="profileDivider" />

            <div className="profile-menu">
              {isAuthenticated && isAdmin && (
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => goToPage("/admin/dashboard")}
                >
                  <DashboardIcon className="menu-icon" />
                  <span>Dashboard</span>
                </button>
              )}

              {isAuthenticated && (
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => goToPage("/account")}
                >
                  <AccountCircleIcon className="menu-icon" />
                  <span>Profile</span>
                </button>
              )}

              {isAuthenticated && (
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => goToPage("/orders")}
                >
                  <AssignmentIcon className="menu-icon" />
                  <span>Orders</span>
                </button>
              )}

              <button
                type="button"
                className="menu-item"
                onClick={() => goToPage("/cart")}
              >
                <ShoppingCartIcon className="menu-icon" />
                <span>Cart</span>
              </button>

              {!isAuthenticated ? (
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => goToPage("/login")}
                >
                  <LockOpenIcon className="menu-icon" />
                  <span>Login</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="menu-item logoutMenuItem"
                  onClick={logoutUserHandler}
                >
                  <ExitToAppIcon className="menu-icon" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProfileModal;