import {Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'


const MessageIcon = (props) => {
  const hasUnreadMessages = () => {
    return props.chatrooms.map(cr => cr.messages).flat().some(message => {
      return (message.read === false && props.currentUser.id !== message.user.id)
    })
  }
  return(
    <>
      { hasUnreadMessages() ? <div className="alert"></div> : null}
      <Icon name="chat" size="large" />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    chatrooms: state.currentUser.chatrooms,
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(MessageIcon)





