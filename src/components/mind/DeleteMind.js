import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../Utill/MyButton";
import PropTypes from "prop-types";

//Mui Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

//icon
import DeleteOutline from "@material-ui/icons/DeleteOutline";
//redux
import { connect } from "react-redux";
import { deleteMind } from "../../Redux/actions/dataAction";

const styles = (theme) => ({
  ...theme.spreadThis,
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
});

class DeleteMind extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteMind = () => {
    this.props.deleteMind(this.props.mindId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="delete Mind"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this Mind ?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteMind} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeleteMind.propTypes = {
  deleteMind: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  mindId: PropTypes.string.isRequired,
};

export default connect(null, { deleteMind })(withStyles(styles)(DeleteMind));
