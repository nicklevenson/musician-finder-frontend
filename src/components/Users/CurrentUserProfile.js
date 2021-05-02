import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class CurrentUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTestCards: 18,
      formattedDate: "",
      notificationsExpanded: false,
      tagsExpanded: false,
    };
  }
  componentDidMount() {
    console.log("mounting current user profile", this.props);
    this.formatDate(this.props.user.created_at);
  }

  formatDate(date) {
    try {
      console.log("formatting date", typeof date);
      if (typeof date === "string") {
        let datesToNums = [];
        date.slice(0, 10);
        date = date.split("-");
        date.forEach((int, index) => {
          if (index === 1) int -= 1;
          datesToNums.push(parseInt(int));
          console.log(datesToNums);
        });
        let utc = Date.UTC(...datesToNums);
        let f = new Intl.DateTimeFormat("en", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        let formattedDate = f.format(utc);
        this.setState({ formattedDate });
      }
    } catch (err) {
      console.warn("error within formatDate method", err);
      return;
    }
  }

  toggleNotifications(e) {
    e.preventDefault();
    console.log("toggle notifications");
  }

  toggleTags(e) {
    e.preventDefault();
    console.log("toggle tags");
  }

  render() {
    return (
      <div className="user-profile-container">
        <div className="notifications-and-tags-container">
          <div className="notifications">
            <button onClick={(e) => this.toggleNotifications(e)} type="button">
              Notifications
            </button>
          </div>
          <div className="tags">
            <button onClick={(e) => this.toggleTags(e)} type="button">
              Tags
            </button>
          </div>
        </div>
        <div className="user-profile">
          <img
            src={this.props.user.photo || this.props.user.providerImage}
            alt="user-profile"
          />
          <div className="username">{this.props.user.username}</div>
          <div className="email">{this.props.user.email}</div>
          <div>Member since {this.state.formattedDate}</div>
          <div>
            <span className="location">
              Location: {this.props.user.location || "Earth"}
            </span>
          </div>
          <div>{this.props.user.bio || "No bio given"}</div>
          <Link to="/logout">Logout</Link>
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
