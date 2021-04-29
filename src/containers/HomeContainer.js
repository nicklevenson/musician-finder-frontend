import React from 'react'
import {connect} from 'react-redux'
import {Grid, Segment, Rail, GridColumn} from 'semantic-ui-react'
import RecommendedUsers from './RecommendedUsers'
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
      
        <Grid centered relaxed  padded columns={12}>
          <Grid.Row>
            
              {/* <Grid.Column>
                {this.props.currentUser.username ? 
                <div style={{height:"70vh"}}>
                  <div className="down-swipe" style={{height:"50%"}}>
                    <PreviewUserCard user={this.props.currentUser}/> 
                  </div>
                  <br/>
                  <div style={{height:"50%", position: "relative"}}>
                    <div className="fixed-heading">
                      <i>Incoming Requests</i>
                    </div>
                    <br/>
                    <div className="down-swipe">
                      <IncomingRequestsContainer/>
                    </div>
                  </div>
                </div>
                : <LoginCard/>}
              
              </Grid.Column> */}
  
            
    

              <Grid.Column>
                <div style={{height: "70vh", textAlign:"center"}}>
                  <h2>Posts</h2>
                </div>
              </Grid.Column>

              <Grid.Column width={10}>
                  <div className="fixed-heading">
                    <i>Recommended Users For You</i>
                  </div>
                  <br/>
                  <div className="down-swipe">
                    <RecommendedUsers/>
                  </div>
              </Grid.Column>
         
          </Grid.Row>
         
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
