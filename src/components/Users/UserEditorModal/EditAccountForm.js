import { Component } from "react";

class EditAccountForm extends Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
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
            type="text"
            onChange={this.props.handleInputChange}
            value={this.props.user.email}
            placeholder="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            onChange={this.props.handleInputChange}
            value={this.props.user.location}
            placeholder="location"
          />
        </div>

        <button className="save-btn" type="button">
          Update User
        </button>
      </form>
    );
  }
}

export default EditAccountForm;
