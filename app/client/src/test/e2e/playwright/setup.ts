import {chromium} from "playwright";
const { setup: setupDevServer } = require('jest-process-manager')

module.exports = async () => {
  await setupDevServer({
    command: `cd ../api && ./gradlew bootRun`,
    port: 8080,
    launchTimeout: 30000,
    debug: true
  })

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/login')
  await page.fill("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[1]/div/input", "TestUser")
  await page.fill("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div/input", "qwerty")
  await page.click("//*[@id=\"root\"]/div/div[2]/div[2]/div/button")

  await page.waitForTimeout(1000)
  const cookies = await page.context().cookies();
  process.env.COOKIES = JSON.stringify(cookies);
  console.log("Setup successful")
  await browser.close()
};
