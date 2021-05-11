import React from "react";
// import {Link} from 'react-router-dom'
import {Icon, Image} from "semantic-ui-react";
import ConnectForm from "./ConnectForm";

class PreviewUserCard extends React.Component {
  renderSimilarTags = () => {
    if (
      this.props.similar_tags &&
      this.props.similar_tags.length !== 0 &&
      this.props.user.id !== sessionStorage.userId
    ) {
      return (
        <div style={{ height: "1em" }}>
          <div className="card-content">
            You both like: {this.props.similar_tags.slice(0, 3).join(", ")}
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
{/* 
            <div className="card-meta">{this.renderSimilarTags()}</div> */}
          </div>
          <div className="card-content" extra textAlign="center">
            <button>
              <Icon name="user" />
              {this.props.user.connected_users.length || "0"}{" "}
              Connections
            </button>
          </div>
          <div className="card-content">
            <ConnectForm focusedUser={this.props.user} />
            {this.props.cardChange ? 
              <button size="tiny" onClick={e => this.props.cardChange(e)}>
                Next Plz!
              </button> :
              null
            }
           
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewUserCard;
