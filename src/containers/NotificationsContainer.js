import React from 'react'
import {Redirect} from 'react-router-dom'
class NotificationsContainer extends React.Component {
  render(){
    if (sessionStorage.jwt){
      return(
        <h1>Notifications</h1>
      )
    }
    else{
      return(
        <Redirect to="/login"></Redirect>
      )
    }
  }
}

export default NotificationsContainer