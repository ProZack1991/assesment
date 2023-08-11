const walletsService = require('./service');
const logger = require('../utils/logger');

const getWallet = async () => {
  try {
    logger.info('new wallet generation controller');
    const walletData = await walletsService.getWallet();
    return walletData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateWallet = async (wallet) => {
  try {
    logger.info('validate wallet  controller');
    const symbols = await walletsService.validateWallet(wallet);
    return symbols;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getLasttransactions = async () => {
  try {
    logger.info('Get transaction from network');
    const symbols = await walletsService.getLasttransactions();
    return symbols;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getWallet,
  validateWallet,
  getLasttransactions,
};
