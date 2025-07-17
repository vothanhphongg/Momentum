import fs from 'fs'
import { Mutex } from 'async-mutex'
import Client from './src/core/client.js'
import { CAMPAIGNS, TASKS } from './src/utils/constants.js'
import { initBrowser } from './src/core/basicOperations/browser.js'

const mutex = new Mutex()

async function processAccount(account) {
    const client = new Client(account)
    try {
        const tasks = [
            // Login and create Galxe account if not exists
            async () => {
                await client.login()
                const isExistedAccount = await client.isGalxeIDExist()
                if (!isExistedAccount) {
                    await client.createNewGalxeAccount()
                }
                client.basicUserInfo = await client.getBasicUserInfo()
                client.campaignDetail = await client.getCampaignDetail()
            },
            // Connect X Account if not already connected
            async () => {
                if (client.account.xNetwork.length > 0 && client.basicUserInfo?.hasTwitter == false) {
                    const release = await mutex.acquire()
                    await client.connectXAccount()
                    release()
                    await client.getBasicUserInfo() // update user info after connecting
                }
            },
            // Task 1: Follow Galxe, visit Telegram
            async () => {
                await client.followMomentum()
                await client.followMomentumOnX()
                await client.visitTelegram()
            },
            // Task 2: Visit Page
            async () => {
                await client.visitPage()
            },
            // Task 3: Twitter Operations
            async () => {
                if (client.basicUserInfo?.hasTwitter) {
                    await client.twitterOperations()
                }
            },
            // Task 4: Solve Quiz
            async () => {
                await client.solveQuiz()
            },
            // Claim Point
            async () => {
                const release = await mutex.acquire()
                await client.claimPoint()
                release()
            },
            // Provide liquidity //FIXME: This task has a bug
            // async () => {
            //     await client.provideLiquidity()
            // },
        ]

        for (const task of tasks) {
            try {
                await task()
            } catch (error) {
                client.err(`Error during task: ${error}`)
                await client.report({
                    account: account.seedPhrase,
                    status: error.toString(),
                })
            }
        }

        // Update campaign details after processing tasks to calculate total points
        client.campaignDetail = await client.getCampaignDetail()
        const totalPoints = Object.values(CAMPAIGNS).reduce(
            (sum, campaign) => sum + client.getClaimedPoints(campaign),
            0
        )
        await client.report({
            account: account.seedPhrase,
            point: totalPoints,
        })
    } catch (error) {
        client.err(`Error processing account: ${error}`)
    }

    // nextCycle().then(() => processAccount(account))
}

async function main() {
    const accounts = JSON.parse(fs.readFileSync('./account.json', 'utf-8')).account
    const batchSize = 10

    console.log(`Total accounts: ${accounts.length}`)

    for (let i = 0; i < accounts.length; i += batchSize) {
        const batch = accounts.slice(i, i + batchSize)
        await Promise.all(batch.map(processAccount))
    }
}

main()
