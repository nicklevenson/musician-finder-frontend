

const RangeSlider = (props) => {
  return(
    <div className="slider-container">
      <div>By Distance</div>
      <label htmlFor="range slider"></label>
      <input className="range-slider" name="range slider" type="range" min="1" max="500" value={props.rangeSliderValue} onInput={e => props.changeFunction(e)}/>
      <div className="range-value">{props.rangeSliderValue}{props.rangeSliderValue === 500 ? "+" : null} miles from your location</div>
    </div>
  )
}

export default RangeSlider