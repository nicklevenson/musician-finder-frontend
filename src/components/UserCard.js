import React from 'react'

import {Card, Icon, Image} from 'semantic-ui-react'
class UserCard extends React.Component {

  renderSimilarTags = () => {
    if (this.props.similar_tags && this.props.similar_tags.length !== 0) {
      return (
        <Card.Content>You both like: <br/>{this.props.similar_tags.join(", ")(t => <i>|{t}|</i>)}</Card.Content>
      )
    }
  }

  render(){
    return(
      <div >
        <Card raised>
          <Card.Content textAlign="center">
            <Image
              size='tiny'
              circular
              src={this.props.user.photo || this.props.user.providerImage}
            />
            <br/><br/>
            <Card.Header>{this.props.user.username}</Card.Header>
            {/* <Card.Meta>
              <span className='date'>Joined {this.props.user.created_at.split("T")[0]}</span>
            </Card.Meta> */}
            <Card.Meta>
              <span className='location'>Location: {this.props.user.location || "Earth"}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.user.bio || "No bio given"}
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <a>
              <Icon name='user' />
              {this.props.user.connected_users_with_tags.length || "0"} Connections
            </a>
          </Card.Content>
          {this.renderSimilarTags()}
        </Card>
      </div>
    )
  }
}

export default UserCard