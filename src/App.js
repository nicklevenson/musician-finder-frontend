import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom'
import Nav from './components/Nav'
import HomeContainer from './containers/HomeContainer'
import ConnectionsContainer from './containers/ConnectionsContainer'
import MessagingContainer from './containers/MessagingContainer'
import NotificationsContainer from './containers/NotificationsContainer'
import ProfileContainer from './containers/ProfileContainer'
import Login from './components/Login'
import Logout from './components/Logout'
function App() {
  return (
    <div className="App">
      <Nav/>
      <Route exact path="/home" component={HomeContainer}></Route>
      <Route exact path="/connections" component={ConnectionsContainer}></Route>
      <Route exact path="/messaging" component={MessagingContainer}></Route>
      <Route exact path="/notifications" component={NotificationsContainer}></Route>
      <Route exact path="/profile" component={ProfileContainer}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/logout" component={Logout}></Route>
    </div>
  );
}

export default App;
