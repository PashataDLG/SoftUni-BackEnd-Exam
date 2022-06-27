const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/constants');

exports.register = async (username, email, password, repeatPassword) => {
    const createdUser = await User.create({ username, email, password, repeatPassword });

    return createdUser;
};

exports.login = async (email, password) => {
    let user = await User.findOne({ email });

    if (!user) {
        throw {
            message: 'Email or Password is incorrect.'
        };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: 'Email or Password is incorrect.'
        };
    }

    let payload = { _id: user._id, email: user.email };

    let result = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });

    return result;
};