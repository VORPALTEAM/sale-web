export const mainHost = "https://vorpal.finance"
export const chainID = 56
export const chainHexID = '0x38'
// export const chainName = 'Binance'
export const chainName = 'Binance'
// export const ethSymbol = 'BNB'
export const ethSymbol = 'BNB'
export const rpcUrl = "https://bsc-dataseed.binance.org/"
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
export const defaultApproveValue = "100000"
export const priceVRP = 0.0025
export const priceVDAO = 1.5
export const tokenCookieName = "LastSelecteDToken"
export const refreshPeriod = 15000

export const windowNames = {
	none : "none",
	success: "success",
	nowallet: "nowallet",
	selectToken: "selectToken",
	selectCurrency: "selectCurrency"
}

export const VRPToken = "0x6eEFae719E73f58F2501c828b203FAa6Dde0dB34" // VRP
export const VDAOToken = "0xb490c8aBc3fCB5c98B4221dBEC6B24B610c2F55D" // VDAO

export const zeroAddress = "0x0000000000000000000000000000000000000000"

export const usdTokens = [{
	name: defaultCurrency,
	address: "0xaE3e7442038F88Eeeb11E427a93dB44b338BA60A"
   },{
	name: selectableCurrency,
	address: "0x824D6B09Ac4Bc5f64528ee413f88B3C019CB8F2a"
   }]  // USDC or USDT && BUSD - list of tokens available for using for payment

export const saleContractAddrVRPUSDT = "0xD76621e1dDA5dE0744CBBF6539dE7a490a7f4D2D" // Vorpal sale contractы
export const saleContractAddrVDAOUSDT = "0x5EEF0e18C9aE54210d18b48506077d8C53102cba"
export const saleContractAddrVRPBUSD = "0xd57Ac449E9482a15DE72E62b23Ea79940679aC7d" 
export const saleContractAddrVDAOBUSD = "0x3717aFFE790F4250Eb77eB7825E581296D11c196" 

export const saleAmountVRP = 42000000
export const saleAmountVDAO = 210000

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
	saleStart: 	1, // Sale start 15.01.2023 21:00 = 1673805600
	saleEnd: 	1, // Sale end 15.02.2023 21:00 = 1676484000
	available: "5000000",
	forCurrentRound: "5000000",
	maxSupply: "21000000000",
	burned: "0"
}

export const unLockDate = 1686852000

export const contractDefaultGlobalData = {
	saleAmount: "42000000000000000000000000",
	saleEnd: "1674329899",
	status: 0,
	isDataRequested: false,
	totalTokensLeft: null,
	tokensLeftSecond: null,
}



export const erc20ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export const saleABI = [
    {
        "inputs": [
            { "internalType": "contract IERC20", "name": "_vorpal", "type": "address" },
            { "internalType": "contract IERC20", "name": "_usdc", "type": "address" },
            { "internalType": "uint256", "name": "_price", "type": "uint256" },
            { "internalType": "uint256", "name": "_saleAmount", "type": "uint256" },
            { "internalType": "uint256", "name": "_saleLength", "type": "uint256" },
            { "internalType": "uint256", "name": "_lockPeriod", "type": "uint256" },
            { "internalType": "uint256", "name": "_vestingPeriod", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    { "inputs": [], "name": "InsufficientBalance", "type": "error" },
    { "inputs": [], "name": "NotEnoughTokensLeft", "type": "error" },
    { "inputs": [], "name": "SalePeriodNotEnded", "type": "error" },
    { "inputs": [], "name": "TooManyTokensRequested", "type": "error" },
    { "inputs": [], "name": "VestingTimelocked", "type": "error" },
    {
        "inputs": [
            { "internalType": "enum VestingSale.Status", "name": "expected", "type": "uint8" },
            { "internalType": "enum VestingSale.Status", "name": "actual", "type": "uint8" }
        ],
        "name": "WrongContractStatus",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "buyTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "finishSale", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    {"inputs": [{ "internalType": "address", "name": "holder", "type": "address" }],"name": "getSchedule",
        "outputs": [{"components": [
                    { "internalType": "uint256", "name": "amount", "type": "uint256" },
                    { "internalType": "uint256", "name": "tokensLeft", "type": "uint256" },
                    { "internalType": "uint256", "name": "unlockingStart", "type": "uint256" },
                    { "internalType": "uint256", "name": "unlockingEnd", "type": "uint256" }
                ],
                "internalType": "struct VestingSale.VestingSchedule",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    { "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }], "name": "getUnlockedTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "lockPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "price", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "saleAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "saleEnd", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "saleLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "_lockPeriod", "type": "uint256" }], "name": "setLockPeriod", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "startSale", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "status", "outputs": [{ "internalType": "enum VestingSale.Status", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "totalTokensLeft", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "usdc", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "vestingPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "vorpal", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "withdrawRemainingVorpal", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "withdrawUSDC", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
]
