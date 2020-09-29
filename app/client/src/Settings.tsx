import React, {ChangeEvent, Component} from 'react';

import './Settings.css';

interface SettingsProps {
  columns: number
  rows: number
  seed: number
  onSettingsChange: (newRows: number, newColumns: number, newSeed: number) => void
}

class Settings extends Component<SettingsProps> {

  state = {
    columns: String(this.props.columns),
    rows: String(this.props.rows),
    seed: String(this.props.seed)
  }

  onColumnsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColumns = event.target.value
    this.setState({columns: newColumns})
  }

  onRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRows = event.target.value
    this.setState({rows: newRows})
  }

  onSeedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSeed = event.target.value
    this.setState({seed: newSeed})
  }

  changeSettings = () => {
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
          <div className="error"></div>
        </div>
        <button className="settingsButton" onClick={this.changeSettings}>Apply</button>
      </div>
    );
  }
}

export default Settings;