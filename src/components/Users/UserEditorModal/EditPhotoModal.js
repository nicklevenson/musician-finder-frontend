import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../actions/useractions";
class EditPhotoModal extends React.Component {
  state = {
    photo: null,
  };

  handlePhotoUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (file.size < 3000000) {
        this.setState({ photo: file }, () => {
          this.updatePhoto();
        });
        this.setState({ photoError: null });
      } else {
        this.setState({ photoError: "Photo Too Large" });
      }
    }
  };

  updatePhoto = () => {
    if (this.state.photo) {
      this.setState({ uploading: true });
      const formData = new FormData();
      formData.append("photo", this.state.photo);
      const userId = sessionStorage.userId;
      const configObj = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${userId}`,
          Accept: "application/json",
          enctype: "multipart/form-data",
        },
        body: formData,
      };
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/upload_photo`,
        configObj
      )
        .then((res) => res.json())
        .then((json) => {
          this.setState({ uploading: false });
          this.props.fetchUser();
        })
        .catch((error) => {
          console.warn("Error uploading: \n", error);
          this.setState({ photoError: "Error please try again" });
        });
    }
  };

  render() {
    return (
      <>
        <div className="photo-editor-modal edit-image-overlay">
          <form>
            <label htmlFor="img">
              {this.state.photoError
                ? this.state.photoError
                : this.state.uploading
                ? "Uploading..."
                : "Upload New"}
            </label>
            <input
              className="inputfile"
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={(e) => this.handlePhotoUpload(e)}
              disabled={this.state.uploading ? true : false}
            />
          </form>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(null, mapDispatchToProps)(EditPhotoModal);
