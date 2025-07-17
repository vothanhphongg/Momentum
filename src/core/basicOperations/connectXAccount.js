import { sleep } from '../../utils/common.js'
import clipboard from 'clipboardy'
import { TASKS } from '../../utils/constants.js'
import { initBrowser } from './browser.js'

// export const extId = 'ehcahibdndeealdnhjhlijhihpmchokn'
export const extId = 'meeakkaghhkgcgkigabophlfdnlgfaaf'

export async function connectXAccount(client) {
    client.log('Connecting X account...')
    let retry = 10
    let attempt = 0
    const [username, password, twoFa] = client.account.xNetwork.split('|')

    while (attempt < retry) {
        attempt++
        const browser = await initBrowser(client)

        try {
            await initMetaMask(browser, client.account.seedPhrase, client.account.email)
            await loginMomentum(browser)
            await loginX(browser, username, password, twoFa, client)
            await linkXAccount(browser, client.basicUserInfo.id, username)
            return
        } catch (error) {
            client.err(`Attempt ${attempt} to connect X account failed: ${error}`)
            if (attempt !== retry) {
                client.sleep(5000)
            }
        } finally {
            await browser.close()
        }
    }
}

export async function getMetaMaskPage(browser, page = 'notification', tag = '') {
    return new Promise((resolve, reject) => {
        browser.on('targetcreated', async target => {
            if (target.url().startsWith(`chrome-extension://${extId}/${page}.html${tag}`)) {
                try {
                    const page = await target.page()
                    resolve(page)
                } catch (e) {
                    reject(e)
                }
            }
        })
    })
}

export async function initMetaMask(browser, seed, password = 'password1234') {
    const metamaskpage = await getMetaMaskPage(browser, 'home')

    const agreeCheckbox = await metamaskpage.waitForSelector('xpath///*[@id="onboarding__terms-checkbox"]')
    await agreeCheckbox.click()

    const importWalletBtn = await metamaskpage.waitForSelector(
        'xpath///*[@id="app-content"]/div/div[2]/div/div/div/ul/li[3]/button'
    )
    await importWalletBtn.click()

    const noThanksBtn = await metamaskpage.waitForSelector(
        'xpath///*[@id="app-content"]/div/div[2]/div/div/div/div[2]/button[1]'
    )
    await noThanksBtn.click()

    let seedPhrases = seed.split(' ')
    for (let i = 0; i < seedPhrases.length; i++) {
        const seedInput = await metamaskpage.waitForSelector(`xpath///*[@id="import-srp__srp-word-${i}"]`)
        await seedInput.type(seedPhrases[i])
    }
    const confirmSeedBtn = await metamaskpage.waitForSelector(
        'xpath///*[@id="app-content"]/div/div[2]/div/div/div/div[4]/div/button'
    )
    await confirmSeedBtn.click()

    const passwordInput = await metamaskpage.waitForSelector(
        'xpath///*[@id="app-content"]/div/div[2]/div/div/div/div[2]/form/div[1]/label/input'
    )
    await passwordInput.type(password)

    const confirmPasswordInput = await metamaskpage.waitForSelector(
        'xpath///*[@id="app-content"]/div/div[2]/div/div/div/div[2]/form/div[2]/label/input'
    )
    await confirmPasswordInput.type(password)

    const understandCheckbox = await metamaskpage.waitForSelector(
        'xpath///*[@id="app-content"]/div/div[2]/div/div/div/div[2]/form/div[3]/label/span[1]/input'
    )
    await understandCheckbox.click()

    const importBtn = await metamaskpage.waitForSelector(
        'xpath///*[@id="app-content"]/div/div[2]/div/div/div/div[2]/form/button'
    )
    await importBtn.click()

    const doneBtn = await metamaskpage.waitForSelector('xpath//html/body/div[1]/div/div[2]/div/div/div/div[3]/button')
    await doneBtn.click()

    const nextBtn = await metamaskpage.waitForSelector('xpath//html/body/div[1]/div/div[2]/div/div/div/div[2]/button')
    await nextBtn.click()

    await sleep(1000)

    const nextBtn2 = await metamaskpage.waitForSelector('xpath//html/body/div[1]/div/div[2]/div/div/div/div[2]/button')
    await nextBtn2.click()

    await sleep(7000)

    await metamaskpage.close()
}

export async function loginMomentum(browser) {
    let page = await browser.newPage()
    await page.goto('https://app.galxe.com/quest/Momentum/GCy6btpWaf', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    })
    await page.bringToFront()

    let signinBtn = await page.waitForSelector('xpath//html/body/div[1]/header/div[1]/div[2]/div[3]/button', {
        visible: true,
    })
    await signinBtn.click()

    await sleep(5000)
    let metamaskBtn = await page.waitForSelector('xpath//html/body/div[4]/div[2]/div/div/div[2]/div', {
        visible: true,
    })
    await metamaskBtn.click()

    let connectTarget = await browser.waitForTarget(target =>
        target.url().startsWith(`chrome-extension://${extId}/notification.html`)
    )
    let connectMetamaskPage = await connectTarget.page()
    await connectMetamaskPage.bringToFront()

    let connectBtn = await connectMetamaskPage.waitForSelector(
        'xpath//html/body/div[1]/div/div/div/div[2]/div/div[3]/div/div/button[2]',
        { visible: true }
    )
    await connectBtn.click()

    await sleep(5000)

    connectTarget = await browser.waitForTarget(target =>
        target.url().startsWith(`chrome-extension://${extId}/notification.html`)
    )
    connectMetamaskPage = await connectTarget.page()
    await connectMetamaskPage.bringToFront()

    let confirmBtn = await connectMetamaskPage.waitForSelector(
        'xpath//html/body/div[1]/div/div/div/div/div[3]/div/button[2]',
        { visible: true }
    )
    await confirmBtn.click()

    await sleep(5000)

    await page.close()
}

