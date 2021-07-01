/**
 * Elmenti a kitöltött form alapján az új konditermet
 */
const requireOption = require('../requireOption');
module.exports = function (objectrepository) {

    const KonditeremModel = requireOption(objectrepository, 'KonditeremModel');

    return function (req, res, next) {

        if (typeof req.body.kondinev === 'undefined'
            || typeof req.body.kondihely === 'undefined'
            || typeof req.body.konditerulet === 'undefined') {
            console.log('nincs definiálva vmi');
            return next();
        }

        if(typeof res.locals.kondi === 'undefined'){
            res.locals.kondi = new KonditeremModel();
        }

        if (typeof req.body.kondid === 'undefined') {
            res.locals.kondi.nev = req.body.kondinev;
            if(typeof req.file !== 'undefined'){
                res.locals.kondi.kep = req.file.filename;
            }
            res.locals.kondi.hely = req.body.kondihely;
            res.locals.kondi.terulet = req.body.konditerulet;
            res.locals.kondi.ferohely = req.body.konditerulet / 10;
            res.locals.kondi.telo = req.body.konditelo;
            res.locals.kondi.save((err) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                return res.redirect('/konditerem/Admin');
            });
        } else {
            res.locals.kondi._id=req.body.kondid;
            res.locals.kondi.nev = req.body.kondinev;
            res.locals.kondi.hely = req.body.kondihely;
            res.locals.kondi.terulet = req.body.konditerulet;
            res.locals.kondi.telo = req.body.konditelo;
            res.locals.kondi.save((err) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                return res.redirect('/konditerem/Admin');
            });
        }
    };

};