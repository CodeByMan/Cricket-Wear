import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CricketBallLoader from "../layouts/loader/Loader";
import {
  clearErrors,
  updateProfile,
  load_UserProfile,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstanat";
import MetaData from "../layouts/MataData/MataData";
import { Link, useHistory } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import "./AccountForms.css";

function UpdateProfile() {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileData
  );

  const { user } = useSelector((state) => state.userData);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const isValidEmail =
    email !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidName = name.trim().length >= 4;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatar?.url || "");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch({ type: UPDATE_PROFILE_RESET });
      dispatch(load_UserProfile());
      history.push("/account");
    }
  }, [dispatch, error, alert, history, isUpdated]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(reader.result);
    };
  };

  const updateProfileSubmitHandler = (e) => {
    e.preventDefault();

    if (!isValidName) {
      alert.error("Name must be at least 4 characters long.");
      return;
    }

    if (!isValidEmail) {
      alert.error("Please enter a valid email address.");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);

    if (avatar) {
      myForm.set("avatar", avatar);
    }

    dispatch(updateProfile(myForm));
  };

  const isSubmitDisabled = !(email && isValidEmail && name && isValidName);

  return (
    <>
      <MetaData title="Update Profile" />

      {loading ? (
        <CricketBallLoader />
      ) : (
        <main className="accountFormPage">
          <section className="accountFormCard accountProfileCard">
            <div className="accountFormTop">
              <Avatar className="accountFormAvatar">
                <UpdateIcon />
              </Avatar>

              <Typography component="p" className="accountFormBadge">
                Account Settings
              </Typography>

              <Typography component="h1" className="accountFormHeading">
                Update Profile Details
              </Typography>

              <Typography component="p" className="accountFormSubText">
                Keep your Cricket Wear profile information updated.
              </Typography>
            </div>

            <form className="accountForm" onSubmit={updateProfileSubmitHandler}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                error={!isValidName && name !== ""}
                helperText={
                  !isValidName && name !== ""
                    ? "Name must be at least 4 characters long."
                    : ""
                }
                onChange={(e) => setName(e.target.value)}
                className="accountTextField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon className="accountInputIcon" />
                    </InputAdornment>
                  ),
                }}
              />

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

              <div className="accountAvatarUploadBox">
                <Avatar
                  alt="Avatar Preview"
                  src={avatarPreview}
                  className="accountAvatarPreview"
                >
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </Avatar>

                <div className="accountUploadContent">
                  <Typography component="h3" className="accountUploadTitle">
                    Profile Picture
                  </Typography>

                  <Typography component="p" className="accountUploadText">
                    Upload a new image for your account avatar.
                  </Typography>

                  <input
                    accept="image/*"
                    className="accountFileInput"
                    id="avatar-input"
                    type="file"
                    onChange={handleAvatarChange}
                  />

                  <label htmlFor="avatar-input">
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      component="span"
                      className="accountUploadButton"
                    >
                      Upload Avatar
                    </Button>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="contained"
                className="accountPrimaryButton"
                fullWidth
                disabled={isSubmitDisabled}
              >
                Update Profile
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

export default UpdateProfile;