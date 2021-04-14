import React from 'react'
import {connect} from 'react-redux'

class RecommendedUsersCarousel extends React.Component {
  render() {
    return(
      <h5>Recommended Users</h5>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(RecommendedUsersCarousel)