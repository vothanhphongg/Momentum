import { ethers } from 'ethers'
import { NETWORK } from '../../utils/constants.js'
import { sleep, randomInt, getRandomNumber } from '../../utils/common.js'

const LP_ROUTER_ADDRESS = '0xf8a1d4ff0f9b9af7ce58e1fc1833688f3bfd6115'
const POOL_ADDRESS = '0x455cf8d2ac91e7cb883f515874af750ed3cd18195c970b7a2d46235ac2b0c388' // SUI - USDC pool

const ERC20_ABI = [
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function balanceOf(address owner) view returns (uint256)',
    'function transfer(address to, uint amount) returns (bool)',
    'function deposit() payable returns ()',
    'function withdraw(uint256 wad) returns ()',
]

const LP_ROUTER_ABI = [
    'function createAndInitializePoolIfNecessary(address token0, address token1, uint24 fee, uint160 sqrtPriceX96) external payable returns (address pool)',
    'function mint(tuple(address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, address recipient, uint256 deadline)) external payable returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)',
    'function increaseLiquidity(tuple(uint256 tokenId, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, uint256 deadline)) external payable returns (uint128 liquidity, uint256 amount0, uint256 amount1)',
    'function positions(uint256 tokenId) external view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX96, uint256 feeGrowthInside1LastX96, uint128 tokensOwed0, uint128 tokensOwed1)',
    'function increaseLiquidity(tuple(uint256 tokenId, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, uint256 deadline)) external payable returns (uint128 liquidity, uint256 amount0, uint256 amount1)',
    'function multicall(uint256 deadline, bytes[] calldata data) external payable returns (bytes[] memory)',
    'function balanceOf(address owner) external view returns (uint256)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)',
]

const POOL_ABI = [
    'function token0() view returns (address)',
    'function token1() view returns (address)',
    'function fee() view returns (uint24)',
    'function liquidity() view returns (uint128)',
    'function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
]

async function getTokenBalance(tokenAddress, walletAddress, provider) {
    try {
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
        const balance = await tokenContract.balanceOf(walletAddress)
        return balance
    } catch (error) {
        return 0n
    }
}

async function approveToken(tokenAddress, spenderAddress, amount, wallet) {
    try {
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, wallet)
        const currentAllowance = await tokenContract.allowance(wallet.address, spenderAddress)
        if (currentAllowance >= amount) {
            return true
        }
        const tx = await tokenContract.approve(spenderAddress, amount)
        await tx.wait()
        return true
    } catch (error) {
        return false
    }
}

async function findExistingPosition({
    token0,
    token1,
    fee,
    positionManager, // contract
    wallet,
}) {
    try {
        // Get balance of NFT positions
        const balance = await positionManager.balanceOf(wallet.address)

        if (balance == 0n) {
            log('0 balance')
            return null
        }

        // Normalize addresses for comparison
        token0 = token0.toLowerCase()
        token1 = token1.toLowerCase()

        // Check each position
        for (let i = 0; i < ethers.toNumber(balance); i++) {
            try {
                // Get token ID
                const tokenId = await positionManager.tokenOfOwnerByIndex(wallet.address, i)

                // Get position details
                const position = await positionManager.positions(tokenId)

                // Check if this position matches our token pair and fee
                const positionToken0 = position.token0.toLowerCase()
                const positionToken1 = position.token1.toLowerCase()

                if (
                    ((positionToken0 === token0 && positionToken1 === token1) ||
                        (positionToken0 === token1 && positionToken1 === token0)) &&
                    position.fee === fee
                ) {
                    return {
                        tokenId,
                        token0: position.token0,
                        token1: position.token1,
                        tickLower: position.tickLower,
                        tickUpper: position.tickUpper,
                    }
                }
            } catch (err) {
                log(err.message)
                continue
            }
        }

        return null // No matching position found
    } catch (error) {
        log(error.message)
        return null
    }
}

