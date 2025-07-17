import { sleep } from '../../utils/common.js'
import { TASKS } from '../../utils/constants.js'
import { initRealBrowser } from './browser.js'
import { generateNonce } from 'siwe'

export async function connectXAccount(client) {
    client.log('Connecting X account...')
    let retry = 5
    let attempt = 0
    const [username, password, twoFa] = client.account.xNetwork.split('|')

    while (attempt < retry) {
        attempt++
        const browser = await initRealBrowser(client)

        try {
            // await initOKXWallet(browser, client.account.privateKey)
            // await loginMomentum(browser)
            await loginX(browser, username, password, twoFa, client)
            await linkXAccount(browser, client.basicUserInfo.id, client)
            return
        } catch (error) {
            // twitter account suspended
            if (error.message.includes('suspended') || error.message.includes('locked')) {
                throw error
            }
            client.err(`Attempt ${attempt} to connect X account failed: ${error}`)
            if (attempt !== retry) {
                client.sleep(5000)
            }
        } finally {
            await browser.close()
        }
    }
}

export async function initOKXWallet(browser, privateKey) {
    console.log('Initializing OKX wallet...')
    const password = 'abcxyz123'
    const defaultWalletTarget = await browser.waitForTarget(target => {
        const pattern = new RegExp(`^chrome-extension://[^/]+/notification\.html`)
        return pattern.test(target.url())
    })
    const defaultWalletPage = await defaultWalletTarget.page()
    await defaultWalletPage.waitForNavigation({ waitUntil: 'networkidle2' })

    const OKX_ID = defaultWalletPage.url().match(/chrome-extension:\/\/([^/]+)/)[1]

    // check if the wallet is already initialized
    let importButton = null
    importButton = await defaultWalletPage.$("xpath///span[normalize-space(text())='Import wallet']")

    // Init wallet flow
    if (importButton) {
        await defaultWalletPage.close()
        const walletPage = await browser.newPage()
        await walletPage.goto(`chrome-extension://${OKX_ID}/notification.html#/import-with-seed-phrase-and-private-key`, {
            waitUntil: 'networkidle2',
        })

        const privateKeyTab = await walletPage.waitForSelector("xpath///div[normalize-space(text())='Private key']")
        await privateKeyTab.click()

        const inputArea = await walletPage.waitForSelector("xpath///textarea[@type='password']")
        await inputArea.type(privateKey)

        await sleep(2000)

        const confirmBtn = await walletPage.waitForSelector("xpath///span[normalize-space(text())='Confirm']")
        await confirmBtn.click()

        // const suiNetworkBtn = await walletPage.waitForSelector("xpath///span[normalize-space(text())='EVM networks']")
        // await suiNetworkBtn.click()

        await sleep(5000)

        const confirmBtn2 = await walletPage.waitForSelector("xpath///span[normalize-space(text())='Confirm']")
        await confirmBtn2.click()

        const passwordOption = await walletPage.waitForSelector("xpath///div[normalize-space(text())='Password']")
        await passwordOption.click()

        const nextBtn = await walletPage.waitForSelector("xpath///span[normalize-space(text())='Next']")
        await nextBtn.click()

        const passwordInput = await walletPage.waitForSelector("xpath///input[@type='password' and starts-with(@placeholder, 'Enter at least 8 characters')]")
        await passwordInput.type(password)

        const confirmPasswordInput = await walletPage.waitForSelector("xpath///input[@type='password' and starts-with(@placeholder, 'Re-enter new password')]")
        await confirmPasswordInput.type(password)

        const confirmBtn3 = await walletPage.waitForSelector("xpath///span[normalize-space(text())='Confirm']")
        await confirmBtn3.click()

        const startBtn = await walletPage.waitForSelector("xpath///span[normalize-space(text())='Start your Web3 journey']")
        await startBtn.click()
        await sleep(5000)
        await walletPage.close()
    }
    // Unlock wallet flow
    else {
        const passwordInput = await defaultWalletPage.waitForSelector("xpath///input[@type='password']")
        await passwordInput.type(password)

        const unlockBtn = await defaultWalletPage.waitForSelector("xpath///span[normalize-space(text())='Unlock']")
        await unlockBtn.click()

        await sleep(1000)
        await defaultWalletPage.close()
    }
    console.log('OKX wallet initialized successfully')
}

