import React from 'react'
import {connect} from 'react-redux'
import {Image} from 'semantic-ui-react'
import {Message} from './Message.js'

class Chatroom extends React.Component {
  // state = {
  //   otherUser: this.props.chatroom.users.find(u => u.id !== this.props.currentUser.id)
  // }
  render(){
    const otherUser = this.props.chatroom.users.find(u => u.id !== this.props.currentUser.id)
    return (
      <div style={{margin: "2rem"}}>
        <Image
              size="tiny"
              src={otherUser.photo || otherUser.providerImage}
              circular
              inline
        /> 

        <b> {otherUser.username}</b>

        {this.props.chatroom.messages.length < 1 ?
          <h5>Start a conversation</h5>:
          null}

        {this.props.chatroom.messages.map(message => {
          return <Message message={message}/>
        })}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  };
};

export default connect(mapStateToProps)(Chatroom)