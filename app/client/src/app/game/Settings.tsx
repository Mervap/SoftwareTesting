import React, {ChangeEvent, Component} from 'react';

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
    errMsg: String("")
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
    let errMsg = Settings.checkIntegerWithBounds(columns, 1, 65, "Column numbers");
    if (errMsg !== "") {
      this.state.errMsg = errMsg
      return
    }
    errMsg = Settings.checkIntegerWithBounds(rows, 1, 30, "Row numbers")
    if (errMsg !== "") {
      this.state.errMsg = errMsg
      return
    }
    errMsg = Settings.checkIntegerWithBounds(seed, 0, 1e31, "Seed")
    this.state.errMsg = errMsg
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
            <input
              id="columnsCnt"
              type="text"
              value={this.state.columns}
              onChange={this.onColumnsChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="name">
            <label htmlFor="rowsCnt">Rows cnt</label>
          </div>
          <div className="value">
            <input
              id="rowsCnt"
              type="text"
              value={this.state.rows}
              onChange={this.onRowsChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="name">
            <label htmlFor="seed">Seed</label>
          </div>
          <div className="value">
            <input
              id="seed"
              type="text"
              value={this.state.seed}
              onChange={this.onSeedChange}
            />
          </div>
        </div>
        <div className="error">{this.state.errMsg}</div>
        <button className="settingsButton"
                disabled={this.state.errMsg !== ""}
                onClick={this.changeSettings}>
          Apply
        </button>
      </div>
    );
  }
}

export default Settings;