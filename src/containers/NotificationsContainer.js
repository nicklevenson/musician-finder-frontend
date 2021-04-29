import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchUser } from "../actions/useractions";
import Notification from "../components/Notifications/Notification.js";
// import {Feed, Container} from 'semantic-ui-react'
class NotificationsContainer extends React.Component {
  componentDidMount = () => {
    this.props.fetchUser();
  };
  render() {
    if (sessionStorage.jwt) {
      return (
        <div>
          <h1>Notifications</h1>
          <div className="feed">
            {this.props.currentUser.notifications.map((n) => {
              return <Notification notification={n} />;
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
    fetchUser: () => dispatch(fetchUser()),
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
