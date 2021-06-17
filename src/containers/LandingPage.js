import React from "react";
import LoginCard from "../components/Navigation/LoginCard";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-container">
        <div className="landing-page">
          <h1>Welcome to Peanut Butter and Jam!</h1>
          <div className="brochure">
            <h3>A place for musicians to...</h3>
            <div>
              Find band chemistry quick by swiping through other musicians
              sorted by how much they have in common with you
            </div>
            <br />
            <div>Start a conversation with your connected musicians</div>
            <br />
            <div>
              Build a network of like-minded musicians who are ready to jam
            </div>
          </div>
          <LoginCard />
        </div>
      </div>
    );
  }
}

export default LandingPage;
