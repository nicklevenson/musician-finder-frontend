import React from 'react'
import {connect} from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import PreviewUserCard from '../components/Users/PreviewUserCard';
import { fetchUserRecs } from '../actions/useractions';

class RecommendedUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUserRecs()
  }
  render() {
    return(
      <>
          {this.props.recommendedUsers.map(u => 
            <PreviewUserCard user={u.user} similar_tags={u.similar_tags} key={u.id + "previewcard"}/>
          )} 
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

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedUsers)