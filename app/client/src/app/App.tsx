import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Game from "./game/Game";
import Help from "./misc/Help";
import Storage from "./misc/Storage";
import SideBar from "./misc/SideBar";

import 'react-pro-sidebar/dist/css/styles.css';
import './styles/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <SideBar/>
          <Switch>
            <Route exact path='/' component={Game}/>
            <Route exact path='/help' component={Help}/>
            <Route exact path='/storage' component={Storage}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
