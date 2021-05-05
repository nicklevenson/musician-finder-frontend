import { Component } from "react";

class EditInstrumentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="instrument">Add Instrument</label>
          <input type="text" placeholder="instrument" />
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
          Update Instruments
        </button>
      </form>
    );
  }
}

export default EditInstrumentsForm;
