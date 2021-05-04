import React from 'react'
import {connect} from 'react-redux'
import {sendMessage, fetchUserChatrooms} from '../../actions/useractions'

class NewMessage extends React.Component {
  state = {
    content: ""
  }

  handleChange = (e) => {
    this.setState({content: e.target.value})
  }
  handleSend = (e) => {
    e.preventDefault()
    if (this.state.content.length > 0) {
      const messageObject = {
        content: this.state.content,
        user_id: this.props.currentUser.id,
        chatroom_id: this.props.chatroomId
      }
      this.props.sendMessage(messageObject)
      this.setState({content: ""})
    }
  }

  render(){
    return(
      <div className="new-message">
        <div className="new-message-input">
          <label htmlFor="message content"/>
          <input name="message content" value={this.state.content} placeholder="New Message" onChange={e => this.handleChange(e)}></input>
        </div>
        <button onClick={this.handleSend}> Send</button>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (messageObject) => dispatch(sendMessage(messageObject)),
    fetchUserChatrooms: () => dispatch(fetchUserChatrooms())
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)