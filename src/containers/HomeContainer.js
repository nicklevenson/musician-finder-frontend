import React from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import RecommendedUsers from "./RecommendedUsers";
import ConnectionsContainer from "./ConnectionsContainer";
// import LoginCard from "../components/LoginCard";
// import IncomingRequestsContainer from "./IncomingRequestsContainer";
class HomeContainer extends React.Component {
  state = { activeItem: 'recommended' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  // renderUserConnections = () => {
  //   if (this.props.currentUser.connected_users_with_tags) {
  //     if (this.props.currentUser.connected_users_with_tags.length !== 0) {
  //       return this.props.currentUser.connected_users_with_tags.map((u) => (
  //         <PreviewUserCard user={u} key={u.id + "previewcardconnected"} />
  //       ));
  //     } else {
  //       return <h1>Go find some users to connect with!</h1>;
  //     }
  //   }
  // };

  render() {
    const { activeItem } = this.state
    return (
      <>
        <Menu tabular style={{margin:"auto", width:"min-content"}}>
          <Menu.Item
            name='recommended'
            active={activeItem === 'recommended'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='connections'
            active={activeItem === 'connections'}
            onClick={this.handleItemClick}
          />
        </Menu>

        {activeItem === "connections" ? <ConnectionsContainer/> : <RecommendedUsers/>}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
  };
};

export default connect(mapStateToProps)(HomeContainer);
