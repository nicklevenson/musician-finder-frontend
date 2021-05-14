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

  setInstruments = (instruments) => {
    this.setState({instruments: instruments})
  }

  sendFilters = (e) => {
    e.preventDefault()
    const paramsobj = {
      mileRange: this.state.rangeSliderValue
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

  render(){
    return(
      <div className="filter">
        <div className="filter-toggle" onClick={e => this.handleVisibilityToggle()}>Filter Users</div>

        {!this.state.hidden ? 
          <div className="filter-items">
            <RangeSlider rangeSliderValue={this.state.rangeSliderValue} changeFunction={this.handleRangeSliderChange}/>
            <InstrumentOptions setInstruments={this.setInstruments}/>
            <button onClick={this.sendFilters}>Apply Filters</button>
          </div>
        :
          null
        }
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