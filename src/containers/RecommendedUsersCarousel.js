import React from 'react'
import {connect} from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PreviewUserCard from '../components/PreviewUserCard';
import '../RecommendedUsers.css'
class RecommendedUsersCarousel extends React.Component {
  render() {
    return(
      <>
      <i>Recommended Users</i>
      <hr/>
      <div className="side-swipe">
        {this.props.currentUser.recommended_users.map(u => 
            <PreviewUserCard user={u.user} similar_tags={u.similar_tags}/>
          )}
      </div>
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