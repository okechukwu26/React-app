import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import WhatsappIcon from "@material-ui/icons/WhatsApp";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import EmailIcon from "@material-ui/icons/Email";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  ...theme.spreadThis,
  icon: {
    color: "green",
  },
  space: {
    lineSpacing: "1.5rem",
  },
});

const about = (props) => {
  const { classes } = props;
  return (
    <Fragment>
      <Grid container>
        <Grid item sm={6} className={classes.space}>
          <Typography color="textPrimary" variant="body2">
            SYMAPP is a new social media platform that encourages people to
            share their thoughts, emotions and feelings with a community of
            people on the platform and the community will be able to like or
            comment on it. The platform doesnt have the functionality of
            following and follower as this will defeat the whole purpose of the
            platform, anything posted will be seen by all on the platform so as
            to further reduce gaps or space between two location making the
            platform a community of people interacting and pushing their minds
            or ideas. Users can use this platform to further spread market or
            advertise their businesses because of it unique functionality of
            providing unlimited potential clients or business partner. SYMAPP is
            an app that keeps users as anonymous as possible we dont require
            personal information to signup just your email.Every mind that is
            posted will be viewed by the glogal community of SYMAPP bringing
            people from far and wide together creating an avenue for better
            interactions.
          </Typography>
          <Typography color="inherit" variant="body2">
            VOKDESIGN is a new software company thats into web development, web
            applications for both frontend and backend, it was established in
            2020. SYMAPP is the first web appllication we are deploying to the
            public more upgrades will be done on the app like making it more
            mobile friendly and adding better functionality and user interface
            design. we at VOKDESIGN thank you for being a part of our global
            community and we will appreciate any review, sponsor and partnership
            to make our company better and best suited to provide better sevices
            to the geberal public you can contact us on
          </Typography>
          <Paper className={classes.paper}>
            <Grid item sm={4}>
              <a href="https://api.whatsapp.com/send?phone=+2347068881708">
                <WhatsappIcon className={classes.icon} />
              </a>
            </Grid>
            <Grid item sm={4}>
              <a href="mailto:voksdesignapp@gmail.com">
                <EmailIcon />
              </a>
            </Grid>
            <Grid item sm={4}></Grid>
          </Paper>
        </Grid>
        <Grid item sm={6} />
      </Grid>
    </Fragment>
  );
};
about.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(about);
