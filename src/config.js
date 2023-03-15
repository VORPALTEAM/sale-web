export const mainHost = "https://vorpal.finance"
export const mobileUrl = "https://metamask.app.link/dapp/sale.vorpal.finance/"
export const chainID = 56
export const chainHexID = '0x38'
// export const chainName = 'Binance'
export const chainName = 'Binance'
// export const ethSymbol = 'BNB'
export const ethSymbol = 'BNB'
export const rpcUrl = "https://bsc-dataseed.binance.org/"
export const reserveRpcs = [
	"https://bsc-dataseed1.binance.org/",
	"https://bsc-dataseed2.binance.org/",
	"https://bsc-dataseed3.binance.org/",
	"https://bsc-dataseed4.binance.org/",
	"https://bsc-dataseed1.defibit.io/",
	"https://bsc-dataseed1.defibit.io/",
	"https://bsc-dataseed2.defibit.io/",
	"https://bsc-dataseed3.defibit.io/",
	"https://bsc-dataseed4.defibit.io/",
    "https://bsc-dataseed1.ninicoin.io/",
	"https://bsc-dataseed2.ninicoin.io/",
	"https://bsc-dataseed3.ninicoin.io/",
	"https://bsc-dataseed4.ninicoin.io/",
]
// export const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/"
export const decimal = 1000000000000000000
export const decimalZeros = "000000000000000000"
export const defaultToken = 'VRP'
export const selectableToken = 'VAO'
export const defaultCurrency = 'USDT'
export const selectableCurrency = 'BUSD'
export const minInvestments = 10
export const defaultInvestments = 100
export const maxInvestments = 1000000
export const maxDisplayInvestments = 9999999
export const defaultApproveValue = "100000"
export const priceVRP = 0.0025
export const priceVDAO = 1.5
export const tokenCookieName = "LastSelecteDToken"
export const refreshPeriod = 30000
export const policyUrl = "https://docs.google.com/document/d/14eaTBBxqFKAwuJIEhs6UbFpR47I4hsbhV29PuiyYhmU/edit?usp=sharing"
export const howToUrl = "https://teletype.in/@vorpaldao"
export const referralApiUrl = "https://staging-api.vorpal.finance/api"

export const windowNames = {
	none : "none",
	success: "success",
	nowallet: "nowallet",
	selectToken: "selectToken",
	selectCurrency: "selectCurrency",
    mobile: "mobile"
}

export const buyStages = {
	install: "installWallet",
	connect: "connectWallet",
	insufficient: "insufficientAmount",
	approve: "approve",
	buy: "buy"
}

export const pairs = {
	VRPUSDT: 0,
	VRPBUSD: 0,
	VAOUSDT: 0,
	VAOBUSD: 0
}

export const VRPToken = "0xF6C220E1a9a2aE516b46477480228e481D6dfF5c" // VRP
export const VDAOToken = "0x415cD4AB2F5574EE8391dC4E15D360eae7C101cf" // VDAO

export const zeroAddress = "0x0000000000000000000000000000000000000000"

export const usdTokens = [{
	name: defaultCurrency,
	address: "0x55d398326f99059ff775485246999027b3197955"
   },{
	name: selectableCurrency,
	address: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
   }]  // USDC or USDT && BUSD - list of tokens available for using for payment

export const saleContractAddrVRPUSDT = "0xeEe35c13d297E7f3E9b5445B8f808299128D3428" // Vorpal sale contracts
export const saleContractAddrVDAOUSDT = "0xC1F18D08Bc23C276EBAa5eE1c047bCbC1715fC4f"
export const saleContractAddrVRPBUSD = "0x860D93B0a4d7Ae930aA966714F4f94dB05a6A2E8" 
export const saleContractAddrVDAOBUSD = "0x625597d48bf529181d2fF31dF4a22A49dd267209" 

export const saleAmountVRP = 42000000
export const saleAmountVDAO = 210000

export const totalAmountVRP = 21000000000
export const totalAmountVDAO = 21000000


export const totalSaleVRP = 420000000
export const totalSaleVDAO = 1995000

export const connectOptions = {
    keepAlive: true,
    withCredentials: false,
    timeout: 20000, // ms
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        }
    ]
  }

export const defaultGas = "20000000000" 
export const handContractData = {
	saleStart: 	1673805600, // Sale start 15.01.2023 21:00 = 1673805600
	saleEnd: 	1681592399, // Sale end 15.04.2023 23:59:59
	available: "5000000",
	forCurrentRound: "5000000",
	maxSupply: "21000000000",
	burned: "0"
}

export const unLockDate = 1688158799

export const contractDefaultGlobalData = {
	saleAmount: "42000000000000000000000000",
	saleEnd: "1674329899",
	status: 0,
	isDataRequested: false,
	totalTokensLeft: null,
	tokensLeftSecond: null,
}
