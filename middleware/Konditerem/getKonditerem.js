/**
 * A paraméterben megkapott id-jű konditermet adja meg.
 */
const { Mongoose } = require('mongoose');
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const KonditeremModel = requireOption(objectrepository, 'KonditeremModel');

    return function (req, res, next) {
        var mongoose = require('mongoose');
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            KonditeremModel.findById(req.params.id, (err, kondi) => {
                if (err || !kondi) {
                    console.log(err);
                    return next(err ? err : 'this is not a gym');
                }
                res.locals.kondi = kondi;
                return next();
            });
        }else{
            res.locals.err='rossz a type';
            return next();
        }
        

    };

};