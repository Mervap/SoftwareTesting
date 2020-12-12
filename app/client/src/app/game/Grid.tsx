import React, {Component} from 'react';
import '../styles/Grid.css';
import Cell from './Cell';

interface GridProps {
  columns: number
  rows: number
  aliveArray: string
}

class Grid extends Component<GridProps> {

  render() {
    const gridWidth = this.props.columns * 22;
    const gridHeight = this.props.rows * 22;
    const rows = [];

    for (let i = 0; i < this.props.rows; ++i) {
      for (let j = 0; j < this.props.columns; ++j) {
        const ind = i * this.props.columns + j
        rows.push(
          <Cell
            key={ind}
            isAlive={this.props.aliveArray.charAt(ind) === '1'}
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