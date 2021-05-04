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
  handleSend = () => {
    if (this.state.content.length > 0) {
      const messageObject = {
        content: this.state.content,
        user_id: this.props.currentUser.id,
        chatroom_id: this.props.chatroomId
      }
      this.props.sendMessage(messageObject)
      this.props.refreshChatroom(this.props.chatroomId)
      this.setState({content: ""})
    }
  }

  render(){
    return(
      <div className="new-message" style={{position: "absolute"}}>
        <label htmlFor="message content"/>
        <input name="message content" value={this.state.content} placeholder="New Message" onChange={e => this.handleChange(e)}></input>
        <b onClick={this.handleSend}> Send</b>
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