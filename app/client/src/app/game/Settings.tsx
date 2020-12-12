import React, {ChangeEvent, Component} from 'react';
import {TextField, Button} from "@material-ui/core";

import '../styles/Settings.css';

interface SettingsProps {
  columns: number
  rows: number
  seed: number

  onSettingsChange(newRows: number, newColumns: number, newSeed: number): void
}

class Settings extends Component<SettingsProps> {

  state = {
    columns: String(this.props.columns),
    rows: String(this.props.rows),
    seed: String(this.props.seed),
    columnsErr: "",
    rowsErr: "",
    seedErr: "",
  }

  private static checkIntegerWithBounds(str: string, left: number, right: number, a: string): string {
    if (str === "") {
      return "Please, put in a " + a
    }
    const num = Number(str)
    if (isNaN(num) || !Number.isInteger(num) || num < left || num > right) {
      return a + " should be a integer number no less than " + left + " and not greater than " + right
    }
    return ""
  }

  private validateSettings(columns: string, rows: string, seed: string) {
    let columnsErr = Settings.checkIntegerWithBounds(columns, 1, 50, "Column numbers");
    let rowsErr = Settings.checkIntegerWithBounds(rows, 1, 20, "Row numbers")
    let seedErr = Settings.checkIntegerWithBounds(seed, 0, 1e31, "Seed");
    this.setState({columnsErr: columnsErr, rowsErr: rowsErr, seedErr: seedErr})
  }

  private onColumnsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColumns = event.target.value
    this.setState({columns: newColumns})
    this.validateSettings(newColumns, this.state.rows, this.state.seed)
  }

  private onRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRows = event.target.value
    this.setState({rows: newRows})
    this.validateSettings(this.state.columns, newRows, this.state.seed)
  }

  private onSeedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSeed = event.target.value
    this.setState({seed: newSeed})
    this.validateSettings(this.state.columns, this.state.rows, newSeed)
  }

  private changeSettings = () => {
    this.props.onSettingsChange(parseInt(this.state.rows), parseInt(this.state.columns), parseInt(this.state.seed))
  }

  render() {

    return (
      <div className="settings">
        <div className="field">
          <div className="name">
            <label htmlFor="columnsCnt">Columns cnt</label>
          </div>
          <div className="value">
            <TextField
              id="columnsCnt"
              type="text"
              value={this.state.columns}
              style={{
                width: "17rem"
              }}
              error={this.state.columnsErr !== ""}
              helperText={this.state.columnsErr}
              onChange={this.onColumnsChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="name">
            <label htmlFor="rowsCnt">Rows cnt</label>
          </div>
          <div className="value">
            <TextField
              id="rowsCnt"
              type="text"
              value={this.state.rows}
              style={{
                width: "17rem"
              }}
              error={this.state.rowsErr !== ""}
              helperText={this.state.rowsErr}
              onChange={this.onRowsChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="name">
            <label htmlFor="seed">Seed</label>
          </div>
          <div className="value">
            <TextField
              id="seed"
              type="text"
              value={this.state.seed}
              style={{
                width: "17rem"
              }}
              error={this.state.seedErr !== ""}
              helperText={this.state.seedErr}
              onChange={this.onSeedChange}
            />
          </div>
        </div>
        <Button className="settingsButton"
                variant="contained"
                color="primary"
                style={{
                  float: "right",
                  margin: "1.5rem 9rem 0 7.1rem",
                }}
                disabled={this.state.columnsErr !== "" || this.state.rowsErr !== "" || this.state.seedErr !== ""}
                onClick={this.changeSettings}>
          Apply
        </Button>
      </div>
    );
  }
}

export default Settings;