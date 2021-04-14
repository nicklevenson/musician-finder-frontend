import React from 'react'
import {Redirect} from 'react-router-dom'
class MessagingContainer extends React.Component {
  render(){
    if (sessionStorage.jwt){
      return(
        <h1>Messages</h1>
      )
    }
    else{
      return(
        <Redirect to="/login"></Redirect>
      )
    }
  }
}

export default MessagingContainer