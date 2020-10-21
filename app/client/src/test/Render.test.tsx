import React from 'react';
import {render} from 'enzyme'
import App from '../app/App';

it("Game grid render", () => {
  let mainApp = render(<App/>)
  let gridElement = mainApp.find(".game")
  expect(gridElement.length).toEqual(1)
})

describe("Sidebar render", () => {

  let mainApp: cheerio.Cheerio
  beforeEach(() => mainApp = render(<App/>))

  it("Sidebar", () => {
    let sidebar = mainApp.find(".pro-sidebar")
    expect(sidebar.length).toEqual(1)
  })

  it("Sidebar header", () => {
    let sidebarButton = mainApp.find(".pro-sidebar-header")
    expect(sidebarButton.length).toEqual(1)
  })

  it("Sidebar button", () => {
    let sidebarButton = mainApp.find(".pro-menu-item")
    expect(sidebarButton.length).toEqual(3)
  })

  it("Sidebar footer", () => {
    let sidebarButton = mainApp.find(".pro-sidebar-footer")
    expect(sidebarButton.length).toEqual(1)
  })
})

describe("Setting render", () => {
  let mainApp: cheerio.Cheerio
  beforeEach(() => mainApp = render(<App/>))

  it("Settings column cnt", () => {
    let columnCnt = mainApp.find("#columnsCnt")
    expect(columnCnt.length).toEqual(1)
    let settingLabel = mainApp.find("label:contains('Columns cnt')")
    expect(settingLabel.length).toEqual(1)
  })

  it("Settings row cnt", () => {
    let rowCnt = mainApp.find("#rowsCnt")
    expect(rowCnt.length).toEqual(1)
    let settingLabel = mainApp.find("label:contains('Rows cnt')")
    expect(settingLabel.length).toEqual(1)
  })

  it("Settings seed", () => {
    let seed = mainApp.find("#seed")
    expect(seed.length).toEqual(1)
    let settingLabel = mainApp.find("label:contains('Seed')")
    expect(settingLabel.length).toEqual(1)
  })
})

describe("Game control render", () => {

  let mainApp: cheerio.Cheerio
  beforeEach(() => mainApp = render(<App/>))

  it("Step delay", () => {
    let columnCnt = mainApp.find("#delayControl")
    expect(columnCnt.length).toEqual(1)
    let settingLabel = mainApp.find("label:contains('Step delay')")
    expect(settingLabel.length).toEqual(1)
  })

  it("Min for alive row cnt", () => {
    let columnCnt = mainApp.find("#minAliveControl")
    expect(columnCnt.length).toEqual(1)
    let settingLabel = mainApp.find("label:contains('Min for alive')")
    expect(settingLabel.length).toEqual(1)
  })

  it("Max for alive", () => {
    let columnCnt = mainApp.find("#maxAliveControl")
    expect(columnCnt.length).toEqual(1)
    let settingLabel = mainApp.find("label:contains('Max for alive')")
    expect(settingLabel.length).toEqual(1)
  })

  it("Count for birth", () => {
    let columnCnt = mainApp.find("#cntBirthControl")
    expect(columnCnt.length).toEqual(1)
    let settingLabel = mainApp.find("label:contains('Count for birth')")
    expect(settingLabel.length).toEqual(1)
  })
})