
import {Image} from 'semantic-ui-react'
export const Message = (props) => {
  return(
    <div className="message">
      <Image
        size="mini"
        src={props.message.user.photo || props.message.user.providerImage}
        circular
        inline
      /> 
      <b> {props.message.user.username}</b> - {props.message.created_at}
      <br/>
      {props.message.content}
    </div>
  )
}