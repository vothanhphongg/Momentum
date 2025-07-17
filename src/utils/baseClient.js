import fs from 'fs'
import { browser_ } from '@vannb/js-utils'
import { stringValueToProxy } from './proxy.js'
import { FetchRequest, ethers } from 'ethers'
import { HttpsProxyAgent } from 'https-proxy-agent'
import axios from 'axios'
import dotenv from 'dotenv'
import { sleep } from './common.js'
import path from 'path'
dotenv.config()

class BaseClient {
    constructor(account) {
        const { privateKey, seedPhrase, refCode, proxy } = account
        this.account = account
        this.refCode = refCode
        this.token = null
        this.headers = {}

        const { agent, provider, wallet } = createWalletAndProvider({
            url: 'https://sui-mainnet-endpoint.blockvision.org/',
            privateKey,
            seedPhrase,
            proxy,
        })
        this.agent = agent
        this.provider = provider
        this.wallet = wallet
    }
    async get(url) {
        const retry = 5
        const pollLimit = 100
        const pollInterval = 5000
        for (let attempt = 1; attempt <= retry; attempt++) {
            try {
                let response = await axios.get(url, {
                    headers: this.headers,
                    httpAgent: this.agent,
                    httpsAgent: this.agent,
                })

                // Handle 202 status code (Accepted but processing)
                if (response.status === 202) {
                    this.debug(`GET ${url} returned 202 Accepted, polling for completion`)

                    // Get the polling URL, either from Location header or use the same URL
                    const pollUrl = response.headers['location'] || url

                    // Poll until we get a final response or reach the poll limit
                    let pollCount = 0
                    while (pollCount < pollLimit) {
                        await sleep(pollInterval)
                        pollCount++

                        this.debug(`Polling attempt ${pollCount} for ${pollUrl}`)
                        const pollResponse = await axios.get(pollUrl, {
                            headers: this.headers,
                            httpAgent: this.agent,
                            httpsAgent: this.agent,
                        })

                        // If we get a non-202 response, proceed with normal processing
                        if (pollResponse.status !== 202) {
                            response = pollResponse
                            break
                        }

                        // If we're still getting 202s after reaching our poll limit
                        if (pollCount >= pollLimit) {
                            this.debug(`Reached polling limit (${pollLimit}) for ${pollUrl}`)
                            throw new Error(
                                `Processing timeout: Server still processing after ${pollLimit} polling attempts`
                            )
                        }
                    }
                }

                this.debug(`GET ${url} response:  ${JSON.stringify(response.data)}`)
                return response.data
            } catch (error) {
                this.debug(`Attempt ${attempt} to GET failed: ${error}`)
                if (attempt !== retry) {
                    await sleep(pollInterval)
                }
            }
        }
        this.err('Failed to GET after multiple attempts.')
        return null
    }

