import React, { useState } from "react";
import {
  Divider,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MetaData from "../component/layouts/MataData/MataData";

const useStyles = makeStyles(() => ({
  root_contactus: {
    width: "100%",
    minHeight: "100vh",
    padding: "8rem 0 4rem",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    boxSizing: "border-box",

    "@media (max-width: 899px)": {
      padding: "7.2rem 0 3.5rem",
    },

    "@media (max-width: 560px)": {
      padding: "6.7rem 0 3rem",
    },
  },

  contact_Container_contactus: {
    width: "calc(100% - 32px)",
    maxWidth: "1050px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "22px",
    border: "1px solid rgba(227, 6, 5, 0.18)",
    boxShadow: "0 14px 34px rgba(227, 6, 5, 0.08)",
    padding: "2.4rem",
    boxSizing: "border-box",
    position: "relative",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "5px",
      backgroundColor: "#e30605",
      borderRadius: "22px 22px 0 0",
    },

    "@media (max-width: 768px)": {
      width: "calc(100% - 24px)",
      padding: "1.7rem",
      borderRadius: "18px",

      "&::before": {
        borderRadius: "18px 18px 0 0",
      },
    },

    "@media (max-width: 480px)": {
      width: "calc(100% - 18px)",
      padding: "1.1rem",
      borderRadius: "16px",

      "&::before": {
        borderRadius: "16px 16px 0 0",
      },
    },
  },

  title_contact_us: {
    color: "#121212",
    fontSize: "2.25rem !important",
    padding: "0.8rem 0 0.5rem",
    fontFamily: "'Archivo', sans-serif !important",
    fontWeight: "900 !important",
    lineHeight: "1.1 !important",
    letterSpacing: "-0.6px !important",

    "&::after": {
      content: '""',
      display: "block",
      width: "64px",
      height: "4px",
      backgroundColor: "#e30605",
      borderRadius: "99px",
      marginTop: "13px",
    },

    "@media (max-width: 768px)": {
      textAlign: "center",
      fontSize: "2rem !important",

      "&::after": {
        marginLeft: "auto",
        marginRight: "auto",
      },
    },

    "@media (max-width: 480px)": {
      fontSize: "1.7rem !important",
    },
  },

  divider_contact: {
    width: "100%",
    backgroundColor: "rgba(227, 6, 5, 0.18)",
    margin: "1.7rem 0 !important",
  },

  contactLayout: {
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: "1.8rem",
    alignItems: "stretch",

    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
      gap: "1.4rem",
    },
  },

  infoPanel: {
    height: "100%",
    padding: "1.8rem",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(227, 6, 5, 0.16)",
    boxShadow: "0 10px 26px rgba(227, 6, 5, 0.07)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",

    "@media (max-width: 768px)": {
      padding: "1.4rem",
      textAlign: "center",
      borderRadius: "16px",
    },

    "@media (max-width: 480px)": {
      padding: "1.1rem",
    },
  },

  formPanel: {
    height: "100%",
    padding: "1.8rem",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(227, 6, 5, 0.16)",
    boxShadow: "0 10px 26px rgba(227, 6, 5, 0.07)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",

    "@media (max-width: 768px)": {
      padding: "1.4rem",
      borderRadius: "16px",
    },

    "@media (max-width: 480px)": {
      padding: "1.1rem",
    },
  },

  helpTitle_contact_us: {
    fontSize: "1.45rem !important",
    color: "#121212",
    padding: "0 0 1rem",
    fontFamily: "'Archivo', sans-serif !important",
    fontWeight: "900 !important",
    lineHeight: "1.2 !important",

    "&::after": {
      content: '""',
      display: "block",
      width: "48px",
      height: "3px",
      backgroundColor: "#e30605",
      borderRadius: "99px",
      marginTop: "10px",
    },

    "@media (max-width: 768px)": {
      "&::after": {
        marginLeft: "auto",
        marginRight: "auto",
      },
    },

    "@media (max-width: 480px)": {
      fontSize: "1.25rem !important",
    },
  },

  para_contact: {
    paddingBottom: "1.05rem",
    margin: "0",
    color: "#333333",
    lineHeight: "1.7 !important",
    fontSize: "0.98rem !important",
    width: "100%",
    fontFamily: "'Roboto', sans-serif !important",
    letterSpacing: "0.2px",

    "& strong": {
      color: "#e30605",
      fontWeight: 900,
      textDecorationColor: "#e30605",
    },

    "@media (max-width: 480px)": {
      fontSize: "0.9rem !important",
      lineHeight: "1.6 !important",
    },
  },

  address_contacts: {
    padding: "1rem",
    margin: "0.3rem 0 1.3rem",
    color: "#333333",
    lineHeight: "1.65 !important",
    fontSize: "0.96rem !important",
    width: "100%",
    fontFamily: "'Roboto', sans-serif !important",
    letterSpacing: "0.2px",
    backgroundColor: "rgba(227, 6, 5, 0.04)",
    border: "1px solid rgba(227, 6, 5, 0.14)",
    borderRadius: "14px",
    boxSizing: "border-box",

    "& span": {
      color: "#e30605",
      fontWeight: "900 !important",
      display: "inline-block",
      marginBottom: "0.35rem",
    },

    "@media (max-width: 480px)": {
      fontSize: "0.9rem !important",
    },
  },

  buttonGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0.9rem",
    flexWrap: "wrap",
    marginTop: "auto",

    "@media (max-width: 768px)": {
      justifyContent: "center",
      marginTop: "0.8rem",
    },

    "@media (max-width: 480px)": {
      gap: "0.8rem",
    },
  },

  supportButton: {
    backgroundColor: "#e30605 !important",
    color: "#ffffff !important",
    border: "2px solid #e30605 !important",
    minWidth: "155px !important",
    height: "48px !important",
    padding: "0 1.7rem !important",
    borderRadius: "999px !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.84rem !important",
    fontWeight: "900 !important",
    letterSpacing: "0.7px !important",
    textTransform: "uppercase !important",
    boxShadow: "0 10px 22px rgba(227, 6, 5, 0.22) !important",

    "&:hover": {
      backgroundColor: "#ffffff !important",
      color: "#e30605 !important",
    },

    "@media (max-width: 480px)": {
      width: "100% !important",
    },
  },

  callButton: {
    backgroundColor: "#ffffff !important",
    color: "#e30605 !important",
    border: "2px solid #e30605 !important",
    minWidth: "155px !important",
    height: "48px !important",
    padding: "0 1.7rem !important",
    borderRadius: "999px !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.84rem !important",
    fontWeight: "900 !important",
    letterSpacing: "0.7px !important",
    textTransform: "uppercase !important",

    "&:hover": {
      backgroundColor: "#e30605 !important",
      color: "#ffffff !important",
    },

    "@media (max-width: 480px)": {
      width: "100% !important",
    },
  },

  supportForm: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  formTitle: {
    color: "#121212",
    fontSize: "1.55rem !important",
    padding: "0 0 0.7rem",
    fontFamily: "'Archivo', sans-serif !important",
    fontWeight: "900 !important",
    lineHeight: "1.2 !important",

    "&::after": {
      content: '""',
      display: "block",
      width: "50px",
      height: "3px",
      backgroundColor: "#e30605",
      borderRadius: "99px",
      marginTop: "10px",
    },

    "@media (max-width: 768px)": {
      textAlign: "center",

      "&::after": {
        marginLeft: "auto",
        marginRight: "auto",
      },
    },

    "@media (max-width: 480px)": {
      fontSize: "1.3rem !important",
    },
  },

  formIntro: {
    margin: "0 0 1.25rem !important",
    color: "#555555",
    fontSize: "0.95rem !important",
    fontFamily: "'Roboto', sans-serif !important",
    lineHeight: "1.65 !important",

    "@media (max-width: 768px)": {
      textAlign: "center",
    },
  },

  formContainer_container: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "1rem",
    rowGap: "1.1rem",

    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },

  fullWidthField: {
    gridColumn: "1 / -1",
  },

  formField_contact: {
    width: "100%",
  },

  SelectOption_contact: {
    width: "100%",
    marginBottom: 0,

    "& .MuiOutlinedInput-root": {
      minHeight: "54px",
      borderRadius: "13px",
      backgroundColor: "#ffffff !important",
      color: "#121212 !important",
      fontFamily: "'Roboto', sans-serif",

      "& fieldset": {
        borderColor: "rgba(227, 6, 5, 0.22)",
      },

      "&:hover fieldset": {
        borderColor: "#e30605",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#e30605",
        borderWidth: "1.5px",
      },

      "&.Mui-error fieldset": {
        borderColor: "#e30605 !important",
      },
    },

    "& .MuiInputBase-input": {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "0.95rem",
      color: "#121212 !important",
      backgroundColor: "#ffffff !important",
    },

    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      color: "#121212 !important",
      backgroundColor: "#ffffff !important",
    },

    "& .MuiSelect-icon": {
      color: "#e30605 !important",
    },
  },

  selectPlaceholder: {
    color: "#888888",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "0.95rem",
  },

  messageField_contact: {
    width: "100%",

    "& .MuiOutlinedInput-root": {
      alignItems: "flex-start",
    },

    "& textarea": {
      resize: "vertical !important",
      minHeight: "72px !important",
      maxHeight: "360px !important",
      overflow: "auto !important",
      color: "#121212 !important",
      backgroundColor: "#ffffff !important",
      fontFamily: "'Roboto', sans-serif !important",
      fontSize: "0.95rem !important",
      lineHeight: "1.6 !important",
    },
  },

  lableText_contact: {
    color: "#121212",
    fontSize: "0.78rem !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontWeight: "900 !important",
    marginBottom: "0.55rem !important",
    letterSpacing: "1px !important",
    textTransform: "uppercase",
  },

  formError: {
    margin: "0.35rem 0 0 !important",
    color: "#e30605",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.78rem !important",
    fontWeight: "700 !important",
  },

  menu_contact: {
    backgroundColor: "#ffffff !important",
    color: "#121212 !important",
    border: "1px solid rgba(227, 6, 5, 0.16) !important",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12) !important",

    "& .MuiList-root": {
      backgroundColor: "#ffffff !important",
      color: "#121212 !important",
      padding: "6px !important",
    },

    "& .MuiMenuItem-root": {
      backgroundColor: "#ffffff !important",
      color: "#121212 !important",
      fontFamily: "'Roboto', sans-serif !important",
      fontSize: "0.92rem !important",
      borderRadius: "8px !important",
      margin: "2px 0 !important",

      "&:hover": {
        backgroundColor: "rgba(227, 6, 5, 0.08) !important",
        color: "#121212 !important",
      },

      "&.Mui-selected": {
        backgroundColor: "rgba(227, 6, 5, 0.12) !important",
        color: "#121212 !important",
      },

      "&.Mui-selected:hover": {
        backgroundColor: "rgba(227, 6, 5, 0.16) !important",
        color: "#121212 !important",
      },
    },
  },

  clearOption: {
    color: "#e30605 !important",
    fontStyle: "normal !important",
    fontWeight: "800 !important",
  },

  submitButtons: {
    gridColumn: "1 / -1",
    justifySelf: "flex-start",
    backgroundColor: "#e30605 !important",
    color: "#ffffff !important",
    border: "2px solid #e30605 !important",
    minWidth: "170px !important",
    height: "52px !important",
    padding: "0 2rem !important",
    borderRadius: "999px !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.88rem !important",
    fontWeight: "900 !important",
    textTransform: "uppercase !important",
    letterSpacing: "0.8px !important",
    boxShadow: "0 10px 24px rgba(227, 6, 5, 0.24) !important",

    "&:hover": {
      backgroundColor: "#ffffff !important",
      color: "#e30605 !important",
    },

    "@media (max-width: 768px)": {
      justifySelf: "center",
    },

    "@media (max-width: 480px)": {
      width: "100% !important",
      minWidth: "100% !important",
    },
  },
}));

