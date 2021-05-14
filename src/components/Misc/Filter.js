import React from 'react'
import {connect} from 'react-redux'
import RangeSlider from './RangeSlider'
import InstrumentOptions from './InstrumentOptions'
import {fetchUserRecs} from '../../actions/useractions'
class Filter extends React.Component {
  state = {
    hidden: true,
    rangeSliderValue: 500,
    instruments: []
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

  sendFilters = (e) => {
    e.preventDefault()
    const paramsobj = {
      mileRange: this.state.rangeSliderValue,
      instruments: this.state.instruments.map(inst => inst.name)
    }
    this.props.fetchUserRecs(paramsobj)
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

  render(){
    return(
      <div className="filter">
        <div className="filter-toggle" onClick={e => this.handleVisibilityToggle()}>Filter Users</div>
        <hr/>
        {!this.state.hidden ? 
          <div className="filter-items">
            <RangeSlider rangeSliderValue={this.state.rangeSliderValue} changeFunction={this.handleRangeSliderChange}/>
            <InstrumentOptions setInstruments={this.setInstruments}/><br/>
            <button onClick={this.sendFilters}>Apply Filters</button><hr/><br/>
          </div>
        :
          null
        }

        
        <div className="filter-state">
          <div className="filter-tag">
            Range: {this.state.rangeSliderValue >= 500 ? "500+ Miles Away" : this.state.rangeSliderValue + " Miles Away"}
          </div>
          {this.state.instruments?.map(instrument => {
            return( 
            <div className="filter-tag" key={instrument.id}>
              {instrument.name}
              <button onClick={e => this.handleDeleteInstrument(e, instrument)}>X</button>
            </div>
          )})}
        </div>

      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRecs: (filterParamsObject) => dispatch(fetchUserRecs(filterParamsObject))
  }
}
export default connect(null, mapDispatchToProps)(Filter)