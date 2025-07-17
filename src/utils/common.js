export const randomNonce = (length = 16) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}
export const nextCycle = async () => {
    const minHours = 0
    const maxHours = 12
    const hourToNextDay = 24 - new Date().getHours()
    const delay = (hourToNextDay + Math.floor(Math.random() * (maxHours - minHours + 1) + minHours)) * 60 * 60 * 1000 // Convert hours to milliseconds
    console.log(`Next cycle will start at ${new Date(Date.now() + delay).toLocaleString()}`)
    return await sleep(delay)
}

export function getRandomNumber(min, max, fix = 2) {
    return Number((Math.random() * (max - min) + min).toFixed(fix))
}

export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomInt(arg0, arg1) {
    return Math.floor(Math.random() * (arg1 - arg0 + 1) + arg0)
}
