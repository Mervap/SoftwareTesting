import React, {Component} from 'react';
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from 'react-pro-sidebar';
import {Link} from "react-router-dom";

import {FaGithub} from 'react-icons/fa';
import {BiGame, BiHelpCircle, BiSave} from 'react-icons/bi'
import {AuthenticatedUser, CurrentUser} from "../utils/CurrentUser";

interface SideBarProps {
  currentUser: CurrentUser
}

class SideBar extends Component<SideBarProps> {
  render() {
    let items = [
      <MenuItem key="Game" icon={<BiGame />}>
          Game
        <Link to="/" />
      </MenuItem>,
      <MenuItem key="Help" icon={<BiHelpCircle />}>
        Help
        <Link to="/help" />
      </MenuItem>
    ]
    if (this.props.currentUser instanceof AuthenticatedUser) {
      items.push(
        <MenuItem key="Saved fields" icon={<BiSave />}>
          Saved fields
          <Link to="/storage" />
        </MenuItem>
      )
    }
    return (
      <ProSidebar
        // image={image ? sidebarBg : false}
        // rtl={rtl}
        // collapsed={collapsed}
        // toggled={toggled}
        breakPoint="md"
        // onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 20,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Game of Life
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            {items}
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href="https://github.com/Mervap/SoftwareTesting"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>View Source</span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    );
  }
}

export default SideBar;