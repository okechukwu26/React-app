import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../Utill/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import Comments from "./Comments";
import CommentForm from "./CommentForm";
//Mui Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";
import { getMind, clearError } from "../../Redux/actions/dataAction";

const styles = (theme) => ({
  ...theme.spreadThis,

  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "70%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  "@media(max-width: 769px)": {
    spin: {
      fontSize: 10,
    },
    profileImage: {
      height: 50,
      padding: 0,
    },
    types: {
      fontSize: 15,
    },
    type: {
      fontSize: 10,
    },
    grid: {
      padding: 3,
    },
  },
});

class MindDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { mindId, userHandle } = this.props;
    const newPath = `/user/${userHandle}/mind/${mindId}`;
    if (oldPath === newPath) oldPath = `/user/${userHandle}`;
    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getMind(this.props.mindId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearError();
  };
  render() {
    const {
      classes,
      mind: {
        userHandle,
        body,
        createdAt,
        userImage,
        comments,
        likeCount,
        commentCount,
        mindId,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress className={classes.spin} size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={3}>
        <Grid item sm={5}>
          <img src={userImage} alt="profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7} className={classes.grid}>
          <Typography
            component={Link}
            className={classes.types}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography
            color="textSecondary"
            variant="body2"
            className={classes.type}
          >
            {dayjs(createdAt).format(" h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body1" className={classes.type}>
            {body}
          </Typography>

          <span className={classes.type}>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span className={classes.type}>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeperator} />
        <CommentForm mindId={mindId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand mind"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

MindDialog.propTypes = {
  getMind: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  mindId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  mind: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  mind: state.data.mind,
  UI: state.UI,
});

const mapActionsToProps = {
  getMind,
  clearError,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(MindDialog));
