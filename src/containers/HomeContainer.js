import React from 'react'
import {connect} from 'react-redux'
import UserCard from '../components/UserCard'
import {Grid} from 'semantic-ui-react'
class HomeContainer extends React.Component {
  render(){
    return(
      <>
      <h1>Home</h1>
        <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            {this.props.currentUser.username ? <UserCard/> : null}
          </Grid.Column>
          <Grid.Column width={10}>
            {this.props.currentUser.username ? <UserCard/> : null}
          </Grid.Column>
          <Grid.Column width={3}>
            {this.props.currentUser.username ? <UserCard/> : null}
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
