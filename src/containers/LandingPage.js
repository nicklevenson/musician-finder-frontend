import React from "react";
import LoginCard from "../components/Navigation/LoginCard";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-container">
        <h1>Welcome to Peanut Butter and Jam!</h1>
        <LoginCard />
      </div>
    );
  }
}

export default LandingPage;
