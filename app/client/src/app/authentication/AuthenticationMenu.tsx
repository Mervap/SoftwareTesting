import React, {Component, ReactNode} from 'react';
import {
  Menu,
  MenuProps,
  MenuItem,
  MenuItemProps,
  ListItemIcon,
  ListItemText,
  Button,
  withStyles
} from '@material-ui/core';
import {Person, PersonAdd, ExitToApp} from '@material-ui/icons';
import {Link} from "react-router-dom";
import {usePopupState, bindTrigger, bindMenu} from 'material-ui-popup-state/hooks'

import '../styles/AuthenticationMenu.css';
import {apiAxiosInstance} from "../utils/apiUtils";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

interface NestedMenuItemProps extends Omit<MenuItemProps, 'button'> {
  button?: true | undefined
}

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))((props: NestedMenuItemProps) => (
  <MenuItem {...props} />
));

interface AuthenticationMenuProps {
  username: string | null

  onLogin(username: string): void

  onLogout(): void
}

const AuthenticationMenu = (props: AuthenticationMenuProps) => {
  function isAuthenticated(): boolean {
    if (props.username != null) return true
    apiAxiosInstance.get("/get_username")
      .then(function (response) {
        if (response.status === 200 && response.data.username !== undefined) {
          props.onLogin(response.data.username)
        }
      })
      .catch(function (error) { /* ignore */
      });
    return false
  }

  const popupState = usePopupState({variant: 'popover', popupId: 'demoMenu'})

  class LoginMenuItem extends Component {
    render() {
      return(
        <Link to="/login" className="text-link">
          <StyledMenuItem onClick={popupState.close}>
            <ListItemIcon>
              <Person fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Login"/>
          </StyledMenuItem>
        </Link>
      );
    }
  }

  class RegisterMenuItem extends Component {
    render() {
      return(
        <Link to="/register" className="text-link">
          <StyledMenuItem onClick={popupState.close}>
            <ListItemIcon>
              <PersonAdd fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Register"/>
          </StyledMenuItem>
        </Link>
      );
    }
  }

  class LogoutMenuItem extends Component {
    render() {
      return(
        <Link to="/" className="text-link">
          <StyledMenuItem onClick={() => {
            apiAxiosInstance.get("/logout")
              .then(response => {
                if (response.status === 200) {
                  props.onLogout()
                }
              })
              .catch(error => { /* ignore */
              })
            popupState.close()
          }}>
            <ListItemIcon>
              <ExitToApp fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Logout"/>
          </StyledMenuItem>
        </Link>
      );
    }
  }

  let menuContent: ReactNode
  let menuText: string
  if (isAuthenticated()) {
    menuText = props.username as string
    menuContent = <LogoutMenuItem key="logoutItem" />
  } else {
    menuText = "guest"
    menuContent = [<LoginMenuItem key="loginItem"/>, <RegisterMenuItem key="registerItem" />]
  }

  return (
    <div className="authenticationMenu">
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        color="primary"
        {...bindTrigger(popupState)}
      >
        Welcome, {menuText}!
      </Button>
      <StyledMenu
        id="customized-menu"
        keepMounted
        {...bindMenu(popupState)}
      >
        {menuContent}
      </StyledMenu>
    </div>
  );
}

export default AuthenticationMenu;