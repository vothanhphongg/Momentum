import os from 'os'
import fs from 'fs'
import path from 'path'
import proxyChain from 'proxy-chain'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { connect } from 'puppeteer-real-browser'

import { stringValueToProxy } from '../../utils/proxy.js'

const OKX_PATH = path.resolve('OKX')
puppeteer.use(StealthPlugin())

export async function initBrowser(client) {
    let proxies = client.account.proxy || []
    const proxyServer = proxies.length > 0 ? await proxyChain.anonymizeProxy(stringValueToProxy(proxies[0])) : null

    return await puppeteer.launch({
        headless: true,
        executablePath: getExecutablePath(),
        args: [
            // `--disable-extensions-except=${OKX_PATH}`,
            // `--load-extension=${OKX_PATH}`,
            proxyServer ? `--proxy-server=${proxyServer}` : '',
        ],
    })
}

export async function initRealBrowser(client) {
    let proxies = client.account.proxy || []
    const proxyServer = proxies.length > 0 ? await proxyChain.anonymizeProxy(stringValueToProxy(proxies[0])) : null
    // create profile folder
    let profileFolderName = client.account.privateKey.substring(2)
    if (!fs.existsSync('profiles/' + profileFolderName)) {
        fs.mkdirSync('profiles/' + profileFolderName, { recursive: true })
    }

    return (
        await connect({
            args: [
                `--disable-extensions-except=${OKX_PATH}`,
                `--load-extension=${OKX_PATH}`,
                proxyServer ? `--proxy-server=${proxyServer}` : '',
                '--window-size=1280,800',
                '--no-sandbox',
            ],
            connectOption: {
                defaultViewport: null,
            },
            customConfig: {
                userDataDir: `${path.resolve('profiles')}/${profileFolderName}`,
            },
            turnstile: true,
            headless: false,
            disableXvfb: true,
        })
    ).browser
}

function getExecutablePath() {
    const platform = os.platform()

    if (platform === 'win32') {
        // Nếu dùng bản Chrome 64-bit mặc định
        return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        // Nếu cần fallback sang bản 32-bit:
        // return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    } else if (platform === 'darwin') {
        // macOS
        return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    } else if (platform === 'linux') {
        return '/usr/bin/google-chrome'
    }

    throw new Error('Unsupported platform: ' + platform)
}
