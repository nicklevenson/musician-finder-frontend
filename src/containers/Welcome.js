import React from "react";

class Welcome extends React.Component {
  render() {
    return (
      <div className="landing-page-container">
        <div className="landing-page">
          <div className="brochure">
            <h1>Thanks for signing up for Peanut Butter and Jam!</h1>
            <br />
            <div>
              We hope you can use PBJ to find musicians that you vibe with.
            </div>
            <br />
            <div>
              <b>
                The best way to get matched with the right people is to add
                interest tags to your profile. If you logged in with Spotify it
                should have created a few for you already.
              </b>
            </div>
            <br />
            <div>
              Add the instruments you play and the genres you affiliate with.
            </div>
            <br />
            <div>
              Adding your location is how you can search for musicians based on
              their proximity to you.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
