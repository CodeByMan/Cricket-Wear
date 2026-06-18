import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  signupPage: {
    width: "100%",
    minHeight: "100vh",
    padding: "140px 22px 48px",
    background:
      "radial-gradient(circle at top, rgba(227, 6, 5, 0.12), transparent 32%), linear-gradient(135deg, #f8f9fa 0%, #ffffff 48%, #f3f4f6 100%)",
    boxSizing: "border-box",
    overflowX: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "@media (max-width: 899px)": {
      padding: "126px 18px 38px",
    },

    "@media (max-width: 560px)": {
      padding: "116px 12px 30px",
      alignItems: "flex-start",
    },

    "@media (max-width: 420px)": {
      padding: "110px 10px 26px",
    },
  },

  formContainer: {
    width: "100%",
    minHeight: "100vh",
    padding: "140px 22px 48px",
    background:
      "radial-gradient(circle at top, rgba(227, 6, 5, 0.12), transparent 32%), linear-gradient(135deg, #f8f9fa 0%, #ffffff 48%, #f3f4f6 100%)",
    boxSizing: "border-box",
    overflowX: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "@media (max-width: 899px)": {
      padding: "126px 18px 38px",
    },

    "@media (max-width: 560px)": {
      padding: "116px 12px 30px",
      alignItems: "flex-start",
    },

    "@media (max-width: 420px)": {
      padding: "110px 10px 26px",
    },
  },

  formCard: {
    width: "100%",
    maxWidth: "620px",
    backgroundColor: "#ffffff",
    borderRadius: "28px",
    padding: "46px 46px 38px",
    boxSizing: "border-box",
    border: "1px solid rgba(18, 18, 18, 0.08)",
    boxShadow:
      "0 24px 70px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.08)",
    position: "relative",
    overflow: "hidden",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "5px",
      background: "linear-gradient(90deg, #e30605 0%, #b80504 100%)",
    },

    "@media (max-width: 700px)": {
      maxWidth: "560px",
      padding: "40px 34px 34px",
      borderRadius: "24px",
    },

    "@media (max-width: 560px)": {
      padding: "34px 22px 30px",
      borderRadius: "20px",
    },

    "@media (max-width: 380px)": {
      padding: "30px 16px 26px",
      borderRadius: "16px",
    },
  },

  form: {
    width: "100%",
    margin: 0,
    position: "relative",
    zIndex: 1,
  },

  formHeader: {
    textAlign: "center",
    marginBottom: "28px",

    "@media (max-width: 560px)": {
      marginBottom: "22px",
    },
  },

  avatar: {
    width: "58px !important",
    height: "58px !important",
    margin: "0 auto 16px !important",
    backgroundColor: "#e30605 !important",
    color: "#ffffff !important",
    border: "2px solid #e30605",
    boxShadow: "0 10px 26px rgba(227, 6, 5, 0.22)",

    "& svg": {
      width: "30px",
      height: "30px",
    },

    "@media (max-width: 420px)": {
      width: "52px !important",
      height: "52px !important",

      "& svg": {
        width: "27px",
        height: "27px",
      },
    },
  },

  heading: {
    margin: "0 !important",
    color: "#121212",
    fontFamily: "'Archivo', sans-serif !important",
    fontSize: "clamp(1.8rem, 4.5vw, 2.4rem) !important",
    fontWeight: "900 !important",
    lineHeight: "1.1 !important",
    letterSpacing: "-0.6px !important",
  },

  subHeading: {
    maxWidth: "410px",
    margin: "10px auto 0 !important",
    color: "#6c757d",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.96rem !important",
    lineHeight: "1.55 !important",

    "@media (max-width: 420px)": {
      fontSize: "0.88rem !important",
    },
  },

  inputGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",

    "@media (max-width: 700px)": {
      gridTemplateColumns: "1fr",
      gap: "15px",
    },
  },

  loginInputStack: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "24px",

    "@media (max-width: 560px)": {
      gap: "20px",
    },
  },

  textField: {
    margin: "0 !important",

    "& .MuiOutlinedInput-root": {
      minHeight: "56px",
      borderRadius: "14px",
      backgroundColor: "#ffffff",
      color: "#121212",
      fontFamily: "'Roboto', sans-serif",
      transition: "box-shadow 0.2s ease, border-color 0.2s ease",

      "& fieldset": {
        borderColor: "rgba(18, 18, 18, 0.16)",
      },

      "&:hover fieldset": {
        borderColor: "rgba(227, 6, 5, 0.65)",
      },

      "&.Mui-focused": {
        boxShadow: "0 0 0 4px rgba(227, 6, 5, 0.08)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#e30605",
        borderWidth: "1.5px",
      },
    },

    "& .MuiInputAdornment-root": {
      marginRight: "10px",
      minWidth: "34px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },

    "& .MuiInputAdornment-root svg": {
      width: "30px !important",
      height: "30px !important",
      fontSize: "30px !important",
    },

    "& .MuiInputBase-input": {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "0.95rem",
    },

    "& .MuiInputLabel-root": {
      color: "#6c757d",
      fontFamily: "'Roboto', sans-serif",
      fontSize: "0.95rem",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#e30605",
    },

    "& .MuiFormHelperText-root": {
      marginLeft: "4px",
      fontFamily: "'Roboto', sans-serif",
      fontSize: "0.78rem",
    },
  },

  nameInput: {},

  emailInput: {},

  passwordInput: {},

  inputIcon: {
    color: "#e30605 !important",
    width: "30px !important",
    height: "30px !important",
    fontSize: "30px !important",
    minWidth: "30px !important",
    minHeight: "30px !important",
  },

  showPasswordButton: {
    width: "40px !important",
    height: "40px !important",
    padding: "0 !important",
    color: "#121212 !important",

    "&:hover": {
      backgroundColor: "rgba(227, 6, 5, 0.08) !important",
      color: "#e30605 !important",
    },

    "& svg": {
      width: "25px !important",
      height: "25px !important",
      fontSize: "25px !important",
    },
  },

  loginOptionsBox: {
    marginTop: "24px",
    padding: "12px 14px",
    borderRadius: "15px",
    backgroundColor: "#fbfbfb",
    border: "1px solid rgba(18, 18, 18, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
    boxSizing: "border-box",

    "@media (max-width: 420px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "10px",
    },
  },

  rememberMeContainer: {
    width: "100%",
    marginTop: "24px",
    padding: "12px 14px",
    borderRadius: "15px",
    backgroundColor: "#fbfbfb",
    border: "1px solid rgba(18, 18, 18, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
    boxSizing: "border-box",

    "@media (max-width: 420px)": {
      alignItems: "flex-start",
      flexDirection: "column",
      gap: "10px",
    },
  },

  rememberLabel: {
    margin: "0 !important",
    alignItems: "center !important",

    "& .MuiFormControlLabel-label": {
      color: "#343a40",
      fontFamily: "'Roboto', sans-serif",
      fontSize: "0.95rem",
      fontWeight: 700,
      lineHeight: "1.3",
    },

    "@media (max-width: 420px)": {
      "& .MuiFormControlLabel-label": {
        fontSize: "0.88rem",
      },
    },
  },

  rememberCheckbox: {
    color: "#e30605 !important",
    padding: "2px 12px 2px 0 !important",

    "&.Mui-checked": {
      color: "#e30605 !important",
    },

    "& svg": {
      width: "34px !important",
      height: "34px !important",
      fontSize: "34px !important",
    },

    "& .MuiSvgIcon-root": {
      width: "34px !important",
      height: "34px !important",
      fontSize: "34px !important",
    },

    "&:hover": {
      backgroundColor: "rgba(227, 6, 5, 0.08) !important",
    },

    "@media (max-width: 420px)": {
      "& svg": {
        width: "32px !important",
        height: "32px !important",
        fontSize: "32px !important",
      },

      "& .MuiSvgIcon-root": {
        width: "32px !important",
        height: "32px !important",
        fontSize: "32px !important",
      },
    },
  },

  forgotPasswordLink: {
    color: "#e30605",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "0.9rem",
    fontWeight: "800",
    textDecoration: "none !important",

    "&:hover": {
      color: "#b80504",
      textDecoration: "underline !important",
    },
  },

  avatarUploadBox: {
    marginTop: "22px",
    padding: "24px 22px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "14px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, #ffffff 0%, #f8f9fa 55%, #fff3f3 100%)",
    border: "1.8px dashed rgba(227, 6, 5, 0.42)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 10px 28px rgba(0, 0, 0, 0.06)",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",

    "&::before": {
      content: '""',
      position: "absolute",
      width: "130px",
      height: "130px",
      borderRadius: "50%",
      backgroundColor: "rgba(227, 6, 5, 0.07)",
      top: "-62px",
      right: "-50px",
      pointerEvents: "none",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.035)",
      bottom: "-45px",
      left: "-35px",
      pointerEvents: "none",
    },

    "@media (max-width: 560px)": {
      padding: "22px 18px",
      borderRadius: "19px",
      gap: "13px",
    },

    "@media (max-width: 420px)": {
      padding: "20px 15px",
    },
  },

  avatar2: {
    width: "86px !important",
    height: "86px !important",
    backgroundColor: "#e30605 !important",
    color: "#ffffff !important",
    border: "3px solid #e30605",
    boxShadow:
      "0 10px 24px rgba(227, 6, 5, 0.22), 0 0 0 6px rgba(227, 6, 5, 0.08)",
    position: "relative",
    zIndex: 1,

    "@media (max-width: 560px)": {
      width: "78px !important",
      height: "78px !important",
    },

    "@media (max-width: 420px)": {
      width: "74px !important",
      height: "74px !important",
    },
  },

  avatarUploadContent: {
    width: "100%",
    maxWidth: "360px",
    minWidth: 0,
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  avatarUploadTitle: {
    margin: "0 0 5px !important",
    color: "#121212",
    fontFamily: "'Archivo', sans-serif !important",
    fontSize: "1.08rem !important",
    fontWeight: "900 !important",
    lineHeight: "1.15 !important",
    textAlign: "center",
  },

  avatarUploadText: {
    margin: "0 0 15px !important",
    color: "#6c757d",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.9rem !important",
    lineHeight: "1.45 !important",
    textAlign: "center",
    maxWidth: "300px",

    "@media (max-width: 420px)": {
      fontSize: "0.84rem !important",
      maxWidth: "260px",
    },
  },

  input: {
    display: "none",
  },

  uploadAvatarButton: {
    minWidth: "190px !important",
    height: "46px !important",
    backgroundColor: "#e30605 !important",
    backgroundImage: "none !important",
    color: "#ffffff !important",
    border: "2px solid #e30605 !important",
    borderRadius: "999px !important",
    padding: "0 26px !important",
    margin: "0 auto !important",
    display: "inline-flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.82rem !important",
    fontWeight: "900 !important",
    textTransform: "uppercase !important",
    letterSpacing: "0.9px !important",
    boxShadow: "0 10px 22px rgba(0, 0, 0, 0.22) !important",
    transition:
      "background-color 0.25s ease, color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease !important",

    "&:hover": {
      backgroundColor: "#e30605 !important",
      backgroundImage: "none !important",
      color: "#050505 !important",
      transform: "translateY(-2px)",
      boxShadow: "0 14px 28px rgba(227, 6, 5, 0.32) !important",
    },

    "&:active": {
      transform: "translateY(0)",
      boxShadow: "0 8px 18px rgba(227, 6, 5, 0.24) !important",
    },

    "& svg": {
      color: "inherit !important",
      width: "22px !important",
      height: "22px !important",
    },

    "@media (max-width: 420px)": {
      minWidth: "180px !important",
      height: "44px !important",
      fontSize: "0.78rem !important",
    },

    "@media (max-width: 340px)": {
      minWidth: "165px !important",
      padding: "0 18px !important",
      fontSize: "0.74rem !important",
    },
  },

  uploadAvatarText: {
    margin: "0 !important",
  },

  checkboxGroup: {
    marginTop: "22px",
    display: "grid",
    gap: "12px",
  },

  checkbox: {
    alignItems: "flex-start !important",
    margin: "0 !important",
    padding: "10px 12px 10px 10px",
    borderRadius: "15px",
    backgroundColor: "#fbfbfb",
    border: "1px solid rgba(18, 18, 18, 0.08)",
    transition:
      "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",

    "&:hover": {
      backgroundColor: "#fff6f6",
      borderColor: "rgba(227, 6, 5, 0.28)",
      boxShadow: "0 8px 20px rgba(227, 6, 5, 0.06)",
    },

    "& .MuiFormControlLabel-label": {
      color: "#2b2b2b",
      fontFamily: "'Roboto', sans-serif",
      fontSize: "0.96rem",
      fontWeight: 600,
      lineHeight: "1.45",
      paddingTop: "6px",

      "@media (max-width: 420px)": {
        fontSize: "0.88rem",
        paddingTop: "7px",
      },

      "@media (max-width: 340px)": {
        fontSize: "0.82rem",
      },
    },
  },

  checkboxInput: {
    color: "#e30605 !important",
    padding: "4px 10px 4px 4px !important",

    "&.Mui-checked": {
      color: "#e30605 !important",
    },

    "& svg": {
      width: "32px !important",
      height: "32px !important",
      fontSize: "32px !important",
    },

    "& .MuiSvgIcon-root": {
      width: "32px !important",
      height: "32px !important",
      fontSize: "32px !important",
    },

    "&:hover": {
      backgroundColor: "rgba(227, 6, 5, 0.08) !important",
    },

    "@media (max-width: 420px)": {
      "& svg": {
        width: "30px !important",
        height: "30px !important",
        fontSize: "30px !important",
      },

      "& .MuiSvgIcon-root": {
        width: "30px !important",
        height: "30px !important",
        fontSize: "30px !important",
      },
    },
  },

  termsAndConditionsText: {
    margin: "16px 0 20px !important",
    color: "#6c757d",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.86rem !important",
    lineHeight: "1.55 !important",

    "@media (max-width: 420px)": {
      fontSize: "0.8rem !important",
    },
  },

  privacyText: {
    color: "#e30605",
    textDecoration: "none !important",
    fontWeight: "800",
    marginLeft: "4px",

    "&:hover": {
      color: "#b80504",
      textDecoration: "underline !important",
    },
  },

  loginButton: {
    height: "54px",
    borderRadius: "999px !important",
    backgroundColor: "#e30605 !important",
    color: "#ffffff !important",
    border: "2px solid #e30605 !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.98rem !important",
    fontWeight: "900 !important",
    textTransform: "uppercase !important",
    letterSpacing: "1.1px !important",
    boxShadow: "0 12px 26px rgba(227, 6, 5, 0.34) !important",

    "&:hover": {
      backgroundColor: "#ffffff !important",
      color: "#e30605 !important",
      boxShadow: "0 14px 32px rgba(0, 0, 0, 0.38) !important",
    },

    "&.Mui-disabled": {
      backgroundColor: "#d7d7d7 !important",
      color: "#8a8a8a !important",
      border: "1px solid #d7d7d7 !important",
      boxShadow: "none !important",
      cursor: "not-allowed !important",
    },

    "@media (max-width: 420px)": {
      height: "50px",
      fontSize: "0.84rem !important",
    },
  },

  switchAccountText: {
    marginTop: "18px !important",
    textAlign: "center",
    color: "#6c757d",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.95rem !important",

    "@media (max-width: 420px)": {
      fontSize: "0.86rem !important",
    },
  },

  createAccount: {
    marginLeft: "8px",
    color: "#e30605",
    textDecoration: "none !important",
    fontWeight: "900",

    "&:hover": {
      color: "#b80504",
      textDecoration: "underline !important",
    },
  },

  gridcheckbox: {},
  root: {},
}));

export default useStyles;