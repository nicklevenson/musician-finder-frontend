import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Card, Icon, Image} from 'semantic-ui-react'
import ConnectForm from '../components/ConnectForm'
import CurrentUserProfile from '../components/CurrentUserProfile'
class UserShowContainer extends React.Component {
  state = {
    shownUser: {
      username: "loading...",
      location: "...",
      bio: "...",
      photo: null,
      providerImage: "...",
      connected_users_with_tags: []
    },
    similar_tags: []
  }

  componentDidMount() {
    if (this.props.match){
      this.fetchShownUser()
      this.fetchSimilarTags()
    }else{
      this.setState({shownUser: this.props.currentUser})
    }
  }

 

  renderSimilarTags = () => {
    if (this.state.similar_tags && this.state.similar_tags.length > 0 && this.props.currentUser.id != this.state.shownUser.id) {
      return (
        <Card.Content>You both like: <br/>{this.state.similar_tags.join(", ")}</Card.Content>
      )
    }
  }

  fetchShownUser = () => {
    const userId = this.props.match.params.id
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`
      }
    })
    .then(res => res.json())
    .then(json => {
      this.setState({shownUser: json})
    })
    .catch(function(error) {
        alert("Error getting shown user.")
    })
  }

  fetchSimilarTags = () => {
    const userId = this.props.match.params.id
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/get_similar_tags/${sessionStorage.userId}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`
      }
    })
    .then(res => res.json())
    .then(json => {
      this.setState({similar_tags: json})
    })
    .catch(function(error) {
        alert("Error getting tags.")
    })
  }


  render(){
    return(
     
         <Card style={{width: "80%", margin: "0 auto 0 auto"}}>
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
          <Card.Meta>
              {this.renderSimilarTags()}
          </Card.Meta>
          <br/>
          <Card.Content extra textAlign="center">
            <a>
              <Icon name='user' />
              {this.state.shownUser.connected_users_with_tags ? this.state.shownUser.connected_users_with_tags.length : null} Connections
            </a>
          </Card.Content>
          <Card.Content style={{width: "50%", margin:"auto"}}>
            <ConnectForm focusedUser={this.state.shownUser}/>
          </Card.Content>

          {this.state.shownUser.id === this.props.currentUser.id ? <Card.Content extra><CurrentUserProfile/></Card.Content>: null} 
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

