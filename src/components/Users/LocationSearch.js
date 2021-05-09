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
    const results = cities.filter(city => {
        const cityName = city.city.toLowerCase()
        const provinceName = city.admin_name.toLowerCase()
        if (cityName.includes(location.toLowerCase()) || provinceName.includes(location.toLowerCase())){
          return true
        }else{
          return false
        }
    })

    this.setState({results: results.splice(0, 9)})
  } 

  handleChange = (e) => {
    this.setState({query: e.target.value})
    this.getResults()
  }

  handleResultClick = (e, result) => {
    const location = result.city + ", " + result.admin_name
    this.setState({locationName: location})
    this.setState({query: location})
    this.setState({lng: result.lng})
    this.setState({lat: result.lat})
  }
  render(){
    return(
      <>
        <label htmlFor="search for location">Search for location</label>
        <input name="search for location" value={this.state.query} onChange={e => this.handleChange(e)}/>
        <div className="location-results">
          {this.state.results.map(result => <div key={result.city + ", " + result.admin_name} className="location-result" onClick={e => this.handleResultClick(e, result)}>{result.city}, {result.admin_name}</div>)}
        </div>
      </>
    )
  }
}

export default MapboxSearch