import React from "react";
import { Redirect } from "react-router-dom";

class ProfileContainer extends React.Component {
  render() {
    console.log();
    if (sessionStorage.jwt) {
      return <Redirect to={`users/${sessionStorage.userId}`}></Redirect>;
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
}

export default ProfileContainer;
