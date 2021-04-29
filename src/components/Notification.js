
import React from 'react'
import {Feed, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUser} from '../actions/useractions'

class Notification extends React.Component {
  state = {
    background: this.props.notification.read ? "white" : "rgb(238, 232, 232)"
  }
  makeRead = (e) => {
    let configObj = {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ids: [this.props.notification.id]})
    }
    const userId = sessionStorage.userId
    fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications/make_read`,configObj)
    this.setState({background: "white"})
    this.props.fetchUser()
  }

  render(){
    return(
  
      <Feed.Event style={this.props.notification.read ? null : {background: this.state.background}} onClick={this.props.notification.read ? null : e => this.makeRead(e)} className="notification">
        <Link to={this.props.notification.involved_user_id ? "/users/" + this.props.notification.involved_user_id : "/notifications"}>
        {/* <Feed.Label>
          <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
        </Feed.Label> */}
        <Feed.Content>
          <Feed.Summary style={{textAlign:"center"}}>
            {/* <Feed.User>Elliot Fu</Feed.User> added you as a friend */}
            {this.props.notification.involved_user_id ?
              <>
                {this.props.notification.involved_username + " "}
                {this.props.notification.content}
              </>
              :
             this.props.notification.content
            }
            <Feed.Date>{this.props.notification.created_at.split("-").splice(0,2).join("-")}</Feed.Date>
          </Feed.Summary>
        </Feed.Content>
        </Link>
      </Feed.Event>
   
    )
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser())
  }
}

export default connect(null, mapDispatchToProps)(Notification)

