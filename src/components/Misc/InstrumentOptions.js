import React from "react";
import { connect } from "react-redux";

class InstrumentOptions extends React.Component {
  state = {
    inputQuery: "",
    results: [],
  };

  setInputQuery = (e) => {
    this.setState({ inputQuery: e.target.value });
    const filteredInstruments = this.props.instruments
      .filter((instrument) => {
        return instrument.toLowerCase().includes(e.target.value.toLowerCase());
      })
      .splice(0, 30);
    this.setState({ results: filteredInstruments });
  };

  handleClick = (e) => {
    e.preventDefault();
    const selection = e.target.innerText;
    this.props.setInstruments(selection);
  };

  render() {
    return (
      <div className="instruments-filter">
        <label htmlFor="instruments filter">By Instruments</label>
        <br />
        <input
          name="instruments filter"
          className="filter-input"
          placeholder="Search for Instrument"
          value={this.state.inputQuery}
          onInput={(e) => this.setInputQuery(e)}
        />

        <div
          className="instruments-results options"
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
    instruments: state.lists.instruments,
  };
};

export default connect(mapStateToProps)(InstrumentOptions);
