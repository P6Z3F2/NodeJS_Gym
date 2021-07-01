/**
 * A felhasználó órarendjét adja meg, melyben találhatók a foglalásai.
 */
const requireOption = require('../requireOption');
module.exports = function (objectrepository) {

    const FoglalasModel = requireOption(objectrepository, 'FoglalasModel');
    const KonditeremModel = requireOption(objectrepository, 'KonditeremModel');

    return function (req, res, next) {

        FoglalasModel.find({ _felhasznalo: req.session.userid }, (err, foglalas) => {
            if (err) {
                return next(err);
            }

            if (foglalas[0] === undefined) {
                res.locals.foglalas = foglalas;
                return next();
            }

            res.locals.kondinev = "X";
            res.locals.datum = new Date();

            res.locals.id = req.session.userid;

            res.locals.foglalas = foglalas;
            res.locals.foglalt = false;

            var i = 0;

            res.locals.foglalas.forEach(fog => {
                KonditeremModel.findById(fog._konditerem, (err, kondi) => {
                    if (err) {
                        console.log(err);
                    }
                    fog.kondi = kondi.nev;
                    i++;
                    if (i === res.locals.foglalas.length) {
                        return next();
                    }
                });

            });
        });

    };

};