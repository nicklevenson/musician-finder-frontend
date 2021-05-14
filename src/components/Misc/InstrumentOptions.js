import React from 'react'


class InstrumentOptions extends React.Component {
  state = {
    instruments: [],
    inputQuery: ""
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.setInstruments(this.state.instruments.map(inst => inst.name))
    }
  }

  setInputQuery = (e) => {
    this.setState({inputQuery: e.target.value})
  }

  handleClick = (e) => {
    e.preventDefault()
    if (!this.state.instruments.map(inst => inst.name).includes(this.state.inputQuery)){
      this.setState((state) => ({
        instruments: state.instruments.concat({name: state.inputQuery, id: state.instruments.length + 1})
      }))
    }
  }

  handleDelete = (e, instrument) => {
    e.preventDefault()
    const instrumentArray = [...this.state.instruments]
    const newInstrumentArray = instrumentArray.filter(inst=> inst.id !== instrument.id);

    this.setState({instruments: newInstrumentArray})
  }
  render(){
    return(
      <div className="instruments-filter">
        <label htmlFor="instruments filter">By Instruments</label>
        <br/>
        <input 
          name="instruments filter" 
          className="filter-input" 
          placeholder="Search for Instrument" 
          value={this.state.inputQuery}
          onInput={e => this.setInputQuery(e)}
        />
        <button onClick={e => this.handleClick(e)}>Add</button>

        <div className="instrument-filter-results">
          {this.state.instruments?.map(instrument => {
            return <div className="instrument-filter-tag" key={instrument.id}>
              {instrument.name}
              <button onClick={e => this.handleDelete(e, instrument)}>X</button>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default InstrumentOptions