import ac from '@antiadmin/anticaptchaofficial'
import dotenv from 'dotenv'
import { CAMPAIGNS, TASKS } from '../../utils/constants.js'
dotenv.config()

ac.setAPIKey(process.env.SOLVE_CAPTCHA_API_KEY)

export async function visitPage(client) {
    const { VisitWebsite, VisitMedium, VisitLinkedIn } = TASKS
    const credIds = [VisitWebsite, VisitMedium, VisitLinkedIn]
    const address = client.wallet.address

    for (const credId of credIds) {
        const isVisited = client.isTaskEligible(credId)
        if (isVisited) {
            client.success(`Already visited page, credId: ${credId}`)
            continue
        }
        await visit(client, credId, address)
    }
}

async function visit(client, credId, address) {
    let retry = 3
    let attempt = 0
    const campaignId = CAMPAIGNS[1]

    client.log(`Visiting page, credId: ${credId}, attempt: ${attempt + 1}`)
    while (attempt < retry) {
        attempt++
        try {
            // const captcha = await ac.solveGeeTestV4Proxyless(
            //     'https://app.galxe.com/quest/Momentum/GCXqbtpECP',
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
            client.success(`Successfully visited page, credId: ${credId}`)
            return true
        } catch (error) {
            client.err(`Attempt ${attempt}: Error visiting page, credId ${credId}: ${error}`)
            if (attempt === retry) {
                throw new Error(`Failed to visit page after ${retry} attempts`)
            }
        }
    }
    return false
}
