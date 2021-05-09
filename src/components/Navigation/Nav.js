import { Component } from "react";
import { Icon } from "semantic-ui-react";
import ProfileImage from "../Users/ProfileImage";
import NotificationIcon from "../Notifications/NotificationIcon";
import MessageIcon from "../Messages/MessageIcon"
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

    this.setState({ isActive: !this.state.isActive }, () => {
      e.target.classList.toggle("is-active");

      if (this.state.isActive) {
        this.animateButtonsIn();
      } else this.animateButtonsOut();
    });
  };

  animateButtonsIn = () => {
    console.log("animating buttons!");
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
    console.log("animating buttons out!");
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
          <div className="main-logo-container">
            <button target="/home">
              <Icon name="music" size="large" />
              <i>PB&Jam</i>
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
        <div className="main-nav-dropdown-menu">
          <>
            <button name="home" onClick={(e) => this.handleItemClick(e)}>
              <Icon name="home" size="large" />
              Home
            </button>

            <button name="messaging" onClick={(e) => this.handleItemClick(e)}>
              <MessageIcon/>
              Messages
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
        </div>
      </>
    );
  }
}

export default Nav;
