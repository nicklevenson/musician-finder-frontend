import React from 'react'


class InstrumentOptions extends React.Component {
  state = {
    inputQuery: ""
  }

  setInputQuery = (e) => {
    this.setState({inputQuery: e.target.value})
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.setInstruments(this.state.inputQuery)
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
      </div>
    )
  }
}

export default InstrumentOptions