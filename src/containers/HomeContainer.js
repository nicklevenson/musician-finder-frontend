import React from 'react'
import {connect} from 'react-redux'
import UserCard from '../components/UserCard'

class HomeContainer extends React.Component {
  render(){
    return(
      <>
      <h1>Home</h1>
      {this.props.currentUser.username ? <UserCard/> : null}
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(HomeContainer)
