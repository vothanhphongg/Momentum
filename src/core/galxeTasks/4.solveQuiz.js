import { TASKS } from '../../utils/constants.js'
import { isTaskEligible } from '../basicOperations/getInfo.js'

export async function solveQuiz(client) {
    try {
        const { Quiz1, Quiz2, Quiz3, Quiz4 } = TASKS
        const credId = [Quiz1, Quiz2, Quiz3, Quiz4]
        const answers = [
            ['1', '2', '1', '3', '0'],
            ['2', '2', '1', '1', '0'],
            ['0', '1', '2', '2', '1'],
            ['1', '1', '2', '2', '2'],
        ]
        for (let i = 0; i < credId.length; i++) {
            if (isTaskEligible(client, credId[i])) {
                client.success(`Quiz ${i + 1} already solved`)
                continue
            }
            let body = {
                operationName: 'SyncCredentialValue',
                variables: {
                    input: {
                        syncOptions: {
                            credId: credId[i],
                            address: client.wallet.address,
                            quiz: { answers: answers[i] },
                        },
                    },
                },
                query: 'mutation SyncCredentialValue($input: SyncCredentialValueInput!) {\n  syncCredentialValue(input: $input) {\n    value {\n      address\n      spaceUsers {\n        follow\n        points\n        participations\n        __typename\n      }\n      campaignReferral {\n        count\n        __typename\n      }\n      galxePassport {\n        eligible\n        lastSelfieTimestamp\n        __typename\n      }\n      spacePoint {\n        points\n        __typename\n      }\n      spaceParticipation {\n        participations\n        __typename\n      }\n      gitcoinPassport {\n        score\n        lastScoreTimestamp\n        __typename\n      }\n      walletBalance {\n        balance\n        __typename\n      }\n      multiDimension {\n        value\n        __typename\n      }\n      allow\n      survey {\n        answers\n        __typename\n      }\n      quiz {\n        allow\n        correct\n        __typename\n      }\n      prediction {\n        isCorrect\n        __typename\n      }\n      spaceFollower {\n        follow\n        __typename\n      }\n      __typename\n    }\n    message\n    __typename\n  }\n}',
            }
            await client.post('https://graphigo.prd.galaxy.eco/query', body)
        }
    } catch (error) {
        client.err(`Error solving quiz: ${error}`)
        throw error
    }
}
