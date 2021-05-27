import React from "react";
import { connect } from "react-redux";

class GenreOptions extends React.Component {
  state = {
    inputQuery: "",
    results: [],
  };

  setInputQuery = (e) => {
    this.setState({ inputQuery: e.target.value });
    const filteredGenres = this.props.genres
      .filter((genre) => {
        return genre.toLowerCase().includes(e.target.value.toLowerCase());
      })
      .splice(0, 30);
    this.setState({ results: filteredGenres });
  };

  handleClick = (e) => {
    e.preventDefault();
    const selection = e.target.innerText;
    this.props.setGenres(selection);
  };

  render() {
    return (
      <div className="genres-filter">
        <label htmlFor="genres filter">By Genres</label>
        <br />
        <input
          name="genres filter"
          className="filter-input"
          placeholder="Search for Genre"
          value={this.state.inputQuery}
          onInput={(e) => this.setInputQuery(e)}
        />

        <div
          className="genre-results options"
          onClick={(e) => this.handleClick(e)}
        >
          {this.state.results.map((result) => {
            return <div>{result}</div>;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genres: state.lists.genres,
  };
};

export default connect(mapStateToProps)(GenreOptions);
