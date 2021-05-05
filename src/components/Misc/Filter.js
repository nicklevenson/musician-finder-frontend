import React from 'react'
import RangeSlider from './RangeSlider'
import {connect} from 'react-redux'
import {fetchUserRecs} from '../../actions/useractions'
class Filter extends React.Component {
  state = {
    rangeSliderValue: 0
  }

  handleRangeSliderChange = (e) => {
    this.setState({rangeSliderValue: parseInt(e.target.value)})
  }

  sendFilters = (e) => {
    e.preventDefault()
    const paramsobj = {
      mileRange: this.state.rangeSliderValue
    }
    this.props.fetchUserRecs(paramsobj)
  }
  render(){
    return(
      <div className="filter">
        Filter Users:
        <RangeSlider rangeSliderValue={this.state.rangeSliderValue} changeFunction={this.handleRangeSliderChange}/>
        <button onClick={this.sendFilters}>Apply Filters</button>
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