/**
 * A felhasználói autentikációt ellenőrzi.
 */
 module.exports = function (objectrepository){

    return function (req, res, next){
        if (typeof req.session.belepve === 'undefined' || req.session.belepve !== true) {
            return res.redirect('/');
        }
        return next();
    };

};