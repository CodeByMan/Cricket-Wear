import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Carousel from "react-material-ui-carousel";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { colors, typography } from "../theme";

import HeroImageOne from "../../Image/Cricket-Wear/img2.png";
import HeroImageTwo from "../../Image/Cricket-Wear/03.jpg";
import HeroImageThree from "../../Image/Cricket-Wear/01.jpg";
import HeroImageFour from "../../Image/Cricket-Wear/04.jpg";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#000",
  },

  carouselRoot: {
    width: "100%",
    height: "calc(100vh - 112px)",
    maxHeight: "760px",
    minHeight: "520px",
    overflow: "hidden",

    "@supports (height: 100dvh)": {
      height: "calc(100dvh - 112px)",
    },

    [theme.breakpoints.down("md")]: {
      height: "calc(100vh - 104px)",
      minHeight: "480px",
      maxHeight: "680px",

      "@supports (height: 100dvh)": {
        height: "calc(100dvh - 104px)",
      },
    },

    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 98px)",
      minHeight: "430px",
      maxHeight: "620px",

      "@supports (height: 100dvh)": {
        height: "calc(100dvh - 98px)",
      },
    },

    "@media (max-width: 480px)": {
      height: "calc(100vh - 98px)",
      minHeight: "400px",
      maxHeight: "560px",

      "@supports (height: 100dvh)": {
        height: "calc(100dvh - 98px)",
      },
    },

    "@media (max-width: 420px)": {
      height: "calc(100vh - 93px)",
      minHeight: "380px",
      maxHeight: "520px",

      "@supports (height: 100dvh)": {
        height: "calc(100dvh - 93px)",
      },
    },

    "@media (max-width: 340px)": {
      minHeight: "360px",
      maxHeight: "500px",
    },
  },

  slide: {
    width: "100%",
    height: "calc(100vh - 112px)",
    maxHeight: "760px",
    minHeight: "520px",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#000",

    "@supports (height: 100dvh)": {
      height: "calc(100dvh - 112px)",
    },

    [theme.breakpoints.down("md")]: {
      height: "calc(100vh - 104px)",
      minHeight: "480px",
      maxHeight: "680px",

      "@supports (height: 100dvh)": {
        height: "calc(100dvh - 104px)",
      },
    },

    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 98px)",
      minHeight: "430px",
      maxHeight: "620px",

      "@supports (height: 100dvh)": {
        height: "calc(100dvh - 98px)",
      },
    },

    "@media (max-width: 480px)": {
      height: "calc(100vh - 98px)",
      minHeight: "400px",
      maxHeight: "560px",

      "@supports (height: 100dvh)": {
        height: "calc(100dvh - 98px)",
      },
    },

    "@media (max-width: 420px)": {
      height: "calc(100vh - 93px)",
      minHeight: "380px",
      maxHeight: "520px",

      "@supports (height: 100dvh)": {
        height: "calc(100dvh - 93px)",
      },
    },

    "@media (max-width: 340px)": {
      minHeight: "360px",
      maxHeight: "500px",
    },
  },

  slideImage: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center center",
  },

  slideOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, rgba(0, 0, 0, 0.74) 0%, rgba(0, 0, 0, 0.48) 42%, rgba(0, 0, 0, 0.12) 100%)",
    zIndex: 1,

    [theme.breakpoints.down("sm")]: {
      background:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.62) 52%, rgba(0, 0, 0, 0.82) 100%)",
    },
  },

  slideContent: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "clamp(34px, 7vw, 112px)",
    zIndex: 2,
    width: "min(720px, 52vw)",
    maxWidth: "720px",
    color: colors.neutral.white,
    textAlign: "left",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "8px",
    paddingBottom: "44px",

    [theme.breakpoints.down("md")]: {
      left: "clamp(28px, 6vw, 70px)",
      width: "min(640px, 60vw)",
      paddingBottom: "40px",
    },

    [theme.breakpoints.down("sm")]: {
      left: 0,
      right: 0,
      width: "100%",
      maxWidth: "100%",
      paddingLeft: "24px",
      paddingRight: "24px",
      paddingTop: "0",
      paddingBottom: "46px",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },

    "@media (max-width: 480px)": {
      paddingLeft: "18px",
      paddingRight: "18px",
      paddingBottom: "42px",
    },

    "@media (max-width: 380px)": {
      paddingLeft: "14px",
      paddingRight: "14px",
      paddingBottom: "38px",
    },
  },

  tagline: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.weight.semiBold,
    color: colors.primary.main,
    textTransform: "uppercase",
    letterSpacing: "3px",
    margin: "0 0 14px",
    lineHeight: 1.2,

    [theme.breakpoints.down("md")]: {
      fontSize: typography.size.xs,
      letterSpacing: "2.3px",
      marginBottom: "12px",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.72rem",
      letterSpacing: "2px",
      marginBottom: "10px",
    },

    "@media (max-width: 380px)": {
      fontSize: "0.66rem",
      letterSpacing: "1.4px",
      marginBottom: "8px",
    },
  },

  quote: {
    fontSize: "clamp(2.5rem, 4.4vw, 4.4rem)",
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.weight.extraBold,
    lineHeight: 1.03,
    margin: "0 0 16px",
    maxWidth: "720px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",

    [theme.breakpoints.down("md")]: {
      fontSize: "clamp(2.1rem, 4.5vw, 3.4rem)",
      lineHeight: 1.07,
      maxWidth: "620px",
      marginBottom: "14px",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "clamp(1.8rem, 7vw, 2.7rem)",
      lineHeight: 1.1,
      maxWidth: "620px",
      marginBottom: "12px",
    },

    "@media (max-width: 480px)": {
      fontSize: "clamp(1.55rem, 7.5vw, 2.25rem)",
      lineHeight: 1.12,
      maxWidth: "390px",
    },

    "@media (max-width: 380px)": {
      fontSize: "clamp(1.35rem, 7.6vw, 1.95rem)",
      maxWidth: "330px",
      marginBottom: "10px",
    },
  },

  saleText: {
    fontSize: typography.size.lg,
    fontFamily: typography.fontFamily.secondary,
    fontWeight: typography.weight.regular,
    opacity: 0.94,
    margin: "0 0 30px",
    lineHeight: 1.55,
    maxWidth: "590px",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",

    [theme.breakpoints.down("md")]: {
      fontSize: typography.size.base,
      maxWidth: "520px",
      marginBottom: "26px",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
      lineHeight: 1.48,
      maxWidth: "520px",
      marginBottom: "22px",
    },

    "@media (max-width: 480px)": {
      fontSize: "0.86rem",
      lineHeight: 1.45,
      maxWidth: "360px",
      marginBottom: "20px",
    },

    "@media (max-width: 380px)": {
      fontSize: "0.8rem",
      lineHeight: 1.4,
      maxWidth: "310px",
      marginBottom: "18px",
    },
  },

