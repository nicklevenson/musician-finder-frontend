import React from 'react'
import {connect} from 'react-redux'
import {Card, Icon, Image} from 'semantic-ui-react'
class UserCard extends React.Component {
  render(){
    return(
        <Card>
          <Card.Content>
            <Image
              size='tiny'
              circular
              src={this.props.currentUser.photo || this.props.currentUser.providerImage}
            />
            <br/><br/>
            <Card.Header>{this.props.currentUser.username}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined {this.props.currentUser.created_at.split("T")[0]}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.currentUser.bio || "No bio given"}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {this.props.currentUser.connections || "0"} Connections
            </a>
          </Card.Content>
        </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(UserCard)