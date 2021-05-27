import React from 'react'
import {connect} from 'react-redux'
import {fetchIncomingRequests} from '../actions/useractions.js'
import PreviewUserCard from '../components/Users/PreviewUserCard'
class IncomingRequestsContainer extends React.Component {

  componentDidMount() {
    this.props.fetchIncomingRequests()
  }
  render(){
    if (this.props.incomingRequests.length > 0){
      return(
        <>
          <div>
            {this.props.incomingRequests.map(user => 
                <PreviewUserCard user={user} key={user.id + "previewcardrequest"} shownUserId={user.id}/>
            )}
          </div>
        </>
      )
    }else{
      return(
        <div style={{}}>
          <i>Incoming Requests</i>
          <hr/>
          No Incoming Requests
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    incomingRequests: state.currentUser.incomingRequests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIncomingRequests: () => dispatch(fetchIncomingRequests())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomingRequestsContainer)