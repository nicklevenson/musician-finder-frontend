import { connect } from "react-redux";
import { Component } from "react";
import GenreOptions from "../../Misc/GenreOptions";
import GenericTag from "../../Tags/GenericTag";
import { updateUser } from "../../../actions/useractions";
class EditGenresForm extends Component {
  state = {
    genres: this.props.user.genres.map((genre) => genre.name),
  };

  updateGenres = (e) => {
    e.preventDefault();
    this.props.updateUser({
      genres_attributes: this.state.genres.map((genre) => {
        return { name: genre };
      }),
    });
  };

  setGenres = (genre) => {
    console.log(genre);
    this.setState((state) => ({
      genres: state.genres.concat(genre),
    }));
  };

  render() {
    return (
      <>
        <form>
          <div className="form-group">
            <GenreOptions setGenres={this.setGenres} />
          </div>
          <div>
            {this.state.genres.map((genre) => (
              <GenericTag tag={genre} />
            ))}
          </div>
          <button
            className="save-btn"
            type="button"
            onClick={(e) => this.updateGenres(e)}
          >
            Update Genres
          </button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userParams) => dispatch(updateUser(userParams)),
  };
};

export default connect(null, mapDispatchToProps)(EditGenresForm);
