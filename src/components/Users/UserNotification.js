import { Component } from "react";
import helpers from "../../globalHelpers";

class UserNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedDate: "",
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

  formatDate(date) {}

  render() {
    return (
      <div className="user-notification">
        <div>{this.props.info.content}</div>
        <div>{this.state.formattedDate}</div>
        <button className="delete-notification-btn">
          <div></div>
          <div></div>
        </button>
      </div>
    );
  }
}

export default UserNotification;
