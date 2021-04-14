import React from 'react'
import {Redirect, Link} from 'react-router-dom'
class ProfileContainer extends React.Component {
  render(){
    if (sessionStorage.jwt){
      return(
        <>
        <h1>Profile</h1>

        <h5><Link to="/logout">Logout</Link></h5>
        </>
      )
    }
    else{
      return(
        <Redirect to="/login"></Redirect>
      )
    }
  }
}

export default ProfileContainer