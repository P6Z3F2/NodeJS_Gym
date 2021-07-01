/**
 * Ellenőrzi a felhasználó jelszavát.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const FelhasznaloModel = requireOption(objectrepository, 'FelhasznaloModel');

    return function (req, res, next) {
        if (typeof req.body.password === 'undifend') {
            console.log('ujuj');
        }
        if (req.body.password === '') {
            res.locals.error = 'Nem írtál be semmit se jelszónak!';
            return next();
        }
        else {
            FelhasznaloModel.findOne({ email: req.body.email }, (err, felhasznalo) => {
                if (err) {
                    console.log('Itt az error: ' + err);
                    return next();
                } else {
                    if(felhasznalo!==null){
                        res.locals.felhasznalo = felhasznalo;
                        if (req.body.password === res.locals.felhasznalo.jelszo) {
                            req.session.userid = res.locals.felhasznalo._id;
                            req.session.belepve = true;
                            req.session.szerep = res.locals.felhasznalo.szerep;
                            if(res.locals.felhasznalo.szerep==="admin"){
                                return res.redirect('/konditerem/Admin');
                            }else{
                                return res.redirect('/konditerem');
                            }
                        } else {
                            res.locals.error = 'Nem egyezik a két jelszó';
                            return next();
                        }
                    }else{
                        res.locals.error = 'Rossz az email vagy jelszó!';
                        return next();
                    }
                    
                }
            });
            
        }
    };

};