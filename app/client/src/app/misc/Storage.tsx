import React, {Component} from 'react';
import '../styles/Storage.css';
import {Redirect} from "react-router";
import {AuthenticatedUser, CurrentUser} from "../utils/CurrentUser";
import {apiAxiosInstance, LoadingStage} from "../utils/apiUtils";
import axios from "axios";
import Grid from "../game/Grid";
import {Divider} from "@material-ui/core";

interface StorageProps {
  currentUser: CurrentUser
}

interface FieldInfo {
  columns: number
  rows: number
  aliveArray: string
  iteration: number
  saveDate: string
}

class Storage extends Component<StorageProps> {

  state = {
    savedFields: [] as FieldInfo[],
    loaded: LoadingStage.NOT_STARTED,
    cancelSource: axios.CancelToken.source()
  }

  private getFields = () => {
    apiAxiosInstance.get("/get_saved_fields", {cancelToken: this.state.cancelSource.token})
      .then(response => {
        this.setState({savedFields: response.data, loaded: LoadingStage.SUCCESS})
      })
      .catch(error => {
        if (!(error instanceof axios.Cancel)) {
          this.setState({loaded: LoadingStage.ERROR})
        }
      })
  }

  componentDidMount() {
    if (this.state.loaded === LoadingStage.NOT_STARTED) {
      this.setState({loaded: LoadingStage.LOADING})
      this.getFields()
    }
  }

  componentWillUnmount() {
    this.state.cancelSource.cancel("Component unmount")
  }

  render() {
    if (!(this.props.currentUser instanceof AuthenticatedUser)) {
      return <Redirect to='/'/>;
    }

    if (this.state.loaded === LoadingStage.ERROR) {
      return (
        <div className="storage">
          Error :(
        </div>
      );
    }
    else if (this.state.loaded !== LoadingStage.SUCCESS) {
      return (
        <div className="storage">
          Loading...
        </div>
      );
    } else {
      if (this.state.savedFields.length === 0) {
        return (
          <div className="storage">
            No saved field found...
          </div>
        );
      }

      const fields = [];
      for (let i = 0; i < this.state.savedFields.length; ++i) {
        const field = this.state.savedFields[i]
        console.log(field)
        fields.push(
          <div className="field_info">
            <div className="field_info_header" key={2 * i}>
              <div>
                Saved at {field.saveDate}
              </div>
              <div className="iteration_info">
                Iteration: {field.iteration}
              </div>
            </div>
            <Grid
              columns={field.columns}
              rows={field.rows}
              aliveArray={field.aliveArray}
            />
          </div>
        )
        fields.push(<Divider key={2 * i + 1} className="divider"/>)
      }

      return (
        <div className="fields">
          <div className="fields_inner">
            {fields}
          </div>
        </div>
      );
    }
  }
}

export default Storage;
