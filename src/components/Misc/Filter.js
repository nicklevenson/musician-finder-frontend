import React from 'react'
import RangeSlider from './RangeSlider'

class Filter extends React.Component {
  state = {
    rangeSliderValue: 0
  }

  handleRangeSliderChange = (e) => {
    this.setState({rangeSliderValue: e.target.value})
  }
  render(){
    return(
      <div className="filter">
        Filter Users:
        <RangeSlider rangeSliderValue={this.state.rangeSliderValue} changeFunction={this.handleRangeSliderChange}/>
      </div>
    )
  }
}

export default Filter