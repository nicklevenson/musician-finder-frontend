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
      <Carousel infiniteLoop renderIndicator={false} useKeyboardArrows={true} showThumbs={false}>
        {this.props.currentUser.recommended_users.map(u => <div style={{padding: "2vw"}}><UserCard user={u.user}/></div>)}
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