import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import ConnectForm from "./ConnectForm";

class CurrentUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("mounting current user profile", this.props);
  }
  render() {
    return (
      <>
        <h5>
          <Link to="/logout">Logout</Link>
        </h5>
        <div>
          <Image
            size="tiny"
            src={this.props.user.photo || this.props.user.providerImage}
          />
          <div>{this.props.user.username}</div>
          <div>
            <span className="location">
              Location: {this.props.user.location || "Earth"}
            </span>
          </div>
          <div>{this.props.user.bio || "No bio given"}</div>
        </div>
        <br />

        <div></div>

        <div>
          <ConnectForm focusedUser={this.props.user} />
        </div>
      </>
    );
  }
}

export default CurrentUserProfile;
