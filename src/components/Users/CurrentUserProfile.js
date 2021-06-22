import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import UserNotification from "./UserNotification";
import UserTag from "./UserTag";
import BackDrop from "../BackDrop";
import UserEditorModal from "./UserEditorModal/UserEditorModal";
import { fetchUser } from "../../actions/useractions";
import helpers from "../../globalHelpers";
import EditPhotoModal from "./UserEditorModal/EditPhotoModal";
import ConnectionsModal from "../Users/ConnectionsModal";
import GenericTag from "../Tags/GenericTag";
import SpotifyArtistTag from "../Tags/SpotifyArtistTag";

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedDate: "",
      notificationsExpanded: false,
      tagsExpanded: false,
      showUserEditorModal: false,
      connectionsModalDisplay: false,
    };

    this.toggleUserEditorModal = this.toggleUserEditorModal.bind(this);
  }
  componentDidMount() {
    this.formatDate(this.props.user.created_at);
  }

  formatDate(date) {
    let formattedDate = helpers.formatDate(date);
    this.setState({ formattedDate });
  }

  // toggleNotifications(e) {
  //   e.preventDefault();
  //   this.setState({
  //     notificationsExpanded: !this.state.notificationsExpanded,
  //     tagsExpanded: false,
  //   });
  // }

  toggleConnectionsModal = (e) => {
    e.preventDefault();
    if (this.state.connectionsModalDisplay === false) {
      this.setState({ connectionsModalDisplay: true });
    } else {
      this.setState({ connectionsModalDisplay: false });
    }
  };

  toggleUserEditorModal(e) {
    e.preventDefault();
    try {
      console.log("user editor modal toggle", e.target);
      this.setState({ showUserEditorModal: !this.state.showUserEditorModal });
    } catch (err) {
      console.warn("error with edit user click event", err);
      return false;
    }
  }

  renderUserEditorModal() {
    try {
      let { showUserEditorModal } = this.state;
      if (showUserEditorModal) {
        return (
          <>
            <BackDrop zIndex="10" />
            <UserEditorModal
              handleInputChange={this.handleInputChange}
              closeEvent={this.toggleUserEditorModal}
            />
          </>
        );
      } else return "";
    } catch (err) {
      console.warn("error rendering user editor modal", err);
      return "";
    }
  }

  toggleTags(e) {
    e.preventDefault();
    this.setState({
      notificationsExpanded: false,
      tagsExpanded: !this.state.tagsExpanded,
    });
  }

  render() {
    let modal = this.renderUserEditorModal();
    const instruments = this.props.user.instruments;
    const genres = this.props.user.genres;
    const spotify_tags = this.props.user.tags.filter(
      (tag) => tag.tag_type === "spotify_artist"
    );
    const generic_tags = this.props.user.tags.filter(
      (tag) => tag.tag_type !== "spotify_artist"
    );
    return (
      // <div className="user-profile-container">
      //   <div className="notifications-and-tags-container">
      //     <div className="notifications">
      //       <button
      //         className="toggle-notifications-btn"
      //         onClick={(e) => this.toggleNotifications(e)}
      //         type="button"
      //       >
      //         Notifications
      //         <Icon name="chevron down" />
      //       </button>
      //       <div className="notifications-container">
      //         {this?.state?.notificationsExpanded
      //           ? this?.props?.notifications?.map((notification, index) => {
      //               return <UserNotification info={notification} key={index} />;
      //             })
      //           : ""}
      //       </div>
      //     </div>
      //     <div className="tags">
      //       <button
      //         className="toggle-tags-btn"
      //         onClick={(e) => this.toggleTags(e)}
      //         type="button"
      //       >
      //         Tags
      //         <Icon name="chevron down" />
      //       </button>
      //       <div className="tags-container">
      //         {this?.state?.tagsExpanded
      //           ? this?.props?.user?.tags.map((tag, index) => {
      //               return <UserTag info={tag} key={index} />;
      //             })
      //           : ""}
      //       </div>
      //     </div>
      //   </div>
      //   <div className="user-profile">
      //     <Link className="logout-btn" to="/logout">
      //       <Icon fitted name="sign-out" />
      //     </Link>
      //     <button
      //       type="button"
      //       onClick={(e) => this.toggleUserEditorModal(e)}
      //       className="edit-profile-btn"
      //     >
      //       <Icon fitted name="edit" />
      //     </button>
      //     <div className="user-profile-image-container">
      //       <div className="image-container">
      //         {/* <div
      //           className="edit-image-overlay"
      //           onClick={this.togglePhotoEdit}
      //         >
      //           Upload Image
      //         </div> */}
      //         <img
      //           src={this.props.user.photo || this.props.user.providerImage}
      //           alt="user-profile"
      //         />

      //         <EditPhotoModal />
      //       </div>
      //     </div>
      //     <div className="user-profile-text-container">
      //       <div className="username">{this.props.user.username}</div>
      //       <a href={`mailto:${this.props.user.email}`} className="email">
      //         {this.props.user.email}
      //       </a>
      //       <div>Member since {this.state.formattedDate}</div>
      //       <div>
      //         <span className="location">
      //           Location: {this.props.user.location || "Earth"}
      //         </span>
      //       </div>
      //       <div>{this.props.user.bio || "No bio given"}</div>
      //     </div>
      //   </div>
      //   {modal}
      // </div>

      <div className="preview-user-card">
        {this.state.connectionsModalDisplay ? (
          <ConnectionsModal
            toggleModal={this.toggleConnectionsModal}
            connections={this.props.connections}
            user={this.props.user}
          />
        ) : null}
        <div className="card-content">
          <div className="edit-profile">
            <h2>My Profile</h2>
            <div className="buttons">
              <Link className="logout-btn" to="/logout">
                <Icon fitted name="sign-out" />
              </Link>
              <button
                type="button"
                onClick={(e) => this.toggleUserEditorModal(e)}
                className="edit-profile-btn"
              >
                <Icon fitted name="edit" />
              </button>
            </div>
          </div>

          <div className="user-photo-container">
            <div className="user-profile-image-container">
              <div className="image-container">
                <img
                  className="user-photo"
                  src={this.props.user.photo || this.props.user.providerImage}
                  alt="user-profile"
                />

                <EditPhotoModal />
              </div>
            </div>
          </div>

          <div className="card-info">
            <div className="card-header">
              <div
                onClick={this.handleProfileClick}
                aria-label="go to user profile"
                className="user-profile-link"
              >
                {this.props.user.username}
              </div>
            </div>
            <div className="card-connections">
              <button onClick={this.toggleConnectionsModal}>
                <Icon name="user" />
                {this.props.connections.length || "0"} Connections
              </button>
            </div>
            <div className="card-location">
              <span className="location">
                Location: {this.props.user.location || "Earth"}
              </span>
            </div>

            <div className="card-bio">
              {this.props.user.bio ? this.props.user.bio : "I'm a musician!"}
            </div>

            <div className="card-tags">
              {instruments?.length > 0 ? (
                <>
                  <b>Plays: </b>
                  {instruments?.map((inst) => {
                    return <GenericTag tag={inst.name} key={inst.name} />;
                  })}
                </>
              ) : null}
            </div>
            {spotify_tags.length > 0 ? (
              <>
                <br />
                <div className="card-artists">
                  <b>Top Artists: </b>
                  <div className="card-artists-container">
                    {spotify_tags.map((tag) => {
                      return <SpotifyArtistTag tag={tag} key={tag.name} />;
                    })}
                  </div>
                </div>
                <br />
              </>
            ) : null}
            <div className="card-tags">
              {genres.length > 0 ? (
                <>
                  <b>Genres: </b>
                  {genres?.map((genre) => {
                    return <GenericTag tag={genre.name} key={genre.name} />;
                  })}
                  <br />
                </>
              ) : null}
            </div>
            {generic_tags.length > 0 ? (
              <div className="card-interests card-tags">
                <b>Other Interests:</b>
                {generic_tags.map((tag) => {
                  return <GenericTag tag={tag.name} key={tag.name} />;
                })}
              </div>
            ) : null}
          </div>
        </div>
        {modal}
      </div>
    );
  }
}

CurrentUserProfile.defaultProps = {
  user: {
    tags: [],
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.currentUser,
    connections: state.currentUser.connectedUsers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserProfile);
