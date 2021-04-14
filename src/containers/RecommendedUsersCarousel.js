import React from 'react'
import {connect} from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PreviewUserCard from '../components/PreviewUserCard';
import '../RecommendedUsers.css'
import { fetchUserRecs } from '../actions/useractions';
class RecommendedUsersCarousel extends React.Component {
  componentDidMount() {
    this.props.fetchUserRecs()
  }
  render() {
    return(
      <>
      <i>Recommended Users For You</i>
      <hr/>
      <div className="side-swipe">
        {this.props.recommendedUsers.map(u => 
            <PreviewUserCard user={u.user} similar_tags={u.similar_tags}/>
          )}
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    recommendedUsers: state.currentUser.recommendedUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRecs: () => dispatch(fetchUserRecs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedUsersCarousel)