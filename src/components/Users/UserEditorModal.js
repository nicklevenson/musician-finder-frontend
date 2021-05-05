import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

class UserEditorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="user-editor-modal">
        <form>
          <div className="form-group">
            <label for=""></label>
            <input type="text" placeholder="name" />
          </div>
          <div className="form-group">
            <label for=""></label>
            <input type="text" placeholder="email" />
          </div>
          <div className="form-group">
            <label for=""></label>
            <input type="text" placeholder="location" />
          </div>
          <div className="form-group">
            <label for=""></label>
            <input type="text" placeholder="username" />
          </div>
          <div className="form-group">
            <label for=""></label>
            <input type="text" placeholder="genres" />
          </div>
          <div className="form-group">
            <label for=""></label>
            <input type="text" placeholder="instruments" />
          </div>
          <div className="form-group">
            <label for=""></label>
            <input type="text" placeholder="tags" />
          </div>
        </form>
      </div>
    );
  }
}

export default UserEditorModal;
