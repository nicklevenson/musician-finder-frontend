import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import {
  requestConnection,
  acceptConnection,
  rejectConnection,
} from "../../actions/useractions.js";
import history from "../../history";
class ConnectForm extends React.Component {
  handleConnectionRequest = () => {
    //we need to send current user id and the requested id
    this.props.requestConnection(this.props.focusedUser.id);
  };

  handleConnectionAccept = () => {
    this.props.acceptConnection(this.props.focusedUser.id);
  };

  handleConnectionReject = () => {
    this.props.rejectConnection(this.props.focusedUser.id);
  };

  // handleRemoveConnection = () => {
  //   this.props.removeConnection(thi)
  // }
  handleMessageLink = () => {
    history.push(`/messaging/${this.props.focusedUser.id}`);
  };

  render() {
    if (sessionStorage.userId) {
      if (
        this.props.currentUser.outgoing_pending_requests
          .map((u) => u.id)
          .includes(this.props.focusedUser.id)
      ) {
        return (
          <button disabled className="connect-button disabled">
            Pending
          </button>
        );
      } else if (
        this.props.incomingRequests
          .map((user) => user.id)
          .includes(this.props.focusedUser.id)
      ) {
        return (
          <>
            {/* <h5>{this.props.focusedUser.username} has requested to connect</h5> */}
            <button
              className="connect-button"
              onClick={this.handleConnectionAccept}
            >
              Accept
            </button>
            <button
              className="connect-button"
              onClick={this.handleConnectionReject}
            >
              Reject
            </button>
          </>
        );
      } else if (
        this.props.connectedUsers
          .map((user) => user.id)
          .includes(this.props.focusedUser.id)
      ) {
        return (
          <button
            className="message-user-button connect-button"
            onClick={this.handleMessageLink}
          >
            Message
          </button>
        );
      } else if (this.props.currentUser.id === this.props.focusedUser.id) {
        return null;
      } else {
        return (
          <button
            onClick={this.handleConnectionRequest}
            className="connect-button"
          >
            Let's Jam!
          </button>
        );
      }
    } else {
      return (
        <button disabled className="connect-button">
          Login To Connect
        </button>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestConnection: (requested_id) =>
      dispatch(requestConnection(requested_id)),
    acceptConnection: (requesting_user_id) =>
      dispatch(acceptConnection(requesting_user_id)),
    rejectConnection: (requesting_user_id) =>
      dispatch(rejectConnection(requesting_user_id)),
  };
};
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    incomingRequests: state.currentUser.incomingRequests,
    connectedUsers: state.currentUser.connectedUsers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectForm);
