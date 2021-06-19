import React from "react";
import { Icon } from "semantic-ui-react";
import GenericTag from "../Tags/GenericTag";
import SimilarTag from "../Tags/SimilarTag";
import SpotifyArtistTag from "../Tags/SpotifyArtistTag";
import ConnectForm from "./ConnectForm";
import ConnectionsModal from "./ConnectionsModal";
class PreviewUserCard extends React.Component {
  state = {
    similarTags: [],
    genres: [],
    instruments: [],
    connections: [],
    generic_tags: [],
    spotify_tags: [],
    connectionsModalDisplay: false,
  };

  static defaultProps = {
    key: "",
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
        console.warn("error getting user: \n", error);
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
      .catch((error) => {
        console.warn("Error getting User Connections: \n", error);
      });
  };

  renderSimilarTags = () => {
    if (this.state.similarTags.length > 0) {
      return (
        <div className="card-similarities">
          <b>You both like: </b>
          {this.state.similarTags.map((tag) => (
            <SimilarTag tag={tag} key={tag} />
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  toggleConnectionsModal = (e) => {
    e.preventDefault();
    if (this.state.connectionsModalDisplay === false) {
      this.setState({ connectionsModalDisplay: true });
    } else {
      this.setState({ connectionsModalDisplay: false });
    }
  };

  render() {
    return (
      <div className="preview-user-card">
        {this.state.connectionsModalDisplay ? (
          <ConnectionsModal
            toggleModal={this.toggleConnectionsModal}
            connections={this.state.connections}
          />
        ) : null}
        <div className="card-content">
          <div className="user-photo-container">
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

            <div className="card-connections">
              <button onClick={this.toggleConnectionsModal}>
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
                  <b>Plays: </b>
                  {this.state.instruments?.map((inst) => {
                    return <GenericTag tag={inst} key={inst.name} />;
                  })}
                </>
              ) : null}
              <br />
            </div>

            <div className="card-bio">
              {this.props.user.bio ? this.props.user.bio : "I'm a musician!"}
            </div>
            <br />

            {this.state.spotify_tags.length > 0 ? (
              <>
                <div className="card-artists">
                  <b>Top Artists: </b>
                  <div className="card-artists-container">
                    {this.state.spotify_tags.map((tag) => {
                      return <SpotifyArtistTag tag={tag} key={tag.name} />;
                    })}
                  </div>
                </div>
                <br />
              </>
            ) : null}

            <div className="card-tags">
              {this.state.genres.length > 0 ? (
                <>
                  <b>Genres: </b>
                  {this.state.genres?.map((genre) => {
                    return <GenericTag tag={genre} key={genre.name} />;
                  })}
                  <br />
                </>
              ) : null}
            </div>

            {this.state.generic_tags.length > 0 ? (
              <div className="card-interests card-tags">
                <b>Other Interests:</b>
                {this.state.generic_tags.map((tag) => {
                  return <GenericTag tag={tag.name} key={tag.name} />;
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
