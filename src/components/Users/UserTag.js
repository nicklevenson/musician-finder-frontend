import { Component } from "react";

class UserTag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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

  isEditable() {
    try {
      if (this.props.isEditable) {
        return (
          <button
            type="button"
            data-id={this.props.tagId}
            onClick={this.props.removeTag}
            className="tag-delete-btn"
          >
            X
          </button>
        );
      } else return "";
    } catch (err) {
      console.warn("error adding delete button to pin", err);
      return "";
    }
  }

  render() {
    const parentClass = this.getContainerClass();
    const image = this.getImage();
    const deleteBt = this.isEditable();
    return (
      <div className={parentClass}>
        <div className="tag-title">{this.props.info.name}</div>
        <div className="image-container">{image}</div>
        {deleteBt}
      </div>
    );
  }
}

export default UserTag;
