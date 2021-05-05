

const RangeSlider = (props) => {
  return(
    <div className="slider-container">
      <input type="range" min="1" max="500" value={props.rangeSliderValue} onInput={e => props.changeFunction(e)}/>
      <>{props.rangeSliderValue}{parseInt(props.rangeSliderValue) === 500 ? "+" : null} miles</>
    </div>
  )
}

export default RangeSlider