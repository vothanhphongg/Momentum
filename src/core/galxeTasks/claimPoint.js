import { CAMPAIGNS, TASKS } from '../../utils/constants.js'
import { initBrowser } from '../basicOperations/browser.js'
import { extId, initMetaMask, loginMomentum } from '../basicOperations/connectXAccount.js'

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
        tasks: [
            TASKS.LikeMMTTweet1,
            TASKS.LikeMMTTweet2,
            TASKS.LikeMMTTweet3,
            TASKS.ReTweet1,
            TASKS.ReTweet2,
            TASKS.ReTweet3,
            TASKS.ReTweet4,
            TASKS.LikeMMTTweet4,
            TASKS.LikeMMTTweet5,
            TASKS.ReTweet5,
        ],
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
        .then(skipBtn => skipBtn.click())
        .catch(() => {})

    async function clickClaimButtonGalxe() {
        await client.sleep(5000)
        const claimButton = await page.waitForSelector(
            'xpath//html/body/div[1]/main/div[1]/section/div/div[2]/div/div[2]/div[2]/div/div/div/div/button/button/div/button'
        )

        await claimButton.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }))
        await client.sleep(500)
        await claimButton.click()

        await client.sleep(5000)
        // find the button with text "Claim Directly" in the modal
        // get all button and check the text
        const claimDirectlyBtn = await page.waitForSelector(
            'xpath///button[normalize-space(text())="Claim Directly"]',
            { visible: true, timeout: 10000 }
        )
        await claimDirectlyBtn.click()
        await client.sleep(5000)
    }

    await clickClaimButtonGalxe()

    // if Metamask prompt to add gravity mainnet network
    try {
        const approveNetworkTarget = await browser.waitForTarget(
            target => target.url().startsWith(`chrome-extension://${extId}/notification.html`),
            { timeout: 5000 }
        )
        const approveNetworkPage = await approveNetworkTarget.page()
        await approveNetworkPage.bringToFront()

        let approveBtn = await approveNetworkPage.waitForSelector(
            'xpath//html/body/div[1]/div/div/div/div[2]/div/button[2]',
            { visible: true }
        )
        await approveBtn.click()
        await client.sleep(5000)
        await clickClaimButtonGalxe()
    } catch (error) {}

    // Metamask confirm tx dialog
    const confirmTxTarget = await browser.waitForTarget(
        target => target.url().startsWith(`chrome-extension://${extId}/notification.html`),
        { timeout: 10000 }
    )
    const confirmTxPage = await confirmTxTarget.page()
    await confirmTxPage.bringToFront()

    let confirmTxBtn = await confirmTxPage.waitForSelector(
        'xpath//html/body/div[1]/div/div/div/div/div[3]/div/button[2]',
        { visible: true }
    )
    await confirmTxBtn.click()

    client.success(`Successfully claimed point for campaign: ${campaign.name} (${campaign.id})`)
    await client.sleep(5000)
    return true
}

export async function claimPoint(client) {
    const campaignsToClaim = campaigns.filter(
        campaign => campaign.tasks.every(client.isTaskEligible) && client.getClaimedPoints(campaign.id) === 0
    )
    if (campaignsToClaim.length === 0) {
        client.log('No campaigns need to be claimed.')
        return
    }
    const { seedPhrase, email: password } = client.account
    for (const campaign of campaigns) {
        let maxAttempts = 3
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            // Latest campaign status
            await client.getCampaignDetail()

            let canClaim = canClaimCampaign(client, campaign)
            if (!canClaim) {
                break
            }

            client.log(`Claiming campaign: ${campaign.name}, attempt ${attempt}/${maxAttempts}`)

            const browser = await initBrowser(client)
            try {
                await initMetaMask(browser, seedPhrase, password)
                await loginMomentum(browser)

                let result = await claim(browser, client, campaign)
                if (result) {
                    break
                } else {
                    throw new Error(`Failed to claim campaign: ${campaign.name} (${campaign.id})`)
                }
            } catch (error) {
                client.err(`Attempt ${attempt} to claim campaign: ${campaign.name} failed: ${error}`)
                if (attempt === maxAttempts) {
                    throw new Error(`Failed to claim campaign: ${campaign.name} after ${maxAttempts} attempts.`)
                }
            } finally {
                await browser.close()
            }
        }
    }
}

function canClaimCampaign(client, campaign) {
    if (!campaign.tasks.every(client.isTaskEligible)) {
        client.err(`Campaign ${campaign.name} (${campaign.id}) is not eligible for claim - not all tasks completed.`)
        return false
    }
    // Claimed campaigns
    else if (client.getClaimedPoints(campaign.id) > 0) {
        client.success(`Already claimed points for campaign: ${campaign.name} (${campaign.id})`)
        return false
    }
    return true
}
