import React from "react";
import { connect } from "react-redux";
import "./App.css";
import "./style/index.scss";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import HomeContainer from "./containers/HomeContainer";
import ConnectionsContainer from "./containers/ConnectionsContainer";
import MessagingContainer from "./containers/MessagingContainer";
import NotificationsContainer from "./containers/NotificationsContainer";
import RecommendedUsers from "./containers/RecommendedUsers";
import UserShow from "./components/Users/UserShow";
import ProfileContainer from "./containers/ProfileContainer";
import Logout from "./components/Navigation/Logout";

import { fetchUser, fetchUserChatrooms, fetchUserNotifications } from "./actions/useractions";
import LoginContainer from "./containers/LoginContainer";
import LocationSearch from "./components/Users/LocationSearch";
class App extends React.Component {
  componentDidMount() {
    if (sessionStorage.userId) {
      this.props.fetchUser()
      this.timer = setInterval(() => {
        this.props.fetchUserChatrooms();
        this.props.fetchUserNotifications()
      }, 100000)
    }
  }

  componentWillUnmount(){
    clearInterval(this.timer)
    this.timer = null
  }
  render() {
    return (
      <div className="App">
        <Nav currentUser={this.props.currentUser} />
        <LocationSearch/>
        <div>
          <Switch>
            <Route exact path="/home" component={HomeContainer}></Route>
            <Route
              exact
              path="/recommended-users"
              component={RecommendedUsers}
            ></Route>
            <Route
              exact
              path="/connections"
              component={ConnectionsContainer}
            ></Route>
            <Route
              exact
              path="/messaging"
              component={MessagingContainer}
            ></Route>
            <Route
              exact
              path="/notifications"
              component={NotificationsContainer}
            ></Route>
            <Route exact path="/profile" component={ProfileContainer}></Route>
            <Route exact path="/users/:id" component={UserShow}></Route>
            <Route exact path="/login" component={LoginContainer}></Route>
            <Route exact path="/logout" component={Logout}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchUserChatrooms: () => dispatch(fetchUserChatrooms()),
    fetchUserNotifications: () => dispatch(fetchUserNotifications())
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
