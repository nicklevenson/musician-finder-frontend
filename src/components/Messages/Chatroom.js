import React from 'react'
import {connect} from 'react-redux'
import {Image} from 'semantic-ui-react'
import {Message} from './Message.js'
import { makeMessageRead } from '../../actions/useractions.js'

class Chatroom extends React.Component {
  componentDidMount(){
    const chatroom = this.props.chatrooms.find(cr => cr.id === this.props.chatroomId)
    const lastMessage = chatroom?.messages[chatroom.messages.length - 1]
    if (lastMessage?.read === false && lastMessage.user_id !== this.props.currentUser.id){
      console.log("making message read")
      this.props.makeMessageRead(lastMessage.id)
    }
  }
  render(){
    const chatroom = this.props.chatrooms.find(cr => cr.id === this.props.chatroomId)
    const otherUser = chatroom.users.find(u => u.id !== this.props.currentUser.id)
    return (
      <div style={{height: "80vh"}}>
        <Image
          size="tiny"
          src={otherUser.photo || otherUser.providerImage}
          circular
          inline
        /> 

          <b> {otherUser.username}</b>
          <div style={{margin: "2rem", height: "80%", overflowY: "auto"}}>

          {chatroom.messages.length < 1 ?
            <h5>Start a conversation</h5>:
            null}

          {chatroom.messages.map(message => {
            return <Message message={message} key={message.id}/>
          })}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeMessageRead: (message_id) => dispatch(makeMessageRead(message_id))
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    shownChatroom: state.currentUser.shownChatroom,
    chatrooms: state.currentUser.chatrooms
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom)