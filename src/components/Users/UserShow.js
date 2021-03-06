import React from "react";
import { connect } from "react-redux";
import CurrentUserProfile from "./CurrentUserProfile";
import PreviewUserCard from "./PreviewUserCard";

class UserShow extends React.Component {
  state = {
    shownUser: {
      loading: true,
    },
    similar_tags: [],
  };

  componentDidMount() {
    if (this.props.match) {
      this.fetchShownUser();
      this.fetchSimilarTags();
    } else {
      this.setState({ shownUser: this.props.currentUser });
    }
  }

  fetchShownUser = () => {
    const userId = this.props.match.params.id;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ shownUser: json });
      })
      .catch((error) => {
        console.warn("Error getting shown user: \n", error);
      });
  };

  fetchSimilarTags = () => {
    const userId = this.props.match.params.id;
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/get_similar_tags/${sessionStorage.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({ similar_tags: json });
      })
      .catch((error) => {
        console.warn("Error getting tags: \n", error);
      });
  };

  render() {
    if (this.state.shownUser.loading === true) {
      return (
        <>
          <h3>Loading User...</h3>
        </>
      );
    } else {
      return (
        <>
          <div className="user-show-container">
            {this.state.shownUser.id === this.props.currentUser.id ? (
              <CurrentUserProfile />
            ) : (
              <PreviewUserCard
                user={this.state.shownUser}
                shownUserId={this.state.shownUser.id}
              />
            )}
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    allUsers: state.currentUser.allUsers,
  };
};

export default connect(mapStateToProps)(UserShow);
