import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import UserNotification from "./UserNotification";
import UserTag from "./UserTag";

import helpers from "../../globalHelpers";

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedDate: "",
      notificationsExpanded: false,
      tagsExpanded: false,
    };
  }
  defaultProps = {
    user: {
      notifications: [],
      tags: [],
    },
  };
  componentDidMount() {
    console.log("mounting current user profile", this.props);
    this.formatDate(this.props.user.created_at);
  }

  formatDate(date) {
    let formattedDate = helpers.formatDate(date);
    this.setState({ formattedDate });
  }

  toggleNotifications(e) {
    e.preventDefault();
    console.log("toggle notifications");
    this.setState({
      notificationsExpanded: !this.state.notificationsExpanded,
      tagsExpanded: false,
    });
  }

  toggleTags(e) {
    e.preventDefault();
    console.log("toggle tags");
    this.setState({
      notificationsExpanded: false,
      tagsExpanded: !this.state.tagsExpanded,
    });
  }

  render() {
    return (
      <div className="user-profile-container">
        <div className="notifications-and-tags-container">
          <div className="notifications">
            <button
              className="toggle-notifications-btn"
              onClick={(e) => this.toggleNotifications(e)}
              type="button"
            >
              Notifications
              <Icon name="chevron down" />
            </button>
            <div className="notifications-container">
              {this?.state?.notificationsExpanded
                ? this?.props?.user?.notifications.map(
                    (notification, index) => {
                      return (
                        <UserNotification info={notification} key={index} />
                      );
                    }
                  )
                : ""}
            </div>
          </div>
          <div className="tags">
            <button
              className="toggle-tags-btn"
              onClick={(e) => this.toggleTags(e)}
              type="button"
            >
              Tags
              <Icon name="chevron down" />
            </button>
            <div className="tags-container">
              {this?.state?.tagsExpanded
                ? this?.props?.user?.tags.map((tag, index) => {
                    return <UserTag info={tag} key={index} />;
                  })
                : ""}
            </div>
          </div>
        </div>
        <div className="user-profile">
          <div className="blue-backdrop"></div>
          <Link className="logout-btn" to="/logout">
            <Icon fitted name="sign-out" />
          </Link>
          <button className="edit-profile-btn">
            <Icon fitted name="edit" />
          </button>
          <div className="user-profile-image-container">
            <img
              src={this.props.user.photo || this.props.user.providerImage}
              alt="user-profile"
            />
          </div>
          <div className="user-profile-text-container">
            <div className="username">{this.props.user.username}</div>
            <a href={`mailto:${this.props.user.email}`} className="email">
              {this.props.user.email}
            </a>
            <div>Member since {this.state.formattedDate}</div>
            <div>
              <span className="location">
                Location: {this.props.user.location || "Earth"}
              </span>
            </div>
            <div>{this.props.user.bio || "No bio given"}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.currentUser,
  };
};

export default connect(mapStateToProps)(CurrentUserProfile);
