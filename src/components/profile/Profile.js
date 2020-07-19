import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetail from "./EditDetail";
import MyButton from "../../Utill/MyButton";
import ProfileSkeleton from "../../Utill/ProfileSkeleton";

//Mui stuff
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//icon
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalenderToday from "@material-ui/icons/CalendarToday";

import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../Redux/actions/userAction";
const styles = (theme) => ({
  ...theme.spreadThis,
});

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  handleEditButton = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  render() {
    const {
      classes,
      user: {
        credential: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />

              <MyButton
                tip="Edit profile image"
                onClick={this.handleEditButton}
                btnClassName="button"
              >
                <AddPhotoIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/user/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location} </span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalenderToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMMM YYYY")}</span>
            </div>
            <MyButton
              tip="logout"
              onClick={this.handleLogout}
              btnClassName="button"
            >
              <ExitToAppIcon color="primary" />
            </MyButton>
            <EditDetail />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  logoutUser,
  uploadImage,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
