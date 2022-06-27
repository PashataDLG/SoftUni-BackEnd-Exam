const router = require('express').Router();

const cryptoService = require('../services/cryptoService');

router.get('/', function (req, res) {
    res.render('home');
});

router.get('/search', async function (req, res) {
    const cryptoOffers = await cryptoService.getAll().lean();
    res.render('search', { cryptoOffers });
});

router.post('/search', async function (req, res) {
    const { name, paymentMethod } = req.body;
    const cryptoOffers = await cryptoService.getAllSearched(name, paymentMethod).lean();

    res.render('search', { cryptoOffers });
});

module.exports = router;