import React from 'react'

import {Card, Icon, Image} from 'semantic-ui-react'
import ConnectForm from './ConnectForm'

class PreviewUserCard extends React.Component {

  renderSimilarTags = () => {
    if (this.props.similar_tags && this.props.similar_tags.length !== 0) {
      return (
        <Card.Content>You both like: {this.props.similar_tags.slice(0, 10).join(", ")}</Card.Content>
      )
    }
  }

  render(){
    return(
      <div style={{display:"inline-block", margin:"1vw", whiteSpace:"normal", width:"80%", maxWidth: "min-content"}}>
        <Card raised style={{height:"min-content"}}>
          <Card.Content >
            <Image
              size='tiny'
              circular
              src={this.props.user.photo || this.props.user.providerImage}
             centered
            />
          </Card.Content>
          <Card.Content>
         
            <Card.Header floated="left">{this.props.user.username}</Card.Header>
            {/* <Card.Meta>
              <span className='date'>Joined {this.props.user.created_at.split("T")[0]}</span>
            </Card.Meta> */}
            <Card.Meta>
              <span className='location'>Location: {this.props.user.location || "Earth"}</span>
            </Card.Meta>

            <Card.Content>
              {this.props.user.bio ?  this.props.user.bio.substring(0, 70) + "..." : "No bio given"}
            </Card.Content>
            <br></br>
            <Card.Meta>
              {this.renderSimilarTags()}
            </Card.Meta>

          </Card.Content>
          <Card.Content extra textAlign="center">
            <a>
              <Icon name='user' />
              {this.props.user.connected_users_with_tags.length || "0"} Connections
            </a>
          </Card.Content>
          <Card.Content>
            <ConnectForm focusedUser={this.props.user}/>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default PreviewUserCard