export const mainHost = "https://vorpal.finance"
export const mobileUrl = "https://metamask.app.link/dapp/sale.vorpal.finance/"
export const chainID = 97
export const chainHexID = '0x61'
// export const chainName = 'Binance'
export const chainName = 'Binance'
// export const ethSymbol = 'BNB'
export const ethSymbol = 'BNB'
export const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/"
export const reserveRpcs = [
	"https://data-seed-prebsc-1-s1.binance.org:8545/",
	"https://data-seed-prebsc-2-s1.binance.org:8545/",
	"http://data-seed-prebsc-1-s2.binance.org:8545/",
	"http://data-seed-prebsc-2-s2.binance.org:8545/",
	"https://data-seed-prebsc-1-s3.binance.org:8545/",
	"https://data-seed-prebsc-2-s3.binance.org:8545/",
	"https://data-seed-prebsc-1-s1.binance.org:8545/",
	"https://data-seed-prebsc-2-s1.binance.org:8545/",
	"http://data-seed-prebsc-1-s2.binance.org:8545/",
	"http://data-seed-prebsc-2-s2.binance.org:8545/",
	"https://data-seed-prebsc-1-s3.binance.org:8545/",
	"https://data-seed-prebsc-2-s3.binance.org:8545/",
	"http://data-seed-prebsc-2-s2.binance.org:8545/"
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

export const VRPToken = "0x7c9D9b99cD40ac20F59F9fe228ebB3e2483e970d" // VRP
export const VDAOToken = "0x0049b0e734Ae8eabee364326FbFeFb273B5f0b7e" // VDAO

export const zeroAddress = "0x0000000000000000000000000000000000000000"

export const usdTokens = [{
	name: defaultCurrency,
	address: "0xCDf4F354596e68671dB43AcB64f2da14862e8403"
   },{
	name: selectableCurrency,
	address: "0xAd8a6e033cbaCD0910234c596f15ef8326B7cDF1"
   }]  // USDC or USDT && BUSD - list of tokens available for using for payment

export const saleContractAddrVRPUSDT = "0x30aEF32c9590B060D43877eD19047E58cC75015b" // Vorpal sale contracts
export const saleContractAddrVDAOUSDT = "0xbAf4fBBD6a6A962FA36c5F2Bb5aa36929D7Fe14C"
export const saleContractAddrVRPBUSD = "0x6b3aD5fD39CcE379702a296d8318b3faB4b6F7B6" 
export const saleContractAddrVDAOBUSD = "0x0E181a04c06b81828651501b2F5B955d3d0A8d18" 

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
