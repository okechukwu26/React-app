import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../Utill/MyButton";
//redux stuff
import { connect } from "react-redux";
import { editUserDetails } from "../../Redux/actions/userAction";
//Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//icon
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: "right",
  },
});

class EditDetail extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  componentDidMount() {
    const { credential } = this.props;
    this.mapUserDetailToState(credential);
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailToState(this.props.credential);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    const userDetail = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetail);
    this.handleClose();
  };
  mapUserDetailToState = (credential) => {
    this.setState({
      bio: credential.bio ? credential.bio : "",
      website: credential.website ? credential.website : "",
      location: credential.location ? credential.location : "",
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professional website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
EditDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  credential: state.user.credential,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetail)
);
