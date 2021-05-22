import React from "react";
import { connect } from "react-redux";
import {
  requestConnection,
  acceptConnection,
  rejectConnection,
} from "../../actions/useractions.js";
class ConnectForm extends React.Component {
  handleConnectionRequest = (e) => {
    e.preventDefault();
    //we need to send current user id and the requested id
    this.props.requestConnection(this.props.focusedUser.id);
  };

  handleConnectionAccept = (e) => {
    e.preventDefault();
    this.props.acceptConnection(this.props.focusedUser.id);
  };

  handleConnectionReject = (e) => {
    e.preventDefault();
    this.props.rejectConnection(this.props.focusedUser.id);
  };

  // handleRemoveConnection = () => {
  //   this.props.removeConnection(thi)
  // }

  render() {
    if (sessionStorage.userId) {
      if (
        this.props.currentUser.outgoing_pending_requests
          .map((u) => u.id)
          .includes(this.props.focusedUser.id)
      ) {
        return (
          <button className="connect-button" disabled>
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
          <button className="connect-button" disabled>
            You and {this.props.focusedUser.username} are connected
          </button>
        );
      } else if (this.props.currentUser.id === this.props.focusedUser.id) {
        return null;
      } else {
        return (
          <button
            className="connect-button"
            size="tiny"
            animated
            onClick={this.handleConnectionRequest}
          >
            Request Connection
          </button>
        );
      }
    } else {
      return (
        <button className="connect-button" disabled>
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
