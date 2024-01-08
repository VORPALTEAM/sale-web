export const VRPToken = "0xed68c7D783E40caAe86aA3a3BCDca0481330ee41";
export const VAOToken = "0x4807Aa82d46501F284AB2512e69e95b7F71681FB";
export const USDToken = "0xCDf4F354596e68671dB43AcB64f2da14862e8403";
export const saleContractVRP = "0x78c15F5aC2E459A258Bb7ee250b9AF3F2Ad94a45";
export const saleContractVAO = "0x78c15F5aC2E459A258Bb7ee250b9AF3F2Ad94a45";

export enum tokens {'VRP', 'VAO'}

export const mainHost = "https://vorpal.finance"
export const mobileUrl = "https://metamask.app.link/dapp/sale.vorpal.finance/"
export const referralApiUrl = "https://staging-api.vorpal.finance/api"

export const chainID = 56
export const chainHexID = '0x38'
export const chainName = 'Binance'
export const decimals = 18

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

export const saleAmountVRP = 42000000
export const saleAmountVAO = 210000

export const totalAmountVRP = 21000000000
export const totalAmountVAO = 21000000

export const contractDefaultGlobalData = {
	saleAmount: "42000000000000000000000000",
	saleEnd: "1674329899",
	status: 0,
	isDataRequested: false,
	totalTokensLeft: null,
	tokensLeftSecond: null,
}