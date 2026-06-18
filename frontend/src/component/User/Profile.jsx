import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import LogoutIcon from "@mui/icons-material/ExitToApp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import "./Profile.css";
import { logout } from "../../actions/userAction";

const ProfilePage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, isAuthenticated } = useSelector((state) => state.userData);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
    history.push("/login");
  };

  const formatCreatedAt = (currentUser) => {
    if (!currentUser || !currentUser.createdAt) return "Not available";

    const createdAt = new Date(currentUser.createdAt);

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Karachi",
    };

    return new Intl.DateTimeFormat("en-PK", options).format(createdAt);
  };

  const userName = user?.name || "User";
  const userEmail = user?.email || "Not available";
  const avatarUrl = user?.avatar?.url || "";

  return (
    <main className="rootProfile">
      <section className="profileHero">
        <div className="profileHeroInner">
          <p className="profileBadge">Cricket Wear Account</p>

          <Typography component="h1" className="headingProfile">
            Hi, {userName}!
          </Typography>

          <Typography component="p" className="greeting">
            Welcome back. Manage your profile, orders, and account security.
          </Typography>
        </div>
      </section>

      <section className="profileContainer">
        <aside className="leftContainer">
          <div className="profileOverviewCard">
            <Typography component="h2" className="profileHeadingLeft">
              Profile Overview
            </Typography>

            <div className="profileAvatarWrap">
              <Avatar alt={userName} src={avatarUrl} className="profileAvatar">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </div>

            <div className="leftDetails">
              <div className="profileInfoRow">
                <span className="profileInfoIcon">
                  <PersonOutlineIcon />
                </span>

                <div>
                  <p className="profileSubHeading">Name</p>
                  <p className="profileText">{userName}</p>
                </div>
              </div>

              <div className="profileInfoRow">
                <span className="profileInfoIcon">
                  <EmailOutlinedIcon />
                </span>

                <div>
                  <p className="profileSubHeading">Email</p>
                  <p className="profileText">{userEmail}</p>
                </div>
              </div>

              <div className="profileInfoRow">
                <span className="profileInfoIcon">
                  <CalendarMonthOutlinedIcon />
                </span>

                <div>
                  <p className="profileSubHeading">Member Since</p>
                  <p className="profileText">{formatCreatedAt(user)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="myOrder">
            <div className="smallCardIcon">
              <ReceiptLongOutlinedIcon />
            </div>

            <Typography component="h2" className="profileHeading">
              Orders
            </Typography>

            <Typography component="p" className="profileSmallText">
              View your Cricket Wear purchases and order history.
            </Typography>

            <Link to="/orders" className="profileLinkButton">
              <Button variant="contained" className="ordersButton">
                View Orders
              </Button>
            </Link>
          </div>
        </aside>

        <section className="rightContainer">
          <div className="rightHeadings">
            <div>
              <Typography component="h2" className="profileHeading">
                Personal Information
              </Typography>

              <Typography component="p" className="profileText2">
                Keep your account details updated for a smoother shopping
                experience.
              </Typography>
            </div>

            <ManageAccountsOutlinedIcon className="rightHeadingIcon" />
          </div>

          <div className="profileDetails">
            <div className="detailsCard">
              <div className="detailsHeader">
                <PersonOutlineIcon />
                <Typography component="h3" className="profileHeading">
                  My Details
                </Typography>
              </div>

              <div className="detailsGrid">
                <div className="detailItem">
                  <p className="profileSubHeading">Full Name</p>
                  <p className="profileText">{userName}</p>
                </div>

                <div className="detailItem">
                  <p className="profileSubHeading">Email Address</p>
                  <p className="profileText">{userEmail}</p>
                </div>

                <div className="detailItem">
                  <p className="profileSubHeading">Phone Number</p>
                  <p className="profileText mutedText">Not added</p>
                </div>

                <div className="detailItem">
                  <p className="profileSubHeading">Gender</p>
                  <p className="profileText mutedText">Not added</p>
                </div>
              </div>

              <Link to="/profile/update" className="profileActionLink">
                <Button variant="contained" className="profileButton">
                  Edit Details
                </Button>
              </Link>
            </div>

            <div className="detailsCard">
              <div className="detailsHeader">
                <LockOutlinedIcon />
                <Typography component="h3" className="profileHeading">
                  Login Details
                </Typography>
              </div>

              <div className="detailsGrid loginDetailsGrid">
                <div className="detailItem">
                  <p className="profileSubHeading">Email</p>
                  <p className="profileText">{userEmail}</p>
                </div>

                <div className="detailItem">
                  <p className="profileSubHeading">Password</p>
                  <p className="profileText">*************</p>
                </div>
              </div>

              <Link to="/password/update" className="profileActionLink">
                <Button variant="contained" className="profileButton">
                  Update Password
                </Button>
              </Link>
            </div>

            <div className="detailsCard dangerCard">
              <div className="detailsHeader">
                <LogoutIcon />
                <Typography component="h3" className="profileHeading">
                  Logout Account
                </Typography>
              </div>

              <p className="profileText3">
                To access the Cricket Wear Store again, you will need to log in
                with your credentials.
              </p>

              <Button
                variant="contained"
                className="logoutButton"
                startIcon={<LogoutIcon />}
                onClick={logoutHandler}
              >
                Logout Account
              </Button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ProfilePage;