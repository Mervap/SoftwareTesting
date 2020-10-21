import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme'
import Cell from "../../app/game/Cell";

describe("Cell", () => {

  function expectClassCnt(cell: ShallowWrapper, className: string, cnt: number) {
    expect(cell.find("." + className).length).toEqual(cnt)
  }

  it("Alive cell class", () => {
    const aliveCell = shallow(<Cell isAlive={true} height={20} width={20}/>)
    expectClassCnt(aliveCell, "cell", 1)
    expectClassCnt(aliveCell, "aliveCell", 1)
    expectClassCnt(aliveCell, "deadCell", 0)
  })

  it("Dead cell class", () => {
    const deadCell = shallow(<Cell isAlive={false} height={20} width={20}/>)
    expectClassCnt(deadCell, "cell", 1)
    expectClassCnt(deadCell, "aliveCell", 0)
    expectClassCnt(deadCell, "deadCell", 1)
  })
})