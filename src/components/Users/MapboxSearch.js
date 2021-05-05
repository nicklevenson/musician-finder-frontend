import React from 'react'
import cities from '../../cities.json'

class MapboxSearch extends React.Component {

  state = {
    query: "",
    results: [],
    locationName: null,
    lng: null,
    lat: null
  }

  getResults = () => {
    const location = this.state.query
    // if (location !== ""){
    //   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?types=place&access_token=${process.env.REACT_APP_MAPBOX}`)
    //   .then(resp => resp.json())
    //   .then(json => {
    //     if (json.features){
    //       this.setState({results: json.features})
    //     }
    //   })
    // }
  
    const results = cities.filter(city => {
        const cityName = city.city.toLowerCase()
        const provinceName = city.admin_name.toLowerCase()
        if (cityName.includes(this.state.query.toLowerCase()) || provinceName.includes(this.state.query.toLowerCase())){
          return true
        }
    })
    console.log(results)
  } 

  handleChage = (e) => {
    this.setState({query: e.target.value})
    this.getResults()
  }

  handleResultClick = (e, result) => {
    // this.setState({locationName: result.place_name})
    // this.setState({query: result.place_name})
    // this.setState({lng: result.center[0]})
    // this.setState({lat: result.center[1]})
  }
  render(){
    return(
      <>
        <label htmlFor="search for location">Search for location</label>
        <input name="search for location" value={this.state.query} onChange={e => this.handleChage(e)}/>
        <div className="location-results">
          {this.state.results.map(result => <div className="location-result" onClick={e => this.handleResultClick(e, result)}>{result.place_name}</div>)}
        </div>
      </>
    )
  }
}

export default MapboxSearch