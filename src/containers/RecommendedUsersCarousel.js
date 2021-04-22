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
      <div className="down-swipe">
        {this.props.recommendedUsers.length > 0 ? 
          this.props.recommendedUsers.map(u => 
            <PreviewUserCard user={u.user} similar_tags={u.similar_tags} key={u.id + "previewcard"}/>
          )
        :
        this.props.allUsers.map(u => 
          <PreviewUserCard user={u} key={u.id + "previewcard"}/>)
        }
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    recommendedUsers: state.currentUser.recommendedUsers,
    allUsers: state.currentUser.allUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRecs: () => dispatch(fetchUserRecs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedUsersCarousel)