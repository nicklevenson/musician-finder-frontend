import React from 'react'
import {connect} from 'react-redux'
import RangeSlider from './RangeSlider'
import InstrumentOptions from './InstrumentOptions'
import GenreOptions from './GenreOptions'
import {fetchUserRecs} from '../../actions/useractions'
class Filter extends React.Component {
  state = {
    hidden: true,
    rangeSliderValue: 500,
    instruments: [],
    genres: []
  }

  handleRangeSliderChange = (e) => {
    this.setState({rangeSliderValue: parseInt(e.target.value)})
  }

  setInstruments = (instrument) => {
    const newInstrument = {name: instrument, id: this.state.instruments.length}
    if (!this.state.instruments.map(inst => inst.name).includes(instrument)){
      this.setState((state) => ({
        instruments: state.instruments.concat(newInstrument)
      }))
    }
  }

  setGenres = (genre) => {
    const newGenre = {name: genre, id: this.state.genres.length}
    if (!this.state.genres.map(gen => gen.name).includes(genre)){
      this.setState((state) => ({
        genres: state.genres.concat(newGenre)
      }))
    }
  }

  sendFilters = (e) => {
    e.preventDefault()
    const paramsobj = {
      mileRange: this.state.rangeSliderValue,
      instruments: this.state.instruments.map(inst => inst.name),
      genres: this.state.genres.map(gen => gen.name)
    }
    this.props.fetchUserRecs(paramsobj)
    this.setState({hidden: true})
  }

  handleVisibilityToggle = () => {
    if (this.state.hidden === true) {
      this.setState({hidden: false})
    }else{
      this.setState({hidden: true})
    }
  }


  handleDeleteInstrument = (e, instrument) => {
    e.preventDefault()
    const instrumentArray = [...this.state.instruments]
    const newInstrumentArray = instrumentArray.filter(inst=> inst.id !== instrument.id);
    this.setState({instruments: newInstrumentArray})
  }


  handleDeleteGenre = (e, genre) => {
    e.preventDefault()
    const genreArray = [...this.state.genres]
    const newGenreArray = genreArray.filter(gen=> gen.id !== genre.id);
    this.setState({genres: newGenreArray})
  }

  render(){
    return (
      <div className="filter">
        <div
          className="filter-toggle"
          onClick={(e) => this.handleVisibilityToggle()}
        >
          Filter Users
        </div>
        <hr />
        {!this.state.hidden ? (
          <div className="filter-items">
            <RangeSlider
              rangeSliderValue={this.state.rangeSliderValue}
              changeFunction={this.handleRangeSliderChange}
            />
            <InstrumentOptions setInstruments={this.setInstruments} />
            <br />
            <GenreOptions setGenres={this.setGenres} />
            <br />
            <hr/>
          </div>
        ) : null}

        <div className="filter-state">
          <div className="filter-tag">
            Range:{" "}
            {this.state.rangeSliderValue >= 500
              ? "500+ Miles Away"
              : this.state.rangeSliderValue + " Miles Away"}
          </div>
          
          {this.state.instruments?.map((instrument) => {
            return (
              <div className="filter-tag" key={instrument.id}>
                {instrument.name}
                {!this.state.hidden ? (
                  <button
                    onClick={(e) => this.handleDeleteInstrument(e, instrument)}
                  >
                    X
                  </button>
                ) : null}
              </div>
            );
          })}

          {this.state.genres?.map((genre) => {
            return (
              <div className="filter-tag" key={genre.id}>
                {genre.name}
                {!this.state.hidden ? (
                  <button onClick={(e) => this.handleDeleteGenre(e, genre)}>
                    X
                  </button>
                ) : null}
              </div>
            );
          })}

          {!this.state.hidden ? (
            <>
              <hr />
              <button onClick={this.sendFilters}>Apply Filters</button>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRecs: (filterParamsObject) => dispatch(fetchUserRecs(filterParamsObject))
  }
}
export default connect(null, mapDispatchToProps)(Filter)