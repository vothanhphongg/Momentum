import { sleep } from '../../utils/common.js'
import { CAMPAIGNS, TASKS } from '../../utils/constants.js'
import { initRealBrowser } from '../basicOperations/browser.js'
import { initOKXWallet, loginGalxe, loginMomentum } from '../basicOperations/connectXAccount.js'

const campaigns = [
    {
        id: CAMPAIGNS[0],
        name: 'Follow Momentum and Visit Telegram',
        tasks: [TASKS.FollowMMTOnX, TASKS.VisitTelegram],
    },
    {
        id: CAMPAIGNS[1],
        name: 'Visit Momentum Website, Medium, and LinkedIn',
        tasks: [TASKS.VisitWebsite, TASKS.VisitMedium, TASKS.VisitLinkedIn],
    },
    {
        id: CAMPAIGNS[2],
        name: 'Like and Retweet Momentum Tweets',
        tasks: [TASKS.LikeMMTTweet1, TASKS.LikeMMTTweet2, TASKS.LikeMMTTweet3, TASKS.ReTweet1, TASKS.ReTweet2, TASKS.ReTweet3, TASKS.ReTweet4, TASKS.LikeMMTTweet4, TASKS.LikeMMTTweet5, TASKS.ReTweet5],
    },
    {
        id: CAMPAIGNS[3],
        name: 'Solve Momentum Quizzes',
        tasks: [TASKS.Quiz1, TASKS.Quiz2, TASKS.Quiz3, TASKS.Quiz4],
    },
]

async function claim(browser, client, campaign) {
    const page = await browser.newPage()
    await page.goto(`https://app.galxe.com/quest/Momentum/${campaign.id}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    })

    // Skip switch to EVM dialog
    page.waitForSelector('xpath//html/body/div[4]/button', {
        timeout: 60000,
        visible: true,
    })
        .then(async skipBtn => await skipBtn.click())
        .catch(() => {})

    async function clickClaimButtonGalxe() {
        await sleep(5000)
        const claimButton = await page.waitForSelector('xpath///button/div[contains(text(), "Claim") and contains(text(), "Points")]', { timeout: 10000, visible: true })

        await claimButton.click()

        await sleep(30000)

        const claimFailed = await page
            .waitForSelector('xpath///div[contains(text(), "Claim failed") and @class="text-sm w-full max-w-[306px] overflow-auto break-words whitespace-normal"]', {
                timeout: 20000,
            })
            .then(el => el.evaluate(el => el.textContent))
            .catch(() => false)

        if (claimFailed) {
            await page.close()
            throw new Error(`Galxe claim failed: ${claimFailed}`)
        }

        const claimDirectlyBtn = await page.waitForSelector('xpath///button[normalize-space(text())="Claim Directly"]', { visible: true, timeout: 10000 })
        await claimDirectlyBtn.click()
        await sleep(5000)
    }

    await clickClaimButtonGalxe()

    // if Metamask prompt to add gravity mainnet network
    try {
        const approveNetworkTarget = await browser.waitForTarget(target => target.url().startsWith(`chrome-extension://`), { timeout: 5000 })
        const approveNetworkPage = await approveNetworkTarget.page()
        await approveNetworkPage.bringToFront()

        let approveBtn = await approveNetworkPage.waitForSelector('xpath//html/body/div[1]/div/div/div/div[2]/div/button[2]', { visible: true })
        await approveBtn.click()
        await sleep(5000)
        await clickClaimButtonGalxe()
    } catch (error) {}

    // Metamask confirm tx dialog
    const confirmTxTarget = await browser.waitForTarget(
        target => {
            const pattern = new RegExp(`^chrome-extension://[^/]+/notification.html`)
            return pattern.test(target.url())
        },
        { timeout: 10000 }
    )
    const confirmTxPage = await confirmTxTarget.page()
    await confirmTxPage.bringToFront()

    const isInsufficient = await confirmTxPage
        .waitForSelector('xpath///div[contains(normalize-space(.), "You don’t have enough")]', { timeout: 5000 })
        .then(() => true)
        .catch(() => false)

    if (isInsufficient) {
        await confirmTxPage.close()
        await page.close()
        throw new Error('Insufficient balance')
    }

    let confirmTxBtn = await confirmTxPage.waitForSelector('xpath///div[text()="Confirm"]', { visible: true })
    await confirmTxBtn.click()

    client.success(`Successfully claimed point for campaign: ${campaign.name} (${campaign.id})`)
    await sleep(5000)
}

export async function claimPoint(client) {
    const campaignsToClaim = campaigns.filter(campaign => campaign.tasks.every(client.isTaskEligible) && client.getClaimedPoints(campaign.id) === 0)
    if (campaignsToClaim.length === 0) {
        client.log('No campaigns need to be claimed.')
        return
    }
    const { privateKey } = client.account
    const browser = await initRealBrowser(client)
    await initOKXWallet(browser, privateKey)
    await loginMomentum(browser)
    // await loginGalxe(browser, client)
    for (const campaign of campaigns) {
        let maxAttempts = 3
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            // Latest campaign status
            await client.getCampaignDetail()

            let canClaim = canClaimCampaign(client, campaign)
            if (canClaim === 'not eligible') {
                throw new Error(`Campaign ${campaign.name} (${campaign.id}) is not eligible for claim.`)
            }
            if (canClaim === 'claimed') {
                client.log(`Campaign ${campaign.name} (${campaign.id}) already claimed, skipping...`)
                break
            }

            client.log(`Claiming campaign: ${campaign.name}, attempt ${attempt}/${maxAttempts}`)

            try {
                await claim(browser, client, campaign)
                break
            } catch (error) {
                if (error.message.includes('Galxe claim failed')) {
                    await browser.close()
                    throw error
                }
                if (error.message.includes('Insufficient balance')) {
                    await browser.close()
                    throw new Error(`Insufficient balance to claim campaign: ${campaign.name} (${campaign.id})`)
                }
                client.err(`Attempt ${attempt} to claim campaign: ${campaign.name} failed: ${error.message}`)
                if (attempt === maxAttempts) {
                    await browser.close()
                    throw new Error(`Failed to claim campaign: ${error.message}.`)
                }
            }
        }
    }
    await browser.close()
}

function canClaimCampaign(client, campaign) {
    if (!campaign.tasks.every(client.isTaskEligible)) {
        client.err(`Campaign ${campaign.name} (${campaign.id}) is not eligible for claim - not all tasks completed.`)
        return 'not eligible'
    }
    // Claimed campaigns
    else if (client.getClaimedPoints(campaign.id) > 0) {
        client.success(`Already claimed points for campaign: ${campaign.name} (${campaign.id})`)
        return 'claimed'
    }
    return true
}
