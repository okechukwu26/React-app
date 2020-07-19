import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../Utill/MyButton";

//redux stuff
import { connect } from "react-redux";
import { postMind, clearError } from "../../Redux/actions/dataAction";
//Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
});

class PostMind extends Component {
  state = {
    open: false,
    errors: {},
    body: "",
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    this.props.postMind({ body: this.state.body });
    event.preventDefault();
  };
  handleClose = () => {
    this.props.clearError();
    this.setState({ open: false, errors: {} });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <MyButton tip="say your mind!" onClick={this.handleOpen}>
          <AddIcon />
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
          <DialogTitle>Post your mind</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Mind"
                multiline
                rows="3"
                placeholder="Let us know your mind"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                value={this.state.body}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submitButton}
              >
                {" "}
                Submit
                {loading && (
                  <CircularProgress
                    className={classes.progressSpinner}
                    size={30}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
PostMind.propTypes = {
  postMind: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postMind, clearError })(
  withStyles(styles)(PostMind)
);
