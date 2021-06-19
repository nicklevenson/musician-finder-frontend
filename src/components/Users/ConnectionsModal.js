import React from "react";
import { Icon } from "semantic-ui-react";
import MiminalUserCard from "./MinimalUserCard";
class ConnectionsModal extends React.Component {
  render() {
    return (
      <div className="connections-modal">
        <button
          onClick={this.props.toggleModal}
          className="close-btn"
          type="button"
        >
          <Icon name="close" />
        </button>
        Connections
        {this.props.connections.length > 0
          ? this.props.connections.map((user) => {
              return <MiminalUserCard key={user.id} user={user} />;
            })
          : null}
      </div>
    );
  }
}

export default ConnectionsModal;
