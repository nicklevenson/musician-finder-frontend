import React from 'react'
import {connect} from 'react-redux'
import {Image} from 'semantic-ui-react'
class ChatroomPreview extends React.Component {
  

  getBackgroundColor = () => {
    if (this.props.selected){
      return "lightgray"
    }else if( this.isUnread()){
      return "lightgreen" 
    }else{
      return "white"
    }
  }
  isUnread = () => {
    const index = this.props.chatroom.messages.length - 1
    if(this.props.chatroom.messages){
      if (this.props.chatroom?.messages[index]?.user_id !== this.props.currentUser.id &&
        this.props.chatroom?.messages[index]?.read === false){
        return true
      }
    }
  }
  handleClick = () => {
    this.props.showChatroom(this.props.chatroom.id)
  }
  render(){
    const otherUser = this.props.chatroom.users.find(u => u.id !== this.props.currentUser.id)
    
    return(
      <div className="chatroom-preview" style={{backgroundColor: this.getBackgroundColor()}} onClick={this.handleClick}>
         <Image
            size="mini"
            src={otherUser.photo || otherUser.providerImage}
            circular
            inline
          /> 
          <div style={{display: "inline-block"}}>
            <p>{otherUser.username}</p>
            <i>{this.props.chatroom?.messages[this.props.chatroom.messages.length - 1]?
                this.props.chatroom.messages[this.props.chatroom.messages.length - 1].content.substr(0, 20)
                : 
                "Start a conversation"}
            </i>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  };
};

export default connect(mapStateToProps)(ChatroomPreview)