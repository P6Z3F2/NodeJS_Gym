/**
 * Ellenőrzi a felhasználói jogosultságot.
 */
 module.exports = function (objectrepository){

    return function (req, res, next){
        if (req.session.szerep !== "admin") {
            return res.redirect('/');
        }else{
            return next();
        }
    };

};