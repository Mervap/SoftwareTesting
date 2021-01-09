import React from 'react';
import {mount, ReactWrapper} from 'enzyme'
import Settings from "../../app/game/Settings";
import {changeInput, findButton, findInput} from "../SelectorHelpers";

describe("Settings", () => {

  it("Change columns cnt", () => runActionTest(baseProps,
    (settings) => {
      changeInput(settings, "#columnsCnt", "20")
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual("")
      expect(isApplyButtonDisabled).toBeFalsy()
      expect(settingsState.columns).toEqual(40)
      expect(fieldValue.columns).toEqual(20)
    }))

  it("Change row cnt", () => runActionTest(baseProps,
    (settings) => {
      changeInput(settings, "#rowsCnt", "10")
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual("")
      expect(isApplyButtonDisabled).toBeFalsy()
      expect(settingsState.rows).toEqual(20)
      expect(fieldValue.rows).toEqual(10)
    }))

  it("Change seed", () => runActionTest(baseProps,
    (settings) => {
      changeInput(settings, "#seed", "10000")
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual("")
      expect(isApplyButtonDisabled).toBeFalsy()
      expect(settingsState.seed).toEqual(0)
      expect(fieldValue.seed).toEqual(10000)
    }))

  it("Change and apply", () => runActionTest(baseProps,
    (settings) => {
      changeInput(settings, "#columnsCnt", "50")
      changeInput(settings, "#rowsCnt", "15")
      changeInput(settings, "#seed", "12345")
      findButton(settings, ".settingsButton").simulate('click')
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual("")
      expect(isApplyButtonDisabled).toBeFalsy()
      expect(settingsState.columns).toEqual(50)
      expect(settingsState.rows).toEqual(15)
      expect(settingsState.seed).toEqual(12345)
      expect(fieldValue.columns).toEqual(50)
      expect(fieldValue.rows).toEqual(15)
      expect(fieldValue.seed).toEqual(12345)
    }))

  it("Too big value", () => runActionTest(baseProps,
    (settings) => {
      changeInput(settings, "#rowsCnt", "40")
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual(badRowValueError)
      expect(isApplyButtonDisabled).toBeTruthy()
      expect(settingsState.rows).toEqual(20)
      expect(fieldValue.rows).toEqual(40)
    }))

  it("Too small value", () => runActionTest(baseProps,
    (settings) => {
      changeInput(settings, "#rowsCnt", "0")
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual(badRowValueError)
      expect(isApplyButtonDisabled).toBeTruthy()
      expect(settingsState.rows).toEqual(20)
      expect(fieldValue.rows).toEqual(0)
    }))

  it("Not a number", () => runActionTest(baseProps,
    (settings) => {
      changeInput(settings, "#rowsCnt", "hehm")
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual(badRowValueError)
      expect(isApplyButtonDisabled).toBeTruthy()
      expect(settingsState.rows).toEqual(20)
      expect(fieldValue.rows).toEqual(NaN)
    }))

  it("Float number", () => runActionTest(baseProps,
    (settings) => {
      changeInput(settings, "#rowsCnt", "1.2")
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual(badRowValueError)
      expect(isApplyButtonDisabled).toBeTruthy()
      expect(settingsState.rows).toEqual(20)
      expect(fieldValue.rows).toEqual(1.2)
    }))

  interface SettingsProps {
    columns: number
    rows: number
    seed: number
  }

  const badRowValueError = "Row numbers should be a integer number no less than 1 and not greater than 20"
  const baseProps: SettingsProps = {columns: 40, rows: 20, seed: 0}

  function runActionTest(initValue: SettingsProps,
                         action: (settings: ReactWrapper) => void,
                         afterAction: (errorMessage: string, isApplyButtonDisabled: boolean, settingsState: SettingsProps, fieldValue: SettingsProps) => void) {
    let columns = initValue.columns
    let rows = initValue.rows
    let seed = initValue.seed
    const settings = mount(<Settings columns={columns} rows={rows} seed={seed}
                                     onSettingsChange={(newRows: number, newColumns: number, newSeed: number) => {
                                       columns = newColumns
                                       rows = newRows
                                       seed = newSeed
                                     }}/>)
    action(settings)
    settings.update()
    const errMsg = settings.find(".Mui-error").filter("p").map(el => el.text()).join()
    const disabled = findButton(settings, ".settingsButton").props().disabled as boolean
    const columnsFieldValue = Number(findInput(settings, "#columnsCnt").props().value)
    const rowsFieldValue = Number(findInput(settings, "#rowsCnt").props().value)
    const seedFieldValue = Number(findInput(settings, "#seed").props().value)
    afterAction(errMsg, disabled, {columns, rows, seed}, {
      columns: columnsFieldValue,
      rows: rowsFieldValue,
      seed: seedFieldValue
    })
  }

})