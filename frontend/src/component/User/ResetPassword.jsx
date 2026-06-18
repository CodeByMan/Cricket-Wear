import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import CricketBallLoader from "../layouts/loader/Loader";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./AccountForms.css";

function ResetPassword() {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgetPassword
  );

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidPassword = password.length >= 8;
  const isPasswordMatch = password === confirmPassword;

  const handleShowPasswordClick = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      history.push("/login");
    }
  }, [dispatch, error, alert, success, history]);

  function resetPasswordSubmitHandler(e) {
    e.preventDefault();

    if (!isValidPassword) {
      alert.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert.error("Password and Confirm Password do not match");
      return;
    }

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  }

  const isSubmitDisabled = !(
    password &&
    confirmPassword &&
    isValidPassword &&
    isPasswordMatch
  );

  return (
    <>
      <MetaData title="Reset Password" />

      {loading ? (
        <CricketBallLoader />
      ) : (
        <main className="accountFormPage">
          <section className="accountFormCard">
            <div className="accountFormTop">
              <Avatar className="accountFormAvatar">
                <LockResetIcon />
              </Avatar>

              <Typography component="p" className="accountFormBadge">
                Password Recovery
              </Typography>

              <Typography component="h1" className="accountFormHeading">
                Reset Password
              </Typography>

              <Typography component="p" className="accountFormSubText">
                Enter and confirm your new Cricket Wear account password.
              </Typography>
            </div>

            <form className="accountForm" onSubmit={resetPasswordSubmitHandler}>
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!isValidPassword && password !== ""}
                helperText={
                  !isValidPassword && password !== ""
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
                error={confirmPassword !== "" && !isPasswordMatch}
                helperText={
                  confirmPassword !== "" && !isPasswordMatch
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
                Confirm New Password
              </Button>

              <Typography component="p" className="accountBottomText">
                <Link to="/login" className="accountCancelLink">
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

export default ResetPassword;