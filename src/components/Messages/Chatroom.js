import React from "react";
import { connect } from "react-redux";
import { Image } from "semantic-ui-react";
import { Message } from "./Message.js";
import { makeMessageRead } from "../../actions/useractions.js";
import NewMessage from "./NewMessage";
class Chatroom extends React.Component {
  componentDidMount() {
    this.makeRead();
  }
  componentDidUpdate() {
    this.makeRead();
  }

  makeRead = () => {
    if (this.hasUnread()) {
      this.props.makeMessageRead(this.props.chatroomId);
      console.log("making message read");
    }
  };

  hasUnread = () => {
    const chatroom = this.props.chatrooms.find(
      (cr) => cr.id === this.props.chatroomId
    );
    return chatroom.messages.flat().some((message) => {
      return (
        message.read === false && this.props.currentUser.id !== message.user.id
      );
    });
  };
  render() {
    const chatroom = this.props.chatrooms.find(
      (cr) => cr.id === this.props.chatroomId
    );
    const otherUser = chatroom.users.find(
      (u) => u.id !== this.props.currentUser.id
    );
    return (
      <>
        <div className="chatroom">
          <div className="chatroom-header">
            <div
              className="back-button"
              onClick={(e) => this.props.handleBackToPreview()}
            >
              <i>Back</i>
            </div>
            <div className="chatting-with">
              <Image
                size="tiny"
                src={otherUser.photo || otherUser.providerImage}
                circular
                inline
              />
              <b> {otherUser.username}</b>
            </div>
          </div>

          <div className="messages-container">
            {chatroom.messages.length < 1 ? (
              <h5>Start a conversation</h5>
            ) : null}

            {chatroom.messages.reverse().map((message) => {
              return (
                <Message
                  message={message}
                  key={message.id}
                  currentUserMessage={
                    this.props.currentUser.id === message.user_id ? true : null
                  }
                />
              );
            })}
          </div>

          <div className="new-message-container">
            <NewMessage chatroomId={chatroom.id} />
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeMessageRead: (chatroom_id) => dispatch(makeMessageRead(chatroom_id)),
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    shownChatroom: state.currentUser.shownChatroom,
    chatrooms: state.currentUser.chatrooms,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
