import { Component } from "react";

class EditGenresForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="genres">Add Genre</label>
          <input type="text" placeholder="genre" />
        </div>
        <button className="save-btn" type="button">
          Update Genres
        </button>
      </form>
    );
  }
}

export default EditGenresForm;
