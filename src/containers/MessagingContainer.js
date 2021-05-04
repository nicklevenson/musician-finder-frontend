import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUserChatrooms} from '../actions/useractions'
import ChatroomPreview from '../components/Messages/ChatroomPreview'
import Chatroom from '../components/Messages/Chatroom'

class MessagingContainer extends React.Component {
  
  state = {
    selectedChatroom: null
  }
  componentDidMount = () => {
    if (sessionStorage.jwt){
      this.timer = setInterval(()=>this.props.fetchUserChatrooms(), 10000)
    }
  }
  componentWillUnmount = () => {
    clearInterval(this.timer)
    this.timer = null
  }

  handleChatroomShow = (chatroomId) => {
    const chatroom = this.props.chatrooms.find(cr => cr.id === chatroomId)
    this.setState({selectedChatroom: chatroom})
  }

  orderChatrooms = (chatrooms) => {
    if (chatrooms.length > 0){
      return chatrooms.sort((cr, cr2) => (cr.updated_at < cr2.updated_at) ? 1 : -1)
    }else{
      return []
    }
  }
  render(){
    if (sessionStorage.jwt){
      return(
        <>
          <div className="messaging-container">
              <div className="chatroom-previews">
                {this.orderChatrooms(this.props.chatrooms).map(chatroom => {
                    return <ChatroomPreview chatroom={chatroom} key={chatroom.id} 
                            showChatroom={this.handleChatroomShow} 
                            selected={this.state.selectedChatroom?.id === chatroom.id ? true : false}
                            />
                })}
              </div>
              <div className="shown-chatroom">
                {this.state.selectedChatroom ? 
                  <>
                    <Chatroom chatroomId={this.state.selectedChatroom.id}/>
                  </>
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