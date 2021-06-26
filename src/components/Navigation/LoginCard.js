import React from "react";
import { Redirect } from "react-router-dom";

class LoginCard extends React.Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("token")) {
      const jwt = urlParams.get("token");
      const id = parseInt(urlParams.get("id"));
      sessionStorage.setItem("jwt", jwt);
      sessionStorage.setItem("userId", id);
      this.setState({ redirect: true });
    }
  }
  render() {
    return (
      <div className="login-page">
        <div style={{ margin: "auto" }}>
          <h3>Login/Signup</h3>
          {this.props.heading ? (
            <h5>
              <i>{this.props.heading}</i>
            </h5>
          ) : null}
          <i>
            (Use Spotify to instantly be matched with folks based on your music
            taste)
          </i>
          <br /> <br />
          <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-spotify`}>
            <div className="login spotify">
              <div>
                Continue With Spotify <i>(Recommended)</i>
              </div>
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

export default LoginCard;
