import React from "react";
import { makeStyles, withStyles } from "@mui/styles";
import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "min(900px, calc(100% - 1rem))",
    margin: "7.4rem auto 1.2rem",
    padding: "0.85rem 1rem",
    background: "#ffffff",
    border: "1px solid rgba(227, 6, 5, 0.14)",
    borderRadius: 18,
    boxShadow: "0 12px 28px rgba(227, 6, 5, 0.07)",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      marginTop: "6.8rem",
      padding: "0.7rem 0.4rem",
      borderRadius: 14,
    },
  },
}));

const ColorlibConnector = withStyles(() => ({
  alternativeLabel: {
    top: 18,
  },
  active: {
    "& $line": {
      backgroundColor: "#e30605",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#121212",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "rgba(18,18,18,0.12)",
    borderRadius: 999,
  },
}))(StepConnector);

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#121212",
    zIndex: 1,
    color: "#ffffff",
    width: 38,
    height: 38,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "3px solid #ffffff",
    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      width: 30,
      height: 30,
      fontSize: 12,
    },
  },
  active: {
    backgroundColor: "#e30605",
    boxShadow: "0 7px 18px rgba(227, 6, 5, 0.26)",
  },
  completed: {
    backgroundColor: "#121212",
  },
}));

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  return (
    <div
      className={`${classes.root} ${active ? classes.active : ""} ${
        completed ? classes.completed : ""
      }`}
    >
      {icon}
    </div>
  );
}

function CheckoutSteps({ activeStep }) {
  const classes = useStyles();
  const history = useHistory();

  const steps = [
    { label: "Shipping", route: "/shipping" },
    { label: "Confirm", route: "/order/confirm" },
    { label: "Payment", route: "/process/payment" },
  ];

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((item, index) => (
          <Step key={item.label} onClick={() => index <= activeStep && history.push(item.route)}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default CheckoutSteps;
