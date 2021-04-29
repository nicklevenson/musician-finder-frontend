import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ProfileContainer extends React.Component {
  render() {
    if (sessionStorage.jwt) {
      return <Redirect to={`users/${this.props.currentUser.id}`}></Redirect>;
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
  };
};

export default connect(mapStateToProps)(ProfileContainer);