async function addLiquidity(client, provider, wallet, token0, token1, poolAddress, amount0, amount1) {
    try {
        const pool = new ethers.Contract(poolAddress, POOL_ABI, provider)
        const actualToken0 = await pool.token0()
        const actualToken1 = await pool.token1()
        const actualFee = Number(await pool.fee())
        let sortedAmount0, sortedAmount1
        if (token0.toLowerCase() === actualToken0.toLowerCase()) {
            sortedAmount0 = amount0
            sortedAmount1 = amount1
        } else {
            sortedAmount0 = amount1
            sortedAmount1 = amount0
        }

        const tickLower = -887270
        const tickUpper = 887270

        const approved0 = await approveToken(actualToken0, LP_ROUTER_ADDRESS, sortedAmount0, wallet)
        if (!approved0) {
            client.err(`Approve failed`)
            return false
        }

        const approved1 = await approveToken(actualToken1, LP_ROUTER_ADDRESS, sortedAmount1, wallet)
        if (!approved1) {
            client.err(`Approve failed`)
            return false
        }

        const amount0Min = 0n
        const amount1Min = 0n

        const lpRouter = new ethers.Contract(LP_ROUTER_ADDRESS, LP_ROUTER_ABI, wallet)

        const positionManager = lpRouter
        const existingPosition = await findExistingPosition({ token0, token1, fee: actualFee, wallet, positionManager })

        let tx

        if (existingPosition) {
            const params = {
                tokenId: existingPosition.tokenId,
                amount0Desired: sortedAmount0,
                amount1Desired: sortedAmount1,
                amount0Min,
                amount1Min,
                deadline: Math.floor(Date.now() / 1000) + 60 * 20,
            }
            let gasLimit
            try {
                gasLimit = await lpRouter.mint.estimateGas(params)
                gasLimit = (gasLimit * 200n) / 100n
            } catch (gasError) {
                gasLimit = 5000000n
            }
            tx = await positionManager.increaseLiquidity(
                params,
                { gasLimit } // Increased gas limit
            )
        } else {
            const mintParams = {
                token0,
                token1,
                fee: actualFee,
                tickLower,
                tickUpper,
                amount0Desired: sortedAmount0,
                amount1Desired: sortedAmount1,
                amount0Min,
                amount1Min,
                recipient: wallet.address,
                deadline: Math.floor(Date.now() / 1000) + 60 * 20,
            }
            let gasLimit
            try {
                gasLimit = await lpRouter.mint.estimateGas(mintParams)
                gasLimit = (gasLimit * 200n) / 100n
            } catch (gasError) {
                gasLimit = 5000000n
            }
            tx = await positionManager.mint(
                mintParams,
                { gasLimit } // Increased gas limit
            )
        }

        client.success(`Add liquidity success: ${NETWORK.txUrl}${tx.hash}`)
        return true
    } catch (error) {
        client.err(error.message)
        return false
    }
}

export async function provideLiquidity(client) {
    let { provider, wallet, lpCount = randomInt(20, 50) } = client
    const poolAddress = POOL_ADDRESS
    try {
        const pool = new ethers.Contract(poolAddress, POOL_ABI, provider)
        const actualToken0 = await pool.token0()
        const actualToken1 = await pool.token1()

        const token0Balance = await getTokenBalance(actualToken0, wallet.address, provider)
        const token1Balance = await getTokenBalance(actualToken1, wallet.address, provider)

        if (token0Balance === 0n || token1Balance === 0n) {
            return client.err(`Insufficient balance`)
        }

        let percent0 = getRandomNumber(1, 15)
        let percent1 = getRandomNumber(1, 15)

        let totalAmount0ForLP = (token0Balance * BigInt(Math.floor(percent0))) / 100n
        let totalAmount1ForLP = (token1Balance * BigInt(Math.floor(percent1))) / 100n

        let amount0PerLP = totalAmount0ForLP / BigInt(lpCount)
        let amount1PerLP = totalAmount1ForLP / BigInt(lpCount)

        for (let i = 0; i < lpCount; i++) {
            try {
                const currentToken0Balance = await getTokenBalance(actualToken0, wallet.address, provider)
                const currentToken1Balance = await getTokenBalance(actualToken1, wallet.address, provider)
                const useAmount0 = currentToken0Balance < amount0PerLP ? currentToken0Balance : amount0PerLP
                const useAmount1 = currentToken1Balance < amount1PerLP ? currentToken1Balance : amount1PerLP

                if (useAmount0 === 0n || useAmount1 === 0n) {
                    continue
                }

                const success = await addLiquidity(
                    client,
                    provider,
                    wallet,
                    actualToken0,
                    actualToken1,
                    poolAddress,
                    useAmount0,
                    useAmount1
                )
                if (!success) {
                    amount0PerLP = (amount0PerLP * 8n) / 10n
                    amount1PerLP = (amount1PerLP * 8n) / 10n
                }

                if (i < lpCount - 1) {
                    const timesleep = getRandomNumber(10000, 20000)
                    client.log(`[${lpCount - i + 1}/${lpCount}]Delay ${timesleep / 1000}s to next lp...`)
                    await sleep(timesleep)
                }
            } catch (error) {
                await sleep(5000)
            }
        }
    } catch (error) {
        client.err(`Error in provideLiquidity: ${error.message}`)
        return false
    }
}
