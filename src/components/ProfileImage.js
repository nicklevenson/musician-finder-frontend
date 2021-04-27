import {connect} from 'react-redux'
import {Image} from 'semantic-ui-react'
const ProfileImage = (props) => {
  
  return(
    <div>
      <Image
        style={{width:"25px"}}
        circular
        src={sessionStorage.jwt ? props.currentUser.photo || props.currentUser.providerImage : "https://icon-library.net//images/no-user-image-icon/no-user-image-icon-27.jpg"}
        centered
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(ProfileImage)
