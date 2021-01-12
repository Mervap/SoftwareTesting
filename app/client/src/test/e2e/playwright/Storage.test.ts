describe('Go to storage', () => {
  it('Click on login', async () => {
    const cookies = process.env.COOKIES
    expect(cookies).not.toBeUndefined()
    await context.addCookies(JSON.parse(cookies as string));

    await page.goto('http://localhost:8080')
    await page.click("//*[@id=\"root\"]/div/div[1]/div[1]/div/div[2]/nav/ul/li[3]")
    expect(page.url()).toEqual("http://localhost:8080/storage")
    expect(await page.$(".storage")).not.toBeNull()
  })

  it('Go then not login', async () => {
    await page.goto('http://localhost:8080/storage')
    expect(page.url()).toEqual("http://localhost:8080/")
    expect(await page.$(".storage")).toBeNull()
  })
})

export {}
