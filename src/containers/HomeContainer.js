import React from 'react'
import {connect} from 'react-redux'
import UserCard from '../components/UserCard'
import {Grid, Segment, Rail} from 'semantic-ui-react'
import RecommendedUsersCarousel from './RecommendedUsersCarousel'
import PreviewUserCard from '../components/PreviewUserCard'
import LoginCard from '../components/LoginCard'
class HomeContainer extends React.Component {

  renderUserConnections = () => {
    if (this.props.currentUser.connected_users){
      if (this.props.currentUser.connected_users.length !== 0){
        return this.props.currentUser.connected_users.map(u=><PreviewUserCard user={u}/>)
      }else{
        return <h1>Go find some users to connect with!</h1>
      }
    }
    
  }
  render(){
    return(
      <>
      <h1>Home</h1>
        <Grid relaxed padded centered columns={3}>
          <Grid.Column>
            <Segment>
              <Rail dividing position="left">
                {this.props.currentUser.username ? <UserCard user={this.props.currentUser}/> : <LoginCard/>}
              </Rail>
              
              <div style={{height: "70vh"}}>
                <h2>Posts</h2>
              </div>
            
    
              <Rail dividing position="right">
                {this.props.currentUser.username ? <RecommendedUsersCarousel/> : null}
              </Rail>
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
