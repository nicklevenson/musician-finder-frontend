import React from 'react'
import {Menu, Header} from 'semantic-ui-react'
class Nav extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render(){
    const { activeItem } = this.state

    return (
      <Menu borderless>
        <Menu.Item 
          header
          
        >Matchup Music
        </Menu.Item>

        <Menu.Item
          position="right"
          name='feed'
          active={activeItem === 'feed'}
          onClick={this.handleItemClick}
        >
          Feed
        </Menu.Item>

        <Menu.Item
          name='connections'
          active={activeItem === 'connections'}
          onClick={this.handleItemClick}
        >
          Connections
        </Menu.Item>

        <Menu.Item
          name='messaging'
          active={activeItem === 'messaging'}
          onClick={this.handleItemClick}
        >
          Messaging
        </Menu.Item>

        <Menu.Item
          name='notifications'
          active={activeItem === 'notifications'}
          onClick={this.handleItemClick}
        >
          Notifications
        </Menu.Item>

        <Menu.Item
          name='Profile'
          active={activeItem === 'Profile'}
          onClick={this.handleItemClick}
        >
          Profile
        </Menu.Item>
      </Menu>
    )
  }
}

export default Nav