import { Component } from "react";

class EditTagsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="tag">Add Tag</label>
          <input type="text" placeholder="tag" />
        </div>
        <button className="save-btn" type="button">
          Update Tags
        </button>
      </form>
    );
  }
}

export default EditTagsForm;
