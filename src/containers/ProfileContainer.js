import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import UserShowContainer from './UserShowContainer'
import {connect} from 'react-redux'

class ProfileContainer extends React.Component {

  render(){
    if (sessionStorage.jwt){
      return(
        <>
        {/* <h1>Profile</h1>
        <h5><Link to="/logout">Logout</Link></h5>
        <UserShowContainer/> */}
        <Redirect to={`users/${this.props.currentUser.id}`}></Redirect>
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(ProfileContainer)