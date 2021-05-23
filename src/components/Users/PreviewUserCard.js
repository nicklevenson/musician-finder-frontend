import React from "react";
import { Icon } from "semantic-ui-react";
import GenericTag from "../Tags/GenericTag";
import ConnectForm from "./ConnectForm";

class PreviewUserCard extends React.Component {
  state = {
    similarTags: [],
    genres: [],
    instruments: [],
    connections: [],
  };

  componentDidMount() {
    if (this.props.shownUserId === this.props.user.id) {
      this.fetchSupportingInfo();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.shownUserId === this.props.user.id &&
      this.props.shownUserId !== prevProps.shownUserId
    ) {
      this.fetchSupportingInfo();
      this.fetchConnections();
    }
  }

  fetchSupportingInfo = () => {
    console.log("fetching");
    const userId = this.props.user.id;
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/get_supporting_info/${sessionStorage.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          similarTags: json.similar_tags,
          instruments: json.instruments,
          genres: json.genres,
        });
      })
      .catch(function (error) {
        alert("Error getting tags.");
      });
  };

  fetchConnections = () => {
    const userId = this.props.user.id;
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/connected_users`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({ connections: json });
      })
      .catch(function (error) {
        alert("Error getting User Connections.");
      });
  };

  renderSimilarTags = () => {
    if (this.state.similarTags.length > 0) {
      return (
        <div style={{ height: "1em" }}>
          <div className="card-content">
            You both like:{" "}
            {this.state.similarTags
              .map((tag) => tag.name)
              .slice(0, 3)
              .join(", ")}
          </div>
        </div>
      );
    } else {
      return <div style={{ height: "1em" }}></div>;
    }
  };

  render() {
    return (
      <div className="preview-user-card">
        <div className="card-photo">
          <img
            className="user-photo"
            src={this.props.user.photo || this.props.user.providerImage}
            alt="User"
          />
        </div>
        <div className="card-info">
          <div className="card-header">
            <a href={`users/${this.props.user.id}`}>
              {this.props.user.username}
            </a>
          </div>

          <div className="card-location">
            <span className="location">
              Location: {this.props.user.location || "Earth"}
            </span>
          </div>
          <br />

          <div className="card-instruments">
            {this.state.instruments.length > 0 ? (
              <div>
                {this.state.instruments?.map((inst) => {
                  return <GenericTag tag={inst} />;
                })}
              </div>
            ) : null}
          </div>
          <div className="card-genres">
            {this.state.genres.length > 0 ? (
              <div>
                {this.state.genres?.map((genre) => {
                  return <GenericTag tag={genre} />;
                })}
              </div>
            ) : null}
          </div>
          <br />

          <div className="card-bio">
            {this.props.user.bio
              ? this.props.user.bio.substring(0, 70) + "..."
              : "I'm a musician!"}
          </div>
          <br />

          <div className="card-similarities">{this.renderSimilarTags()}</div>
          <br />

          <div className="card-artists">Top Artists:</div>
          <br />

          <div className="card-meta" textAlign="center">
            <button>
              <Icon name="user" />
              {this.state.connections.length || "0"} Connections
            </button>
          </div>
        </div>

        <div className="connect-form">
          <ConnectForm focusedUser={this.props.user} />
          {this.props.cardChange ? (
            <button
              className="next-button"
              onClick={(e) => this.props.cardChange(e)}
            >
              Next Plz!
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default PreviewUserCard;
