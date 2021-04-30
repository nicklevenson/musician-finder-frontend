import { Component } from "react";
import { Icon } from "semantic-ui-react";
import ProfileImage from "../Users/ProfileImage";
import NotificationIcon from "../Notifications/NotificationIcon";

import anime from "animejs";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      activeItem: "home",
    };
  }
  handleItemClick = (e) => {
    e.preventDefault();
    let index = 0;

    while (!e.target.getAttribute("name")) {
      console.log(e.target);
      if (index > 4) return false;
      e.target = e.target.parentNode;
      index++;
    }

    window.location.href = `/${e.target.getAttribute("name")}`;
    this.setState({
      isActive: false,
      activeItem: e.target.getAttribute("name"),
    });
  };

  handleHamburgerClick = (e) => {
    e.preventDefault();

    if (!e.target.classList.contains("hamburger")) {
      e.target = e.target.parentNode;
    }

    e.target.classList.toggle("is-active");
    this.setState({ isActive: !this.state.isActive }, () =>
      this.animateButtons()
    );
  };

  animateButtons = () => {
    console.log("animating buttons!");
    let buttons = document.querySelectorAll(".main-nav-dropdown-menu button");
    console.log(buttons);
    anime({
      targets: buttons,
      opacity: 1,
      delay: anime.stagger(150),
    });
  };

  render() {
    return (
      <>
        <div className="main-navigation">
          <div className="main-logo-container">
            <button target="/home">
              <Icon name="music" size="large" />
              Matchup Music
            </button>
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
        <div
          className={
            this.state.isActive
              ? "main-nav-dropdown-menu is-active"
              : "main-nav-dropdown-menu"
          }
        >
          {this.state.isActive ? (
            <>
              <button name="home" onClick={(e) => this.handleItemClick(e)}>
                <Icon name="home" size="large" />
                Home
              </button>

              <button name="messaging" onClick={(e) => this.handleItemClick(e)}>
                <Icon name="chat" size="large" />
                Messaging
              </button>

              <button
                name="notifications"
                onClick={(e) => this.handleItemClick(e)}
              >
                <NotificationIcon />
                Notifications
              </button>

              <button name="profile" onClick={(e) => this.handleItemClick(e)}>
                <ProfileImage />
                Profile
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default Nav;