productButton: {
  backgroundImage: "none !important",
  color: `${colors.primary.main} !important`,
  border: `2px solid ${colors.primary.main} !important`,
  borderRadius: "999px !important",

  padding: theme.spacing(1.7, 7),
  minWidth: "210px",
  height: "56px",

  fontSize: typography.size.base,
  fontWeight: typography.weight.extraBold,
  fontFamily: typography.fontFamily.primary,
  textTransform: "uppercase",
  letterSpacing: "1.3px",
  lineHeight: "1",

  boxShadow: "0 10px 26px rgba(0, 0, 0, 0.48)",
  transition:
    "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",

  "&:hover": {
    backgroundColor: `${colors.primary.main} !important`,
    backgroundImage: "none !important",
    color: "#050505 !important",
    borderColor: `${colors.primary.main} !important`,
    transform: "translateY(-2px)",
    boxShadow: "0 14px 32px rgba(227, 6, 5, 0.42)",
  },

  "&:focus": {
    backgroundColor: "#050505 !important",
    color: `${colors.primary.main} !important`,
    borderColor: `${colors.primary.main} !important`,
  },

  "&:active": {
    backgroundColor: `${colors.primary.main} !important`,
    color: "#050505 !important",
    transform: "translateY(0)",
    boxShadow: "0 7px 18px rgba(227, 6, 5, 0.3)",
  },

  "& .MuiButton-label": {
    color: "inherit !important",
  },

  [theme.breakpoints.down("sm")]: {
    minWidth: "180px",
    height: "50px",
    padding: theme.spacing(1.35, 5.4),
    fontSize: typography.size.sm,
    letterSpacing: "1.1px",
  },

  "@media (max-width: 380px)": {
    minWidth: "158px",
    height: "46px",
    padding: theme.spacing(1.15, 4.4),
    fontSize: "0.76rem",
    letterSpacing: "0.9px",
  },
},

  navButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    minWidth: "50px",
    transition: "all 0.3s ease",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "scale(1.1)",
    },

    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "40px",
      minWidth: "40px",
    },

    "@media (max-width: 480px)": {
      display: "none",
    },
  },

  indicators: {
    position: "absolute",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    zIndex: 3,

    [theme.breakpoints.down("sm")]: {
      bottom: "18px",
      gap: "10px",
    },

    "@media (max-width: 480px)": {
      bottom: "14px",
      gap: "9px",
    },
  },

  indicator: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid transparent",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    },

    "@media (max-width: 480px)": {
      width: "9px",
      height: "9px",
    },
  },

  indicatorActive: {
    backgroundColor: colors.primary.main,
    transform: "scale(1.2)",
    border: `2px solid ${colors.neutral.white}`,
  },
}));

const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

