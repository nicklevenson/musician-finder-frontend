import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUserChatrooms} from '../actions/useractions'
import ChatroomPreview from '../components/Messages/ChatroomPreview'
import Chatroom from '../components/Messages/Chatroom'
import {Grid} from 'semantic-ui-react'
import NewMessage from '../components/Messages/NewMessage'
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
          <Grid className="messages-container" centered style={{maxWidth: "1000px", margin: "auto"}}>
            <Grid.Row style={{height:"80vh"}}>
              <Grid.Column width={4} className="chatroom-previews" style={{border: "solid thin lightgray", padding: "0"}}>
                {this.props.chatrooms.map(chatroom => {
                    return <ChatroomPreview chatroom={chatroom} key={chatroom.id} 
                            showChatroom={this.handleChatroomShow} 
                            selected={this.state.selectedChatroom?.id === chatroom.id ? true : false}
                            />
                })}
              </Grid.Column>
              <Grid.Column width={12} className="shown-chatroom" style={{border: "solid thin lightgray"}}>
                {this.state.selectedChatroom ? 
                  <>
                    <Chatroom chatroomId={this.state.selectedChatroom.id}/>
                    <NewMessage chatroomId={this.state.selectedChatroom.id} refreshChatroom={this.handleChatroomShow}/>
                  </>
                :
                  null
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
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