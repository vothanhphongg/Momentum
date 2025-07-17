export const getLocalStorage = client => {
    const address = client.wallet.address
    const token = client.token

    return {
        [`auth@evm:${address}`]: {
            auth: {
                authorization: token,
            },
            expire: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days,
        },
        connectMethod: 'Okx',
    }
}

export const getCookie = client => {
    return [
        {
            name: 'account',
            value: `EVM:${client.wallet.address}`,
            domain: 'app.galxe.com',
            path: '/',
            secure: true,
        },
        {
            name: 'connectMethod',
            value: 'Okx',
            domain: 'app.galxe.com',
            path: '/',
            secure: true,
        },
        {
            name: 'auth-token',
            value: JSON.stringify({
                authorization: client.token,
            }),
            domain: 'app.galxe.com',
            path: '/',
            secure: true,
        },
        {
            name: 'chainId',
            value: '1',
            domain: 'app.galxe.com',
            path: '/',
            secure: true,
        },
    ]
}
