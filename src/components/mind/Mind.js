import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../Utill/MyButton";
import DeleteMind from "./DeleteMind";
import MindDialog from "./MindDialog";
import LikeButton from "./LikeButton";
//Mui Stuff
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//icon
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  image: {
    minWidth: 150,
  },
  "@media(max-width: 768px)": {
    card: {
      padding: 0,
    },
    content: {
      padding: 10,
    },
  },
  "@media(max-width:599px)": {
    card: {
      padding: 0,
    },
    content: {
      padding: 5,
    },
    type: {
      fontSize: "0.8rem",
    },
    body: {
      fontSize: "0.5rem",
    },
    comment: {
      fontSize: 10,
    },

    time: {
      fontSize: "0.5rem",
    },
  },
};

class Mind extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      mind: {
        body,
        createdAt,
        userImage,
        mindId,
        likeCount,
        userHandle,
        commentCount,
      },
      user: {
        authenticated,
        credential: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteMind mindId={mindId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="profile image"
        />

        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            className={classes.type}
            component={Link}
            to={`/user/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.time}
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" className={classes.body}>
            {body}
          </Typography>
          <LikeButton mindId={mindId} />
          <span className={classes.comment}>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span className={classes.comment}>{commentCount} comments</span>
          <MindDialog
            mindId={mindId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}
Mind.propTypes = {
  user: PropTypes.object.isRequired,
  mind: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Mind));
