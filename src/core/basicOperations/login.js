import { SiweMessage } from 'siwe'
import { randomNonce, sleep } from '../../utils/common.js'

export async function isGalxeIDExist(client) {
    const retry = 10
    const address = client.wallet.address

    for (let attempt = 1; attempt <= retry; attempt++) {
        try {
            const requestBody = {
                operationName: 'GalxeIDExist',
                variables: { schema: `EVM:${address}` },
                query: 'query GalxeIDExist($schema: String!) {\n  galxeIdExist(schema: $schema)\n}',
            }

            const response = await client.post('https://graphigo.prd.galaxy.eco/query', requestBody)
            const existed = response?.data?.galxeIdExist || false
            if (!existed) {
                client.log(`Galxe id does not exist for address: ${address}`)
            }
            return existed
        } catch (error) {
            client.err(`Attempt ${attempt} to check galxe id exist failed: ${JSON.stringify(error)}`)
            if (attempt !== retry) {
                await sleep(5000)
            }
        }
    }

    throw new Error(`Failed to check galxe id exist after ${retry} attempts`)
}

export async function createNewGalxeAccount(client) {
    const retry = 10
    const address = client.wallet.address

    client.log(`Creating new galxe account for address: ${address}`)
    for (let attempt = 1; attempt <= retry; attempt++) {
        try {
            const requestBody = {
                operationName: 'CreateNewAccount',
                variables: {
                    input: {
                        schema: `EVM:${address}`,
                        socialUsername: address,
                        username: address,
                    },
                },
                query: 'mutation CreateNewAccount($input: CreateNewAccount!) {\n  createNewAccount(input: $input)\n}',
            }

            const response = await client.post('https://graphigo.prd.galaxy.eco/query', requestBody)
            if (response?.data?.createNewAccount) {
                client.success(`Create new galxe account success, account id: ${response?.data?.createNewAccount}`)
                return true
            } else {
                client.err(`Create new galxe account failed: ${JSON.stringify(response, null, 2)}`)
                return false
            }
        } catch (error) {
            client.err(`Attempt ${attempt} to create new galxe account failed: ${error}`)
            if (attempt !== retry) {
                await sleep(5000)
            }
        }
    }

    throw new Error(`Failed to check galxe id exist after ${retry} attempts`)
}

export async function login(client) {
    const retry = 10
    const address = client.wallet.address

    for (let attempt = 1; attempt <= retry; attempt++) {
        try {
            const siweMessage = {
                domain: 'app.galxe.com',
                address,
                statement: 'Sign in with Ethereum to the app.',
                uri: 'https://app.galxe.com',
                version: '1',
                chainId: 1,
                nonce: randomNonce(),
                issuedAt: new Date().toISOString(),
                expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            }

            const siwe = new SiweMessage(siweMessage)
            const messageToSign = siwe.prepareMessage()
            const signature = await client.wallet.signMessage(messageToSign)

            const requestBody = {
                operationName: 'SignIn',
                variables: {
                    input: {
                        address,
                        signature,
                        message: messageToSign,
                        addressType: 'EVM',
                        publicKey: '1',
                    },
                },
                query: 'mutation SignIn($input: Auth) {\n  signin(input: $input)\n}',
            }

            const response = await client.post('https://graphigo.prd.galaxy.eco/query', requestBody)
            if (response?.data?.signin) {
                const jwt = response.data.signin

                client.token = jwt
                client.headers['authorization'] = jwt

                client.log(`Login success ${jwt}`)
                return jwt
            }
        } catch (error) {
            client.err(`Attempt ${attempt} to login failed: ${error}`)
            if (attempt !== retry) {
                await sleep(5000)
            }
        }
    }

    throw new Error(`Failed to login after ${retry} attempts`)
}