export async function loginMomentum(browser) {
    let galxePage = await browser.newPage()
    await galxePage.goto('https://app.galxe.com/quest/Momentum/GCy6btpWaf', {
        waitUntil: 'domcontentloaded',
        timeout: 100000,
    })

    console.log('Load page done')

    let isLoginSuccess = false

    console.log('Waiting for login button...')
    await galxePage
        .waitForSelector('xpath///div[text()="Log in"]', {
            visible: true,
            timeout: 60000,
        })
        .then(async signInBtn => {
            await signInBtn.click()
            await sleep(10000)

            // Popup select wallet
            try {
                const okxBtn = await galxePage.waitForSelector('xpath///div[text()="OKX"]', {
                    visible: true,
                    timeout: 10000,
                })
                await okxBtn.click()

                let walletTarget = await browser.waitForTarget(target => {
                    const pattern = new RegExp(`^chrome-extension://[^/]+/notification.html`)
                    return pattern.test(target.url())
                })
                let walletPage = await walletTarget.page()
                const extId = walletPage.url().match(/chrome-extension:\/\/([^/]+)/)[1]
                await walletPage.bringToFront()

                let connectBtn = await walletPage.waitForSelector('xpath///div[text()="Connect"]', {
                    visible: true,
                })
                await connectBtn.click()

                await sleep(5000)

                const walletTab = await browser.newPage()
                await walletTab.goto(`chrome-extension://${extId}/popup.html`, {
                    waitUntil: 'networkidle2',
                })

                let confirmBtn = await walletTab.waitForSelector('xpath///div[text()="Confirm"]', {
                    visible: true,
                })
                await confirmBtn.click()

                await sleep(10000)
                if (walletTab && !walletTab.isClosed()) {
                    await walletTab.close()
                }
                console.log('Login success by OKX wallet')
                isLoginSuccess = true
            } catch (error) {}

            // Recent login
            try {
                const recentBtn = await galxePage.waitForSelector('xpath///div[normalize-space(text())="Recent"]', {
                    visible: true,
                    timeout: 10000,
                })
                await recentBtn.click()

                let connectTarget = await browser.waitForTarget(target => {
                    const pattern = new RegExp(`^chrome-extension://[^/]+/notification.html`)
                    return pattern.test(target.url())
                })
                let walletPopup = await connectTarget.page()
                await walletPopup.bringToFront()

                let connectBtn = await walletPopup.waitForSelector('xpath///div[text()="Connect"]', {
                    visible: true,
                })
                await connectBtn.click()

                await sleep(10000)
                console.log('Login success by recent account')
                isLoginSuccess = true
            } catch (error) {}
        })
        .catch(async () => {
            // already logged in
            isLoginSuccess = await galxePage
                .waitForSelector('img[alt="avatar"]', { timeout: 10000 })
                .then(() => true)
                .catch(() => false)
        })

    if (galxePage && !galxePage.isClosed()) {
        await galxePage.close()
    }

    if (!isLoginSuccess) {
        throw new Error('Failed to login to Galxe.')
    } else {
        console.log('Successfully logged in to Galxe.')
    }
}

export async function loginGalxe(browser, client) {
    console.log('Logging in to Galxe...')
    const page = await browser.newPage()

    // Truy cập domain chính để có thể set cookie
    await page.goto('https://app.galxe.com', { waitUntil: 'domcontentloaded' })

    // Set localStorage trước (nếu có)
    const localStorage = client.getLocalStorage()
    await page.evaluate(ls => {
        for (const [key, value] of Object.entries(ls)) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }, localStorage)

    // Set cookies
    const cookies = client.getCookie().map(c => ({
        ...c,
        value: String(c.value ?? ''),
    }))
    await page.setCookie(...cookies)

    // Vào link quest
    await page.goto('https://app.galxe.com/quest/D3/GCsnqtmunA', {
        waitUntil: 'networkidle2',
    })

    // Screenshot để kiểm tra
    await page.screenshot({ path: 'galxe-login-check.png' })

    await page.close()
    console.log('✅ Logged in to Galxe successfully.')
}

export async function get2FaCode(client, twoFa) {
    const res = await client.get(`https://2fa.live/tok/${twoFa}`)
    return res?.token
}

async function checkAccountSuspended(page, errorMsg) {
    const suspendedMsgAppeared = await page
        .waitForSelector('xpath///span[normalize-space(text())="Your account is suspended and is not permitted to perform this action."]', { timeout: 10000 })
        .then(() => true)
        .catch(() => false)

    if (suspendedMsgAppeared) {
        await page.close()
        throw new Error(errorMsg)
    }
}

