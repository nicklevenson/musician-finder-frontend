import React from 'react'
import {connect} from 'react-redux'
import {Button, Icon} from 'semantic-ui-react'
import {requestConnection, acceptConnection, rejectConnection} from '../actions/useractions.js'
class ConnectForm extends React.Component{

  handleConnectionRequest = () => {
    //we need to send current user id and the requested id
    this.props.requestConnection(this.props.focusedUser.id)
  }

  handleConnectionAccept = () => {
    this.props.acceptConnection(this.props.focusedUser.id)
  }

  handleConnectionReject = () => {
    this.props.rejectConnection(this.props.focusedUser.id)
  }

  // handleRemoveConnection = () => {
  //   this.props.removeConnection(thi)
  // }

    //needs current user, current connections, and its pending connections
    //needs user to be requested

    //check if request is pending with this user
      //render gray pending request 
    //check if this user is in current user's current connections
      //render Remove Connection button
    //else
      //render connection request button

  render(){
      if (this.props.currentUser.outgoing_pending_requests.map(u=>u.id).includes(this.props.focusedUser.id)){
        return(
          <Button disabled>
            <Button.Content>Pending</Button.Content>
          </Button>
          
        )
      }else if (this.props.incomingRequests.map(u=>u.user.id).includes(this.props.focusedUser.id)) {
         return(
          <>
            <Button onClick={this.handleConnectionAccept}>
              <Button.Content>Accept</Button.Content>
            </Button>
            <Button onClick={this.handleConnectionReject}>
              <Button.Content>Reject</Button.Content>
            </Button>
          </>
         )
      }else if(this.props.currentUser.connected_users_with_tags.map(u=>u.user.id).includes(this.props.focusedUser.id)){
        return(
          <Button disabled>
            <Button.Content>You and {this.props.focusedUser.username} are connected</Button.Content>
          </Button>
        )
      }else {
        return(
          <Button animated onClick={this.handleConnectionRequest}>
            <Button.Content visible>Request Connection</Button.Content>
            <Button.Content hidden>
              Send? <Icon name='arrow right' />
            </Button.Content>
          </Button>
        )
      }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestConnection: (requested_id) => dispatch(requestConnection(requested_id)),
    acceptConnection: (requesting_user_id) => dispatch(acceptConnection(requesting_user_id)),
    rejectConnection: (requesting_user_id) => dispatch(rejectConnection(requesting_user_id))
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    incomingRequests: state.currentUser.incomingRequests
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectForm)