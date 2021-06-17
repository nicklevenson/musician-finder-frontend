import React from "react";
import LoginCard from "../components/Navigation/LoginCard";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-container">
        <h1>Welcome to Peanut Butter and Jam!</h1>
        <div className="brochure">
          <div>
            A place for musicians to connect based on similar interests,
            location, and other preferences
          </div>
          <br />
          <div>
            Find band chemistry quick by swiping through musicians sorted by how
            much they have in common with you
          </div>
          <br />
          <div>Start a conversation with your connected musicians</div>
          <br />
          <div>Build a network of like-minded musicians</div>
        </div>
        <LoginCard />
      </div>
    );
  }
}

export default LandingPage;
