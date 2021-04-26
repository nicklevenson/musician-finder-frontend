import React from 'react'
import {connect} from 'react-redux'
import UserCard from '../components/UserCard'
import {Grid, Segment, Rail} from 'semantic-ui-react'
import RecommendedUsersCarousel from './RecommendedUsersCarousel'
import PreviewUserCard from '../components/PreviewUserCard'
import LoginCard from '../components/LoginCard'
import IncomingRequestsContainer from './IncomingRequestsContainer'
class HomeContainer extends React.Component {

  renderUserConnections = () => {
    if (this.props.currentUser.connected_users_with_tags){
      if (this.props.currentUser.connected_users_with_tags.length !== 0){
        return this.props.currentUser.connected_users_with_tags.map(u=><PreviewUserCard user={u} key={u.id + "previewcardconnected"}/>)
      }else{
        return <h1>Go find some users to connect with!</h1>
      }
    }
    
  }
  render(){
    return(
      <>
      
        <Grid centered relaxed  padded columns={2}>
          <Grid.Column>
            <Segment>
              <Rail dividing position="left">
                {this.props.currentUser.username ? 
                <>
                  <UserCard user={this.props.currentUser}/> 
                  <br/><br/>
                  <IncomingRequestsContainer/>
                </>
                : <LoginCard/>}
              
              </Rail>
  
            
    
              <Rail dividing position="right">
                <RecommendedUsersCarousel/>
              </Rail>
              <div style={{height: "70vh", textAlign:"center"}}>
                <h2>Posts</h2>
              </div>
            </Segment>
          </Grid.Column>
         
        </Grid>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(HomeContainer)
