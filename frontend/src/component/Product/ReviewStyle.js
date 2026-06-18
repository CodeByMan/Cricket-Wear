import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  reviewRoot: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    border: "1px solid rgba(227, 6, 5, 0.14)",
    boxShadow: "0 14px 34px rgba(227, 6, 5, 0.08)",
    overflow: "hidden",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "0.75rem",
      borderRadius: 18,
    },
  },
  reviewHeader: {
    margin: "0 auto 1rem !important",
    textAlign: "center",
    fontWeight: "900 !important",
    fontSize: "clamp(1.35rem, 4vw, 2rem) !important",
    color: "#121212 !important",
    textTransform: "uppercase",
  },
  subHeadings: {
    fontSize: "0.95rem !important",
    color: "#121212 !important",
    fontWeight: "900 !important",
  },
  bodyText: {
    fontSize: "0.9rem !important",
    color: "#555555 !important",
    fontWeight: "600 !important",
    lineHeight: "1.6 !important",
  },
  radioText: {
    fontSize: "0.9rem !important",
    color: "#121212 !important",
    fontWeight: "700 !important",
  },
  radioButton: {
    color: "#e30605 !important",
  },
  submitBtn: {
    borderRadius: "999px !important",
    cursor: "pointer",
    fontSize: "0.85rem !important",
    fontWeight: "900 !important",
    minHeight: "46px !important",
    padding: "0 1.4rem !important",
    width: "fit-content",
    background: "#e30605 !important",
    color: "#ffffff !important",
    border: "2px solid #e30605 !important",
    boxShadow: "none !important",
    textTransform: "uppercase !important",
    letterSpacing: "0.5px !important",
    transition: "all 0.25s ease !important",
    "&:hover": {
      backgroundColor: "#ffffff !important",
      color: "#e30605 !important",
    },
  },
  ratingContainer: {
    margin: "0.75rem 0",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  star: {
    color: "#e30605 !important",
    fontSize: "1.45rem !important",
  },
  ratingNumber: {
    display: "inline-block",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1.5),
    fontWeight: "900",
    fontSize: "0.95rem",
    color: "#121212",
  },
  selectContainer: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: "0.5rem",
    margin: "0 0 1rem",
    [theme.breakpoints.down("sm")]: {
      alignItems: "stretch",
      textAlign: "left",
      paddingRight: 0,
    },
  },
  sortBy: {
    color: "#121212 !important",
    fontWeight: "900 !important",
    marginBottom: "0.35rem !important",
  },
  select: {
    minWidth: "170px",
    "& .MuiSelect-select": {
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: "12px",
      paddingRight: "35px",
      borderRadius: "14px",
      fontSize: "0.9rem",
      fontWeight: 700,
      border: "1px solid rgba(227, 6, 5, 0.2)",
      background: "#ffffff",
      color: "#121212",
      "&:focus": {
        borderRadius: "14px",
        borderColor: "#e30605",
      },
    },
    "& .MuiSelect-icon": {
      right: "12px",
      color: "#e30605",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  menuItem: {
    backgroundColor: "#ffffff",
    color: "#121212",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "rgba(227, 6, 5, 0.08)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(227, 6, 5, 0.12)",
      color: "#e30605",
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px !important",
      fontSize: "0.95rem",
      fontWeight: 600,
      color: "#121212",
      "& fieldset": {
        borderColor: "rgba(227, 6, 5, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "#e30605",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e30605",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#e30605",
    },
  },
  dialog: {
    width: "min(760px, calc(100vw - 1rem))",
    maxWidth: "100%",
    maxHeight: "calc(100vh - 2rem)",
    margin: 0,
    padding: "1.2rem",
    overflow: "hidden",
    borderRadius: 22,
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "0.75rem",
      borderRadius: 18,
    },
  },
  dialogContent: {
    maxHeight: "70vh",
    overflowY: "auto",
    paddingRight: "0.35rem",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#e30605",
      borderRadius: "999px",
    },
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    overflowX: "auto",
    margin: "1rem 0 0",
    backgroundColor: "#ffffff",
    width: "100%",
    paddingBottom: "0.4rem",
    "&::-webkit-scrollbar": {
      height: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#e30605",
      borderRadius: "999px",
    },
  },
}));
