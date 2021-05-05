

const RangeSlider = (props) => {
  return(
    <div className="slider-container">
      <input type="range" min="1" max="500" value={props.rangeSliderValue} onInput={e => props.changeFunction(e)}/>
      <div className="range-value">{props.rangeSliderValue}{props.rangeSliderValue === 500 ? "+" : null} miles from your location</div>
    </div>
  )
}

export default RangeSlider