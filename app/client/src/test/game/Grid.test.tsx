import React from 'react';
import {mount} from 'enzyme'
import Grid from "../../app/game/Grid";

describe("Grid", () => {

  it("Grid size", () => {
    const cases = [[40, 20], [60, 15], [13, 15]]
    cases.forEach(testCase => {
      const grid = mount(<Grid columns={testCase[0]} rows={testCase[1]} seed={0}/>)
      expect(grid.find(".cell").length).toEqual(testCase[0] * testCase[1])
    });
  })

  it("Grid 10x10 seed 0", () => {
    const expectedGrid =
      [
        true, false, false, true, false, false, false, false, true, false,
        false, false, false, true, true, false, false, true, false, false,
        false, false, false, false, true, false, false, false, false, true,
        false, false, false, false, false, false, false, true, false, false,
        false, true, true, true, true, false, false, false, true, true,
        false, false, false, false, true, true, true, false, false, false,
        false, false, false, false, false, false, false, true, false, false,
        true, false, false, false, true, false, false, true, false, false,
        false, true, true, false, true, true, false, false, false, false,
        false, false, false, false, true, false, false, false, true, false
      ]
    const grid = mount(<Grid columns={10} rows={10} seed={0}/>)
    let gridCells = grid.children().children().map((val) => val.props().isAlive);
    expect(gridCells).toEqual(expectedGrid)
  })
})