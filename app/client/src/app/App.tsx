import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Game from "./game/Game";
import Help from "./misc/Help";
import Storage from "./misc/Storage";
import SideBar from "./misc/SideBar";
import Login from "./authentication/Login";
import {
  MuiThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme
} from '@material-ui/core';

import 'react-pro-sidebar/dist/css/styles.css';
import './styles/App.css';
import AuthenticationMenu from "./authentication/AuthenticationMenu";
import Register from "./authentication/Registration";

class App extends Component {

  state = {
    currentUser: null as (string | null)
  }

  render() {
    // console.log(this.state.currentUser)
    return (
      <div className="App">
        <MuiThemeProvider theme={createMuiTheme()}>
          <BrowserRouter>
            <SideBar username={this.state.currentUser}/>
            <div className="mainWindow">
              <AuthenticationMenu
                username={this.state.currentUser}
                onLogin={(username) => this.setState({currentUser: username})}
                onLogout={() => this.setState({currentUser: null})}
              />
              <Switch>
                <Route exact path='/' component={Game}/>
                <Route exact path='/help' component={Help}/>
                <Route exact path='/storage'
                       render={(props) =>
                         <Storage username={this.state.currentUser} {...props}/>}
                />
                <Route exact path='/login'
                       render={(props) =>
                         <Login
                           username={this.state.currentUser}
                           onLogin={(username) => this.setState({currentUser: username})}
                           {...props}/>}
                />
                <Route exact path='/register'
                       render={(props) =>
                         <Register
                           username={this.state.currentUser}
                           onRegister={(username) => this.setState({currentUser: username})}
                           {...props}/>}
                />
              </Switch>
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
