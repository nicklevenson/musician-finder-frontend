import React from "react";
import { connect } from "react-redux";
import "./App.css";
import "./style/index.scss";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import ConnectionsContainer from "./containers/ConnectionsContainer";
import MessagingContainer from "./containers/MessagingContainer";
import NotificationsContainer from "./containers/NotificationsContainer";
import RecommendedUsers from "./containers/RecommendedUsers";
import UserShow from "./components/Users/UserShow";
import ProfileContainer from "./containers/ProfileContainer";
import Logout from "./components/Navigation/Logout";
import LandingPage from "./containers/LandingPage";
import Welcome from "./containers/Welcome";
import { Unsubscribed } from "./components/Misc/Unsubscribed";
import {
  fetchUser,
  fetchUserChatrooms,
  fetchUserNotifications,
} from "./actions/useractions";
import { fetchAllLists } from "./actions/listactions";
import LoginCard from "./components/Navigation/LoginCard";

class App extends React.Component {
  constructor(props) {
    super(props);
    props.fetchAllLists();
  }
  componentDidMount() {
    if (sessionStorage.userId) {
      this.props.fetchUser();
      this.props.fetchUserChatrooms();
      this.props.fetchUserNotifications();
      this.timer = setInterval(() => {
        this.props.fetchUserChatrooms();
        this.props.fetchUserNotifications();
      }, 100000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  render() {
    if (!sessionStorage.userId && !sessionStorage.jwt) {
      return (
        <div className="App">
          <Route exact path="/unsubscribed" component={Unsubscribed}></Route>
          <Route path="/" component={LandingPage}></Route>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Nav currentUser={this.props.currentUser} />
          {/* <LocationSearch /> */}

          <Switch>
            <Route exact path="/swipe" component={RecommendedUsers}></Route>
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
            <Route path="/messaging/:id" component={MessagingContainer}></Route>
            <Route
              exact
              path="/notifications"
              component={NotificationsContainer}
            ></Route>
            <Route exact path="/profile" component={ProfileContainer}></Route>

            <Route exact path="/users/:id" component={UserShow}></Route>
            <Route exact path="/login" component={LoginCard}></Route>
            <Route exact path="/logout" component={Logout}></Route>
            <Route exact path="/unsubscribed" component={Unsubscribed}></Route>
            <Route exact path="/welcome" component={Welcome}></Route>
          </Switch>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchUserChatrooms: () => dispatch(fetchUserChatrooms()),
    fetchUserNotifications: () => dispatch(fetchUserNotifications()),
    fetchAllLists: () => dispatch(fetchAllLists()),
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
