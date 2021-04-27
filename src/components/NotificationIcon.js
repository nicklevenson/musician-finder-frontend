import {Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
const NotificationIcon = (props) => {

  function notificationCount() {
    if (props.currentUser.notifications){
      return props.currentUser.notifications.filter(n => n.read === false).length > 0
    }else{
      return false
    }
  }
  
  return(
    <>
    {notificationCount() > 0 ? <div style={{position: "absolute",width:"10px", height: "10px",marginLeft: "10px", marginBottom: "20px", backgroundColor:"tomato", zIndex:"5", borderRadius:"50%", color:"white"}}></div> : null}
    <div style={{textAlign: "center"}}>
      <Icon name="bell"/>
    </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(NotificationIcon)