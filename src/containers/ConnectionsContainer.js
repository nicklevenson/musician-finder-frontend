import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Grid, Divider} from 'semantic-ui-react'
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
    if (sessionStorage.jwt){
      return(
        <Grid relaxed padded centered columns={3}>
            <Grid.Column>
                <div style={{maxHeight: "40vh", textAlign:"center", maxWidth:"300px", margin:"auto", width:"min-content"}}>
                  {this.props.currentUser.username ? <IncomingRequestsContainer/> : null}
                </div>
            </Grid.Column> 
            
            <Grid.Column>
              <div >
                <i>Your Connections</i>
                  <hr/>
                  {this.props.connectedUsers.length > 0 ? 
                  <div className="down-swipe"style={{width:"min-content"}} >
                    {this.props.connectedUsers.map(u => 
                        <PreviewUserCard user={u.user} similar_tags={u.similar_tags} key={u.id + "previewcardconnections"}/>
                    )}
                  </div>
                  : "No connected users"}  
             </div>
            </Grid.Column>
            <Grid.Row columns={1}>
              <Grid.Column>
                  <div style={{height: "70vh", width:"80%", margin: "auto"}}>
                    {this.props.currentUser.username ? <RecommendedUsersCarousel/> : null}
                  </div>
              </Grid.Column>  
            </Grid.Row>
        </Grid>
      )
    }else{
      return(
        <Redirect to="/login"></Redirect>
      )
    }
   
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