import React from 'react'
import {connect} from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import UserCard from '../components/UserCard';
class RecommendedUsersCarousel extends React.Component {
  render() {
    return(
      <>
      <i>Recommended Users</i>
      <hr/>
      <Carousel>
        {this.props.currentUser.recommended_users.map(u => <UserCard user={u.user}/>)}
      </Carousel>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(RecommendedUsersCarousel)