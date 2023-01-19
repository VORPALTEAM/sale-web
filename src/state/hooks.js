import store from './store'
import {loadAccount } from './reducer'
import * as config from '../config'
import Web3 from 'web3';

const env = window.ethereum
let getterWeb3 = new Web3(config.rpcUrl, config.connectOptions)

export function IsTrueNetwork () {
    return env.chainId === config.chainHexID
}

export async function RequestWallet () {

    alert("pressed")

    // document.location.href = "https://metamask.app.link/dapp/sale.vorpal.finance/"

    if (!env) {
        alert("Not env")
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            // true for mobile device
            document.write("mobile device");
        }
        let isMobile = navigator.userAgentData.mobile
        if (isMobile) {
            document.location.href = "https://metamask.app.link/dapp/sale.vorpal.finance/"
        }
        return null;
    } else {
        const accs = await env.request({ method: "eth_requestAccounts" }, config.connectOptions)
        const network = env.chainId
    
        if (network !== config.chainHexID) {
          await env.request({
            method: 'wallet_addEthereumChain',
            params: [{ 
              chainId: config.chainHexID,
              chainName: config.chainName,
              nativeCurrency: {
                  name: config.ethSymbol,
                  symbol: config.ethSymbol,
                  decimals: 18
              },
              rpcUrls: [config.rpcUrl]
            }]
          })
        }
        if (!IsTrueNetwork ()) {
            store.dispatch(loadAccount(null))
            return null
        }
        store.dispatch(loadAccount(accs[0]))
        return accs[0]
    }

  }

export function CheckIsConnected () {
    let connected = false
    try {
        connected = env.isConnected()
    } catch (e) {
        console.log(e.message)
        connected = false
    }
    return connected
}

export async function RequestPrice (contract) {
    
    try {
        const ctrct = new getterWeb3.eth.Contract(config.saleABI, contract)
        const reqPrice = await ctrct.methods.price().call()
        return parseFloat(reqPrice / config.decimal)
    } catch (e) {
        getterWeb3 = new Web3(config.reserveRpcs[1], config.connectOptions)
        console.log(e)
        return null
    }

}

export async function RequestLockedFunds (contracts = [], user) {

    let numberOf = 0

    if (!user || !IsTrueNetwork ()) return numberOf

    try {
        const ctrct = new getterWeb3.eth.Contract(config.saleABI, contracts[0])
        const shedule = await ctrct.methods.getSchedule(user).call()
        
        if (shedule) {
            numberOf += parseInt(shedule.tokensLeft / config.decimal)
        }
    } catch (e) {
        console.log(e.message)
        numberOf += 0
    }

    try {
        const ctrct = new getterWeb3.eth.Contract(config.saleABI, contracts[1])
        const shedule = await ctrct.methods.getSchedule(user).call()
        // console.log(shedule)
        if (shedule) {
            numberOf += Math.ceil(parseFloat(shedule.tokensLeft / config.decimal))
        }
    } catch (e) {
        getterWeb3 = new Web3(config.reserveRpcs[3], config.connectOptions)
        console.log(e.message)
        numberOf += 0
    }

    // console.log(numberOf)

    return numberOf
}

export async function RequestSaleStart (contract) {

    let status = 0
    try {
        const ctrct = new getterWeb3.eth.Contract(config.saleABI, contract)
        status = await ctrct.methods.status().call()
    } catch (e) {
        getterWeb3 = new Web3(config.reserveRpcs[2], config.connectOptions)
        console.log(e.message)
    }
    return status
}

export async function ContractDataSetup (contracts = []) {
    // console.log("contract")
    // console.log(contracts)
    const tokenContract = new getterWeb3.eth.Contract(config.saleABI, contracts[0])
    
    const tokenSecondContract = new getterWeb3.eth.Contract(config.saleABI, contracts[1])

    const saleAmount = await tokenContract.methods.saleAmount().call()
    // const saleEnd = await tokenContract.methods.saleEnd().call()
    // const saleLength = await tokenContract.methods.saleLength().call()
    const totalTokensLeft = await tokenContract.methods.totalTokensLeft().call()
    // const vestingPeriod = await tokenContract.methods.vestingPeriod().call()
    // const lockPeriod = await tokenContract.methods.lockPeriod().call()

    const tokensLeftSecond = await tokenSecondContract.methods.totalTokensLeft().call()

    return ({
      saleAmount: saleAmount,
      // saleEnd: saleEnd,
      // saleLength: saleLength,
      totalTokensLeft: totalTokensLeft,
      tokensLeftSecond: tokensLeftSecond,
      // lockPeriod: lockPeriod,
      // vestingPeriod: vestingPeriod
      isDataRequested: true
    })
  }

