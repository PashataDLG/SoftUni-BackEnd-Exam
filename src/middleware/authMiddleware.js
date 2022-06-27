const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { SESSION_NAME, SECRET } = require('../config/constants');

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
    let token = req.cookies[SESSION_NAME];

    if(token){
        try {
            let decodedToken = await jwtVerify(token, SECRET);
                
            req.user = decodedToken;
        
            res.locals.user = decodedToken;
        } catch (err) {
            console.log(err);
            return res.redirect('/404');
        }
    }

    next();
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    }

    next();
};

exports.isNotAuth = (req, res, next) => {
    if (req.user) {
        return res.redirect('/404');
    }

    next();
};