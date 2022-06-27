const router = require('express').Router();

const { isAuth } = require('../middleware/authMiddleware');
const cryptoService = require('../services/cryptoService');

router.get('/create', isAuth, function (req, res) {
    res.render('crypto/create');
});

router.post('/create', isAuth, async function (req, res) {
    let cryptoData = req.body;

    cryptoData.owner = req.user._id;

    try {
        await cryptoService.createOffer(cryptoData);

        res.redirect('/');
    } catch (err) {
        res.status(401).render('crypto/create', { error: err.message });
    }
});

router.get('/catalog', async function (req, res) {
    const cryptoOffers = await cryptoService.getAll().lean();
    res.render('crypto/catalog', { cryptoOffers });
});

router.get('/:cryptoId/details', async function (req, res) {
    const crypto = await cryptoService.getById(req.params.cryptoId).lean();

    const isOwner = crypto.owner == req.user?._id;

    let isBought = false;

    crypto.cryptoBuyers.forEach(buyer => {
        if (req.user?._id == buyer._id) {
            isBought = true;
        };
    })

    res.render('crypto/details', { crypto, isOwner, isBought });
});

router.get('/:cryptoId/buy', async function (req, res) {
    let crypto = await cryptoService.getById(req.params.cryptoId);

    crypto.cryptoBuyers.push(req.user._id);

    await crypto.save();

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/edit', async function (req, res) {
    const crypto = await cryptoService.getById(req.params.cryptoId).lean();

    res.render('crypto/edit', { crypto });
});

router.post('/:cryptoId/edit', async function (req, res) {
    const cryptoData = req.body;
    const crypto = await cryptoService.getById(req.params.cryptoId).lean();

    try {
        await cryptoService.updateOffer(req.params.cryptoId, cryptoData);

        res.redirect(`/crypto/${req.params.cryptoId}/details`);
    } catch (err) {
        res.render('crypto/edit', { crypto, error: err.message });
    }
});

router.get('/:cryptoId/delete', async function (req, res) {
    await cryptoService.deleteOffer(req.params.cryptoId);

    res.redirect('/crypto/catalog');
});

module.exports = router;