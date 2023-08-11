const binanceService = require('./service');
const logger = require('../utils/logger');

const getBinanceSymbols = async (startIndex, endIndex) => {
  try {
    logger.info('get all symbols from binance controller');
    const symbols = await binanceService.getBinanceSymbols(startIndex, endIndex);
    return symbols;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getBinanceSymbolsPrice = async (startIndex, endIndex) => {
  try {
    logger.info('get symbols with avg price of last 100 trades from binance controller');
    const symbols = await binanceService.getBinanceSymbolsPrice(startIndex, endIndex);
    return symbols;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getBinanceSymbols,
  getBinanceSymbolsPrice,
};
