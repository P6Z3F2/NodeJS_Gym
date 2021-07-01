/**
 * Kilistázza a konditermeket a szűrési feltételek alapján 
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const KonditeremModel = requireOption(objectrepository, 'KonditeremModel');

    return function (req, res, next) {
        
        if(req.query.talal!=undefined){
            KonditeremModel.find({ "nev": { "$regex": req.query.talal} }, (err, kondik) => {
                if (err) {
                    return next(err);
                }
                res.locals.kondik = kondik;
    
                var i = 0;
    
                return next();
            });
        }else{
            KonditeremModel.find({}, (err, kondik) => {
                if (err) {
                    return next(err);
                }
                res.locals.kondik = kondik;
    
                var i = 0;
    
                return next();
            });
        }
        
    };

};