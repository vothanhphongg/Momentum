import ac from '@antiadmin/anticaptchaofficial'
import { sleep } from '@vannb/js-utils'
import dotenv from 'dotenv'
import { isTaskEligible } from '../basicOperations/getInfo.js'
import { CAMPAIGNS, TASKS } from '../../utils/constants.js'
dotenv.config()

ac.setAPIKey(process.env.SOLVE_CAPTCHA_API_KEY)

export async function twitterOperations(client) {
    const address = client.wallet.address
    const {
        LikeMMTTweet1,
        LikeMMTTweet2,
        LikeMMTTweet3,
        ReTweet1,
        ReTweet2,
        ReTweet3,
        ReTweet4,
        LikeMMTTweet4,
        LikeMMTTweet5,
        ReTweet5,
    } = TASKS
    const credIds = [
        LikeMMTTweet1,
        LikeMMTTweet2,
        LikeMMTTweet3,
        ReTweet1,
        ReTweet2,
        ReTweet3,
        ReTweet4,
        LikeMMTTweet4,
        LikeMMTTweet5,
        ReTweet5,
    ]
    for (const credId of credIds) {
        let taskName = Object.keys(TASKS).find(key => TASKS[key] === credId)
        if (isTaskEligible(client, credId)) {
            client.success(`Already ${taskName}, credId: ${credId}`)
            continue
        } else {
            client.log(`Processing ${taskName}, credId: ${credId}`)
            await likeOrRetweet(client, credId, address).then(result => {
                if (result) {
                    client.success(`Successfully ${taskName}, credId: ${credId}`)
                }
            })
        }
    }
}

async function likeOrRetweet(client, credId, address) {
    const campaignId = CAMPAIGNS[2]

    let retry = 5
    let attempt = 0
    while (attempt < retry) {
        attempt++
        try {
            // const captcha = await ac.solveGeeTestV4Proxyless(
            //     'https://app.galxe.com/quest/Momentum/GCPk3tpmR5',
            //     '244bcb8b9846215df5af4c624a750db4'
            // )
            const captcha = await client.solveGeetestCaptcha()

            const body = {
                operationName: 'AddTypedCredentialItems',
                variables: {
                    input: {
                        credId,
                        campaignId,
                        operation: 'APPEND',
                        items: [`EVM:${address}`],
                        captcha: captcha,
                    },
                },
                query: 'mutation AddTypedCredentialItems($input: MutateTypedCredItemInput!) {\n  typedCredentialItems(input: $input) {\n    id\n    __typename\n  }\n}',
            }
            await client.post('https://graphigo.prd.galaxy.eco/query', body)
            return true
        } catch (error) {
            client.err(`Attempt ${attempt}: Error like or retweet, credId ${credId}: ${error}`)
            if (attempt === retry) {
                client.err(`Failed to like or retweet, credId: ${credId} after ${retry} attempts`)
                return false
            }
            await sleep(5000) // Wait before retrying
        }
    }
    return false
}
