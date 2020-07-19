import React, { Component } from "react";
import MyButton from "../../Utill/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
//Redux
import { connect } from "react-redux";
import { likeMind, unlikeMind } from "../../Redux/actions/dataAction";

class LikeButton extends Component {
  likedMind = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.mindId === this.props.mindId)
    )
      return true;
    else return false;
  };
  likeMind = () => {
    this.props.likeMind(this.props.mindId);
  };
  unlikeMind = () => {
    this.props.unlikeMind(this.props.mindId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedMind() ? (
      <MyButton tip="undoLike" onClick={this.unlikeMind}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeMind}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}
LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  mindId: PropTypes.string.isRequired,
  likeMind: PropTypes.func.isRequired,
  unlikeMind: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeMind,
  unlikeMind,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
