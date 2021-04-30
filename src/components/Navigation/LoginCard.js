import React from 'react'
import googleLogin from '../../assets/btn_google.png'
import facebookLogin from '../../assets/facebook-login.png'
import {connect} from 'react-redux'  
import {fetchUser} from '../../actions/useractions.js'
import { Redirect } from 'react-router-dom'
import { Card} from 'semantic-ui-react'
class LoginCard extends React.Component {
 
  componentDidMount() { 
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('token')) {
      const jwt = urlParams.get('token');
      const id = parseInt(urlParams.get('id'))
      sessionStorage.setItem("jwt", jwt)
      sessionStorage.setItem("userId", id)
      this.props.fetchUser()
      this.setState({redirect: true})
    }
  

  }
  render(){
    return(
      
        <Card fluid>
          <br></br>
          <div style={{margin:"auto"}}>
          <Card.Header><h2>Login/Signup</h2></Card.Header>
          
          {this.props.heading ? <Card.Content><h5><i>{this.props.heading}</i></h5></Card.Content>: null}
          <br></br>
          <Card.Content textAlign="center">
          <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-google`}><img src={googleLogin} alt="Login with Google" style={{width: "200px"}}/></a><br></br> <br></br>
          <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-facebook`}><img src={facebookLogin} alt="Login with Facebook"  style={{width: "193px", height:"37px"}}></img></a> <br></br> <br></br>
          <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-spotify`}>Login spotify</a>
          </Card.Content>
          {sessionStorage.jwt ? <Redirect to="/home" /> : null}
          </div>
        </Card>

    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser())
  }
}


export default connect(null, mapDispatchToProps)(LoginCard)