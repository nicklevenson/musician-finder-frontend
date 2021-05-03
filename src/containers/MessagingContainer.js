import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUserChatrooms} from '../actions/useractions'
import ChatroomPreview from '../components/Messages/ChatroomPreview'
class MessagingContainer extends React.Component {
  state = {
    selectedChatroom: null
  }

  handleChatroomShow = (chatroomId) => {
    const chatroom = this.props.chatrooms.find(cr => cr.id === chatroomId)
    this.setState({selectedChatroom: chatroom})
  }
  render(){
    if (sessionStorage.jwt){
      return(
        <>
        <h1>Messages</h1>
        <div className="messages-container">
          <div className="chatroom-previews">
            {this.props.chatrooms.map(chatroom => {
                return <ChatroomPreview chatroom={chatroom} key={chatroom.id} showChatroom={this.handleChatroomShow}/>
            })}
          </div>
          <div className="shown-chatroom">
            {this.state.selectedChatroom ? 
            <h1>Chatroom</h1> 
            :
            null
            }
          </div>
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