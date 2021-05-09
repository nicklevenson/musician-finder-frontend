import { Component } from "react";
import UserTag from "../UserTag";

class EditTagsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.user.tags,
    };

    this.removeTag = this.removeTag.bind(this);
  }

  renderTags() {
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
  }

  removeTag(e) {
    e.preventDefault();
    let id = e.target;
    id = id.getAttribute("data-id");
    id = parseInt(id);
    let tags = this.state.tags;

    tags.forEach((tag, index) => {
      if (tag.id === id) {
        tags.splice(index, 1);
        return;
      }
    });
    this.setState({ tags });
  }

  render() {
    const tags = this.renderTags();
    return (
      <form>
        <div className="form-group">
          <label htmlFor="tag-name">Tag Name</label>
          <input name="tag-name" type="text" placeholder="Breakfast Potato" />
        </div>
        <div className="form-group">
          <label htmlFor="tag-image">Tag Image (Optional)</label>
          <input
            type="text"
            name="tag-image"
            placeholder={`https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag-url">Tag URL (Optional)</label>
          <input
            name="tag-url"
            type="text"
            placeholder="https://my_cool_website.com/"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag-type">tag type</label>
          <input name="tag-type" type="text" placeholder="favorite artist" />
        </div>
        {tags}
        <button className="save-btn" type="button">
          Update Tags
        </button>
      </form>
    );
  }
}

export default EditTagsForm;
