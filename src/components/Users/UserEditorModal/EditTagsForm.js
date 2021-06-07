import { Component } from "react";
import UserTag from "../UserTag";
import { updateUser } from "../../../actions/useractions";
import { connect } from "react-redux";
class EditTagsForm extends Component {
  state = {
    tags: this.props.user.tags,
    tagName: "",
    tagImage: "",
    tagUrl: "",
    tagError: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tagError) {
      this.setState({ tagError: false });
    }
  }

  renderTags = () => {
    try {
      return (
        <div className="tags-container">
          {this.state.tags.map((tag) => {
            return (
              <UserTag
                isEditable="true"
                removeTag={this.removeTag}
                key={tag.id}
                tagId={tag.id}
                info={tag}
              />
            );
          })}
        </div>
      );
    } catch (err) {
      console.warn("error rendering tags", err);
      return "";
    }
  };

  removeTag = (e, tag) => {
    e.preventDefault();
    this.setState((state) => ({
      tags: state.tags.filter((t) => t.name !== tag.name),
    }));
  };

  handleInputChange = (e) => {
    switch (e.target.name) {
      case "tag-name":
        return this.setState({ tagName: e.target.value });
      case "tag-image":
        return this.setState({ tagImage: e.target.value });
      case "tag-url":
        return this.setState({ tagUrl: e.target.value });
      default:
        return;
    }
  };

  addTag = (e) => {
    e.preventDefault();
    const tag = {
      name: this.state.tagName,
      image_url: this.state.tagUrl,
      link: this.state.tagUrl,
      tag_type: "custom",
    };
    if (tag.name !== "") {
      this.setState((state) => ({
        tags: [tag].concat(state.tags),
      }));
    } else {
      this.setState({ tagError: true });
    }
  };

  render() {
    const tags = this.renderTags();
    return (
      <form>
        <div className="form-group">
          <label htmlFor="tag-name">Tag Name</label>
          {this.state.tagError ? <i>Can't be blank</i> : null}
          <input
            name="tag-name"
            type="text"
            placeholder="Breakfast Potato"
            value={this.state.tagName}
            onInput={(e) => this.handleInputChange(e)}
            required={true}
            className={this.state.tagError ? "input-error" : null}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag-image">Tag Image (Optional)</label>
          <input
            type="text"
            name="tag-image"
            placeholder={`https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80`}
            value={this.state.tagImage}
            onInput={(e) => this.handleInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag-url">Tag URL (Optional)</label>
          <input
            name="tag-url"
            type="text"
            placeholder="https://my_cool_website.com/"
            value={this.state.tagUrl}
            onInput={(e) => this.handleInputChange(e)}
          />
        </div>
        <button
          className="save-btn"
          type="button"
          onClick={(e) => this.addTag(e)}
        >
          Add Tag
        </button>
        <button className="save-btn" type="button">
          Update My Tags
        </button>

        {tags}
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userParams) => dispatch(updateUser(userParams)),
  };
};

export default connect(null, mapDispatchToProps)(EditTagsForm);
