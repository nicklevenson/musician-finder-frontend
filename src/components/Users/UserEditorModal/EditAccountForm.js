import { Component } from "react";
import LocationSearch from "../../Misc/LocationSearch";
class EditAccountForm extends Component {
  state = {
    location: this.props.user.location,
    lat: this.props.user.lat,
    lng: this.props.user.lng,
  };

  handleLocationChange = (locationObj) => {
    this.setState({
      location: locationObj.location,
      lat: locationObj.lat,
      lng: locationObj.lng,
    });
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            disabled="true"
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
            disabled="true"
            type="text"
            onChange={this.props.handleInputChange}
            value={this.props.user.email}
            placeholder="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <LocationSearch handleLocationChange={this.handleLocationChange} />
        </div>

        <button className="save-btn" type="button">
          Update User
        </button>
      </form>
    );
  }
}

export default EditAccountForm;
