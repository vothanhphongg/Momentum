import { sleep } from '@vannb/js-utils'
import ac from '@antiadmin/anticaptchaofficial'
import { CAMPAIGNS, TASKS } from '../../utils/constants.js'

export async function visitTelegram(client) {
    const isVisited = client.isTaskEligible(TASKS.VisitTelegram)
    if (isVisited) {
        client.success('Already visited telegram')
    } else {
        client.log('Visiting telegram')

        const address = client.wallet.address
        const campaignId = CAMPAIGNS[0]
        const credId = TASKS.VisitTelegram

        let retry = 5
        let attempt = 0
        while (attempt < retry) {
            attempt++
            try {
                const captcha = await ac.solveGeeTestV4Proxyless(
                    'https://app.galxe.com/quest/Momentum/GCy6btpWaf',
                    '244bcb8b9846215df5af4c624a750db4'
                )
                const body = {
                    operationName: 'AddTypedCredentialItems',
                    variables: {
                        input: {
                            credId,
                            campaignId,
                            operation: 'APPEND',
                            items: [`EVM:${address}`],
                            captcha: {
                                lotNumber: captcha.lot_number,
                                captchaOutput: captcha.captcha_output,
                                passToken: captcha.pass_token,
                                genTime: captcha.gen_time,
                            },
                        },
                    },
                    query: 'mutation AddTypedCredentialItems($input: MutateTypedCredItemInput!) {\n  typedCredentialItems(input: $input) {\n    id\n    __typename\n  }\n}',
                }

                await client.post('https://graphigo.prd.galaxy.eco/query', body)
                client.success(`Successfully visit telegram`)
                return true
            } catch (error) {
                client.err(`Attempt ${attempt}: Error visit telegram: ${error}`)
                if (attempt === retry) {
                    client.err(`Failed to visit telegram after ${retry} attempts`)
                    return false
                }
                await sleep(5000) // Wait before retrying
            }
        }
    }
}

export async function followMomentumOnX(client) {
    const isDone = client.isTaskEligible(TASKS.FollowMMTOnX)
    if (isDone) {
        client.success('Already followed Momentum on X')
    } else {
        client.log('Sync follow Momentum on X')

        const address = client.wallet.address
        const campaignId = CAMPAIGNS[0]
        const credId = TASKS.FollowMMTOnX

        let retry = 5
        let attempt = 0
        while (attempt < retry) {
            attempt++
            try {
                const captcha = await ac.solveGeeTestV4Proxyless(
                    'https://app.galxe.com/quest/Momentum/GCy6btpWaf',
                    '244bcb8b9846215df5af4c624a750db4'
                )
                const body = {
                    operationName: 'AddTypedCredentialItems',
                    variables: {
                        input: {
                            credId,
                            campaignId,
                            operation: 'APPEND',
                            items: [`EVM:${address}`],
                            captcha: {
                                lotNumber: captcha.lot_number,
                                captchaOutput: captcha.captcha_output,
                                passToken: captcha.pass_token,
                                genTime: captcha.gen_time,
                            },
                        },
                    },
                    query: 'mutation AddTypedCredentialItems($input: MutateTypedCredItemInput!) {\n  typedCredentialItems(input: $input) {\n    id\n    __typename\n  }\n}',
                }

                await client.post('https://graphigo.prd.galaxy.eco/query', body)
                client.success(`Successfully followed Momentum on X`)
                return true
            } catch (error) {
                client.err(`Attempt ${attempt}: Error follow Momentum on X: ${error}`)
                if (attempt === retry) {
                    client.err(`Failed to followed Momentum on X after ${retry} attempts`)
                    return false
                }
                await sleep(5000) // Wait before retrying
            }
        }
    }
}

async function isFollowedMomentum(client) {
    const campaignId = 'GCy6btpWaf'
    const body = {
        operationName: 'QuestBasicInfo',
        variables: { id: campaignId, address: client.wallet.address, withAddress: true },
        query: 'query QuestBasicInfo($id: ID!, $address: String!, $withAddress: Boolean!) {\n  campaign(id: $id) {\n    id\n    numberID\n    name\n    description\n    startTime\n    endTime\n    status\n    type\n    chain\n    inWatchList\n    bannerUrl\n    isBookmarked(address: $address) @include(if: $withAddress)\n    watchlistPro {\n      watchListId\n      rewardIconGif\n      rewardIcon\n      rewardCampaign\n      __typename\n    }\n    participants {\n      participants(first: 10, after: "-1", download: false) {\n        list {\n          address {\n            id\n            avatar\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      participantsCount\n      bountyWinners(first: 10, after: "-1", download: false) {\n        list {\n          createdTime\n          address {\n            id\n            avatar\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      bountyWinnersCount\n      __typename\n    }\n    whitelistInfo(address: $address) {\n      address\n      usedCount\n      __typename\n    }\n    space {\n      id\n      alias\n      name\n      status\n      thumbnail\n      isVerified\n      isAdmin(address: $address) @include(if: $withAddress)\n      isFollowing @include(if: $withAddress)\n      followersCount\n      categories\n      showAskAlva\n      __typename\n    }\n    coHostSpaces {\n      id\n      alias\n      name\n      thumbnail\n      isVerified\n      isAdmin(address: $address) @include(if: $withAddress)\n      isFollowing @include(if: $withAddress)\n      followersCount\n      categories\n      __typename\n    }\n    parentCampaign {\n      id\n      thumbnail\n      isSequencial\n      __typename\n    }\n    ...CampaignForSiblingSlide\n    distributionType\n    childrenCampaigns {\n      id\n      type\n      rewardName\n      rewardInfo {\n        discordRole {\n          roleId\n          roleName\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment CampaignForCheckFinish on Campaign {\n  claimedLoyaltyPoints(address: $address)\n  whitelistInfo(address: $address) {\n    usedCount\n    __typename\n  }\n  userParticipants(address: $address) {\n    list {\n      id\n      status\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CampaignForSiblingSlide on Campaign {\n  id\n  space {\n    id\n    alias\n    __typename\n  }\n  parentCampaign {\n    id\n    thumbnail\n    isSequencial\n    childrenCampaigns {\n      id\n      ...CampaignForGetImage\n      ...CampaignForCheckFinish\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CampaignForGetImage on Campaign {\n  ...GetImageCommon\n  nftTemplates {\n    image\n    __typename\n  }\n  __typename\n}\n\nfragment GetImageCommon on Campaign {\n  ...CampaignForTokenObject\n  id\n  type\n  thumbnail\n  __typename\n}\n\nfragment CampaignForTokenObject on Campaign {\n  cap\n  tokenReward {\n    tokenAddress\n    tokenSymbol\n    tokenDecimal\n    tokenLogo\n    userTokenAmount\n    __typename\n  }\n  tokenRewardContract {\n    id\n    chain\n    address\n    __typename\n  }\n  __typename\n}',
    }
    const res = await client.post('https://graphigo.prd.galaxy.eco/query', body)
    return res?.data?.campaign?.space?.isFollowing || false
}

export async function followMomentum(client) {
    if (await isFollowedMomentum(client)) {
        client.success('Already followed Momentum')
    } else {
        client.log('Following Momentum')
        await client.post('https://graphigo.prd.galaxy.eco/query', {
            operationName: 'followSpace',
            variables: { spaceIds: [3041] },
            query: 'mutation followSpace($spaceIds: [Int!]) {\n  followSpace(spaceIds: $spaceIds)\n}',
        })
        client.success('Successfully followed Momentum')
    }
}
