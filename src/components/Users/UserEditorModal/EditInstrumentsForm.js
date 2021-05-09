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
          <label htmlFor="instrument">Add Instrument</label>
          <input type="text" placeholder="instrument" />
        </div>
        <button className="save-btn" type="button">
          Update Instruments
        </button>
      </form>
    );
  }
}

export default EditInstrumentsForm;