export async function RequestUnLockedFunds (contracts = [], user) {

    let numberOf = 0
    if (!user) return numberOf

    try {
        const ctrct = new getterWeb3.eth.Contract(config.saleABI, contracts[0])
        const shedule = await ctrct.methods.getUnlockedTokens(user).call()
        
        if (shedule) {
            numberOf += parseInt(shedule / config.decimal)
        }
    } catch (e) {
        getterWeb3 = new Web3(config.reserveRpcs[2], config.connectOptions)
        console.log(e.message)
        numberOf += 0
    }

    try {
        const ctrct = new getterWeb3.eth.Contract(config.saleABI, contracts[1])
        const shedule = await ctrct.methods.getUnlockedTokens(user).call()
        // console.log(shedule)
        if (shedule) {
            numberOf += parseInt(shedule / config.decimal)
        }
    } catch (e) {
        console.log(e.message)
        numberOf += 0
    }

    // console.log(numberOf)

    return numberOf
}


export async function WithdrawTokens (contract, amount = "100000000000000000000", user) {

    if (!env) {
        return 0
    }

    if (!user) user = await RequestWallet ()
    try {
        const w3 = new Web3(env, config.connectOptions)
        const ctr = new w3.eth.Contract(config.saleABI, contract)
        const withdraw = await ctr.methods.withdrawTokens(amount).send({
            from: user
        }).then((res) => {
            console.log(res)
            return 1;
        }, (rej) => {
            console.log(rej)
            return 0;
        })
    } catch (e) {
        console.log(e.message)
        return 0;
    }

}

export async function AcknowApprovedAmount (token, spender, user) {
    if (!token || !spender){ 
        Promise.reject(0)
        return 0
    }

    if (!user) user = await RequestWallet ()
    
    try {
        const w3 = new getterWeb3.eth.Contract(config.erc20ABI, token)
        const allowance = await w3.methods.allowance(user, spender).call()

        const allowanceStr = allowance.toString()

        const processedStr = allowance > 0 ? allowanceStr.substring(0, allowanceStr.length - 18) : "0"

        const result = parseInt(processedStr)

        Promise.resolve(result)
        return result
    } catch (e) {
        console.log(e.message)
        Promise.reject(0)
        return 0;
    }
    
}

export async function ApproveTokens ( spendingToken, spendingContract, user, amount = config.defaultApproveValue ) {

    const usingAmount = `${amount}${config.decimalZeros}`

    if (!user || !IsTrueNetwork ()) user = await RequestWallet ()

    if (!user || !IsTrueNetwork ()) {
        Promise.reject(0)
        return 0
    }
    
    if (!env) {
        Promise.reject(0)
        return 0
    } else {
        try {
           const w3 = new Web3(env, config.connectOptions)
           const contract = new w3.eth.Contract(config.erc20ABI, spendingToken)
           const approving = await contract.methods.approve(spendingContract, usingAmount).send({
             from: user
           }).then((res) => {
            Promise.resolve(1)
            return 1
           }, (rej) => {
            Promise.reject(0)
            return 0
           })

        } catch (e) {
            console.log(e.message)
            Promise.reject(0)
            return 0
        }
    }

    // return amount
}

export async function Buy ( spendingContract, user, amount ) {

    if (!env) {
        return false
    }
    if (!user || !IsTrueNetwork ()) user = await RequestWallet ()

    if (!user || !IsTrueNetwork ()) {
        return false
    }

    try {
        const w3 = new Web3(env, config.connectOptions)
        const contract = new w3.eth.Contract(config.saleABI, spendingContract)

        const spendingAmount = `0x${(amount * config.decimal).toString(16)}`

        await contract.methods.buyTokens(spendingAmount).send({
            from: user
        })

        // store.dispatch(selectWindow("success"))

    } catch (e) {
        console.log(e.code)
        Promise.reject(false)
        return false
    }

}

export async function RequestMax ( token, user ) {

    let val = 0;
    if (!user && user !== config.zeroAddress) user = await RequestWallet ()
    
    try {
        const contract = new getterWeb3.eth.Contract(config.erc20ABI, token)
        val = await contract.methods.balanceOf(user).call()
    } catch (e) {
        getterWeb3 = new Web3(config.reserveRpcs[6], config.connectOptions)
        console.log(e)
        val = 0
    }

    return val / config.decimal
}

export async function RequestLeftTokens ( contract ) {
    let val = 0
    try {     
       const ctrct= new getterWeb3.eth.Contract(config.saleABI, contract)
        val = await ctrct.methods.totalTokensLeft().call()
    } catch (e) {
        getterWeb3 = new Web3(config.reserveRpcs[7], config.connectOptions)
        console.log(e)
        val = 0
    }

    return val
}