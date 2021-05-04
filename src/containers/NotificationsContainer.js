import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchUserNotifications } from "../actions/useractions";
import Notification from "../components/Notifications/Notification.js";
// import {Feed, Container} from 'semantic-ui-react'
class NotificationsContainer extends React.Component {
  componentDidMount = () => {
    this.props.fetchUserNotifications();
  };
  render() {
    if (sessionStorage.jwt) {
      return (
        <div>
          <h1>Notifications</h1>
          <div className="feed">
            {this.props.notifications.map((n) => {
              return <Notification notification={n} key={n.id}/>;
            })}
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserNotifications: () => dispatch(fetchUserNotifications()),
  };
};

const mapStateToProps = (state) => {
  return {
    notifications: state.currentUser.notifications,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
