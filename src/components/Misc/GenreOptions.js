import React from 'react'


class GenreOptions extends React.Component {
  state = {
    inputQuery: ""
  }

  setInputQuery = (e) => {
    this.setState({inputQuery: e.target.value})
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.setGenres(this.state.inputQuery)
  }

  
  render(){
    return(
      <div className="genres-filter">
        <label htmlFor="genres filter">By Genres</label>
        <br/>
        <input 
          name="genres filter" 
          className="filter-input" 
          placeholder="Search for Genre" 
          value={this.state.inputQuery}
          onInput={e => this.setInputQuery(e)}
        />
        <button onClick={e => this.handleClick(e)}>Add</button>
      </div>
    )
  }
}

export default GenreOptions