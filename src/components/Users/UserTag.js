import { Component } from "react";

class UserTag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getContainerClass() {
    let parentClass = "user-tag";
    let { tag_type } = this.props.info;
    if (tag_type === "spotify_artist") parentClass += " spotify";
    return parentClass;
  }

  getImage() {
    if (this.props.info.image_url) {
      return <img src={this.props.info.image_url} alt="artist" />;
    } else return "";
  }

  render() {
    const parentClass = this.getContainerClass();
    const image = this.getImage();
    return (
      <div className={parentClass}>
        <div className="tag-title">{this.props.info.name}</div>
        <div className="image-container">{image}</div>
      </div>
    );
  }
}

export default UserTag;
