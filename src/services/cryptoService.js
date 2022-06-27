const Crypto = require('../models/Crypto');

exports.createOffer = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find();

exports.getById = (cryptoId) => Crypto.findById(cryptoId);

exports.updateOffer = (cryptoId, cryptoData) => Crypto.findOneAndUpdate({ _id: cryptoId }, cryptoData);

exports.deleteOffer = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.getAllSearched = (name = '', paymentMethod) => Crypto.find({ name: { $regex: new RegExp(name, 'i') }, paymentMethod: paymentMethod });