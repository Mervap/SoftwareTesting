import React from 'react';
import {mount, ReactWrapper} from 'enzyme'
import Settings from "../../app/game/Settings";

describe("Settings", () => {

  it("Change columns cnt", () => runActionTest(baseProps,
    (settings) => {
      settings.find("#columnsCnt").simulate('change', {target: {value: "20"}});
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual("")
      expect(isApplyButtonDisabled).toBeFalsy()
      expect(settingsState.columns).toEqual(40)
      expect(fieldValue.columns).toEqual(20)
    }))

  it("Change row cnt", () => runActionTest(baseProps,
    (settings) => {
      settings.find("#rowsCnt").simulate('change', {target: {value: "10"}});
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual("")
      expect(isApplyButtonDisabled).toBeFalsy()
      expect(settingsState.rows).toEqual(20)
      expect(fieldValue.rows).toEqual(10)
    }))

  it("Change seed", () => runActionTest(baseProps,
    (settings) => {
      settings.find("#seed").simulate('change', {target: {value: "10000"}});
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual("")
      expect(isApplyButtonDisabled).toBeFalsy()
      expect(settingsState.seed).toEqual(0)
      expect(fieldValue.seed).toEqual(10000)
    }))

  it("Change and apply", () => runActionTest(baseProps,
    (settings) => {
      settings.find("#columnsCnt").simulate('change', {target: {value: "50"}});
      settings.find("#rowsCnt").simulate('change', {target: {value: "15"}});
      settings.find("#seed").simulate('change', {target: {value: "12345"}});
      settings.find(".settingsButton").simulate('click')
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
      settings.find("#rowsCnt").simulate('change', {target: {value: "40"}});
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual(badRowValueError)
      expect(isApplyButtonDisabled).toBeTruthy()
      expect(settingsState.rows).toEqual(20)
      expect(fieldValue.rows).toEqual(40)
    }))

  it("Too small value", () => runActionTest(baseProps,
    (settings) => {
      settings.find("#rowsCnt").simulate('change', {target: {value: "0"}});
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual(badRowValueError)
      expect(isApplyButtonDisabled).toBeTruthy()
      expect(settingsState.rows).toEqual(20)
      expect(fieldValue.rows).toEqual(0)
    }))

  it("Not a number", () => runActionTest(baseProps,
    (settings) => {
      settings.find("#rowsCnt").simulate('change', {target: {value: "hehm"}});
    }, (errorMessage, isApplyButtonDisabled, settingsState, fieldValue) => {
      expect(errorMessage).toEqual(badRowValueError)
      expect(isApplyButtonDisabled).toBeTruthy()
      expect(settingsState.rows).toEqual(20)
      expect(fieldValue.rows).toEqual(NaN)
    }))

  it("Float number", () => runActionTest(baseProps,
    (settings) => {
      settings.find("#rowsCnt").simulate('change', {target: {value: "1.2"}});
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

  const badRowValueError = "Row numbers should be a integer number no less than 1 and not greater than 30"
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
    const errMsg = settings.find(".error").text()
    const disabled = settings.find(".settingsButton").props().disabled as boolean
    const columnsFieldValue = Number(settings.find("#columnsCnt").props().value)
    const rowsFieldValue = Number(settings.find("#rowsCnt").props().value)
    const seedFieldValue = Number(settings.find("#seed").props().value)
    afterAction(errMsg, disabled, {columns, rows, seed}, {
      columns: columnsFieldValue,
      rows: rowsFieldValue,
      seed: seedFieldValue
    })
  }

})