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

  componentDidUpdate(prevProps, prevState){
    this.setMargin()
    if (prevProps.recommendedUsers != this.props.recommendedUsers){
      this.setState({activeIndex: 0})
      this.setState({activeIndex: 0})
    }
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
    // container.scrollLeft = this.state.margin
    let interval = setInterval(() => {
      let i = container.scrollLeft
        if (i < this.state.margin){
          container.scrollLeft = i + window.innerWidth/100
          if (container.scrollLeft >= this.state.margin){
            clearInterval(interval)
          }
        }else{
          container.scrollLeft = i - window.innerWidth/50
          if (container.scrollLeft <= this.state.margin){
            clearInterval(interval)
          }
        }
    }, 1)
  }

  render() {
    if (!sessionStorage.jwt) {
      window.location.href="/login"
    } else {
      const shownUserId =
        this.props?.recommendedUsers[this.state.activeIndex]?.id || null;
      return (
        <div className="recommended-users">
          <Filter />
          <div className="cards-container">
            {this.props?.recommendedUsers?.map((u, index) => (
              <div
                className={
                  this.state.activeIndex === index
                    ? "active card"
                    : "inactive card"
                }
              >
                <PreviewUserCard
                  user={u}
                  currentUser={this.props.currentUser}
                  key={u.id}
                  cardChange={this.cardChange}
                  shownUserId={shownUserId}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
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