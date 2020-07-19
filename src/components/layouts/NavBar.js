import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PostMind from "../mind/PostMind";
//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
//MUI STUFF
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MyButton from "../../Utill/MyButton";
import Notifications from "./Notifications";

//icon

import HomeIcon from "@material-ui/icons/Home";

class NavBar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar className="nav-container">
            {authenticated ? (
              <Fragment>
                <PostMind />
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon />
                  </MyButton>
                </Link>

                <Notifications />
              </Fragment>
            ) : (
              <Fragment>
                <Button color={"inherit"} component={Link} to="/login">
                  login
                </Button>
                <Button color={"inherit"} component={Link} to="/">
                  home
                </Button>
                <Button color={"inherit"} component={Link} to="/signup">
                  signup
                </Button>
                <Button color={"inherit"} component={Link} to="/about">
                  about
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(NavBar);
