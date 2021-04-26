import {Feed, Icon} from 'semantic-ui-react'

export const Notification = (props) => {

  function makeRead(){
    let configObj = {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ids: [props.notification.id]})
    }
    const userId = sessionStorage.userId
    fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications/make_read`,configObj)
  }

  return(
    <a href={"/users/" + props.notification.involved_user_id}>
    <Feed.Event style={props.notification.read ? null : {background: "lightgrey"}} onClick={makeRead} className="notification">
      {/* <Feed.Label>
        <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      </Feed.Label> */}
      <Feed.Content>
        <Feed.Summary style={{textAlign:"center"}}>
          {/* <Feed.User>Elliot Fu</Feed.User> added you as a friend */}
          {props.notification.involved_user_id ?
            <>
              {props.notification.involved_username + " "}
              {props.notification.content}
            </>
            :
           props.notification.content
          }
          <Feed.Date>{props.notification.created_at.split("-").splice(0,2).join("-")}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
    </a>
  )
}

