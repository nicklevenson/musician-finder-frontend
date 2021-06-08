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

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedDate: "",
      notificationsExpanded: false,
      tagsExpanded: false,
      showUserEditorModal: false,
      photoEdit: false,
      photo: null,
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

  toggleNotifications(e) {
    e.preventDefault();
    this.setState({
      notificationsExpanded: !this.state.notificationsExpanded,
      tagsExpanded: false,
    });
  }

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

  togglePhotoEdit = (e) => {
    e.preventDefault();
    this.setState({ photoEdit: true });
  };

  handlePhotoUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (file.size < 3000000) {
        this.setState({ photo: file });
        this.setState({ photoError: null });
      } else {
        this.setState({ photoError: "Photo Too Large" });
      }
    }
  };

  updatePhoto = (e) => {
    e.preventDefault();
    if (this.state.photo) {
      this.setState({ uploading: true });
      const formData = new FormData();
      formData.append("photo", this.state.photo);
      const userId = sessionStorage.userId;
      const configObj = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${userId}`,
          Accept: "application/json",
          enctype: "multipart/form-data",
        },
        body: formData,
      };
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/upload_photo`,
        configObj
      )
        .then((res) => res.json())
        .then((json) => {
          this.setState({ uploading: false });
          this.setState({ photoEdit: false });
          this.props.fetchUser();
        })
        .catch((error) => {
          console.warn("Error uploading: \n", error);
          this.setState({ photoError: "Error uploading please try again" });
        });
    }
  };

  render() {
    let modal = this.renderUserEditorModal();
    return (
      <div className="user-profile-container">
        <div className="notifications-and-tags-container">
          <div className="notifications">
            <button
              className="toggle-notifications-btn"
              onClick={(e) => this.toggleNotifications(e)}
              type="button"
            >
              Notifications
              <Icon name="chevron down" />
            </button>
            <div className="notifications-container">
              {this?.state?.notificationsExpanded
                ? this?.props?.notifications?.map((notification, index) => {
                    return <UserNotification info={notification} key={index} />;
                  })
                : ""}
            </div>
          </div>
          <div className="tags">
            <button
              className="toggle-tags-btn"
              onClick={(e) => this.toggleTags(e)}
              type="button"
            >
              Tags
              <Icon name="chevron down" />
            </button>
            <div className="tags-container">
              {this?.state?.tagsExpanded
                ? this?.props?.user?.tags.map((tag, index) => {
                    return <UserTag info={tag} key={index} />;
                  })
                : ""}
            </div>
          </div>
        </div>
        <div className="user-profile">
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
          <div
            className="user-profile-image-container"
            onClick={(e) => this.togglePhotoEdit(e)}
          >
            <img
              src={this.props.user.photo || this.props.user.providerImage}
              alt="user-profile"
            />
          </div>
          <div className="user-profile-text-container">
            <div className="username">{this.props.user.username}</div>
            <a href={`mailto:${this.props.user.email}`} className="email">
              {this.props.user.email}
            </a>
            <div>Member since {this.state.formattedDate}</div>
            <div>
              <span className="location">
                Location: {this.props.user.location || "Earth"}
              </span>
            </div>
            <div>{this.props.user.bio || "No bio given"}</div>
          </div>
        </div>
        {modal}

        {this.state.photoEdit ? (
          <>
            <BackDrop zIndex="10" />
            <div className="user-editor-modal">
              <form>
                <label htmlFor="img">Select image:</label>
                {this.state.photoError ? <i>{this.state.photoError}</i> : null}
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={(e) => this.handlePhotoUpload(e)}
                  disabled={this.state.uploading ? true : false}
                />
                {this.state.photo ? (
                  <button
                    onClick={(e) => this.updatePhoto(e)}
                    disabled={this.state.uploading ? true : false}
                  >
                    {this.state.uploading ? "Uploading..." : "Upload"}
                  </button>
                ) : null}
              </form>
            </div>
          </>
        ) : null}
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
    notifications: state.currentUser.notifications,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserProfile);