async function checkAccountLocked(page, errorMsg) {
    const lockedMsgAppeared = await page
        .waitForSelector('xpath///div[normalize-space(text())="Your account has been locked."]', { timeout: 10000 })
        .then(() => true)
        .catch(() => false)

    if (lockedMsgAppeared) {
        await page.close()
        throw new Error(errorMsg)
    }
}

export async function loginX(browser, username, password, twoFa, client) {
    let xPage = await browser.newPage()
    await xPage.goto('https://x.com/home', { waitUntil: 'networkidle2', timeout: 100000 })
    // Hide Google Sign In button because puppeteer-real-browser regconize it as a turntile challenge
    await xPage.addStyleTag({
        content: `
                div[data-testid="google_sign_in_container"] {
                display: none !important;
                }
            `,
    })

    await Promise.all([checkAccountSuspended(xPage, `Twitter account ${username}|${password}|${twoFa} is suspended.`), checkAccountLocked(xPage, `Twitter account ${username}|${password}|${twoFa} is locked.`)])

    let url = await xPage.url()
    if (!url.includes('login')) {
        await xPage.close() // Already logged in
        return
    }

    let usernameInput = await xPage.waitForSelector('xpath///*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div[4]/label/div/div[2]/div/input', { timeout: 60000 })
    await usernameInput.type(username)

    await sleep(2000)

    let nextBtn = await xPage.waitForSelector('xpath//html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/button[2]')
    await nextBtn.click()

    await sleep(2000)

    let passwordInput = await xPage.waitForSelector('xpath//html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[3]/div/label/div/div[2]/div[1]/input')
    await passwordInput.type(password)

    await sleep(2000)

    const loginBtn = await xPage.waitForSelector('xpath//html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div/button')
    await loginBtn.click()

    await sleep(2000)

    // Get 2FA code
    const twoFaCode = await get2FaCode(client, twoFa)

    const twoFaInput = await xPage.waitForSelector('xpath//html/body/div[1]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[2]/label/div/div[2]/div/input')
    await twoFaInput.type(twoFaCode)

    await sleep(2000)

    const nextBtn2 = await xPage.waitForSelector('xpath//html/body/div[1]/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/button')
    await nextBtn2.click()

    await sleep(5000)

    // waiting for solve turnstile challenge
    if (xPage.url().includes('account/access')) {
        await sleep(10000)
    }

    await Promise.all([checkAccountSuspended(xPage, `Twitter account ${username}|${password}|${twoFa} is suspended.`), checkAccountLocked(xPage, `Twitter account ${username}|${password}|${twoFa} is locked.`)])

    await sleep(10000)

    // Accept cookies if prompted
    try {
        const acceptCookiesBtn = await xPage.waitForSelector('xpath///span[normalize-space(text())="Accept all cookies"]', { timeout: 5000 })
        await acceptCookiesBtn.click()

        await sleep(2000)
        await xPage.reload()
        await sleep(2000)
    } catch (error) {
        // No cookies prompt
    }

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
        const followBtn = await xPage.waitForSelector('xpath//html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/button[1]')
        await followBtn.click()
        await sleep(5000)
    }

    await xPage.close()
}

export async function linkXAccount(browser, galxeId, client) {
    let xPage = await browser.newPage()
    let text = `${generateNonce()}Verifying my Twitter account for my #GalxeID gid:${galxeId} @Galxe`
    await xPage.goto(`https://x.com/intent/post?text=${encodeURIComponent(text)}`, {
        waitUntil: 'networkidle2',
        timeout: 100000,
    })
    const postBtn = await xPage.waitForSelector('xpath///*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[3]/div[2]/div[1]/div/div/div/div[2]/div[2]/div/div/div/button[2]')
    await postBtn.click()

    const viewPostBtn = await xPage.waitForSelector('xpath///span[normalize-space(text())="View"]', { timeout: 10000 })
    await viewPostBtn.click()

    let tweetUrl = xPage.url()
    await xPage.close()

    const requestBody = {
        operationName: 'VerifyTwitterAccount',
        variables: {
            input: {
                address: `EVM:${client.wallet.address}`,
                tweetURL: tweetUrl,
            },
        },
        query: 'mutation VerifyTwitterAccount($input: VerifyTwitterAccountInput!) {\n  verifyTwitterAccount(input: $input) {\n    address\n    twitterUserID\n    twitterUserName\n    __typename\n  }\n}',
    }

    const res = await client.post('https://graphigo.prd.galaxy.eco/query', requestBody)
    if (res?.data?.verifyTwitterAccount?.twitterUserID) {
        client.success('Successfully linked X account')
    } else {
        client.err('Failed to link X account')
        throw new Error('Failed to link X account')
    }
}
