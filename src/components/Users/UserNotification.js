import { Component } from "react";
import helpers from "../../globalHelpers";

class UserNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedDate: "",
      deleteBtnVisible: false,
    };
  }

  componentDidMount() {
    try {
      let formattedDate = helpers.formatDate(this.props.info.created_at);
      this.setState({ formattedDate });
    } catch (err) {
      console.warn("error mounting component", err);
    }
  }

  toggleHover(e) {
    e.preventDefault();
    console.log("hovering over user notifaction", e);
    this.setState({ deleteBtnVisible: !this.state.deleteBtnVisible });
  }

  getDeleteBtn() {
    if (this.state.deleteBtnVisible) {
      return (
        <button className="delete-notification-btn">
          <div></div>
          <div></div>
        </button>
      );
    } else return "";
  }

  render() {
    return (
      <div
        onMouseEnter={(e) => this.toggleHover(e)}
        onMouseLeave={(e) => this.toggleHover(e)}
        className="user-notification"
      >
        <div className="user-notification-content">
          {this.props.info.content}
        </div>
        <div className="user-notification-date">{this.state.formattedDate}</div>
        {this.getDeleteBtn()}
      </div>
    );
  }
}

export default UserNotification;
