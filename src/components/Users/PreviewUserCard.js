import React from "react";
import { Icon } from "semantic-ui-react";
import GenericTag from "../Tags/GenericTag";
import SimilarTag from "../Tags/SimilarTag";
import SpotifyArtistTag from "../Tags/SpotifyArtistTag";
import ConnectForm from "./ConnectForm";

class PreviewUserCard extends React.Component {
  state = {
    similarTags: [],
    genres: [],
    instruments: [],
    connections: [],
    generic_tags: [],
    spotify_tags: [],
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
          generic_tags: json.generic_tags,
          spotify_tags: json.spotify_tags,
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
        <div className="card-similarities">
          <div className="card-content">
            You both like:{" "}
            {this.state.similarTags.map((tag) => (
              <SimilarTag tag={tag.name} />
            ))}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="preview-user-card">
        <div className="card-content">
          <img
            className="user-photo"
            src={this.props.user.photo || this.props.user.providerImage}
            alt="User"
          />

          <div className="card-info">
            <div className="card-header">
              <a href={`users/${this.props.user.id}`}>
                {this.props.user.username}
              </a>
            </div>

            <div className="card-meta" textAlign="center">
              <button>
                <Icon name="user" />
                {this.state.connections.length || "0"} Connections
              </button>
            </div>

            <div className="card-location">
              <span className="location">
                Location: {this.props.user.location || "Earth"}
              </span>
            </div>

            {this.renderSimilarTags()}

            <div className="card-tags">
              {this.state.instruments.length > 0 ? (
                <>
                  Plays:{" "}
                  {this.state.instruments?.map((inst) => {
                    return <GenericTag tag={inst} />;
                  })}
                </>
              ) : null}
              <br />
              {this.state.genres.length > 0 ? (
                <>
                  Genres:{" "}
                  {this.state.genres?.map((genre) => {
                    return <GenericTag tag={genre} />;
                  })}
                  <br />
                </>
              ) : null}
            </div>

            <div className="card-bio">
              {this.props.user.bio
                ? this.props.user.bio.substring(0, 70) + "..."
                : "I'm a musician!"}
            </div>
            <br />

            {this.state.spotify_tags.length > 0 ? (
              <>
                <div className="card-artists">
                  Top Artists:
                  <div className="card-artists-container">
                    {this.state.spotify_tags.map((tag) => {
                      return <SpotifyArtistTag tag={tag} />;
                    })}
                  </div>
                </div>
                <br />
              </>
            ) : null}

            {this.state.generic_tags.length > 0 ? (
              <div className="card-interests card-tags">
                <b>Other Interests:</b>
                <br />
                {this.state.generic_tags.map((tag) => {
                  return <GenericTag tag={tag.name} />;
                })}
              </div>
            ) : null}
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
