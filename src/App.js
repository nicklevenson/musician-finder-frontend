import React from 'react'
import {connect} from 'react-redux'
import './App.css';
import {Route} from 'react-router-dom'
import Nav from './components/Nav'
import HomeContainer from './containers/HomeContainer'
import ConnectionsContainer from './containers/ConnectionsContainer'
import MessagingContainer from './containers/MessagingContainer'
import NotificationsContainer from './containers/NotificationsContainer'
import ProfileContainer from './containers/ProfileContainer'
import Logout from './components/Logout'

import {fetchUser, fetchAllUsers} from './actions/useractions'
import LoginContainer from './containers/LoginContainer';
class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllUsers()
    if (sessionStorage.userId) {
      this.props.fetchUser()
    }
  
  }
  render(){
    return (
      <div className="App">
        <Nav/>
        <Route exact path="/home" component={HomeContainer}></Route>
        <Route exact path="/connections" component={ConnectionsContainer}></Route>
        <Route exact path="/messaging" component={MessagingContainer}></Route>
        <Route exact path="/notifications" component={NotificationsContainer}></Route>
        <Route exact path="/profile" component={ProfileContainer}></Route>
        <Route exact path="/login" component={LoginContainer}></Route>
        <Route exact path="/logout" component={Logout}></Route>
      </div>
    );
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(null, mapDispatchToProps)(App);
