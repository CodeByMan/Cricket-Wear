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

import CricketBallLoader from "../layouts/loader/Loader";
import MetaData from "../layouts/MataData/MataData";
import { Link, useHistory } from "react-router-dom";
import { signUp, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import useStyles from "./LoginFromStyle";

function Signup() {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [areCheckboxesChecked, setAreCheckboxesChecked] = useState({
    checkbox1: false,
    checkbox2: false,
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated, error } = useSelector((state) => state.userData);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      setLoading(false);
    }

    if (isAuthenticated) {
      alert.success("User Registered Successfully");
      history.push("/account");
    }
  }, [dispatch, isAuthenticated, error, alert, history]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setIsValidName(newName.length >= 4 && newName.length <= 20);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };

  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCheckboxChange = (checkboxName) => (event) => {
    setAreCheckboxesChecked((prevState) => ({
      ...prevState,
      [checkboxName]: event.target.checked,
    }));
  };

  const isSignInDisabled = !(
    email &&
    password &&
    isValidEmail &&
    confirmPassword &&
    name &&
    isValidName &&
    isValidPassword &&
    areCheckboxesChecked.checkbox1 &&
    areCheckboxesChecked.checkbox2
  );

  function handleSignUpSubmit(e) {
    e.preventDefault();

    if (isSignInDisabled || loading) {
      return;
    }

    if (password !== confirmPassword) {
      alert.error("Password and Confirm Password do not match");
      setLoading(false);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(signUp(formData));
    setLoading(false);
  }

  return (
    <>
      <MetaData title="Sign Up" />

      {loading ? (
        <CricketBallLoader />
      ) : (
        <main className={classes.signupPage}>
          <section className={classes.formCard}>
            <form className={classes.form} onSubmit={handleSignUpSubmit} noValidate>
              <div className={classes.formHeader}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" className={classes.heading}>
                  Create Account
                </Typography>

                <Typography component="p" className={classes.subHeading}>
                  Join Cricket Wear and start shopping premium cricket gear.
                </Typography>
              </div>

              <div className={classes.inputGrid}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  className={`${classes.nameInput} ${classes.textField}`}
                  value={name}
                  onChange={handleNameChange}
                  error={!isValidName && name !== ""}
                  helperText={
                    !isValidName && name !== ""
                      ? "Name must be between 4 and 20 characters."
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon className={classes.inputIcon} />
                      </InputAdornment>
                    ),
                  }}
                />

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
                  error={!isValidPassword && password !== ""}
                  helperText={
                    !isValidPassword && password !== ""
                      ? "Password must be at least 8 characters."
                      : ""
                  }
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

                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  className={`${classes.passwordInput} ${classes.textField}`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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

              <div className={classes.avatarUploadBox}>
                <Avatar
                  alt="Avatar Preview"
                  src={avatarPreview}
                  className={classes.avatar2}
                />

                <div className={classes.avatarUploadContent}>
                  <Typography component="p" className={classes.avatarUploadTitle}>
                    Profile Avatar
                  </Typography>

                  <Typography component="p" className={classes.avatarUploadText}>
                    Upload your profile image.
                  </Typography>

                  <input
                    accept="image/*"
                    className={classes.input}
                    id="avatar-input"
                    type="file"
                    onChange={handleAvatarChange}
                  />

                  <label htmlFor="avatar-input">
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      component="span"
                      className={classes.uploadAvatarButton}
                    >
                      Upload Avatar
                    </Button>
                  </label>
                </div>
              </div>

              <div className={classes.checkboxGroup}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={areCheckboxesChecked.checkbox1}
                      onChange={handleCheckboxChange("checkbox1")}
                      className={classes.checkboxInput}
                    />
                  }
                  label="I Accept The Cricket Wear Terms & Conditions"
                  className={classes.checkbox}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={areCheckboxesChecked.checkbox2}
                      onChange={handleCheckboxChange("checkbox2")}
                      className={classes.checkboxInput}
                    />
                  }
                  label="I Accept The Cricket Wear Terms Of Use"
                  className={classes.checkbox}
                />
              </div>

              <Typography variant="body2" className={classes.termsAndConditionsText}>
                I acknowledge Cricket Wear will use my information{" "}
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
                Create Account
              </Button>

              <Typography variant="body1" className={classes.switchAccountText}>
                Already have an account?
                <Link to="/login" className={classes.createAccount}>
                  Login
                </Link>
              </Typography>
            </form>
          </section>
        </main>
      )}
    </>
  );
}

export default Signup;