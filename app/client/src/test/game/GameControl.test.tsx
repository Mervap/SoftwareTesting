import React from 'react';
import {mount, ReactWrapper} from 'enzyme'
import GameControl from "../../app/game/GameControl";
import {findButton} from "../SelectorHelpers";

describe("GameControl", () => {

  it("Click on plus button near delay", () => runActionTest(baseProps, (settings) => {
    findButton(settings, ".delayControl .updateButton").at(1).simulate('click');
  }, (settingsState) => {
    expect(settingsState.delay).toEqual(200)
  }))

  it("Click on minus button near delay", () => runActionTest(baseProps, (settings) => {
    findButton(settings, ".delayControl .updateButton").at(0).simulate('click');
  }, (settingsState) => {
    expect(settingsState.delay).toEqual(100)
  }))

  it("Click on plus button near min alive count", () => runActionTest(baseProps, (settings) => {
    const button = findButton(settings, ".minAliveControl .updateButton").at(1);
    for (let i = 0; i < 10; ++i) {
      button.simulate('click');
    }
  }, (settingsState) => {
    expect(settingsState.minForAlive).toEqual(3)
  }))

  it("Click on minus button near min alive count", () => runActionTest(baseProps, (settings) => {
    const button = findButton(settings, ".minAliveControl .updateButton").at(0);
    for (let i = 0; i < 10; ++i) {
      button.simulate('click');
    }
  }, (settingsState) => {
    expect(settingsState.minForAlive).toEqual(0)
  }))

  it("Click on plus button near max alive count", () => runActionTest(baseProps, (settings) => {
    const button = findButton(settings, ".maxAliveControl .updateButton").at(1);
    for (let i = 0; i < 10; ++i) {
      button.simulate('click');
    }
  }, (settingsState) => {
    expect(settingsState.maxForAlive).toEqual(8)
  }))

  it("Click on minus button near max alive count", () => runActionTest(baseProps, (settings) => {
    const button = findButton(settings, ".maxAliveControl .updateButton").at(0);
    for (let i = 0; i < 10; ++i) {
      button.simulate('click');
    }
  }, (settingsState) => {
    expect(settingsState.maxForAlive).toEqual(2)
  }))

  interface GameControlProps {
    delay: number
    isRun: boolean
    cntForBirth: number
    minForAlive: number
    maxForAlive: number
  }

  const baseProps: GameControlProps = {delay: 100, isRun: false, cntForBirth: 3, minForAlive: 2, maxForAlive: 3}

  function runActionTest(initValue: GameControlProps,
                         action: (settings: ReactWrapper) => void,
                         afterAction: (settingsState: GameControlProps) => void) {
    let delay = initValue.delay
    let isRun = initValue.isRun
    let cntForBirth = initValue.cntForBirth
    let minForAlive = initValue.minForAlive
    let maxForAlive = initValue.maxForAlive
    const settings = mount(
      <GameControl delay={delay} isRun={isRun} cntForBirth={cntForBirth}
                   minForAlive={minForAlive} maxForAlive={maxForAlive}
                   onGameControlChange={(nDelay: number, nCntForBirth: number, nMinForAlive: number, nMaxForAlive: number, nIsRun: boolean) => {
                     delay = nDelay
                     isRun = nIsRun
                     cntForBirth = nCntForBirth
                     minForAlive = nMinForAlive
                     maxForAlive = nMaxForAlive
                   }}/>)
    action(settings)
    settings.update()
    afterAction({delay, cntForBirth, minForAlive, maxForAlive, isRun})
  }

})