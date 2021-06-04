import { connect } from "react-redux";
import { Component } from "react";
import LocationSearch from "../../Misc/LocationSearch";
import { updateUser } from "../../../actions/useractions";
class EditAccountForm extends Component {
  state = {
    location: this.props.user.location,
    lat: this.props.user.lat,
    lng: this.props.user.lng,
  };

  handleUpdate = () => {
    if (this.state.location && this.state.lat && this.state.lng) {
      this.props.updateUser({
        location: this.state.location,
        lat: this.state.lat,
        lng: this.state.lng,
      });
    } else {
      this.setState({ validLocation: false });
    }
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
          {/* {!this.state.validLocation ? <i>Invalid Location Entry</i> : null} */}
        </div>

        <button
          className="save-btn"
          type="button"
          onClick={(e) => this.handleUpdate()}
        >
          Update Account
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
