import React from "react";
import { Redirect } from "react-router-dom";

class LoginCard extends React.Component {
  state = {
    redirect_swipe: false,
    redirect_new: false,
  };
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("edit"));
    if (urlParams.get("token")) {
      const jwt = urlParams.get("token");
      const id = parseInt(urlParams.get("id"));
      sessionStorage.setItem("jwt", jwt);
      sessionStorage.setItem("userId", id);
      if (urlParams.get("new")) {
        this.setState({ redirect_new: true });
      } else {
        this.setState({ redirect_swipe: true });
      }
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
          {this.state.redirect_swipe ? <Redirect to="/swipe" /> : null}
          {this.state.redirect_new ? <Redirect to="/welcome" /> : null}
        </div>
      </div>
    );
  }
}

export default LoginCard;
