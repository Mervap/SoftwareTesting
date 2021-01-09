import React from 'react';
import {mount, ReactWrapper} from 'enzyme'
import Game from "../../app/game/Game";
import {UnknownUser} from "../../app/utils/CurrentUser";
import Grid from "../../app/game/Grid";

function mountGrid(columns: number, rows: number, seed: number): ReactWrapper<Grid["props"], Grid["state"], Grid> {
  const game = mount<Game, Game["props"], Game["state"]>(<Game currentUser={new UnknownUser()}/>)
  game.instance().onSettingsChange(columns, rows, seed)
  game.update()
  return game.children().childAt(0) as ReactWrapper<Grid["props"], Grid["state"], Grid>
}

describe("Grid", () => {

  it("Grid size", () => {
    const cases = [[40, 20], [60, 15], [13, 15]]
    cases.forEach(testCase => {
      const grid = mountGrid(testCase[0], testCase[1], 0)
      expect(grid.find(".cell").length).toEqual(testCase[0] * testCase[1])
    });
  })

  it("Grid 10x10 seed 0", () => {
    const expectedGrid =
      [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, true, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, true, true,
        false, false, false, false, false, true, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
      ]
    const grid = mountGrid(10, 10, 0)
    let gridCells = grid.children().children().map((val) => val.props().isAlive);
    expect(gridCells).toEqual(expectedGrid)
  })
})