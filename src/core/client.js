import BaseClient from '../utils/baseClient.js'
import { visitPage } from './galxeTasks/2.visitPage.js'
import { solveQuiz } from './galxeTasks/4.solveQuiz.js'
import { followMomentum, followMomentumOnX, visitTelegram } from './galxeTasks/1.followMomentum.js'
import { login, isGalxeIDExist, createNewGalxeAccount } from './basicOperations/login.js'
import { connectXAccount } from './basicOperations/connectXAccount.js'
import { twitterOperations } from './galxeTasks/3.twitterOperations.js'
import { getBasicUserInfo, getCampaignDetail, getClaimedPoints, isTaskEligible } from './basicOperations/getInfo.js'
import { provideLiquidity } from './momentumTasks/provideLiquidity.js'
import { claimPoint } from './galxeTasks/claimPoint.js'
class Client extends BaseClient {
    constructor(account) {
        super(account)
        this.basicUserInfo = null
        this.campaignDetail = null
    }

    isGalxeIDExist = async () => isGalxeIDExist(this)
    visitTelegram = async () => visitTelegram(this)
    createNewGalxeAccount = async () => createNewGalxeAccount(this)
    login = async () => login(this)
    getBasicUserInfo = async () => getBasicUserInfo(this)
    getCampaignDetail = async () => getCampaignDetail(this)
    connectXAccount = async () => connectXAccount(this)
    followMomentum = async () => followMomentum(this)
    followMomentumOnX = async () => followMomentumOnX(this)
    visitPage = async () => visitPage(this)
    twitterOperations = async () => twitterOperations(this)
    solveQuiz = async () => solveQuiz(this)
    isTaskEligible = credId => isTaskEligible(this, credId)
    getClaimedPoints = campaignId => getClaimedPoints(this, campaignId)
    provideLiquidity = async () => provideLiquidity(this)
    claimPoint = async () => claimPoint(this)
}

export default Client
