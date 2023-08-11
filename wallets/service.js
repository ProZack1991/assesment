const ethers = require('ethers');
const logger = require('../utils/logger');

const provider = new ethers.providers.JsonRpcProvider('https://ethereum.publicnode.com');

async function getWallet() {
  try {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      mnemonic: wallet.mnemonic.phrase,
      privateKey: wallet.privateKey,
    };
  } catch (error) {
    throw new Error(`Error on wallet generation: ${error.message}`);
  }
}

async function validateWallet(address) {
  try {
    return ethers.utils.isAddress(address);
  } catch (error) {
    throw new Error(`Error on validation of wallet: ${error.message}`);
  }
}

async function getLasttransactions() {
  try {
    const lastBlock = await provider.getBlockNumber();
    const startBlock = parseInt(lastBlock,10) - 10;
    const transactionsData = [];
    let block;
    /* eslint-disable no-await-in-loop */
    for (let i = startBlock; i <= lastBlock; i += 1) {
      try {
        block = await provider.getBlockWithTransactions(Number(i))
      } catch (err) {
        logger.log('error in block : ', i);
      }
      for await (const transaction of block.transactions) {
        let tx = {
          txhash : transaction.hash,
          blockHash: transaction.blockHash,
          blockNumber: transaction.blockNumber,
          sender : transaction.from,
          receiver : transaction.to,
          value : transaction.value
        }
        transactionsData.push(tx)
      }
    }
    /* eslint-enable no-await-in-loop */
    const size = transactionsData.length;
    return { transactionsData, size };
  } catch (error) {
    throw new Error(`Error fetching trade prices: ${error.message}`)
  }
}

module.exports = {
  getWallet,
  validateWallet,
  getLasttransactions,
};
