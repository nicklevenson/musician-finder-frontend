import { Component } from "react";
import { Icon, Image, Card } from "semantic-ui-react";
import ConnectForm from "./ConnectForm";

class OtherUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSimilarTags = () => {
    if (
      this.props.similar_tags &&
      this.props.similar_tags.length > 0 &&
      this.props.currentUser.id !== this.props.user.id
    ) {
      return (
        <Card.Content>
          You both like: <br />
          {this.props.similar_tags.join(", ")}
        </Card.Content>
      );
    }
  };

  renderInterestTags = () => {
    if (this?.props?.user?.tags.length > 0) {
      return (
        <Card.Content>
          {this.props.user.username} is interested in: <br />
          <br />
          {this.props.user.tags.map((t) => t.name).join(", ")}
        </Card.Content>
      );
    }
  };

  render() {
    return (
      <>
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
        <div>{this.renderSimilarTags()}</div>
        <br />
        <div>
          <button>
            <Icon name="user" />
            {this.props.user.connected_users_with_tags
              ? this.props.user.connected_users_with_tags.length
              : null}{" "}
            Connections
          </button>
        </div>

        <div style={{ width: "50%", margin: "auto" }}>
          {this.renderInterestTags()}
        </div>

        <div style={{ width: "50%", margin: "auto" }}>
          <ConnectForm focusedUser={this.props.user} />
        </div>
      </>
    );
  }
}

export default OtherUserProfile;
