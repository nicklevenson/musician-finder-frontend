import { connect } from "react-redux";
import { Component } from "react";
import LocationSearch from "../../Misc/LocationSearch";
import { updateUser } from "../../../actions/useractions";
class EditAccountForm extends Component {
  state = {
    location: this.props.user.location,
    lat: this.props.user.lat,
    lng: this.props.user.lng,
    soundCloudLink: this.props.user.soundcloud_link || "",
    bandcampLink: this.props.user.bandcamp_link || "",
    youtubeLink: this.props.user.youtube_link || "",
    spotifyLink: this.props.user.spotify_link || "",
    appleMusicLink: this.props.user.apple_music_link || "",
    instagramLink: this.props.user.instagram_link || "",
    updated: false,
  };

  handleUpdate = () => {
    if (this.state.location && this.state.lat && this.state.lng) {
      this.props.updateUser({
        location: this.state.location,
        lat: this.state.lat,
        lng: this.state.lng,
        soundcloud_link: this.state.soundCloudLink,
        bandcamp_link: this.state.bandcampLink,
        youtube_link: this.state.youtubeLink,
        spotify_link: this.state.spotifyLink,
        apple_music_link: this.state.appleMusicLink,
        instagram_link: this.state.instagramLink,
      });
    } else {
      this.setState({ validLocation: false });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.checkIfUpdated(prevProps)) {
      this.setState({ updated: true });
    }
  }

  checkIfUpdated = (prevProps) => {
    const prevUser = prevProps.user;
    const user = this.props.user;
    if (
      prevUser.location !== user.location ||
      prevUser.lat !== user.lat ||
      prevUser.lng !== user.lng ||
      prevUser.soundcloud_link !== user.soundcloud_link ||
      prevUser.bandcamp_link !== user.bandcamp_link ||
      prevUser.youtube_link !== user.youtube_link ||
      prevUser.spotify_link !== user.spotify_link ||
      prevUser.apple_music_link !== user.apple_music_link ||
      prevUser.instagram_link !== user.instagram_link
    ) {
      return true;
    } else {
      return false;
    }
  };

  handleLocationChange = (locationObj) => {
    this.setState({
      location: locationObj.location,
      lat: locationObj.lat,
      lng: locationObj.lng,
    });
  };

  handleLinkChange = (e) => {
    switch (e.target.name) {
      case "soundcloud":
        return this.setState({ soundCloudLink: e.target.value });
      case "bandcamp":
        return this.setState({ bandcampLink: e.target.value });
      case "spotify":
        return this.setState({ spotifyLink: e.target.value });
      case "apple music":
        return this.setState({ appleMusicLink: e.target.value });
      case "youtube":
        return this.setState({ youtubeLink: e.target.value });
      case "instagram":
        return this.setState({ instagramLink: e.target.value });
      default:
        return null;
    }
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            disabled={true}
            name="username"
            onChange={this.props.handleInputChange}
            value={this.props.user.username}
            type="text"
            placeholder="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            disabled={true}
            type="text"
            onChange={this.props.handleInputChange}
            value={this.props.user.email}
            placeholder="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <LocationSearch
            handleLocationChange={this.handleLocationChange}
            location={this.props.user.location}
            selectedLocation={this.state.location}
          />
        </div>

        <div className="form-group">
          <label htmlFor="soundcloud">Soundcloud</label>
          <input
            name="soundcloud"
            onInput={(e) => this.handleLinkChange(e)}
            value={this.state.soundCloudLink}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bandcamp">Bandcamp</label>
          <input
            name="bandcamp"
            onInput={(e) => this.handleLinkChange(e)}
            value={this.state.bandcampLink}
          />
        </div>

        <div className="form-group">
          <label htmlFor="spotify">Spotify</label>
          <input
            name="spotify"
            onInput={(e) => this.handleLinkChange(e)}
            value={this.state.spotifyLink}
          />
        </div>

        <div className="form-group">
          <label htmlFor="youtube">Youtube</label>
          <input
            name="youtube"
            onInput={(e) => this.handleLinkChange(e)}
            value={this.state.youtubeLink}
          />
        </div>

        <div className="form-group">
          <label htmlFor="apple music">Apple Music</label>
          <input
            name="apple music"
            onInput={(e) => this.handleLinkChange(e)}
            value={this.state.appleMusicLink}
          />
        </div>

        <div className="form-group">
          <label htmlFor="instagram">Instagram</label>
          <input
            name="instagram"
            onInput={(e) => this.handleLinkChange(e)}
            value={this.state.instagramLink}
          />
        </div>

        <button
          className="save-btn"
          type="button"
          onClick={(e) => this.handleUpdate()}
        >
          {this.state.updated ? "Updated" : "Update Account"}
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userParams) => dispatch(updateUser(userParams)),
  };
};

export default connect(null, mapDispatchToProps)(EditAccountForm);
