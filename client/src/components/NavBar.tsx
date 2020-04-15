import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const NavBar: React.FC = () => {
  return (
    <div style={{marginBottom:"20px"}}> 
     <Menu inverted>
        <Menu.Item name="Home" as={Link} to='/' />
        <Menu.Item name='Contact' as={Link} to='/members' />
      </Menu>
  </div>
  )
}

export default NavBar;
