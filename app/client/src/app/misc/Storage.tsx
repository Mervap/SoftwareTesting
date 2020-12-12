import React, {Component} from 'react';
import '../styles/Storage.css';
import {Redirect} from "react-router";

interface StorageProps {
  username: string | null
}

class Storage extends Component<StorageProps> {

  render() {
    if (this.props.username === null) {
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
