import React, {Component} from 'react';
import '../styles/Grid.css';
import Cell from './Cell';
import SeededRandomUtilities from 'seeded-random-utilities';

interface GridProps {
  columns: number
  rows: number
  seed: number
}

class Grid extends Component<GridProps> {

  render() {
    const gridWidth = this.props.columns * 22;
    const gridHeight = this.props.rows * 22;
    const rows = [];

    const rand = new SeededRandomUtilities(String(this.props.seed));

    for (let i = 0; i < this.props.rows; ++i) {
      for (let j = 0; j < this.props.columns; ++j) {
        let isAlive = rand.getRandom() > 0.75
        rows.push(
          <Cell
            key={i * this.props.columns + j}
            isAlive={isAlive}
            height={20}
            width={20}
          />)
      }
    }

    return (
      <div className="grid" style={{width: gridWidth + "pt", height: gridHeight + "pt"}}>
        {rows}
      </div>
    );
  }
}

export default Grid;