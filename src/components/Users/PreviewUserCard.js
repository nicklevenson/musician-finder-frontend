import React from "react";
// import {Link} from 'react-router-dom'
import {Icon, Image} from "semantic-ui-react";
import ConnectForm from "./ConnectForm";

class PreviewUserCard extends React.Component {
  state = {
    similarTags: [],
    genres: [],
    instruments: [],
    connections: [],
    
  }

  componentDidMount(){
    if (this.props.shownUserId === this.props.user.id){
      this.fetchSupportingInfo()
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.shownUserId === this.props.user.id && this.props.shownUserId !== prevProps.shownUserId){
      this.fetchSupportingInfo()
      this.fetchConnections()
    }
  }


  fetchSupportingInfo = () => {
    console.log("fetching")
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
          genres: json.genres
        });
      })
      .catch(function (error) {
        alert("Error getting tags.");
      });
  };

  fetchConnections = () => {
    const userId = this.props.user.id
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
        this.setState({connections: json});
      })
      .catch(function (error) {
        alert("Error getting User Connections.");
      });
  }

  renderSimilarTags = () => {
    if (
      this.state.similarTags.length > 0
    ) {
      return (
        <div style={{ height: "1em" }}>
          <div className="card-content">
            You both like: {this.state.similarTags.map(tag => tag.name).slice(0, 3).join(", ")}
          </div>
        </div>
      );
    } else {
      return <div style={{ height: "1em" }}></div>;
    }
  };

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          margin: "1vw",
          width: "80%",
          maxWidth: "min-content",
          textAlign: "center",
        }}
      >
        <div className="preview-user-card">
          <div className="card-content">
            <Image
              size="large"
              src={this.props.user.photo || this.props.user.providerImage}
              centered
            />
          </div>
          <div className="card-content">
            <div className="card-header">
              <a href={`users/${this.props.user.id}`}>
                {this.props.user.username}
              </a>
            </div>
            {/* <Card.Meta>
              <span className='date'>Joined {this.props.user.created_at.split("T")[0]}</span>
            </Card.Meta> */}
            <div className="card-meta">
              <span className="location">
                Location: {this.props.user.location || "Earth"}
              </span>
            </div>

            <div className="card-content">
              {this.props.user.bio
                ? this.props.user.bio.substring(0, 70) + "..."
                : "No bio given"}
            </div>

            <div className="card-meta">{this.renderSimilarTags()}</div>
          </div>
          <div className="card-content" extra textAlign="center">
            <button>
              <Icon name="user" />
              {this.state.connections.length || "0"} Connections
            </button>
          </div>
          {this.state.instruments.length > 0 ? (
            <div>Plays: {this.state.instruments?.join(", ")}</div>
          ) : null}

          {this.state.genres.length > 0 ? (
            <div>Genres: {this.state.genres?.join(", ")}</div>
          ) : null}

          <div className="card-content">
            <ConnectForm focusedUser={this.props.user} />
            {this.props.cardChange ? (
              <button size="tiny" onClick={(e) => this.props.cardChange(e)}>
                Next Plz!
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewUserCard;
