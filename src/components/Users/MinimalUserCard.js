import React from "react";
import ConnectForm from "./ConnectForm";

class MinimalUserCard extends React.Component {
  state = {
    similarTags: [],
    genres: [],
    instruments: [],
    connections: [],
    generic_tags: [],
    spotify_tags: [],
  };

  render() {
    return (
      <div className="preview-user-card minimal-user-card">
        <div className="card-content">
          <div className="user-photo-container">
            <img
              className="user-photo"
              src={this.props.user.photo || this.props.user.providerImage}
              alt="User"
            />
          </div>

          <div className="card-info">
            <div className="card-header">
              <a href={`users/${this.props.user.id}`}>
                {this.props.user.username}
              </a>
            </div>

            <div className="card-location">
              <span className="location">
                Location: {this.props.user.location || "Earth"}
              </span>
            </div>

            <div className="card-bio">
              {this.props.user.bio ? this.props.user.bio : "I'm a musician!"}
            </div>
          </div>
        </div>
        <div className="connect-form">
          <ConnectForm focusedUser={this.props.user} />
        </div>
      </div>
    );
  }
}

export default MinimalUserCard;
