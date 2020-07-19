import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

//Mui
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
//Icon
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalenderToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const StaticProfile = (props) => {
  const {
    classes,
    profile: { createdAt, imageUrl, handle, bio, website, location },
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <React.Fragment>
              <LocationOn color="primary" /> <span>{location} </span>
              <hr />
            </React.Fragment>
          )}
          {website && (
            <React.Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </React.Fragment>
          )}
          <CalenderToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYY")}</span>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
