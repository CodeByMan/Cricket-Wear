import React from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MetaData from "../component/layouts/MataData/MataData";
import TermsImage from "../Image/about/tc.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  about_us: {
    paddingTop: "8rem",
    paddingBottom: "4.5rem",
    background:
      "linear-gradient(135deg, #ffffff 0%, #f8f9fa 45%, #ffffff 100%)",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    overflowX: "hidden",

    "@media (max-width: 899px)": {
      paddingTop: "7.2rem",
      paddingBottom: "3.6rem",
    },

    "@media (max-width: 560px)": {
      paddingTop: "6.7rem",
      paddingBottom: "3rem",
    },
  },

  container_12: {
    padding: "2rem !important",
    textAlign: "center",
    backgroundColor: "#ffffff !important",
    maxWidth: "1120px !important",
    width: "calc(100% - 32px)",
    boxSizing: "border-box",
    borderRadius: "22px",
    border: "1px solid rgba(18, 18, 18, 0.07)",
    boxShadow: "0 12px 34px rgba(0, 0, 0, 0.055)",
    marginBottom: "1.7rem",
    position: "relative",
    overflow: "hidden",

    "&:first-of-type::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "5px",
      background: "linear-gradient(90deg, #e30605 0%, #b80504 100%)",
    },

    "@media (max-width: 768px)": {
      padding: "1.5rem !important",
      width: "calc(100% - 24px)",
      borderRadius: "18px",
      marginBottom: "1.3rem",
    },

    "@media (max-width: 480px)": {
      padding: "1rem !important",
      width: "calc(100% - 18px)",
      borderRadius: "16px",
    },
  },

  image_about: {
    width: "100%",
    height: "auto",
    maxHeight: "420px",
    objectFit: "cover",
    objectPosition: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: "18px",
    border: "4px solid #ffffff",
    outline: "1px solid rgba(18, 18, 18, 0.08)",
    boxShadow: "0 16px 38px rgba(0, 0, 0, 0.14)",

    "@media (max-width: 768px)": {
      marginTop: "0.5rem",
      maxHeight: "350px",
      borderRadius: "14px",
    },

    "@media (max-width: 480px)": {
      maxHeight: "270px",
      marginBottom: "1.4rem",
      borderRadius: "12px",
    },
  },

  title_about: {
    color: "#121212",
    fontSize: "2.6rem !important",
    padding: "1rem 1rem 0.8rem",
    fontFamily: "'Archivo', sans-serif !important",
    fontWeight: "900 !important",
    lineHeight: "1.08 !important",
    textAlign: "left",
    letterSpacing: "-0.8px !important",

    "&::after": {
      content: '""',
      display: "block",
      width: "66px",
      height: "4px",
      backgroundColor: "#e30605",
      borderRadius: "99px",
      marginTop: "14px",
    },

    "@media (max-width: 768px)": {
      textAlign: "center",
      fontSize: "2.15rem !important",
      paddingTop: "0.5rem",

      "&::after": {
        marginLeft: "auto",
        marginRight: "auto",
      },
    },

    "@media (max-width: 480px)": {
      fontSize: "1.85rem !important",
      paddingLeft: "0",
      paddingRight: "0",
    },
  },

  heading12_about: {
    fontSize: "1.95rem !important",
    padding: "0.8rem 1rem 0.6rem",
    fontWeight: "900 !important",
    fontFamily: "'Archivo', sans-serif !important",
    color: "#121212",
    textAlign: "center",
    lineHeight: "1.2 !important",
    letterSpacing: "-0.4px !important",

    "&::after": {
      content: '""',
      display: "block",
      width: "58px",
      height: "4px",
      backgroundColor: "#e30605",
      borderRadius: "99px",
      margin: "14px auto 0",
    },

    "@media (max-width: 480px)": {
      fontSize: "1.58rem !important",
      paddingLeft: "0",
      paddingRight: "0",
    },
  },

  introText_about: {
    maxWidth: "800px",
    lineHeight: "1.78 !important",
    margin: "0.9rem 0 !important",
    color: "#333333",
    fontSize: "1rem !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontWeight: "400 !important",
    textAlign: "justify",
    padding: "0.45rem 1rem",

    "&:first-of-type": {
      marginTop: "0.6rem !important",
    },

    "@media (max-width: 768px)": {
      maxWidth: "100%",
      textAlign: "center",
      padding: "0.45rem 0",
      fontSize: "0.95rem !important",
      lineHeight: "1.68 !important",
    },

    "@media (max-width: 480px)": {
      fontSize: "0.9rem !important",
    },
  },

  infoText_about: {
    lineHeight: "1.78 !important",
    margin: "0.9rem auto !important",
    color: "#333333",
    fontSize: "1rem !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontWeight: "400 !important",
    textAlign: "justify",
    padding: "0.65rem 1rem",
    maxWidth: "940px",
    borderLeft: "3px solid rgba(227, 6, 5, 0.16)",

    "@media (max-width: 768px)": {
      textAlign: "center",
      padding: "0.5rem 0",
      borderLeft: "none",
      fontSize: "0.95rem !important",
      lineHeight: "1.68 !important",
    },

    "@media (max-width: 480px)": {
      fontSize: "0.9rem !important",
    },
  },

  buttonContainer_about: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem 0 0.4rem",
    width: "100%",
    marginTop: "1.3rem",
    flexWrap: "wrap",

    "@media (max-width: 480px)": {
      gap: "0.8rem",
      paddingTop: "0.8rem",
    },
  },

  button1_about: {
    backgroundColor: "#050505 !important",
    color: "#e30605 !important",
    border: "2px solid #e30605 !important",
    width: "fit-content !important",
    minWidth: "160px !important",
    height: "50px !important",
    padding: "0 2rem !important",
    borderRadius: "999px !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.88rem !important",
    fontWeight: "900 !important",
    textTransform: "uppercase !important",
    letterSpacing: "0.8px !important",
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.18) !important",
    transition:
      "background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease !important",

    "&:hover": {
      backgroundColor: "#e30605 !important",
      color: "#050505 !important",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 28px rgba(227, 6, 5, 0.28) !important",
    },

    "@media (max-width: 480px)": {
      width: "100% !important",
      minWidth: "100% !important",
    },
  },

  button2_about: {
    backgroundColor: "#e30605 !important",
    color: "#ffffff !important",
    border: "2px solid #e30605 !important",
    width: "fit-content !important",
    minWidth: "160px !important",
    height: "50px !important",
    padding: "0 2rem !important",
    borderRadius: "999px !important",
    fontFamily: "'Roboto', sans-serif !important",
    fontSize: "0.88rem !important",
    fontWeight: "900 !important",
    textTransform: "uppercase !important",
    letterSpacing: "0.8px !important",
    boxShadow: "0 10px 24px rgba(227, 6, 5, 0.28) !important",
    transition:
      "background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease !important",

    "&:hover": {
      backgroundColor: "#050505 !important",
      color: "#e30605 !important",
      borderColor: "#050505 !important",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.25) !important",
    },

    "@media (max-width: 480px)": {
      width: "100% !important",
      minWidth: "100% !important",
    },
  },
}));

