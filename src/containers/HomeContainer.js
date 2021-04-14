import React from 'react'
import {connect} from 'react-redux'
import UserCard from '../components/UserCard'
import {Grid, Segment, Rail} from 'semantic-ui-react'
import RecommendedUsersCarousel from './RecommendedUsersCarousel'
class HomeContainer extends React.Component {
  render(){
    return(
      <>
      <h1>Home</h1>
        <Grid relaxed padded centered columns={3}>
          <Grid.Column>
            <Segment>
              <Rail dividing position="left">
                {this.props.currentUser.username ? <UserCard/> : null}
              </Rail>
              
              
              {this.props.currentUser.username ? <RecommendedUsersCarousel/> : null}
    
              <Rail dividing position="right">
              {this.props.currentUser.username ? <UserCard/> : null}
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
