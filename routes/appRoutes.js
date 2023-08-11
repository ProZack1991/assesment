const express = require('express');
const binanceController = require('../binance/controller');
const walletController = require('../wallets/controller');

const router = express.Router();

router.get('/wallet/create', async (req, res) => {
  try {
    const wallets = await walletController.getWallet();
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/wallet/validate', async (req, res) => {
  try {
    const { address } = req.query;
    const wallets = await walletController.validateWallet(address);
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await walletController.getLasttransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/binance/getsymbols', async (req, res) => {
  try {
    const pageNumber = req.query.page || 1;
    let pageSize = req.query.size || 25;
    pageSize = pageSize === 0 ? 2550 : pageSize;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = parseInt(startIndex, 10) + parseInt(pageSize, 10);
    const symbols = await binanceController.getBinanceSymbols(startIndex, endIndex);
    res.json({ symbols, page: pageNumber, size: pageSize });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/binance/getprice', async (req, res) => {
  try {
    const pageNumber = req.query.page || 1;
    let pageSize = req.query.size || 25;
    pageSize = pageSize === 0 ? 2550 : pageSize;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = parseInt(startIndex, 10) + parseInt(pageSize, 10);
    const symbols = await binanceController.getBinanceSymbolsPrice(startIndex, endIndex);
    res.json({ symbols, page: pageNumber, size: pageSize });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
