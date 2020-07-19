import React, { Component } from "react";
import Grid from "@material-ui/core/Grid/";
import Mind from "../components/mind/Mind";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { getMinds } from "../Redux/actions/dataAction";
import PropTypes from "prop-types";
import MindSkeleton from "../Utill/MindSkeleton";

class home extends Component {
  state = {
    mind: null,
  };
  componentDidMount() {
    this.props.getMinds();
  }
  render() {
    const { minds, loading } = this.props.data;
    let recentMindMarkup = !loading ? (
      minds.map((mind) => <Mind key={mind.mindId} mind={mind} />)
    ) : (
      <MindSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
          {recentMindMarkup}
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  data: PropTypes.object.isRequired,
  getMinds: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getMinds })(home);
