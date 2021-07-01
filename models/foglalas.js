const Schema = require('mongoose').Schema;
const db = require('../config/db');

const foglalas = db.model('foglalas', {
    ido: Date,
    ora: Number,
    maradas: Number,
    letszam: Number,
    maxletszam: Number,
    _konditerem: {
        type : Schema.Types.ObjectId,
        ref: 'konditerem'
    },
    _felhasznalo: [{
        type : Schema.Types.ObjectId,
        ref: 'felhasznalo'
    }]

});

module.exports = foglalas; 