/**
 * Elmenti a paraméterben található id-jű konditermi foglalást a felhasználónak.
 */
const requireOption = require('../requireOption');
module.exports = function (objectrepository) {

    const FoglalasModel = requireOption(objectrepository, 'FoglalasModel');
    const KonditeremModel = requireOption(objectrepository, 'KonditeremModel');

    return function (req, res, next) {

        var j = req.body.ora;
        if (req.body.datum === null) {
            return next();
        }
        for (let i = 0; i < req.body.maradas; i++) {
            FoglalasModel.findOne({ _konditerem: req.params.id, ora: j, ido: req.body.datum }, (err, foglalas) => {
                if (err) {
                    console.log(err);
                    return next();
                }
                if (foglalas === null) {
                    KonditeremModel.findById(req.params.id, (err, kondi) => {
                        if (err) {
                            console.log(err);
                        }
                        res.locals.foglalas = new FoglalasModel();
                        res.locals.foglalas.ido = req.body.datum;
                        res.locals.foglalas.ora = j;
                        j++;
                        res.locals.foglalas.maradas = 1;
                        res.locals.foglalas.letszam = 1;
                        res.locals.foglalas._konditerem = req.params.id;
                        res.locals.foglalas._felhasznalo.push(req.session.userid);
                        res.locals.foglalas.maxletszam = kondi.ferohely;
                        res.locals.foglalas.save((err) => {
                            if (err) {
                                console.log(err + "micsodaaaaa");
                                return next();
                            }
                            if (i === req.body.maradas - 1) {
                                return res.redirect('/konditerem');
                            }
                        });
                    });
                } else {
                    if (foglalas.letszam + 1 > foglalas.maxletszam) {
                        res.locals.error = "Betelt a hely, " + j + " óra után már nem tudsz menni!";
                        return next();
                    } else {
                        j++;
                        foglalas._felhasznalo.push(req.session.userid);
                        foglalas.letszam = foglalas.letszam + 1;
                        foglalas.save((err) => {
                            if (err) {
                                console.log(err);
                                return next();
                            }
                            if (i === req.body.maradas - 1) {
                                return res.redirect('/konditerem');
                            }
                        });

                    }
                };
            })
        };

    };
}