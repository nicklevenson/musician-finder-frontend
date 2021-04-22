import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Card, Icon, Image} from 'semantic-ui-react'
class UserShowContainer extends React.Component {
  state = {
    shownUser: {
      username: "loading...",
      location: "...",
      bio: "...",
      photo: null,
      providerImage: "...",
      connected_users_with_tags: []
      
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.id
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt}`
      }
    })
    .then(res => res.json())
    .then(json => {
      this.setState({shownUser: json})
    })
    .catch(function(error) {
        alert("Error getting User.")
    })
  }

 

  renderSimilarTags = () => {
    if (this.props.similar_tags && this.props.similar_tags.length !== 0) {
      return (
        <Card.Content>You both like: <br/>{this.props.similar_tags.map(t => <i>|{t}|</i>)}</Card.Content>
      )
    }
  }


  render(){
    return(
       <Card raised>
          <Card.Content textAlign="center">
            <Image
              size='tiny'
              circular
              src={this.state.shownUser.photo || this.state.shownUser.providerImage}
            />
            <br/><br/>
            <Card.Header>{this.state.shownUser.username}</Card.Header>
            {/* <Card.Meta>
              <span className='date'>Joined {this.state.shownUser.created_at.split("T")[0]}</span>
            </Card.Meta> */}
            <Card.Meta>
              <span className='location'>Location: {this.state.shownUser.location || "Earth"}</span>
            </Card.Meta>
            <Card.Description>
              {this.state.shownUser.bio || "No bio given"}
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <a>
              <Icon name='user' />
              {this.state.shownUser.connected_users_with_tags.length || "0"} Connections
            </a>
          </Card.Content>
          {/* {this.renderSimilarTags()} */}
      </Card>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    allUsers: state.currentUser.allUsers
  }
}

export default connect(mapStateToProps)(UserShowContainer)