export async function get2FaCode(browser, twoFa) {
    const page = await browser.newPage()
    await page.goto('https://2fa.live', { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.bringToFront()

    const input = await page.waitForSelector('xpath///*[@id="listToken"]')
    await input.type(twoFa)

    const submitBtn = await page.waitForSelector('xpath///*[@id="submit"]')
    await submitBtn.click()

    await sleep(3000)

    const code = await page.$eval('textarea#output', el => el.value?.trim()?.split('|')?.[1])

    await page.close()
    return code
}

export async function loginX(browser, username, password, twoFa, client) {
    let xPage = await browser.newPage()
    await xPage.goto('https://x.com/i/flow/login', { waitUntil: 'networkidle2', timeout: 100000 })

    let usernameInput = await xPage.waitForSelector(
        'xpath///*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div[4]/label/div/div[2]/div/input',
        { timeout: 60000 }
    )
    await usernameInput.type(username)

    await sleep(2000)

    let nextBtn = await xPage.waitForSelector(
        'xpath//html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/button[2]'
    )
    await nextBtn.click()

    await sleep(2000)

    let passwordInput = await xPage.waitForSelector(
        'xpath//html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[3]/div/label/div/div[2]/div[1]/input'
    )
    await passwordInput.type(password)

    await sleep(2000)

    const loginBtn = await xPage.waitForSelector(
        'xpath//html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div/button'
    )
    await loginBtn.click()

    await sleep(2000)

    // Get 2FA code
    const twoFaCode = await get2FaCode(browser, twoFa)

    const twoFaInput = await xPage.waitForSelector(
        'xpath//html/body/div[1]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[2]/label/div/div[2]/div/input'
    )
    await twoFaInput.type(twoFaCode)

    await sleep(2000)

    const nextBtn2 = await xPage.waitForSelector(
        'xpath//html/body/div[1]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/button'
    )
    await nextBtn2.click()

    await sleep(5000)

    // Follow Momentum on X
    const isFollowed = client.isTaskEligible(TASKS.FollowMMTOnX)
    if (isFollowed) {
        client.success('Already followed Momentum on X')
    } else {
        await xPage.goto(`https://x.com/intent/follow?screen_name=MMTFinance`, {
            waitUntil: 'domcontentloaded',
            timeout: 100000,
        })
        await sleep(5000)
        const followBtn = await xPage.waitForSelector(
            'xpath//html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/button[1]'
        )
        await followBtn.click()
        await sleep(5000)
    }

    await xPage.close()
}

export async function linkXAccount(browser, galxeId, username) {
    let xPage = await browser.newPage()
    let text = `Verifying my Twitter account for my #GalxeID gid:${galxeId} @Galxe`
    await xPage.goto(`https://x.com/intent/post?text=${encodeURIComponent(text)}`, {
        waitUntil: 'domcontentloaded',
        timeout: 100000,
    })
    await sleep(5000)
    const postBtn = await xPage.waitForSelector(
        'xpath///*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[3]/div[2]/div[1]/div/div/div/div[2]/div[2]/div/div/div/button[2]'
    )
    await postBtn.click()

    await xPage.goto(`https://x.com/${username}`)
    const shareBtn = await xPage.waitForSelector(
        'xpath//html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div[3]/div/div/section/div/div/div[4]/div/div/article/div/div/div[2]/div[2]/div[3]/div/div/div[6]/div/button/div/div/div'
    )
    await shareBtn.click()

    await sleep(2000)
    const copyLinkBtn = await xPage.waitForSelector(
        'xpath///*[@id="layers"]/div[2]/div/div/div/div[2]/div/div[3]/div/div/div/div[1]'
    )
    await copyLinkBtn.click()
    await sleep(5000)

    const tweetUrl = clipboard.readSync()
    await xPage.close()

    const galxePage = await browser.newPage()
    await galxePage.goto(`https://app.galxe.com/TwitterConnect`, {
        waitUntil: 'networkidle2',
        timeout: 60000,
    })

    const linkInput = await galxePage.waitForSelector(
        'xpath//html/body/div[1]/main/div[1]/div/div/div[3]/div/div[3]/input'
    )
    await linkInput.type(tweetUrl)
    await sleep(2000)
    const linkBtn = await galxePage.waitForSelector('xpath//html/body/div[1]/main/div[1]/div/div/div[3]/div/button')
    await linkBtn.click()
    await sleep(10000)
}
