import { Component } from "react";

class EditAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            onKeyUp={this.props.handleInputChange}
            type="text"
            placeholder="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onKeyUp={this.props.handleInputChange}
            placeholder="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" placeholder="location" />
        </div>

        <button className="save-btn" type="button">
          Update User
        </button>
      </form>
    );
  }
}

export default EditAccountForm;
