import React from 'react'
import {connect} from 'react-redux'
import {fetchIncomingRequests} from '../actions/useractions.js'
import PreviewUserCard from '../components/PreviewUserCard'
class IncomingRequestsContainer extends React.Component {

  componentDidMount() {
    this.props.fetchIncomingRequests()
  }
  render(){
    if (this.props.incomingRequests.length > 0){
      return(
        <>
        <i>Incoming Requests</i>
        <hr/>
        <div className="side-swipe">
          {this.props.incomingRequests.map(u => 
              <PreviewUserCard user={u.user} similar_tags={u.similar_tags}/>
            )}
        </div>
        </>
      )
    }else{
      return(
        null
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