import {Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
const NotificationIcon = (props) => {

  function notificationCount() {
    if (props.notifications){
      return props.notifications.filter(n => n.read === false).length > 0
    }else{
      return false
    }
  }
  
  return(
    <>
    {notificationCount() > 0 ? <div className="alert"></div> : null}
    <div style={{textAlign: "center"}}>
      <Icon name="bell" size="large"/>
    </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.currentUser.notifications
  }
}

export default connect(mapStateToProps)(NotificationIcon)