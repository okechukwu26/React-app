import React, { Fragment } from "react";
import noImg from "../images/no-img.png";
import PropTypes from "prop-types";

//Mui
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  CardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: "#00bcd4",
    marginBottom: 7,
  },
  date: {
    height: 14,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 10,
    width: 100,
  },
  fullLine: {
    height: 15,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    marginBottom: 10,
  },
});

const MindSkeleton = (props) => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={noImg} />
      <CardContent className={classes.CardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};
MindSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MindSkeleton);
