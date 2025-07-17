import path from 'path'
import proxyChain from 'proxy-chain'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import { stringValueToProxy } from '../../utils/proxy.js'

const EXT_PATH = path.resolve('metamask')
puppeteer.use(StealthPlugin())

export async function initBrowser(client) {
    let proxies = client.account.proxy || []
    const proxyServer = proxies.length > 0 ? await proxyChain.anonymizeProxy(stringValueToProxy(proxies[0])) : null

    return await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        // userDataDir: 'profile',
        args: [
            `--disable-extensions-except=${EXT_PATH}`,
            `--load-extension=${EXT_PATH}`,
            proxyServer ? `--proxy-server=${proxyServer}` : '',
            // '--no-sandbox',
            // '--disable-setuid-sandbox',
            // '--window-size=1280,800',
        ],
        // defaultViewport: null,
    })
}
