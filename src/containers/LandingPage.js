import React from "react";
import LoginContainer from "./LoginContainer";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-container">
        <h1>Welcome to Peanut Butter and Jam!</h1>
        <LoginContainer />
      </div>
    );
  }
}

export default LandingPage;
