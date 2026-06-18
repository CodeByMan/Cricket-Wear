import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useHistory } from "react-router-dom";
import CricketBallLoader from "../layouts/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstanat";
import MetaData from "../layouts/MataData/MataData";
import "./AccountForms.css";

function UpdatePassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, isUpdated, error } = useSelector(
    (state) => state.profileData
  );

  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidPassword = newPassword.length >= 8;
  const isValidConfirmPassword = confirmPassword.length >= 8;
  const isPasswordMatch = newPassword === confirmPassword;

  const handleShowPasswordClick = () => {
    setShowPassword((prev) => !prev);
  };

  function updatePasswordSubmitHandler(e) {
    e.preventDefault();

    if (!isValidPassword) {
      alert.error("New password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert.error("Password and Confirm Password do not match");
      return;
    }

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      dispatch({ type: UPDATE_PASSWORD_RESET });
      history.push("/account");
    }
  }, [dispatch, error, alert, isUpdated, history]);

  const isSubmitDisabled = !(
    oldPassword &&
    newPassword &&
    confirmPassword &&
    isValidPassword &&
    isValidConfirmPassword &&
    isPasswordMatch
  );

  return (
    <>
      <MetaData title="Update Password" />

      {loading ? (
        <CricketBallLoader />
      ) : (
        <main className="accountFormPage">
          <section className="accountFormCard">
            <div className="accountFormTop">
              <Avatar className="accountFormAvatar">
                <SecurityUpdateGoodIcon />
              </Avatar>

              <Typography component="p" className="accountFormBadge">
                Account Security
              </Typography>

              <Typography component="h1" className="accountFormHeading">
                Update Password
              </Typography>

              <Typography component="p" className="accountFormSubText">
                Choose a strong password to keep your Cricket Wear account safe.
              </Typography>
            </div>

            <form className="accountForm" onSubmit={updatePasswordSubmitHandler}>
              <TextField
                label="Old Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="accountTextField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon className="accountInputIcon" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className="accountPasswordIconBtn"
                        onClick={handleShowPasswordClick}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="New Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={!isValidPassword && newPassword !== ""}
                helperText={
                  !isValidPassword && newPassword !== ""
                    ? "Password must be at least 8 characters."
                    : ""
                }
                className="accountTextField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon className="accountInputIcon" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className="accountPasswordIconBtn"
                        onClick={handleShowPasswordClick}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={
                  confirmPassword !== "" &&
                  (!isValidConfirmPassword || !isPasswordMatch)
                }
                helperText={
                  confirmPassword !== "" && !isValidConfirmPassword
                    ? "Password must be at least 8 characters."
                    : confirmPassword !== "" && !isPasswordMatch
                    ? "Passwords do not match."
                    : ""
                }
                className="accountTextField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon className="accountInputIcon" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className="accountPasswordIconBtn"
                        onClick={handleShowPasswordClick}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                className="accountPrimaryButton"
                fullWidth
                disabled={isSubmitDisabled}
              >
                Update New Password
              </Button>

              <Typography component="p" className="accountBottomText">
                <Link to="/account" className="accountCancelLink">
                  Cancel
                </Link>
              </Typography>
            </form>
          </section>
        </main>
      )}
    </>
  );
}

export default UpdatePassword;