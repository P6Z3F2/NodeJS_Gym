const Schema = require('mongoose').Schema;
const db = require('../config/db');

const konditerem = db.model('Konditerem', {

    nev: String,
    hely: String,
    terulet: Number,
    kep: String,
    telo: String,
    ferohely: Number

});

module.exports = konditerem; 