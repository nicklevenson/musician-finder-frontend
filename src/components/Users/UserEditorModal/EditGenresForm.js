import { Component } from "react";
import GenreOptions from "../../Misc/GenreOptions";
import GenericTag from "../../Tags/GenericTag";
class EditGenresForm extends Component {
  state = {
    genres: this.props.user.genres.map((genre) => genre.name),
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
          <button className="save-btn" type="button">
            Update Genres
          </button>
        </form>
      </>
    );
  }
}

export default EditGenresForm;
