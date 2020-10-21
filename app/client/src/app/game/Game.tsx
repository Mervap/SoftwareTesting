import React, {Component} from 'react';
import '../styles/Game.css';
import Grid from './Grid'
import Settings from './Settings'
import GameControl from "./GameControl";
import SeededRandomUtilities from "seeded-random-utilities";

class Game extends Component {

  state = {
    columns: 40,
    rows: 20,
    seed: new SeededRandomUtilities().getRandomIntegar(1e18),

    delay: 100,
    isRun: false,
    cntForBirth: 3,
    minForAlive: 2,
    maxForAlive: 3,
    iteration: 0,
    timerId: 0
  }

  onSettingsChange = (newRows: number, newColumns: number, newSeed: number) => {
    this.setState({rows: newRows, columns: newColumns, seed: newSeed});
  }

  onGameControlChange = (speed: number, cntForBirth: number, minForAlive: number, maxForAlive: number, isRun: boolean) => {
    this.setState({
      speed: speed,
      isRun: isRun,
      cntForBirth: cntForBirth,
      minForAlive: minForAlive,
      maxForAlive: maxForAlive
    });
    if (isRun) {
      clearInterval(this.state.timerId)
      let timerId = setInterval(() => {
        console.log("Kek")
        this.setState({iteration: this.state.iteration + 1})
      }, speed)
      this.setState({timerId: timerId})
    } else {
      clearInterval(this.state.timerId)
    }
    console.log(String(speed) + " " + String(cntForBirth) + " " + String(minForAlive) + " " + String(maxForAlive) + " " + String(isRun))
  }

  render() {
    return (
      <div className="game">
        <Grid
          columns={this.state.columns}
          rows={this.state.rows}
          seed={this.state.seed}
        />
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
