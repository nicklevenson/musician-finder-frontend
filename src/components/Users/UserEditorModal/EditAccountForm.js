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
          <label for="name">Name</label>
          <input type="text" placeholder="name" />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input type="text" placeholder="email" />
        </div>
        <div className="form-group">
          <label for="location">Location</label>
          <input type="text" placeholder="location" />
        </div>
        <div className="form-group">
          <label for="username">Username</label>
          <input type="text" placeholder="username" />
        </div>
        <button className="save-btn" type="button">
          Update User
        </button>
      </form>
    );
  }
}

export default EditAccountForm;
