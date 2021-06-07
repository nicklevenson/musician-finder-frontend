import React from "react";
import { connect } from "react-redux";

class LocationSearch extends React.Component {
  state = {
    query: this.props.location,
    results: [],
  };

  componentDidUpdate() {
    console.log(this.state.locationName, this.state.lng, this.state.lat);
  }

  getResults = () => {
    const location = this.state.query;
    const results = this.props.cities.filter((city) => {
      const cityName = city.city.toLowerCase();
      const provinceName = city.admin_name.toLowerCase();
      if (
        cityName.includes(location.toLowerCase()) ||
        provinceName.includes(location.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    this.setState({ results: results.splice(0, 9) });
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
    this.getResults();
  };

  handleResultClick = (e, result) => {
    const location = result.city + ", " + result.admin_name;
    // this.setState({ locationName: location });
    this.setState({ query: location, results: [] });
    // this.setState({ lng: result.lng });
    // this.setState({ lat: result.lat });
    const locationObj = {
      location: location,
      lng: result.lng,
      lat: result.lat,
    };
    this.props.handleLocationChange(locationObj);
  };

  inputIsValid = () => {
    if (this.props.selectedLocation === this.state.query) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <>
        {!this.inputIsValid() ? <i>Please select a valid location</i> : null}
        <input
          aria-label="location search"
          value={this.state.query}
          onChange={(e) => this.handleChange(e)}
          className={this.inputIsValid() ? null : "input-error"}
        />
        <div className="location-results options">
          {this.state.results.map((result) => (
            <div
              key={result.city + ", " + result.admin_name}
              className="location-result"
              onClick={(e) => this.handleResultClick(e, result)}
            >
              {result.city}, {result.admin_name}
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.lists.cities,
  };
};

export default connect(mapStateToProps)(LocationSearch);