    async post(url, body = null, options = {}) {
        const retry = 3
        const pollLimit = 100
        const pollInterval = 5000
        let ua = browser_.generateRandomUserAgent()
        for (let attempt = 1; attempt <= retry; attempt++) {
            try {
                const response = await axios.post(url, body, {
                    ...options,
                    headers: {
                        ...this.headers,
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
                        'content-type': 'application/json',
                        priority: 'u=1, i',
                        // "sec-ch-ua": ua.brandString,
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'cross-site',
                        'user-agent': ua.userAgent,
                        ...(options?.headers || {}),
                    },
                    httpAgent: this.agent,
                    httpsAgent: this.agent,
                })

                // Handle 202 status code (Accepted but processing)
                if (response.status === 202) {
                    this.debug(`POST ${url} returned 202 Accepted, polling for completion`)

                    // Get the polling URL, either from Location header or use the same URL
                    const pollUrl = response.headers['location'] || url
                    const isNewUrl = pollUrl !== url

                    // Poll until we get a final response or reach the poll limit
                    let pollCount = 0
                    while (pollCount < pollLimit) {
                        await sleep(pollInterval)
                        pollCount++

                        this.debug(`Polling attempt ${pollCount} for ${pollUrl}`)
                        const pollResponse = await axios({
                            method: isNewUrl ? 'GET' : 'POST',
                            url: pollUrl,
                            headers: this.headers,
                            data: !isNewUrl && body != null ? body : null,
                            httpAgent: this.agent,
                            httpsAgent: this.agent,
                        })

                        // If we get a non-202 response, proceed with normal processing
                        if (pollResponse.status !== 202) {
                            return pollResponse.data
                        }

                        // If we're still getting 202s after reaching our poll limit
                        if (pollCount >= pollLimit) {
                            this.debug(`Reached polling limit (${pollLimit}) for ${pollUrl}`, this.account)
                            throw new Error(
                                `Processing timeout: Server still processing after ${pollLimit} polling attempts`
                            )
                        }
                    }
                }

                this.debug(
                    `POST ${url} ${typeof body == 'string' ? body : JSON.stringify(body)} response: 
                    ${JSON.stringify(response.data)}`
                )
                return response?.data
            } catch (error) {
                this.debug(`Attempt ${attempt} to POST failed: ${error}`)
                if (attempt !== retry) {
                    await sleep(pollInterval)
                }
            }
        }
        this.err('Failed to POST after multiple attempts.')
        return null
    }

    async report(opts = {}) {
        try {
            const accjson = JSON.parse(fs.readFileSync(path.resolve('account.json'), 'utf8'))
            const url = 'http://103.166.182.164:65123/api/v1/user-report/sync-by-template'
            const data = {
                apiKey: accjson?.apiKey || 'unknown-api-key',
                deviceId: accjson?.deviceId || 'unknown-device-id',
                userNodeId: accjson?.userNodeId || 'unknown-user-node-id',
                data: {
                    project: 'Momentum2',
                    status: 'success',
                    ...opts,
                },
            }
            console.log('reportCloudAPI', data)
            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            }
            const response = await axios.post(url, data, config)
            console.log('response api report', response.data)
            return response.data
        } catch (error) {
            this.err(`Report error: ${error.message}`)
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async awaitWithTimeout(promise, timeoutMs = 60 * 1000) {
        const timeoutPromise = new Promise(resolve => {
            setTimeout(() => resolve(null), timeoutMs)
        })
        // resolve the promise after timeout (prevent run inifinitely)
        return await Promise.race([promise, timeoutPromise])
    }

    log(...message) {
        const date = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '')
        console.log(`[${date}] [LOG] [${this.account.seedPhrase}] ${message}`)
    }
    err(...message) {
        const date = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '')
        console.log('\x1b[31m%s\x1b[0m', `[${date}] [ERROR] [${this.account.seedPhrase}] ${message}`)
    }
    success(...message) {
        const date = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '')
        console.log('\x1b[32m%s\x1b[0m', `[${date}] [SUCCESS] [${this.account.seedPhrase}] ${message}`)
    }
    debug(...message) {
        let isDebug = process.env.ENVIROMENT === 'development'
        if (!isDebug) return
        const date = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '')
        console.log('\x1b[34m%s\x1b[0m', `[${date}] [DEBUG] [${this.account.seedPhrase}] ${message}`)
    }
}

function createWalletAndProvider({ url, privateKey, seedPhrase, proxy }) {
    let agent
    if (proxy && proxy.length > 0) {
        const proxyStr = stringValueToProxy(proxy[0])
        agent = new HttpsProxyAgent(proxyStr, {
            keepAlive: true,
            rejectUnauthorized: false,
        })
    }

    const fetchRequest = new FetchRequest(url)
    fetchRequest.getUrlFunc = FetchRequest.createGetUrlFunc({ agent })

    const provider = new ethers.JsonRpcProvider(fetchRequest)
    const wallet = privateKey ? new ethers.Wallet(privateKey) : ethers.Wallet.fromPhrase(seedPhrase)

    return {
        agent,
        provider,
        wallet: wallet.connect(provider),
    }
}

export default BaseClient
