const { binance } = require('ccxt');

const logger = require('../utils/logger');

function average(a, n)
{
  let sum = 0;
  for (let i = 0; i < n; i += 1) sum += a[i];
  return parseFloat(sum / n);
}

async function getLast100TradePrices(symbol) {
  try {
    logger.info('let last 100 trades and avg it in service');
    const binanceS = new binance();
    const trades = await binanceS.fetchTrades(symbol, undefined, 100);
    const prices = trades.map(trade => trade.price);
    const symbolData = {};
    symbolData[symbol] = average(prices, 100);
    return symbolData;
  } catch (error) {
    throw new Error(`Error fetching trade prices: ${error.message}`);
  }
}

async function getBinanceSymbols(startIndex, endIndex) {
  try {
    logger.info('get all symbols from binance service');
    const binanceS = new binance();
    const markets = await binanceS.loadMarkets();
    const symbols = Object.keys(markets);
    const SymbolsList = [];
    for (let i = startIndex; i < endIndex - 1; i += 1) {
      SymbolsList.push(symbols[i]);
    }
    return SymbolsList;
  } catch (error) {
    throw new Error(`Error fetching Binance symbols: ${error.message}`)
  }
}

async function getBinanceSymbolsPrice(startIndex, endIndex) {
  try {
    logger.info('get symbols with price');
    const binanceS = new binance();
    const markets = await binanceS.loadMarkets();
    const symbols = Object.keys(markets);
    const prices = [];
    for (let i = startIndex; i < endIndex - 1; i += 1) {
      prices.push(getLast100TradePrices(symbols[i]));
    }
    const lastPrices = await Promise.all(prices);
    return lastPrices;
  } catch (error) {
    throw new Error(`Error fetching Binance symbols: ${error.message}`);
  }
}

module.exports = {
  getBinanceSymbols,
  getBinanceSymbolsPrice,
  getLast100TradePrices,

};
