import {Feed, Icon} from 'semantic-ui-react'

export const Notification = (props) => {
  return(
    <Feed.Event>
      {/* <Feed.Label>
        <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      </Feed.Label> */}
      <Feed.Content>
        <Feed.Summary style={{textAlign:"center"}}>
          {/* <Feed.User>Elliot Fu</Feed.User> added you as a friend */}
          {props.notification.content}
          <Feed.Date>{props.notification.created_at.split("-").splice(0,2).join("-")}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  )
}

