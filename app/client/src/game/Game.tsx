import React, {Component} from 'react';
import '../styles/App.css';
import Grid from './Grid'
import Settings from './Settings'
import SeededRandomUtilities from "seeded-random-utilities";

class Game extends Component {

  state = {
    columns: 40,
    rows: 20,
    seed: new SeededRandomUtilities().getRandomIntegar(1e18)
  }

  onSettingsChange = (newRows: number, newColumns: number, newSeed: number) => {
    return this.setState({rows: newRows, columns: newColumns, seed: newSeed});
  }

  render() {
    return (
      <div className="game">
        <Grid
          columns={this.state.columns}
          rows={this.state.rows}
          seed={this.state.seed}
        />
        <Settings
          columns={this.state.columns}
          rows={this.state.rows}
          seed={this.state.seed}
          onSettingsChange={this.onSettingsChange}
        />
      </div>
    );
  }
}

export default Game;
