import { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import EditAccountForm from "./EditAccountForm";
import EditGenresForm from "./EditGenresForm";
import EditInstrumentsForm from "./EditInstrumentsForm";
import EditTagsForm from "./EditTagsForm";

class UserEditorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: EditAccountForm,
      user: this.props.user,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {}

  getActiveForm() {
    return <this.state.activeForm handleInputChange={this.handleInputChange} />;
  }

  handleInputChange(e) {
    e.preventDefault();
    const target = e.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let user = this.state.user;
    user[name] = target.value;
    this.setState({ user }, () => console.log(this.state));
  }

  handleFormToggleClick(e) {
    e.preventDefault();
    let availableForms = [
      EditAccountForm,
      EditGenresForm,
      EditInstrumentsForm,
      EditTagsForm,
    ];
    let target = e.target.getAttribute("data-form");
    console.log("clicked form toggle button!", target);
    availableForms.forEach((form) => {
      if (form.name === target) {
        this.setState({ activeForm: form });
      }
    });
  }

  render() {
    let activeForm = this.getActiveForm();

    return (
      <div className="user-editor-modal">
        <h3>User Settings</h3>
        <button
          onClick={this.props.closeEvent}
          className="close-btn"
          type="button"
        >
          <Icon name="close" />
        </button>
        <div className="form-container">
          <div className="form-toggle">
            <button
              onClick={(e) => {
                this.handleFormToggleClick(e);
              }}
              data-form="EditAccountForm"
              type="button"
            >
              Account
            </button>
            <button
              onClick={(e) => {
                this.handleFormToggleClick(e);
              }}
              data-form="EditGenresForm"
              type="button"
            >
              Genres
            </button>
            <button
              onClick={(e) => {
                this.handleFormToggleClick(e);
              }}
              data-form="EditInstrumentsForm"
              type="button"
            >
              Instruments
            </button>
            <button
              onClick={(e) => {
                this.handleFormToggleClick(e);
              }}
              data-form="EditTagsForm"
              type="button"
            >
              Tags
            </button>
          </div>
          {activeForm}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.currentUser,
  };
};

export default connect(mapStateToProps)(UserEditorModal);
