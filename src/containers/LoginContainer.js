import React from 'react'
import LoginCard from '../components/Navigation/LoginCard'
class LoginContainer extends React.Component {

  render(){
    return(
      <div className="login-page" style={{width: "300px", height: "50vh",margin: "auto", marginTop: "10vh"}}>
       <LoginCard/>
      </div>
    )
  }
}
export default LoginContainer