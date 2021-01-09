import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Game from "./game/Game";
import Help from "./misc/Help";
import Storage from "./misc/Storage";
import SideBar from "./misc/SideBar";
import {
  MuiThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme
} from '@material-ui/core';

import 'react-pro-sidebar/dist/css/styles.css';
import './styles/App.css';
import AuthenticationMenu from "./authentication/AuthenticationMenu";
import AuthorizationPage from "./authentication/AuthorizationPage";
import {AuthenticatedUser, GuestUser, UnknownUser} from "./utils/CurrentUser";
import {Redirect} from "react-router";

class App extends Component {

  state = {
    currentUser: new UnknownUser()
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={createMuiTheme()}>
          <BrowserRouter>
            <SideBar currentUser={this.state.currentUser}/>
            <div className="mainWindow">
              <AuthenticationMenu
                currentUser={this.state.currentUser}
                onLogin={(username) => this.setState({currentUser: new AuthenticatedUser(username)})}
                onLogout={() => this.setState({currentUser: new GuestUser()})}
              />
              <Switch>
                <Route exact path='/'
                       render={(props) =>
                         <Game currentUser={this.state.currentUser} {...props}/>}/>
                <Route path='/help' component={Help}/>
                <Route path='/storage'
                       render={(props) =>
                         <Storage currentUser={this.state.currentUser} {...props}/>}
                />
                <Route path='/login'
                       render={(props) =>
                         <AuthorizationPage
                           currentUser={this.state.currentUser}
                           isRegistration={false}
                           onAuthorization={(username) => this.setState({currentUser: new AuthenticatedUser(username)})}
                           {...props}/>}
                />
                <Route path='/register'
                       render={(props) =>
                         <AuthorizationPage
                           currentUser={this.state.currentUser}
                           isRegistration={true}
                           onAuthorization={(username) => this.setState({currentUser: new AuthenticatedUser(username)})}
                           {...props}/>}
                />
                <Redirect from='/' to='/'/>;
              </Switch>
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
