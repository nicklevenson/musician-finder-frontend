import { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import ProfileImage from "../Users/ProfileImage";
import NotificationIcon from "../Notifications/NotificationIcon";
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleHamburgerClick = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (!e.target.classList.contains("hamburger")) {
      e.target = e.target.parentNode;
    }
    console.log(e.target);
    e.target.classList.toggle("is-active");
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <>
        <div className="main-navigation">
          <div className="main-logo-container">
            <Menu.Item header href="/home" as={"a"}>
              <Icon name="music" size="large" fitted />
              Matchup Music
            </Menu.Item>
          </div>

          <div
            className="hamburger"
            onClick={(e) => this.handleHamburgerClick(e)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {this.state.isActive ? (
          <div className="main-nav-dropdown-menu">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
              as={NavLink}
              to="/home"
            >
              <div>
                <div>
                  <Icon name="home" size="large" fitted />
                </div>
                Home
              </div>
            </Menu.Item>

            <Menu.Item
              name="messaging"
              active={activeItem === "messaging"}
              onClick={this.handleItemClick}
              as={NavLink}
              to="/messaging"
            >
              <div>
                <div>
                  <Icon name="chat" size="large" fitted />
                </div>
                Messaging
              </div>
            </Menu.Item>

            <Menu.Item
              name="notifications"
              active={activeItem === "notifications"}
              onClick={this.handleItemClick}
              as={NavLink}
              to="/notifications"
            >
              <div>
                <NotificationIcon />
                Notifications
              </div>
            </Menu.Item>

            <Menu.Item
              name="Profile"
              active={activeItem === "Profile"}
              onClick={this.handleItemClick}
              as={NavLink}
              to="/profile"
            >
              <div>
                <ProfileImage />
                Profile
              </div>
            </Menu.Item>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Nav;
