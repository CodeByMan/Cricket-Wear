import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
    maxWidth: 520,
    minHeight: "auto",
    padding: "1.15rem",
    margin: "1rem auto",
    boxShadow: "0 12px 30px rgba(227, 6, 5, 0.08)",
    borderRadius: 20,
    border: "1px solid rgba(227, 6, 5, 0.12)",
    background: "#ffffff",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
      borderRadius: 16,
    },
  },
  cardheader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  userWrap: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    minWidth: 0,
  },
  avatar: {
    width: "46px !important",
    height: "46px !important",
    border: "2px solid rgba(227, 6, 5, 0.22)",
    flexShrink: 0,
  },
  title: {
    margin: "0.8rem 0 0.55rem !important",
    fontWeight: "900 !important",
    color: "#121212 !important",
    fontSize: "1.05rem !important",
    lineHeight: "1.35 !important",
    wordBreak: "break-word",
  },
  commentTxt: {
    marginBottom: "1rem !important",
    fontSize: "0.95rem !important",
    color: "#555555 !important",
    lineHeight: "1.7 !important",
    wordBreak: "break-word",
  },
  recommend: {
    fontWeight: "800 !important",
    color: "#121212 !important",
    fontSize: "0.92rem !important",
  },
  helpful: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "0.35rem",
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid rgba(227, 6, 5, 0.1)",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
    },
  },
  thumbIcon: {
    cursor: "pointer",
    fontSize: "1.35rem !important",
    color: "#121212",
    transition: "color 0.2s ease, transform 0.2s ease",
    "&:hover": {
      color: "#e30605",
      transform: "translateY(-2px)",
    },
  },
  subHeadings: {
    fontSize: "0.95rem !important",
    color: "#121212 !important",
    fontWeight: "900 !important",
    lineHeight: "1.3 !important",
    wordBreak: "break-word",
  },
  bodyText: {
    fontSize: "0.82rem !important",
    color: "#777777 !important",
    fontWeight: "700 !important",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      whiteSpace: "normal",
    },
  },
  star: {
    color: "#e30605 !important",
    fontSize: "1.45rem !important",
    marginTop: "2px",
  },
  clicked: {
    color: "#e30605 !important",
  },
  yes: {
    color: "#0a8f28",
  },
  no: {
    color: "#e30605",
  },
}));

const MyCard = ({ review }) => {
  const classes = useStyles();

  const [helpful, setHelpful] = useState(10);
  const [unhelpful, setUnHelpful] = useState(5);
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [unhelpfulClicked, setUnhelpfulClicked] = useState(false);

  const helpfulHandler = (type) => {
    if (type === "up" && !helpfulClicked) {
      setHelpful(helpful + 1);
      setHelpfulClicked(true);

      if (unhelpfulClicked) {
        setUnHelpful(unhelpful - 1);
        setUnhelpfulClicked(false);
      }
    } else if (type === "down" && !unhelpfulClicked) {
      setUnHelpful(unhelpful + 1);
      setUnhelpfulClicked(true);

      if (helpfulClicked) {
        setHelpful(helpful - 1);
        setHelpfulClicked(false);
      }
    }
  };

  function formateDate(dateString) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return (
    <div className={classes.cardRoot}>
      <div className={classes.cardheader}>
        <div className={classes.userWrap}>
          <Avatar
            alt="User Avatar"
            src={review.avatar || "https://i.imgur.com/JSW6mEk.png"}
            className={classes.avatar}
          />
          <Typography variant="body1" className={classes.subHeadings}>
            {review.name}
          </Typography>
        </div>

        <Typography variant="body1" className={classes.bodyText}>
          {formateDate(review.createdAt)}
        </Typography>
      </div>

      <Rating value={4} precision={0.5} size="medium" readOnly className={classes.star} />

      <Typography variant="h6" className={classes.title}>
        {review.title}
      </Typography>

      <Typography variant="body1" className={classes.commentTxt}>
        {review.comment}
      </Typography>

      <Typography variant="body1" className={classes.recommend}>
        Would you recommend this product?{" "}
        <span className={review.recommend ? classes.yes : classes.no}>
          {review.recommend ? "Yes!" : "No!"}
        </span>
      </Typography>

      <div className={classes.helpful}>
        <Typography variant="body2" className={classes.subHeadings}>
          Helpful?
        </Typography>
        <ThumbUpIcon
          className={`${classes.thumbIcon} ${helpfulClicked ? classes.clicked : ""}`}
          onClick={() => helpfulHandler("up")}
        />
        <Typography>{helpful}</Typography>
        <ThumbDownIcon
          className={`${classes.thumbIcon} ${unhelpfulClicked ? classes.clicked : ""}`}
          onClick={() => helpfulHandler("down")}
        />
        <Typography>{unhelpful}</Typography>
      </div>
    </div>
  );
};

export default MyCard;
