import React from 'react'
import {Link} from 'react-router-dom'

class CurrentUserProfile extends React.Component {
  render(){
    return(
      <h5><Link to="/logout">Logout</Link></h5>
    )
  }
}

export default CurrentUserProfile