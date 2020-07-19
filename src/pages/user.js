import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Mind from "../components/mind/Mind";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/profile/StaticProfile";
import MindSkeleton from "../Utill/MindSkeleton";
import ProfileSkeleton from "../Utill/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../Redux/actions/dataAction";

class user extends Component {
  state = {
    profile: null,
    mindIdparam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const mindId = this.props.match.params.mindId;

    if (mindId) this.setState({ mindIdparam: mindId });

    this.props.getUserData(handle);

    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { minds, loading } = this.props.data;
    const { mindIdparam } = this.state;
    const mindMarkup = loading ? (
      <MindSkeleton />
    ) : minds === null ? (
      <p>This user has Not Created a Mind yet</p>
    ) : !mindIdparam ? (
      minds.map((mind) => <Mind key={mind.mindId} mind={mind} />)
    ) : (
      minds.map((mind) => {
        if (mind.mindId !== mindIdparam)
          return <Mind key={mind.mindId} mind={mind} />;
        else return <Mind key={mind.mindId} mind={mind} openDialog />;
      })
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {mindMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}
user.propTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
