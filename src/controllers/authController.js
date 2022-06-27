const router = require('express').Router();

const authService = require('../services/authService');
const { isAuth, isNotAuth } = require('../middleware/authMiddleware');
const { SESSION_NAME } = require('../config/constants');

router.get('/register', isNotAuth, function (req, res) {
    res.render('auth/register');
});

router.post('/register', isNotAuth, async function (req, res) {
    let { username, email, password, repeatPassword } = req.body;

    console.log(req.body);

    try {
        await authService.register(username, email, password, repeatPassword);

        const token = await authService.login(email, password);

        if (!token) {
            return res.status(404);
        }

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (err) {
        res.status(404).render('auth/register', { error: err.message });
    }
});

router.get('/login', isNotAuth, function (req, res) {
    res.render('auth/login');
});

router.post('/login', isNotAuth, async function (req, res) {
    const { email, password } = req.body;

    try {
        let token = await authService.login(email, password);

        if (!token) {
            return res.status(404);
        }

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (err) {
        res.status(400).render('auth/login', { error: err.message });
    }

});

router.get('/logout', isAuth, function (req, res) {
    res.clearCookie(SESSION_NAME);
    res.redirect('/');
});

module.exports = router;