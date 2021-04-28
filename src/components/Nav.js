import React from 'react'
import {Menu, Header} from 'semantic-ui-react'
import {NavLink } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import NotificationIcon from './NotificationIcon'
class Nav extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render(){
    const { activeItem } = this.state

    return (
      
      <Menu fixed="top" secondary pointing borderless style={{paddingLeft: "10vw", paddingRight: "10vw", paddingTop:"1vh", paddingBottom:"1vh", backgroundColor: "white"}}>
        <Menu.Item 
          header

        >Matchup Music
        </Menu.Item>
    
          <Menu.Item
            position="right"
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={NavLink}
            to="/home"
          >    
             Home
          </Menu.Item>
       
          <Menu.Item
            name='connections'
            active={activeItem === 'connections'}
            onClick={this.handleItemClick}
            as={NavLink}
            to="/connections"
          >
            Connections
          </Menu.Item>
   

        <Menu.Item
          name='messaging'
          active={activeItem === 'messaging'}
          onClick={this.handleItemClick}
          as={NavLink}
          to="/messaging"
        >
          Messaging
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