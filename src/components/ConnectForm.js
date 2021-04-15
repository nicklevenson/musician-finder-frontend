import React from 'react'
import {connect} from 'react-redux'
import {Button, Icon} from 'semantic-ui-react'
class ConnectForm extends React.Component{
  render(){
    //needs current user, current connections, and its pending connections
    //needs user to be requested

    //check if request is pending with this user
      //render gray pending request 
    //check if this user is in current user's current connections
      //render Remove Connection button
    //else
      //render connection request button
      if (this.props.currentUser.outgoing_pending_requests.includes(this.props.focusedUser)){
        return(
          
          <h2>Pending</h2>
        )
      }else if(this.props.currentUser.connected_users.includes(this.props.focusedUser)){
        return(
          <h2>Remove Connection :(</h2>
        )
      }else {
        return(
          <Button animated>
            <Button.Content visible>Request Connection</Button.Content>
            <Button.Content hidden>
              Send? <Icon name='arrow right' />
            </Button.Content>
          </Button>
        )
      }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(ConnectForm)