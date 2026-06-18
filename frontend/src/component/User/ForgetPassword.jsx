import React, { useState, useEffect } from "react";
import LockClockIcon from "@mui/icons-material/LockClock";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { TextField, Button, Typography, Avatar, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import CricketBallLoader from "../layouts/loader/Loader";
import { Link } from "react-router-dom";
import "./AccountForms.css";

export default function ForgetPassowrd() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgetPassword
  );

  const [email, setEmail] = useState("");
  const [isDone, setIsDone] = useState(false);

  const isValidEmail =
    email !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function handleforgotPasswordSubmit(e) {
    e.preventDefault();

    if (!isValidEmail) {
      alert.error("Please enter a valid email address.");
      return;
    }

    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(forgetPassword(myForm));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
      setIsDone(true);
      setEmail("");
    }
  }, [dispatch, error, alert, message]);

  const isSubmitDisabled = !(email && isValidEmail);

  return (
    <>
      <MetaData title="Forgot Password" />

      {loading ? (
        <CricketBallLoader />
      ) : (
        <main className="accountFormPage">
          <section className="accountFormCard">
            <div className="accountFormTop">
              <Avatar className="accountFormAvatar">
                <LockClockIcon />
              </Avatar>

              <Typography component="p" className="accountFormBadge">
                Password Help
              </Typography>

              <Typography component="h1" className="accountFormHeading">
                Forgot Your Password?
              </Typography>

              <Typography component="p" className="accountFormSubText">
                Enter your email and we will send you password reset instructions.
              </Typography>
            </div>

            {isDone && (
              <div className="accountSuccessBox">
                An email regarding your password reset has been sent to your
                email address.
              </div>
            )}

            <form className="accountForm" onSubmit={handleforgotPasswordSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!isValidEmail && email !== ""}
                helperText={
                  !isValidEmail && email !== ""
                    ? "Please enter a valid email address."
                    : ""
                }
                className="accountTextField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon className="accountInputIcon" />
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
                Send Email
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