const slides = [
  {
    image: HeroImageOne,
    tagline: "Premium Cricket Gear",
    quote: "Unleash Your Passion for Cricket",
    saleText:
      "Get in the game with up to 50% off on a wide range of premium cricket equipment.",
    productText: "Shop Now",
  },
  {
    image: HeroImageTwo,
    tagline: "Limited Time Offer",
    quote: "Experience Victory with Our Equipment",
    saleText:
      "Upgrade your game with professional-grade cricket gear built for performance.",
    productText: "Buy Now",
  },
  {
    image: HeroImageThree,
    tagline: "New Arrivals",
    quote: "Dominate the Field Like Never Before",
    saleText:
      "Discover the latest cricket gear and stay ahead of the competition.",
    productText: "Explore",
  },
  {
    image: HeroImageFour,
    tagline: "Pro Collection",
    quote: "Elevate Your Performance",
    saleText:
      "Enhance your skills with modern cricket equipment, sportswear, and accessories.",
    productText: "Upgrade Now",
  },
];

export default function HeroSlider() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className={classes.heroContainer}>
      <Carousel
        autoPlay
        navButtonsAlwaysVisible
        indicators={false}
        animation="fade"
        interval={6000}
        timeout={800}
        cycleNavigation
        fullHeightHover={false}
        className={classes.carouselRoot}
        index={activeStep}
        onChange={(now) => setActiveStep(now)}
        navButtonsProps={{
          style: {
            backgroundColor: "transparent",
            padding: 0,
            margin: "0 clamp(8px, 2vw, 20px)",
          },
        }}
        navButtonsWrapperProps={{
          style: {
            top: "50%",
            transform: "translateY(-50%)",
          },
        }}
        prevButton={
          <Button className={classes.navButton} onClick={handleBack}>
            <ArrowBackIosIcon style={{ color: "#fff", marginLeft: "8px" }} />
          </Button>
        }
        nextButton={
          <Button className={classes.navButton} onClick={handleNext}>
            <ArrowForwardIosIcon style={{ color: "#fff" }} />
          </Button>
        }
      >
        {slides.map((slide, index) => (
          <div key={index} className={classes.slide}>
            <img
              src={slide.image}
              alt={`Cricket Wear - ${slide.tagline}`}
              className={classes.slideImage}
            />

            <div className={classes.slideOverlay} />

            <AnimatePresence mode="wait">
              {activeStep === index && (
                <motion.div
                  key={`content-${index}-${key}`}
                  className={classes.slideContent}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.p className={classes.tagline} variants={itemVariants}>
                    {slide.tagline}
                  </motion.p>

                  <motion.h1 className={classes.quote} variants={itemVariants}>
                    {slide.quote}
                  </motion.h1>

                  <motion.p className={classes.saleText} variants={itemVariants}>
                    {slide.saleText}
                  </motion.p>

                  <motion.div variants={buttonVariants}>
                    <Link to="/products" style={{ textDecoration: "none" }}>
                      <motion.div
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                      >
                        <Button
                            disableElevation
                            disableRipple
                            className={classes.productButton}
                            sx={{
                              color: `${colors.primary.main} !important`,
                              border: `2px solid ${colors.primary.main} !important`,
                              borderRadius: "999px !important",

                              minWidth: {
                                xs: "180px",
                                sm: "215px",
                                md: "240px",
                              },
                              height: {
                                xs: "50px",
                                sm: "56px",
                                md: "60px",
                              },
                              padding: {
                                xs: "0 42px !important",
                                sm: "0 58px !important",
                                md: "0 70px !important",
                              },

                              fontSize: {
                                xs: "0.82rem",
                                sm: "0.92rem",
                                md: "1rem",
                              },
                              fontWeight: "800 !important",
                              fontFamily: `${typography.fontFamily.primary} !important`,
                              textTransform: "uppercase !important",
                              letterSpacing: "1.3px",
                              lineHeight: "1 !important",

                              boxShadow: "0 10px 26px rgba(0, 0, 0, 0.48)",
                              transition:
                                "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",

                              "&:hover": {
                                backgroundColor: `${colors.primary.main} !important`,
                                color: "#050505 !important",
                                borderColor: `${colors.primary.main} !important`,
                                transform: "translateY(-2px)",
                                boxShadow: "0 14px 32px rgba(227, 6, 5, 0.42)",
                              },

                              "&:active": {
                                backgroundColor: `${colors.primary.main} !important`,
                                color: "#050505 !important",
                                transform: "translateY(0)",
                                boxShadow: "0 7px 18px rgba(227, 6, 5, 0.3)",
                              },
                            }}
                          >
                            {slide.productText}
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Carousel>

      <div className={classes.indicators}>
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`${classes.indicator} ${
              activeStep === index ? classes.indicatorActive : ""
            }`}
            onClick={() => setActiveStep(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${index + 1}`}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setActiveStep(index);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}