const ContactForm = () => {
  const classes = useStyles();
  const alert = useAlert();
  const history = useHistory();

  const [issue, setIssue] = useState("");
  const [detail, setDetail] = useState("");
  const [language, setLanguage] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const handleCall = () => {
    window.location.href = "tel:+923001234567";
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!issue) {
      errors.issue = "Please select an issue.";
    }

    if (!detail) {
      errors.detail = "Please select a detail.";
    }

    if (!language) {
      errors.language = "Please select a language.";
    }

    if (!email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!message.trim()) {
      errors.message = "Please enter your message.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const clearFieldError = (fieldName) => {
    if (formErrors[fieldName]) {
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert.error("Please fill all required fields correctly.");
      return;
    }

    alert.success("Your message has been sent successfully");
    history.push("/");
  };

  return (
    <Box className={classes.root_contactus}>
      <MetaData title={"Contact Us"} />

      <div className={classes.contact_Container_contactus}>
        <Typography variant="h2" className={classes.title_contact_us}>
          Contact Us
        </Typography>

        <Divider className={classes.divider_contact} />

        <div className={classes.contactLayout}>
          <div className={classes.infoPanel}>
            <Typography variant="h4" className={classes.helpTitle_contact_us}>
              Need Help?
            </Typography>

            <Typography variant="body2" className={classes.para_contact}>
              We have live chat available, look for the chat icon in the lower
              right hand corner of this page. If it isn’t there, then give us a
              call at{" "}
              <strong
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={handleCall}
              >
                +92 300 1234567
              </strong>
              .
            </Typography>

            <Typography variant="body2" className={classes.para_contact}>
              <span>7:00 AM - 6:00 PM Monday-Friday</span>
              <br />
              <span>9:00 AM - 4:00 PM Saturday</span>
              <br />
              <span>Closed Sunday</span>
            </Typography>

            <Typography variant="body2" className={classes.para_contact}>
              Catch us outside these hours? Fill out our support form below, and
              we'll be in touch shortly.
            </Typography>

            <Typography variant="body2" className={classes.address_contacts}>
              <span>Cricket Wear Store</span>
              <br />
              Shop No 123, Dolmen Mall
              <br />
              North Nazimabad, Karachi, Sindh, Pakistan
              <br />
              Postal Code 74700
            </Typography>

            <div className={classes.buttonGroup}>
              <a href="#issue-select" style={{ textDecoration: "none" }}>
                <Button variant="contained" className={classes.supportButton}>
                  Support Form
                </Button>
              </a>

              <Button
                variant="contained"
                className={classes.callButton}
                onClick={handleCall}
              >
                Call Us
              </Button>
            </div>
          </div>

          <div className={classes.formPanel}>
            <div className={classes.supportForm}>
              <Typography variant="h4" className={classes.formTitle}>
                Support Form
              </Typography>

              <Typography variant="body2" className={classes.formIntro}>
                Need a quicker answer? Look for our chat icon on the right hand
                side of this page.
              </Typography>

              <form
                className={classes.formContainer_container}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={classes.SelectOption_contact}>
                  <Typography
                    variant="body2"
                    className={classes.lableText_contact}
                  >
                    Issue *
                  </Typography>

                  <FormControl
                    className={classes.formField_contact}
                    error={Boolean(formErrors.issue)}
                  >
                    <Select
                      labelId="issue-label"
                      id="issue-select"
                      value={issue}
                      displayEmpty
                      onChange={(e) => {
                        setIssue(e.target.value);
                        clearFieldError("issue");
                      }}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span className={classes.selectPlaceholder}>
                              Select issue
                            </span>
                          );
                        }

                        return selected === "e-commerce" ? "E-Commerce" : "App";
                      }}
                      MenuProps={{
                        classes: { paper: classes.menu_contact },
                        PaperProps: {
                          style: {
                            backgroundColor: "#ffffff",
                            color: "#121212",
                          },
                        },
                      }}
                    >
                      <MenuItem value="" className={classes.clearOption}>
                        None
                      </MenuItem>
                      <MenuItem value="e-commerce">E-Commerce</MenuItem>
                      <MenuItem value="app">App</MenuItem>
                    </Select>
                  </FormControl>

                  {formErrors.issue && (
                    <Typography className={classes.formError}>
                      {formErrors.issue}
                    </Typography>
                  )}
                </div>

                <div className={classes.SelectOption_contact}>
                  <Typography
                    variant="body2"
                    className={classes.lableText_contact}
                  >
                    Detail *
                  </Typography>

                  <FormControl
                    className={classes.formField_contact}
                    error={Boolean(formErrors.detail)}
                  >
                    <Select
                      labelId="detail-label"
                      id="detail-select"
                      value={detail}
                      displayEmpty
                      onChange={(e) => {
                        setDetail(e.target.value);
                        clearFieldError("detail");
                      }}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span className={classes.selectPlaceholder}>
                              Select detail
                            </span>
                          );
                        }

                        const labels = {
                          availability: "Availability",
                          "return/exchange": "Return/Exchange",
                          "technical-support": "Technical Support",
                          invoicing: "Invoicing",
                          "tracking-info": "Tracking Info",
                          others: "Others",
                        };

                        return labels[selected];
                      }}
                      MenuProps={{
                        classes: { paper: classes.menu_contact },
                        PaperProps: {
                          style: {
                            backgroundColor: "#ffffff",
                            color: "#121212",
                          },
                        },
                      }}
                    >
                      <MenuItem value="" className={classes.clearOption}>
                        None
                      </MenuItem>
                      <MenuItem value="availability">Availability</MenuItem>
                      <MenuItem value="return/exchange">Return/Exchange</MenuItem>
                      <MenuItem value="technical-support">
                        Technical Support
                      </MenuItem>
                      <MenuItem value="invoicing">Invoicing</MenuItem>
                      <MenuItem value="tracking-info">Tracking Info</MenuItem>
                      <MenuItem value="others">Others</MenuItem>
                    </Select>
                  </FormControl>

                  {formErrors.detail && (
                    <Typography className={classes.formError}>
                      {formErrors.detail}
                    </Typography>
                  )}
                </div>

                <div className={classes.SelectOption_contact}>
                  <Typography
                    variant="body2"
                    className={classes.lableText_contact}
                  >
                    Language *
                  </Typography>

                  <FormControl
                    className={classes.formField_contact}
                    error={Boolean(formErrors.language)}
                  >
                    <Select
                      labelId="language-label"
                      id="language-select"
                      value={language}
                      displayEmpty
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        clearFieldError("language");
                      }}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span className={classes.selectPlaceholder}>
                              Select language
                            </span>
                          );
                        }

                        const labels = {
                          english: "English",
                          urdu: "Urdu",
                          hindi: "Hindi",
                        };

                        return labels[selected];
                      }}
                      MenuProps={{
                        classes: { paper: classes.menu_contact },
                        PaperProps: {
                          style: {
                            backgroundColor: "#ffffff",
                            color: "#121212",
                          },
                        },
                      }}
                    >
                      <MenuItem value="" className={classes.clearOption}>
                        None
                      </MenuItem>
                      <MenuItem value="english">English</MenuItem>
                      <MenuItem value="urdu">Urdu</MenuItem>
                      <MenuItem value="hindi">Hindi</MenuItem>
                    </Select>
                  </FormControl>

                  {formErrors.language && (
                    <Typography className={classes.formError}>
                      {formErrors.language}
                    </Typography>
                  )}
                </div>

                <div className={classes.SelectOption_contact}>
                  <Typography
                    variant="body2"
                    className={classes.lableText_contact}
                  >
                    Email *
                  </Typography>

                  <FormControl className={classes.formField_contact}>
                    <TextField
                      placeholder="Enter Your Email *"
                      id="email-input"
                      type="email"
                      value={email}
                      error={Boolean(formErrors.email)}
                      helperText={formErrors.email || ""}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError("email");
                      }}
                    />
                  </FormControl>
                </div>

                <div
                  className={`${classes.SelectOption_contact} ${classes.fullWidthField}`}
                >
                  <Typography
                    variant="body2"
                    className={classes.lableText_contact}
                  >
                    Message *
                  </Typography>

                  <FormControl className={classes.formField_contact}>
                    <TextField
                      id="message-textarea"
                      className={classes.messageField_contact}
                      multiline
                      minRows={1}
                      maxRows={4}
                      variant="outlined"
                      placeholder="Enter Your Message *"
                      value={message}
                      error={Boolean(formErrors.message)}
                      helperText={formErrors.message || ""}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        clearFieldError("message");
                      }}
                    />
                  </FormControl>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submitButtons}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ContactForm;