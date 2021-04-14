import React from 'react'

import {Card, Icon, Image} from 'semantic-ui-react'
class UserCard extends React.Component {
  render(){
    return(
      <div style={{margin: "2vw"}}>
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
              {this.props.user.connections || "0"} Connections
            </a>
          </Card.Content>
          <Card.Meta>
            {this.props.user.similar_tags ? this.props.user.similar_tags.map(t => <i>t</i>) : null}
          </Card.Meta>
        </Card>
      </div>
    )
  }
}

export default UserCard