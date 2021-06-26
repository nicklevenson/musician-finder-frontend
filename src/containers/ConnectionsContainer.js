import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchConnections } from "../actions/useractions";
import MiminalUserCard from "../components/Users/MinimalUserCard";
class ConnectionsContainer extends React.Component {
  componentDidMount = () => {
    this.props.fetchConnections(this.props.currentUser.id);
  };
  render() {
    if (sessionStorage.jwt) {
      return (
        <div className="connections-container">
          {this.props.incomingRequests.length > 0 ? (
            <div className="incoming-requests-container">
              <h3>Incoming Requests</h3>
              <div className="incoming-requests">
                {this.props.incomingRequests.map((user) => {
                  return <MiminalUserCard key={user.id} user={user} />;
                })}
              </div>
            </div>
          ) : null}

          <div className="my-connections">
            <h3>My Connections</h3>
            <br />
            {this.props.connectedUsers.length > 0 ? (
              this.props.connectedUsers.map((user) => {
                return <MiminalUserCard key={user.id} user={user} />;
              })
            ) : (
              <>Go connect with some people!</>
            )}
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchConnections: (userId) => dispatch(fetchConnections(userId)),
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    connectedUsers: state.currentUser.connectedUsers,
    incomingRequests: state.currentUser.incomingRequests,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionsContainer);
