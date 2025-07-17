import { initBrowser } from './src/core/basicOperations/browser.js'
import Client from './src/core/client.js'

const account = {
    id: 3,
    email: 'buyuy@tourzy.us',
    seedPhrase: 'hint novel pigeon venue trade sea sphere divert curious amazing leader enjoy',
    xNetwork: 'sinhtest004|Anhzer020|BZDWQYESBN73DW5Z',
    privateKey: '456bbd34cc4039be838be82aefacfce0318b5a04e10c935b859c01154fd37362',
    proxy: [],
}

export const GEETEST_CAPTCHA_ID = '244bcb8b9846215df5af4c624a750db4'

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

    // Step 3: Đợi đến khi result được đặt vào window
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

const client = new Client(account)
const captcha = await solveGeetestCaptcha(client)
console.log('🚀 ~ captcha: ', captcha)
