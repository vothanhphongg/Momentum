import { initBrowser } from './browser.js'

const GEETEST_CAPTCHA_ID = '244bcb8b9846215df5af4c624a750db4'

export async function solveGeetestCaptcha(client) {
    const browser = await initBrowser(client)
    const page = await browser.newPage()
    await page.goto('https://example.com/')
    await page.addScriptTag({ url: 'https://static.geetest.com/v4/gt4.js' })
    await page.evaluate(GEETEST_CAPTCHA_ID => {
        window.initGeetest4(
            {
                hideSuccess: true,
                captchaId: GEETEST_CAPTCHA_ID,
                product: 'bind',
            },
            function (captcha) {
                console.log('Captcha initialized successfully')
                captcha
                    .onNextReady(() => captcha.showCaptcha())
                    .onSuccess(() => {
                        const result = captcha.getValidate()
                        window.__GEETEST_RESULT__ = result
                        captcha.destroy()
                    })
                    .onClose(() => {
                        captcha.destroy()
                    })
            }
        )
    }, GEETEST_CAPTCHA_ID)

    const result = await page.waitForFunction(() => window.__GEETEST_RESULT__, { timeout: 120000 })
    const value = await result.jsonValue()

    await browser.close()

    return value
        ? {
              lotNumber: value.lot_number,
              captchaOutput: value.captcha_output,
              passToken: value.pass_token,
              genTime: value.gen_time,
          }
        : null
}
