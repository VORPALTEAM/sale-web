import * as config from '../config'
import Web3 from 'web3';

export const env = window.ethereum

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

export async function AcknowApprovedAmount (token) {
    return 0
}

export async function ApproveTokens ( spendingToken, spendingContract, user, amount ) {
    const usingAmount = `${Math.round(amount)}${config.decimalZeros}`
    console.log(usingAmount)
    if (!user) user = await RequestWallet ()
    
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

    try {
        const w3 = new Web3(env, config.connectOptions)
        const contract = new w3.eth.Contract(config.saleABI, spendingContract)
        const spendingAmount = `0x${(amount * config.decimal).toString(16)}`
        console.log(spendingAmount)
        const buy = await contract.methods.buyTokens(spendingAmount).send({
            from: user
        }).then((res) => {
            return true;
        })
    } catch (e) {
        console.log(e)
        return false
    }

    return true;
}