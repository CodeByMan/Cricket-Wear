import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import useStyles from "./LoginFromStyle";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { login, clearErrors } from "../../actions/userAction";
import CricketBallLoader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";

export default function Login() {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.userData
  );

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, isAuthenticated, loading, error, alert, history, redirect]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword((prev) => !prev);
  };

  const isSignInDisabled = !(email && password && isValidEmail);

  function handleLoginSubmit(e) {
    e.preventDefault();

    if (isSignInDisabled || loading) {
      return;
    }

    dispatch(login(email, password));
  }

  return (
    <>
      <MetaData title="Login" />

      {loading ? (
        <CricketBallLoader />
      ) : (
        <main className={classes.signupPage}>
          <section className={classes.formCard}>
            <form className={classes.form} onSubmit={handleLoginSubmit} noValidate>
              <div className={classes.formHeader}>
                <Avatar className={classes.avatar}>
                  <LockOpenIcon />
                </Avatar>

                <Typography component="h1" className={classes.heading}>
                  Welcome Back
                </Typography>

                <Typography component="p" className={classes.subHeading}>
                  Sign in to your Cricket Wear account and continue shopping.
                </Typography>
              </div>

              <div className={classes.loginInputStack}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  className={`${classes.emailInput} ${classes.textField}`}
                  value={email}
                  onChange={handleEmailChange}
                  error={!isValidEmail && email !== ""}
                  helperText={
                    !isValidEmail && email !== ""
                      ? "Please enter a valid email address."
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon className={classes.inputIcon} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  className={`${classes.passwordInput} ${classes.textField}`}
                  value={password}
                  onChange={handlePasswordChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon className={classes.inputIcon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          className={classes.showPasswordButton}
                          onClick={handleShowPasswordClick}
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className={classes.loginOptionsBox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className={classes.rememberCheckbox}
                    />
                  }
                  label="Remember me"
                  className={classes.rememberLabel}
                />

                <Link to="/password/forgot" className={classes.forgotPasswordLink}>
                  Forgot password?
                </Link>
              </div>

              <Typography variant="body2" className={classes.termsAndConditionsText}>
                I accept the Cricket Wear Terms of Use and acknowledge Cricket
                Wear will use my information in accordance with its{" "}
                <Link to="/policy/privacy" className={classes.privacyText}>
                  Privacy Policy.
                </Link>
              </Typography>

              <Button
                variant="contained"
                className={classes.loginButton}
                fullWidth
                type="submit"
                disabled={isSignInDisabled || loading}
              >
                Sign In
              </Button>

              <Typography variant="body1" className={classes.switchAccountText}>
                Don&apos;t have an account?
                <Link to="/signup" className={classes.createAccount}>
                  Create Account
                </Link>
              </Typography>
            </form>
          </section>
        </main>
      )}
    </>
  );
}