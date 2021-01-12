import {ElementHandle} from "playwright-core/types/types";
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot });

describe('Make single iteration', () => {

  const playButtonXPath = "//*[@id=\"root\"]/div/div[2]/div[2]/div[2]/div[2]/button"

  const getGrid = async () => {
    const grid = await page.$('.grid')
    expect(grid).not.toBeNull()
    return grid as ElementHandle;
  }

  beforeEach(async () => {
    await page.goto('http://localhost:8080')

    await page.fill("//*[@id=\"columnsCnt\"]", "15")
    await page.fill("//*[@id=\"rowsCnt\"]", "15")
    await page.fill("//*[@id=\"seed\"]", "1")
    await page.click("//*[@id=\"root\"]/div/div[2]/div[2]/div[2]/div[1]/button")
  })

  it('Iteration 15x15', async () => {
    await page.click(playButtonXPath)
    await page.waitForTimeout(300)
    await page.click(playButtonXPath)

    const gridImage = await (await getGrid()).screenshot();
    expect(gridImage).toMatchImageSnapshot({ customSnapshotIdentifier: `iteration_15x15-${browserName}` })
  })

  it('Iteration 15x15 not change after stop', async () => {
    await page.click(playButtonXPath)
    await page.waitForTimeout(300)
    await page.click(playButtonXPath)

    const gridImage1 = await (await getGrid()).screenshot();
    expect(gridImage1).toMatchImageSnapshot({ customSnapshotIdentifier: `iteration_15x15_stop-${browserName}` })
    await page.waitForTimeout(1000)

    const gridImage2 = await (await getGrid()).screenshot();
    expect(gridImage2).toMatchImageSnapshot({ customSnapshotIdentifier: `iteration_15x15_stop-${browserName}` })
  })
})
