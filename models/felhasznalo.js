const Schema = require('mongoose').Schema;
const db = require('../config/db');

const felhasznalo = db.model('felhasznalo', {
    nev: String,
    email: String,
    jelszo: String,
    szerep: String

});

module.exports = felhasznalo; 