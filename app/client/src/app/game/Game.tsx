import React, {Component} from 'react';
import '../styles/Game.css';
import Grid from './Grid'
import Settings from './Settings'
import GameControl from "./GameControl";
import SeededRandomUtilities from "seeded-random-utilities";
import {apiAxiosInstance} from "../utils/apiUtils";
import {Button, Snackbar} from "@material-ui/core";
import Alert, {Color} from '@material-ui/lab/Alert';
import {SnackbarCloseReason} from "@material-ui/core/Snackbar/Snackbar";
import {AuthenticatedUser, CurrentUser} from "../utils/CurrentUser";

interface GameProps {
  currentUser: CurrentUser
}

class Game extends Component<GameProps> {

  getGrid = (rows: number, columns: number, seed: number): string => {
    let cells = "";
    const rand = new SeededRandomUtilities(String(seed));

    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < columns; ++j) {
        cells += rand.getRandom() > 0.92 ? '1' : '0'
      }
    }

    return cells
  }

  defaultSeed = new SeededRandomUtilities().getRandomIntegar(1e18)

  state = {
    columns: 40,
    rows: 20,
    seed: this.defaultSeed,

    aliveArray: this.getGrid(40, 20, this.defaultSeed),

    delay: 300,
    isRun: false,
    cntForBirth: 3,
    minForAlive: 2,
    maxForAlive: 3,
    iteration: 0,
    timerId: 0,

    fieldSaved: false,
    saveAlertOpen: false,
    saveAlertSeverity: "error" as Color,
    saveAlertText: ""
  }

  onSettingsChange = (newRows: number, newColumns: number, newSeed: number) => {
    this.setState({
      rows: newRows,
      columns: newColumns,
      seed: newSeed,
      aliveArray: this.getGrid(newRows, newColumns, newSeed)
    });
  }

  onGameControlChange = (delay: number, cntForBirth: number, minForAlive: number, maxForAlive: number, isRun: boolean) => {
    this.setState({
      delay: delay,
      isRun: isRun,
      cntForBirth: cntForBirth,
      minForAlive: minForAlive,
      maxForAlive: maxForAlive,
    });

    if (isRun) {
      this.setState({fieldSaved: false})
      clearInterval(this.state.timerId)
      let timerId = setInterval(() => {
        const aliveArray = btoa(this.state.aliveArray)
        const info = {
          aliveArray: aliveArray,
          columns: this.state.columns,
          rows: this.state.rows,
          cntForBirth: this.state.cntForBirth,
          minForAlive: this.state.minForAlive,
          maxForAlive: this.state.maxForAlive,
        };

        const self = this
        apiAxiosInstance.post('/next_iteration', info)
          .then(function (response) {
            if (response.status === 200 && response.data.aliveArray !== undefined) {
              self.setState({aliveArray: atob(response.data.aliveArray), iteration: self.state.iteration + 1})
              self.setState({redirect: true})
            } else {
              console.error(response);
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }, delay)
      this.setState({timerId: timerId})
    } else {
      clearInterval(this.state.timerId)
    }
    // console.log(String(delay) + " " + String(cntForBirth) + " " + String(minForAlive) + " " + String(maxForAlive) + " " + String(isRun))
  }

  saveField = () => {
    this.setState({fieldSaved: true, saveAlertOpen: false})
    const FieldInfo = {
      columns: this.state.columns,
      rows: this.state.rows,
      aliveArray: this.state.aliveArray,
      iteration: this.state.iteration
    }
    const onError = () => {
      this.setState({
        fieldSaved: false,
        saveAlertOpen: true,
        saveAlertSeverity: "error",
        saveAlertText: "Error during saving field. Please, try again"
      })
    }
    apiAxiosInstance.post("/save_field", FieldInfo)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            saveAlertOpen: true,
            saveAlertSeverity: "success",
            saveAlertText: "Plot succeeded saved!"
          })
        } else onError()
      })
      .catch(e => onError())
  }

  onAlertClose = (event: React.SyntheticEvent<any>) => this.setState({saveAlertOpen: false})
  onAlertCloseReason = (event: React.SyntheticEvent<any>, reason: SnackbarCloseReason) => this.onAlertClose(event)

  render() {
    return (
      <div className="game">
        <Grid
          columns={this.state.columns}
          rows={this.state.rows}
          aliveArray={this.state.aliveArray}
        />
        <Snackbar
          open={this.state.saveAlertOpen}
          autoHideDuration={7500}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          onClose={this.onAlertCloseReason}
        >
          <Alert severity={this.state.saveAlertSeverity} onClose={this.onAlertClose}>
            {this.state.saveAlertText}
          </Alert>
        </Snackbar>
        <Button className="submit_button"
                style={{margin: "15px"}}
                variant="contained"
                color="primary"
                onClick={e => {
                  if (!(this.props.currentUser instanceof AuthenticatedUser)) {
                    this.setState({
                      saveAlertOpen: true,
                      saveAlertSeverity: "error",
                      saveAlertText: "You have to login to save fields"
                    })
                  } else if (this.state.fieldSaved) {
                    this.setState({
                      saveAlertOpen: true,
                      saveAlertSeverity: "warning",
                      saveAlertText: "This field already saved",
                    })
                  } else this.saveField()
                }}>
          Save
        </Button>
        <div className="all_settings">
          <Settings
            columns={this.state.columns}
            rows={this.state.rows}
            seed={this.state.seed}
            onSettingsChange={this.onSettingsChange}
          />
          <GameControl
            delay={this.state.delay}
            isRun={this.state.isRun}
            cntForBirth={this.state.cntForBirth}
            minForAlive={this.state.minForAlive}
            maxForAlive={this.state.maxForAlive}
            onGameControlChange={this.onGameControlChange}
          />
        </div>
      </div>
    );
  }
}

export default Game;