const About_UsPage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.about_us}>
        <MetaData title={"About Us"} />

        <Container className={classes.container_12}>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <img
                src={TermsImage}
                alt="Cricket Wear"
                className={classes.image_about}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="h2"
                component="h1"
                className={classes.title_about}
              >
                About Us
              </Typography>

              <Typography variant="body1" className={classes.introText_about}>
                Cricket Wear Store is an online cricket sportswear and cricket
                gear e-commerce platform built for players, academies, clubs,
                and cricket fans. We are proud to offer cricket bats, kits,
                protective gear, accessories, and sportswear under the CW brand,
                also known as Cricket Wear.
              </Typography>

              <Typography variant="body1" className={classes.introText_about}>
                Cricket Wear is maintained and presented by Muhammad Ali Nawaz
                as a MERN stack portfolio project. The platform is designed to
                demonstrate a complete e-commerce workflow with product
                browsing, cart, checkout, user accounts, reviews, and an admin
                dashboard.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Container className={classes.container_12}>
          <Typography
            variant="h3"
            component="h1"
            className={classes.heading12_about}
          >
            Who We Are
          </Typography>

          <Typography variant="body1" className={classes.infoText_about}>
            Cricket Wear is dedicated to providing high-quality cricket
            equipment and accessories to cricket enthusiasts worldwide. Our
            mission is to empower cricketers with the best tools to enhance
            their performance on the field. With a focus on innovation,
            craftsmanship, and customer satisfaction, we have become a trusted
            brand in the cricket community.
          </Typography>

          <Typography variant="body1" className={classes.infoText_about}>
            Since our inception in 2019, we have built a strong customer base
            and expanded our product range to cater to the diverse needs of
            players at every level. We take pride in offering genuine cricket
            products that are carefully curated and tested for quality and
            performance. Our team of experts works closely with manufacturers to
            ensure that our customers receive top-notch products.
          </Typography>

          <Typography variant="body1" className={classes.infoText_about}>
            At Cricket Wear, we believe in fostering long-term relationships
            with our customers. We provide excellent customer service and strive
            to exceed expectations at every step. We are committed to delivering
            a seamless online shopping experience and ensuring customer
            satisfaction. Join us on this exciting journey as we continue to grow
            and expand our reach in the world of cricket.
          </Typography>
        </Container>

        <Container className={classes.container_12}>
          <Typography
            variant="h3"
            component="h1"
            className={classes.heading12_about}
          >
            Our Mission
          </Typography>

          <Typography variant="body1" className={classes.infoText_about}>
            Cricket Wear is driven by the mission to provide high-quality
            cricket equipment and accessories at affordable prices. We aim to
            make cricket accessible to players worldwide and support their
            passion for the sport. Our mission is to offer a wide range of
            cricket equipment, including bats, balls, protective gear, and
            accessories, that meet the highest standards of quality and
            performance.
          </Typography>

          <Typography variant="body1" className={classes.infoText_about}>
            We are committed to continuously innovating and improving our
            product range to meet the evolving needs of cricketers. Our team of
            experts works closely with manufacturers and conducts rigorous
            quality testing to ensure that every product we offer delivers
            exceptional performance on the field. We believe that every player
            deserves the best tools to enhance their skills and achieve their
            cricketing goals.
          </Typography>

          <div className={classes.buttonContainer_about}>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <Button variant="contained" className={classes.button1_about}>
                Our Products
              </Button>
            </Link>

            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Button variant="contained" className={classes.button2_about}>
                Contact Us
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default About_UsPage;