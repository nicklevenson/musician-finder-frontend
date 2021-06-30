import React from "react";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import PreviewUserCard from "../components/Users/PreviewUserCard";
import { fetchUserRecs } from "../actions/useractions";
import Filter from "../components/Misc/Filter";

class RecommendedUsers extends React.Component {
  state = {
    activeIndex: 0,
    margin: 0,
  };

  componentDidMount() {
    this.props.fetchUserRecs();
  }

  resetIndexAndMargin = () => {
    this.setState({ activeIndex: 0, margin: 0 });
  };

  componentDidUpdate() {
    this.setMargin();
  }

  cardChange = (e) => {
    const container = document.querySelector(".cards-container");
    if (this.state.activeIndex === this.props.recommendedUsers.length - 1) {
      this.setState({ activeIndex: 0 });
    } else {
      this.setState((state) => ({
        activeIndex: state.activeIndex + 1,
      }));
    }
    if (this.state.activeIndex === this.props.recommendedUsers.length - 1) {
      this.setState({ margin: 0 });
    } else {
      this.setState((state) => ({
        margin: state.margin + container.clientWidth,
      }));
    }
  };

  setMargin = () => {
    const container = document.querySelector(".cards-container");
    // container.scrollLeft = this.state.margin

    let interval = setInterval(() => {
      let i = container.scrollLeft;
      if (i < this.state.margin) {
        container.scrollLeft = i + container.clientWidth / 50;
        if (container.scrollLeft >= this.state.margin) {
          clearInterval(interval);
        }
      } else {
        container.scrollLeft = i - container.clientWidth / 50;
        if (container.scrollLeft <= this.state.margin) {
          clearInterval(interval);
        }
      }
    }, 1);
  };

  render() {
    if (!sessionStorage.jwt) {
      window.location.href = "/login";
    } else {
      const shownUserId =
        this.props?.recommendedUsers[this.state.activeIndex]?.id || null;
      return (
        <div className="recommended-users">
          <Filter resetIndexAndMargin={this.resetIndexAndMargin} />
          <div className="cards-container">
            {this.props.recommendedUsers.length > 0 ? (
              this.props?.recommendedUsers?.map((u, index) => (
                <div
                  className={
                    this.state.activeIndex === index
                      ? "active card"
                      : "inactive card"
                  }
                  key={u.username + u.id}
                >
                  <PreviewUserCard
                    othercHange={"otherChange"}
                    user={u}
                    currentUser={this.props.currentUser}
                    cardChange={this.cardChange}
                    shownUserId={shownUserId}
                  />
                </div>
              ))
            ) : (
              <div className="active card">
                <h3>No results</h3>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    recommendedUsers: state.currentUser.recommendedUsers,
    allUsers: state.currentUser.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRecs: () => dispatch(fetchUserRecs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedUsers);
