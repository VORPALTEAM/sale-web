import Web3 from 'web3';
import store from '~/state/store';
import * as config from '~/config'
import * as ABI from './config/ABI'

const env = window.ethereum;
let getter = new Web3(config.rpcUrl);
let isSubscribed = false;

export function IsTrueNetwork () {
    return env.chainId === config.chainHexID
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

export async function AddReferral ( linkParam  = document.location.search, account ) {
    if (!linkParam || !account) return false

    try {
        const urlParams = new URLSearchParams(linkParam);
        const ref = urlParams.get('ref')
        if (!ref) return false

      const linkData = await fetch(`${config.referralApiUrl}`,
      {
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       method: "POST",
       body: JSON.stringify({
              action: "RegisterReferral",
              client: account,
              link: ref
           })
      })
      return true
    } catch (e) {
        console.log(e.message)
        return false
    }
}

export async function Auth (): Promise<string> {
    return new Promise(async (resolve, reject) => {
        if (!env) {
            // Checking mobile device
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    
                document.location.href = config.mobileUrl
            }
            resolve("");
        }

        const accs = await env.request({ method: "eth_requestAccounts" }, config.connectOptions);
        if (!IsTrueNetwork ()) {
            await env.request({
                method: 'wallet_addEthereumChain',
                params: [{ 
                  chainId: config.chainHexID,
                  chainName: config.chainName,
                  nativeCurrency: {
                      name: config.ethSymbol,
                      symbol: config.ethSymbol,
                      decimals: config.decimals
                  },
                  rpcUrls: [config.rpcUrl]
                }]
              })
        } else {
            resolve(accs[0])
        }

        setTimeout(() => {
            console.log(env.chainId)
            if (!IsTrueNetwork ()) {
                reject("User declined to switch network");
            } else {
                resolve(accs[0])
            }
        }, 1000)

    })

  }

export async function SubscribeOnChanges() {
    isSubscribed = true;
    return new Promise((resolve, reject) => {
        env.on('accountsChanged', function (accounts) {
            try {
              resolve(Auth())
            } catch (e) {
                reject(e.message)
            }
          })
          
        env.on('networkChanged', function (networkId) {
            try {
                resolve(Auth())
              } catch (e) {
                reject(e.message)
              }
         })
    })

}