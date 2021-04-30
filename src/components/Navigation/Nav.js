import React from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import ProfileImage from '../Users/ProfileImage'
import NotificationIcon from '../Notifications/NotificationIcon'
class Nav extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render(){
    const { activeItem } = this.state

    return (
      
      <Menu fixed="top" secondary pointing borderless style={{paddingLeft: "10vw", paddingRight: "10vw", paddingTop:"1vh", paddingBottom:"1vh", backgroundColor: "white"}}>
        <Menu.Item 
          header
          href="/home"
          as={"a"}
        >
          <div>
            <div><Icon name="music" size="large" fitted/></div>
            Matchup Music
          </div>
        </Menu.Item>
    
          <Menu.Item
            position="right"
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={NavLink}
            to="/home"
          >  
            <div>
              <div><Icon name="home" size="large" fitted/></div>
              Home
            </div>
          </Menu.Item>
   

        <Menu.Item
          name='messaging'
          active={activeItem === 'messaging'}
          onClick={this.handleItemClick}
          as={NavLink}
          to="/messaging"
        >
           <div>
              <div><Icon name="chat" size="large" fitted/></div>
              Messaging
          </div>
        </Menu.Item>

        <Menu.Item
          name='notifications'
          active={activeItem === 'notifications'}
          onClick={this.handleItemClick}
          as={NavLink}
          to="/notifications"
        >
          <div>
            <NotificationIcon/>
            Notifications
          </div>
        </Menu.Item>

        <Menu.Item
          name='Profile'
          active={activeItem === 'Profile'}
          onClick={this.handleItemClick}
          as={NavLink}
          to="/profile"
        >
          <div>
            <ProfileImage/>
            Profile
          </div>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Nav