import React, {Component} from 'react';
import '../styles/Storage.css';
import {Redirect} from "react-router";
import {CurrentUser} from "../utils/CurrentUser";

interface StorageProps {
  currentUser: CurrentUser
}

class Storage extends Component<StorageProps> {

  render() {
    if (this.props.currentUser === null) {
      return <Redirect to='/'/>;
    }
    return (
      <div className="storage">
        Under construction
      </div>
    );
  }
}

export default Storage;
