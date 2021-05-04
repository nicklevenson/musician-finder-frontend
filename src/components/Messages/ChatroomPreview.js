import React from 'react'
import {connect} from 'react-redux'
import {Image} from 'semantic-ui-react'
class ChatroomPreview extends React.Component {
  state = {
    backgroundColor: "white"
  }
  
  componentDidMount(){
    if(this.props.chatroom.messages.users){
      if (this.props.chatroom.messages[this.props.chatroom.messages.length - 1].user.id !== this.props.currentUser.id &&
        this.props.chatroom.messages[this.props.chatroom.messages.length - 1].read === false){
        this.setState({backgroundColor: "lightgray"})
      }
    }
  }

  handleClick = () => {
    this.props.showChatroom(this.props.chatroom.id)
  }
  render(){
    const otherUser = this.props.chatroom.users.find(u => u.id !== this.props.currentUser.id)
    
    return(
      <div style={{backgroundColor: this.props.selected ? "lightgrey" : this.state.backgroundColor, display: "flex", alignItems: "center", borderBottom: "solid thin lightgray"}} onClick={this.handleClick}>
         <Image
            size="mini"
            src={otherUser.photo || otherUser.providerImage}
            circular
            inline
          /> 
          <div style={{display: "inline-block"}}>
            <p>{otherUser.username}</p>
            <i>{this.props.chatroom.messages[this.props.chatroom.messages.length - 1]?
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