import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUserChatrooms} from '../actions/useractions'
import Chatroom from '../components/Messages/Chatroom'
class MessagingContainer extends React.Component {
  render(){
    if (sessionStorage.jwt){
      return(
        <>
        <h1>Messages</h1>
        <div className="messages-container">
          {this.props.chatrooms.map(chatroom => {
            return(
              <Chatroom/>
            )
          })}
        </div>
        </>
      )
    }
    else{
      return(
        <Redirect to="/login"></Redirect>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserChatrooms: () => dispatch(fetchUserChatrooms()),
  };
};

const mapStateToProps = (state) => {
  return {
    chatrooms: state.currentUser.chatrooms
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MessagingContainer)