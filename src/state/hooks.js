import * as config from '../config'
import Web3 from 'web3';

const env = window.ethereum
const getterWeb3 = new Web3(config.rpcUrl, config.connectOptions)

export async function RequestWallet () {

    if (!env) {
        return null;
    } else {
        const accs = await env.request({ method: "eth_requestAccounts" }, config.connectOptions)
        const network = env.chainId
    
        if (network != config.chainHexID) {
          await env.request({
            method: 'wallet_addEthereumChain',
            params: [{ 
              chainId: config.chainHexID,
              chainName: 'Binance',
              nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18
              },
              rpcUrls: [config.rpcUrl]
          }]
        })
        }
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

export async function RequestLockedFunds (contracts = [], user) {

    let numberOf = 0
    if (!user) return numberOf

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
            numberOf += parseInt(shedule.tokensLeft / config.decimal)
        }
    } catch (e) {
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
        console.log(e.message)
    }
    return status
}

export async function ContractDataSetup (contracts = []) {
    // console.log("contract")
    // console.log(contracts)
    const tokenContract = new getterWeb3.eth.Contract(config.saleABI, contracts[0])
    
    const tokenSecondContract = new getterWeb3.eth.Contract(config.saleABI, contracts[1])

    const tokenPrice = await tokenContract.methods.price().call()
    const saleAmount = await tokenContract.methods.saleAmount().call()
    const saleEnd = await tokenContract.methods.saleEnd().call()
    const saleLength = await tokenContract.methods.saleLength().call()
    const totalTokensLeft = await tokenContract.methods.totalTokensLeft().call()
    const vestingPeriod = await tokenContract.methods.vestingPeriod().call()
    const lockPeriod = await tokenContract.methods.lockPeriod().call()

    const tokensLeftSecond = await tokenSecondContract.methods.totalTokensLeft().call()
    // console.log(tokensLeftSecond)

    return ({
      price: tokenPrice,
      saleAmount: saleAmount,
      saleEnd: saleEnd,
      saleLength: saleLength,
      totalTokensLeft: totalTokensLeft,
      tokensLeftSecond: tokensLeftSecond,
      lockPeriod: lockPeriod,
      vestingPeriod: vestingPeriod
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
    console.log ("Withdraw from contract : ")
    console.log (contract)
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

    return numberOf
}

export async function AcknowApprovedAmount (token) {
    return 0
}

export async function ApproveTokens ( spendingToken, spendingContract, user, amount ) {
    console.log("Token : ")
    console.log(spendingToken)
    console.log("Contract : ")
    console.log(spendingContract)

    const usingAmount = `${amount}${config.decimalZeros}`
    console.log("Amount : ")
    console.log(usingAmount)
    if (!user) user = await RequestWallet ()

    console.log("User : ")
    console.log(user)
    
    if (!env) {
        return 0
    } else {
        try {
           const w3 = new Web3(env, config.connectOptions)
           const contract = new w3.eth.Contract(config.erc20ABI, spendingToken)
           const approving = await contract.methods.approve(spendingContract, usingAmount).send({
             from: user
           }).then((res) => {

            return amount
           }, (rej) => {
            return 0
           })

        } catch (e) {
            console.log(e.message)
            return 0
        }
    }

    return amount
}

export async function Buy ( spendingContract, user, amount ) {

    if (!env) {
        return false
    }
    if (!user) user = await RequestWallet ()

    console.log("User : ")
    console.log(user)
    console.log("Contract : ")
    console.log(spendingContract)

    try {
        const w3 = new Web3(env, config.connectOptions)
        const contract = new w3.eth.Contract(config.saleABI, spendingContract)
        console.log("Amount in dec : ")
        console.log(amount * config.decimal)
        const spendingAmount = `0x${(amount * config.decimal).toString(16)}`
        console.log("Amount in hex : ")
        console.log(spendingAmount)
        const buy = await contract.methods.buyTokens(spendingAmount).send({
            from: user
        }).then((res) => {
            return true;
        }, (rej) => {
            return false;
        })
    } catch (e) {
        console.log(e)
        return false
    }

    return true;
}

export async function RequestMax ( token, user ) {
    console.log(token)
    let val = 0;
    if (!user) user = await RequestWallet ()
    
    try {
        const w3 = new Web3(config.rpcUrl, config.connectOptions)
        const contract = new w3.eth.Contract(config.erc20ABI, token)
        val = await contract.methods.balanceOf(user).call()
    } catch (e) {
        console.log(e)
        val = 0
    }

    return val / config.decimal
}