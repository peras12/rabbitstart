require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3.default('https://poodical-uranium.base-goerli.discover.quiknode.pro/a7be3c5b9e1234cd4b066fc8c9ca6a154f/');

const contractAddress = '0x43';
const contractABI = require('./abi/erc20.json'); // ABI of your token contract

const contract = new web3.eth.Contract(contractABI, contractAddress);

const privateKey = '0x' + process.env.PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

async function transfer(address, amount) {
  const toAddress = web3.utils.toChecksumAddress(address);
  const amountToSend = web3.utils.toWei(amount, 'ether'); // Amount to send in wei
  
  const data = await contract.methods.transfer(toAddress, amountToSend).encodeABI();
  
  const tx = {
    from: account.address,
    to: contractAddress,
    gas: 2000000,
    data: data
  };
  
  const signTx = await web3.eth.sendTransaction(tx)
  return signTx.transactionHash;
}

// export the function
module.exports = { transfer };