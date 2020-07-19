import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//Mui stuff
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//redux stuff
import { connect } from "react-redux";
import { getComment } from "../../Redux/actions/dataAction";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.getComment(this.props.mindId, { body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    console.log(errors);
    const { classes, authenticated } = this.props;
    const commentFormMarkup = authenticated ? (
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            label="Comment on mind"
            type="text"
            helperText={errors.comment}
            error={errors.comment ? true : false}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeperator} />
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}
CommentForm.propTypes = {
  mindId: PropTypes.string.isRequired,
  getComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { getComment })(
  withStyles(styles)(CommentForm)
);
