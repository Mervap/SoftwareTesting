import React from 'react';

interface CellProps {
  isAlive: boolean
  width: number
  height: number
}

export const Cell = ({isAlive, width, height}: CellProps) => {
  const classes = isAlive ? "cell aliveCell" : "cell deadCell"
  return (
    <div
      className={classes}
      style={{width: width + "pt", height: height + "pt"}}
    />
  )
}

export default Cell