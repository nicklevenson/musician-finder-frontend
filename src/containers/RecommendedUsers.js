import React from 'react'
import {connect} from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import PreviewUserCard from '../components/Users/PreviewUserCard';
import { fetchUserRecs } from '../actions/useractions';
import Filter from '../components/Misc/Filter'

class RecommendedUsers extends React.Component {

  state = {
    activeIndex: 0,
    margin: 0
  }
  componentDidMount() {
    this.props.fetchUserRecs()
  }

  componentDidUpdate(){
    this.setMargin()
  }

  cardChange = (e) => {
    if (this.state.activeIndex === this.props.recommendedUsers.length - 1){
      this.setState({activeIndex: 0})
    }else{
      this.setState((state) => ({
        activeIndex: state.activeIndex + 1
      }))
    }
    if (this.state.activeIndex === this.props.recommendedUsers.length - 1){
      this.setState({margin: 0})
    }else{
      this.setState((state) => ({
        margin: state.margin + window.innerWidth
      }))
    }
  }



  setMargin = () => {
    const container = document.querySelector('.cards-container')
    container.scrollLeft = this.state.margin
  }
  render() {
    return(
      <div className="recommended-users">
          <Filter/>
          <div className="cards-container">
            {this.props.recommendedUsers?.map((u, index) =>
              <div className={this.state.activeIndex === index ? "active card" : "inactive card"}>
                <PreviewUserCard user={u.user} similar_tags={u.similar_tags} key={index} cardChange={this.cardChange}/>
              </div>
            )} 
          </div>
      </div>
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