import { Component } from "react";
import { Icon } from "semantic-ui-react";
import ProfileImage from "../Users/ProfileImage";
import NotificationIcon from "../Notifications/NotificationIcon";
import MessageIcon from "../Messages/MessageIcon";
import { LogoSvg } from "./LogoSvg";
import anime from "animejs";
import history from "../../history";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      activeItem: "swipe",
    };
  }

  handleNotificationClick = (e) => {
    e.preventDefault();
    history.push(`/notifications`);
  };

  handleItemClick = (e) => {
    e.preventDefault();
    let index = 0;

    while (!e.target.getAttribute("name")) {
      if (index > 4) return false;
      e.target = e.target.parentNode;
      index++;
    }
    // window.location.href = `/${e.target.getAttribute("name")}`;
    this.setState(
      {
        isActive: false,
        activeItem: e.target.getAttribute("name"),
      },
      () => {
        history.push(`/${e.target.getAttribute("name")}`);
      }
    );
    this.animateButtonsOut();
    document.querySelector(".hamburger").classList.toggle("is-active");
    // history.push(`/${e.target.getAttribute("name")}`);
  };

  handleHamburgerClick = (e) => {
    e.preventDefault();

    if (!e.target.classList.contains("hamburger")) {
      e.target = e.target.parentNode;
    }

    this.setState({ isActive: !this.state.isActive }, () => {
      e.target.classList.toggle("is-active");

      if (this.state.isActive) {
        this.animateButtonsIn();
      } else this.animateButtonsOut();
    });
  };

  animateButtonsIn = () => {
    let buttons = document.querySelectorAll(".main-nav-dropdown-menu button");
    let nav = document.querySelector(".main-nav-dropdown-menu");
    nav.classList.toggle("is-active");

    anime
      .timeline({
        easing: "spring(1, 80, 10, 0)",
      })
      .add({
        targets: nav,
        translateY: "0",
        easing: "easeOutQuad",
        duration: 300,
      })
      .add(
        {
          targets: buttons,
          opacity: 1,
          delay: anime.stagger(150),
        },
        100
      );
  };

  animateButtonsOut = () => {
    let buttons = document.querySelectorAll(".main-nav-dropdown-menu button");
    let nav = document.querySelector(".main-nav-dropdown-menu");
    setTimeout(() => nav.classList.toggle("is-active"), 800);

    anime
      .timeline({
        easing: "spring(1, 80, 10, 0)",
        duration: 800,
      })
      .add({
        targets: buttons,
        opacity: 0,
        duration: 500,
        delay: anime.stagger(150, { direction: "reverse" }),
      })
      .add(
        {
          targets: nav,
          translateY: "-120%",
          easing: "linear",
          duration: 300,
        },
        500
      );
  };

  render() {
    return (
      <>
        <div className="main-navigation">
          <div
            className="hamburger"
            onClick={(e) => this.handleHamburgerClick(e)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="main-logo-container">
            <button>
              <LogoSvg />
            </button>
          </div>

          <button
            className="notification-link"
            name="notifications"
            onClick={(e) => this.handleNotificationClick(e)}
            aria-label="notifications"
          >
            <NotificationIcon />
          </button>
        </div>

        <div className="main-nav-dropdown-menu">
          <>
            <button
              name="swipe"
              onClick={(e) => this.handleItemClick(e)}
              aria-label="navigate to swipe"
            >
              <Icon name="home" size="large" />
            </button>

            <button
              name="connections"
              onClick={(e) => this.handleItemClick(e)}
              aria-label="navigate to connections"
            >
              <Icon name="users" size="large" />
            </button>

            <button
              name="messaging"
              onClick={(e) => this.handleItemClick(e)}
              aria-label="navigate messages"
            >
              <MessageIcon />
            </button>

            <button
              name="profile"
              onClick={(e) => this.handleItemClick(e)}
              aria-label="navigate profile"
            >
              <ProfileImage />
            </button>
          </>
        </div>
      </>
    );
  }
}

export default Nav;
