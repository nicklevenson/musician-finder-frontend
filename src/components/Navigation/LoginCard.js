import React from "react";
import googleLogin from "../../assets/btn_google.png";
import facebookLogin from "../../assets/facebook-login.png";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/useractions.js";
import { Redirect } from "react-router-dom";

class LoginCard extends React.Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("token")) {
      const jwt = urlParams.get("token");
      const id = parseInt(urlParams.get("id"));
      sessionStorage.setItem("jwt", jwt);
      sessionStorage.setItem("userId", id);
      this.props.fetchUser();
      this.setState({ redirect: true });
    }
  }
  render() {
    return (
      <div className="login-page">
        <div style={{ margin: "auto" }}>
          <h2>Login/Signup</h2>
          {this.props.heading ? (
            <h5>
              <i>{this.props.heading}</i>
            </h5>
          ) : null}
          <i>Recommended To Use Spotify</i>
          <br />
          <i>(you'll be matched with folks based on your music taste)</i>
          <br /> <br />
          <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-spotify`}>
            <div className="login spotify">
              <div>Continue With Spotify</div>
            </div>
          </a>
          <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-google`}>
            <div className="login google">
              <div>Continue With Google</div>
            </div>
          </a>
          <a
            href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-facebook`}
          >
            <div className="login facebook">
              <div>Continue With Facebook</div>
            </div>
          </a>{" "}
          {sessionStorage.jwt ? <Redirect to="/swipe" /> : null}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(null, mapDispatchToProps)(LoginCard);
