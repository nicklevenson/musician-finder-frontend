import React from 'react'
import {connect} from 'react-redux'
import {Grid, Rail, Segment} from 'semantic-ui-react'
import UserCard from '../components/UserCard'
import RecommendedUsersCarousel from './RecommendedUsersCarousel'
import PreviewUserCard from '../components/PreviewUserCard'
import LoginCard from '../components/LoginCard'
import IncomingRequestsContainer from './IncomingRequestsContainer'

import {fetchConnections} from '../actions/useractions'
class ConnectionsContainer extends React.Component {
  componentDidMount = () => {
    this.props.fetchConnections()
  }
  render(){
    return(
      <Grid relaxed padded centered columns={3}>
          <Grid.Column>
              <div style={{height: "70vh", textAlign:"center"}}>
                {this.props.currentUser.username ? <RecommendedUsersCarousel/> : null}
              </div>
          </Grid.Column>  
                
          

          <Grid.Column>
            <>
              <i>Your Connections</i>
                <hr/>
                {this.props.connectedUsers ? 
                <div className="side-swipe">
                  {this.props.connectedUsers.map(u => 
                      <PreviewUserCard user={u.user} similar_tags={u.similar_tags}/>
                  )}
                </div>
                : null}  
            </>
          </Grid.Column>

        </Grid>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchConnections: () => dispatch(fetchConnections())
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    connectedUsers: state.currentUser.connectedUsers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsContainer)