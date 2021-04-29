import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import RecommendedUsers from "./RecommendedUsers";
import PreviewUserCard from "../components/PreviewUserCard";
// import LoginCard from "../components/LoginCard";
import IncomingRequestsContainer from "./IncomingRequestsContainer";

import { fetchConnections } from "../actions/useractions";
class ConnectionsContainer extends React.Component {
  componentDidMount = () => {
    this.props.fetchConnections(this.props.currentUser.id);
  };
  render() {
    if (sessionStorage.jwt) {
      return (
        <div style={{ width: "90%", margin: "auto" }}>
          <Grid relaxed padded centered columns={1}>
            <Grid.Column>
              <div className="fixed-heading">
                <i>Incoming Requests</i>
              </div>
              <div className="side-swipe">
                {this.props.currentUser.username ? (
                  <IncomingRequestsContainer />
                ) : null}
              </div>
            </Grid.Column>

            <Grid.Row columns={1}>
              <Grid.Column>
                <>
                  <div className="fixed-heading">
                    <i>Your connections</i>
                  </div>
                  <br />

                  {this.props.connectedUsers.length > 0 ? (
                    <div className="down-swipe">
                      {this.props.connectedUsers.map((u) => (
                        <PreviewUserCard
                          user={u.user}
                          similar_tags={u.similar_tags}
                          key={u.id + "previewcardconnections"}
                        />
                      ))}
                    </div>
                  ) : (
                    "No connected users. Go connect with some lovely people!"
                  )}
                </>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="fixed-heading">
                  <i>Recommended Users For You</i>
                </div>
                <br />
                <div className="side-swipe">
                  {this.props.currentUser.username ? (
                    <RecommendedUsers />
                  ) : null}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionsContainer);
