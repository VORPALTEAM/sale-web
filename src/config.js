export const mainHost = "https://vorpal.finance"
export const chainID = 97
export const chainHexID = '0x61'
export const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/"
export const VRPToken = "0xacA60C4d5F7e5De0D61A7F6Cebd47f4e2f30047d" // VRP
export const VDAOToken = "0x54E717435229c3Be76a98dD12133d60B427385fe" // VDAO
export const usdTokens = [{
	name: "USDT",
	address: "0xDae3745bA5591Aff6AF3625Cc464fCb8e12c047d"
   },{
	name: "BUSD",
	address: "0x6172eB2b82126a4B53d57eED425E3aeF9b857404"
   }]  // USDC or USDT && BUSD - list of tokens available for using for payment
export const saleContractAddrVRPUSDT = "0x3204D0b76bFC2DF859096ac97D61e2f08a0b8F39" // Vorpal sale contractы
export const saleContractAddrVDAOUSDT = "0x955125b8F04BF6C6a03a5C924870E3adCf95Ac31"
export const saleContractAddrVRPBUSD = "0x2Fb6037F2D55201Cdb811005b7ac9b141224F301" 
export const saleContractAddrVDAOBUSD = "0xb8685E338132a5bd4BC500C3ee3Eb80E4De9145D"
export const decimal = 1000000000000000000
export const decimalZeros = "000000000000000000"
export const defaultToken = 'VRP'
export const selectableToken = 'VAO'
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
	saleStart: 1673298000, // Sale start 10.01.2023 00:00
	available: "4200000",
	forCurrentRound: "4200000",
	maxSupply: "21000000000",
	burned: "0"
}

export const contractDefaultGlobalData = {
	owner: "0x0f2d11eb3b6d4e220360bce6f7253282ccc6d12e",
	price: "250000000000000000",
	saleAmount: "4200000000000000000000000",
	saleEnd: "1674329899",
	saleLength: "2629743",
	lockPeriod: 1800,
	status: 0,
	totalTokensLeft: "4200000000000000000000000",
	tokensLeftSecond: "4200000000000000000000000",
	usdc: "0x04c9483ef256cfeb1dac080f90defb7b3abb6006",
	vestingPeriod: 360,
    vorpal: "0xccd635c53f1f9205aa2b29d63ba4b17b03c5b0e2"
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
