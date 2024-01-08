import Web3 from 'web3';
import * as config from '~/config'

const env = window.ethereum;
let getter = new Web3(config.rpcUrl);