import { Component } from "react";

class UserTag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("mounting User Tag", this.props);
  }

  getContainerClass() {
    let parentClass = "user-tag";
    let { tag_type } = this.props.info;
    console.log(tag_type);
    if (tag_type === "spotify_artist") parentClass += " spotify";
    return parentClass;
  }

  getImage() {
    if (this.props.info.spotify_image_url) {
      return <img src={this.props.info.spotify_image_url} alt="artist" />;
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
